import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";
import { formatDuration } from "./redesign/Timeline";
import {
  email,
  experience,
  profile,
  projects,
  socials,
} from "./redesign/data";

const go = (path) => {
  window.location.hash = `#${path}`;
};

beforeEach(() => {
  window.localStorage.clear();
  go("/");
});

describe("data integrity", () => {
  test("every project has the same complete shape", () => {
    expect(projects).toHaveLength(10);
    const slugs = new Set();
    projects.forEach((project) => {
      [
        "slug",
        "name",
        "title",
        "category",
        "year",
        "role",
        "client",
        "platform",
        "discipline",
        "summary",
        "overview",
        "challenge",
        "approach",
        "color",
        "image",
      ].forEach((field) => expect(project[field]).toBeTruthy());
      expect(["Web", "Product", "Mobile"]).toContain(project.category);
      expect(project.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
      expect(project.gallery.length).toBeGreaterThanOrEqual(1);
      project.gallery.forEach((item) => {
        expect(item.src).toBeTruthy();
        expect(item.title).toBeTruthy();
        expect(item.caption).toBeTruthy();
        expect(project.deliverables.some(deliverable => deliverable.title === item.relatedTo)).toBe(true);
      });
      // Every project links out to either the live site or its case study.
      expect(project.links.live || project.links.behance).toMatch(/^https:\/\//);
      slugs.add(project.slug);
    });
    expect(slugs.size).toBe(projects.length);
  });

  test("experience entries are complete and ordered newest first", () => {
    expect(experience[0].current).toBe(true);
    experience.forEach((item) => {
      ["id", "role", "company", "location", "start", "end", "summary"].forEach(
        (field) => expect(item[field]).toBeTruthy(),
      );
      expect(item.tags).toHaveLength(3);
      expect(item.highlights.length).toBeGreaterThanOrEqual(2);
    });
  });

  test("durations are counted inclusively", () => {
    expect(formatDuration("Jul 2021", "Jan 2026")).toBe("4 yrs 7 mos");
    expect(formatDuration("Oct 2022", "Dec 2023")).toBe("1 yr 3 mos");
    expect(formatDuration("Sep 2022", "Apr 2023")).toBe("8 mos");
    expect(formatDuration("2019", "2020")).toBe("1 yr");
    expect(
      formatDuration("Feb 2024", "Present", new Date("2026-11-13")),
    ).toBe("2 yrs 10 mos");
  });
});

describe("home", () => {
  test("shows the headline, featured work, services and the timeline", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Intelligent\s+systems & web apps\./,
    );
    const featured = projects.filter((project) => project.featured);
    featured.forEach((project) => {
      expect(
        screen.getByRole("link", { name: `${project.name} — ${project.title}` }),
      ).toHaveAttribute("href", `#/${project.slug}`);
    });
    expect(screen.getAllByRole("heading", { level: 3 })
      .filter(node => projects.some(project => project.name === node.textContent))
      .map(node => node.textContent)).toEqual([
        "Civic Sol", "WhisperLM", "Speed of Light", "Adeptia", "J-TAK",
      ]);
    expect(screen.queryByRole("link", { name: "Sorcero — Medical intelligence platform" })).not.toBeInTheDocument();
    expect(screen.getByText("Product UX/UI design")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /AI Specialist & Web Developer/ }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("timeline roles expand individually and all at once", () => {
    render(<App />);
    const first = screen.getByRole("button", {
      name: /AI Specialist & Web Developer/,
    });
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    experience.forEach((item) => {
      expect(
        screen.getByRole("button", { name: new RegExp(item.company) }),
      ).toHaveAttribute("aria-expanded", "true");
    });
    fireEvent.click(screen.getByRole("button", { name: "Collapse all" }));
    expect(first).toHaveAttribute("aria-expanded", "false");
  });
});

describe("work", () => {
  test("filters the index and restores all projects", () => {
    go("/Portfolio");
    render(<App />);
    const main = within(screen.getByRole("main"));
    const cards = () => main.getAllByRole("heading", { level: 2 });
    expect(cards()).toHaveLength(10);
    expect(cards().slice(0, 3).map(node => node.textContent)).toEqual([
      "Civic Sol", "WhisperLM", "Immigration PathFinder",
    ]);

    fireEvent.click(screen.getByRole("button", { name: /^Mobile/ }));
    expect(cards().map((node) => node.textContent)).toEqual(["J-TAK", "SOLBooks"]);
    expect(main.getByRole("status")).toHaveTextContent("2 projects");

    fireEvent.click(screen.getByRole("button", { name: /^Web/ }));
    expect(cards().map((node) => node.textContent)).toEqual([
      "Civic Sol",
      "Immigration PathFinder",
      "Speed of Light",
    ]);

    fireEvent.click(screen.getByRole("button", { name: /^All/ }));
    expect(cards()).toHaveLength(10);
  });

  test.each(projects.map((project) => [project.slug, project]))(
    "%s renders through the shared case-study template",
    (slug, project) => {
      go(`/${slug}`);
      render(<App />);
      const main = within(screen.getByRole("main"));
      expect(main.getByRole("heading", { level: 1 })).toHaveTextContent(
        project.name,
      );
      ["Role", "Client", "Year", "Platform"].forEach((label) =>
        expect(main.getByText(label)).toBeInTheDocument(),
      );
      expect(
        main.getByRole("heading", { name: "The challenge" }),
      ).toBeInTheDocument();
      expect(
        main.getByRole("heading", { name: "The approach" }),
      ).toBeInTheDocument();
      project.deliverables.forEach((item) =>
        expect(
          main.getByRole("heading", { name: item.title }),
        ).toBeInTheDocument(),
      );
      expect(
        main.getAllByRole("button", { name: /^Enlarge image/ }),
      ).toHaveLength(project.gallery.length);
      expect(main.getByRole("link", { name: /All work/ })).toHaveAttribute(
        "href",
        "#/Portfolio",
      );
      const external = project.links.live
        ? main.getByRole("link", { name: /Visit live site/ })
        : main.getByRole("link", { name: /Case study on Behance/ });
      expect(external).toHaveAttribute(
        "href",
        project.links.live || project.links.behance,
      );
      expect(external).toHaveAttribute("target", "_blank");
    },
  );

  test("opens and closes the gallery lightbox", () => {
    go("/Sorcero");
    render(<App />);
    const [firstImage] = screen.getAllByRole("button", {
      name: /^Enlarge image/,
    });
    fireEvent.click(firstImage);
    expect(screen.getByText(/01 \/ 05 — Article review/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next image", hidden: true }));
    expect(screen.getByText(/02 \/ 05 — Medical insights workspace/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close image", hidden: true }));
    expect(screen.queryByText(/02 \/ 05 — Medical insights workspace/)).not.toBeInTheDocument();
  });

  test("the old J-tek address redirects to J-TAK", () => {
    go("/J-tek");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("J-TAK");
  });

  test("unknown addresses show the not-found page", () => {
    go("/does-not-exist");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /off track/,
    );
    expect(screen.getByRole("link", { name: /See the work/ })).toHaveAttribute(
      "href",
      "#/Portfolio",
    );
  });
});

describe("resume, about and services", () => {
  test("resume shows experience, education, languages and certifications", () => {
    go("/Resume");
    render(<App />);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByText("Bachelor of Business Administration (BBA)"),
    ).toBeInTheDocument();
    ["Arabic", "English", "Turkish", "German"].forEach((language) =>
      expect(main.getByText(language)).toBeInTheDocument(),
    );
    expect(main.getByText("Google UX Design Certificate")).toBeInTheDocument();
    expect(main.getByText("UX/UI Design Mentor")).toBeInTheDocument();
    expect(
      main.getByRole("button", { name: /Print \/ save as PDF/ }),
    ).toBeInTheDocument();
    const openPDF = jest.spyOn(window, "open").mockImplementation(() => null);
    fireEvent.click(main.getByRole("button", { name: /Print \/ save as PDF/ }));
    expect(openPDF).toHaveBeenCalledWith(
      expect.stringContaining("/resume/Sharif-Jamo-Resume.pdf"),
      "_blank",
      "noopener,noreferrer",
    );
    openPDF.mockRestore();
  });

  test("about lets you inspect the toolkit", () => {
    go("/About");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Flutter" }));
    expect(
      screen.getByText("Cross-platform apps for iOS, Android and web."),
    ).toBeInTheDocument();
  });

  test("services lists four offers and an accordion FAQ", () => {
    go("/Services");
    render(<App />);
    const main = within(screen.getByRole("main"));
    expect(main.getAllByRole("heading", { level: 2 }).slice(0, 4)).toHaveLength(4);
    const question = main.getByRole("button", {
      name: /How do we get started\?/,
    });
    expect(question).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(
      main.getByRole("button", { name: /^Play video/ }),
    ).toBeInTheDocument();
  });
});

describe("contact", () => {
  test("topics toggle and the fields are validated", () => {
    go("/Contact");
    render(<App />);
    const topic = screen.getByRole("button", { name: "AI video" });
    fireEvent.click(topic);
    expect(topic).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(topic);
    expect(topic).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("textbox", { name: "Your name" })).toBeRequired();
    expect(
      screen.getByRole("textbox", { name: "Email address" }),
    ).toHaveAttribute("type", "email");
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});

describe("site chrome", () => {
  test("the title and contact details are consistent everywhere", () => {
    render(<App />);
    expect(screen.getAllByText(new RegExp(profile.title)).length).toBeGreaterThan(0);
    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getByRole("link", { name: email })).toHaveAttribute(
      "href",
      `mailto:${email}`,
    );
    socials.forEach((social) =>
      expect(footer.getByRole("link", { name: social.name })).toHaveAttribute(
        "href",
        social.url,
      ),
    );
    expect(screen.queryByText(/yaqaza/i)).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/gmail\.com/);
  });

  test("the theme toggle switches and remembers the theme", () => {
    render(<App />);
    const before = document.documentElement.getAttribute("data-theme");
    fireEvent.click(screen.getByRole("button", { name: /Switch to (light|dark) mode/ }));
    const after = document.documentElement.getAttribute("data-theme");
    expect(after).not.toBe(before);
    expect(window.localStorage.getItem("sj-theme")).toBe(after);
  });

  test("the animation switch overrides the system setting", () => {
    render(<App />);
    const toggle = screen.getByRole("switch", { name: /Animations/ });
    // The test environment reports "reduce motion", like the system default.
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement.getAttribute("data-motion")).toBe("full");
    expect(window.localStorage.getItem("sj-motion")).toBe("on");
  });
});

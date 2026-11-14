import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Cursor from "./Cursor";
import { MotionProvider } from "./motion";
const originalMatchMedia = window.matchMedia;
afterEach(() => {
  window.matchMedia = originalMatchMedia;
  window.localStorage.clear();
});
function renderNavigation() {
  return render(<MemoryRouter initialEntries={["/Portfolio"]}><Navigation /><main>Page content</main><footer className="site-footer">Footer</footer></MemoryRouter>);
}
test("selecting the current mobile page closes the drawer and restores the background", () => {
  renderNavigation();
  fireEvent.click(screen.getByRole("button", {
    name: "Open menu"
  }));
  expect(document.body.style.overflow).toBe("hidden");
  expect(screen.getByRole("main").inert).toBe(true);
  fireEvent.click(screen.getByRole("link", {
    name: "Work",
    exact: true
  }));
  expect(screen.getByRole("button", {
    name: "Open menu"
  })).toHaveAttribute("aria-expanded", "false");
  expect(document.body.style.overflow).not.toBe("hidden");
  expect(screen.getByRole("main").inert).not.toBe(true);
});
test("Escape closes the drawer and returns focus to its button", () => {
  renderNavigation();
  const button = screen.getByRole("button", {
    name: "Open menu"
  });
  fireEvent.click(button);
  fireEvent.keyDown(document, {
    key: "Escape"
  });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(button).toHaveFocus();
});
test("resizing to desktop releases the mobile scroll lock", () => {
  let onChange;
  const desktop = {
    matches: false,
    addEventListener: (_, fn) => {
      onChange = fn;
    },
    removeEventListener: () => {}
  };
  window.matchMedia = query => query === "(min-width: 861px)" ? desktop : originalMatchMedia(query);
  renderNavigation();
  fireEvent.click(screen.getByRole("button", {
    name: "Open menu"
  }));
  act(() => {
    desktop.matches = true;
    onChange();
  });
  expect(screen.getByRole("button", {
    name: "Open menu"
  })).toHaveAttribute("aria-expanded", "false");
  expect(document.body.style.overflow).not.toBe("hidden");
});
test("mouse cursor adapts to targets and yields to text fields, keyboard, and touch", () => {
  window.matchMedia = query => ({
    matches: query.includes("pointer: fine"),
    addEventListener: () => {},
    removeEventListener: () => {}
  });
  const {
    container,
    unmount
  } = render(<MemoryRouter><Cursor /><a href="#test" data-cursor="View">Project</a><input aria-label="Message" /></MemoryRouter>);
  const move = (target, type = "mouse") => {
    const event = new MouseEvent("pointermove", {
      bubbles: true,
      clientX: 120,
      clientY: 80
    });
    Object.defineProperty(event, "pointerType", {
      value: type
    });
    fireEvent(target, event);
  };
  move(screen.getByRole("link"));
  expect(document.documentElement).toHaveClass("custom-cursor-active");
  expect(container.querySelector(".custom-cursor")).toHaveClass("is-label", "is-visible");
  move(screen.getByRole("textbox"));
  expect(document.documentElement).not.toHaveClass("custom-cursor-active");
  move(screen.getByRole("link"));
  fireEvent.keyDown(document, {
    key: "Tab"
  });
  expect(document.documentElement).not.toHaveClass("custom-cursor-active");
  move(screen.getByRole("link"), "touch");
  expect(document.documentElement).not.toHaveClass("custom-cursor-active");
  unmount();
  expect(document.documentElement).not.toHaveClass("custom-cursor-active");
});
test("the cursor respects reduced motion", () => {
  render(<MotionProvider><MemoryRouter><Cursor /></MemoryRouter></MotionProvider>);
  expect(document.querySelector(".custom-cursor")).not.toBeInTheDocument();
});

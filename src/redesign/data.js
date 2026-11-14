/*
 * Single source of truth for every piece of copy on the site.
 * Project facts (roles, timelines, tools) come from the published Behance
 * case studies and the live civic-sol.org site. Experience comes from the CV.
 */
import { projectMedia } from './projectMedia';

// --- Project imagery --------------------------------------------------------
import whisperHome from "../assets/Project_img/WhisperLM/home.jpg";
import whisperFeatures from "../assets/Project_img/WhisperLM/features.jpg";
import whisperPipeline from "../assets/Project_img/WhisperLM/pipeline.jpg";
import immigrationCountries from "../assets/Project_img/ImmigrationPathFinder/countries.jpg";
import immigrationBasics from "../assets/Project_img/ImmigrationPathFinder/shared-basics.jpg";
import immigrationArabic from "../assets/Project_img/ImmigrationPathFinder/arabic.jpg";
import civicHome from "../assets/Project_img/CivicSol/home-en.png";
import civicHomeAr from "../assets/Project_img/CivicSol/home-ar.png";
import civicOpportunities from "../assets/Project_img/CivicSol/opportunities.png";
import civicLaws from "../assets/Project_img/CivicSol/laws.png";
import civicMap from "../assets/Project_img/CivicSol/map.png";
import civicIndicators from "../assets/Project_img/CivicSol/indicators.png";

import sorceroCover from "../assets/Project_img/sorcero.jpg";
import sorceroIpm from "../assets/Project_img/Sorcero/IPM/(1).png";
import sorceroArticle from "../assets/Project_img/Sorcero/IPM/(2).png";
import sorceroNetwork from "../assets/Project_img/Sorcero/IPM/(6).png";
import sorceroPls from "../assets/Project_img/Sorcero/PLS/(1).png";
import sorceroMim from "../assets/Project_img/Sorcero/MIM/(1).png";
import sorceroFlow from "../assets/Project_img/Sorcero/user_flow.png";
import sorceroSystem from "../assets/Project_img/Sorcero/Design System/(4).png";
import sorceroResponsive from "../assets/Project_img/Sorcero/mobile_tablet_view.png";

import adeptiaCover from "../assets/Project_img/Adeptia.jpg";
import adeptiaHome from "../assets/Project_img/Adeptia/collaboration-home.png";
import adeptiaLearning from "../assets/Project_img/Adeptia/easy-learning.png";
import adeptiaMapper from "../assets/Project_img/Adeptia/data-mapper.png";

import yhhCover from "../assets/Project_img/YHH.png";
import yhhDashboard from "../assets/Project_img/YHH/dashboard.png";
import yhhOverview from "../assets/Project_img/YHH/project-overview.png";
import yhhBoard from "../assets/Project_img/YHH/task-board.png";
import yhhMessaging from "../assets/Project_img/YHH/messaging.png";

import ekhtibaryCover from "../assets/Project_img/Ekhtibary.jpg";
import ekhtibaryResults from "../assets/Project_img/Ekhtibary/results.png";
import ekhtibaryBuilder from "../assets/Project_img/Ekhtibary/question-builder.png";
import ekhtibaryStudent from "../assets/Project_img/Ekhtibary/student-view.png";

import solbooksCover from "../assets/Project_img/Solbooks.jpg";
import solbooksIntro from "../assets/Project_img/SOLBooks/cover.png";
import solbooksType from "../assets/Project_img/SOLBooks/type-system.png";
import solbooksWizard from "../assets/Project_img/SOLBooks/wizard-screens.png";

import jtakCover from "../assets/Project_img/JTak/cover.png";
import jtakFlow from "../assets/Project_img/JTak/user-flow.png";
import jtakScreens from "../assets/Project_img/JTak/screens-1.png";
import jtakScreensTwo from "../assets/Project_img/JTak/screens-2.png";

import solCover from "../assets/Project_img/Sol.jpg";
import solIntro from "../assets/Project_img/SpeedOfLight/brand-intro.png";
import solHero from "../assets/Project_img/SpeedOfLight/home-hero.png";
import solSection from "../assets/Project_img/SpeedOfLight/custom-section.png";
import solArticles from "../assets/Project_img/SpeedOfLight/articles.png";

import husam from "../assets/husam.png";
import johnny from "../assets/johnny.jpg";

// --- Identity ---------------------------------------------------------------
export const email = "info@sharifjamo.com";

export const profile = {
  name: "Sharif Jamo",
  // One title, used everywhere. Change it here and the whole site follows.
  title: "UX/UI Designer, Front-End Developer & AI Specialist",
  shortTitle: "Designer · Developer · AI",
  location: "Gaziantep, Turkey",
  locationNote: "Working remotely, worldwide",
  timeZone: "Europe/Istanbul",
  availability: "Available for freelance & full-time",
  website: "https://sharifjamo.com/",
  intro:
    "I design and build digital products — SaaS platforms, web and mobile apps, and AI-powered workflows — from the first wireframe to production code.",
  bio: "I’m a multidisciplinary designer and developer with 5+ years of experience shipping user-centred SaaS platforms and responsive web and mobile applications.",
  bioExtended:
    "I started in graphic design, moved into UX/UI for enterprise and life-sciences products, and now work across the whole build: Figma design systems, front-end code in React and Flutter, and generative-AI pipelines that take a script all the way to finished video.",
  edge: "Design, code and AI in one pair of hands — so nothing gets lost between the mockup and the product.",
};

export const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sharif-jamo-617648225/",
    handle: "in/sharif-jamo",
  },
  {
    name: "GitHub",
    url: "https://github.com/sharif-git-dev",
    handle: "@sharif-git-dev",
  },
  {
    name: "Behance",
    url: "https://www.behance.net/sharefjammo",
    handle: "@sharefjammo",
  },
];

// Names shown in the home marquee. All are employers or clients from the CV.
export const collaborators = [
  "Sorcero",
  "Adeptia",
  "Prady",
  "Speed of Light",
  "YH&H",
  "CCSD",
  "Paper Airplanes",
];

// --- Projects ---------------------------------------------------------------
// Every project uses exactly the same shape so every case study renders the
// same way: meta → cover → overview → deliverables → gallery → next.
const projectEntries = [
  {
    slug: "WhisperLM",
    name: "WhisperLM",
    title: "Local voice dictation & meeting intelligence",
    category: "Product",
    featured: true,
    year: "Independent project",
    role: "Creator — design, development & AI integration",
    client: "Personal project",
    platform: "Windows desktop app",
    discipline: "Local AI · Windows desktop",
    summary:
      "A Windows app I built end to end for voice dictation, meeting capture, speaker separation and AI summaries that run on your own computer.",
    overview:
      "WhisperLM brings speech recognition and meeting intelligence onto the user's Windows PC. I built the desktop experience, audio pipeline, local AI integration and release tooling, alongside the product website. Hold a shortcut to dictate into another app, record a meeting, and turn the transcript into an overview, decisions and action items without uploading the conversation to a cloud service.",
    challenge:
      "Voice tools need to feel immediate without interrupting the work around them. Meeting capture adds microphone and system audio, multiple speakers and long transcripts. The challenge was connecting those pieces into a compact desktop workflow while keeping transcription, AI processing and history local.",
    approach:
      "A Python and PySide6 app coordinates audio capture, Silero voice-activity detection, whisper.cpp transcription and llama.cpp text refinement. Vulkan acceleration supports local inference, while a floating recording pill and global shortcuts keep the interface out of the way. English-only and Arabic/English modes, local archives and a Windows installer make the pipeline usable beyond a development environment.",
    deliverables: [
      {
        title: "System-wide voice dictation",
        detail: "Push-to-talk and hands-free recording through Ctrl + Win, with recognized text inserted into the active application.",
      },
      {
        title: "Meeting capture & speaker separation",
        detail: "Automatic call detection, microphone and WASAPI system-audio capture, with attribution for your voice and remote speakers.",
      },
      {
        title: "Local AI summaries",
        detail: "On-device transcript refinement and structured overviews, key points, decisions and action items powered by llama.cpp and Qwen.",
      },
      {
        title: "Bilingual controls & local history",
        detail: "English-only or Arabic/English recognition, searchable local archives and a minimal floating recording control.",
      },
      {
        title: "Windows release & product website",
        detail: "Installer and portable releases, first-launch model setup, optional startup integration and a website with interactive feature previews.",
      },
    ],
    stack: ["Python", "PySide6", "whisper.cpp", "llama.cpp", "Silero VAD", "Vulkan"],
    color: "#c6c9ed",
    image: whisperHome,
    links: {
      live: "https://sharif-git-dev.github.io/whisper-lm/",
      github: "https://github.com/sharif-git-dev/whisper-lm",
    },
    gallery: [
      { src: whisperHome, title: "Product website", caption: "The WhisperLM website introducing the Windows app and its local voice workflow." },
      { src: whisperFeatures, title: "Feature overview", caption: "Interactive website previews explaining dictation, meeting summaries, bilingual controls and local history." },
      { src: whisperPipeline, title: "On-device AI pipeline", caption: "The product website explains the path from audio capture and speech detection to transcription, refinement and local storage." },
    ],
  },
  {
    slug: "Immigration-PathFinder",
    name: "Immigration PathFinder",
    title: "AI-assisted immigration exploration",
    category: "Web",
    featured: false,
    year: "Independent project",
    role: "Design, development & AI integration",
    client: "Personal project",
    platform: "Bilingual web app",
    discipline: "Web application · AI case assistant",
    summary:
      "A bilingual immigration explorer with an AI case assistant that turns questionnaire results into a clearer conversation about possible next steps.",
    overview:
      "Immigration PathFinder brings guided questionnaires and AI assistance into one Arabic and English experience for Canada, Germany and the United States. I implemented an AI case assistant that uses the user's profile, calculated scores and pathway results as context for follow-up questions. People can explore programs, ask about improving their scores and discuss next steps without repeating their background.",
    challenge:
      "Each destination has different questions and requirements. Comparing options can involve repeating the same personal background information and navigating unfamiliar terminology across languages.",
    approach:
      "Separate shared information from destination-specific questions, then pass a structured case summary to the AI assistant. The questionnaire and scoring logic provide the context; the assistant helps explain the results in Arabic or English. Clear progress, country switching and government resource links keep the wider journey easy to follow.",
    deliverables: [
      {
        title: "AI case assistant",
        detail:
          "A DeepSeek-powered assistant that uses profile answers, calculated scores and pathway results to answer follow-up questions about programs, score improvements and next steps in Arabic or English.",
      },
      {
        title: "Shared onboarding",
        detail:
          "A step-by-step questionnaire that reuses basic answers across all three destination flows.",
      },
      {
        title: "Country-specific journeys",
        detail:
          "Separate paths for Canada, Germany and the United States, with destination-specific questions and results views.",
      },
      {
        title: "Arabic & English interface",
        detail:
          "A language switch with mirrored reading direction and translated navigation, questions and controls.",
      },
      {
        title: "Government resource links",
        detail:
          "Links to Canadian, German and US government portals provide a next step for checking official information.",
      },
    ],
    stack: ["AI agents", "DeepSeek", "Context-aware prompts", "Interactive questionnaires", "RTL / LTR", "GitHub Pages"],
    color: "#d8d7f3",
    image: immigrationCountries,
    imageFit: "cover",
    links: { live: "https://sharif-git-dev.github.io/Immigration-PathFinder-1/" },
    gallery: [
      {
        src: immigrationCountries,
        title: "Choose a destination",
        caption: "Country selection for Canada, Germany and the United States, with links to government resources.",
      },
      {
        src: immigrationBasics,
        title: "Shared basic questions",
        caption: "A guided questionnaire with progress tracking and answers reused across destinations.",
      },
      {
        src: immigrationArabic,
        title: "Arabic, right-to-left",
        caption: "Translated questions and mirrored navigation in the Arabic interface.",
      },
    ],
  },
  {
    slug: "Civic-Sol",
    name: "Civic Sol",
    title: "Women for the Future of Syria",
    category: "Web",
    featured: true,
    year: "2025 — Present",
    role: "Web development, UX/UI & AI integration",
    client: "Center for Civil Society and Democracy (CCSD)",
    platform: "Responsive web app",
    discipline: "Web development · AI content agents",
    summary:
      "A bilingual civic platform connecting Syrian women with opportunities, laws and data, with AI agents supporting the team's article-writing workflow.",
    overview:
      "Women for the Future of Syria is a CCSD initiative that helps Syrian women and women-led organisations find the information and opportunities they need. I designed and built the bilingual platform and implemented AI agents to help the team create article drafts alongside the site's opportunities, legislation and representation data.",
    challenge:
      "Scholarships, grants and trainings have deadlines, and new laws and decisions change quickly. All of it had to be easy to search in Arabic and English, on any device.",
    approach:
      "A React and Tailwind front-end with one consistent pattern for browsing: search, filter, open. Arabic and English share the same components, with right-to-left support and light and dark themes throughout. Alongside the public experience, AI agents support article drafting as part of the team's content-creation workflow.",
    deliverables: [
      {
        title: "AI-assisted article creation",
        detail:
          "AI agents that help the team draft articles for the platform, supporting the editorial workflow alongside the public-facing website.",
      },
      {
        title: "Opportunities portal",
        detail:
          "Search with filters for type and location, plus open and closed states so nothing out of date gets in the way.",
      },
      {
        title: "Legislation & laws library",
        detail:
          "A searchable library of laws and decisions, organised by category and readable in both languages.",
      },
      {
        title: "Interactive map & indicators",
        detail:
          "A clickable governorate map and representation indicators that turn the data into something people can explore.",
      },
      {
        title: "Bilingual interface",
        detail:
          "Arabic RTL and English LTR layouts, light and dark themes, and a global search shortcut.",
      },
    ],
    stack: ["React", "Tailwind CSS", "AI agents", "Content workflows", "JavaScript", "RTL / LTR"],
    color: "#c9dcdf",
    image: civicHome,
    imageFit: "cover",
    links: { live: "https://civic-sol.org/" },
    gallery: [
      {
        src: civicHome,
        title: "Home",
        caption: "The English home page, with live counts of open opportunities.",
      },
      {
        src: civicOpportunities,
        title: "Opportunities portal",
        caption: "Search, type and location filters, and open or closed status.",
      },
      {
        src: civicLaws,
        title: "Legislation & laws library",
        caption: "Laws and decisions grouped into browsable categories.",
      },
      {
        src: civicMap,
        title: "Interactive governorate map",
        caption: "Select a governorate to see its representation data.",
      },
      {
        src: civicIndicators,
        title: "Leadership & representation indicators",
        caption: "Key figures presented as simple, comparable cards.",
      },
      {
        src: civicHomeAr,
        title: "Arabic, right-to-left",
        caption: "The same page mirrored for Arabic readers.",
      },
    ],
  },
  {
    slug: "Sorcero",
    name: "Sorcero",
    title: "Medical intelligence platform",
    category: "Product",
    featured: false,
    year: "2022 — 2023",
    role: "UX Designer",
    client: "Sorcero, via Prady LLC",
    platform: "Enterprise web app",
    discipline: "Product design · Life-sciences AI",
    summary: "Turning scattered medical data into insights teams can act on.",
    overview:
      "Sorcero turns scattered medical data into high-quality insights, giving life-sciences teams instant access to the evidence they need. Over 11 months I designed the experience for its key products and the design system behind them.",
    challenge:
      "Medical data is vast and complex. Professionals struggled to reach the right information at the right time, and the platform needed an experience that made that fast and dependable.",
    approach:
      "User-centred design with clear navigation and streamlined workflows, refined through research and repeated testing with developers and medical experts. A shared design system keeps every product consistent.",
    deliverables: [
      {
        title: "Intelligent Publication Monitoring",
        detail:
          "Real-time access to published research, built for extracting key evidence and following industry trends.",
      },
      {
        title: "Medical Insights Management",
        detail:
          "A streamlined way to unite and structure complex medical data so teams find insights quickly.",
      },
      {
        title: "Plain Language Summaries",
        detail:
          "A quick, straightforward flow for creating clear and accessible summaries of medical content.",
      },
      {
        title: "Design system",
        detail:
          "Reusable components and patterns that keep the platform consistent and ready for new features.",
      },
    ],
    stack: ["Figma", "After Effects", "Illustrator", "User research", "Design system"],
    color: "#d3cfe8",
    image: sorceroCover,
    links: {
      behance:
        "https://www.behance.net/gallery/222483459/Scattered-medical-data-into-high-quality-insights",
    },
    gallery: [
      {
        src: sorceroIpm,
        title: "Publication monitoring",
        caption: "Collections, evidence and timelines in a single view.",
      },
      {
        src: sorceroArticle,
        title: "Article workspace",
        caption: "Highlighted medical terms, categories and team discussion.",
      },
      {
        src: sorceroNetwork,
        title: "Connected information",
        caption: "A network view for exploring relationships across research.",
      },
      {
        src: sorceroPls,
        title: "Plain Language Summaries",
        caption: "Complex publications turned into clear, accessible summaries.",
      },
      {
        src: sorceroMim,
        title: "Medical Insights Management",
        caption: "Structured insights that inform medical strategy.",
      },
      {
        src: sorceroFlow,
        title: "User flow",
        caption: "Mapping the journey from literature to insight.",
      },
      {
        src: sorceroSystem,
        title: "Design system",
        caption: "Inputs, states and selection patterns.",
      },
      {
        src: sorceroResponsive,
        title: "Tablet and mobile",
        caption: "The research experience adapted for smaller screens.",
      },
    ],
  },
  {
    slug: "Adeptia",
    name: "Adeptia",
    title: "Adeptia Connect redesign",
    category: "Product",
    featured: true,
    year: "2022 — 2023",
    role: "Lead Designer",
    client: "Adeptia, via Prady LLC",
    platform: "Enterprise web app",
    discipline: "Product design · Data integration",
    summary: "Making complex data integrations feel approachable.",
    overview:
      "Adeptia is a self-service data integration platform that organisations use to integrate, automate and manage their data and business processes. I led a four-month redesign to help users complete and monitor complex integrations on their own.",
    challenge:
      "The existing interface was hard to navigate and visually inconsistent. Although the product is self-service, people still needed hands-on technical support to get things done.",
    approach:
      "Three principles guided the redesign: make it obvious this is a collaboration platform, make learning easy, and make powerful tools such as the data mapper feel light and discoverable.",
    deliverables: [
      {
        title: "Collaboration-first home",
        detail:
          "A home page that shows teams, templates and a clear first step from the very first screen.",
      },
      {
        title: "Guided, conversational setup",
        detail:
          "A search and conversational interface that walks new users through their first connection.",
      },
      {
        title: "Data mapper & process flows",
        detail:
          "Mapping and process-flow views that handle complex work without feeling heavy.",
      },
      {
        title: "UI/UX style guide",
        detail:
          "A consistent style guide, maintained alongside prototypes, mockups and usability testing.",
      },
    ],
    stack: ["Figma", "Miro", "Premiere Pro", "User research", "Usability testing"],
    color: "#cfdcd6",
    image: adeptiaCover,
    links: {
      behance: "https://www.behance.net/gallery/199729081/Automation-Project",
    },
    gallery: [
      {
        src: adeptiaHome,
        title: "Design",
        caption: "A home page that reads as a collaboration platform at a glance.",
      },
      {
        src: adeptiaLearning,
        title: "Easy learning",
        caption: "Complex process flows introduced through a simple, guided UI.",
      },
      {
        src: adeptiaMapper,
        title: "Discoverability",
        caption: "A data mapper that feels light while doing complex work.",
      },
    ],
  },
  {
    slug: "Yh-h",
    name: "YH&H",
    title: "Work management website",
    category: "Product",
    featured: false,
    year: "2022 — 2023",
    role: "UX/UI Designer",
    client: "YH&H Products Design Services",
    platform: "Web app",
    discipline: "Product design · Team collaboration",
    summary: "One place for projects, time and team conversations.",
    overview:
      "A work management website that streamlines project management for employees and administrators, with a focus on friendly interfaces and efficient communication.",
    challenge:
      "Teams were tracking tasks, time and conversations in separate tools, which made it hard to see how a project was really doing.",
    approach:
      "Over two months of research, design and usability testing, I brought projects, time tracking and messaging into a single, readable workspace.",
    deliverables: [
      {
        title: "Dashboard & time tracking",
        detail:
          "Quick access to project requests, today’s tasks and a timer, with global search in the header.",
      },
      {
        title: "Projects page",
        detail:
          "A central hub to create, assign and monitor tasks, and to see project status and team performance.",
      },
      {
        title: "Messaging",
        detail:
          "Built-in conversations that keep project discussion in one place instead of scattered across apps.",
      },
    ],
    stack: ["Figma", "Miro", "User research", "Usability testing"],
    color: "#e0d5c8",
    image: yhhCover,
    links: {
      behance:
        "https://www.behance.net/gallery/222488413/YH-H-Work-Management-Website",
    },
    gallery: [
      {
        src: yhhDashboard,
        title: "Dashboard",
        caption: "Project requests, a work timer and today’s tasks.",
      },
      {
        src: yhhOverview,
        title: "Project overview",
        caption: "Status, task summary, budget and team at a glance.",
      },
      {
        src: yhhBoard,
        title: "Task board",
        caption: "Tasks moving from to-do through review to done.",
      },
      {
        src: yhhMessaging,
        title: "Messaging",
        caption: "Direct conversations with project managers.",
      },
    ],
  },
  {
    slug: "Ekhtibary",
    name: "Ekhtibary",
    title: "Assessments for young students",
    category: "Product",
    featured: false,
    year: "2022 — 2023",
    role: "UX/UI Designer",
    client: "Ekhtibary",
    platform: "Web app",
    discipline: "Product design · Education",
    summary: "Tests that 7 to 12-year-olds can take with confidence.",
    overview:
      "Ekhtibary is a school-centred project for creating tests and making them accessible to students aged 7 to 12. My work over three months covered prototyping and usability testing.",
    challenge:
      "Young students need clarity above all, while teachers need to build tests quickly and understand the results.",
    approach:
      "Two distinct experiences: a colourful, large-target interface for children, and focused tools for teachers and administrators — with Arabic content considered from the start.",
    deliverables: [
      {
        title: "Results & score charts",
        detail:
          "A visual view of student performance that helps teachers and administrators read results quickly.",
      },
      {
        title: "Question creation",
        detail:
          "A straightforward builder for teachers and admins to create tests and questions.",
      },
      {
        title: "Student test interface",
        detail:
          "Large buttons, a simple flow and a friendly visual style that children can navigate on their own.",
      },
    ],
    stack: ["Figma", "Prototyping", "Usability testing", "Arabic RTL"],
    color: "#c9d6e8",
    image: ekhtibaryCover,
    links: { behance: "https://www.behance.net/gallery/222488873/Ekhtibary" },
    gallery: [
      {
        src: ekhtibaryResults,
        title: "Results & score charts",
        caption: "Scores, expectations and question-level detail.",
      },
      {
        src: ekhtibaryBuilder,
        title: "Question creation",
        caption: "Building a question with text, media and answer options.",
      },
      {
        src: ekhtibaryStudent,
        title: "Student test interface",
        caption: "A large, clear answer screen designed for children.",
      },
    ],
  },
  {
    slug: "SOLBooks",
    name: "SOLBooks",
    title: "Accounting app",
    category: "Mobile",
    featured: false,
    year: "2021",
    role: "UX/UI Designer",
    client: "Speed of Light",
    platform: "iOS & Android",
    discipline: "Mobile design · Finance",
    summary: "Track every transaction, simply.",
    overview:
      "An accounting app that helps businesses track all of their transactions in an easy, fast way, with feedback and reports that help them improve.",
    challenge:
      "Bookkeeping is detailed work, but people often do it on a phone, in a hurry. The app had to stay simple without hiding what matters.",
    approach:
      "A calm teal visual language, a clear type system and a step-by-step wizard that asks for one thing at a time.",
    deliverables: [
      {
        title: "Onboarding wizard",
        detail:
          "Four short steps for company details, currency, expenses and services.",
      },
      {
        title: "Transaction overview",
        detail:
          "Profit, purchases, expenses, payments and dues summarised on one screen.",
      },
      {
        title: "Type & component system",
        detail:
          "Typography, colour palette, text fields, buttons and checkboxes defined as a reusable kit.",
      },
    ],
    stack: ["Adobe XD", "Illustrator", "After Effects", "Photoshop"],
    color: "#c5ddd3",
    image: solbooksCover,
    links: {
      behance:
        "https://www.behance.net/gallery/132739289/Accounting-App-UI-UX-Design-Case-Study",
    },
    gallery: [
      {
        src: solbooksIntro,
        title: "The app",
        caption: "Brand, purpose and the main overview screen.",
      },
      {
        src: solbooksWizard,
        title: "Wizard screens",
        caption: "A guided setup that keeps each step small.",
      },
      {
        src: solbooksType,
        title: "Typography & UI elements",
        caption: "The type scale and core components.",
      },
    ],
  },
  {
    slug: "J-Tak",
    name: "J-TAK",
    title: "Grocery delivery app",
    category: "Mobile",
    featured: true,
    year: "2022",
    role: "UX/UI Designer",
    client: "J-TAK",
    platform: "iOS & Android, landing page",
    discipline: "Mobile design · E-commerce",
    summary: "Fast local ordering, across three connected apps.",
    overview:
      "An e-commerce app that uses your location to offer fast delivery and easy access to the products you want. The case study covers three user roles and more than 24 screens.",
    challenge:
      "People need a fast, reliable way to order food close to where they are — and the warehouse and couriers need to keep up with every order.",
    approach:
      "Three connected apps: one for customers to browse and order, one for the warehouse to accept and prepare orders, and one for delivery to complete them and take payment.",
    deliverables: [
      {
        title: "Customer app",
        detail:
          "Categories and search designed so that placing an order is quick and easy.",
      },
      {
        title: "Warehouse & delivery apps",
        detail:
          "Dedicated flows for accepting orders, delivering them and confirming payment.",
      },
      {
        title: "User flows & prototype",
        detail:
          "Competitor analysis, user flows for all three roles, usability testing and a high-fidelity prototype.",
      },
      {
        title: "Landing page",
        detail: "A matching Arabic landing page that introduces the app.",
      },
    ],
    stack: ["Figma", "Photoshop", "Illustrator", "Prototyping", "Usability testing"],
    color: "#f1d9c2",
    image: jtakCover,
    imageFit: "cover",
    links: {
      behance:
        "https://www.behance.net/gallery/147005067/E-Commerce-App-UI-UX-Design-Case-Study",
    },
    gallery: [
      {
        src: jtakScreens,
        title: "App & landing page",
        caption: "Customer screens alongside the Arabic landing page.",
      },
      {
        src: jtakScreensTwo,
        title: "More screens",
        caption: "Orders, products and the warehouse and delivery views.",
      },
      {
        src: jtakFlow,
        title: "User flows",
        caption: "Flows for the customer, warehouse and delivery roles.",
      },
    ],
  },
  {
    slug: "Speed-of-Light",
    name: "Speed of Light",
    title: "Company website",
    category: "Web",
    featured: true,
    year: "2022",
    role: "UX/UI Designer",
    client: "Speed of Light",
    platform: "Responsive website",
    discipline: "Web design · Software studio",
    summary: "A confident online home for a software studio.",
    overview:
      "A website design for Speed of Light, a studio that builds web and mobile products. The case study covers the component library and five page designs: home, portfolio, about, hosting and blog.",
    challenge:
      "The studio needed a site that explains what it does and gives its brand a bold, recognisable presence.",
    approach:
      "Deep blue with bright yellow accents, strong diagonal sections and a small set of reusable components carry the brand from the header to the last page.",
    deliverables: [
      {
        title: "Component library",
        detail:
          "Typography, colour palette, custom background items and header design.",
      },
      {
        title: "User flow",
        detail: "A site map linking every page from the home page outward.",
      },
      {
        title: "Page designs",
        detail: "Home, portfolio, about, hosting plans and blog.",
      },
    ],
    stack: ["UI design", "Component library", "User flow", "Responsive layout"],
    color: "#cdd3e6",
    image: solCover,
    links: {
      behance: "https://www.behance.net/gallery/137982007/Web-UI-UX-Design",
    },
    gallery: [
      {
        src: solHero,
        title: "Home page",
        caption: "The hero section and services overview.",
      },
      {
        src: solSection,
        title: "Custom sections",
        caption: "Diagonal sections that give the site its rhythm.",
      },
      {
        src: solArticles,
        title: "Articles",
        caption: "A blog listing for the studio’s writing.",
      },
      {
        src: solIntro,
        title: "Case study contents",
        caption: "Five component previews and five page previews.",
      },
    ],
  },
];

// Lead with the requested three projects, then newest dated work first.
const priorityProjects = ["Civic-Sol", "WhisperLM", "Immigration-PathFinder"];
const latestYear = project => Math.max(0, ...(project.year.match(/\d{4}/g) || []).map(Number));
export const projects = projectEntries
  .map(project => ({ ...project, ...projectMedia[project.slug] }))
  .sort((a, b) => {
    const aPriority = priorityProjects.indexOf(a.slug);
    const bPriority = priorityProjects.indexOf(b.slug);
    if (aPriority !== -1 || bPriority !== -1) {
      return (aPriority === -1 ? Infinity : aPriority) - (bPriority === -1 ? Infinity : bPriority);
    }
    return latestYear(b) - latestYear(a);
  });

export const projectCategories = ["All", "Web", "Product", "Mobile"];

// Old links that should keep working.
export const projectRedirects = { "/J-tek": "/J-Tak" };

// --- Experience (drives the timeline on Home and the Resume page) -----------
export const experience = [
  {
    id: "freelance",
    role: "AI Specialist & Web Developer",
    company: "Freelance",
    location: "Remote",
    start: "Feb 2024",
    end: "Present",
    current: true,
    summary:
      "Generative-AI pipelines, LLM automation and custom web applications.",
    tags: ["AI pipelines", "React", "Video synthesis"],
    highlights: [
      "Designed and built responsive bilingual (Arabic RTL / English LTR) web applications with React, JavaScript, HTML and CSS, with a focus on clean code and WCAG accessibility.",
      "Built a multi-stage, multi-modal generative-AI pipeline that turns raw text into finished visual and video assets.",
      "Engineered system prompts and automated workflows calling LLM APIs (Claude, GPT) to output structured JSON and batch-ready prompt lists.",
      "Directed video generation across Kling, Seedance and Wan, keeping characters, clothing and props consistent from scene to scene.",
      "Integrated front-ends with back-end services and third-party REST APIs, and traced bugs with browser DevTools.",
    ],
  },
  {
    id: "speed-of-light",
    role: "UX/UI Designer & Front-End Developer",
    company: "Speed of Light",
    location: "Turkey",
    start: "Jul 2021",
    end: "Jan 2026",
    summary: "Flutter front-end, UX/UI and design systems for web and mobile.",
    tags: ["Flutter & Dart", "Figma", "Git & GitHub"],
    highlights: [
      "Developed and maintained production front-end UI and interactive components in Flutter/Dart across mobile and web.",
      "Worked directly in the codebase with Git and GitHub: branches, pull requests, merges and conflict resolution.",
      "Designed web, iOS and Android experiences that balanced business requirements, user feedback and technical feasibility.",
      "Built style guides, design patterns, user flows, wireframes and interactive prototypes in Figma.",
      "Documented bugs with reproduction steps, escalated them in Agile sprints and verified the fixes.",
    ],
  },
  {
    id: "prady",
    role: "UX/UI Designer",
    company: "Prady LLC",
    location: "USA · Remote",
    start: "Oct 2022",
    end: "Dec 2023",
    summary: "Enterprise SaaS, workflow automation and life-sciences platforms.",
    tags: ["Enterprise SaaS", "Sorcero", "Adeptia"],
    highlights: [
      "Led UX/UI design for enterprise automation and life-sciences platforms, delivering user flows, wireframes and prototypes.",
      "Adeptia: designed integration, data-mapping and workflow-automation screens, plus monitoring dashboards for errors, logs and job statuses.",
      "Sorcero: turned complex medical and scientific data into clear interfaces for analysis and decision-making.",
      "Ran user interviews, surveys, persona work and usability testing to uncover pain points and validate concepts.",
      "Worked with Angular and back-end engineers to align designs with REST API schemas, the design system and WCAG accessibility.",
    ],
  },
  {
    id: "yhh",
    role: "UX/UI Designer",
    company: "YH&H Products Design Services",
    location: "UAE",
    start: "Sep 2022",
    end: "Apr 2023",
    summary: "Consumer apps, websites and reusable component libraries.",
    tags: ["Product design", "Prototyping", "Design systems"],
    highlights: [
      "Designed UX/UI for consumer apps and websites: user flows, wireframes, prototypes and mockups.",
      "Built reusable UI components, style guides and design-system guidelines.",
      "Created interactive prototypes and lightweight Lottie micro-interactions to pitch product concepts to clients.",
      "Partnered with developers and stakeholders under tight deadlines to ship polished products.",
    ],
  },
  {
    id: "creative-ideas",
    role: "Graphic Designer",
    company: "Creative Ideas LLC",
    location: "USA",
    start: "2019",
    end: "2020",
    summary: "Brand logos and visual identity for print and digital.",
    tags: ["Brand identity", "Illustration", "Print"],
    highlights: [
      "Designed and illustrated brand logos and identity assets, including business cards and stickers.",
      "Tested and adapted graphics across print and digital media to keep them visually consistent.",
    ],
  },
];

// --- Resume -----------------------------------------------------------------
export const resume = {
  summary:
    "Multidisciplinary UX/UI Designer, Front-End Developer and AI Specialist with 5+ years of experience designing and building user-centred SaaS platforms and responsive web and mobile applications. Comfortable across Figma design systems, front-end implementation (Flutter/Dart, JavaScript, HTML/CSS) and generative-AI pipeline automation, and used to working inside Agile product teams.",
  education: [
    {
      title: "Bachelor of Business Administration (BBA)",
      place:
        "Gaziantep University — Faculty of Economics and Administrative Sciences",
      period: "Aug 2020 — Jul 2024",
    },
  ],
  volunteering: [
    {
      title: "UX/UI Design Mentor",
      place: "Paper Airplanes — Women in Tech",
      period: "2023 — Present",
      detail:
        "Mentoring aspiring designers in UX fundamentals, usability and how to structure a portfolio case study.",
    },
    {
      title: "Community Researcher & Report Author",
      place: "INDICATORS and local civic initiatives, Gaziantep",
      period: "2019 — Present",
      detail:
        "Co-authored a participatory research report on Syrian residents in Gaziantep, drawing on 315 surveys, focus groups and 12 expert interviews.",
    },
  ],
  skillGroups: [
    {
      title: "Product design",
      skills: [
        "Wireframing & information architecture",
        "Interactive prototyping",
        "Design systems & style guides",
        "User research & usability testing",
        "Responsive design (iOS, Android, web)",
        "Arabic RTL & English LTR",
        "WCAG accessibility",
      ],
    },
    {
      title: "Front-end development",
      skills: [
        "JavaScript (ES6+)",
        "React",
        "Flutter / Dart",
        "HTML & CSS",
        "Tailwind CSS",
        "REST APIs & JSON",
        "Browser DevTools",
        "Git & GitHub",
      ],
    },
    {
      title: "AI & automation",
      skills: [
        "Prompt engineering",
        "LLM APIs (Claude, GPT)",
        "Generative-AI pipelines",
        "Video synthesis (Kling, Seedance, Wan)",
        "Node-based workflows",
        "Python",
      ],
    },
    {
      title: "Tools",
      skills: [
        "Figma",
        "After Effects & Premiere Pro",
        "Illustrator & Photoshop",
        "Adobe XD",
        "Lottie",
        "Framer Motion & GSAP",
        "Jira, Trello & Asana",
      ],
    },
  ],
  certifications: [
    { name: "Google UX Design Certificate", issuer: "Coursera", year: "2021 — 2022" },
    {
      name: "Foundations of User Experience (UX) Design",
      issuer: "Google",
      year: "2021 — 2022",
    },
    {
      name: "HTML & CSS — Certification Course for Beginners",
      issuer: "Udemy",
      year: "2021 — 2022",
    },
    {
      name: "Flutter & Dart — The Complete Guide",
      issuer: "Udemy",
      year: "2020 — 2021",
    },
    {
      name: "After Effects CC Masterclass",
      issuer: "Udemy",
      year: "2020 — 2021",
    },
  ],
  languages: [
    { language: "Arabic", level: "Native" },
    { language: "English", level: "Fluent" },
    { language: "Turkish", level: "Intermediate" },
    { language: "German", level: "Basic" },
  ],
};

// --- Testimonials (quotes are verbatim) -------------------------------------
export const testimonials = [
  {
    name: "Mohammad Husam Khankan",
    role: "Chief Technical Officer & Founder, Speed of Light",
    quote:
      "Sharif is a talented UI/UX designer and developer, a quick learner and explorer. He was very helpful in delivering better user-centric designs and front-end experiences to our customers.",
    avatar: husam,
  },
  {
    name: "Johnny Luce",
    role: "User Experience Researcher & Creative Design Strategist",
    quote:
      "I had the pleasure of working briefly with Sharif, and he left a lasting impression. Trustworthy, humble, and dedicated to growth, he consistently masters new tools with diligence and attention to detail. We’ve remained in contact as both a friend and mentor, and I continue to admire his commitment to self-improvement. Anyone who works with Sharif will benefit from his positivity and drive for excellence.",
    avatar: johnny,
  },
];

// --- Services ---------------------------------------------------------------
export const services = [
  {
    id: "product-design",
    title: "Product UX/UI design",
    subtitle: "Research, flows and interfaces for SaaS, dashboards and apps.",
    description:
      "End-to-end product design for complex software: understanding users, structuring the experience, and designing interfaces and design systems that developers can build from.",
    items: [
      "User research & usability testing",
      "Wireframes, flows & prototypes",
      "Design systems in Figma",
      "Arabic RTL & English LTR",
    ],
  },
  {
    id: "development",
    title: "Web & mobile development",
    subtitle: "Responsive front-ends in React and Flutter.",
    description:
      "Clean, accessible front-end code for web applications and cross-platform mobile apps — built by the same person who designed them, and connected to your APIs.",
    items: [
      "React, JavaScript, HTML & CSS",
      "Flutter & Dart",
      "REST API integration",
      "Accessibility (WCAG)",
    ],
  },
  {
    id: "ai-automation",
    title: "AI workflow automation",
    subtitle: "LLM pipelines that take repetitive work off your plate.",
    description:
      "Multi-step workflows built on Claude and GPT: structured prompts, predictable JSON output, and node-based pipelines that turn one input into many finished assets.",
    items: [
      "Claude & GPT workflows",
      "Structured prompts & JSON",
      "Node-based pipelines",
      "Python & JavaScript scripting",
    ],
  },
  {
    id: "ai-video",
    title: "AI video production",
    subtitle: "From script to finished video, with consistent characters.",
    description:
      "Generative video directed like a real production: script-to-prompt pipelines, characters and wardrobe that stay consistent between shots, and finishing in After Effects and Premiere Pro.",
    items: [
      "Kling, Seedance & Wan",
      "Character & wardrobe consistency",
      "Vertical 9:16 and widescreen 16:9",
      "Editing & finishing",
    ],
    video: {
      id: "cU9d_MiEXZY",
      title: "AI-generated narrative film — sample",
      note: "Generated with Kling, Seedance and Wan",
    },
  },
];

export const process = [
  {
    title: "Understand",
    description:
      "We start with your goals, your users and what already exists. I map the flows and the technical shape of the work before anything gets designed.",
  },
  {
    title: "Prototype",
    description:
      "Interactive Figma prototypes or a working AI workflow, early — so you can react to something real instead of a document.",
  },
  {
    title: "Build",
    description:
      "Production front-end code in React or Flutter, or a finished pipeline, with regular check-ins and nothing hidden.",
  },
  {
    title: "Launch & hand over",
    description:
      "Testing, deployment and clear documentation, so your team can run and extend the work with confidence.",
  },
];

export const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Product design for SaaS and dashboards, web applications in React, cross-platform apps in Flutter, and AI work: LLM automation and generative video.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Yes. I’m used to working inside product teams — in Figma with designers, in Git with developers, and in Jira, Trello or Asana with everyone else.",
  },
  {
    q: "How do we get started?",
    a: "Send a short note about the project, what you’re hoping to achieve and any timing. We’ll start with a conversation and work out the scope together.",
  },
  {
    q: "What happens after launch?",
    a: "You get documentation and a proper handover. I’m also available for ongoing design or development support if you need it.",
  },
];

export const values = [
  {
    title: "Systems over silos",
    text: "Design, front-end code, APIs and AI work best when one person understands how they connect.",
  },
  {
    title: "Detail matters",
    text: "From right-to-left layouts to the last loading state, the small things decide whether a product feels finished.",
  },
  {
    title: "Technology is for people",
    text: "Mentoring new designers and working on civic research keep me close to the people the work is for.",
  },
];

// Toolkit shown as an orbit on the About page. ring 1 = inner, ring 2 = outer.
export const toolkit = [
  { label: "Figma", group: "Design", ring: 1, note: "Design systems, components and interactive prototypes." },
  { label: "React", group: "Development", ring: 1, note: "Component-based web applications." },
  { label: "Flutter", group: "Development", ring: 1, note: "Cross-platform apps for iOS, Android and web." },
  { label: "Claude & GPT", group: "AI", ring: 1, note: "Structured prompts and automated LLM workflows." },
  { label: "Kling · Seedance · Wan", group: "AI", ring: 1, note: "Directed generative video with consistent characters." },
  { label: "JavaScript", group: "Development", ring: 2, note: "Modern ES6+ for the web." },
  { label: "HTML & CSS", group: "Development", ring: 2, note: "Semantic, responsive, accessible layout." },
  { label: "User research", group: "Design", ring: 2, note: "Interviews, surveys and usability testing." },
  { label: "After Effects", group: "Motion", ring: 2, note: "Motion design, editing and Lottie animation." },
  { label: "Git & GitHub", group: "Workflow", ring: 2, note: "Branches, pull requests and code review." },
  { label: "REST APIs", group: "Development", ring: 2, note: "Connecting interfaces to real data." },
  { label: "Python", group: "AI", ring: 2, note: "Scripts that glue models and data together." },
];

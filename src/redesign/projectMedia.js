// Each supporting image belongs to a specific deliverable. The cover is not
// repeated in the story, and website demos are labeled as website previews.
import whisperHome from '../assets/Project_img/WhisperLM/home.jpg';
import whisperFeatures from '../assets/Project_img/WhisperLM/features.jpg';
import resultsAI from '../assets/Project_img/ImmigrationPathFinder/results-ai.jpg';
import pathways from '../assets/Project_img/ImmigrationPathFinder/pathway-options.jpg';
import basics from '../assets/Project_img/ImmigrationPathFinder/shared-basics.jpg';
import arabic from '../assets/Project_img/ImmigrationPathFinder/arabic.jpg';
import opportunities from '../assets/Project_img/CivicSol/opportunities-light.jpg';
import laws from '../assets/Project_img/CivicSol/laws-light.jpg';
import map from '../assets/Project_img/CivicSol/map-light.jpg';
import civicArabic from '../assets/Project_img/CivicSol/home-ar-light.jpg';
import indicators from '../assets/Project_img/CivicSol/indicators-light.jpg';
import ipm from '../assets/Project_img/Sorcero/IPM/(1).png';
import article from '../assets/Project_img/Sorcero/IPM/(2).png';
import system from '../assets/Project_img/Sorcero/Design System/(4).png';
import summaries from '../assets/Project_img/Sorcero/PLS/(1).png';
import insights from '../assets/Project_img/Sorcero/MIM/(1).png';
import responsive from '../assets/Project_img/Sorcero/mobile_tablet_view.png';
import adeptiaHome from '../assets/Project_img/ThumbnailSources/Adeptia/design.jpg';
import adeptiaMapper from '../assets/Project_img/ThumbnailSources/Adeptia/discovery.jpg';
import adeptiaLearning from '../assets/Project_img/Adeptia/easy-learning.png';
import yhhDashboard from '../assets/Project_img/ThumbnailSources/YHH/view-4.webp';
import yhhProject from '../assets/Project_img/ThumbnailSources/YHH/view-1.webp';
import yhhMessages from '../assets/Project_img/ThumbnailSources/YHH/view-2.webp';
import results from '../assets/Project_img/ThumbnailSources/Ekhtibary/view-1.webp';
import builder from '../assets/Project_img/ThumbnailSources/Ekhtibary/view-2.webp';
import student from '../assets/Project_img/ThumbnailSources/Ekhtibary/view-3.webp';
import solbooksOverview from '../assets/Project_img/Curated/solbooks-overview.jpg';
import solbooksSetup from '../assets/Project_img/Curated/solbooks-onboarding.jpg';
import solbooksSystem from '../assets/Project_img/SOLBooks/type-system.png';
import jtakOverview from '../assets/Project_img/JTak/cover.png';
import jtakScreens from '../assets/Project_img/Curated/jtak-app-and-landing.jpg';
import solHome from '../assets/Project_img/Curated/speed-of-light-home-services.jpg';
import solArticles from '../assets/Project_img/Curated/speed-of-light-articles.jpg';

const frame = (src, title, caption, relatedTo) => ({ src, title, caption, relatedTo });
export const projectMedia = {
  WhisperLM: {
    image: whisperHome,
    coverCaption: 'The product website introduces the local Windows dictation app and its download. This is a website preview, not a desktop-app screenshot.',
    gallery: [frame(whisperFeatures, 'Dictation and meeting summaries', 'Interactive website previews explain push-to-talk dictation, speaker-aware summaries, bilingual controls and local history.', 'Local AI summaries')],
  },
  'Immigration-PathFinder': {
    image: resultsAI,
    coverCaption: 'The results screen brings pathway filters, a suggested option, government source links and the Ask AI case assistant together. Captured using Skip all, with no personal answers supplied.',
    gallery: [
      frame(pathways, 'Exploring the available pathways', 'Additional US pathways show eligibility states and official source links. This preview uses skipped answers to demonstrate the interface.', 'Country-specific journeys'),
      frame(basics, 'One shared starting point', 'A progress-led questionnaire gathers the basic answers reused across destination flows.', 'Shared onboarding'),
      frame(arabic, 'Shared questions in Arabic', 'Arabic labels, right-to-left navigation and a visible progress indicator carry through the shared questionnaire.', 'Arabic & English interface'),
    ],
  },
  'Civic-Sol': {
    image: opportunities,
    coverCaption: 'Search, opportunity type, location and open/closed filters support opportunity discovery.',
    gallery: [
      frame(laws, 'Legislation search', 'Category filters and search organize the legislation library.', 'Legislation & laws library'),
      frame(map, 'Regional representation', 'Selecting a governorate shows its representation details alongside the map.', 'Interactive map & indicators'),
      frame(indicators, 'Representation at a glance', 'Comparable indicator cards give the regional data a readable summary.', 'Interactive map & indicators'),
      frame(civicArabic, 'An Arabic-first reading experience', 'The Arabic home page demonstrates the mirrored navigation and right-to-left editorial layout.', 'Bilingual interface'),
    ],
  },
  Sorcero: {
    image: ipm,
    coverCaption: 'Publication monitoring brings article collections, team comments, evidence cards and a timeline into one workspace.',
    gallery: [
      frame(article, 'Article review', 'Highlighted medical terms, categories, collections and discussion support closer review of an article.', 'Intelligent Publication Monitoring'),
      frame(system, 'Reusable form states', 'Inputs and dropdowns specify default, active, valid, error and disabled states.', 'Design system'),
      frame(summaries, 'Plain-language authoring', 'The original design pairs a publication library with the new-summary form and template selection.', 'Plain Language Summaries'),
      frame(insights, 'Medical insights workspace', 'An original product-design view showing how medical insights are organized for review.', 'Medical Insights Management'),
      frame(responsive, 'Research on smaller screens', 'Tablet and mobile design explorations extend the shared interface patterns.', 'Design system'),
    ],
  },
  Adeptia: {
    image: adeptiaHome,
    coverCaption: 'A starting workspace introduces connection templates, teammates and activity.',
    gallery: [
      frame(adeptiaMapper, 'Mapping and process design', 'Source and destination fields appear alongside a visual process editor.', 'Data mapper & process flows'),
      frame(adeptiaLearning, 'A guided first connection', 'The setup exploration introduces integration tasks through a conversational interface.', 'Guided, conversational setup'),
    ],
  },
  'Yh-h': {
    image: yhhDashboard,
    coverCaption: 'The daily workspace brings project requests, a work timer and tasks due today together.',
    gallery: [
      frame(yhhProject, 'Project status', 'Task progress, budget, hours and team membership in a project overview.', 'Projects page'),
      frame(yhhMessages, 'Project conversations', 'A contact list and message thread keep project conversations together.', 'Messaging'),
    ],
  },
  Ekhtibary: {
    image: results,
    coverCaption: 'Assessment results combine skill scores, comparison charts and question-level review.',
    gallery: [
      frame(builder, 'Question authoring', 'Prompts and answers support text, audio and images, with skills and difficulty assigned alongside them.', 'Question creation'),
      frame(student, 'Student assessment', 'An Arabic listening question uses illustrated answers and question navigation.', 'Student test interface'),
    ],
  },
  SOLBooks: {
    image: solbooksOverview,
    coverCaption: 'The accounting-app overview shows balances, income, expenses, payments and dues.',
    gallery: [
      frame(solbooksSetup, 'Guided setup', 'Four complete onboarding screens collect company details, currencies, expense categories and services.', 'Onboarding wizard'),
      frame(solbooksSystem, 'The visual foundation', 'Almarai type sizes and weights sit alongside reusable input, button and checkbox states.', 'Type & component system'),
    ],
  },
  'J-Tak': {
    image: jtakOverview,
    coverCaption: 'The grocery-app overview introduces Arabic categories, product listings and product details.',
    gallery: [frame(jtakScreens, 'App and landing page', 'Product browsing and ordering screens accompany the Arabic product landing page.', 'Customer app')],
  },
  'Speed-of-Light': {
    image: solHome,
    coverCaption: 'The home-page hero introduces the software studio, followed by its service offering.',
    gallery: [frame(solArticles, 'Article discovery', 'A featured story and article cards provide a route into the studio’s writing.', 'Page designs')],
  },
};

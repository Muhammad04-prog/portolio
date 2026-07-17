import { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "fastcart",
    title: {
      tj: "FastCart",
      ru: "FastCart",
      en: "FastCart"
    },
    tagline: {
      tj: "Мағозаи электронии зуд ва қулай",
      ru: "Сверхбыстрый интернет-магазин",
      en: "Ultra-fast modern e-commerce suite"
    },
    category: {
      tj: "Тиҷорати Электронӣ",
      ru: "E-Commerce Магазин",
      en: "E-Commerce"
    },
    tags: ["React", "State Management", "Tailwind CSS", "API Proxy"],
    metrics: "Framer Motion · Optimized Checkout · Client Persistence",
    problem: {
      tj: "Мағозаҳои электронии маҳаллӣ хеле вазнин буданд ва дар телефонҳои сусти мизоҷон дер кушода мешуданд, ки ин боиси рад шудани харид мегашт.",
      ru: "Местные интернет-магазины загружались слишком долго, особенно на мобильных устройствах с плохим соединением.",
      en: "Standard e-commerce checkouts are notoriously slow on mobile devices, causing high shopping cart abandonment rates."
    },
    solution: {
      tj: "Ман FastCart-ро сохтам — мағозаи электронии бениҳоят зуд бо системаи пешрафтаи сабади харид ва фармоиши осон.",
      ru: "Создал FastCart — оптимизированный интернет-магазин с мгновенным откликом, плавной анимацией добавления в корзину и чистым UI.",
      en: "Built a fully optimized responsive retail catalog with fluid item feedback animations, lightning-fast text searches, and instant local storage persistence."
    },
    result: {
      tj: "Суръати боркунии сайт ба зери 0.8 сония расид ва таҷрибаи харидро барои ҳама корбарон содда кард.",
      ru: "Сайт загружается менее чем за 0.8 секунды, обеспечивая максимальную конверсию кликов в продажи.",
      en: "Achieved sub-1 second page load times and a highly streamlined UX that maximizes buyer conversion rates."
    },
    link: "https://fastcardclient2.vercel.app",
    image: "/images/fastcart.jpg"
  },
  {
    slug: "softcrm",
    title: {
      tj: "SoftCRM",
      ru: "SoftCRM",
      en: "SoftCRM"
    },
    tagline: {
      tj: "Идоракунии қарзҳо ва молияи тиҷорати хурд",
      ru: "Учет долгов и финансов малого бизнеса",
      en: "Microfinance and ledger tracker"
    },
    category: {
      tj: "Молия ва Финтех",
      ru: "Финтех CRM",
      en: "Fintech App"
    },
    tags: ["React", "Tailwind CSS", "Local Ledger", "Analytical Charts"],
    metrics: "D3.js Charts · Financial Metrics · CSV Exports",
    problem: {
      tj: "Соҳибкорони хурд дар дафтарҳо қарзҳо ва даромадҳои худро менавиштанд ва аксар вақт муҳлати супоридани қарзро фаромӯш мекарданд.",
      ru: "Владельцы малого бизнеса часто путались в долговых обязательствах клиентов и забывали сроки выплат из-за отсутствия простого трекера.",
      en: "Small store operators rely heavily on informal customer credit ledger books, leading to unpaid debts and chaotic financial projections."
    },
    solution: {
      tj: "Ман SoftCRM-ро сохтам, ки ба тиҷорати хурд кӯмак мекунад қарзҳо, даромадҳо ва хароҷотро ба таври худкор сабт ва таҳлил кунанд.",
      ru: "Разработал SoftCRM — специализированный инструмент для отслеживания дебиторской задолженности, графиков платежей и финансовой аналитики.",
      en: "Developed SoftCRM, an intuitive bookkeeping and debt tracking application that provides clear visualization of outstanding credits and daily cash flow charts."
    },
    result: {
      tj: "Бозгашти саривақтии қарзҳо то 50% беҳтар шуд ва ҳисобдории молиявӣ пурра рақамӣ гардид.",
      ru: "Возврат задолженностей клиентами ускорился на 50% благодаря наглядным напоминаниям и отчетам.",
      en: "Improved debt collection efficiency by 50% and brought absolute visual clarity to small business financial records."
    },
    link: "https://softcrm.vercel.app",
    image: "/images/softcrm.png"
  },
  {
    slug: "windom",
    title: {
      tj: "Windom",
      ru: "Windom",
      en: "Windom"
    },
    tagline: {
      tj: "Сайти корпоративии ширкати сохтмонӣ",
      ru: "Корпоративный сайт строительной компании",
      en: "Elite real estate & construction portal"
    },
    category: {
      tj: "Вебсайти Корпоративӣ",
      ru: "Корпоративный Сайт",
      en: "Corporate Web"
    },
    tags: ["React", "Framer Motion", "Tailwind CSS", "Interactive Maps"],
    metrics: "Fluid Layouts · Project Gallery · Lead Capture",
    problem: {
      tj: "Ширкати сохтмонии маҳаллӣ ба сайти муосир ниёз дошт, то сифати корҳо ва лоиҳаҳои бузурги худро ба муштариёни премиум нишон диҳад.",
      ru: "Строительной компании требовалось премиальное веб-представительство для презентации элитных объектов недвижимости и привлечения крупных инвесторов.",
      en: "An elite architectural development company lacked an online gallery capable of presenting their luxury structural designs to high-net-worth investors."
    },
    solution: {
      tj: "Ман сайти корпоративии Windom-ро сохтам, ки бо галереяҳои зебо ва эффектҳои бениҳоят ҳамвори ҳаракат муҷаҳҳаз аст.",
      ru: "Разработал стильный корпоративный сайт Windom с интерактивной галереей проектов, адаптивным макетом и формой захвата лидов.",
      en: "Designed and coded Windom, a stunning architectural landing experience with smooth parallax sections, premium image presentation galleries, and high-converting lead forms."
    },
    result: {
      tj: "Ширкат тавонист муштариёни нави зиёдеро ҷалб кунад ва бренди худро дар бозор қавӣ созад.",
      ru: "Компания укрепила свой статус на рынке и повысила число входящих заявок на консультации.",
      en: "Significantly enhanced the builder's digital prestige, resulting in a measurable increase in premium consulting requests."
    },
    link: "https://windom-orcin.vercel.app",
    image: "/images/windom.png"
  },
  {
    slug: "hamkor",
    title: {
      tj: "Hamkor Workspace",
      ru: "Hamkor Workspace",
      en: "Hamkor Workspace"
    },
    tagline: {
      tj: "Муҳити ягона барои ҳамкорӣ ва идоракунии лоиҳаҳо",
      ru: "Единое пространство для управления проектами и командами",
      en: "Unified workspace for team collaboration and task tracking"
    },
    category: {
      tj: "Платформаи Ҳамкорӣ",
      ru: "Платформа Совместной Работы",
      en: "Collaboration & Workspace"
    },
    tags: ["React", "Next.js", "Collaboration", "Task Management", "Tailwind CSS"],
    metrics: "Real-time updates · Interactive Kanban · Multi-member boards",
    problem: {
      tj: "Дастаҳо барои ҳамоҳангсозии вазифаҳо аз якчанд барнома истифода мебурданд, ки ин боиси гум шудани маълумот ва кам шудани самаранокӣ мешуд.",
      ru: "Командам приходилось использовать множество разрозненных инструментов, что приводило к потере фокуса и неэффективному планированию.",
      en: "Teams struggled with fragmented productivity tools, leading to communication silos, lost files, and missed deadlines."
    },
    solution: {
      tj: "Ман Hamkor Workspace-ро сохтам — платформаи муосири Kanban бо навсозии вақти воқеӣ барои идоракунии осони корҳо.",
      ru: "Разработал Hamkor Workspace — современное интерактивное пространство с Kanban-досками, чатом и совместным редактированием задач.",
      en: "Developed Hamkor Workspace, a fluid, interactive dashboard featuring real-time state synchronization, shared Kanban boards, and role-based permissions."
    },
    result: {
      tj: "Муошират ва идоракунии дастаҳо то 40% осонтар шуд ва ҳамаи корҳо дар як ҷо ҷамъ омаданд.",
      ru: "Интеграция команды улучшилась на 40%, позволив проектам закрываться быстрее и прозрачнее.",
      en: "Boosted team task completion rates by 40% and simplified cross-department project visibility."
    },
    link: "https://hamkor-workspace.vercel.app",
    image: "/images/hamkor.png"
  },
  {
    slug: "ai-job",
    title: {
      tj: "AI Job Olive",
      ru: "AI Job Olive",
      en: "AI Job Olive"
    },
    tagline: {
      tj: "Ёвари интеллектуалӣ барои пайдо кардани кор ва навиштани резюме",
      ru: "Интеллектуальный помощник для поиска работы и создания резюме",
      en: "Intelligent recruiter agent and resume enhancer"
    },
    category: {
      tj: "Платформаи Хизматрасонии AI",
      ru: "Платформа Поиска Работы с ИИ",
      en: "AI Job Platform"
    },
    tags: ["Next.js", "Gemini AI", "Tailwind CSS", "PDF Parsing", "Job Search"],
    metrics: "AI Engine · Real-time Feedback · Resume Analyzer",
    problem: {
      tj: "Муштариён барои мувофиқ кардани резюмеи худ ба талаботи бозори кор душворӣ мекашиданд ва аксар вақт ҷавоб намегирифтанд.",
      ru: "Соискатели тратили часы на адаптацию резюме под вакансии, не получая обратной связи от автоматических систем фильтрации.",
      en: "Job seekers struggle to customize their resumes for specific job descriptions, failing past automated resume screens (ATS)."
    },
    solution: {
      tj: "Ман AI Job Olive-ро сохтам — системаи интеллектуалӣ, ки резюмеро таҳлил карда, барои беҳтар кардани он тавсияҳои мушаххас медиҳад.",
      ru: "Создал AI Job Olive — сервис на базе искусственного интеллекта для мгновенного анализа резюме, подбора вакансий и генерации сопроводительных писем.",
      en: "Created AI Job Olive, an AI-powered assistant that parses resumes, scores them against job posts, and uses LLMs to suggest optimal improvements."
    },
    result: {
      tj: "Мусоҳибаҳои корбарон 3 маротиба бештар шуд ва ҷараёни ҳуҷҷатсупорӣ бениҳоят содда гардид.",
      ru: "Процент приглашений на собеседования у пользователей вырос в 3 раза за счет точной оптимизации резюме.",
      en: "Secured a 3x increase in interview callbacks for active users through automated, high-precision resume tailoring."
    },
    link: "https://ai-job-olive.vercel.app",
    image: "/images/ai-job.png"
  }
];

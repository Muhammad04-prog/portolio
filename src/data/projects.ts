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
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4MDAgNjAwJyB3aWR0aD0nODAwJyBoZWlnaHQ9JzYwMCc+CiAgPHJlY3Qgd2lkdGg9JzgwMCcgaGVpZ2h0PSc2MDAnIGZpbGw9JyNmZmZmZmYnIC8+CiAgPGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTUwLCA2MCknPgogICAgPHBhdGggZD0nTSAxODAsMTUwIEwgMzgwLDE5MCBMIDM1MCwzMzAgTCAxNzAsMjkwIFonIGZpbGw9J25vbmUnIHN0cm9rZT0nIzE2NGU2Mycgc3Ryb2tlLXdpZHRoPScxNicgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyAvPgogICAgPHBhdGggZD0nTSAyMz0sMTYwIEwgMjEwLDMwMCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMTY0ZTYzJyBzdHJva2Utd2lkdGg9JzgnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgLz4KICAgIDxwYXRoIGQ9J00gMjgwLDE3MCBMIDI2MCwzMTAnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzE2NGU2Mycgc3Ryb2tlLXdpZHRoPSc4JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIC8+CiAgICA8cGF0aCBkPSdNIDMzMCwxODAgTCAzMTAsMzIwJyBmaWxsPSdub25lJyBzdHJva2U9JyMxNjRlNjMnIHN0cm9rZS13aWR0aD0nOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyAvPgogICAgPHBhdGggZD0nTSAxNzUsMjEwIEwgMzY1LDI1MCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMTY0ZTYzJyBzdHJva2Utd2lkdGg9JzgnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgLz4KICAgIDxwYXRoIGQ9J00gMTcwLDI2MCBMIDM1NSwyOTUnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzE2NGU2Mycgc3Ryb2tlLXdpZHRoPSc4JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIC8+CiAgICA8cGF0aCBkPSdNIDM4MCwxOTAgTCA0MDAsMTQwIEwgNDUwLDE0NScgZmlsbD0nbm9uZScgc3Ryb2tlPScjMTY0ZTYzJyBzdHJva2Utd2lkdGg9JzE2JyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIC8+CiAgICA8cGF0aCBkPSdNIDE3MCwyOTAgTCAxNjAsMzMwIEwgMzMwLDM1MCBMIDMyMCwzMzAnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzE2NGU2Mycgc3Ryb2tlLXdpZHRoPScxNicgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyAvPgogICAgPGNpcmNsZSBjeD0nMTc1JyBjeT0nMzYwJyByPScxOCcgZmlsbD0nIzE2NGU2MycgLz4KICAgIDxjaXJjbGUgY3g9JzMxNScgY3k9JzMapMCcgcj0nMTgnIGZpbGw9JyMxNjRlNjMnIC8+CiAgICA8bGluZSB4MT0nNDQwJyB5MT0nMjAwJyB4Mj0nNDgwJyB5Mj0nMjAwJyBzdHJva2U9JyNkYzI2MjYnIHN0cm9rZS13aWR0aD0nMTQnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgLz4KICAgIDxsaW5lIHgxPSc0MTAnIHkxPScyMzUnIHgyPSc0NjUnIHkyPScyMzUnIHN0cm9rZT0nI2RjMjYyNicgc3Ryb2tlLXdpZHRoPScxNCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyAvPgogICAgPGxpbmUgeDE9JzQyNScgeTE9JzI3MCcgeDI9JzUyMCcgeTI9JzI3MCcgc3Ryb2tlPScjZGMyNjI2JyBzdHJva2Utd2lkdGg9JzE0JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIC8+CiAgICA8bGluZSB4MT0nMzk1JyB5MT0nMzA1JyB4Mj0nNDU1JyB5Mj0nMzA1JyBzdHJva2U9JyNkYzI2MjYnIHN0cm9rZS13aWR0aD0nMTQnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgLz4KICA8L2c+CiAgPHRleHQgeD0nNDAwJyB5PSc0NjUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZvbnQtZmFtaWx5PScmcXVvdDtJbnRlciZxdW90Oywgc2Fucy1zZXJpZicgZm9udC13ZWlnaHQ9JzgwMCcgZm9udC1zaXplPSc1MicgZmlsbD0nI2RjMjYyNicgbGV0dGVyLXNwYWNpbmc9JzQnPkZBU1QgU0hPUFBJTkc8L3RleHQ+CiAgPHRleHQgeD0nNDAwJyB5PSc1MTUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZvbnQtZmFtaWx5PScmcXVvdDtKZXRCcmFpbnMgTW9ubyZxdW90OywgbW9ub3NwYWNlJyBmb250LXdlaWdodD0nNTAwJyBmb250LXNpemU9JzIyJyBmaWxsPScjZjg3MTcxJyBsZXR0ZXItc3BhY2luZz0nNic+WU9VUiBUQUdMSU5FIEdPRVMgSEVSRTwvdGV4dD4KPC9zdmc+"
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
    image: "https://picsum.photos/seed/softcrm/800/600"
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
    image: "https://picsum.photos/seed/windom/800/600"
  }
];

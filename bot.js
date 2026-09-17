require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || '8456793416:AAF-kgpeJLO_S58PM3Qp4w3A44PIlqc1M4g';
let ADMIN_GROUP_ID = process.env.ADMIN_GROUP_ID || null;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Botni boshlash' },
  { command: '/courses', description: 'Kurslar' },
  { command: '/level', description: 'Darajamni aniqlash' },
  { command: '/freelesson', description: 'Bepul darsga yozilish' },
  { command: '/prices', description: 'Narxlar' },
  { command: '/teachers', description: 'Ustozlar' },
  { command: '/branches', description: 'Filiallar' },
  { command: '/contact', description: 'Bog‘lanish' },
  { command: '/help', description: 'Yordam' }
]);

const userStates = {};

const courseInfo = {
  general_english: `🇬🇧 GENERAL ENGLISH\n\nIngliz tilini noldan yoki mavjud darajangizdan boshlab tizimli ravishda o‘rganmoqchi bo‘lganlar uchun.\n\n👤 KIMLAR UCHUN?\n• Ingliz tilini endi boshlayotganlar\n• Kundalik hayotda ingliz tilida gaplashishni xohlaydiganlar\n• Grammatikasini mustahkamlashni istaydiganlar\n• So‘z boyligini oshirmoqchi bo‘lganlar\n• Keyinchalik IELTS yoki CEFR imtihoniga tayyorlanmoqchi bo‘lganlar\n\n⏳ DAVOMIYLIGI\n3 oy\n\n📚 KURS MAZMUNI\n• Grammar\n• Vocabulary\n• Speaking\n• Listening\n• Reading\n• Writing\n• Real-life English\n\n👥 GURUH HAJMI\nIndividual: 1 nafar\nMini-guruh: 3–5 nafar\nKatta guruh: 6–10 nafar\n\n💻 DARS FORMATI\n• Offline\n• Individual\n• Mini-guruh\n• Guruh\n\n🎯 KURS NATIJASI\nKurs davomida ingliz tilining asosiy grammatik strukturasi, kundalik vocabulary va 4 ta asosiy ko‘nikma — Speaking, Listening, Reading va Writing rivojlantiriladi.\n\n💰 NARXI\nNarx haqida ma'lumot olish uchun "Ro‘yxatdan o‘tish" tugmasini bosing.`,
  ielts: `🎯 IELTS\n\nIELTS imtihoniga yuqori natija uchun tizimli va professional tayyorgarlik.\n\n👤 KIMLAR UCHUN?\n• IELTS topshirmoqchi bo‘lganlar\n• Universitetga kirish uchun IELTS kerak bo‘lganlar\n• Chet elda o‘qishni rejalashtirayotganlar\n• Ish yoki immigratsiya uchun IELTS sertifikati kerak bo‘lganlar\n• IELTS ballini oshirmoqchi bo‘lganlar\n\n⏳ DAVOMIYLIGI\n4 oy\n\n📚 KURS MAZMUNI\n• Listening\n• Reading\n• Writing Task 1\n• Writing Task 2\n• Speaking\n• Grammar\n• Vocabulary\n• Exam strategies\n• Mock tests\n\n👥 GURUH HAJMI\nIndividual: 1 nafar\nMini-guruh: 3–5 nafar\nKatta guruh: 6–10 nafar\n\n💻 DARS FORMATI\n• Offline\n• Individual\n• Mini-guruh\n• Guruh\n\n🎯 ASOSIY MAQSAD\nIELTS imtihonining barcha qismlari bo‘yicha kompleks tayyorgarlik olib borish va o‘quvchining maqsad qilgan natijasiga erishishiga yordam berish.\n\n📊 NAZORAT\n• Progress monitoring\n• Regular mock tests\n• Speaking practice\n• Writing feedback\n• Individual teacher feedback\n\n💰 NARXI\nNarx haqida ma'lumot olish uchun "Ro‘yxatdan o‘tish" tugmasini bosing.`,
  pre_ielts: `📖 PRE-IELTS\n\nIELTS kursiga kirishdan oldin ingliz tili bazasini mustahkamlash uchun maxsus tayyorgarlik kursi.\n\n👤 KIMLAR UCHUN?\n• IELTS boshlash uchun grammatikasi yetarli bo‘lmaganlar\n• Intermediate darajaga chiqishni xohlaydiganlar\n• IELTS formatini hali yaxshi bilmaydiganlar\n• IELTS kursiga tayyorlanayotganlar\n• Ingliz tilidagi asosiy bilimlarini mustahkamlashni xohlaydiganlar\n\n⏳ DAVOMIYLIGI\n1 oy\n\n📚 KURS MAZMUNI\n• Essential Grammar\n• IELTS Vocabulary\n• Speaking fundamentals\n• Listening fundamentals\n• Reading fundamentals\n• Writing fundamentals\n• IELTS question types\n• Basic exam strategies\n\n👥 GURUH HAJMI\nIndividual: 1 nafar\nMini-guruh: 3–5 nafar\nKatta guruh: 6–10 nafar\n\n💻 DARS FORMATI\n• Offline\n• Individual\n• Mini-guruh\n• Guruh\n\n🎯 KURS NATIJASI\nO‘quvchini IELTS kursiga kirishga tayyorlash, asosiy grammar va vocabulary bazasini mustahkamlash hamda IELTS formatiga moslashtirish.\n\n💰 NARXI\nNarx haqida ma'lumot olish uchun "Ro‘yxatdan o‘tish" tugmasini bosing.`,
  cefr: `🌍 CEFR\n\nCEFR imtihoniga tayyorgarlik va ingliz tili darajasini xalqaro standartlar asosida rivojlantirish kursi.\n\n👤 KIMLAR UCHUN?\n• CEFR imtihoniga tayyorlanayotganlar\n• B1, B2 yoki C1 darajasini olishni maqsad qilganlar\n• O‘qish yoki ish uchun sertifikat kerak bo‘lganlar\n• Ingliz tili darajasini tasdiqlamoqchi bo‘lganlar\n\n📚 KURS MAZMUNI\n• Reading\n• Listening\n• Writing\n• Speaking\n• Grammar\n• Vocabulary\n• Exam strategies\n• Practice tests\n\n👥 GURUH HAJMI\nIndividual: 1 nafar\nMini-guruh: 3–5 nafar\nKatta guruh: 6–10 nafar\n\n💻 DARS FORMATI\n• Offline\n• Individual\n• Mini-guruh\n• Guruh\n\n🎯 KURS NATIJASI\nCEFR imtihonining asosiy qismlari bo‘yicha tizimli tayyorgarlik va imtihon formatida muntazam amaliyot.\n\n💰 NARXI\nNarx haqida ma'lumot olish uchun "Ro‘yxatdan o‘tish" tugmasini bosing.`
};

const pricesInfo = {
  ge_3: `🇬🇧 GENERAL ENGLISH\n\n📅 HAFTASIGA 3 MARTA\n📚 12 TA DARS\n\n👤 Individual — 1 o‘quvchi\n💰 2 000 000 UZS\n\n👥 Mini Group — 2 o‘quvchi\n💰 1 400 000 UZS\n\n👥 Mini Group — 3–5 o‘quvchi\n💰 1 000 000 UZS\n\n👥 Group — 6–10 o‘quvchi\n💰 800 000 UZS`,
  ge_6: `🇬🇧 GENERAL ENGLISH\n\n📅 HAFTASIGA 6 MARTA\n💳 OYLIK TO‘LOV\n\n👥 MAX General English Group — 6–10 o‘quvchi\n💰 1 400 000 UZS / oy`,
  ielts_3: `🎯 IELTS\n\n📅 HAFTASIGA 3 MARTA\n📚 12 TA DARS\n\n👤 Individual — 1 o‘quvchi\n💰 2 200 000 UZS\n\n👥 Mini Group — 2 o‘quvchi\n💰 1 500 000 UZS\n\n👥 Mini Group — 3–5 o‘quvchi\n💰 1 100 000 UZS\n\n👥 Group — 6–10 o‘quvchi\n💰 900 000 UZS`,
  ielts_6: `🎯 IELTS\n\n📅 HAFTASIGA 6 MARTA\n💳 OYLIK TO‘LOV\n\n👥 IELTS Group — 6–10 o‘quvchi\n💰 1 500 000 UZS / oy\n\n👤 Individual — 1 o‘quvchi\n💰 4 000 000 UZS / oy`,
  schedule: `📌 DARS JADVALI\n\n📅 Haftasiga 3 marta:\n12 ta dars\n\n📅 Haftasiga 6 marta:\nOylik to‘lov asosida\n\n💡 Sizga qaysi format mosligini bilmayapsizmi?\n\n🎯 Darajangiz va maqsadingizga qarab sizga mos guruhni aniqlab beramiz.`
};

// 10 ta savolli Quiz Testlar bazasi (Test.pdf asosida boyitilgan)
const quizQuestions = {
  beginner: [
    { q: "I ... a student.", options: ["A) am", "B) is", "C) are", "D) be"], correct: 0 },
    { q: "She ... two brothers.", options: ["A) have", "B) has", "C) haves", "D) having"], correct: 1 },
    { q: "They ... in London.", options: ["A) lives", "B) living", "C) live", "D) are live"], correct: 2 },
    { q: "What time ... it now?", options: ["A) is", "B) are", "C) does", "D) do"], correct: 0 },
    { q: "Where ... you from?", options: ["A) do", "B) is", "C) are", "D) be"], correct: 2 },
    { q: "This is ... apple on the table.", options: ["A) a", "B) an", "C) the", "D) -"], correct: 1 },
    { q: "He doesn't ... coffee in the evening.", options: ["A) likes", "B) liking", "C) like", "D) liked"], correct: 2 },
    { q: "Can you ... English well?", options: ["A) speak", "B) speaks", "C) speaking", "D) to speak"], correct: 0 },
    { q: "We go to English club ... Monday.", options: ["A) in", "B) at", "C) on", "D) to"], correct: 2 },
    { q: "... book is this on the desk?", options: ["A) Who", "B) Whose", "C) Where", "D) Which"], correct: 1 }
  ],
  pre_intermediate: [
    { q: "Yesterday, I ... to the city center.", options: ["A) go", "B) went", "C) have gone", "D) was go"], correct: 1 },
    { q: "She is ... than her older sister.", options: ["A) taller", "B) more tall", "C) tallest", "D) more taller"], correct: 0 },
    { q: "Have you ever ... to Samarkand?", options: ["A) be", "B) went", "C) been", "D) was"], correct: 2 },
    { q: "If it rains tomorrow, we ... at home.", options: ["A) stay", "B) will stay", "C) stayed", "D) would stay"], correct: 1 },
    { q: "Look! The children ... football outside.", options: ["A) play", "B) played", "C) are playing", "D) have played"], correct: 2 },
    { q: "You ... wear a helmet when riding a motorbike.", options: ["A) must", "B) can", "C) might", "D) could"], correct: 0 },
    { q: "How ... sugar do you put in your tea?", options: ["A) many", "B) much", "C) any", "D) few"], correct: 1 },
    { q: "He was tired because he ... hard all day.", options: ["A) worked", "B) has worked", "C) had worked", "D) works"], correct: 2 },
    { q: "I really enjoy ... interesting books in my free time.", options: ["A) read", "B) reading", "C) to read", "D) reads"], correct: 1 },
    { q: "This modern building was designed ... a famous architect.", options: ["A) with", "B) by", "C) from", "D) of"], correct: 1 }
  ],
  intermediate: [
    { q: "Choose an appropriate article:\nThere is a man in the room. ... man is your friend.", options: ["A) The", "B) A", "C) An", "D) -"], correct: 0 },
    { q: "Choose a verb in an appropriate tense:\nI would be very pleased if you ... to the party.", options: ["A) come", "B) will come", "C) came", "D) have come"], correct: 2 },
    { q: "Choose an appropriate form of Passive Voice:\nWhen I came home, the food ... .", options: ["A) prepared", "B) has been prepared", "C) was prepare", "D) was being prepared"], correct: 3 },
    { q: "Direct speech: Mary said: \"I am happy now\"\nIndirect speech: Mary said that ...", options: ["A) she was happy now", "B) she was happy then", "C) I was happy now", "D) I was happy then"], correct: 1 },
    { q: "Choose an appropriate preposition:\nI am looking ... a new job.", options: ["A) at", "B) through", "C) up", "D) for"], correct: 3 },
    { q: "By the time the train arrived, we ... on the platform for two hours.", options: ["A) waited", "B) have waited", "C) had been waiting", "D) are waiting"], correct: 2 },
    { q: "Although it was raining heavily, ... they went for a walk.", options: ["A) but", "B) yet", "C) -", "D) however"], correct: 2 },
    { q: "Neither my brother nor my parents ... able to attend the meeting.", options: ["A) is", "B) are", "C) was", "D) be"], correct: 1 },
    { q: "He strictly refused ... me the truth about what happened.", options: ["A) tell", "B) telling", "C) to tell", "D) told"], correct: 2 },
    { q: "The bridge ... built last year connects the two districts.", options: ["A) which", "B) which was", "C) that", "D) was"], correct: 1 }
  ],
  ielts: [
    { q: "Inversion:\nRarely ... such an extraordinary musical performance.", options: ["A) I have seen", "B) have I seen", "C) I saw", "D) did I saw"], correct: 1 },
    { q: "Third conditional:\nIf he had studied more diligently, he ... the exam.", options: ["A) would pass", "B) will pass", "C) would have passed", "D) had passed"], correct: 2 },
    { q: "Collocation:\nThe government introduced strict policies to curb ... emissions.", options: ["A) fossil", "B) carbon", "C) smoke", "D) fuel"], correct: 1 },
    { q: "Subjunctive mood:\nIt is imperative that every candidate ... present on time.", options: ["A) is", "B) be", "C) was", "D) will be"], correct: 1 },
    { q: "Preposition:\nThe sudden inflation had a profound impact ... local small businesses.", options: ["A) on", "B) in", "C) at", "D) upon"], correct: 0 },
    { q: "Conditional inversion:\nHad I known about the flight delay, I ... all this trouble.", options: ["A) wouldn't take", "B) wouldn't have taken", "C) hadn't taken", "D) didn't take"], correct: 1 },
    { q: "Vocabulary:\nShe is widely regarded ... one of the foremost pioneers in neuroscience.", options: ["A) like", "B) as", "C) to be", "D) for"], correct: 1 },
    { q: "Word choice:\nThe empirical findings of the study are fully ... with earlier research.", options: ["A) consistent", "B) constant", "C) continuous", "D) coherent"], correct: 0 },
    { q: "Participle clause:\nDespite ... thoroughly exhausted after the trip, they completed the report.", options: ["A) he was", "B) being", "C) of being", "D) to be"], correct: 1 },
    { q: "Inversion:\nNot only ... first place, but she also set a new national record.", options: ["A) she achieved", "B) did she achieve", "C) has she achieved", "D) she had achieved"], correct: 1 }
  ]
};

const i18n = {
  uz: {
    welcome: "Assalomu alaykum! Quyidagi menyudan kerakli bo'limni tanlang:",
    langChanged: "Til O'zbek tiliga o'zgartirildi 🇺🇿",
    menu: {
      level: "🎯 Darajamni aniqlash",
      courses: "🎓 Kurslar",
      prices: "💰 Narxlar",
      teachers: "👨‍🏫 Ustozlarimiz",
      branches: "📍 Filiallar",
      contact: "📞 Bog'lanish",
      freeLesson: "🎁 Bepul darsga yozilish",
      aboutUs: "ℹ️ Biz haqimizda batafsil",
      changeLang: "🌐 Tilni o'zgartirish"
    },
    selectLangText: "Iltimos, tilni tanlang:",
    questions: {
      name: "Ismingiz?",
      phone: "Telefon raqamingiz?",
      sendPhoneBtn: "📱 Raqamni yuborish",
      level: "Hozirgi ingliz tili darajangiz?",
      goal: "Maqsadingiz?",
      ieltsScore: "Maqsad ball (IELTS):",
      examDate: "Imtihon sanasi (masalan: 20-Noyabr yoki 05-Mart):",
      completed: "Ma’lumotlaringiz qabul qilindi. Siz uchun mos kursni aniqlash uchun administratorimiz siz bilan bog‘lanadi.",
      completedFreeLesson: "Tabriklaymiz! Bepul darsga yozilish uchun ma'lumotlaringiz qabul qilindi. Administratorimiz tez orada siz bilan bog'lanadi.",
      cancel: "❌ Bekor qilish"
    },
    levels: ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced", "Bilmayman"],
    goals: ["IELTS", "General English", "CEFR", "Universitet", "Ish", "Chet elga o‘qishga ketish"],
    scores: ["5.5", "6.0", "6.5", "7.0", "7.5+"],
    coursesMenu: "🎓 EXPRESS IELTS KURSLARI\n\nO‘zingizga mos yo‘nalishni tanlang:",
    pricesMenu: "💰 EXPRESS IELTS KURSLARI NARXLARI\n\nO‘zingizga mos dars formatini tanlang:\n\n🇬🇧 GENERAL ENGLISH\n🎯 IELTS\n\nDarslar:\n📅 Haftasiga 3 marta — 12 ta dars\n📅 Haftasiga 6 marta — oylik to‘lov"
  },
  ru: {
    welcome: "Здравствуйте! Выберите нужный раздел из меню ниже:",
    langChanged: "Язык изменён на Русский 🇷🇺",
    menu: {
      level: "🎯 Определить мой уровень",
      courses: "🎓 Курсы",
      prices: "💰 Цены",
      teachers: "👨‍🏫 Наши преподаватели",
      branches: "📍 Филиалы",
      contact: "📞 Контакты",
      freeLesson: "🎁 Записаться на пробный урок",
      aboutUs: "ℹ️ Подробнее о нас",
      changeLang: "🌐 Изменить язык"
    },
    selectLangText: "Пожалуйста, выберите язык:",
    questions: {
      name: "Ваше имя?",
      phone: "Ваш номер телефона?",
      sendPhoneBtn: "📱 Отправить номер",
      level: "Ваш текущий уровень английского?",
      goal: "Ваша цель?",
      ieltsScore: "Целевой балл (IELTS):",
      examDate: "Дата экзамена (например: 20-Ноябрь):",
      completed: "Ваши данные приняты. Наш администратор свяжется с вами, чтобы подобрать подходящий курс.",
      completedFreeLesson: "Поздравляем! Ваша заявка на бесплатный урок принята. Наш администратор скоро свяжется с вами.",
      cancel: "❌ Отмена"
    },
    levels: ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced", "Не знаю"],
    goals: ["IELTS", "General English", "CEFR", "Университет", "Работа", "Учеба за границей"],
    scores: ["5.5", "6.0", "6.5", "7.0", "7.5+"],
    coursesMenu: "🎓 КУРСЫ EXPRESS IELTS\n\nВыберите подходящее направление:",
    pricesMenu: "💰 ЦЕНЫ КУРСОВ EXPRESS IELTS\n\nВыберите подходящий формат занятий:\n\n🇬🇧 GENERAL ENGLISH\n🎯 IELTS\n\nЗанятия:\n📅 3 раза в неделю — 12 уроков\n📅 6 раз в неделю — месячная оплата"
  }
};

function getState(chatId) {
  if (!userStates[chatId]) {
    userStates[chatId] = { lang: 'uz', step: 'NONE', data: {}, quiz: null };
  }
  return userStates[chatId];
}

function getMainMenu(lang) {
  const t = i18n[lang].menu;
  return {
    reply_markup: {
      keyboard: [
        [t.level, t.courses],
        [t.prices, t.teachers],
        [t.branches, t.contact],
        [{ text: t.aboutUs, web_app: { url: "https://www.express-ielts.com/" } }],
        [t.freeLesson, t.changeLang]
      ],
      resize_keyboard: true
    }
  };
}

const langMenu = {
  reply_markup: {
    keyboard: [["🇺🇿 O'zbek tili", "🇷🇺 Русский язык"]],
    resize_keyboard: true
  }
};

function sendCoursesMenu(chatId, lang) {
  const t = i18n[lang];
  bot.sendMessage(chatId, t.coursesMenu, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🇬🇧 General English", callback_data: "course_general_english" }],
        [{ text: "🎯 IELTS", callback_data: "course_ielts" }],
        [{ text: "📖 Pre-IELTS", callback_data: "course_pre_ielts" }],
        [{ text: "🌍 CEFR", callback_data: "course_cefr" }],
        [{ text: "📚 ACCA", callback_data: "course_acca" }]
      ]
    }
  });
}

function sendPricesMenu(chatId, lang) {
  const t = i18n[lang];
  bot.sendMessage(chatId, t.pricesMenu, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🇬🇧 General English (3 marta)", callback_data: "price_ge_3" }],
        [{ text: "🇬🇧 General English (6 marta)", callback_data: "price_ge_6" }],
        [{ text: "🎯 IELTS (3 marta)", callback_data: "price_ielts_3" }],
        [{ text: "🎯 IELTS (6 marta)", callback_data: "price_ielts_6" }],
        [{ text: "📌 Dars jadvali va maslahat", callback_data: "price_schedule" }]
      ]
    }
  });
}

function startSurvey(chatId, lang, isFreeLesson = false) {
  const state = getState(chatId);
  if (state.quiz && state.quiz.timer) {
    clearTimeout(state.quiz.timer);
  }
  state.quiz = null;
  const q = i18n[lang].questions;
  state.step = isFreeLesson ? 'ASK_NAME_FREE' : 'ASK_NAME';
  state.data = {};
  bot.sendMessage(chatId, q.name, {
    reply_markup: {
      keyboard: [[q.cancel]],
      resize_keyboard: true
    }
  });
}

// --- DARANI ANIQLASH (QUIZ) TIZIMI ---

function startQuizFlow(chatId, lang) {
  const state = getState(chatId);
  if (state.quiz && state.quiz.timer) {
    clearTimeout(state.quiz.timer);
  }
  state.quiz = null;
  state.data = {};
  state.step = 'ASK_NAME_FOR_QUIZ';

  bot.sendMessage(chatId, "🎯 <b>INGLIZ TILI DARAJANGIZNI ANIQLASH TESTI</b>\n\nTestni boshlashdan oldin, iltimos, ismingizni kiriting:", {
    parse_mode: 'HTML',
    reply_markup: {
      keyboard: [["❌ Bekor qilish"]],
      resize_keyboard: true
    }
  });
}

function sendQuizLevelSelection(chatId, lang) {
  const text = `🎯 <b>INGLIZ TILI DARAJANGIZNI ANIQLASH TESTI</b>\n\n` +
    `Sizga tanlangan darajangiz bo‘yicha <b>10 ta test savoli</b> beriladi.\n` +
    `⏱ Har bir savol uchun maksimal <b>1 daqiqa</b> vaqt ajratiladi.\n\n` +
    `O‘zingizni taxminan qaysi darajada deb hisoblaysiz? Tanlang:`;

  const inlineKeyboard = [
    [{ text: "🟢 Beginner / Elementary", callback_data: "quiz_lvl_beginner" }],
    [{ text: "🟡 Pre-Intermediate", callback_data: "quiz_lvl_pre_intermediate" }],
    [{ text: "🟠 Intermediate", callback_data: "quiz_lvl_intermediate" }],
    [{ text: "🎯 IELTS / Upper-Intermediate", callback_data: "quiz_lvl_ielts" }]
  ];

  bot.sendMessage(chatId, text, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: inlineKeyboard }
  });
}

function startQuizForUser(chatId, level) {
  const state = getState(chatId);
  if (state.quiz && state.quiz.timer) {
    clearTimeout(state.quiz.timer);
  }

  const levelNames = {
    beginner: "Beginner / Elementary",
    pre_intermediate: "Pre-Intermediate",
    intermediate: "Intermediate",
    ielts: "IELTS / Upper-Intermediate"
  };

  state.step = 'IN_QUIZ';
  state.quiz = {
    level: level,
    levelName: levelNames[level] || level,
    currentIndex: 0,
    score: 0,
    timer: null,
    currentMsgId: null
  };

  bot.sendMessage(chatId, `🚀 <b>Test boshlandi!</b>\n\n📌 Daraja: <b>${state.quiz.levelName}</b>\nSavollar soni: <b>10 ta</b>\n⏱ Har bir savolga: <b>1 daqiqa</b>\n\nOmad tilaymiz! Birinchi savol:`, {
    parse_mode: 'HTML',
    reply_markup: {
      keyboard: [["❌ Testni to'xtatish"]],
      resize_keyboard: true
    }
  }).then(() => {
    sendNextQuizQuestion(chatId);
  });
}

function sendNextQuizQuestion(chatId) {
  const state = getState(chatId);
  if (!state.quiz || state.step !== 'IN_QUIZ') return;

  const questions = quizQuestions[state.quiz.level];
  const idx = state.quiz.currentIndex;

  if (idx >= questions.length) {
    finishQuiz(chatId);
    return;
  }

  const item = questions[idx];
  const qNum = idx + 1;
  const total = questions.length;

  const text = `❓ <b>${qNum}/${total}-savol</b> (⏱ 1 daqiqa)\n\n${item.q}`;

  const inlineKeyboard = [
    [
      { text: item.options[0], callback_data: `quiz_ans_${idx}_0` },
      { text: item.options[1], callback_data: `quiz_ans_${idx}_1` }
    ],
    [
      { text: item.options[2], callback_data: `quiz_ans_${idx}_2` },
      { text: item.options[3], callback_data: `quiz_ans_${idx}_3` }
    ]
  ];

  bot.sendMessage(chatId, text, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: inlineKeyboard }
  }).then(sentMsg => {
    if (!state.quiz) return;
    state.quiz.currentMsgId = sentMsg.message_id;

    // 1 daqiqalik (60 soniya) taymer
    if (state.quiz.timer) clearTimeout(state.quiz.timer);
    state.quiz.timer = setTimeout(() => {
      handleQuizTimeout(chatId, idx);
    }, 60000);
  }).catch(() => {});
}

function handleQuizTimeout(chatId, questionIndex) {
  const state = getState(chatId);
  if (!state.quiz || state.step !== 'IN_QUIZ') return;
  if (state.quiz.currentIndex !== questionIndex) return;

  if (state.quiz.currentMsgId) {
    bot.editMessageReplyMarkup({ inline_keyboard: [] }, {
      chat_id: chatId,
      message_id: state.quiz.currentMsgId
    }).catch(() => {});
  }

  bot.sendMessage(chatId, `⏰ <b>${questionIndex + 1}-savol uchun 1 daqiqa vaqt tugadi!</b>\nKeyingi savolga o'tamiz...`, { parse_mode: 'HTML' });

  state.quiz.currentIndex++;
  setTimeout(() => {
    sendNextQuizQuestion(chatId);
  }, 1000);
}

function finishQuiz(chatId) {
  const state = getState(chatId);
  if (!state.quiz) return;

  if (state.quiz.timer) {
    clearTimeout(state.quiz.timer);
    state.quiz.timer = null;
  }

  const score = state.quiz.score;
  const level = state.quiz.level;
  const levelName = state.quiz.levelName;

  // 5% lik maxsus promokod
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const promoCode = `EI-5-${randomDigits}`;

  // Kurs tavsiyasi
  let recommendedCourse = "";
  if (level === 'beginner') {
    recommendedCourse = score >= 7 ? "🇬🇧 General English (Elementary / Pre-Intermediate)" : "🇬🇧 General English (Beginner - noldan boshlash)";
  } else if (level === 'pre_intermediate') {
    recommendedCourse = score >= 7 ? "📖 Pre-IELTS yoki Intermediate" : "🇬🇧 General English (Pre-Intermediate)";
  } else if (level === 'intermediate') {
    recommendedCourse = score >= 7 ? "🎯 IELTS (Standard tayyorgarlik)" : "📖 Pre-IELTS yoki CEFR";
  } else {
    // ielts
    recommendedCourse = score >= 7 ? "🎯 IELTS Intensive (Band 7.0 - 8.5+)" : "🎯 IELTS Standard (Band 6.0 - 7.0)";
  }

  const resultMsg = `🎉 <b>Tabriklaymiz! Siz testni muvaffaqiyatli yakunladingiz!</b>\n\n` +
    `📊 Sizning natijangiz: <b>${score} / 10 ball</b>\n` +
    `🎓 Sizga tavsiya etiladigan kurs: <b>${recommendedCourse}</b>\n\n` +
    `🎁 <b>Siz uchun maxsus 5% CHEGIRMA PROMOKODI:</b>\n` +
    `🎟 Promo-kod: <code>${promoCode}</code>\n\n` +
    `📍 Ushbu promokod bilan <b>Express IELTS</b> o‘quv markazimizga tashrif buyursangiz, kurs to‘lovingizda <b>5% skidka (chegirma)</b> beriladi!\n\n` +
    `📞 Administrator: @expressieltsadmin\n` +
    `☎️ Telefon: +998 99 033 4111`;

  bot.sendMessage(chatId, resultMsg, {
    parse_mode: 'HTML',
    ...getMainMenu(state.lang)
  });

  // Guruh adminiga yuborish
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  const dd = String(now.getDate()).padStart(2,'0');
  const mo = String(now.getMonth()+1).padStart(2,'0');
  const yyyy = now.getFullYear();
  const dateStr = `${hh}:${mm}:${ss} ${dd}-${mo}-${yyyy}`;

  const adminMsg = `⚡️ <b>Yangi test natijasi va ariza (Express IELTS bot)!</b>\n\n` +
    `👤 <b>Ism:</b> ${state.data.name || "Noma'lum"}\n` +
    `📞 <b>Telefon:</b> ${state.data.phone || "Noma'lum"}\n` +
    `📊 <b>Tanlangan daraja:</b> ${levelName}\n` +
    `🏆 <b>To'plagan balli:</b> ${score} / 10 ball\n` +
    `🎯 <b>Tavsiya etilgan kurs:</b> ${recommendedCourse}\n` +
    `🎟 <b>Berilgan promokod (5% skidka):</b> <code>${promoCode}</code>\n` +
    `📅 <b>Topshirilgan sana:</b> ${dateStr}`;

  if (ADMIN_GROUP_ID) {
    bot.sendMessage(ADMIN_GROUP_ID, adminMsg, { parse_mode: 'HTML' }).catch(err => {
      console.error("Adminga xabar yuborib bo'lmadi:", err.message);
    });
  } else {
    console.log("--- Test natijasi admin xabari ---\n", adminMsg);
  }

  state.step = 'NONE';
  state.quiz = null;
}

// --- BOT BUYRUQLARI ---

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const state = getState(chatId);
  if (state.quiz && state.quiz.timer) {
    clearTimeout(state.quiz.timer);
  }
  state.quiz = null;
  state.step = 'NONE';
  state.data = {};
  bot.sendMessage(chatId, i18n[state.lang].welcome, getMainMenu(state.lang));
});

bot.onText(/\/courses/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const state = getState(msg.chat.id);
  sendCoursesMenu(msg.chat.id, state.lang);
});

bot.onText(/\/freelesson/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const state = getState(msg.chat.id);
  startSurvey(msg.chat.id, state.lang, true);
});

bot.onText(/\/level/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const state = getState(msg.chat.id);
  startQuizFlow(msg.chat.id, state.lang);
});

bot.onText(/\/prices/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const state = getState(msg.chat.id);
  sendPricesMenu(msg.chat.id, state.lang);
});

bot.onText(/\/teachers/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const teachersText = `🏆 BIZNING USTOZLARIMIZ\n\nEXPRESS IELTS’da barcha o‘qituvchilar:\n\n✅ 5+ yillik tajribaga ega\n✅ IELTS 7.5–8.5 sertifikat natijalariga ega\n✅ Markazning ichki metodikasi asosida tayyorlangan\n✅ O‘quvchi progressini muntazam kuzatib boradi\n✅ Amaliy va natijaga yo‘naltirilgan dars olib boradi`;
  bot.sendMessage(msg.chat.id, teachersText, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎓 KURSLARNI KO‘RISH", callback_data: "action_courses_menu" }],
        [{ text: "📝 RO‘YXATDAN O‘TISH", callback_data: "action_register" }],
        [{ text: "📞 ADMINISTRATOR BILAN BOG‘LANISH", url: "https://t.me/expressieltsadmin" }],
        [{ text: "🏠 BOSH MENYU", callback_data: "action_main_menu" }]
      ]
    }
  });
});

bot.onText(/\/branches/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const branchesText = `🏫 EXPRESS IELTS\n\n📍 MANZIL\nToshkent shahri, Yunusobod tumani,\nAhmad Donish ko‘chasi, 1A\n\n🕐 ISH VAQTI\nHar kuni:\n07:00 — 21:00\n\n📞 TELEFON\n+998 99 033 4112\n\n🗺 BIZNI XARITADAN TOPING`;
  bot.sendMessage(msg.chat.id, branchesText, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📍 YANDEX MAPS'DA OCHISH", url: "https://yandex.com/navi/org/express_ielts/63485081529?si=yr7xbyr68f7yxjgz91m1u9jakc" }],
        [{ text: "📍 GOOGLE MAPS'DA OCHISH", url: "https://www.google.com/maps/search/?api=1&query=Express+IELTS+Tashkent+Yunusobod" }],
        [{ text: "🏠 BOSH MENYU", callback_data: "action_main_menu" }]
      ]
    }
  });
});

bot.onText(/\/contact/, (msg) => {
  if (msg.chat.type !== 'private') return;
  const contactText = `📞 EXPRESS IELTS BILAN BOG‘LANING\n\nSavollaringiz bormi?\nKurslar, narxlar, dars jadvali yoki bepul diagnostika haqida batafsil ma’lumot olish uchun biz bilan bog‘laning.\n\n📞 TELEFON\n+998 99 033 4111\n\n📱 TELEGRAM\n@EXPRESS_IELTS\n\n📸 INSTAGRAM\n@express_ielts_uz\n\n🌐 WEBSITE\nwww.express-ielts.com\n\n📍 MANZIL\nToshkent shahri, Yunusobod tumani,\nAhmad Donish ko‘chasi, 1A\n\n🕐 ISH VAQTI\nHar kuni:\n07:00 — 21:00`;
  bot.sendMessage(msg.chat.id, contactText, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📱 TELEGRAM", url: "https://t.me/EXPRESS_IELTS" }, { text: "📸 INSTAGRAM", url: "https://instagram.com/express_ielts_uz" }],
        [{ text: "🌐 WEBSITE", url: "https://express-ielts.com/" }]
      ]
    }
  });
});

bot.onText(/\/setadmin/, (msg) => {
  if (msg.chat.type === 'private') return;
  const groupId = msg.chat.id;
  ADMIN_GROUP_ID = groupId;
  const fs = require('fs');
  let envContent = '';
  if (fs.existsSync('.env')) {
    envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('ADMIN_GROUP_ID=')) {
      envContent = envContent.replace(/ADMIN_GROUP_ID=.*/g, `ADMIN_GROUP_ID=${groupId}`);
    } else {
      envContent += `\nADMIN_GROUP_ID=${groupId}\n`;
    }
  } else {
    envContent = `ADMIN_GROUP_ID=${groupId}\n`;
  }
  fs.writeFileSync('.env', envContent);
  bot.sendMessage(groupId, "✅ Ushbu guruh administrator guruhi sifatida muvaffaqiyatli belgilandi! Yangi o'quvchilar anketalari va test natijalari endi shu yerga keladi.");
});

bot.onText(/\/help/, (msg) => {
  if (msg.chat.type !== 'private') return;
  bot.sendMessage(msg.chat.id, "Yordam kerak bo'lsa yoki savollaringiz bo'lsa, to'g'ridan-to'g'ri administratorga murojaat qilishingiz mumkin:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "👨‍💻 Administratorga yozish", url: "https://t.me/expressieltsadmin" }]
      ]
    }
  });
});

// --- CALLBACK QUERY ISHLASH ---

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const state = getState(chatId);

  bot.answerCallbackQuery(query.id).catch(() => {});

  // Quiz darajasini tanlash
  if (data.startsWith('quiz_lvl_')) {
    const level = data.replace('quiz_lvl_', '');
    startQuizForUser(chatId, level);
    return;
  }

  // Quiz javobi bosilganda
  if (data.startsWith('quiz_ans_')) {
    const parts = data.split('_');
    const qIndex = parseInt(parts[2]);
    const ansIndex = parseInt(parts[3]);

    if (!state.quiz || state.step !== 'IN_QUIZ') return;
    if (state.quiz.currentIndex !== qIndex) return;

    if (state.quiz.timer) {
      clearTimeout(state.quiz.timer);
      state.quiz.timer = null;
    }

    bot.editMessageReplyMarkup({ inline_keyboard: [] }, {
      chat_id: chatId,
      message_id: query.message.message_id
    }).catch(() => {});

    const questions = quizQuestions[state.quiz.level];
    const item = questions[qIndex];
    if (ansIndex === item.correct) {
      state.quiz.score++;
      bot.sendMessage(chatId, `✅ <b>To'g'ri javob!</b>`, { parse_mode: 'HTML' });
    } else {
      bot.sendMessage(chatId, `❌ <b>Noto'g'ri!</b> To'g'ri javob: <b>${item.options[item.correct]}</b>`, { parse_mode: 'HTML' });
    }

    state.quiz.currentIndex++;
    setTimeout(() => {
      sendNextQuizQuestion(chatId);
    }, 1200);
    return;
  }

  if (data.startsWith('course_')) {
    const courseId = data.replace('course_', '');
    let text = courseInfo[courseId];
    if (!text && courseId === 'acca') text = "📚 ACCA bo'yicha ma'lumot tez orada qo'shiladi.";

    const inlineKeyboard = [
      [{ text: "📝 RO‘YXATDAN O‘TISH", callback_data: "action_register" }]
    ];
    if (courseId === 'ielts') {
      inlineKeyboard.push([{ text: "🎯 MAQSAD BALLIMNI ANIQLASH", callback_data: "action_level" }]);
    } else {
      inlineKeyboard.push([{ text: "🎯 DARAJAMNI ANIQLASH", callback_data: "action_level" }]);
    }
    inlineKeyboard.push([
      { text: "📞 ADMINISTRATOR BILAN BOG‘LANISH", url: "https://t.me/expressieltsadmin" }
    ]);
    inlineKeyboard.push([
      { text: "⬅️ KURSLARGA QAYTISH", callback_data: "action_courses_menu" }
    ]);

    bot.editMessageText(text, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: { inline_keyboard: inlineKeyboard }
    });
    return;
  }

  if (data.startsWith('price_')) {
    const priceId = data.replace('price_', '');
    const text = pricesInfo[priceId];

    const inlineKeyboard = [];
    if (priceId === 'schedule') {
      inlineKeyboard.push([{ text: "🎯 DARAJAMNI ANIQLASH", callback_data: "action_level" }]);
    } else {
      inlineKeyboard.push([{ text: "📝 RO‘YXATDAN O‘TISH", callback_data: "action_register" }]);
    }
    inlineKeyboard.push([
      { text: "📞 ADMINISTRATOR BILAN BOG‘LANISH", url: "https://t.me/expressieltsadmin" }
    ]);
    inlineKeyboard.push([
      { text: "⬅️ NARXLARGA QAYTISH", callback_data: "action_prices_menu" }
    ]);

    bot.editMessageText(text, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: { inline_keyboard: inlineKeyboard }
    });
    return;
  }

  if (data === 'action_courses_menu') {
    const t = i18n[state.lang];
    bot.editMessageText(t.coursesMenu, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🇬🇧 General English", callback_data: "course_general_english" }],
          [{ text: "🎯 IELTS", callback_data: "course_ielts" }],
          [{ text: "📖 Pre-IELTS", callback_data: "course_pre_ielts" }],
          [{ text: "🌍 CEFR", callback_data: "course_cefr" }],
          [{ text: "📚 ACCA", callback_data: "course_acca" }]
        ]
      }
    });
    return;
  }

  if (data === 'action_prices_menu') {
    const t = i18n[state.lang];
    bot.editMessageText(t.pricesMenu, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🇬🇧 General English (3 marta)", callback_data: "price_ge_3" }],
          [{ text: "🇬🇧 General English (6 marta)", callback_data: "price_ge_6" }],
          [{ text: "🎯 IELTS (3 marta)", callback_data: "price_ielts_3" }],
          [{ text: "🎯 IELTS (6 marta)", callback_data: "price_ielts_6" }],
          [{ text: "📌 Dars jadvali va maslahat", callback_data: "price_schedule" }]
        ]
      }
    });
    return;
  }

  if (data === 'action_register') {
    startSurvey(chatId, state.lang);
    return;
  }

  if (data === 'action_level') {
    startQuizFlow(chatId, state.lang);
    return;
  }

  if (data === 'action_main_menu') {
    bot.deleteMessage(chatId, query.message.message_id).catch(() => {});
    bot.sendMessage(chatId, i18n[state.lang].welcome, getMainMenu(state.lang));
  }
});

// --- XABARLARNI QABUL QILISH ---

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  
  if (msg.chat.type !== 'private') return;
  if (text.startsWith('/')) return;

  const state = getState(chatId);

  if (text === "🇺🇿 O'zbek tili") {
    state.lang = 'uz';
    bot.sendMessage(chatId, i18n.uz.langChanged, getMainMenu('uz'));
    return;
  }
  if (text === "🇷🇺 Русский язык") {
    state.lang = 'ru';
    bot.sendMessage(chatId, i18n.ru.langChanged, getMainMenu('ru'));
    return;
  }

  const t = i18n[state.lang].menu;
  const q = i18n[state.lang].questions;

  // Bekor qilish / Chiqish
  if (text === q.cancel || text === "❌ Bekor qilish" || text === "❌ Testni to'xtatish") {
    if (state.quiz && state.quiz.timer) {
      clearTimeout(state.quiz.timer);
    }
    state.quiz = null;
    state.step = 'NONE';
    state.data = {};
    bot.sendMessage(chatId, i18n[state.lang].welcome, getMainMenu(state.lang));
    return;
  }

  // --- QUIZ UCHUN ISM VA RAQAM YIG'ISH ---

  if (state.step === 'ASK_NAME_FOR_QUIZ') {
    state.data.name = text;
    state.step = 'ASK_PHONE_FOR_QUIZ';
    bot.sendMessage(chatId, `Rahmat, <b>${text}</b>!\n\nEndi telefon raqamingizni pastdagi 📱 «Raqamni yuborish» tugmasi orqali yuboring:`, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [[{ text: "📱 Raqamni yuborish", request_contact: true }], ["❌ Bekor qilish"]],
        resize_keyboard: true
      }
    });
    return;
  }

  if (state.step === 'ASK_PHONE_FOR_QUIZ') {
    if (msg.contact) {
      state.data.phone = msg.contact.phone_number;
    } else {
      bot.sendMessage(chatId, "❌ Iltimos, telefon raqamingizni qo'lda yozmang!\n\nPastdagi 📱 «Raqamni yuborish» tugmasini bosing.", {
        reply_markup: {
          keyboard: [[{ text: "📱 Raqamni yuborish", request_contact: true }], ["❌ Bekor qilish"]],
          resize_keyboard: true
        }
      });
      return;
    }

    state.step = 'SELECT_QUIZ_LEVEL';
    sendQuizLevelSelection(chatId, state.lang);
    return;
  }

  // --- ODDIY SO'ROVNOMA JARAYONI (Kursga yozilish / Bepul dars) ---

  if (state.step === 'ASK_NAME' || state.step === 'ASK_NAME_FREE') {
    state.data.name = text;
    const nextStep = state.step === 'ASK_NAME_FREE' ? 'ASK_PHONE_FREE' : 'ASK_PHONE';
    state.step = nextStep;
    bot.sendMessage(chatId, q.phone, {
      reply_markup: {
        keyboard: [[{ text: q.sendPhoneBtn, request_contact: true }], [q.cancel]],
        resize_keyboard: true
      }
    });
    return;
  }

  if (state.step === 'ASK_PHONE' || state.step === 'ASK_PHONE_FREE') {
    if (msg.contact) {
      state.data.phone = msg.contact.phone_number;
    } else {
      bot.sendMessage(chatId, "❌ Iltimos, telefon raqamingizni qo'lda yozmang!\n\nPastdagi 📱 «Raqamni yuborish» tugmasini bosing.", {
        reply_markup: {
          keyboard: [[{ text: q.sendPhoneBtn, request_contact: true }], [q.cancel]],
          resize_keyboard: true
        }
      });
      return;
    }
    
    if (state.step === 'ASK_PHONE_FREE') {
      bot.sendMessage(chatId, q.completedFreeLesson, getMainMenu(state.lang));
      
      const now = new Date();
      const hh = String(now.getHours()).padStart(2,'0');
      const mm2 = String(now.getMinutes()).padStart(2,'0');
      const ss = String(now.getSeconds()).padStart(2,'0');
      const dd = String(now.getDate()).padStart(2,'0');
      const mo = String(now.getMonth()+1).padStart(2,'0');
      const yyyy = now.getFullYear();
      const dateStr = `${hh}:${mm2}:${ss} ${dd}-${mo}-${yyyy}`;
      
      const leadMsg = `⚡️ Yangi ariza Express IELTS botidan!\n\n👤 Ism: ${state.data.name}\n📞 Telefon: ${state.data.phone}\n🎯 Qiziqish: Bepul darsga yozilish\n📅 Topshirilgan sana: ${dateStr}`;
      
      if (ADMIN_GROUP_ID) {
        bot.sendMessage(ADMIN_GROUP_ID, leadMsg).catch(() => {});
      } else {
        console.log("--- Bepul darsga yozilish ---\n", leadMsg);
      }
      state.step = 'NONE';
      state.data = {};
      return;
    }
    
    state.step = 'ASK_LEVEL';
    const levels = i18n[state.lang].levels;
    const kb = [];
    for (let i=0; i<levels.length; i+=2) {
      if (levels[i+1]) kb.push([levels[i], levels[i+1]]);
      else kb.push([levels[i]]);
    }
    kb.push([q.cancel]);

    bot.sendMessage(chatId, q.level, {
      reply_markup: { keyboard: kb, resize_keyboard: true }
    });
    return;
  }

  if (state.step === 'ASK_LEVEL') {
    state.data.level = text;
    state.step = 'ASK_GOAL';

    const goals = i18n[state.lang].goals;
    const kb = [];
    for (let i=0; i<goals.length; i+=2) {
      if (goals[i+1]) kb.push([goals[i], goals[i+1]]);
      else kb.push([goals[i]]);
    }
    kb.push([q.cancel]);

    bot.sendMessage(chatId, q.goal, {
      reply_markup: { keyboard: kb, resize_keyboard: true }
    });
    return;
  }

  if (state.step === 'ASK_GOAL') {
    state.data.goal = text;
    
    if (text === "IELTS") {
      state.step = 'ASK_IELTS_SCORE';
      const scores = i18n[state.lang].scores;
      bot.sendMessage(chatId, q.ieltsScore, {
        reply_markup: { keyboard: [scores, [q.cancel]], resize_keyboard: true }
      });
    } else {
      finishSurvey(chatId, state);
    }
    return;
  }

  if (state.step === 'ASK_IELTS_SCORE') {
    state.data.ieltsScore = text;
    state.step = 'ASK_IELTS_DATE';
    bot.sendMessage(chatId, q.examDate, {
      reply_markup: { keyboard: [[q.cancel]], resize_keyboard: true }
    });
    return;
  }

  if (state.step === 'ASK_IELTS_DATE') {
    const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
    const parts = text.split('-');
    const dayNum = parseInt(parts[0]);
    const monthName = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase() : '';
    
    if (parts.length !== 2 || isNaN(dayNum) || dayNum < 1 || dayNum > 31 || !months.includes(monthName)) {
      const monthsList = months.join(', ');
      bot.sendMessage(chatId, `❌ Noto'g'ri format!\n\nIltimos, sanani KUN-OY shaklida kiriting.\n\nMasalan: 20-Noyabr yoki 05-Mart\n\n📅 Oy nomlari:\n${monthsList}`, {
        reply_markup: { keyboard: [[q.cancel]], resize_keyboard: true }
      });
      return;
    }
    state.data.examDate = `${dayNum}-${monthName}`;
    finishSurvey(chatId, state);
    return;
  }

  // --- ASOSIY MENU TUGMALARI ---

  if (text === t.changeLang) {
    bot.sendMessage(chatId, i18n[state.lang].selectLangText, langMenu);
    return;
  }

  if (text === t.level) {
    startQuizFlow(chatId, state.lang);
    return;
  }
  
  if (text === t.freeLesson) {
    startSurvey(chatId, state.lang, true);
    return;
  }

  if (text === t.courses) {
    sendCoursesMenu(chatId, state.lang);
    return;
  } 
  
  if (text === t.prices) {
    sendPricesMenu(chatId, state.lang);
    return;
  } 
  
  if (text === t.teachers) {
    const teachersText = `🏆 BIZNING USTOZLARIMIZ\n\nEXPRESS IELTS’da barcha o‘qituvchilar:\n\n✅ 5+ yillik tajribaga ega\n✅ IELTS 7.5–8.5 sertifikat natijalariga ega\n✅ Markazning ichki metodikasi asosida tayyorlangan\n✅ O‘quvchi progressini muntazam kuzatib boradi\n✅ Amaliy va natijaga yo‘naltirilgan dars olib boradi`;
    bot.sendMessage(chatId, teachersText, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🎓 KURSLARNI KO‘RISH", callback_data: "action_courses_menu" }],
          [{ text: "📝 RO‘YXATDAN O‘TISH", callback_data: "action_register" }],
          [{ text: "📞 ADMINISTRATOR BILAN BOG‘LANISH", url: "https://t.me/expressieltsadmin" }],
          [{ text: "🏠 BOSH MENYU", callback_data: "action_main_menu" }]
        ]
      }
    });
  } else if (text === t.branches) {
    const branchesText = `🏫 EXPRESS IELTS\n\n📍 MANZIL\nToshkent shahri, Yunusobod tumani,\nAhmad Donish ko‘chasi, 1A\n\n🕐 ISH VAQTI\nHar kuni:\n07:00 — 21:00\n\n📞 TELEFON\n+998 99 033 4112\n\n🗺 BIZNI XARITADAN TOPING`;
    bot.sendMessage(chatId, branchesText, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📍 YANDEX MAPS'DA OCHISH", url: "https://yandex.com/navi/org/express_ielts/63485081529?si=yr7xbyr68f7yxjgz91m1u9jakc" }],
          [{ text: "📍 GOOGLE MAPS'DA OCHISH", url: "https://www.google.com/maps/search/?api=1&query=Express+IELTS+Tashkent+Yunusobod" }],
          [{ text: "🏠 BOSH MENYU", callback_data: "action_main_menu" }]
        ]
      }
    });
  } else if (text === t.contact) {
    const contactText = `📞 EXPRESS IELTS BILAN BOG‘LANING\n\nSavollaringiz bormi?\nKurslar, narxlar, dars jadvali yoki bepul diagnostika haqida batafsil ma’lumot olish uchun biz bilan bog‘laning.\n\n📞 TELEFON\n+998 99 033 4111\n\n📱 TELEGRAM\n@EXPRESS_IELTS\n\n📸 INSTAGRAM\n@express_ielts_uz\n\n🌐 WEBSITE\nwww.express-ielts.com\n\n📍 MANZIL\nToshkent shahri, Yunusobod tumani,\nAhmad Donish ko‘chasi, 1A\n\n🕐 ISH VAQTI\nHar kuni:\n07:00 — 21:00`;
    bot.sendMessage(chatId, contactText, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📱 TELEGRAM", url: "https://t.me/EXPRESS_IELTS" }, { text: "📸 INSTAGRAM", url: "https://instagram.com/express_ielts_uz" }],
          [{ text: "🌐 WEBSITE", url: "https://express-ielts.com/" }]
        ]
      }
    });
  }
});

function finishSurvey(chatId, state) {
  const q = i18n[state.lang].questions;
  bot.sendMessage(chatId, q.completed, getMainMenu(state.lang));

  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  const dd = String(now.getDate()).padStart(2,'0');
  const mo = String(now.getMonth()+1).padStart(2,'0');
  const yyyy = now.getFullYear();
  const dateStr = `${hh}:${mm}:${ss} ${dd}-${mo}-${yyyy}`;

  let interestText = `Kursga yozilish (${state.data.goal})`;
  if (state.data.goal === 'IELTS' && state.data.ieltsScore) {
    interestText += ` (Maqsad: ${state.data.ieltsScore})`;
  }
  interestText += `\n📊 Daraja: ${state.data.level}`;
  if (state.data.examDate) {
    interestText += `\n📆 Imtihon sanasi: ${state.data.examDate}`;
  }

  const leadMsg = `⚡️ Yangi ariza Express IELTS botidan!\n\n👤 Ism: ${state.data.name}\n📞 Telefon: ${state.data.phone}\n🎯 Qiziqish: ${interestText}\n📅 Topshirilgan sana: ${dateStr}`;

  if (ADMIN_GROUP_ID) {
    bot.sendMessage(ADMIN_GROUP_ID, leadMsg).catch(err => {
      console.error("Adminga xabar yuborib bo'lmadi:", err.message);
    });
  } else {
    console.log("------------------------");
    console.log("YANGI LEAD QABUL QILINDI:");
    console.log(leadMsg);
    console.log("------------------------");
  }

  state.step = 'NONE';
  state.data = {};
}

console.log('Express IELTS Bot (Quiz & Promocode tizimi bilan) ishga tushdi...');

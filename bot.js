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

const i18n = {
  uz: {
    welcome: "Assalomu alaykum! Quydagi menyudan kerakli bo'limni tanlang:",
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
      examDate: "Imtihon sanasi (masalan, 20-Noyabr):",
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
      examDate: "Дата экзамена (например, 20 Ноября):",
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
    userStates[chatId] = { lang: 'uz', step: 'NONE', data: {} };
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

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const state = getState(chatId);
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
  startSurvey(msg.chat.id, state.lang);
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
  // Update or append to .env
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
  bot.sendMessage(groupId, "✅ Ushbu guruh administrator guruhi sifatida muvaffaqiyatli belgilandi! Yangi o'quvchilar anketalari endi shu yerga keladi.");
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

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const state = getState(chatId);

  bot.answerCallbackQuery(query.id);

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

  if (data === 'action_register' || data === 'action_level') {
    startSurvey(chatId, state.lang);
  }

  if (data === 'action_main_menu') {
    bot.deleteMessage(chatId, query.message.message_id).catch(() => {});
    bot.sendMessage(chatId, i18n[state.lang].welcome, getMainMenu(state.lang));
  }
});

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

  if (text === q.cancel) {
    state.step = 'NONE';
    state.data = {};
    bot.sendMessage(chatId, i18n[state.lang].welcome, getMainMenu(state.lang));
    return;
  }

  // --- SO'ROVNOMA JARAYONI ---

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
      state.data.phone = text;
    }
    
    if (state.step === 'ASK_PHONE_FREE') {
      bot.sendMessage(chatId, q.completedFreeLesson, getMainMenu(state.lang));
      
      const now = new Date();
      const dateStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      
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
    state.data.examDate = text;
    finishSurvey(chatId, state);
    return;
  }

  // --- ASOSIY MENU TUGMALARI ---

  if (text === t.changeLang) {
    bot.sendMessage(chatId, i18n[state.lang].selectLangText, langMenu);
    return;
  }

  if (text === t.level) {
    startSurvey(chatId, state.lang);
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
  const dateStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');

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

console.log('Bot (Yangi menyu bilan) ishga tushdi...');

// Translated long descriptions for smart locks (EN / RU), keyed by slug.
// The Georgian source lives in smart-locks.json (regenerated from RTF docs);
// these translations are kept separately so a regen never overwrites them.

type Tr = { en: string[]; ru: string[] };

// ---- reusable AIXC blocks ----
const A = {
  en: {
    intro: (m: string) =>
      `${m} has a refined design and a solid construction. This lock can be opened in several different ways.`,
    p1: "1) Fingerprint — with ultra-fast modern sensors the door opens with a single touch.",
    p2: "2) Remote code generation — you can let someone into your home even when you are somewhere else entirely.",
    p3: "3) If a visitor rings the bell, you can open the door remotely from your phone.",
    p4: "4) Mechanical key — used for unforeseen situations.",
    p5cam: "5) This model also has a camera: when a visitor rings the lock, the indoor monitor shows who it is, and a photo of whoever stands outside is sent to your phone automatically; you can also open the door remotely.",
    p5domofon:
      "5) This model also has an intercom-style camera: at any time you can view it from your phone and talk to the person outside, capture a photo or video; and if someone lingers, you automatically receive a notification on your phone.",
  },
  ru: {
    intro: (m: string) =>
      `${m} имеет изысканный дизайн и прочную конструкцию. Этот замок можно открыть несколькими разными способами.`,
    p1: "1) Отпечаток пальца — благодаря сверхбыстрым современным сенсорам дверь открывается одним касанием.",
    p2: "2) Дистанционная генерация кода — вы можете впустить человека в дом, даже находясь совсем в другом месте.",
    p3: "3) Если посетитель позвонит в звонок, вы можете открыть дверь дистанционно с телефона.",
    p4: "4) Механический ключ — используется в непредвиденных случаях.",
    p5cam: "5) У этой модели также есть камера: когда посетитель звонит в замок, на внутреннем мониторе видно, кто это, а фото стоящего снаружи автоматически приходит на телефон; дверь также можно открыть дистанционно.",
    p5domofon:
      "5) У этой модели также есть камера по принципу домофона: в любое время вы можете посмотреть её с телефона и поговорить с человеком снаружи, записать фото или видео; а если кто-то задержится, вы автоматически получите уведомление на телефон.",
  },
};

// ---- reusable Philips blocks ----
const P = {
  en: {
    intro: (m: string) =>
      `${m} has a refined design and a solid construction. This lock can be opened in 6 different ways.`,
    p1: "1) Ultra-fast fingerprint — the smart lock is equipped with modern sensors.",
    p2: "2) Card — with the Philips smart card you can open the door instantly.",
    ip66: (m: string) =>
      `3) ${m} has IP66 protection, which means it is a rain-resistant model.`,
    face: "3) Face recognition — this Philips model has a face-recognition system that greatly speeds up opening; the door can be opened without touching the lock.",
    face3d:
      "3) 3D face recognition — this Philips model has a 3D face-recognition system that greatly speeds up opening; the door can be opened without touching the lock.",
    domofon4:
      "4) This Philips model has an intercom-style camera; it sends a notification when someone moves in front of the lock or rings the bell. From your phone you can talk to the visitor outside at any time, take a photo or video, and by dictating a one-time code you can let the visitor open the door.",
    mech3: "3) Of course, the lock comes with a mechanical key, designed for unforeseen situations.",
    mech5: "5) Of course, the lock comes with a mechanical key, designed for unforeseen situations.",
  },
  ru: {
    intro: (m: string) =>
      `${m} имеет изысканный дизайн и прочную конструкцию. Этот замок можно открыть 6 различными способами.`,
    p1: "1) Сверхбыстрый отпечаток пальца — умный замок оснащён современными сенсорами.",
    p2: "2) Карта — с помощью умной карты Philips можно мгновенно открыть дверь.",
    ip66: (m: string) =>
      `3) ${m} имеет защиту IP66, что означает, что это влагозащищённая модель.`,
    face: "3) Распознавание лица — у этой модели Philips есть система распознавания лица, которая значительно ускоряет открытие; дверь можно открыть, не касаясь замка.",
    face3d:
      "3) 3D-распознавание лица — у этой модели Philips есть система 3D-распознавания лица, которая значительно ускоряет открытие; дверь можно открыть, не касаясь замка.",
    domofon4:
      "4) У этой модели Philips есть камера по принципу домофона; она отправляет уведомление, если кто-то двигается перед замком или звонит в звонок. С телефона вы в любое время можете поговорить с посетителем снаружи, сделать фото или видео, а при диктовке одноразового кода посетитель сможет открыть дверь.",
    mech3: "3) Конечно, замок поставляется с механическим ключом, рассчитанным на непредвиденные случаи.",
    mech5: "5) Конечно, замок поставляется с механическим ключом, рассчитанным на непредвиденные случаи.",
  },
};

export const SMART_LOCK_DESC_I18N: Record<string, Tr> = {
  a8p: {
    en: [A.en.intro("A8P"), A.en.p1, A.en.p2, A.en.p3, A.en.p4],
    ru: [A.ru.intro("A8P"), A.ru.p1, A.ru.p2, A.ru.p3, A.ru.p4],
  },
  f1: {
    en: [A.en.intro("F1"), A.en.p1, A.en.p2, A.en.p3, A.en.p4],
    ru: [A.ru.intro("F1"), A.ru.p1, A.ru.p2, A.ru.p3, A.ru.p4],
  },
  a8c: {
    en: [A.en.intro("A8C"), A.en.p1, A.en.p2, A.en.p3, A.en.p4, A.en.p5cam],
    ru: [A.ru.intro("A8C"), A.ru.p1, A.ru.p2, A.ru.p3, A.ru.p4, A.ru.p5cam],
  },
  a2c: {
    en: [A.en.intro("A2C"), A.en.p1, A.en.p2, A.en.p3, A.en.p4, A.en.p5cam],
    ru: [A.ru.intro("A2C"), A.ru.p1, A.ru.p2, A.ru.p3, A.ru.p4, A.ru.p5cam],
  },
  f11: {
    en: [A.en.intro("F11"), A.en.p1, A.en.p2, A.en.p3, A.en.p4, A.en.p5domofon],
    ru: [A.ru.intro("F11"), A.ru.p1, A.ru.p2, A.ru.p3, A.ru.p4, A.ru.p5domofon],
  },
  "philips-ddl603e-5hws": {
    en: [P.en.intro("Philips DDL603E-5HWS"), P.en.p1, P.en.p2, P.en.mech3],
    ru: [P.ru.intro("Philips DDL603E-5HWS"), P.ru.p1, P.ru.p2, P.ru.mech3],
  },
  "philips-ddl611s-5hbs": {
    en: [
      P.en.intro("Philips DDL611S-5HBS"),
      P.en.p1,
      P.en.p2,
      P.en.ip66("Philips DDL611S-5HBS"),
      P.en.domofon4,
      P.en.mech5,
    ],
    ru: [
      P.ru.intro("Philips DDL611S-5HBS"),
      P.ru.p1,
      P.ru.p2,
      P.ru.ip66("Philips DDL611S-5HBS"),
      P.ru.domofon4,
      P.ru.mech5,
    ],
  },
  "philips-ddl702-fvp-7hws": {
    en: [
      P.en.intro("Philips DDL702-FVP-7HWS"),
      P.en.p1,
      P.en.p2,
      P.en.face,
      P.en.domofon4,
      P.en.mech5,
    ],
    ru: [
      P.ru.intro("Philips DDL702-FVP-7HWS"),
      P.ru.p1,
      P.ru.p2,
      P.ru.face,
      P.ru.domofon4,
      P.ru.mech5,
    ],
  },
  "philips-ddl720-fvp-7hws": {
    en: [
      P.en.intro("Philips DDL720-FVP-7HWS"),
      P.en.p1,
      P.en.p2,
      P.en.face3d,
      P.en.domofon4,
      P.en.mech5,
    ],
    ru: [
      P.ru.intro("Philips DDL720-FVP-7HWS"),
      P.ru.p1,
      P.ru.p2,
      P.ru.face3d,
      P.ru.domofon4,
      P.ru.mech5,
    ],
  },
  "philips-easykey-ddl709-fvp-7hws": {
    en: [
      P.en.intro("Philips EasyKey DDL709-FVP-7HWS"),
      P.en.p1,
      P.en.p2,
      P.en.face3d,
      P.en.domofon4,
      P.en.mech5,
    ],
    ru: [
      P.ru.intro("Philips EasyKey DDL709-FVP-7HWS"),
      P.ru.p1,
      P.ru.p2,
      P.ru.face3d,
      P.ru.domofon4,
      P.ru.mech5,
    ],
  },
};

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ka" | "en" | "ru";
export const LOCALES: { code: Locale; label: string }[] = [
  { code: "ka", label: "ქარ" },
  { code: "en", label: "ENG" },
  { code: "ru", label: "RUS" },
];

const STORAGE_KEY = "besa-locale";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleContext = createContext<Ctx>({ locale: "ka", setLocale: () => {} });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ka");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && ["ka", "en", "ru"].includes(saved)) setLocaleState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  const { locale } = useContext(LocaleContext);
  return (key: string): string =>
    DICT[locale][key] ?? DICT.ka[key] ?? key;
}

// ---------------------------------------------------------------------------
// data-value helpers (translate Georgian product fields)
// ---------------------------------------------------------------------------

const COUNTRY: Record<string, Record<Locale, string>> = {
  "სამხრეთ კორეა": { ka: "სამხრეთ კორეა", en: "South Korea", ru: "Южная Корея" },
};

const TOKENS: Record<string, Record<Locale, string>> = {
  ანაბეჭდი: { ka: "ანაბეჭდი", en: "Fingerprint", ru: "Отпечаток пальца" },
  "თითის ანაბეჭდი": {
    ka: "თითის ანაბეჭდი",
    en: "Fingerprint",
    ru: "Отпечаток пальца",
  },
  კოდი: { ka: "კოდი", en: "Code", ru: "Код" },
  ბარათი: { ka: "ბარათი", en: "Card", ru: "Карта" },
  გასაღები: { ka: "გასაღები", en: "Key", ru: "Ключ" },
  "მექანიკური გასაღები": {
    ka: "მექანიკური გასაღები",
    en: "Mechanical key",
    ru: "Механический ключ",
  },
  სახელური: { ka: "სახელური", en: "Handle", ru: "Ручка" },
  "დისტანციურად ტელეფონის მეშვეობით": {
    ka: "დისტანციურად ტელეფონის მეშვეობით",
    en: "Remotely via phone",
    ru: "Дистанционно через телефон",
  },
  "დისტანციურად ტელეფონის მეშვეობით ვიდეო კამერის დახმარებით": {
    ka: "დისტანციურად ტელეფონის მეშვეობით ვიდეო კამერის დახმარებით",
    en: "Remotely via phone with video camera",
    ru: "Дистанционно через телефон с видеокамерой",
  },
};

export function tToken(value: string, locale: Locale): string {
  const v = value.trim();
  return TOKENS[v]?.[locale] ?? v;
}

/** Translate a "+"-joined feature/methods list. */
export function tFeatures(value: string, locale: Locale): string {
  if (locale === "ka") return value;
  return value
    .split("+")
    .map((p) => tToken(p.trim(), locale))
    .join(" + ");
}

/** Translate units / fireproof spec / sizes / weight / volume / country. */
export function tValue(value: string, locale: Locale): string {
  if (locale === "ka" || !value) return value;
  let out = value;
  if (COUNTRY[value.trim()]) return COUNTRY[value.trim()][locale];
  const fire = locale === "en" ? "Fireproof" : "Огнестойкий";
  out = out.replace(/ცეცხლგამძლე|ცეცხლგამძე/g, fire);
  out = out.replace(/წთ/g, locale === "en" ? "min" : "мин");
  out = out.replace(/მმ/g, locale === "en" ? "mm" : "мм");
  out = out.replace(/ლიტრი/g, locale === "en" ? "L" : "л");
  out = out.replace(/კგ/g, locale === "en" ? "kg" : "кг");
  out = tFeatures(out, locale);
  return out;
}

// ---------------------------------------------------------------------------
// dictionary
// ---------------------------------------------------------------------------

type Dict = Record<string, string>;

const ka: Dict = {
  "nav.products": "პროდუქცია",
  "nav.brands": "ბრენდები",
  "nav.about": "შესახებ",
  "nav.news": "სიახლეები",
  "nav.contact": "კონტაქტი",
  "cat.locks": "საკეტები",
  "cat.handles": "კარის სახელურები",
  "cat.safes": "სეიფები",
  "cat.smartLocks": "ჭკვიანი საკეტები",
  "cat.accessories": "აქსესუარები",
  "cat.closers": "შვეიცრები",
  "cat.cylinders": "ცილინდრული გულარა",
  "cat.gunSafes": "თოფის სეიფი",
  "safeType.wall": "კედელში ჩასაშენებელი",
  "safeType.key": "გასაღების შესანახი",
  "safeType.hotel": "სასტუმროს სეიფი",
  "brand.tagline": "უსაფრთხოების სისტემები",
  "brand.empty": "ამ ბრენდის პროდუქცია მალე დაემატება.",
  "hero.title1": "უსაფრთხოება",
  "hero.title2": "თქვენი სახლისა და ბიზნესისთვის",
  "hero.subtitle":
    "საკეტები, სეიფები, კარის ფურნიტურა და უსაფრთხოების თანმდევი ნივთები მაღალი ხარისხის ბრენდებისგან.",
  "hero.cta1": "პროდუქციის ნახვა",
  "hero.cta2": "შოურუმის მონახულება",
  "sec.categories": "პროდუქტის კატეგორიები",
  "sec.why": "რატომ ჩვენ?",
  "sec.showroom": "ჩვენი შოურუმი",
  "why.brands.t": "ხარისხიანი ბრენდები",
  "why.brands.d": "მხოლოდ ხარისხიანი პროდუქცია",
  "why.choice.t": "დიდი არჩევანი",
  "why.choice.d": "ასობით პროდუქტი ერთ სივრცეში",
  "why.consult.t": "პროფესიონალური კონსულტაცია",
  "why.consult.d": "გამოცდილი გუნდი თქვენს სამსახურში",
  "why.install.t": "მონტაჟი და ინსტალაცია",
  "why.install.d": "მომსახურება და გამოცდილება",
  "banner.viewDetails": "დეტალურად ნახვა",
  "banner.smartSub": "თანამედროვე უსაფრთხოება, მარტივი მართვა, მაქსიმალური დაცვა.",
  "banner.safesSub":
    "საიმედო სეიფები სახლისა და ბიზნესისთვის — ყველა ზომისა და კლასის.",
  "feat.fireproof": "ცეცხლგამძლე",
  "feat.digitalCode": "ციფრული კოდი",
  "feat.key": "გასაღები",
  "feat.steelBody": "ფოლადის კორპუსი",
  "feat.certified": "სერტიფიცირებული",
  "feat.sizes": "სხვადასხვა ზომა",
  "showroom.desc":
    "ჩვენი შოურუმი მდებარეობს თბილისში, კოსმონავტების სანაპიროზე, სადაც გაეცნობით ცოცხალ პროდუქციას და მიიღებთ პროფესიონალურ კონსულტაციას.",
  "showroom.viewMap": "რუკაზე ნახვა",
  "label.phone": "ტელეფონი",
  "label.email": "ელ. ფოსტა",
  "label.address": "მისამართი",
  "label.hours": "სამუშაო საათები",
  "site.address": "თბილისი, კოსმონავტების სანაპირო, მე-3 რიგი, მაღაზია N101",
  "site.addressShort": "თბილისი, კოსმონავტების სანაპირო, მაღაზია N101",
  "site.hours": "ორშ–კვ: 9:00–18:00",
  "footer.tagline":
    "ჩვენ გთავაზობთ თანამედროვე უსაფრთხოების გადაწყვეტილებებს სახლისა და ბიზნესისთვის.",
  "footer.company": "კომპანია",
  "footer.about": "ჩვენ შესახებ",
  "footer.otherBrands": "სხვა ბრენდები",
  "footer.rights": "ყველა უფლება დაცულია.",
  "cat.home": "მთავარი",
  "filter.brands": "ბრენდები",
  "filter.price": "ფასი",
  "filter.category": "კატეგორია",
  "filter.clear": "ფილტრის გასუფთავება",
  "filter.filter": "ფილტრი",
  "filter.categories": "კატეგორიები",
  "list.showing": "ნაჩვენებია",
  "list.products": "პროდუქტი",
  "list.seeMore": "იხილეთ მეტი",
  "list.priceOnRequest": "ფასი შეთანხმებით",
  "list.none": "ამ ფილტრით პროდუქტი არ მოიძებნა.",
  "list.all": "ყველა პროდუქცია",
  "detail.backSafes": "სეიფების სიაში დაბრუნება",
  "detail.backSmart": "ჭკვიანი საკეტების სიაში დაბრუნება",
  "detail.backClosers": "შვეიცრების სიაში დაბრუნება",
  "detail.methods": "გაღების მეთოდები",
  "detail.description": "აღწერა",
  "detail.order": "შეკვეთა / კონსულტაცია",
  "spec.brand": "ბრენდი",
  "spec.model": "მოდელი",
  "spec.spec": "სპეციფიკაცია",
  "spec.outer": "გარე ზომა",
  "spec.inner": "შიდა ზომა",
  "spec.volume": "მოცულობა",
  "spec.features": "მახასიათებლები",
  "spec.weight": "წონა",
  "spec.country": "მწარმოებელი ქვეყანა",
  "spec.wall": "კედლის სისქე",
  "spec.door": "კარის სისქე",
  "spec.material": "მატერიალი",
  "spec.doorWeight": "კარის წონა",
  "spec.doorSize": "კარის ზომა",
  "spec.color": "ფერი",
  "color.black": "შავი",
  "color.silver": "ვერცხლისფერი",
  "weight.light": "მსუბუქი კარი (≤45კგ)",
  "weight.medium": "საშუალო კარი (45–85კგ)",
  "weight.heavy": "მძიმე კარი (85კგ+)",
  "filter.feature": "ფუნქცია",
  "feat.holdOpen": "გაჩერების ფუნქცია",
  "contact.title": "კონტაქტი",
  "contact.connect": "დაგვიკავშირდით",
  "contact.connectDesc":
    "დაგვიკავშირდით ნებისმიერი კითხვისთვის. ჩვენ მზად ვართ მოგაწოდოთ პროფესიონალური კონსულტაცია და საუკეთესო გადაწყვეტილებები.",
  "form.title": "გამოგზავნეთ შეტყობინება",
  "form.subtitle": "შეავსეთ ფორმა და ჩვენ სწრაფად დაგიკავშირდებით.",
  "form.name": "თქვენი სახელი",
  "form.email": "თქვენი ელ. ფოსტა",
  "form.phone": "ტელეფონი",
  "form.chooseTopic": "აირჩიეთ თემა",
  "form.message": "შეტყობინება",
  "form.send": "გაგზავნა",
  "form.successTitle": "გმადლობთ!",
  "form.successText": "თქვენი შეტყობინება მიღებულია. ჩვენ მალე დაგიკავშირდებით.",
  "form.new": "ახალი შეტყობინება",
  "subj.product": "პროდუქციის შესახებ",
  "subj.price": "ფასები და შეკვეთა",
  "subj.install": "მონტაჟი / ინსტალაცია",
  "subj.consult": "კონსულტაცია",
  "subj.other": "სხვა",
  "map.ourLocation": "ჩვენი მდებარეობა",
  "map.directions": "მარშრუტის ნახვა",
  "unit.min": "წთ",
};

const en: Dict = {
  "nav.products": "Products",
  "nav.brands": "Brands",
  "nav.about": "About",
  "nav.news": "News",
  "nav.contact": "Contact",
  "cat.locks": "Locks",
  "cat.handles": "Door handles",
  "cat.safes": "Safes",
  "cat.smartLocks": "Smart locks",
  "cat.accessories": "Accessories",
  "cat.closers": "Door closers",
  "cat.cylinders": "Cylinder cores",
  "cat.gunSafes": "Gun safe",
  "safeType.wall": "Built-in (wall)",
  "safeType.key": "Key box",
  "safeType.hotel": "Hotel safe",
  "brand.tagline": "Security systems",
  "brand.empty": "Products for this brand are coming soon.",
  "hero.title1": "Security",
  "hero.title2": "for your home and business",
  "hero.subtitle":
    "Locks, safes, door hardware and related security products from high-quality brands.",
  "hero.cta1": "View products",
  "hero.cta2": "Visit showroom",
  "sec.categories": "Product categories",
  "sec.why": "Why us?",
  "sec.showroom": "Our showroom",
  "why.brands.t": "Quality brands",
  "why.brands.d": "Only high-quality products",
  "why.choice.t": "Wide selection",
  "why.choice.d": "Hundreds of products in one place",
  "why.consult.t": "Professional consultation",
  "why.consult.d": "An experienced team at your service",
  "why.install.t": "Mounting & installation",
  "why.install.d": "Service and expertise",
  "banner.viewDetails": "View details",
  "banner.smartSub":
    "Modern security, simple control, maximum protection.",
  "banner.safesSub":
    "Reliable safes for home and business — every size and class.",
  "feat.fireproof": "Fireproof",
  "feat.digitalCode": "Digital code",
  "feat.key": "Key",
  "feat.steelBody": "Steel body",
  "feat.certified": "Certified",
  "feat.sizes": "Various sizes",
  "showroom.desc":
    "Our showroom is located in Tbilisi, on Kosmonavtebi Embankment, where you can see the products in person and get professional consultation.",
  "showroom.viewMap": "View on map",
  "label.phone": "Phone",
  "label.email": "Email",
  "label.address": "Address",
  "label.hours": "Working hours",
  "site.address": "Tbilisi, Kosmonavtebi Embankment, 3rd row, shop N101",
  "site.addressShort": "Tbilisi, Kosmonavtebi Embankment, shop N101",
  "site.hours": "Mon–Sun: 9:00–18:00",
  "footer.tagline":
    "We offer modern security solutions for home and business.",
  "footer.company": "Company",
  "footer.about": "About us",
  "footer.otherBrands": "Other brands",
  "footer.rights": "All rights reserved.",
  "cat.home": "Home",
  "filter.brands": "Brands",
  "filter.price": "Price",
  "filter.category": "Category",
  "filter.clear": "Clear filters",
  "filter.filter": "Filters",
  "filter.categories": "Categories",
  "list.showing": "Showing",
  "list.products": "products",
  "list.seeMore": "See more",
  "list.priceOnRequest": "Price on request",
  "list.none": "No products match this filter.",
  "list.all": "All products",
  "detail.backSafes": "Back to safes",
  "detail.backSmart": "Back to smart locks",
  "detail.backClosers": "Back to door closers",
  "detail.methods": "Unlocking methods",
  "detail.description": "Description",
  "detail.order": "Order / Consultation",
  "spec.brand": "Brand",
  "spec.model": "Model",
  "spec.spec": "Specification",
  "spec.outer": "External size",
  "spec.inner": "Internal size",
  "spec.volume": "Volume",
  "spec.features": "Features",
  "spec.weight": "Weight",
  "spec.country": "Country of manufacture",
  "spec.wall": "Wall thickness",
  "spec.door": "Door thickness",
  "spec.material": "Material",
  "spec.doorWeight": "Door weight",
  "spec.doorSize": "Door size",
  "spec.color": "Color",
  "color.black": "Black",
  "color.silver": "Silver",
  "weight.light": "Light door (≤45kg)",
  "weight.medium": "Medium door (45–85kg)",
  "weight.heavy": "Heavy door (85kg+)",
  "filter.feature": "Function",
  "feat.holdOpen": "Hold-open function",
  "contact.title": "Contact",
  "contact.connect": "Get in touch",
  "contact.connectDesc":
    "Contact us with any question. We are ready to provide professional consultation and the best solutions.",
  "form.title": "Send a message",
  "form.subtitle": "Fill out the form and we will get back to you quickly.",
  "form.name": "Your name",
  "form.email": "Your email",
  "form.phone": "Phone",
  "form.chooseTopic": "Choose a topic",
  "form.message": "Message",
  "form.send": "Send",
  "form.successTitle": "Thank you!",
  "form.successText": "Your message has been received. We will contact you soon.",
  "form.new": "New message",
  "subj.product": "About products",
  "subj.price": "Prices and ordering",
  "subj.install": "Mounting / installation",
  "subj.consult": "Consultation",
  "subj.other": "Other",
  "map.ourLocation": "Our location",
  "map.directions": "Get directions",
  "unit.min": "min",
};

const ru: Dict = {
  "nav.products": "Продукция",
  "nav.brands": "Бренды",
  "nav.about": "О нас",
  "nav.news": "Новости",
  "nav.contact": "Контакты",
  "cat.locks": "Замки",
  "cat.handles": "Дверные ручки",
  "cat.safes": "Сейфы",
  "cat.smartLocks": "Умные замки",
  "cat.accessories": "Аксессуары",
  "cat.closers": "Доводчики",
  "cat.cylinders": "Цилиндры",
  "cat.gunSafes": "Оружейный сейф",
  "safeType.wall": "Встраиваемый в стену",
  "safeType.key": "Ключница",
  "safeType.hotel": "Гостиничный сейф",
  "brand.tagline": "Системы безопасности",
  "brand.empty": "Продукция этого бренда скоро появится.",
  "hero.title1": "Безопасность",
  "hero.title2": "для вашего дома и бизнеса",
  "hero.subtitle":
    "Замки, сейфы, дверная фурнитура и сопутствующие товары безопасности от качественных брендов.",
  "hero.cta1": "Смотреть продукцию",
  "hero.cta2": "Посетить шоурум",
  "sec.categories": "Категории продукции",
  "sec.why": "Почему мы?",
  "sec.showroom": "Наш шоурум",
  "why.brands.t": "Качественные бренды",
  "why.brands.d": "Только качественная продукция",
  "why.choice.t": "Большой выбор",
  "why.choice.d": "Сотни товаров в одном месте",
  "why.consult.t": "Профессиональная консультация",
  "why.consult.d": "Опытная команда к вашим услугам",
  "why.install.t": "Монтаж и установка",
  "why.install.d": "Сервис и опыт",
  "banner.viewDetails": "Подробнее",
  "banner.smartSub":
    "Современная безопасность, простое управление, максимальная защита.",
  "banner.safesSub":
    "Надёжные сейфы для дома и бизнеса — всех размеров и классов.",
  "feat.fireproof": "Огнестойкий",
  "feat.digitalCode": "Цифровой код",
  "feat.key": "Ключ",
  "feat.steelBody": "Стальной корпус",
  "feat.certified": "Сертифицирован",
  "feat.sizes": "Разные размеры",
  "showroom.desc":
    "Наш шоурум находится в Тбилиси, на набережной Космонавтов, где вы можете лично ознакомиться с продукцией и получить профессиональную консультацию.",
  "showroom.viewMap": "Смотреть на карте",
  "label.phone": "Телефон",
  "label.email": "Эл. почта",
  "label.address": "Адрес",
  "label.hours": "Часы работы",
  "site.address": "Тбилиси, набережная Космонавтов, 3-й ряд, магазин N101",
  "site.addressShort": "Тбилиси, набережная Космонавтов, магазин N101",
  "site.hours": "Пн–Вс: 9:00–18:00",
  "footer.tagline":
    "Мы предлагаем современные решения безопасности для дома и бизнеса.",
  "footer.company": "Компания",
  "footer.about": "О нас",
  "footer.otherBrands": "Другие бренды",
  "footer.rights": "Все права защищены.",
  "cat.home": "Главная",
  "filter.brands": "Бренды",
  "filter.price": "Цена",
  "filter.category": "Категория",
  "filter.clear": "Очистить фильтры",
  "filter.filter": "Фильтры",
  "filter.categories": "Категории",
  "list.showing": "Показано",
  "list.products": "товаров",
  "list.seeMore": "Подробнее",
  "list.priceOnRequest": "Цена по запросу",
  "list.none": "По этому фильтру товары не найдены.",
  "list.all": "Вся продукция",
  "detail.backSafes": "Назад к сейфам",
  "detail.backSmart": "Назад к умным замкам",
  "detail.backClosers": "Назад к доводчикам",
  "detail.methods": "Способы открытия",
  "detail.description": "Описание",
  "detail.order": "Заказ / Консультация",
  "spec.brand": "Бренд",
  "spec.model": "Модель",
  "spec.spec": "Спецификация",
  "spec.outer": "Внешний размер",
  "spec.inner": "Внутренний размер",
  "spec.volume": "Объём",
  "spec.features": "Характеристики",
  "spec.weight": "Вес",
  "spec.country": "Страна производства",
  "spec.wall": "Толщина стенки",
  "spec.door": "Толщина двери",
  "spec.material": "Материал",
  "spec.doorWeight": "Вес двери",
  "spec.doorSize": "Размер двери",
  "spec.color": "Цвет",
  "color.black": "Чёрный",
  "color.silver": "Серебристый",
  "weight.light": "Лёгкая дверь (≤45кг)",
  "weight.medium": "Средняя дверь (45–85кг)",
  "weight.heavy": "Тяжёлая дверь (85кг+)",
  "filter.feature": "Функция",
  "feat.holdOpen": "Функция фиксации",
  "contact.title": "Контакты",
  "contact.connect": "Свяжитесь с нами",
  "contact.connectDesc":
    "Свяжитесь с нами по любому вопросу. Мы готовы предоставить профессиональную консультацию и лучшие решения.",
  "form.title": "Отправить сообщение",
  "form.subtitle": "Заполните форму, и мы быстро с вами свяжемся.",
  "form.name": "Ваше имя",
  "form.email": "Ваша эл. почта",
  "form.phone": "Телефон",
  "form.chooseTopic": "Выберите тему",
  "form.message": "Сообщение",
  "form.send": "Отправить",
  "form.successTitle": "Спасибо!",
  "form.successText": "Ваше сообщение получено. Мы скоро с вами свяжемся.",
  "form.new": "Новое сообщение",
  "subj.product": "О продукции",
  "subj.price": "Цены и заказ",
  "subj.install": "Монтаж / установка",
  "subj.consult": "Консультация",
  "subj.other": "Другое",
  "map.ourLocation": "Наше местоположение",
  "map.directions": "Построить маршрут",
  "unit.min": "мин",
};

const DICT: Record<Locale, Dict> = { ka, en, ru };

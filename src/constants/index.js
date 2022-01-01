// double is gatsby-node
export const locales = ['en', 'ru'];

// double is gatsby-node
export const itemsSlugsToDisplayInNews = [
    'd-8',
    'fai',
    'SEA033-object-483',
    'bmd3',
    'bmd4',
    '72111-pmg-1'
];

export const itemStatuses = {
    COMING: 'coming',
    ON: 'on',
    OFF: 'off'
};

export const itemTypes = {
    ARMOR: 'armor',
    FIGURES: 'figures',
    ACCESSORIES: 'accessories'
};

export const slugs = {
    HOME: '/',
    WHERE_TO_BUY: 'where-to-buy',
    SEARCH: 'search',
    ARMOR_PLASTIC_KITS_1_72: 'armor-plastic-kits-1-72',
    ARMOR_PLASTIC_KITS_1_35: 'armor-plastic-kits-1-35',
    ARMOR_RESIN_KITS_1_72: 'armor-resin-kits-1-72',
    ARMOR_RESIN_KITS_1_100: 'armor-resin-kits-1-100',
    FIGURES_1_72: 'figures-1-72',
    FIGURES_1_43: 'figures-1-43',
    FIGURES_1_35: 'figures-1-35',
    ACCESSORIES_1_72: 'accessories-1-72',
    ACCESSORIES_1_35: 'accessories-1-35',
};

export const pageLinks = {
    'home': slugs.HOME,
    'whereToBuy': slugs.WHERE_TO_BUY,
    'search': slugs.SEARCH,
    'armorPlasticKits172': slugs.ARMOR_PLASTIC_KITS_1_72,
    'armorPlasticKits135': slugs.ARMOR_PLASTIC_KITS_1_35,
    'armorResinKits172': slugs.ARMOR_RESIN_KITS_1_72,
    'armorResinKits1100': slugs.ARMOR_RESIN_KITS_1_100,
    'figures172': slugs.FIGURES_1_72,
    'figures143': slugs.FIGURES_1_43,
    'figures135': slugs.FIGURES_1_35,
    'accessories172': slugs.ACCESSORIES_1_72,
    'accessories135': slugs.ACCESSORIES_1_35,
};

export const TABLET_MEDIUM_BREAKPOINT = 768;

export const NETLIFY_LOCALE_COOKIE_NAME = 'nf_lang';

export const shops = [
    {
        name: {ru: 'Scale Models', en: 'Scale Models'},
        link: {ru: 'http://model-car.ru', en: 'http://model-car.ru'}
    },
    {
        name: {ru: 'Modellmix', en: 'Modellmix'},
        link: {ru: 'http://www.modellmix.su', en: 'http://www.modellmix.su'}
    },
    {
        name: {ru: 'Modelimex', en: 'Modelimex'},
        link: {ru: 'https://www.modelimex.com', en: 'https://www.modelimex.com'}
    },
    {
        name: {ru: 'M.C. Modellbau', en: 'M.C. Modellbau'},
        link: {ru: 'http://mc-modellbau.de', en: 'http://mc-modellbau.de'}
    },
    {
        name: {ru: 'Клуб ТМ', en: 'Club-TM'},
        link: {ru: 'http://www.club-tm.ru', en: 'http://www.club-tm.ru'}
    },
    {
        name: {ru: 'Я-Моделист', en: 'I-Modelist'},
        link: {ru: 'http://i-modelist.ru', en: 'http://i-modelist.ru'}
    },
    {
        name: {ru: 'Model-kit', en: 'Model-kit'},
        link: {ru: 'http://www.model-kit.ru', en: 'http://www.model-kit.ru'}
    },
    {
        name: {ru: 'A-market', en: 'A-market'},
        link: {ru: 'https://www.amarket-model.ru', en: 'https://www.amarket-model.ru'}
    },
    {
        name: {ru: 'HOBBY.dn.ua', en: 'HOBBY.dn.ua'},
        link: {ru: 'http://hobby.dn.ua', en: 'http://hobby.dn.ua'}
    },
    {
        name: {ru: 'Хобби-Трейд', en: 'Hobby-Trade'},
        link: {ru: 'http://hobbytrade.com.ua', en: 'http://hobbytrade.com.ua'}
    },
    {
        name: {ru: 'Русский масштаб', en: 'Russion Scale'},
        link: {ru: 'http://ruscale.ru', en: 'http://ruscale.ru'}
    },
    {
        name: {ru: 'Евротрэйн', en: 'Eurotrain'},
        link: {ru: 'http://eurotrain.ru', en: 'http://eurotrain.ru'}
    },
    {
        name: {ru: 'MAKSSHOP', en: null},
        link: {ru: 'http://maxmodels72.ru/product-category/zebrano/', en: null}
    },
    {
        name: {ru: 'Лейб-Компания (г. Москва, ул. Нижняя Сыромятническая, 11)', en: null},
        link: {ru: null, en: null}
    }
];

export const SLIDER_SETTINGS = {
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    dots: true,
    centerMode: true,
    responsive: [
        {
            breakpoint: 920,
            settings: {
                slidesToShow: 2
            }
        }
    ]
};

export const IMAGE_URL = 'https://res.cloudinary.com/dm7fbzj5t/image/upload/zm';
export const NEWS_IMAGE = 'news';
export const BUCKET_IMAGE = 'bucket';
export const BOX_IMAGE = 'box';
export const SMALL_IMAGE = 'sm';

export const SEARCH_INPUT_DEBOUNCE_DELAY = 500;
export const SEARCH_INPUT_MAX_LENGTH = 50;
export const SEARCH_ITEMS_MAX_QTY = 20;

export const resinKits1To100BoxTypes = {
    V: 'V', // vertical
    H: 'H' // horizontal
};

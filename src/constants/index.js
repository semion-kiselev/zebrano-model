// double is gatsby-node
export const locales = ['en', 'ru'];

// double is gatsby-node
export const itemsSlugsToDisplayInNews = [
    '72033-gaz-4-4m',
    '72035-humber-mk4',
    '72036-aec-mk3',
    'SEA031-lebedenko-tank',
    '72119-gaz-aaa',
    '72118-72-k-1943'
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

export const pageLinks = {
    'home': '/',
    'armorPlasticKits172': 'armor-plastic-kits-1-72',
    'armorResinKits172': 'armor-resin-kits-1-72',
    'armorResinKits1100': 'armor-resin-kits-1-100',
    'figures172': 'figures-1-72',
    'figures143': 'figures-1-43',
    'figures135': 'figures-1-35',
    'accessories172': 'accessories-1-72',
    'accessories135': 'accessories-1-35',
    'whereToBuy': 'where-to-buy',
    'search': 'search'
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

import { pageLinks } from "../constants";
import trans from "../lang";

export const navItemChildIsActive = (pageName, children) =>
  children.some((child) => child.pageName === pageName);

export const getIfNavItemWithChildrenIsActive = (
  itemId,
  itemChildren,
  activeMenuItemId,
  pageName
) => {
  const childIsActive = navItemChildIsActive(pageName, itemChildren);
  return childIsActive || activeMenuItemId === itemId;
};

export const getNavData = (locale) => [
  {
    id: 1,
    label: trans.NAV_HOME[locale],
    pageName: pageLinks.home,
    href: `/${locale}/`,
  },
  {
    id: 2,
    label: trans.NAV_ARMOR[locale],
    children: [
      {
        label: `${trans.SECTION_LINKS_ARMOR_PLASTIC_TITLE[locale]} 1/72`,
        pageName: pageLinks.armorPlasticKits172,
        href: `/${locale}/${pageLinks.armorPlasticKits172}/`,
      },
      {
        label: `${trans.SECTION_LINKS_ARMOR_PLASTIC_TITLE[locale]} 1/35`,
        pageName: pageLinks.armorPlasticKits135,
        href: `/${locale}/${pageLinks.armorPlasticKits135}/`,
      },
      {
        label: `${trans.SECTION_LINKS_ARMOR_RESIN_TITLE[locale]} 1/72`,
        pageName: pageLinks.armorResinKits172,
        href: `/${locale}/${pageLinks.armorResinKits172}/`,
      },
      {
        label: `${trans.SECTION_LINKS_ARMOR_RESIN_TITLE[locale]} 1/100`,
        pageName: pageLinks.armorResinKits1100,
        href: `/${locale}/${pageLinks.armorResinKits1100}/`,
      },
    ],
  },
  {
    id: 3,
    label: trans.NAV_FIGURES[locale],
    children: [
      {
        label: `${trans.SCALE[locale]} 1/72`,
        pageName: pageLinks.figures172,
        href: `/${locale}/${pageLinks.figures172}/`,
      },
      {
        label: `${trans.SCALE[locale]} 1/43`,
        pageName: pageLinks.figures143,
        href: `/${locale}/${pageLinks.figures143}/`,
      },
      {
        label: `${trans.SCALE[locale]} 1/35`,
        pageName: pageLinks.figures135,
        href: `/${locale}/${pageLinks.figures135}/`,
      },
    ],
  },
  {
    id: 4,
    label: trans.NAV_ACCESSORIES[locale],
    children: [
      {
        label: `${trans.SCALE[locale]} 1/72`,
        pageName: pageLinks.accessories172,
        href: `/${locale}/${pageLinks.accessories172}/`,
      },
      {
        label: `${trans.SCALE[locale]} 1/35`,
        pageName: pageLinks.accessories135,
        href: `/${locale}/${pageLinks.accessories135}/`,
      },
    ],
  },
  {
    id: 5,
    label: trans.NAV_WHERE_TO_BUY[locale],
    pageName: pageLinks.whereToBuy,
    href: `/${locale}/${pageLinks.whereToBuy}/`,
  },
];

export const getSectionLinks = (locale) => [
  {
    id: 1,
    image: "/images/armor-plastic-kits-thumbnail.jpg",
    title: trans.SECTION_LINKS_ARMOR_PLASTIC_TITLE[locale],
    description: trans.SECTION_LINKS_ARMOR_PLASTIC_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.armorPlasticKits172}/` },
      { label: "1/35", href: `/${locale}/${pageLinks.armorPlasticKits135}/` },
    ],
  },
  {
    id: 2,
    image: "/images/armor-resin-kits-thumbnail.jpg",
    title: trans.SECTION_LINKS_ARMOR_RESIN_TITLE[locale],
    description: trans.SECTION_LINKS_ARMOR_RESIN_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.armorResinKits172}/` },
      { label: "1/100", href: `/${locale}/${pageLinks.armorResinKits1100}/` },
    ],
  },
  {
    id: 3,
    image: "/images/figures-thumbnail.jpg",
    title: trans.SECTION_LINKS_FIGURES_TITLE[locale],
    description: trans.SECTION_LINKS_FIGURES_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.figures172}/` },
      { label: "1/43", href: `/${locale}/${pageLinks.figures143}/` },
      { label: "1/35", href: `/${locale}/${pageLinks.figures135}/` },
    ],
  },
  {
    id: 4,
    image: "/images/accessories-thumbnail.jpg",
    title: trans.SECTION_LINKS_ACCESSORIES_TITLE[locale],
    description: trans.SECTION_LINKS_ACCESSORIES_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.accessories172}/` },
      { label: "1/35", href: `/${locale}/${pageLinks.accessories135}/` },
    ],
  },
];

export const setCookie = (name, value, options) => {
  options = options || {};

  let expires = options.expires;

  if (typeof expires === "number" && expires) {
    let d = new Date();
    d.setTime(d.getTime() + expires * 60 * 1000);
    expires = options.expires = d;
  }

  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (let propName in options) {
    updatedCookie += "; " + propName;
    let propValue = options[propName];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
};

export const getPagesArray = (pagesNum) => {
  const pages = [];

  for (let i = 1; i <= pagesNum; i++) {
    pages.push(i);
  }

  return pages;
};

export const getJSON = (url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = xhr.onerror = () => {
    if (xhr.status === 200) {
      onSuccess(xhr.responseText);
    } else {
      onError(xhr.status);
    }
  };

  xhr.open("GET", url, true);
  xhr.send(null);
};

import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

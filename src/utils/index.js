import queryString from 'query-string'
import { isMobile, isTablet } from 'react-device-detect';
export const CURRENT_URL = window.location.href
export let URLDATA = []
export const ERROR_ERROR = { 1: "@", 2: "#", 3: "List ", 4: "@", 5: "Advanced ", 6: "Location ", 7: "@", 8: "Page ", 9: "Page ", 10: "Group ", 11: "Playlist ", 12: "Board ", 13: "URL ", 14: "Event ", 16: "Mention ", 22: "Workplace ", 23: "@", 24: "@", 25: "@", 26: "#", 65: "Album", 67: "Page", 53: "Group ", 54: "Topic ", 55: "Page", 33: "Place ", 63: "Search ", 64: "Sticker " };

export const convertObjectToArray = (obj) => {
    let result = Object.keys(obj).map((key) => obj[key]);
    return result;
};
const getDevidedValue = (value1, value2) => value1 / value2;
const postWidthAdjustSpacing = (cardNumber, rowCard, windowWidth, postWidth) => {
    let spacing = null; let width = null; let adjustSpacing = null;
    spacing = (windowWidth) % postWidth;
    adjustSpacing = spacing / rowCard;
    if (cardNumber >= 1) width = (postWidth + adjustSpacing);
    else width = (postWidth - adjustSpacing);
    return { spacing, width, adjustSpacing }
}
export const THEME_WIDTH_ADJUSTMENT_MODERN = (windowWidth, wall) => {
    let cardNumber = null; let adjustWidth = null;
    if ([3, 4].includes(wall.Personalization.widgetTheme)) {
        let numberOfCoumn = (isMobile || windowWidth < 768) ? parseInt(wall.ThemeRule.mobileColumn) : parseInt(wall.ThemeRule.numberOfCoumn)
        let squareThemeColumn = parseInt(numberOfCoumn) > 0 ? true : parseInt(windowWidth) > parseInt(wall.Personalization.minimumPostWidth) ? true : false;
        if (squareThemeColumn) {
            let singlePostWidth = parseInt(numberOfCoumn) > 0 ? (((windowWidth) / (numberOfCoumn))) : wall.Personalization.minimumPostWidth;
            if (windowWidth < 768 && numberOfCoumn == 0) singlePostWidth = (singlePostWidth)
            cardNumber = getDevidedValue(windowWidth, singlePostWidth);
            const { width } = postWidthAdjustSpacing(cardNumber, Math.trunc(cardNumber), windowWidth, singlePostWidth);
            adjustWidth = width;
            adjustWidth = (numberOfCoumn > 0 ? singlePostWidth : adjustWidth) - 0.8;
            return { adjustWidth, cardNumber };
        }
        else return { adjustWidth: windowWidth, cardNumber: 1 }
    }
    else if ([50].includes(wall.Personalization.widgetTheme)) {
        if (parseInt(windowWidth) > parseInt(wall.Personalization.minimumPostWidth)) {
            let singlePostWidth = ((windowWidth) / (wall.Personalization.columnCount)) - 10;
            if (windowWidth < 768) singlePostWidth = (wall.Personalization.minimumPostWidth)
            cardNumber = getDevidedValue(windowWidth, singlePostWidth);
            const { width } = postWidthAdjustSpacing(cardNumber, Math.trunc(cardNumber), windowWidth, singlePostWidth);
            adjustWidth = width;
            adjustWidth = adjustWidth - 0.7;
            if (wall.Personalization.widgetTheme === 4 && (isMobile && !isTablet)) {
                if (singlePostWidth < adjustWidth) {
                    if (parseInt(cardNumber) == 1) {
                        adjustWidth = (adjustWidth / 2);
                    }
                }
            }
            return { adjustWidth, cardNumber };
        }
        else return { adjustWidth: windowWidth, cardNumber: 1 }
    }
    else {
        if (parseInt(windowWidth) > parseInt(wall.Personalization.minimumPostWidth)) {
            cardNumber = getDevidedValue(windowWidth, wall.Personalization.minimumPostWidth);
            const { width } = postWidthAdjustSpacing(cardNumber, Math.trunc(cardNumber), windowWidth, wall.Personalization.minimumPostWidth);
            adjustWidth = width;
            adjustWidth = adjustWidth - 0.8;
            return { adjustWidth, cardNumber };
        }
        else return { adjustWidth: windowWidth, cardNumber: 1 }
    }
}

export const getWallID = () => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.wall_id) return parsed.wall_id;
    // else if (window.wall_Id) return window.wall_Id;
    else if (window.location.href && window.location.href.includes("/testing")) {
        const splitURL = "https://sudarshanbairagi-taggbox.github.io/testing/"
        const wallGet = window.location.href.split(splitURL)
        if (wallGet && wallGet.length > 0 && wallGet[1]) {
            if (!wallGet[1].includes("?")) return wallGet[1];
            else if (wallGet[1].includes("?")) {
                const updateWall = wallGet[1].split("?")
                if (updateWall && updateWall.length > 0 && updateWall[0]) {
                    return updateWall[0];
                }
                else return window.wall_Id
            }
            else return window.wall_Id
        }
    }
    else if (window.location.href && window.location.href.includes("widget-lite")) {
        const splitURL = "https://widget-lite.taggbox.com/"
        const wallGet = window.location.href.split(splitURL)
        if (wallGet && wallGet.length > 0 && wallGet[1]) {
            if (!wallGet[1].includes("?")) return wallGet[1];
            else if (wallGet[1].includes("?")) {
                const updateWall = wallGet[1].split("?")
                if (updateWall && updateWall.length > 0 && updateWall[0]) {
                    return updateWall[0];
                }
                else return window.wall_Id
            }
            else return window.wall_Id
        }
    }
    else if (window.location.href && window.location.href.includes("widget")) {
        const splitURL = "https://widget.taggbox.com/"
        const wallGet = window.location.href.split(splitURL)
        if (wallGet && wallGet.length > 0 && wallGet[1]) {
            if (!wallGet[1].includes("?")) return wallGet[1];
            else if (wallGet[1].includes("?")) {
                const updateWall = wallGet[1].split("?")
                if (updateWall && updateWall.length > 0 && updateWall[0]) {
                    return updateWall[0];
                }
                else return window.wall_Id
            }
            else return window.wall_Id
        }
    }

    else {
        var socialwall = document.getElementsByClassName('taggbox-socialwall').length
        var container = socialwall && socialwall > 0 ? document.getElementsByClassName('taggbox-socialwall') : document.getElementsByClassName('taggbox');
        for (var i = 0; i < container.length; i++) {
            if (container[i].getAttribute("data-is-load") == "0") {
                const updateData = document.getElementById(`co_${container[i].getAttribute("data-render-id")}`)
                if (updateData) {
                    updateData.setAttribute("data-is-load", "1")
                }
                return socialwall && socialwall > 0 ? container[i].getAttribute("data-wall-id") : container[i].getAttribute("data-widget-id")
            }

        }
    }
}

export const getRenderContainer = () => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.wall_id) return document.getElementById('taggbox_main');
    //else if (document.getElementsByClassName('wall-editor')) return document.getElementById('taggbox_main');
    else if (window.location.href && window.location.href.includes("/testing")) return document.getElementById('taggbox_main');
    else if (window.location.href && window.location.href.includes("widget-lite")) return document.getElementById('taggbox_main');
    else if (window.location.href && window.location.href.includes("widget")) return document.getElementById('taggbox_main');
    else return extendsGetRenderContainer()
}

export let rID;

const extendsGetRenderContainer = () => {
    try {
        var socialwall = document.getElementsByClassName('taggbox-socialwall').length
        var container = socialwall && socialwall > 0 ? document.getElementsByClassName('taggbox-socialwall') : document.getElementsByClassName('taggbox');
        for (var i = 0; i < container.length; i++) {

            if (container[i].getAttribute("data-is-load") == "0") {

                if (container[i].getAttribute('data-render-id')) rID = container[i].getAttribute('data-render-id')

                return document.getElementById(container[i].getAttribute("data-render-id"))
            }
        }
    }
    catch (ex) {
        return document.getElementById('taggbox_main');
    }
}


export const checkEditorWithTags = () => {
    const updateURL = window.location.href;
    if (updateURL && updateURL.includes("tags") && updateURL.includes("e=1")) return false
    else return true
}
export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return { size: Math.round(bytes / Math.pow(1024, i), 2), sizeText: sizes[i] }

}

export const IMG_DATA_FILTER = (data, link) => {
    if (data && data.length > 0) {
        return data.filter((item) => item.link == link)
    }
    else return [];
}

export const isValidAuthorImage = (url) => {
    if (!url) return false;
    if (url === "" || url.includes('ui-avatars')) return false;
    else return true;
}

export const PostTrimContent = (string, stringLenght) => {
    if (string && String(string) && String(string).length > parseInt(stringLenght)) {
        const shortText = String(string).substring(0, stringLenght) + "...";
        return shortText
    }
    else return string;
};

export const STRING_TO_URL_CONVERT = (string) => {
    try {
        var addString = string;
        if (string && string && string.includes("http")) {
            const urls = string.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g);
            if (urls) {
                urls.forEach((url) => {
                    addString = addString.replace(url, `<a class="tb_text_links_" target="_blank" href="${url}" rel="noopener noreferrer nofollow">${url}</a>`);
                });
                return addString;
            }
        }
        else return addString;
    }
    catch (ex) {
        return string;
    }
}

export const randomNumber = (min, max, freeAdsPosition) => {
    try {
        var position = freeAdsPosition; let count = 3;
        for (var i = 0; i < 10; i++) {
            count = parseInt(count) + 9 + parseInt(i);
            if (!position.includes(count)) position.push(count);
        }
        return position;
    }
    catch (ex) {
        return freeAdsPosition
    }
}

export const findFromArray = (data, id, index) => {
    if (data && data.length > 0) {
        return data.findIndex((checkItem) => checkItem.id == id);
    }
    else return index;
}

export const urlDiscardMail = () => {
    try {
        let URL = String(window.location.href);
        if (URL.includes('googleusercontent')) return false
        else if (URL.includes('inner-frame-minified')) return false
        else return true
    }
    catch (ex) {
        return true
    }
}


export const loadImage = async src =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (...args) => reject(args);
        img.src = src;
    });
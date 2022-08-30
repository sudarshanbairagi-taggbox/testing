import axios from 'axios'
import HttpClient from "./http-client";
import queryString from 'query-string';

import { GET_WIDGET_DATA_API_PATH, GET_DATA_POST_APPEND, UPDATE_SHOW_MORE_AND_POST_TRACKING, REPORT_MEDIA, SHARE_POST_BY_EMAIL, UPDATE_WIDGET_ONSITE_UPLOAD, HASHTAG_CAMPAIGN_IMAGE, UPDATE_INSTAGRAM_IMAGE_VIDEO, FOR_TEST_SERVER, EMBED_TRACKING } from './api'
import { ERROR_RESPONSE_WITH_MESSAGE, GET_LOADER_ERROR, GET_APP_DATA, GET_THEME_SHOW_MORE_LOADER_SUCCESS, SHOW_MORE_DATA_UPDATE, FILTER_DATA_UPDATE, SHOW_POP_UP, CLOSE_POP_UP, ONSITE_POPUP, ONSITE_TOKEN_UPDATE, REPORT_MEDIA_POP_UP, SHARE_POST_POP_UP, REPORT_MEDIA_CLOSE_POP_UP, SHARE_POST_CLOSE_POP_UP, GET_THEME_ERROR_SUCCESS, POST_DEFAULT_HEIGHT, RENDER_ID } from '../reducers/reducersKeys'
import store from "../store";
import { NoCameraImgPost } from '../constants'
import { rID, urlDiscardMail } from '../utils'

const requestHeaders = {
    productdomain: `taggbox.com`
}

const getHashTagParam = () => {

    const parsed = queryString.parse(window.location.search);


    var header_tags = {};

    if (parsed.tags) {
        const tags = parsed.tags;
        header_tags = { tag: tags.includes("true") ? 1 : 0 };
    }
    else if (document.querySelector(".taggbox") != null) {
        const taggbox = document.querySelector(".taggbox");
        if (taggbox) {
            if (taggbox.getAttribute('data-tags')) {
                const dataTags = taggbox.getAttribute('data-tags');
                header_tags = { tag: dataTags.includes("true") ? 1 : 0 };
            }
        }
    }

    return { headers: header_tags }
}

export const getThemeDataWithWallID = (Id, heightEvent) => {  
    return (dispatch) => {
        try {
            urlTracking(Id);
            dispatch({ type: RENDER_ID, payload: rID })
            new HttpClient()
                .get(`${GET_WIDGET_DATA_API_PATH}${Id}`,getHashTagParam())
                .then((response) => {

                    const { visitorLimit, response_code, error_code, post_message, older_days, older_post, onsite_token } = response.data;

                    if (parseInt(response_code) == 404) {
                        dispatch({
                            type: ERROR_RESPONSE_WITH_MESSAGE,
                            payload: response.data,
                        });
                        throw new Error(response.data.message);
                    }
                    else if (window.editor || visitorLimit === 0) { //console.log(onsite_token);
                        dispatch({ type: GET_APP_DATA, payload: response.data, heightEvent: heightEvent });
                        dispatch({ type: ONSITE_TOKEN_UPDATE, payload: onsite_token });

                    } else {
                        dispatch({
                            type: ERROR_RESPONSE_WITH_MESSAGE,
                            payload: { message: "", type: "VISITOR_LIMIT_EXCEEDED", ...response.data },
                        });
                        throw new Error("");
                    }
                    // dispatch({
                    //     type: GET_THEME_ERROR_SUCCESS,
                    //     payload: {
                    //         error_code: error_code,
                    //         post_message: post_message,
                    //         older_days: older_days,
                    //         older_post: older_post,
                    //     },
                    // });

                })
                .catch((error) => {
                    const { response } = error;
                    if (response && response.status && response.status == 404) {
                        if (parseInt(response.status) == 404) {
                            dispatch({
                                type: ERROR_RESPONSE_WITH_MESSAGE,
                                payload: response.data,
                            });
                        }
                    }
                    dispatch({ type: GET_LOADER_ERROR });
                });
        }
        catch (ex) {
            const { response } = ex;
            dispatch({
                type: ERROR_RESPONSE_WITH_MESSAGE,
                payload: { message: "", type: "VISITOR_LIMIT_EXCEEDED", ...response.data },
            });
            throw new Error("");
        }
    };
};

const urlTracking = (WALL_ID) => {
    try {
        if (urlDiscardMail()) {
            new HttpClient()
                .post(`${EMBED_TRACKING}`, {}, {
                    headers: {
                        url: window.location.href, wall: WALL_ID,
                        source: 3
                    }
                })
                .then((response) => {
                })
                .catch((error) => {
                    console.warn("url-tracking", error)
                });
        }
    }
    catch (ex) {
        console.warn("url")
    }
}


export const languageSettings = (w_language, custom_lan_data) => {
    let cLanguage = null;
    let customLArray = null;
    let customLanguageKey = null;
    if (w_language === "custom") {
        const { getData, getKey, getCompleteData } = customLanguageParse(
            custom_lan_data
        );
        cLanguage = getCompleteData;
        customLArray = getData;
        customLanguageKey = getKey;
    }
    return {
        customLanguageData: customLArray,
        customLanguageKey: customLanguageKey,
        ...convertButtonNameLanguages(w_language, cLanguage),
    };
};

const convertButtonNameLanguages = (w_language, cLanguage) => {
    switch (w_language) {
        case "French": {
            return {
                buttonName: "Montre plus",
                filterButton: "Tout",
                viewOnText: "Vue sur",
                shareText: "PARTAGER",
                no_more: "Plus de messages",
            };
        }
        case "German": {
            return {
                buttonName: "Zeig mehr",
                filterButton: "Alle",
                viewOnText: "Sehen Sie",
                shareText: "AKTIE",
                no_more: "Keine weiteren Beiträge",
            };
        }
        case "Malay": {
            return {
                buttonName: "Tunjukkan Lagi",
                filterButton: "Semua",
                viewOnText: "Lihat di",
                shareText: "BERKONGSI",
                no_more: "Tiada Lagi Posts",
            };
        }
        case "Dutch": {
            return {
                buttonName: "Laat meer zien",
                filterButton: "Alle",
                viewOnText: "Uitzicht op",
                shareText: "DELEN",
                no_more: "Geen berichten meer",
            };
        }
        case "Spanish": {
            return {
                buttonName: "Mostrar más",
                filterButton: "Todas",
                viewOnText: "Ver en",
                shareText: "COMPARTIR",
                no_more: "No más publicaciones",
            };
        }
        case "Chinese": {
            return {
                buttonName: "展示更多",
                filterButton: "分享",
                viewOnText: "查看",
                shareText: "所有",
                no_more: "没有更多的帖子",
            };
        }
        case "Korean": {
            return {
                buttonName: "보기",
                filterButton: "모든",
                viewOnText: "에서보기",
                shareText: "몫",
                no_more: "더 이상 게시물 없음",
            };
        }
        case "Italian": {
            return {
                buttonName: "Mostra di più",
                filterButton: "Tutti",
                viewOnText: "Visualizza su",
                shareText: "CONDIVIDERE",
                no_more: "Nessun altro messaggio",
            };
        }
        case "Portuguese": {
            return {
                buttonName: "Mostre mais",
                filterButton: "Todos",
                viewOnText: "Ver no",
                shareText: "COMPARTILHAR",
                no_more: "Mais mensagens",
            };
        }
        case "English": {
            return {
                buttonName: "Show More",
                filterButton: "All",
                viewOnText: "View on",
                shareText: "SHARE",
                no_more: "No More Posts",
            };
        }
        case "custom": {
            return {
                buttonName: cLanguage.show_more,
                no_more: cLanguage.no_more,
                filterButton: cLanguage.p_all,
                viewOnText: cLanguage.view_on,
                shareText: cLanguage.share,
            };
        }
        default:
            return {
                buttonName: "Show More",
                filterButton: "All",
                viewOnText: "View on",
                shareText: "SHARE",
                no_more: "No More Posts",
            };
    }
};

const customLanguageParse = (data) => {
    let removeCha = data.slice(4, data.length).replace("{", "").replace("}", "");
    let splitWith = removeCha.split(";");
    let getData = [];
    let getKey = [];
    let getCompleteData = {};
    splitWith.map((item, index) => {
        let stringReplace = item.replace('"', "").replace('"', "");
        let key = stringReplace.slice(4, stringReplace.length);
        if (key != "") {
            let valueKey = key.replace(":", "");
            if (index % 2 == 0) {
                getKey.push(valueKey);
            } else {
                getData.push(valueKey);
            }
        }
    });
    getKey.map((item, index) => {
        Object.assign(getCompleteData, { [item]: getData[index] });
    });

    return { getData, getKey, getCompleteData };
};
export const themePostTracking = (data) => {
    themePostAndShowMoreTracking(data);
};

const themePostAndShowMoreTracking = (data) => {
    new HttpClient()
        .post(`${UPDATE_SHOW_MORE_AND_POST_TRACKING}`, data)
        .then((response) => { })
        .catch((error) => {
            console.error(error);
        });
};

export const getDataNextSteps = (
    wallID,
    timeStamp,
    postCount,
    networkId,
    after,
    heightEvent,
    updateInState
) => async (dispatch) => {
    const urlToAccess = `${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/1/${after}`;
    const { wall, postData } = store.getState().appData;
    const afterUsedList = postData.afterUsedList;
    const bestFit = (wall.Personalization.widgetTheme === 4 && wall.Personalization.fitRow == 1);
    dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: true });
    const { isFilterLoading } = store.getState().loaderData;
    //loaderData
    if ((!afterUsedList.includes(after) || afterUsedList.length == 0) && !isFilterLoading) {

        themePostTracking({
            action: 1,
            wall: wallID,
            feed: "",
            post: "",
        });
        await new HttpClient()
            .get(urlToAccess,getHashTagParam())
            .then((response) => {
                dispatch({
                    type: SHOW_MORE_DATA_UPDATE, payload: {
                        newData: response.data.data, filterNetworkId: networkId, appendData: {
                            after: response.data.after,
                            networkID: networkId,
                            heightEvent: heightEvent,
                        },
                        hasMoreData: {
                            [networkId]: {
                                hasMoreData: bestFit && Object.keys(response.data.data).length < postCount ? false : response.data.hasPost == 1 ? true : false,
                                after: response.data.after,
                            },
                        }
                    }
                });
                dispatch({
                    type: GET_THEME_SHOW_MORE_LOADER_SUCCESS,
                    payload: false,
                });
            })
            .catch((error) => { });
    }
};

export const filterPostDataAppendWebFilter = (
    wallID,
    timeStamp,
    postCount,
    networkId,
    after,
    heightEvent
) => {
    return (dispatch) => {
        //dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: true });
        const { wall, postData } = store.getState().appData;
        const bestFit = (wall.Personalization.widgetTheme === 4 && wall.Personalization.fitRow == 1);
        new HttpClient()
            .get(`${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/1/${after}`, getHashTagParam())
            .then((response) => {
                const newData = response.data.data;

                dispatch({
                    type: FILTER_DATA_UPDATE,
                    payload: {
                        appendData: {
                            after: response.data.after,
                            networkID: networkId,
                            heightEvent: heightEvent,
                        },
                        filterNetworkId: networkId,
                        newData: newData,
                        hasMoreData: {
                            [networkId]: {
                                hasMoreData: bestFit && Object.keys(response.data.data).length < postCount ? false : response.data.hasPost == 1 ? true : false,
                                after: response.data.after,
                            },
                        }
                    },
                });
                // dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });

                // dispatch({
                //     type: GET_NETWORK_ID_APPEND_DATA_SUCCESS,
                //     payload: networkId,
                // });

                // dispatch({
                //     type: GET_FILTERED_COMPLETE_POST_DATA_SUCCESS,
                //     payload: newData,
                //     filterNetworkId: networkId,
                // });


                // dispatch({
                //     type: SET_HAS_MORE_DATA,
                //     payload: {
                //         [networkId]: {
                //             hasMoreData: bestFit && Object.keys(response.data.data).length < postCount ? false : response.data.hasPost == 1 ? true : false,
                //             after: response.data.after,
                //         },
                //     },
                // });
                // dispatch({
                //     type: GET_APPEND_DATA_SUCCESS,
                //     payload: {
                //         after: response.data.after,
                //         networkID: networkId,
                //         heightEvent: heightEvent,
                //     },
                //     filterNetworkId: networkId,
                // });


            })
            .catch((error) => { });
    };
};
export const reportMediaPopUp = (data) => {
    return (dispatch) => {
        dispatch({ type: REPORT_MEDIA_POP_UP, payload: data });
    };
};
export const sharePostPopUP = (data) => {
    return (dispatch) => {
        dispatch({ type: SHARE_POST_POP_UP, payload: data });
    };
};
export const reportMediaClosePopUp = () => {
    return (dispatch) => {
        dispatch({ type: REPORT_MEDIA_CLOSE_POP_UP });
    };
};
export const sharePostClosePopUP = () => {
    return (dispatch) => {
        dispatch({ type: SHARE_POST_CLOSE_POP_UP });
    };
};

export const managePostHeight = (data) => {
    return (dispatch) => dispatch({ type: POST_DEFAULT_HEIGHT, payload: data })
};

export const showPopUP = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_POP_UP, payload: data });
    };
};
export const onSitePopup = (status) => {
    return (dispatch) => {
        dispatch({ type: ONSITE_POPUP, payload: status });
    };
};
export const closePopUP = () => {
    return (dispatch) => {
        dispatch({ type: CLOSE_POP_UP })
    };
};

export const onsiteTokenUpdate = (onsite_token) => {
    return (dispatch) => {
        dispatch({ type: ONSITE_TOKEN_UPDATE, payload: onsite_token })
    };
};


export const reportMedia = (data) => {
    return new HttpClient().post(`${REPORT_MEDIA}`, data)
}
export const sharePostByEmail = (data) => {
    return new HttpClient().post(`${SHARE_POST_BY_EMAIL}`, data)
}

export const submitPostData = (data) => {
    return new HttpClient().post(`${UPDATE_WIDGET_ONSITE_UPLOAD}`, data)
}
export const hashtagCampaignImage = (data) => {
    return new HttpClient().post(`${HASHTAG_CAMPAIGN_IMAGE}`, data)
}


export const POPUP_IMAGE_RENEW_REQUEST = async (e) => {
    e.persist()
    const network = e.target.getAttribute("data-network")
    const wallId = e.target.getAttribute("data-wall-id");
    const postId = e.target.getAttribute("data-item-id");
    const filterId = e.target.getAttribute("data-filter-id");
    let links = e.target.getAttribute("data-link");
    let image_update = '';
    let video_update = '';
    const UserDetail = store.getState().appData.wall.UserDetail;

    if (network) {
        const dataSrc = e.target.src;
        if ((network == 2 || network == 18 || network == 3 || network == 28) && (dataSrc.includes("cdn.taggbox.com") || dataSrc.includes("no-camera.svg") || dataSrc.includes("no-image.svg") || dataSrc.includes("instagram-no-image") || network == 3 || network == 28) && e.target.getAttribute("data-load") == 0 && filterId != "34") {
            e.target.setAttribute("data-load", "1");
            if ((network == 2 || network == 18)) {
                let postLinkId = links.split('/');
                let fetchUrl = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${links}`;
                let IMG_URL_UPDATE = await FETCH_LINK(fetchUrl, postLinkId, dataSrc, 'image')
                if (IMG_URL_UPDATE && IMG_URL_UPDATE != null && IMG_URL_UPDATE.length > 0 && typeof IMG_URL_UPDATE === 'string' && (IMG_URL_UPDATE.includes("no-image.svg") || IMG_URL_UPDATE.includes("no-camera.svg") || IMG_URL_UPDATE.includes("lookaside.instagram.com"))) {
                    updateStatusRenewImage(wallId, postId, e)
                }
                else {
                    if (IMG_URL_UPDATE && IMG_URL_UPDATE != null && IMG_URL_UPDATE.length > 0 && typeof IMG_URL_UPDATE === 'string') {
                        e.target.src = `https://images.taggbox.com/${IMG_URL_UPDATE}`;
                        image_update = IMG_URL_UPDATE;
                        e.target.attributes["data-load"].value = "1";
                        if (IMG_URL_UPDATE.includes("no-camera.svg")) {
                            //e.target.style = "visibility:visible!important;width:180px;margin:20px auto;object-fit: contain;";
                        }
                        //e.target.style = "";
                    }
                    else {
                        if (IMG_URL_UPDATE.display_url && IMG_URL_UPDATE.display_url.includes("lookaside.instagram.com")) {
                            updateStatusRenewImage(wallId, postId, e)
                        }
                        else {
                            e.target.src = `https://images.taggbox.com/${IMG_URL_UPDATE.display_url}`;
                            image_update = IMG_URL_UPDATE.display_url;
                            video_update = IMG_URL_UPDATE.video_url;
                            e.target.attributes["data-load"].value = "1";
                            if (IMG_URL_UPDATE.display_url.includes("no-camera.svg")) {
                                //e.target.style = "visibility:visible!important;width:180px;margin:20px auto;object-fit: contain;";
                            }
                            //e.target.style = "";
                        }

                    }
                    if (!image_update.includes("no-image.svg") && !image_update.includes("no-camera.svg") && !image_update.includes("cdn.taggbox.com") && !image_update.includes("lookaside.instagram.com")) {

                        updateInstagramPostImage({
                            wallId: wallId,
                            postFile: image_update,
                            video: video_update,
                            type: 2,
                            postId: postId,
                            table_name: UserDetail.db_table
                        });
                    }
                }

            }
            else {
                axios.post(`https://${FOR_TEST_SERVER ? `test` : `app`}.taggbox.com/widget/post/updateStatus`, {
                    wallId: wallId,
                    postId: postId,
                    table_name: UserDetail.db_table
                }).then(({ data }) => {
                    e.target.src = data.media;
                    e.target.attributes["data-load"].value = "1";

                })
            }
        }
        else {
            if (dataSrc.includes("no-camera.svg")) {
            }
            else e.target.src = NoCameraImgPost
            e.target.setAttribute("data-load", "1")
        }

    }

}

const updateStatusRenewImage = (wallId, postId, e) => {
    const UserDetail = store.getState().appData.wall.UserDetail;
    axios.post(`https://${FOR_TEST_SERVER ? `test` : `app`}.taggbox.com/widget/post/updateStatus`, {
        wallId: wallId,
        postId: postId,
        table_name: UserDetail.db_table
    }).then(({ data }) => {
        e.target.src = data.media;
        e.target.attributes["data-load"].value = "1";

    })
}

export const updateInstagramPostImage = (data) => {
    const UserDetail = store.getState().appData.wall.UserDetail;
    let dataFormatted = { table_name: UserDetail.db_table, ...data }
    axios.post(`${UPDATE_INSTAGRAM_IMAGE_VIDEO}`, dataFormatted)
        .then((response) => { })
        .catch((error) => {
            console.error(error);
        });
};

const FETCH_LINK = (fetchUrl, postId, dataSrc, type) => GET_INSTAGRAM_IMAGE(fetchUrl).then((response) => {
    let html = response.data;
    if (html) {
        var regex = /_sharedData = ({.*);<\/script>/m,
            json = JSON.parse(regex.exec(html)[1]);
        if (typeof json.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children !== 'undefined') {
            if (type == 'video') {
                const videoPath = json.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.filter((item) => item.node.shortcode == postId[4])[0].node.video_url
                return videoPath;
            } else {
                const imagePath = json.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.filter((item) => item.node.shortcode == postId[4])[0].node.display_url
                return imagePath;
            }
        }
        else if (json.entry_data.PostPage[0].graphql.shortcode_media.__typename === 'GraphVideo') {

            if (json.entry_data.PostPage[0].graphql.shortcode_media.is_video) {
                return { video_url: json.entry_data.PostPage[0].graphql.shortcode_media.video_url, display_url: json.entry_data.PostPage[0].graphql.shortcode_media.display_url }
            }
        }
        else {
            return json.entry_data.PostPage[0].graphql.shortcode_media.display_url;
        }
    }

}).catch((error) => {
    if (dataSrc.includes("cdn.taggbox.com")) return NoCameraImgPost;
    else return NoCameraImgPost;
})

export const GET_INSTAGRAM_IMAGE = (instagramUrl) => new HttpClient().get(instagramUrl)


export const POPUP_VIDEO_RENEW = async (e) => {
    let dataVideo = document.querySelector(".tb-detail-image-iframe")
    if (dataVideo == null || dataVideo == undefined) dataVideo = e.target;
    const network = dataVideo.getAttribute("data-network");
    const type = dataVideo.getAttribute("data-type");
    const wallId = dataVideo.getAttribute("data-wall-id");
    const postId = dataVideo.getAttribute("data-item-id");
    const filterId = dataVideo.getAttribute("data-filter-id");
    var video_update = '';
    var image_update = '';
    const UserDetail = store.getState().appData.wall.UserDetail;
    if (network) {
        if ((network == 2 || network == 18 || network == 3) && dataVideo.getAttribute("data-load") != 1 && filterId != "34") {
            if (type === 'video' && dataVideo.getAttribute("data-load") == 0 && network == 3) {
                axios.post(`https://${FOR_TEST_SERVER ? `test` : `app`}.taggbox.com/widget/post/updateStatus`, {
                    wallId: wallId,
                    postId: postId,
                    table_name: UserDetail.db_table
                }).then(({ data }) => {
                    let findDataVideo = dataVideo.querySelector("video")
                    findDataVideo.src = data.video;
                    video_update = data.video;
                    image_update = data.media;
                    dataVideo.setAttribute("data-load", "1")
                })
            }
            else if (type === 'video' && (network == 2 || network == 18) && dataVideo.getAttribute("data-load") != 1) {
                const dataSrc = dataVideo.src;
                let links = dataVideo.getAttribute("data-link");
                let postIdNew = links.split('/');
                let fetchUrl = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${links}`;
                let IMG_URL_UPDATE = await FETCH_LINK(fetchUrl, postIdNew, dataSrc, 'video')
                if (IMG_URL_UPDATE && IMG_URL_UPDATE != null && IMG_URL_UPDATE.length > 0 && typeof IMG_URL_UPDATE === 'string' && IMG_URL_UPDATE.includes("no-camera.svg") && IMG_URL_UPDATE.includes("no-image.svg")) {
                    axios.post(`https://${FOR_TEST_SERVER ? `test` : `app`}.taggbox.com/widget/post/updateStatus`, {
                        wallId: wallId,
                        postId: postId,
                        table_name: UserDetail.db_table
                    }).then(({ data }) => {
                        dataVideo.src = data.video;
                        video_update = data.video;
                        image_update = data.media;
                        dataVideo.setAttribute("data-load", "1")
                    })
                }
                else {
                    if (IMG_URL_UPDATE && IMG_URL_UPDATE != null && IMG_URL_UPDATE.length > 0 && typeof IMG_URL_UPDATE === 'string') {
                        dataVideo.src = (window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')) ? `https://cdn.taggbox.com/v7/${IMG_URL_UPDATE}` : `https://images.taggbox.com/${IMG_URL_UPDATE}`;
                        video_update = IMG_URL_UPDATE;
                        dataVideo.attributes["data-load"].value = "1";
                        if (IMG_URL_UPDATE.includes("no-camera.svg")) {
                            //dataVideo.style = "visibility:visible!important;width:180px;margin:20px auto;object-fit: contain;";
                        }
                        //dataVideo.style = "";
                        if (!video_update.includes("no-image.svg") && !video_update.includes("no-camera.svg") && !video_update.includes("cdn.taggbox.com") && !video_update.includes("cloud.taggbox.com")) {
                            updateInstagramPostImage({
                                wallId: wallId,
                                postFile: image_update,
                                video: video_update,
                                type: 5,
                                postId: postId
                            });
                        }
                    }
                    else if (typeof IMG_URL_UPDATE === 'object' && type === 'video') {
                        dataVideo.src = `https://images.taggbox.com/${IMG_URL_UPDATE.video_url}`;
                        video_update = IMG_URL_UPDATE.video_url;
                        if ((window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome'))) {
                            dataVideo.setAttribute("src", `https://cdn.taggbox.com/v7/${IMG_URL_UPDATE.video_url}`);
                        }
                        else {
                            dataVideo.setAttribute("src", `https://images.taggbox.com/${IMG_URL_UPDATE.video_url}`);
                        }

                        dataVideo.setAttribute("data-load", "1");
                        if (IMG_URL_UPDATE.display_url.includes("no-camera.svg")) {
                        }
                        if (!video_update.includes("no-image.svg") && !video_update.includes("no-camera.svg") && !video_update.includes("cdn.taggbox.com") && !video_update.includes("cloud.taggbox.com")) {
                            updateInstagramPostImage({
                                wallId: wallId,
                                postFile: image_update,
                                video: video_update,
                                type: 5,
                                postId: postId
                            });
                        }

                    }
                }
            }
        }
        else {
            dataVideo.setAttribute("data-load", "1")
        }

    }
}
import { GET_APP_DATA, SHOW_MORE_DATA_UPDATE, FILTER_DATA_UPDATE, ERROR_RESPONSE_WITH_MESSAGE, GET_THEME_ERROR_SUCCESS, PLAN_LIMIT } from './reducersKeys'
import { ERROR, POST_DATA, LOADER, WALL_ID, LANGUAGE_SETTINGS, WALL_DATA, WEB_FILTERS } from './contants'
import { languageSettings } from '../actions/themeActions'
import { convertObjectToArray, randomNumber } from '../utils'
import { SHARE_ROOT_URL } from "../actions/api";
const initialState = {
    error: ERROR,
    postData: POST_DATA,
    loader: LOADER,
    wall: WALL_DATA,
    wallID: WALL_ID,
    languageSetting: LANGUAGE_SETTINGS,
    webFilters: WEB_FILTERS
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_APP_DATA: {
            const loadData = APP_DATA(action.payload, action.heightEvent)
            return { ...state, ...loadData }
        }
        case SHOW_MORE_DATA_UPDATE: {
            const { newData, filterNetworkId, appendData, hasMoreData } = action.payload;
            var PostUpdateData = postDataRenderData(filterNetworkId, state.postData, newData)
            PostUpdateData.afterUsedList = [...PostUpdateData.afterUsedList, PostUpdateData.appendData.after]
            PostUpdateData.hasMoreData = { ...PostUpdateData.hasMoreData, ...hasMoreData }
            let appendNewData = {
                after: appendData.after,
                networkID: appendData.networkID,
                heightEvent: appendData.heightEvent
                    ? appendData.heightEvent
                    : PostUpdateData.appendData.heightEvent,
            };
            PostUpdateData.appendData = appendNewData;
            return {
                ...state,
                postData: PostUpdateData
            };
        }
        case FILTER_DATA_UPDATE: {
            const { newData, filterNetworkId, appendData, hasMoreData } = action.payload;
            var PostUpdateData = postDataRenderData(filterNetworkId, state.postData, newData)
            PostUpdateData.afterUsedList = [...PostUpdateData.afterUsedList, PostUpdateData.appendData.after]
            PostUpdateData.hasMoreData = { ...PostUpdateData.hasMoreData, ...hasMoreData }
            let appendNewData = {
                after: appendData.after,
                networkID: appendData.networkID,
                heightEvent: appendData.heightEvent
                    ? appendData.heightEvent
                    : PostUpdateData.appendData.heightEvent,
            };
            PostUpdateData.appendData = appendNewData;
            return {
                ...state,
                postData: PostUpdateData
            };

        }
        case ERROR_RESPONSE_WITH_MESSAGE: {
            var errorData = state.error;
            errorData.errorWithMessage = action.payload;

            return { ...state, error: errorData }
        }
        case GET_THEME_ERROR_SUCCESS: {
            var errorData = state.error;
            errorData.themeError = action.payload;
            return { ...state, error: errorData }
        }
        case PLAN_LIMIT: {
            var errorData = state.error;
            errorData.planLimit = action.payload;
            return { ...state, error: errorData }
        }
        default:
            return { ...state }
    }

}


const APP_DATA = (response, heightEvent) => {
    let Error = ERROR;
    var PostUpdateData = POST_DATA;
    let LoaderData = LOADER;
    let WallData = WALL_DATA;
    let WallID = WALL_ID;
    let LanguageData = LANGUAGE_SETTINGS;
    let WebFilter = WEB_FILTERS;

    const {
        planLimit,
        after,
        customPost,
        postData,
        webFilters,
        error_code,
        post_message,
        older_days,
        older_post,
        visitorLimit,
        wall, response_code,
        loader_type, loader_color1, loader_color2
    } = response
    Error.planLimit = planLimit ? planLimit : false;

    if (wall && wall.UserRule && wall.UserRule.branding_lite && wall.UserRule.branding_lite == 1 && ![55].includes(wall.Personalization.widgetTheme)) PostUpdateData.isFreeAdsStatus = true;
    // else {
    //     if (wall && wall.UserDetail && wall.UserDetail.planId && ["1", "53"].includes(wall.UserDetail.planId) && ![55].includes(wall.Personalization.widgetTheme)) PostUpdateData.isFreeAdsStatus = true;
    // }
    LoaderData.loader = { loader_type, loader_color1, loader_color2, wall };
    LoaderData.isLoaderEnable = loader_type === 404 ? false : true;
    WallData = wall;
    WallID = wall.Wall.id;

    PostUpdateData.wallId = wall.Wall.id
    PostUpdateData.userId = wall.Wall.owner
    PostUpdateData.db_table = wall.UserDetail.db_table

    LanguageData = {
        ...languageSettings(
            wall.Personalization.w_language,
            wall.Personalization.custom_lan_data
        )
    }
    Error.themeError = {
        error_code: error_code,
        post_message: post_message,
        older_days: older_days,
        older_post: older_post,
    }
    PostUpdateData.customPostData = customPost;
    PostUpdateData = postDataRenderData(PostUpdateData.filterNetworkId, PostUpdateData, postData)
    WebFilter = convertObjectToArray(webFilters);
    PostUpdateData.appendData = {
        after: after,
        networkID: 0,
        heightEvent: heightEvent
            ? heightEvent
            : PostUpdateData.appendData.heightEvent,
    }


    return {
        error: Error,
        postData: PostUpdateData,
        loader: LoaderData,
        wall: WallData,
        wallID: WallID,
        languageSetting: LanguageData,
        webFilters: WebFilter
    }
}


var postDataRenderData = (filterNetworkId, PostUpdateData, newData) => {
    let filterId = filterNetworkId
        ? filterNetworkId
        : PostUpdateData.currentFilterNetworkId;
    if (!filterId) {
        filterId = 0;
    }


    let completeDataObject = PostUpdateData.completeDataObject;
    let filteredDataObject = PostUpdateData.filteredDataObject;
    let completeData = PostUpdateData.completeData;
    let customPostData = PostUpdateData.customPostData;
    let freeAdsPosition = PostUpdateData.freeAdsPosition;
    // if (isPreRenderData) {
    //     newData = PostUpdateData.preRender;
    // }
    if (Object.keys(newData).length) {
        Object.keys(newData).forEach((key) => {
            const item = newData[key];
            if (!completeDataObject[item.id]) {
                const refererUrl = PostUpdateData.originUrl;
                const description = encodeURIComponent(
                    item.content + (PostUpdateData.userId !== 30879 ? " via #taggbox" : '')
                );
                const shareUrl = encodeURIComponent(
                    SHARE_ROOT_URL +
                    window.btoa(
                        item.id + "---" + PostUpdateData.wallId + "---" + refererUrl + "---" + PostUpdateData.db_table
                    )
                );
                const facebookShareUrl = `https://www.facebook.com/sharer.php?u=${shareUrl}&description=${description}`;
                let twitterShareUrl = `https://twitter.com/intent/tweet?text=${description}`;
                if (item.type != 1) {
                    twitterShareUrl = twitterShareUrl + "&url=" + shareUrl;
                }
                const plusGoogleShareUrl = `https://plus.google.com/share?url=${shareUrl}`;
                const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&summary=${description}`;
                item.shareDetail = {
                    shareUrl: SHARE_ROOT_URL +
                        window.btoa(
                            item.id + "---" + PostUpdateData.wallId + "---" + refererUrl + "---" + PostUpdateData.db_table
                        ), description: item.content + (PostUpdateData.userId !== 30879 ? " via #taggbox" : '')
                }

                item.share = {
                    ...item.share,
                    facebook: facebookShareUrl,
                    twitter: twitterShareUrl,
                    linkedin: linkedinShareUrl,
                    google: plusGoogleShareUrl,
                };
                // }
                // }
                completeDataObject[item.id] = item;
            }

            if (filteredDataObject[item.network.id]) {
                //if(isPreRenderData){
                if (!filteredDataObject[item.network.id].includes(item.id)) {
                    filteredDataObject[item.network.id].push(item.id);
                }
                // } else {
                //filteredDataObject[item.network.id].push(item.id);
                //}
            } else {
                filteredDataObject[item.network.id] = [item.id];
            }
            if (!completeData.includes(item.id)) completeData.push(item.id);
        });
    }

    let postData = filterId && filteredDataObject[filterId]
        ? filteredDataObject[filterId]
        : filterId == 0
            ? completeData
            : [];

    //Custom Data
    // if (PostUpdateData.isFreeAdsStatus) {
    //     freeAdsPosition = randomNumber(3, completeData.length, freeAdsPosition);

    //     if (freeAdsPosition && freeAdsPosition.length > 0) {
    //         freeAdsPosition.map((itemIndex) => {
    //             let customPostIndex = parseInt(itemIndex);
    //             const item = {
    //                 isPost: true,
    //                 id: `free_add_${itemIndex}`, share: {
    //                     status: 1, facebook: "", google: "", linkedin: "", twitter: ""
    //                 },
    //                 network: {
    //                     class: "", color: "", icon: "", id: 0, name: ""
    //                 },
    //                 font: {
    //                     authorColor: "",
    //                     cardColor: "",
    //                     font: 0,
    //                     fontColor: "",
    //                     fontsize: "",
    //                     iconColor: "",
    //                 }
    //             }
    //             if (completeData.length > customPostIndex) {
    //                 if (completeData[customPostIndex] != item.id)
    //                     completeData.splice(customPostIndex, 0, item.id);
    //                 if (!completeDataObject[item.id]) {
    //                     completeDataObject[item.id] = item;
    //                 }
    //             }
    //         })
    //     }
    // }



    if (Object.keys(customPostData).length) {
        Object.keys(customPostData).forEach((key) => {
            let item = customPostData[key];
            const { status, after, every } = item;
            if (status === 1) {
                let customPostIndex = parseInt(after);
                for (
                    customPostIndex;
                    customPostIndex <= completeData.length;
                    customPostIndex = customPostIndex + parseInt(every)
                ) {
                    if (completeData.length > customPostIndex) {
                        if (completeData[customPostIndex] != item.id)
                            completeData.splice(customPostIndex, 0, item.id);
                        if (!completeDataObject[item.id]) {
                            completeDataObject[item.id] = item;
                        }
                    }
                }
            }
        });
    }


    return {
        ...PostUpdateData,
        completeDataObject,
        completeData,
        postData: postData,
        filteredDataObject: filteredDataObject,
        preRender: PostUpdateData.preRender,
        freeAdsPosition
    };

}
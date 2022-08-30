export var ERROR = { themeError: null, errorWithMessage: null, errorMessage: null, planLimit: false }
export var POST_DATA = {
    postData: [],
    completeData: [],
    preRender: {},
    appendData: { after: null, networkID: 0, heightEvent: null },
    completeDataObject: {},
    filteredDataObject: {},
    hasMoreData: {},
    urlsAccessed: [],
    customPostData: {},
    wallId: null,
    originUrl: window.location.href,
    afterUsedList: [],
    userId: null,
    isFreeAdsStatus: false,
    freeAdsPosition: [3,],
    db_table: ""
}

export var LOADER = { loader: null, themeLoader: true, isShowMoreLoader: false, webFilterLoader: false, isLoaderEnable: false }

export var WALL_DATA = null
export var WALL_ID = null

export var LANGUAGE_SETTINGS = { customLanguageData: null, buttonName: "Show More", filterButton: "All", viewOnText: "View on", shareText: "SHARE" }



export var WEB_FILTERS = null
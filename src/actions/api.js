export const FOR_TEST_SERVER = false
if (FOR_TEST_SERVER) {
    var API_HOSTURL = 'https://test.taggbox.com/';
    var DOMAIN = 'https://test.taggbox.com/';
} else {
    var API_HOSTURL = 'https://api.taggbox.com/';
    var DOMAIN = 'https://app.taggbox.com/';
}

export const APIHOST = API_HOSTURL;
export const APPHOST = DOMAIN;
export const APPURL = `${DOMAIN}/widget`;

export const UPDATE_INSTAGRAM_IMAGE_VIDEO = `${APPHOST}widget/post/update`;
export const SHARE_ROOT_URL = "https://app.taggbox.com/s/";

export const GET_WIDGET_DATA_API_PATH = `${APIHOST}api/v2/walls/`;
export const GET_DATA_POST_APPEND = `${APIHOST}api/v2/walls/load-more-posts/`;
export const UPDATE_SHOW_MORE_AND_POST_TRACKING = `${APIHOST}api/v2/walls/show-more`;
export const REPORT_MEDIA = `${APIHOST}api/v1/posts/report-post`;

export const SHARE_POST_BY_EMAIL = `${APIHOST}api/v1/walls/share-email`;
export const UPDATE_WIDGET_ONSITE_UPLOAD = `${APIHOST}api/v1/walls/onsite-upload`;
export const HASHTAG_CAMPAIGN_IMAGE = `${APIHOST}api/v1/walls/domain-screenshot`;
export const VIDEO_COMPRESS = `${APIHOST}api/v1/display/walls/video-compress`;
export const EMBED_TRACKING = `${APIHOST}api/v1/walls/log-embed-uri`
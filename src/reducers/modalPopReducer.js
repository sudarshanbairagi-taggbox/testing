import { SHOW_POP_UP, CLOSE_POP_UP, ONSITE_POPUP, REPORT_MEDIA_POP_UP, SHARE_POST_POP_UP, REPORT_MEDIA_CLOSE_POP_UP, SHARE_POST_CLOSE_POP_UP, ONSITE_TOKEN_UPDATE,POST_DEFAULT_HEIGHT } from './reducersKeys'
const initialState = { isShowPopUp: false, data: null, onSiteIsShowPopUp: false, reportStatus: false, shareStatus: false, reportData: null, shareData: null, onsite_token: null }
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_POP_UP: {
            return { ...state, isShowPopUp: true, data: action.payload }
        }
        case CLOSE_POP_UP: {
            return { ...state, isShowPopUp: false, data: null }
        }
        case ONSITE_POPUP: {
            return { ...state, onSiteIsShowPopUp: action.payload, data: null }
        }
        case REPORT_MEDIA_POP_UP: {
            return { ...state, reportStatus: true, reportData: action.payload }
        }
        case SHARE_POST_POP_UP: {
            return { ...state, shareStatus: true, shareData: action.payload }
        }

        case REPORT_MEDIA_CLOSE_POP_UP: {
            return { ...state, reportStatus: false, reportData: null }
        }
        case SHARE_POST_CLOSE_POP_UP: {
            return { ...state, shareStatus: false, shareData: null }
        }
    
        case ONSITE_TOKEN_UPDATE: {
            return { ...state, onsite_token: action.payload }
        }
        default:
            return { ...state }
    }

}
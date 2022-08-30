
import { SHOW_POP_UP, CLOSE_POP_UP,GET_THEME_SHOW_MORE_LOADER_SUCCESS, ONSITE_POPUP, REPORT_MEDIA_POP_UP, SHARE_POST_POP_UP,POST_DEFAULT_HEIGHT, REPORT_MEDIA_CLOSE_POP_UP, SHARE_POST_CLOSE_POP_UP } from './reducersKeys'
const initialState = { isShowPopUp: false, data: null, onSiteIsShowPopUp: false, reportStatus: false, shareStatus: false, reportData: null, shareData: null ,
  isShowMoreLoading: false,
  isFilterLoading: false
}

export default function reducer(state = initialState, action) {  

   switch (action.type) {

        case POST_DEFAULT_HEIGHT: {
            return { data : action.payload,status:true,manage_height: action.payload!=0 ? true :false }
        }

      default:
        return { data : 0,status:false}
    }
} 

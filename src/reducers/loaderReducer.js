import { GET_THEME_SHOW_MORE_LOADER_SUCCESS, GET_WEB_FILTER_LOADER_SUCCESS } from './reducersKeys'
const initialState = {
    isShowMoreLoading: false,
    isFilterLoading: false
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_THEME_SHOW_MORE_LOADER_SUCCESS: {
            return { ...state, isShowMoreLoading: action.payload }
        }
        case GET_WEB_FILTER_LOADER_SUCCESS: {
            return { ...state, isFilterLoading: action.payload }
        }
        default:
            return { ...state }
    }

}
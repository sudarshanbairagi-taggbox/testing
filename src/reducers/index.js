import { combineReducers } from "redux"
import appData from './appDataReducer'
import loaderData from './loaderReducer'
import modalPop from './modalPopReducer'
import postHeight from './postheightReducer'
import renderId from './renderIdReducer'

export default combineReducers({
    appData,
    loaderData,
    modalPop,
    postHeight,
    renderId
})
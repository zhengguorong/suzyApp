/**
 *  app全局相关action
 */
import http from '../util/http'
import * as api from '../util/api'
import * as types from '../constants/ActionTypes'
import {AsyncStorage} from 'react-native'

/**
 * 设置当前选中tab
 */
export const setSelectedTab = (name) => {
    return { type: types.SET_SELECTED_TAB, selectedTab: name }
}
/**
 * 获取cover
 */
export const getCover = () => {
    return (dipatch) => {
        AsyncStorage.getItem('cover', (err,data) => {
            dipatch({ type: types.GET_COVER, cover: JSON.parse(data) })
        })
    }
}
/**
 * update cover
 */
export const updateCover = () => {
    return (dispatch) => {
        api.updateCover().then(data => {
            dispatch({ type: types.UPDATE_COVER, data: data })
            AsyncStorage.setItem('cover', JSON.stringify(data))
        }).catch( err => {
            // console.log(err)
        })
    }
}
/**
 * 隐藏闪频
 */
export const hideSplashScreen = () => {
    return {type:types.HIDE_SPLASH_SCREEN}
}
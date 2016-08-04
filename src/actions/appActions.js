/**
 *  app全局相关action
 */
import http from '../util/http'
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
        http.get('http://news-at.zhihu.com/api/4/start-image/1080*1776', (data) => {
            dispatch({ type: types.UPDATE_COVER, data: data })
            AsyncStorage.setItem('cover', JSON.stringify(data))
        }, (err) => {
            console.log(err)
        }, dispatch)
    }
}
/**
 * 隐藏闪频
 */
export const hideSplashScreen = () => {
    return {type:types.HIDE_SPLASH_SCREEN}
}
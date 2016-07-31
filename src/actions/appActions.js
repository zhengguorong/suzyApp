/**
 *  app全局相关action
 */
import http from '../util/http'
import * as types from '../constants/ActionTypes'

/**
 * 设置当前选中tab
 */
export const setSelectedTab=(name)=>{
    return {type:types.SET_SELECTED_TAB,selectedTab:name}
}

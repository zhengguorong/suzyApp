/**
 * app全局reducer
 */
import * as types from '../constants/ActionTypes'

const appReducers = (state = { selectedTab: 'post' }, action) => {
  switch (action.type) {
    case types.SET_SELECTED_TAB:
      return Object.assign({}, state, { selectedTab: action.selectedTab })
    case types.GET_COVER:
      return Object.assign({}, state, { cover: action.cover })
    case types.UPDATE_COVER:
      return Object.assign({}, state, {cover: action.data})
    case types.HIDE_SPLASH_SCREEN:
      return Object.assign({}, state, { splashState: false })
    default:
      return state
  }
}
export default appReducers
/**
 * app全局reducer
 */
import * as types from '../constants/ActionTypes'

const appReducers = (state = { selectedTab: 'post' }, action) => {
  switch (action.type) {
    case types.SET_SELECTED_TAB:
      return Object.assign({}, state, { selectedTab: action.selectedTab })
    case types.TO_POST_DETAIL_PAGE:

    default:
      return state
  }
}
export default appReducers
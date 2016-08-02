import * as types from '../constants/ActionTypes'
import {ListView} from 'react-native'
/**
 * 文章相关reducer
 */
let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
let defaultDataSource = ds.cloneWithRows([])

const postReducers = (state = { dataSource: defaultDataSource }, action) => {
  switch (action.type) {
    case types.FETCH_POST_LIST:
      let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      if (action.page > 1) {
        dataSource = dataSource.cloneWithRows(state.posts.concat(action.posts))
        return Object.assign({}, state, { dataSource: dataSource, posts: state.posts.concat(action.posts), curPage: action.page })
      } else {
        dataSource = dataSource.cloneWithRows(action.posts);
        return Object.assign({}, state, { dataSource: dataSource, posts: action.posts, curPage: action.page })
      }
    case types.FETCH_POST_DETAIL:
      return Object.assign({}, state, { post: action.post })
    case types.FRESH_POST_START:
      return Object.assign({}, state, { refreshing: true })
    case types.FRESH_POST_FINISH:
      return Object.assign({}, state, { refreshing: false })
    case types.ADD_COMMENT_SUCCESS:
      return Object.assign({}, state, { addCommnetResult: 'success' })
    case types.ADD_COMMENT_FAIL:
      return Object.assign({}, state, { addCommnetResult: 'fail' })
    case types.LIKE_SUCCESS:
      return Object.assign({}, state, { likeResult: 'success' })
    case types.LIKE_SUCCESS:
      return Object.assign({}, state, { likeResult: 'fail' })
    case types.UNLIKE_SUCCESS:
      return Object.assign({}, state, { unlikeResult: 'success' })
    case types.UNLIKE_FAIL:
      return Object.assign({}, state, { unlikeResult: 'fail' })
    case types.SELECTED_IMG:
      return Object.assign({}, state, { selectedImg: action.selectedImg })
    case types.ADD_POST_START:{
      return Object.assign({}, state, {addPostLoading:true})
    }
    case types.ADD_POST_SUCCESS:
      return Object.assign({}, state, { addPostResult: 'success',selectedImg:{},addPostLoading:false})
    case types.ADD_POST_FAIL:
      return Object.assign({}, state, { addPostResult: 'fail' })
    case types.CLEAR_SELECTED_IMG:
      return Object.assign({}, state, { selectedImg: {} })
    default:
      return state
  }
}
export default postReducers
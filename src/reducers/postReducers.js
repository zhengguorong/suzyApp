import * as types from '../constants/ActionTypes'
import { ListView } from 'react-native'
/**
 * 文章相关reducer
 */
let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
let defaultDataSource = ds.cloneWithRows([])

/**
 * 更新文章列表dataSource
 */
const updatePostListDataSource = (state, action) => {
  let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  if (action.page > 1) {
    dataSource = dataSource.cloneWithRows(state.posts.concat(action.posts))
    return dataSource
  } else {
    dataSource = dataSource.cloneWithRows(action.posts);
    return dataSource
  }
}

/**
 * 更新单个post
 */
const updatePostDataSource = (state, action, cb) => {
  var posts = state.posts
  var id = action.id
  //查找指定id的post
  var index = posts.findIndex((value, index, arr) => {
     return id === value._id
  })
  posts[index] = cb(posts[index])
  dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return dataSource.cloneWithRows(posts)
}

const postReducers = (state = { dataSource: defaultDataSource }, action) => {
  switch (action.type) {
    case types.FETCH_POST_LIST:
      var dataSource = updatePostListDataSource(state, action)
      return Object.assign({}, state, { dataSource: dataSource, posts: state.posts ? state.posts.concat(action.posts) : action.posts, curPage: action.page })
    case types.FETCH_LIKE_POST_LIST:
      var dataSource = updatePostListDataSource(state, action)
      return Object.assign({}, state, { likeDataSource: dataSource, likePosts: state.likePosts ? state.likePosts.concat(action.posts) : action.posts, curLikePage: action.page })
    case types.FETCH_POST_DETAIL:
      return Object.assign({}, state, { post: action.post })
    case types.FETCH_POST_DETAIL_START:
      return Object.assign({}, state, { post: {} })
    case types.FRESH_POST_START:
      return Object.assign({}, state, { refreshing: true })
    case types.FRESH_POST_FINISH:
      return Object.assign({}, state, { refreshing: false })
    case types.FETCH_NEXT_PAGE_START:
      return Object.assign({}, state, { fetchingNext: true })
    case types.FETCH_NEXT_PAGE_FINISH:
      return Object.assign({}, state, { fetchingNext: false })
    case types.ADD_COMMENT_SUCCESS:
      var dataSource = updatePostDataSource(state, action, (post) => {
        post.commentCount = post.commentCount + 1
        return post
      })
      return Object.assign({}, state, { dataSource: dataSource })
    case types.ADD_COMMENT_FAIL:
      return Object.assign({}, state, { addCommnetResult: 'fail' })
    case types.LIKE_SUCCESS:
      var dataSource = updatePostDataSource(state, action, (post) => {
        post.like = 1
        return post
      })
      return Object.assign({}, state, { dataSource: dataSource })
    case types.LIKE_FAIL:
      return Object.assign({}, state, { likeResult: 'fail' })
    case types.UNLIKE_SUCCESS:
      var dataSource = updatePostDataSource(state, action, (post) => {
        post.like = 0
        return post
      })
      return Object.assign({}, state, { dataSource: dataSource })
    case types.UNLIKE_FAIL:
      return Object.assign({}, state, { unlikeResult: 'fail' })
    case types.SELECTED_IMG:
      return Object.assign({}, state, { selectedImg: action.selectedImg })
    case types.ADD_POST_START: {
      return Object.assign({}, state, { addPostLoading: true })
    }
    case types.ADD_POST_SUCCESS:
      return Object.assign({}, state, { addPostResult: 'success', selectedImg: {}, addPostLoading: false })
    case types.ADD_POST_FAIL:
      return Object.assign({}, state, { addPostResult: 'fail' })
    case types.UPDATE_POST_START: {
      return Object.assign({}, state, { updatePostLoading: true })
    }
    case types.UPDATE_POST_SUCCESS:
      return Object.assign({}, state, { updatePostResult: 'success', updatePostLoading: false })
    case types.UPDATE_POST_FAIL:
      return Object.assign({}, state, { updatePostResult: 'fail', updatePostLoading: false })
    case types.CLEAR_SELECTED_IMG:
      return Object.assign({}, state, { selectedImg: {} })
    default:
      return state
  }
}
export default postReducers
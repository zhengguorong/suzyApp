/**
 *  文章相关action
 */
import http from '../util/http'
import * as types from '../constants/ActionTypes'
import tools from '../util/tools'

/**
 * 获取文章列表
 */
export const getPosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FRESH_POST_START })
        http.get(tools.domain + '/api/article/?page=' + page + '&count=' + count, function (data) {
            dispatch({ type: types.FRESH_POST_FINISH })
            dispatch({ type: types.FETCH_POST_LIST, posts: data, page: page })
        }, function (err) {
            console.log(err); dispatch({ type: types.FRESH_POST_FINISH })
        }, dispatch)
    }
}

/**
 * 获取like文章列表
 */
export const getLikePosts = (page, count) => {
    console.log('getLikePost action')
    return (dispatch) => {
        dispatch({ type: types.FRESH_POST_START })
        http.get(tools.domain + '/api/article/like?page=' + page + '&count=' + count, function (data) {
            dispatch({ type: types.FRESH_POST_FINISH })
            dispatch({ type: types.FETCH_LIKE_POST_LIST, posts: data, page: page })
        }, function (err) {
            console.log(err); dispatch({ type: types.FRESH_POST_FINISH })
        }, dispatch)
    }
}
/**
 * 获取文章列表
 */
export const getNextPosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_NEXT_PAGE_START })
        http.get(tools.domain + '/api/article/?page=' + page + '&count=' + count, function (data) {
            dispatch({ type: types.FETCH_NEXT_PAGE_FINISH })
            dispatch({ type: types.FETCH_POST_LIST, posts: data, page: page })
        }, function (err) {
            dispatch({ type: types.FETCH_NEXT_PAGE_FINISH })
        }, dispatch)
    }
}
/**
 * 获取Like文章列表
 */
export const getNextLikePosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_NEXT_PAGE_START })
        http.get(tools.domain + '/api/article/like?page=' + page + '&count=' + count, function (data) {
            dispatch({ type: types.FETCH_NEXT_PAGE_FINISH })
            dispatch({ type: types.FETCH_LIKE_POST_LIST, posts: data, page: page })
        }, function (err) {
            dispatch({ type: types.FETCH_NEXT_PAGE_FINISH })
        }, dispatch)
    }
}
/**
 * 获取文章详情
 */
export const getPostDetail = (id) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_POST_DETAIL_START })
        http.get(tools.domain + '/api/article/detail/' + id, function (data) {
            dispatch({ type: types.FETCH_POST_DETAIL, post: data })
        }, function (err) { console.log(err) }, dispatch)
    }
}
/**
 * 添加评论
 */
export const addComment = (pId, author, content, cb) => {
    return (dispatch) => {
        http.post(tools.domain + '/api/reply/', { pId: pId, author: author, content: content }, function (data) {
            cb(data)
            dispatch({ type: types.ADD_COMMENT_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.ADD_COMMENT_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }
}
/**
 * 点赞
 */
export const like = (post) => {
    return (dispatch) => {
        http.put(tools.domain + '/api/article/' + post._id, { like: 1 }, function (data) {
            post.like = 1
            dispatch({ type: types.LIKE_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.LIKE_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }
}
/**
 * 取消点赞
 */
export const unlike = (post) => {
    return (dispatch) => {
        http.put(tools.domain + '/api/article/' + post._id, { like: 0 }, function (data) {
            post.like = 0
            dispatch({ type: types.UNLIKE_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.UNLIKE_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }
}
/**
 * 选择图片
 */
export const selectedImg = (source) => {
    return { type: types.SELECTED_IMG, selectedImg: source }
}
/**
 * 清空选中图片
 */
export const clearSelectedImg = () => {
    return { type: types.CLEAR_SELECTED_IMG }
}
/**
 * 添加文章
 */
export const addPost = (title, content, author, fileData) => {

    return dispatch => {
        dispatch({ type: types.ADD_POST_START })
        http.post(tools.domain + '/api/article/', { title: title, content: content, author: author, fileData: fileData }, function (data) {
            dispatch({ type: types.ADD_POST_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.ADD_POST_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }
}
/**
 * 更新文章
 */
export const updatePost = (id, title, content, author, fileData, successCallback, failCallback) => {
    return dispatch => {
        dispatch({ type: types.UPDATE_POST_START })
        http.put(tools.domain + '/api/article/' + id, { title: title, content: content, author: author, fileData: fileData }, function (data) {
            successCallback()
            dispatch({ type: types.UPDATE_POST_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.UPDATE_POST_FAIL, result: err })
            failCallback()
        }, dispatch)
    }
}
/**
 *  文章相关action
 */
import http from '../util/http'
import * as api from '../util/api'
import * as types from '../constants/ActionTypes'
import tools from '../util/tools'

/**
 * 获取文章列表
 */
export const getPosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FRESH_POST_START })
        api.getPosts(page, count).then( data => {
            dispatch({ type: types.FETCH_POST_LIST, posts: data, page: page })
        }).finally( () => {
            dispatch({ type: types.FRESH_POST_FINISH })
        })
    }
}

/**
 * 获取like文章列表
 */
export const getLikePosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FRESH_POST_START })
        api.getLikePosts(page, count).then( data => {
            dispatch({ type: types.FETCH_LIKE_POST_LIST, posts: data, page: page })
        }).finally(() => {
            dispatch({ type: types.FRESH_POST_FINISH })
        })
    }
}
/**
 * 获取文章列表
 */
export const getNextPosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_NEXT_PAGE_START })
        api.getNextPosts(page,count).then( data => {
            dispatch({ type: types.FETCH_POST_LIST, posts: data, page: page })
        }).finally( () => {
            dispatch({ type: types.FETCH_NEXT_PAGE_FINISH })
        })
    }
}
/**
 * 获取Like文章列表
 */
export const getNextLikePosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_NEXT_PAGE_START })
        api.getNextLikePosts(page, count).then( data => {
            dispatch({ type: types.FETCH_LIKE_POST_LIST, posts: data, page: page })
        }).finally( () => {
            dispatch({ type: types.FETCH_NEXT_PAGE_FINISH })
        })
    }
}
/**
 * 获取文章详情
 */
export const getPostDetail = (id) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_POST_DETAIL_START })
        api.getPostDetail(id).then( data => {
            dispatch({ type: types.FETCH_POST_DETAIL, post: data })
        })
    }
}
/**
 * 添加评论
 */
export const addComment = ({pId, author, content}, cb) => {
    return (dispatch) => {
        api.addComment({ pId: pId, author: author, content: content }).then( data => {
            cb(data)
            dispatch({ type: types.ADD_COMMENT_SUCCESS, id: pId })
        }).catch( err => {
            dispatch({ type: types.ADD_COMMENT_FAIL, result: err })
        })
    }
}
/**
 * 点赞
 */
export const like = (id) => {
    return (dispatch) => {
        api.like(id).then( data => {
            dispatch({ type: types.LIKE_SUCCESS, id: id})
        }).catch( err => {
            dispatch({ type: types.LIKE_FAIL, id: id})
        })
    }
}
/**
 * 取消点赞
 */
export const unlike = (id) => {
    return (dispatch) => {
        api.unlike(id).then( data => {
            dispatch({ type: types.UNLIKE_SUCCESS, id: id})
        }).catch( err => {
            dispatch({ type: types.UNLIKE_FAIL, id: id})
        })
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
export const addPost = ({title, content, author, fileData}) => {
    return dispatch => {
        dispatch({ type: types.ADD_POST_START })
        api.addPost({ title: title, content: content, author: author, fileData: fileData }).then( data => {
            dispatch({ type: types.ADD_POST_SUCCESS, result: data })
        }).catch( err => {
            dispatch({ type: types.ADD_POST_FAIL, result: err })
        })
    }
}
/**
 * 更新文章
 */
export const updatePost = ({id, title, content, author, fileData}, successCallback, failCallback) => {
    return dispatch => {
        dispatch({ type: types.UPDATE_POST_START })
        api.updatePost({id:id, title: title, content: content, author: author, fileData: fileData }).then( data => {
            successCallback()
            dispatch({ type: types.UPDATE_POST_SUCCESS, result: data })
        }).catch( err => {
            dispatch({ type: types.UPDATE_POST_FAIL, result: err })
            failCallback()
        })
    }
}
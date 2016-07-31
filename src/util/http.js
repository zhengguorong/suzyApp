import * as types from '../constants/ActionTypes'

module.exports = {
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback,dispatch){
    dispatch({type:types.FETCH_START})
    fetch(url,{
        method: 'get',
        headers: {
            'Accept': 'application/json',
         }})
      .then((response) => response.text())
      .then((responseText) => {
        dispatch({type:types.FETCH_FINISH})
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        dispatch({type:types.FETCH_FINISH})
        failCallback&&failCallback(err);
      });
  },
  post:function(url,data, successCallback, failCallback,dispatch){
    dispatch({type:types.FETCH_START})
    fetch(url,{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)})
      .then((response) => response.text())
      .then((responseText) => {
        dispatch({type:types.FETCH_FINISH})
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        dispatch({type:types.FETCH_FINISH})
        failCallback&&failCallback(err);
      });
  }
};

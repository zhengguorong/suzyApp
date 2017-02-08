'use strict';

import React, { Component } from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView,
  RefreshControl,
  Navigator,
  Alert,
  ActivityIndicator,
  AlertIOS,
  AsyncStorage
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import tools from '../../util/tools'
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header'
import PostItem from '../../components/PostItem'
import PostDetail from './PostDetail'
import PostAdd from './PostAdd'
import CommentAdd from './CommentAdd'


class PostList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {getPosts, getLikePosts} = this.props;
    getPosts(1, 2);
    getLikePosts(1, 2)
    //检查是否已经填写用户信息
    AsyncStorage.getItem('author', (err,data) => {
      if (!data) {
        AlertIOS.prompt('👽来者何人！👽', null, [{ text: '确定', onPress: this._saveAuthor }], 'plain-text', 'rong')
      }else{
        tools.author=data
      }
    })

  }


  render() {
    const { dataSource, refreshing, fetchingNext } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Suzy.live'} navigator={this.props.navigator} rightBtn={<Icon name="ios-create-outline" size={30}/>} rightPress={this._toPostAdd.bind(this) }/>
        <View style={styles.flex}>
          <View>
            <Image style={styles.backgroundImage} source={require('../../image/bg.png') }></Image>
          </View>
          <ListView
            dataSource={dataSource}
            renderRow={this._renderRow.bind(this) }
            enableEmptySections={true}
            onEndReached={this._nextPage.bind(this) }
            onEndReachedThreshold={0}
            contentInset={{ top: -20 }}
            contentOffset={ { y: 20 }}
            renderFooter={this._renderFooter.bind(this) }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh.bind(this) }
                tintColor="#000"
                title="加载中..."
                titleColor="#000"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#000"

                />}
            />


        </View>
      </View>
    );
  }
  _renderRow(row) {
    return (
      <PostItem post={row} itemPress={this._toDetail.bind(this, row._id) } like={this._like.bind(this,row) } unLike={this._unlike.bind(this, row) } toCommentAdd={this._toCommentAdd.bind(this, row) }/>
    )
  }
  _saveAuthor(author) {
    AsyncStorage.setItem('author', author)
    tools.author=author
    
  }
  _renderFooter() {
    return (
      <ActivityIndicator
        animating = {this.props.fetchingNext}
        style = {{ height: 80 }
        }
        size = "large"
        />
    )
  }
  _toDetail(id) {
    this.props.navigator.push({
      component: PostDetail,
      passProps: {
        itemId: id,
        title: '详情',
      }
    })
  }
  _toPostAdd() {
    this.props.navigator.push({
      name: 'postAdd',
      component: PostAdd,
      passProps: {
        title: '添加',
      }
    })
  }
  _like(row) {
    this.props.like(row._id)
  }
  _unlike(row) {
    this.props.unlike(row._id)
  }
  _toCommentAdd(row) {
    this.props.navigator.push({
      name: 'commentAdd',
      component: CommentAdd,
      passProps: {
        itemId: row._id,
        post: row,
        title: '添加评论',
      }
    })
  }
  _onRefresh() {
    const {getPosts} = this.props;
    getPosts(1, 2);
  }
  _nextPage() {
    const {getPosts, getNextPosts, curPage, posts, refreshing} = this.props;
    if (posts.length == 0 || refreshing) {
      return
    }
    getNextPosts(curPage + 1, 2)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  flex: {
    flex: 1
  },
  postList: {
    position: 'absolute'
  },
  backgroundImage: {
    flex: 1,
    width: tools.size.width,
    height: tools.size.height,
    position: 'absolute',
  }
})

export default connect(state => ({
  dataSource: state.post.dataSource,
  refreshing: state.post.refreshing || false,
  curPage: state.post.curPage || 1,
  posts: state.post.posts || [],
  fetchingNext: state.post.fetchingNext || false
}),
  (dispatch) => ({
    getPosts: (page, count) => dispatch(postActions.getPosts(page, count)),
    getLikePosts: (page, count) => dispatch(postActions.getLikePosts(page, count)),
    getNextPosts: (page, count) => dispatch(postActions.getNextPosts(page, count)),
    like: (id) => dispatch(postActions.like(id)),
    unlike: (id) => dispatch(postActions.unlike(id))
  })
)(PostList);

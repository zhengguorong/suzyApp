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
  Alert
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
    const {getPosts} = this.props;
    getPosts(1, 2);
  }
  componentDidUpdate() {
    if (this.props.likeResult === 'success') {
      Alert.alert('结果', "点赞成功", [{ text: '确定', onPress: () => { } }])
    } else if (this.props.likeResult === 'fail') {
      Alert.alert('结果', '点赞失败')
    } else if (this.props.unlikeResult === 'success') {
      Alert.alert('结果', "取消点赞成功", [{ text: '确定', onPress: () => { } }])
    } else if (this.props.unlikeResult === 'fail') {
      Alert.alert('结果', "取消点赞失败")
    }
  }

  render() {
    const { dataSource, refreshing } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Suzy.live'} navigator={this.props.navigator} rightBtn={<Icon name="ios-create-outline" size={30}/>} rightPress={this._toPostAdd.bind(this)}/>
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
      <PostItem post={row} itemPress={this._toDetail.bind(this, row._id) } like={this._like.bind(this, row._id) } unLike={this._like.bind(this, row._id) } toCommentAdd={this._toCommentAdd.bind(this, row._id) }/>
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
      component: PostAdd,
      passProps: {
        title: '',
      }
    })
  }
  _like(id) {
    this.props.like(id)
  }
  _unlike(id) {
    this.props.unlike(id)
  }
  _toCommentAdd(id) {
    this.props.navigator.push({
      component: CommentAdd,
      passProps: {
        itemId: id,
        title: '添加评论',
      }
    })
  }
  _onRefresh() {
    const {getPosts} = this.props;
    getPosts(1, 2);
  }
  _nextPage() {
    const {getPosts, curPage, posts} = this.props;
    if (posts.length == 0) {
      return
    }
    getPosts(curPage + 1, 2)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  likeResult: state.post.likeResult || {}
}),
  (dispatch) => ({
    getPosts: (page, count) => dispatch(postActions.getPosts(page, count)),
    like: (id) => dispatch(postActions.like(id)),
    unlike: (id) => dispatch(postActions.unlike(id))
  })
)(PostList);

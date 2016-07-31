'use strict';

import React, { Component } from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView,
  RefreshControl
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import tools from '../../util/tools'
import Header from '../../components/Header'
import PostItem from '../../components/PostItem'
import PostDetail from './PostDetail'
import CommentAdd from './CommentAdd'


class PostList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {getPosts} = this.props;
    getPosts(1, 4);
  }

  render() {
    const { dataSource, refreshing } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Suzy.live'} navigator={this.props.navigator}/>
        <View style={styles.flex}>
          <View>
            <Image style={styles.backgroundImage} source={require('../../image/bg.png') }></Image>
          </View>
          <ListView
            dataSource={dataSource}
            renderRow={this._renderRow.bind(this) }
            enableEmptySections={true}
            onEndReached={this._nextPage.bind(this) }
            onEndReachedThreshold={10}
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
      <PostItem post={row} itemPress={this._toDetail.bind(this, row._id) } toCommentAdd={this._toCommentAdd.bind(this,row.id)}/>
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
  _toCommentAdd(id){
    this.props.navigator.push({
      component: CommentAdd,
      passProps: {
        itemId: id,
        title: '评论',
      }
    })    
  }
  _onRefresh() {
    const {getPosts} = this.props;
    getPosts(1, 2);
  }
  _nextPage() {
    const {getPosts, curPage,posts} = this.props;
    if(posts.length==0){
      return
    }
    getPosts(curPage+1, 2)
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
  posts:state.post.posts||[]
}),
  (dispatch) => ({
    getPosts: (page, count) => dispatch(postActions.getPosts(page, count)),
  })
)(PostList);

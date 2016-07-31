'use strict';

import React, { Component } from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import tools from '../../util/tools'
import Header from '../../components/Header'
import PostItem from '../../components/PostItem'



class PostList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {getPosts} = this.props;
    getPosts(1,2);
  }

  render() {
    const { dataSource } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Suzy.live'}/>
        <View style={styles.flex}>
          <View>
            <Image style={styles.backgroundImage} source={require('../../image/bg.png') }></Image>
          </View>
          <ScrollView contentInset={{top:-20}} contentOffset={ { y: 20 }}>
            <ListView
             dataSource={dataSource}
             renderRow={this._renderRow}
             enableEmptySections={true}
             />
          </ScrollView>
        </View>
      </View>
    );
  }
  _renderRow(row){
    return (
      <PostItem post={row}/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flex:{
    flex:1
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
  dataSource: state.post.dataSource
}),
  (dispatch) => ({
    getPosts: (page,count) => dispatch(postActions.getPosts(page,count)),
  })
)(PostList);

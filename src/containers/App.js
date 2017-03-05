'use strict';
/**
 * App主入口
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Image,
  AsyncStorage } from 'react-native'
import * as appActions from '../actions/appActions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {myIcon,homeIcon} from '../util/icon'
import PostList from '../containers/post/PostList'
import LikePostList from '../containers/post/LikePostList'
import Mark from '../containers/post/Mark'
import Navigation from '../components/Navigation'
import SplashScreen from '../components/SplashScreen'

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {getCover, updateCover, hideSplashScreen} = this.props
    getCover()
    updateCover()

    setTimeout(() => {
      hideSplashScreen()
    }, 2000)
  }

  render() {
    const { selectedTab, setSelectedTab, splashState, cover} = this.props;
    //缓存图片
    if (cover.img) {
      Image.prefetch(cover.img)
    }
    if (splashState) {
      return <SplashScreen cover={cover}/>
    } else {
      return (
        <TabBarIOS
          barTintColor='#fff'
          tintColor='#d4237a'>
          <TabBarIOS.Item
            title='文章'
            selected={selectedTab === 'post'}
            icon={{uri: homeIcon, scale: 7}}
            onPress={() => {
              setSelectedTab('post')
            } }>
            <Navigation component={PostList}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='喜😍欢'
            selected={selectedTab === 'member'}
            icon={{uri: myIcon, scale: 7}}
            onPress={() => {
              setSelectedTab('member')
            } }>
            <Navigation component={LikePostList}/>
          </TabBarIOS.Item>

        </TabBarIOS>
      )
    }

  }
}

export default connect(state => ({
  selectedTab: state.app.selectedTab,
  cover: state.app.cover || {},
  splashState: state.app.splashState === undefined ? true : false
}),
  (dispatch) => ({
    setSelectedTab: (name) => dispatch(appActions.setSelectedTab(name)),
    getCover: () => dispatch(appActions.getCover()),
    updateCover: () => dispatch(appActions.updateCover()),
    hideSplashScreen: () => dispatch(appActions.hideSplashScreen())
  })
)(App);
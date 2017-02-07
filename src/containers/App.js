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
import Icon from 'react-native-vector-icons/Ionicons'
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
          tintColor='#0058f1'>
          <Icon.TabBarItemIOS
            title='文章'
            selected={selectedTab === 'post'}
            iconName={'ios-home-outline'}
            onPress={() => {
              setSelectedTab('post')
            } }>
            <Navigation component={PostList}/>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title='喜😍欢'
            selected={selectedTab === 'member'}
            iconName={'ios-bookmarks-outline'}
            onPress={() => {
              setSelectedTab('member')
            } }>
            <Navigation component={LikePostList}/>
          </Icon.TabBarItemIOS>

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
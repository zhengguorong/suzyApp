'use strict';
/**
 * App主入口
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS} from 'react-native'
import * as appActions from '../actions/appActions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import PostList from '../containers/post/PostList'
import Mark from '../containers/post/Mark'
import Navigation from '../components/Navigation'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { state, setSelectedTab} = this.props;
    return (
        <TabBarIOS
            barTintColor='#fff'
            tintColor='#0058f1'>
            <Icon.TabBarItemIOS
                title='文章'
                selected={state.selectedTab==='post'}
                iconName={'ios-home-outline'}
                onPress={() => {
                    setSelectedTab('post')
                }}>
                <Navigation component={PostList}/>
            </Icon.TabBarItemIOS>
             <Icon.TabBarItemIOS
                title='收藏'
                selected={state.selectedTab==='member'}
                iconName={'ios-bookmarks-outline'}
                onPress={() => {
                    setSelectedTab('member')
                }}>
                <Navigation component={PostList}/>
            </Icon.TabBarItemIOS>
   
        </TabBarIOS>
    );
  }
}

export default connect(state => ({
    state: state.app
  }),
  (dispatch) => ({
    setSelectedTab: (name) => dispatch(appActions.setSelectedTab(name)),
  })
)(App);
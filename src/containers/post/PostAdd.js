'use strict';

import React, { Component } from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import tools from '../../util/tools'
import Header from '../../components/Header'


class PostAdd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header title={'添加文章'} navigator={this.props.navigator}/>
        <View>
          <TextInput
            ref='commentText'
            style={styles.textInput}
            autoFocus={true}
            multiline={true}
            placeholder={'请输入评论内容'}
            />
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({

})


export default connect()(PostAdd);

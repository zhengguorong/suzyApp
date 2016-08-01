'use strict';

import React, { Component } from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  CameraRoll
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import tools from '../../util/tools'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';


class PostAdd extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <View>
        <Header navigator={this.props.navigator} title={this.props.title} showBackBtn={true} rightBtn={<Text>保存</Text>}/>
        <ScrollView style={styles.container}>
          <View style={styles.titleView}>
            <Text>标题: </Text>
            <TextInput
              ref='title'
              autoFocus={true}
              placeholder={'请输入标题'}
              style={[styles.input,styles.titleInput]}
              />
          </View>
          <View style={styles.contentView}>
            <Text>内容: </Text>
            <TextInput
              ref='content'
              autoFocus={true}
              placeholder={'请输入内容'}
              multiline={true}
              style={[styles.input,styles.contentInput]}
              />
          </View>
          <Icon.Button onPress={()=>{CameraRoll.getPhotos({first: 25})}} name='md-camera' size={30} backgroundColor="#fff" color='#000' >选择照片</Icon.Button>
        </ScrollView>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  titleView: {

  },
  input: {
    fontSize: 14,
    borderWidth: tools.pixel,
    borderColor: '#ccc',
    borderRadius: 3,
    marginTop: 8,
    marginBottom:8,
    padding:5
  },
  titleInput:{
    height:30
  },
  contentInput:{
    height:200
  }
})


export default connect()(PostAdd);

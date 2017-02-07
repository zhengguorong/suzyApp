'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
  Alert
} from 'react-native';
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import tools from '../../util/tools'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';


class PostUpdate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {article} = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.props.addPostLoading} />
        <Header navigator={this.props.navigator} title={this.props.title} showBackBtn={true} rightPress={this._savePost.bind(this)} rightBtn={<Text>保存</Text>} />
        <ScrollView style={styles.container}>
          <View style={styles.titleView}>
            <Text>标题: </Text>
            <TextInput
              ref='title'
              autoFocus={false}
              placeholder={'请输入标题'}
              style={[styles.input, styles.titleInput]}
              onChangeText={(text) => { this.refs['title'].value = text } }
              defaultValue={article.title}
              />
          </View>

          <View style={styles.contentView}>
            <Text>内容: </Text>
            <TextInput
              ref='content'
              placeholder={'请输入内容'}
              multiline={true}
              onChangeText={(text) => { this.refs['content'].value = text } }
              style={[styles.input, styles.contentInput]}
              defaultValue={article.content}
              />
          </View>
          <Icon.Button style={{ paddingLeft: 0 }} onPress={this._selectedImg.bind(this)} name='md-camera' size={30} backgroundColor="#fff" color='#000' >选择照片</Icon.Button>
          {this.props.selectedSource ?
            <Image source={this.props.selectedSource} style={styles.uploadAvatar} /> :
            <Image source={{ uri: tools.domain + article.pic }} style={styles.uploadAvatar} />
          }
        </ScrollView>
      </View>
    )
  }
  _savePost() {
    const {selectedSource, updatePost} = this.props;
    const title = this.refs['title'].value || this.refs['title'].props.defaultValue
    const content = this.refs['content'].value || this.refs['content'].props.defaultValue
    const author = tools.author
    const fileData = selectedSource && selectedSource.uri
    const id = this.props.article._id
    if (!content) {
      Alert.alert('提示', '请输入内容')
      return
    }

    updatePost(id, title, content, author, fileData, ()=> {
      this.props.navigator.pop()
      this.props.getPostDetail(this.props.article._id)
    }, ()=> {
      Alert.alert('结果', '😯😯修改失败了')
    })
  }
  _selectedImg() {
    var options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从手机相册选择',
      maxWidth: '640',
      quality: 0.7,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else if (response.didCancel) {
      }
      else {
        // You can display the image using either data...
        const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = { uri: response && response.uri.replace('file://', ''), isStatic: true };
        } else {
          const source = { uri: response && response.uri, isStatic: true };
        }
        this.props.selectedImg(source)
      }
    })
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  titleView: {

  },
  input: {
    fontSize: 14,
    borderWidth: tools.pixel,
    borderColor: '#ccc',
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 8,
    padding: 5
  },
  titleInput: {
    height: 30
  },
  contentInput: {
    height: 120
  },
  uploadAvatar: {
    width: 200,
    height: 200
  }
})


export default connect(state => ({
  selectedSource: state.post.selectedImg,
  updatePostResult: state.post.updatePostResult || {},
  updatePostLoading: state.post.updatePostLoading || false,
  article: state.post.post && state.post.post.article || {},
}),
  (dispatch) => ({
    selectedImg: (source) => dispatch(postActions.selectedImg(source)),
    clearSelectedImg: () => dispatch(postActions.clearSelectedImg()),
    getPostDetail: (id) => dispatch(postActions.getPostDetail(id)),
    updatePost: (id, title, content, author, fileData, successCallback, failCallback) => dispatch(postActions.updatePost(id, title, content, author, fileData, successCallback, failCallback)),
    getPosts: (page, count) => dispatch(postActions.getPosts(page, count))
  }))(PostUpdate);

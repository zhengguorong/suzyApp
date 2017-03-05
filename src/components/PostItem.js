/**
 * 单篇文章
 */
import React, {Component} from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  WebView
} from 'react-native';
import tools from '../util/tools'
import * as config from '../util/config'
import Icon from 'react-native-vector-icons/Ionicons'


export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, itemPress, toCommentAdd,like,unLike } = this.props
    const pic = config.APP_BASE_DOMAIN + post.pic
    const createDate = new Date(parseInt(post.createTime));
    const createTime = createDate.getHours() + ':' + createDate.getMinutes()
    const content = post.content&&post.content.replace(/<br>/g, "\n")||''
    return (
      <View style={styles.container}>
        {post.pic?<TouchableOpacity onPress={itemPress}><Image defaultSource={require('../image/defaultImg.png')} style={styles.pic} source={{ uri: pic }} resizeMode={Image.resizeMode.cover}/></TouchableOpacity>:<View></View>}
        <View style={styles.authorView}><Text style={styles.authorFont}>{post.author} 发布</Text></View>
        <View style={styles.createDateView}><Text style={styles.createDateFont}>{post.displayTime} {createTime}</Text></View>
        <TouchableWithoutFeedback onPress={itemPress}><View style={styles.contentView}><Text style={styles.contentFont}>{content}</Text></View></TouchableWithoutFeedback>
        <View style={styles.statusView}>

            <Icon.Button onPress={toCommentAdd} name='md-text' backgroundColor="#fff" style={styles.commentIcon} color='rgb(128,124,124)' size={20}>
              <Text style={{paddingTop:-2}}>{post.commentCount}</Text>
            </Icon.Button>

          <TouchableOpacity>
            {post.like === 0 ? <Icon onPress={like} name='md-heart-outline' style={styles.heartIcon}  color='rgb(128,124,124)' size={20}/> : <Icon name='md-heart' onPress={unLike} style={styles.heartIcon}  color='red' size={20}/>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d7d9db',
    backgroundColor: '#fff'
  },
  pic: {
    width: tools.size.width - 32,
    height: 210,
  },
  authorView: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },
  authorFont: {
    color: '#adadad',
    fontSize: 12,

  },
  createDateView: {
    alignItems: 'flex-end',
    marginBottom: 10
  },
  createDateFont: {
    fontSize: 13,
    color: '#adadad'
  },
  contentView: {
    padding: 10
  },
  contentFont: {
    lineHeight: 20,
    fontSize: 14
  },
  statusView: {
    flexDirection: 'row-reverse',
  },
  heartIcon: {
    width: 40,
    padding: 10,
  },
  commentIcon: {
    width: 50,
    padding: 10
  }
});

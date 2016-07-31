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
import Icon from 'react-native-vector-icons/Ionicons'


export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, itemPress, toCommentAdd } = this.props
    const pic = tools.domain + post.pic
    const createDate = new Date(parseInt(post.createTime));
    const createTime = createDate.getHours() + ':' + createDate.getMinutes()
    const content = post.content.replace(/<br>/g, "\n")
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={itemPress}><Image style={styles.pic} source={{ uri: pic }} resizeMode={Image.resizeMode.cover}/></TouchableOpacity>
        <View style={styles.authorView}><Text style={styles.authorFont}>{post.author} 发布</Text></View>
        <View style={styles.createDateView}><Text style={styles.createDateFont}>{post.displayTime} {createTime}</Text></View>
        <TouchableWithoutFeedback onPress={itemPress}><View style={styles.contentView}><Text style={styles.contentFont}>{content}</Text></View></TouchableWithoutFeedback>
        <View style={styles.statusView}>
          <TouchableOpacity onPress={toCommentAdd}><Icon name='md-text' backgroundColor="#fff" style={styles.commentIcon} color='rgb(128,124,124)' size={20} /></TouchableOpacity>

          <TouchableOpacity>
            {post.like===0?<Icon name='md-heart' style={styles.heartIcon}  color='rgb(128,124,124)' size={20}></Icon>:<Icon name='md-heart' style={styles.heartIcon}  color='red' size={20}></Icon>}
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
    width: 40,
    padding: 10
  }
});

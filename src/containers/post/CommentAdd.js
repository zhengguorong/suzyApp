'use strict';

import React, { Component } from 'react'
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import {bindActionCreators} from 'redux'
import * as postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import tools from '../../util/tools'
import Header from '../../components/Header'


class CommentAdd extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.addCommnetResult === 'success') {
            Alert.alert('结果',"添加成功",[{text:'返回',onPress:()=>{ this.props.navigator.pop()}}])
        }else if(this.props.addCommnetResult === 'fail'){
            Alert.alert('结果','添加失败')
        }
    }

    render() {
        return (
            <View>
                <Header navigator={this.props.navigator} title={this.props.title} showBackBtn={true} rightPress={this._saveComment.bind(this) } rightBtn={<Text>发送</Text>}/>
                <View>
                    <TextInput
                        ref='commentText'
                        style={styles.textInput}
                        autoFocus={true}
                        multiline={true}
                        placeholder={'请输入评论内容'}
                        onChangeText={(text) => { this.refs['commentText'].value = text } }
                        />
                </View>
            </View>
        )
    }
    _saveComment() {
        const {addComment} = this.props
        const text = this.refs['commentText'].value
        if (!text) {
            Alert.alert('提示','请输入内容')
            return
        }
        const itemId = this.props.itemId
        addComment(itemId, 'rong', text)
    }

}
const styles = StyleSheet.create({
    textInput: {
        borderWidth: 0,
        height: 200,
        padding: 10,
        fontSize: 14
    }
})


export default connect(state => ({ addCommnetResult: state.post.addCommnetResult || {} }),
    (dispatch) => ({
        addComment: (itemId, author, text) => dispatch(postActions.addComment(itemId, author, text)),
    }))(CommentAdd);

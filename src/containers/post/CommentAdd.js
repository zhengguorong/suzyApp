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

    }

    render() {
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
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
        const content = this.refs['commentText'].value
        if (!content) {
            Alert.alert('提示','请输入内容')
            return
        }
        const pId = this.props.itemId
        const author = tools.author
        addComment({pId, author, content}, ()=>{
            this.props.navigator.pop()
        })
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


export default connect(state => ({}),
    (dispatch) => ({
        addComment: ({pId, author, content}, cb) => dispatch(postActions.addComment({pId, author, content}, cb)),
    }))(CommentAdd);

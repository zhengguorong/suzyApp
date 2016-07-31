'use strict';

import React, { Component } from 'react'
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
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

    render() {
        const {commentText} = this.props;
        return (
            <View>
                <Header title={'添加留言'} navigator={this.props.navigator}/>
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
    _saveComment(text) {
        if(!text){
            alert("请输入内容")
            return
        }
        const itemId = this.props.itemId
        postActions.addComment(itemId,'rong',this.refs['commentText'].text)
    }

}
const styles = StyleSheet.create({
    textInput:{
        borderWidth:0,
        height:200,
        padding:10,
        fontSize:14
    }
})


export default connect()(CommentAdd);

import React, { Component } from 'react'
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView
} from 'react-native';
import { connect } from 'react-redux'
import * as postActions from '../../actions/postActions'
import tools from '../../util/tools'
import Header from '../../components/Header'
import CommentList from '../../components/CommentList'

class PostDetail extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {getPostDetail} = this.props;
        getPostDetail(this.props.itemId)
    }

    render() {
        const {article,replies} = this.props
        const pic = tools.domain + article.pic
        const content = article.content && article.content.replace(/<br>/g, "\n")
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title={this.props.title}/>
                <ScrollView style={styles.scrollView} contentInset={{ bottom: 55 }}>
                    <Image source={{ uri: pic }} style={styles.pic} resizeMode={Image.resizeMode.cover}/>
                    <View style={styles.contentView}><Text style={styles.contentFont}>{content}</Text></View>
                    <CommentList data={replies}/>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView:{
        // padding:15,
    },
    pic: {
        width: tools.size.width - 32,
        height: 250,
        margin:15
    },
    contentView: {
        padding: 25
    },
    contentFont: {
        lineHeight: 20,
        fontSize: 14
    },
})
export default connect(state => ({
    article: state.post.post && state.post.post.article || {},
    replies: state.post.post && state.post.post.replies || []
}),
    (dispatch) => ({
        getPostDetail: (id) => dispatch(postActions.getPostDetail(id)),
    })
)(PostDetail);
'use strict';

import React, { Component } from 'react'
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ListView
} from 'react-native';
import {bindActionCreators} from 'redux'
import tools from '../util/tools'


export default class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows(this.props.data || [])
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleFont}>评论 {this.props.data.length}</Text>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={this._renderRow.bind(this) }
                    enableEmptySections={true}
                    />
            </View>
        )
    }
    _renderRow(row) {
        console.log('row', row);
        const date = new Date(parseInt(row.createTime))
        const displayTime = date.getHours() + ':' + date.getMinutes()
        return (
            <View style={styles.itemContainer}>
                <View style={styles.authorView}>
                    <View style={{ justifyContent: 'center' }}>
                        {row.author == 'rong' ?
                            <Image style={styles.icon} source={require('../image/rong.png') }/> :
                            <Image style={styles.icon} source={require('../image/zhi.png') }/>
                        }

                    </View>
                    <View style={styles.createInfoView}>
                        <Text style={styles.authorFont}>{row.author}</Text>
                        <Text style={styles.createDate}>{row.displayTime} {displayTime}</Text>
                    </View>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentFont}>{row.content}</Text>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleView: {
        height: 40,
        backgroundColor: '#fcfcfc',
        borderTopWidth: tools.pixel,
        borderBottomWidth: tools.pixel,
        borderColor: '#d5d5d5',
        justifyContent: 'center',
        paddingLeft: 25
    },
    titleFont: {
        color: '#d96e5d',
        fontSize: 14
    },
    itemContainer: {
        borderColor: '#d5d5d5',
        borderBottomWidth: tools.pixel,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 35
    },
    authorView: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    createInfoView: {
        marginLeft: 15
    },
    authorFont: {
        fontSize: 15,
        color: '#2f2f2f',
        marginBottom: 5
    },
    createDate: {
        fontSize: 12,
        color: '#8c8c8c'
    },
    contentView: {
        paddingBottom: 30,
        paddingTop: 20,
    },
    contentFont: {
        color: '#555555',
        fontSize: 15,
        lineHeight: 23,
    }
})


import React, {Component} from 'react'
import {StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, rightBtn, rightPress, showBackBtn } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._pop.bind(this) }>
            <View style={styles.leftBtn}>
              {showBackBtn?<Icon name='md-arrow-back' size={30}/>:<View></View>}
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={rightPress}>
            <View style={styles.rightBtn}>
              {rightBtn}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
      </View>
    )
  }
  _pop() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    height: 65,
    backgroundColor: '#fefefe'
  },
  title: {
    color: '#4e5c6c',
    fontSize: 20,
    fontWeight: '700'
  },
  line: {
    height: 1,
    backgroundColor: '#afb0b2'
  },
  leftBtn: {
    marginLeft: 10,
    width: 60
  },
  rightBtn: {
    marginRight: 10,
    width: 60,
    alignItems: 'flex-end'
  }
});


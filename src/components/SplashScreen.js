import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image} from 'react-native'
import Animated from 'Animated'
import tools from '../util/tools'

export default class SplashScreen extends Component {
    componentDidMount() {

    }
    render() {
        const scale=new Animated.Value(1)
        Animated.timing(
            scale,
            {
                toValue: 1.3,
                duration: 5000,
            }
        ).start();
        const {text, img} = this.props.cover
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={{ uri: img }}
                    style={{
                        flex: 1,
                        width: tools.size.width,
                        height: 1,
                        transform: [
                            { scale: scale },
                        ]
                    }} />
                <Text style={styles.text}>
                    {text}
                </Text>
                <Image style={styles.logo} source={require('../image/suzyLogo.png') } />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#000'
    },
    cover: {
        flex: 1,
        width: 200,
        height: 1,
    },
    logo: {
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        bottom: 70,
        height: 54,
        backgroundColor: 'transparent',
    },
    text: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        backgroundColor: 'transparent',
    }
})
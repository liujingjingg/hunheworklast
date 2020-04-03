import React, { Component } from 'react'
import { Text, View, StyleSheet,Image,AsyncStorage,TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
export default class SwiperPage extends Component {
    start=()=>{
        AsyncStorage.setItem('install','true',()=>{
            console.log('setItem end')
            this.props.afterInstall();
        });
       
    }
    render() {
        return (
                <Swiper showsButtons={false}>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../image/timg.png')} />
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../image/timg1.png')} />
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../image/timg2.png')} />
                        <TouchableOpacity onPress={this.start}  style={styles.start}>
                            <Text style={styles.text}>开始体验</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
        )
    }
}

const styles=StyleSheet.create({
    slide1:{
        flex:1,
        height:'100%',
        alignItems:'center'
    },
    start:{
        position:'absolute',
        bottom:100,
        width:100,
        height:35,
        backgroundColor:'red',
        textAlignVertical:'center',
        borderRadius:20,
        color:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:'100%',
        height:'100%'
    },
    text:{
        color:'#fff',
        fontSize:15
    }
})
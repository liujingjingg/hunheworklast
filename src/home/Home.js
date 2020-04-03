import React, { Component } from 'react'
import {View,Text,StyleSheet,
    StatusBar,
    TextInput,Image,ScrollView,Dimensions,FlatList} from 'react-native';
import {Icon} from '@ant-design/react-native'
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
const {width}=Dimensions.get('window');
const data=[
    {img:require('../../image/h1.png'),title:'居家维修保养'},
    {img:require('../../image/h2.png'),title:'住宿优惠'},
    {img:require('../../image/h3.png'),title:'出行接送'},
    {img:require('../../image/h4.png'),title:'E族活动'}
]
export default class First extends Component {
    render() {
        return (
            <View>
                {/* 状态栏 */}
                {/* <StatusBar backgroundColor="red"/> */}
                {/* 背景色是属性 */}
                <ScrollView>
                    {/* 导航栏 */}
                    <View style={styles.topb}>
                        <View style={styles.tops}>
                            <Icon style={styles.topi} name="search"/>
                            <TextInput style={{color:"#fff",padding:0}} placeholder='请输入您要搜索的关键字'/>
                        </View>
                        <Image style={styles.car} source={require("../../image/gouwucar.png")}/>
                    </View>
                    {/* 轮播图 */}
                    <Swiper style={styles.lunbo} autoplay>
                        <Image style={styles.luni} source={require('../../image/lunbo.png')}/>
                        <Image style={styles.luni} source={require('../../image/lunbo.png')}/>
                        <Image style={styles.luni} source={require('../../image/lunbo.png')}/>
                    </Swiper>
                    {/* 内容部分 */}
                    <FlatList
                        numColumns={1}
                        data={data}
                        renderItem={({item})=>
                            <View style={styles.data1}>
                                <Image style={styles.img} source={item.img}/>
                                <Text style={styles.text}>{item.title}</Text>
                            </View>
                        }
                    />  
                    {/* 需求按钮 */}
                    <Button style={styles.btn}>发布需求</Button>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    topb:{
        height:50,
        backgroundColor:'#f23030',
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row'
    },
    tops:{
        height:30,
        width:'75%',
        backgroundColor:'#fbb8b8',
        color:'white',
        flexDirection:'row',
        borderRadius:20
    },
    topi:{
        marginLeft:20,
        marginTop:4,
        width:25,
        height:25, 
        color:'#fff'
    },
    car:{
        paddingRight:10,
        height:25,
        width:25
    },
    lunbo:{
        height:220,
        width:width
    },
    luni:{
        width:width,
        height:220
    },
    data1:{
        flexDirection:'row',
        width:width,
        backgroundColor:'#fff',
        alignItems:'center',
        marginTop:4,
        height:100
    },
    img:{
        marginLeft:20,
        height:80,
        width:80
    },
    text:{
        marginLeft:20,
        fontSize:20,
        color:'gray'
    },
    btn:{
        height:40,
        width:width*0.8,
        backgroundColor:'red',
        color:'#fff',
        marginLeft:50,
        marginTop:20,
        textAlignVertical:'center',
        borderRadius:10
    }
})
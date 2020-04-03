import React, { Component } from 'react'
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import {View,AsyncStorage,TouchableOpacity, Text,StyleSheet,Image,FlatList,ScrollView,Button}from 'react-native';
const myself=[
    {img:require('../../image/1.png'),name:'账户管理'},
    {img:require('../../image/2.png'),name:'收货地址'},
    {img:require('../../image/3.png'),name:'我的信息'},
    {img:require('../../image/4.png'),name:'我的订单'},
    {img:require('../../image/5.png'),name:'我的二维码'},
    {img:require('../../image/6.png'),name:'我的积分'},
    {img:require('../../image/7.png'),name:'我的收藏'},
]
const ezu=[
    {img:require('../../image/e1.png'),name:'居家维修保养'},
    {img:require('../../image/e2.png'),name:'出行接送'},
    {img:require('../../image/e3.png'),name:'我的受赠人'},
    {img:require('../../image/e4.png'),name:'我的住宿优惠'},
    {img:require('../../image/e5.png'),name:'我的活动'},
    {img:require('../../image/e6.png'),name:'我的发布'},  
]
export default class Myself extends Component {
    constructor() {
        super();
        this.state = {
          photo: ''
        };
      }
      componentWillMount() {
        AsyncStorage.getItem('img').then(res => {
          if (JSON.parse(res) != null) {
            this.setState({
              photo: JSON.parse(res),
            });
          } else {
            this.setState({photo: require('../../image/topb.png')});
          }
        });
      }
      takephoto = () => {
        ImagePicker.showImagePicker(response => {
          if (response.didCancel) {
            return;
          } else if (response.error) {
            console.log('Error:', response.error);
          } else if (response.customButton) {
            console.log('custom:', response.customButton);
          } else {
            const source = {uri: response.uri};
            AsyncStorage.setItem('img', JSON.stringify(source)).then(res => {
            });
            this.setState({
              photo: source,
            });
          }
        });
      };
    render() {
        return (
            <View>
                <ScrollView>
                {/* 头部红色背景区域 */}
                    <View style={styles.topb}>
                        <TouchableOpacity
                            onPress={() => {
                            this.takephoto();
                        }}>
                            <Image style={styles.topimg} source={this.state.photo}/>
                        </TouchableOpacity>
                        <Text style={styles.toptext}>BINNU DHILLON</Text>
                    </View>
                    {/* 我的个人中心标题部分 */}
                    <View style={styles.geren}>
                        <Image style={styles.gereni} source={require('../../image/geren.png')}/>
                        <Text style={styles.gerent}>我的个人中心</Text>
                    </View>
                    {/* 我的个人中心内容部分 */}
                    <View style={styles.gerenc}>
                        {/* <FlatList
                            numColumns={3}
                            data={myself}
                            renderItem={({ item }) => 
                                <View style={styles.gerenv}>
                                    <Image style={styles.gerenimg} source={item.img} />
                                    <Text style={styles.gerentext}>{item.name}</Text>
                                </View>}
                            /> */}
                             {
                                myself.map((item)=>{
                                        return  <View style={styles.gerenv} >
                                                <Image style={styles.gerenimg} source={item.img} />
                                                <Text style={styles.gerentext}>{item.name}</Text>
                                                </View>
                                        })
                                
                            }
                    </View>
                    {/* E族活动标题部分 */}
                    <View style={styles.geren}>
                        <Image style={styles.gereni} source={require('../../image/e.png')}/>
                        <Text style={styles.gerent}>E族活动</Text>
                    </View>
                    {/* E族活动内容部分 */}
                    <View style={styles.ev}>
                            {
                                ezu.map((item,index)=>{
                                    if(index==5){
                                        return <TouchableOpacity onPress={()=>Actions.myrelease()}>
                                        <View style={styles.ec}>
                                            <Image style={styles.gerenimg} source={item.img} />
                                            <Text style={styles.gerentext}>{item.name}</Text>
                                        </View>
                                        </TouchableOpacity>
                                    }else{
                                        return  <View style={styles.ec2} >
                                                <Image style={styles.gerenimg} source={item.img} />
                                                <Text style={styles.gerentext}>{item.name}</Text>
                                                </View>
                                            }
                                        })
                                
                            }
                    </View>
                    {/* 我的发布 */}
                    {/* 退出部分 */}
                    <TouchableOpacity 
                        onPress={()=>{
                            AsyncStorage.removeItem('user')
                            Actions.login()
                        }}
                        >
                        <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:15,
                        height:50
                        }}> 
                        <Text style={{fontSize:17,color:'#767676'}}>BINNU DHILLON 退出</Text>
                        </View>
                        </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    topb:{
        backgroundColor:'#f23030',
        height:230,
    },
    topimg:{
       height:100,
       width:100,
       marginLeft:'38%',
       marginTop:20,
       borderRadius:50
    },
    toptext:{
        fontSize:24,
        marginLeft:'30%',
        color:'#fff',
        marginTop:20
    },
    geren:{
        flexDirection:'row',
        height:55,
        backgroundColor:'#fff',
        borderBottomColor:'gray'
    },
    gerent:{
        fontSize:18,
        color:'#4f4e4e',
        marginTop:17,
        marginLeft:'2%'
    },
    gereni:{
        marginLeft:'3%',
        marginTop:10
    },
    gerenc:{
        flexDirection:'row',
        flexWrap:"wrap",
        height:300,
        marginTop:2,
        backgroundColor:'#fff',
        borderBottomColor:'#eeeeee',
        borderBottomWidth:5,
        justifyContent:'flex-start',
        paddingLeft:'10%'
    },
    gerenv:{
        width:'33%',
        height:93,
        marginTop:5,
        alignItems:'stretch'
    },
    gerenimg:{
        marginLeft:"10%",
        marginTop:10
    },
    gerentext:{
        fontSize:17,
        color:'gray',
        marginTop:5
    },
    ev:{
        height:240,
        flexDirection:'row',
        flexWrap:"wrap",
        backgroundColor:'#fff',
        justifyContent:'space-around',
        borderTopColor:'#eeeeee',
        borderTopWidth:1
    },
    ec:{
        width:"100%",
        height:120,
        marginTop:4,
        paddingRight:'12%',    
        justifyContent:'center',
        alignItems:'center'
    },
    ec2:{
        width:'33%',
        height:120,
        justifyContent:'center',
        alignItems:'center'
    }
})
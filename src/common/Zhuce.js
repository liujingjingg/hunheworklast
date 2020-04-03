import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TextInput,AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils/index'
export default class Zhuce extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            pwd1:'',
            pwd2:'',
            zhuce:false
        }
    }
    username=(text)=>{
        // console.log(text)
        this.setState({username:text})
    }
    pwd1=(text)=>{
        // console.log(text)
        this.setState({pwd1:text})
    }
    pwd2=(text)=>{
        // console.log(text)
        this.setState({pwd2:text})
    }
    zhuce=()=>{
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        if(this.state.username=="" || this.state.pwd1==''|| this.state.pwd2==''){
            Alert.alert('不能为空')   
        }
        else{
            if(this.state.pwd1!=this.state.pwd2){
                Alert.alert('密码不一致');
            }
            else{
                this.setState({loading:true})
                myFetch.post('/zhuce',{
                    username:this.state.username,
                    pwd1:this.state.pwd1}
                ).then(res=>{
                    if(res.data.code=='1'){
                        Alert.alert('账户已存在');
                    }else if(res.data.code=='2'){
                        Alert.alert('连接失败')
                    }else{
                        AsyncStorage.setItem('user',JSON.stringify(res.data))
                                .then(()=>{
                                // console.log(res)
                                    this.setState({zhuce:false})
                                    Actions.login();
                                })
                    }
                })
            }
        }
    }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入用户名"
                onChangeText={this.username}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入密码" 
            secureTextEntry={true}//保密文本输入
            onChangeText={this.pwd1}/>
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请再次输入密码" 
            secureTextEntry={true}//保密文本输入
            onChangeText={this.pwd2}/>
          </View>
            <TouchableOpacity 
                style={{
                    width: '40%',
                    height: 40,
                    backgroundColor: 'red',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius:10
                }}
                onPress={this.zhuce}>
                <Text style={{color:"#fff"}}>确认</Text>
                {/* <Text>注册</Text> */}
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: '40%',
                    height: 40,
                    backgroundColor: 'red',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:20,
                    borderRadius:10
                }}
                onPress={Actions.pop}
              >
                <Text style={{color:"#fff"}}>返回</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.loading?<View>
              <Text style={{marginLeft:210,marginTop:20,fontSize:17}}>loading...</Text></View>:null
        }
      </View>
    );
  }
}

import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TextInput,AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils/index'
export default class Login extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            pwd:'',
            loading:false
        }
    }
    username=(text)=>{
        // console.log(text)
        this.setState({username:text})
    }
    pwd=(text)=>{
        // console.log(text)
        this.setState({pwd:text})
    }
    login=()=>{
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        if(this.state.username=='' || this.state.pwd==""){
          Alert.alert('用户名或密码不能为空')
        }else{
            this.setState({loading:true})
            myFetch.post('./login',{
              username:this.state.username,
              pwd:this.state.pwd
          }).then(res=>{
              //根据返回状态进行判断,正确时跳转首页
              //if(res){}   
              AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                      this.setState({loading:false});
                      Actions.homepage();
                    })
          })
      }
    }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}
      >
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
            <TextInput placeholder="用户名"
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
            <TextInput placeholder="密码" 
            secureTextEntry={true}//保密文本输入
            onChangeText={this.pwd}/>
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
                onPress={this.login}>
                <Text style={{color:"#fff"}}>登录</Text>
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
                onPress={Actions.zhuce}
              >
                <Text style={{color:"#fff"}}>注册</Text>
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

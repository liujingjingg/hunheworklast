import React, { Component } from 'react'
import { Text, View, StyleSheet,ToastAndroid} from 'react-native'
import {Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
export default class MyRelease extends Component {
    constructor(){
        super();
        this.state = {
            titles: [],
            page: 1
          };
    }
    componentDidMount() {
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page=' + this.state.page)
          .then(res => res.json())
          .then(res => {
            this.setState({titles: res.data});
          });
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
          fetch(
            'https://cnodejs.org/api/v1/topics?limit=15&page=' + this.state.page,
          )
            .then(res => res.json())
            .then(res => {
              this.setState({titles: res.data});
            });
        }
      }
      left = () => {
        this.setState({
          page: this.state.page - 1,
        });
      };
      right= () => {
        this.setState({
          page: this.state.page + 1,
        });
      };
      answer= () => {
        let answer = parseInt(Math.random() * 2);
        if (answer == 1) {
          return <Text style={{color: 'red'}}>已回复</Text>;
        } else {
          return <Text style={{color:'gray'}}>待回复</Text>;
        }
      };
    render() {
        return (
            <View style={{backgroundColor:'#fff'}}>
                {/*头部 */}
                <View style={{height:45,backgroundColor:'red',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Icon name="left-circle" color="#fff" style={{paddingLeft:10}}
                        onPress={()=>{Actions.pop()}}
                    />
                    <Text style={{color:'#fff',fontSize:17}}>我的发布</Text>
                    <Icon name="message" color="#fff" style={{paddingRight:10}}/>
                </View>
                {/* 内容部分 */}
                <View>
                    {
                        this.state.titles.map(item=>(
                            <View style={styles.connect}>
                                {/* 文章题目 */}
                                <Text style={{fontSize:16,paddingLeft:'3%',width:'59%'}}>
                                    {
                                    item.title.length>15?item.title.substr(0,15)+'...':item.title
                                    }
                                </Text>
                                {/* 时间 */}
                                <Text style={{fontSize: 16, width: 120}}>
                                    {item.create_at.substr(0,  10)}
                                </Text>
                                {/* 回复事件 */}
                                {this.answer()}
                            </View>
                        ))
                    }
                </View>
                {/* 跳转页面 */}
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',marginTop:20}}>
                    <Text
                        style={styles.button}
                        onPress={() => {
                        if (this.state.page > 1) {
                            this.left();
                        } else {
                            ToastAndroid.show('当前已处于第一页', ToastAndroid.SHORT);
                        }
                        }}>
                        上一页
                    </Text>
                    <Text style={{fontSize:17}}>第{this.state.page}页</Text>
                    <Text style={styles.button} onPress={() => {this.right();}}>
                        下一页
                    </Text>
          </View>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    connect:{
        height:40,
        flexDirection:'row',
        alignItems:'center'
    },
    button:{
        width:80,
        fontSize:17,
        paddingLeft:10,
        lineHeight:30,
        height:30,
        backgroundColor:'red',
        borderRadius:15,
        color:'#fff'
    }
})
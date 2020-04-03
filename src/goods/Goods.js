import React ,{Component} from 'react';
import {StyleSheet,View,Text, Image,ScrollView,TextInput ,FlatList,Dimensions} from 'react-native';
import {Icon} from '@ant-design/react-native'
const {width} =Dimensions.get('window')
const listContext = [
    { img: require('../../image/shang.png'), context: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳' ,money: '36.00'},
    { img: require('../../image/hao.png'), context: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳' ,money: '36.00' },
    { img: require('../../image/shang.png'), context: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳' ,money: '36.00'},
    { img: require('../../image/hao.png'), context: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳' ,money: '36.00' },
    { img: require('../../image/shang.png'), context: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳' ,money: '36.00'},
    { img: require('../../image/hao.png'), context: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳' ,money: '36.00' },
]  
export default class Store extends Component {
    render() {
        return (
            <View>
                <ScrollView style={{backgroundColor:'#f4f4f4'}}>
                    <View  style={styles.top}>
                        <View style={styles.topc}>
                            <TextInput placeholder='请输入商品名称'/>
                            <Icon style={styles.ic} name="search"/>
                        </View>
                    </View> 
                    <View style={styles.list}>  
                        {
                            ["综合", "销量", "新品", "价格", "信用"].map((item) => <Text style={styles.list1}>{item}</Text>)
                        }
                    </View>
                    <View>
                        <FlatList
                            numColumns={2}
                            data={listContext}
                            renderItem={({ item }) => <View style={styles.listc}>
                                <Image style={styles.img} source={item.img} />
                                <Text  style={styles.context}>{item.context}</Text>
                                <Text style={styles.money}>{item.money}</Text>
                            </View>}
                        />
                    </View>
                </ScrollView>
       </View>
        )
    }
}


const styles = StyleSheet.create({
	topc:{
		width:'80%',
		height:40,
		backgroundColor:'#eee',
		marginRight:10,
		paddingLeft:20,
		flexDirection:'row',
		marginTop:10
	},
	top:{
		flexDirection:'row',
        justifyContent:'center',
		height:60,
		backgroundColor:'#fff'
	},
	ic:{
		color:'gray',
		textAlignVertical:'center',
		paddingLeft:200
	},
	list:{
		height:60,
		backgroundColor:'#fff',
		flexDirection:'row',
		marginTop:5
	},
	list1:{
		textAlignVertical:'center',
		fontSize:16,
		marginLeft:'11%'
	},
	img:{
		width:width*0.47,
		height:250
	},
	listc:{
		width:width*0.47,
		marginLeft:10,
		height:330,
		backgroundColor:'#fff',
		marginTop:10
	},
	context:{
		fontSize:16,
		color:'gray'
	},
	money:{
		color:'red',
		fontSize:16,
		marginTop:5
	}
});
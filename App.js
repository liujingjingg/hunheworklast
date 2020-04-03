import React,{useEffect,useState} from 'react';
import {StyleSheet,Text,StatusBar,View,AsyncStorage,BackHandler,ToastAndroid} from 'react-native';
import {Router,Scene, Tabs,Drawer,Lightbox,Modal,Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Userinfor from './src/userinfor/Userinfor';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';  
import MyRelease from './components/MyRelease';
import Zhuce from './src/common/Zhuce'
console.disableYellowBox=true;
 
const styles = StyleSheet.create({ 

});

const App = () => {
	let [isLogin,setLogin]=useState(false);
	let [isInstall,setInstall]=useState(true);
	let now = 0;
	const init=()=>{
		AsyncStorage.getItem('install') 
			.then(res=>{
				console.log('install',res)
				if(res){
					setInstall(false)
				}
			})
		AsyncStorage.getItem('user')
			.then(res=>{
				let user=JSON.parse(res)
				if(!user){
					SplashScreen.hide();
				}
				if(user && user.token){
					setLogin(true);	
					SplashScreen.hide();	
				}  
				console.log(res)
			})
	}
	useEffect(()=>{
		// AsyncStorage.clear()
		init()
	},[])
	let afterInstall=()=>{
		setInstall(false)
		console.log('after end')
	} 
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
	return (
		<Router
			backAndroidHandler={()=>{
				if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
			}}
		>
			<Modal key="modal" hideNavBar>
				<Lightbox key="lightbox">
					<Drawer 
								key="drawer"
								contentComponent={()=><Text>drawer</Text>}
								drawerIcon={()=><Icon name="menu"/>}
								drawerWidth={400}
							>
						<Scene key="root">
						<Tabs 
							key='tabbar'
							hideNavBar
							activeTintColor="red"
							inactiveTintColor="gray"							tabBarStyle={{backgroundColor:'#ccc'}}
							>						
							{/*首页*/}
							<Scene 
								key='homepage'
								hideNavBar
								icon={({focused})=>
									<Icon 
										color={focused?'red':'gray'} 
										name='home'
									/>}
								title="首页"
								>	
								<Scene key="home" component={Home}></Scene>
							</Scene>	
							{/*商品分类*/}
							<Scene 
								key='goods'
								hideNavBar
								icon={({focused})=>
									<Icon 
										color={focused?'red':'gray'} 
										name='appstore'
									/>}
								title="商品分类"
								component={Goods}
								/>					
							{/* 个人中心*/}
							<Scene 
								key='userPage'
								hideNavBar  
								icon={({focused})=>
									<Icon 
										color={focused?'red':'gray'} 
										name='user'
									/>}
								title="个人中心">			
								<Scene key="user" component={Userinfor}/>
								<Scene key="myrelease" component={MyRelease}/>	 
							</Scene>					
						</Tabs>
					</Scene>
					</Drawer>
				</Lightbox>
				<Scene initial={!isLogin} key="login" component={Login}
					 backAndroidHandler={()=>{
				  			BackHandler.exitApp();	
					}
				}
				></Scene>
				<Scene key='zhuce' component={Zhuce}/>
			</Modal>
		</Router>
	);
};


export default App;
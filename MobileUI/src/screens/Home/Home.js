import React, { useEffect,useState } from 'react';
import {Text, View,TouchableOpacity,BackHandler,Alert} from 'react-native';
import {styles} from './Home.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
// import {API_URL} from "../../constants";
import {CreateTrip} from '../CreateTrip/CreateTrip';
import {ConfirmTrip} from '../ConfirmTrip/ConfirmTrip';
import  Header  from '../../components/Header/Header';
import { getAsyncStorage } from '../../Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const Tab = createMaterialTopTabNavigator();

export default function Home({navigation}) {
  const [user,setUser] =useState('');
  const [idUser,setIdUser] =useState(0);
  useEffect(() => {
    getData();
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
}, []);

const getData = async() => {
  try {
      const data = await getAsyncStorage('token')
      if(data) {
        const decode =jwt_decode(data);
        if(decode){setUser(decode.user.HoTen);setIdUser(decode.user.IDNguoiDung)}
      }
  } catch (error) {
      console.log(error);
  }
}
  
  const onLogout=async()=>{
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error,'logout');
    }
   
  }

  return (
    <>
      <Header />
        <Tab.Navigator
        // tabBarOp
          screenOptions={{
            tabBarStyle:{height:50},
            tabBarIconStyle:{height:20,marginTop:-10},
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor:'gray',
            tabBarIndicatorStyle:{
              // backgroundColor:'#0097d0',
              backgroundColor:'#23577C',
              height:'100%',
            },
          }}
          >
          <Tab.Screen
            name="Tạo Chuyến"
            // component={CreateTrip}
            children={()=><CreateTrip idUser ={idUser}/>}
            options={{
              tabBarLabel:'TẠO CHUYẾN',
              tabBarIcon:({color,size})=>(
                <Icon name="add-circle-outline" size={20}  color={color} />
              )         
            }}
          />

          <Tab.Screen
            name="Xác nhận chuyến"
            // component={ConfirmTrip}
            children={()=><ConfirmTrip idUser ={idUser}/>}
            options={{
              tabBarLabel:'XÁC NHẬN CHUYẾN',
              tabBarIcon:({color,size})=>(<Icon name="checkmark-circle-outline" size={20} color={color} />)
            }}
          />
        </Tab.Navigator>
        <View style={{flexDirection:'row',}}>
        <TouchableOpacity style={styles.BtnLogin} onPress={onLogout}>
        <Text style={styles.BtnText}>Đăng Xuất</Text>
      </TouchableOpacity>
      <Text style={{marginRight:10,flex:2,textAlign:'right',fontWeight:'bold',textAlignVertical:'bottom'}}>{user}</Text>
      </View>
    </>
  );
}

import React, {useState,useEffect} from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert
} from 'react-native';
import {styles} from './Login.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { postLogin } from '../../Api';
import { getAsyncStorage,setAsyncStorage } from '../../Utils';

function Login({navigation}) {
  const [showPass, setShowPass] = useState(true);
  const [press, setPress] = useState(false);
  const [user,setUser] =useState('');
  const [password,setPassword] =useState('');

  useEffect(() => {
    getData();
}, []);

const getData = async() => {
  try {
      const data = await getAsyncStorage('token');
      if(data) {navigation.navigate('Home')}
  } catch (error) {
      console.log(error);
  }
}

  const onShowPass = async() => {
    // const item =await AsyncStorage.getItem('token')
    if (press == false) {
      setPress(true);
      setShowPass(false);
    } else {
      setShowPass(true);
      setPress(false);
    }
  };
  const onLogin = async() => {
    const body ={
      username:user,
      password:password
    }
    // console.log(body);
    try {
      const {data} = await postLogin(body);
      if(data){setAsyncStorage("token",data.token);navigation.navigate('Home');}
    } catch (error) {
      if(error) Alert.alert("Kiểm tra lại tài khoản hoặc mật khẩu");
    }
    
  };

  return (
    <ImageBackground source={require('../../assets/images/BACKGROUNDfinal.png')} style={{width:'100%',height:'100%'}}>
    <View style={styles.BgContainer}>
      <View style={styles.LogoContainer}>
        <Image
          source={require('../../assets/images/logoHP.png')}
          style={styles.logo}></Image>
      </View>
      <View style={styles.inputsContainer}>
        <Icon
          name="person-circle-outline"
          size={25}
          style={styles.inputsIcon}
        />
        <TextInput
          placeholder={'Mã Nhân Viên'}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid="transparent"
          style={styles.inputs}
          onChangeText={setUser}
          value={user}
        />
      </View>
      <View style={styles.inputsContainer}>
        <Icon name="lock-closed-outline" size={25} style={styles.inputsIcon} />
        <TextInput
          placeholder={'Password'}
          secureTextEntry={showPass}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid="transparent"
          style={styles.inputs}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={onShowPass}>
          <Icon
            name={press ? 'eye-outline' : 'eye-off-outline'}
            size={26}
            color={'rgba(255,255,255,0.7)'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.BtnLogin} onPress={onLogin}>
        <Text style={styles.BtnText}>Đăng Nhập</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
}

export default Login;

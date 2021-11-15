import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {styles} from './Header.Styles';
import logo from '../../assets/images/Logo.png';
// import Picker from '@react-native-picker/picker';
// import DatePicker from 'react-native-date-picker'

export default function Header() {
    const [selectedLanguage, setSelectedLanguage] = React.useState();
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.img}></Image>
      <Text style={styles.tx}>CÔNG TY CỔ PHẦN THÉP HÒA PHÁT DUNG QUẤT</Text>
      {/* <DatePicker
        // modal
        // open={open}
        // date={date}
        // onConfirm={(date) => {
        //   setOpen(false)
        //   setDate(date)
        // }}
        // onCancel={() => {
        //   setOpen(false)
        // }}
      /> */}
    </View>
  );
}

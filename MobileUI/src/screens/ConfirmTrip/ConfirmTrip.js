import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getBai,
  getXe,
  getNhaThau,
  getChuyenXeID,
  UpdateChuyenXeID,
} from '../../Api';
import {fetchAllApi} from '../../Utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Autocomplete} from '../../components/AutoComplete/Autocomplete';
import {styles} from './ConfirmTrip.styles';
import moment from 'moment';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const ConfirmTrip = props => {
  const [DataSetBai, setDataSetBai] = useState(null);
  const [DataSetXe, setDataSetXe] = useState(null);

  const [selectBSX, setSelectBSX] = useState({id: 0});
  const [listChuyen, setListChuyen] = useState([]);

  const [scan, setScan] = useState(false);

  const onSelc = async (item, key) => {
    // console.log(key, 'key');
    try {
      if (item != null) {
        setSelectBSX(item);
        const {data} = await getChuyenXeID(item.id);
        if (data) setListChuyen(data);
      } else setListChuyen([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const response = await fetchAllApi([getBai(), getXe()]);
      const listBai = response[0].data.map(item => ({
        id: item.IDBai,
        title: item.TenBai,
      }));
      setDataSetBai(listBai);
      const listXe = response[1].data.map(item => ({
        id: item.IDXe,
        title: item.BSX,
      }));
      setDataSetXe(listXe);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const response = await getBai();
    //   if(response){
    //     const listBai = response.data.map(item => ({
    //           id: item.IDBai,
    //           title: item.TenBai,
    //         }));
    //         setDataSetBai(listBai);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // try {
    //   const response =await getXe();
    //   if(response){
    //     const listXe = response.data.map(item => ({
    //           id: item.IDXe,
    //               title: item.BSX,
    //         }));
    //         setDataSetXe(listXe);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

  };

  const onConfirm = async IDChuyen => {
    const body = {
      NgayNhap: moment().toISOString(),
      NgayXacNhan: moment().toISOString(),
      IDNguoiXacNhan:props.idUser?props.idUser:0,
      TinhTrang: 1,
    };
    try {
      const res = await UpdateChuyenXeID(IDChuyen, body);
      if (res.status === 201) {
        Alert.alert('Xác nhận chuyến thành công');
        // setSelectBSX({id: 0});
        const {data} = await getChuyenXeID(selectBSX.id);
        if (data) setListChuyen(data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Xác nhận chuyến thất bại');
    }
  };

  const onSuccess = async e => {
    // console.log(e);
    Alert.alert(e.data);
    if(DataSetXe){
    const qrXe = DataSetXe.find(({title}) => title == e.data);
    if(qrXe) {
      setSelectBSX(qrXe);
      const {data} = await getChuyenXeID(qrXe.id);
      if (data) setListChuyen(data);
    }}
    setScan(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      {!scan&&<View style={{minHeight: 500, margin: 10}}>
        <Text>Chọn Biển số xe</Text>
        <View style={{flexDirection: 'row'}}>
        <View style={{width: '90%'}}>
        <Autocomplete
          dataSet={DataSetXe}
          initValue={selectBSX}
          AutoKey={'xe'}
          parentCallback={(item, key) => onSelc(item, key)}
        />
        </View>
        <View style={{width: '10%',marginLeft:5,justifyContent:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setScan(true);
                    }}
                    style={styles.buttonScan}>
                    <Icon
                      name="qr-code-outline"
                      size={25}
                      style={{width: '100%'}}
                      // color={'blue'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
        <Text>Thông Tin Chuyến Xe</Text>
        {listChuyen.map((item, key) => {
          return (
            <View style={styles.tag} key={key}>
              <Text style={styles.info}>
                <Text>
                  <Text style={{fontSize: 15}}>
                    {DataSetBai.find(({id}) => id === item.IDBaiXuat).title}
                    {'>'}{' '}
                    {DataSetBai.find(({id}) => id === item.IDBaiNhap).title}
                  </Text>{' '}
                  {'\n'}Thời gian xuất:{' '}
                  {moment(item.NgayXuat).format('DD-MM-YYYY HH:mm')}
                </Text>
              </Text>
              <View style={styles.button}>
                <Button
                  title="Xác Nhận"
                  onPress={() => onConfirm(item.IDChuyen)}
                  color="#23577C"
                />
              </View>
            </View>
          );
        })}
        {/* <View style={styles.tag}>
          <Text style={styles.info}>
            <Text ><Text style={{fontSize:15}}>Bãi A -{'>'} Bãi B aasssssssssss</Text> {"\n"}Thời gian xuất: 1/11/2021 13:00:00</Text>
          </Text>
          <View style={styles.button} >
            <Button title="Xác Nhận" onPress={onConfirm} color="#23577C"  />
          </View>
        </View> */}
      </View>}
      {scan && (
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          // ref={(node) => { scanner = node }}
          onRead={onSuccess}
          topContent={
            <Text style={styles.centerText}>
              Please move your camera {'\n'} over the QR Code
            </Text>
          }
          bottomContent={
            <View>
              <TouchableOpacity
                style={styles.buttonScan2}
                onPress={() => setScan(false)}>
                <Icon
                      name="close-circle"
                      size={35}
                      style={{width: '100%'}}
                      // color={'blue'}
                    />
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </ScrollView>
  );
};

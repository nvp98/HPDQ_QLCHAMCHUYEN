import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getBai, getXe, getNhaThau, getVatTu, postChuyenXe} from '../../Api';
import {fetchAllApi, fetchApi} from '../../Utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Autocomplete} from '../../components/AutoComplete/Autocomplete';
import {styles} from './CreateTrip.styles';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const CreateTrip = props => {
  const [DataSetBai, setDataSetBai] = useState(null);
  const [DataSetXe, setDataSetXe] = useState(null);
  const [DataSetNT, setDataSetNT] = useState(null);
  const [DataSetVT, setDataSetVT] = useState(null);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectBaiNhap, setSelectBaiNhap] = useState({id: 0});
  const [selectBaiXuat, setSelectBaiXuat] = useState({id: 0});
  const [selectBSX, setSelectBSX] = useState({id: 0});
  const [selectNT, setSelectNT] = useState({id: 0});
  const [selectVT, setSelectVT] = useState({id: 0});
  const [isStatus, setStatus] = useState(false);

  const [scan, setScan] = useState(false);
  const [key, setKey] = useState('');

  const onChange = (event, selectedDate) => {
    setShow(false);

    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    if (mode == 'date') setDate(currentDate);
    else setTime(currentDate);
    // console.log(selectedDate, 'select');
  };

  const showDatepicker = mode => {
    setShow(true);
    setMode(mode);
  };

  const onSelc = (item, key) => {
    setKey(key);
    // console.log(key,'key');
    if (item !== null) {
      if (key == 'xe') {
        const setNT = DataSetNT.find(({id}) => id == item.IDNT);
        // setSelectNT(setNT);
        setSelectBSX(item);
        // setSelectNT(setNT);
        // setScan(false);
      }
      switch (key) {
        case 'BaiNhap':
          return setSelectBaiNhap(item);
        case 'BaiXuat':
          return setSelectBaiXuat(item);
        // case 'xe':
        //   return   setSelectBSX(item);
        case 'nt':
          return setSelectNT(item);
        case 'vt':
          return setSelectVT(item);
        default:
          break;
      }
    }
  };

  useEffect(() => {
    initData();
  }, [selectNT]);

  const initData = async () => {
    try {
      const response = await fetchAllApi([
        getBai(),
        getXe(),
        getNhaThau(),
        getVatTu(),
      ]);
      const listBai = response[0].data.map(item => ({
        id: item.IDBai,
        title: item.TenBai,
      }));
      setDataSetBai(listBai);
      const listXe = response[1].data.map(item => ({
        id: item.IDXe,
        title: item.BSX,
        IDNT: item.IDNhaThau,
      }));
      setDataSetXe(listXe);
      const listNT = response[2].data.map(item => ({
        id: item.IDNhaThau,
        title: item.TenNT,
      }));
      setDataSetNT(listNT);
      const listVT = response[3].data.map(item => ({
        id: item.IDVT,
        title: item.TenVT,
      }));
      setDataSetVT(listVT);

      // console.log('run initDat');
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
    // try {
    //   const response =await getNhaThau();
    //   if(response){
    //     const listNT = response.data.map(item => ({
    //           id: item.IDNhaThau,
    //           title: item.TenNT,
    //         }));
    //         setDataSetNT(listNT);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // try {
    //   const response =await getVatTu();
    //   if(response){
    //     const listVT = response.data.map(item => ({
    //           id: item.IDVT,
    //           title: item.TenVT,
    //         }));
    //         setDataSetVT(listVT);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const onCreate = async () => {
    // console.log(moment());
    // console.log(
    //   moment(moment(date).format("YYYY-MM-DD")+" "+moment(time).format("HH:mm:ss")).format(),'datetime'
    // );
    const body = {
      IDXe: selectBSX.id,
      BSX: selectBSX.title,
      IDVT: selectVT.id,
      IDNhaThau: selectNT.id,
      IDBaiXuat: selectBaiXuat.id,
      NgayXuat: moment(
        moment(date).format('YYYY-MM-DD') +
          ' ' +
          moment(time).format('HH:mm:ss'),
      ).format(),
      IDNguoiTao: props.idUser ? props.idUser : 0,
      NgayTao: moment().toISOString(),
      IDBaiNhap: selectBaiNhap.id,
      NgayNhap: isStatus ? moment().toISOString() : null,
      IDNguoiXacNhan: isStatus ? props.idUser : 0,
      NgayXacNhan: isStatus ? moment().toISOString() : null,
      TinhTrang: isStatus ? 1 : 0,
    };
    try {
      // console.log(body);
      // const res = await postChuyenXe(body);
      //       if(res.status === 201){
      //         Alert.alert("Tạo chuyến thành công");
      //       }
      Alert.alert('Thông báo', 'Bạn có đồng ý xác nhận tạo chuyến?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const res = await postChuyenXe(body);
            if (res.status === 201) {
              Alert.alert('Tạo chuyến thành công');
            }
          },
        },
      ]);
      // console.log(body,'created');
    } catch (error) {
      console.log(error);
      Alert.alert('Tạo chuyến thất bại');
    }
  };

  const onSuccess = e => {
    Alert.alert(e.data);
    if(DataSetXe){
    const qrXe = DataSetXe.find(({title}) => title == e.data);
    if(qrXe){
      setSelectBSX(qrXe);
      const qrNT = DataSetNT.find(({id}) => id == qrXe.IDNT);
      setSelectNT(qrNT);
    }}
    setScan(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      {!scan && (
        <>
          <View style={{minHeight: 500, margin: 10}}>
            <View style={{margin: 10}}>
              <Text>Bãi Xuất</Text>
              <Autocomplete
                dataSet={DataSetBai}
                initValue={selectBaiXuat}
                AutoKey={'BaiXuat'}
                parentCallback={(item, key) => onSelc(item, key)}
              />
            </View>
            <View style={{margin: 10}}>
              <Text>Thời Gian Xuất</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="calendar-outline"
                  size={25}
                  style={{margin: 2}}
                  onPress={() => showDatepicker('date')}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    textAlignVertical: 'center',
                  }}>
                  {moment(date).format('DD-MM-YYYY')}
                </Text>

                <Icon
                  name="time-outline"
                  size={25}
                  style={{margin: 2}}
                  onPress={() => showDatepicker('time')}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    textAlignVertical: 'center',
                  }}>
                  {moment(time).format('HH:mm:ss')}
                </Text>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={{margin: 10}}>
              <Text>Bãi Nhập</Text>
              <Autocomplete
                dataSet={selectBaiXuat.id !=0?DataSetBai?.filter(item=>item !=selectBaiXuat):DataSetBai}
                initValue={selectBaiNhap}
                AutoKey={'BaiNhap'}
                parentCallback={(item, key) => onSelc(item, key)}
              />
            </View>
            <View style={{margin: 10}}>
              <Text>Vật Tư</Text>
              <Autocomplete
                dataSet={DataSetVT}
                initValue={selectVT}
                AutoKey={'vt'}
                parentCallback={(item, key) => onSelc(item, key)}
              />
            </View>
            <View style={{margin: 10}}>
              <Text>Biển số</Text>
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
            </View>
            <View style={{margin: 10}}>
              <Text>Nhà Thầu</Text>

              <Autocomplete
                dataSet={DataSetNT}
                initValue={selectNT}
                AutoKey={'nt'}
                parentCallback={(item, key) => onSelc(item, key)}
              />
            </View>
            <Text style={{fontSize: 12, fontStyle: 'italic', color: 'red'}}>
              *Xác nhận chuyến?
            </Text>
            <CheckBox
              disabled={false}
              value={isStatus}
              onValueChange={setStatus}
              // style={{color:'#05428C'}}
            />
            <View style={styles.button}>
              <Button title="Xác Nhận" onPress={onCreate} color="#23577C" />
            </View>
          </View>
        </>
      )}
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

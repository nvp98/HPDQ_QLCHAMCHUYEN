import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  BgContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoContainer: {
    alignItems: 'center',
    marginTop: 0,
    // position:'absolute',
    top:-50
  },
  logo: {
    width:180,
    height:113,
  },
  inputsContainer: {
    marginTop: 10,
  },
  inputs: {
    width: 300,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  inputsIcon: {
    position: 'absolute',
    top: 8,
    left: 40,
  },
  eyeBtn: {
    position: 'absolute',
    top: 8,
    right: 40,
  },
  BtnLogin: {
    width: 200,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#23577C',
  },
  BtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});

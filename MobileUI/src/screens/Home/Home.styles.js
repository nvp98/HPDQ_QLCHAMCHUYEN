import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgcolor:{
      color:'red',
  },
  input: {
    height: 40,
    width:'75%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    alignItems:'center',
    width:'100%',
  },
  iconCOntainer:{
    display:'flex',
    flexDirection:'row'
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
  AutocompleteStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
   borderWidth:1
  },
  MainContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  BtnLogin: {
    width: 100,
    height: 20,
    justifyContent: 'center',
    // marginTop: 20,
    backgroundColor: '#23577C',
    flex:1,
  },
  BtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});

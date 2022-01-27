import axios from 'axios';
import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

function Seperator() {
  return <View style={styles.seperator} />;
}
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.isduplicated = true;
    this.state = {id: null, name: null, password: null, checkpassword: null, email: null};
  }

  goBackHomeAlert = () =>
  //홈으로 돌아갈 때 확인
    Alert.alert('돌아가시겠습니까?', '저장되지 않습니다.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
    ]);

  checkId = () =>
  //id 값을 중복 체크
    axios.post('/checkId',
      {
        Id: this.state.id
      })
      .then(function(response){
        console.log(response);
        if(response.data.isduplicated == false){
          //중복 id 체크에 대한 응답으로 확인
          this.isduplicated = false;
          Alert.alert('사용 가능한 아이디 입니다.');
        }else{
          this.isduplicated = true;
          Alert.alert('중복된 아이디 입니다.');
        }
      })
      .catch(function(error){
        console.error('에러났습니다.');
      });

  createAccount = () =>
    axios.post('/register',
      {
        Id:this.state.id,
        Name: this.state.name,
        Password: this.state.password,
        CheckPassword: this.state.checkpassword,
        Email: this.state.email
      })
      .then(function(response){
        Alert.alert('성공적으로 계정이 생성되었습니다.');
      })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.title}
            onPress={this.goBackHomeAlert}>
            <Text> SSUFUN </Text>
          </TouchableOpacity>
        </View>
        <Seperator />
        <ScrollView horizontal={false} style={styles.logincontainer}>
          <TextInput
            style={styles.textForm}
            value={this.state.name}
            placeholder={'이름'}
            //onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            returnKeyType="next"
            //onSubmitEditing={() =>
            //  passwordInputRef.current && passwordInputRef.current.focus()
            //}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.idForm}
              value={this.state.id}
              placeholder={'아이디'}
              //onChangeText={(userId) => setUserId(userId)}
              autoCapitalize="none"
              returnKeyType="next"
              //onSubmitEditing={() =>
              //  passwordInputRef.current && passwordInputRef.current.focus()
              //}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.check}
              onPress={this.checkId}>
              <Text> 중복 확인 </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textForm}
            value={this.state.password}
            placeholder={'비밀번호'}
            //onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            returnKeyType="next"
            //onSubmitEditing={() =>
            //  passwordInputRef.current && passwordInputRef.current.focus()
            //}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textForm}
            value={this.state.checkpassword}
            placeholder={'비밀번호확인'}
            //onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            returnKeyType="next"
            //onSubmitEditing={() =>
            //  passwordInputRef.current && passwordInputRef.current.focus()
            //}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textForm}
            value={this.state.checkpassword}
            placeholder={'이메일'}
            //onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            returnKeyType="next"
            //onSubmitEditing={() =>
            //  passwordInputRef.current && passwordInputRef.current.focus()
            //}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          {/*
          <TextInput
            style={styles.textForm}
            placeholder={'전화번호'}
            //onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            returnKeyType="next"
            //onSubmitEditing={() =>
            //  passwordInputRef.current && passwordInputRef.current.focus()
            //}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('회원가입')}>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
  row: {
    height: Dimensions.get('window').height / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    alignItems: 'center',
    padding: 5,
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: 5,
  },
  logincontainer: {
    margin: 5,
  },
  textForm: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
  },
  idForm: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    flex: 3,
  },
  Btnrow: {
    //height: Dimensions.get('window').height / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  button: {
    flexDirection: 'row-reverse',
    margin: 5,
  },
  check: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    justifyContent: 'center',
  },
});

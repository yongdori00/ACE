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

  createTwoButtonAlert = () =>
    Alert.alert(
      "돌아가시겠습니까?",
      "저장되지 않습니다.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
      ]
    );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
        <TouchableOpacity
            style={styles.title}
            onPress = {this.createTwoButtonAlert}>
            <Text> SSUFUN </Text>
          </TouchableOpacity>
        </View>
        <Seperator />
        <ScrollView horizontal={false} style={styles.logincontainer}>
          <TextInput
            style={styles.textForm}
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
          <TextInput
            style={styles.textForm}
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
          <TextInput
            style={styles.textForm}
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
          />
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
});

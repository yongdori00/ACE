import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

function Seperator() {
  return <View style={styles.seperator} />;
}
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => Alert.alert('홈으로 이동')}>
            <Text> SSUFUN </Text>
          </TouchableOpacity>
        </View>
        <Seperator />
        <View style={styles.logincontainer}>
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
        </View>
        <View style={styles.Btnrow}>
          <TouchableOpacity
            //style={styles.button}
            onPress={() => Alert.alert('아이디/비밀번호 찾기')}>
            <Text>아이디/비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('로그인')}>
            <Text>로그인</Text>
          </TouchableOpacity>
        </View>
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
    margin: 2,
  },
  Btnrow: {
    //height: Dimensions.get('window').height / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  button: {
    activeOpacity: 0.8,
  },
});

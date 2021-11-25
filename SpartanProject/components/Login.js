import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
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
            onPress={() => this.props.navigation.navigate('Home')}>
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
        <View style={styles.regi_find}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text>회원가입{'\n'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('아이디/비밀번호 찾기')}>
            <Text>아이디/비밀번호 찾기{'\n'}</Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => Alert.alert('로그인')}
          title="로그인" />
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
  regi_find: {
    alignItems: 'center',
  }
});

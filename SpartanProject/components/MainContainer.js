import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Button,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
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
          <TouchableOpacity
            style={styles.login}
            onPress={() => Alert.alert('회원가입 / 로그인')}>
            <Text>회원가입 / 로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <Button
            title="식당"
            color="#006894"
            onPress={() => Alert.alert('식당으로 이동')}
          />

          <Button
            title="공지사항"
            color="#009bcb"
            onPress={() => Alert.alert('공지사항으로 이동')}
          />

          <Button
            title="팀"
            color="#5ec1c3"
            onPress={() => Alert.alert('팀으로 이동')}
          />
        </View>
        <ScrollView horizontal={false} style={styles.banner}>
          <TouchableOpacity
            title="배너 1"
            onPress={() => Alert.alert('배너 1으로 이동')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/banner1.png')}
            />
          </TouchableOpacity>
          <Seperator />
          <TouchableOpacity
            title="배너 2"
            onPress={() => Alert.alert('배너 2으로 이동')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/banner1.png')}
            />
          </TouchableOpacity>
          <Seperator />
          <TouchableOpacity
            title="배너 3"
            onPress={() => Alert.alert('배너 3으로 이동')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/banner1.png')}
            />
          </TouchableOpacity>
          <Seperator />
          <TouchableOpacity
            title="배너 4"
            onPress={() => Alert.alert('배너 4으로 이동')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/banner1.png')}
            />
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
  login: {
    padding: 5,
    textAlign: 'right',
  },
  list: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: '#cccccc',
    padding: 3,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  banner: {
    margin: 5,
    padding: 5,
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: 5,
  },
  logo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 5,
  },
});

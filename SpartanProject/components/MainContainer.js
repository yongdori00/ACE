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
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RestaurantList from './RestaurantList';
import AboutRestaurant from './AboutRestaurant';
import Mypage from './Mypage';
import Signup from './Signup';
import Notice from './Notice';
import axios from 'axios';

function Seperator() {
  return <View style={styles.seperator} />;
}
class App extends React.Component {
  
  //변경 가능한 변수 생성(생성자 이용)
  constructor(props) {
  super(props);
  this.state = { isLoggedIn: false, isLoggedInPage = 'SignUp', nameOfRestaurant: "", minimum: 0, maximum: 10, current: 0 };
}
  render() {
    //로그인 세션 get
    axios.get('임의의 값')
    .then(function(response){
      if (isLoggedIn == true){
        this.state.loginStatus = '마이페이지';
        this.state.isLoggedInPage = 'Mypage';
      }
      else{
        this.state.loginStatus = '로그인/회원가입';
        this.state.isLoggedInPage = 'Signup';
      }})
    .catch(function(error){
      console.log(error);
    });

    //views
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text> SSUFUN </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login}
            onPress={() => this.props.navigation.navigate(isLoggedInPage)}>
            <Text>{loginStatus}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <Button
            title="식당"
            color="#006894"
            onPress={() => this.props.navigation.navigate('RestList')}
          />

          <Button
            title="공지사항"
            color="#009bcb"
            onPress={() => this.props.navigation.navigate('Notice')}
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

//화면 전환 navigator
const MainNavigator = createStackNavigator({
  RestAbout: AboutRestaurant,
  RestList: RestaurantList,
  Notice:Notice,
  Home: App,
  Signup: Signup,
  Mypage: Mypage,
}, 
{
  initialRouteName: 'Home',
}
)

//main navigator 생성자
export default createAppContainer(MainNavigator);

//css
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

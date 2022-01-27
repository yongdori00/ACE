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
import RestaurantInformation from './RestaurantInformation';
import Mypage from './Mypage';
import Login from './Login';
import Register from './Register';
import Notice from './Notice';
import AboutTeam from './AboutTeam';
import axios from 'axios';

function Seperator() {
  return <View style={styles.seperator} />;
}
class App extends React.Component {

  //변경 가능한 변수 생성(생성자 이용)
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, isLoggedInPage: 'Mypage', loginStatus: '마이페이지'/*isLoggedInPage: 'Login', loginStatus: '로그인/회원가입'*/ };
    this.responseData;
    this.bannerList = [1,2,3,4,5];
  }
  render() {
    //로그인 세션 get
    axios.get('/')
      .then(function (response) {
        //요청 데이터 처리
        this.responseData = response.data;

        for (let i = 0; i < response.data.bannerList.length; i++)
          this.Banner.push(response.data.bannerList(i));

        if (this.state.isLoggedIn == true) {
          this.state.loginStatus = '마이페이지';
          this.state.isLoggedInPage = 'Mypage';
        }
        else {
          this.state.loginStatus = '로그인/회원가입';
          this.state.isLoggedInPage = 'Login';
        }
      })
      .catch(function (error) {
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
            onPress={() => this.props.navigation.navigate(this.state.isLoggedInPage)}>
            <Text>{this.state.loginStatus}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={false} style={styles.banner}>
          <TouchableOpacity
            title="이달의 식당"
            onPress={() => Alert.alert('배너 1으로 이동')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/twomoonofvoicefood.jpg')}
            />
          </TouchableOpacity>
          <Seperator />
          <TouchableOpacity
            title="할인 받자!"
            onPress={() => this.props.navigation.navigate('RestList')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/Letsgetsales.png')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Seperator />
          <TouchableOpacity
            title="공지사항 확인 바랄게요~"
            onPress={() => this.props.navigation.navigate('Notice')}>
            <Image
              style={styles.logo}
              source={require('./assets/image/ballpaperfourhang.png')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Seperator />
          <TouchableOpacity
            title="team the ace!"
            onPress={() => this.props.navigation.navigate('AboutTeam')}>
            <View>
            <Image
              style={styles.logo}
              source={require('./assets/image/ace.png')}
              resizeMode="contain"
            />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

//화면 전환 navigator
const MainNavigator = createStackNavigator({
  RestInfo: RestaurantInformation,
  RestList: RestaurantList,
  Notice: Notice,
  Home: App,
  Register: Register,
  Login: Login,
  Mypage: Mypage,
  AboutTeam: AboutTeam,
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

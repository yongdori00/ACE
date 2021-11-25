import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Button,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

export default class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, isLoggedInPage: 'SignUp', loginStatus: '마이페이지', nameOfRestaurant: "", minimum: 0, maximum: 10, current: 0 };
  }

  render() {
    axios.get('/RestList')
      .then(function (response) {
        if (isLoggedIn == true) {
          this.state.loginStatus = '마이페이지';
          this.state.isLoggedInPage = 'Mypage';
        }
        else {
          this.state.loginStatus = '로그인/회원가입';
          this.state.isLoggedInPage = 'Signup';
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    loadMainText = () => {

    }

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
        <View style={styles.RestaurantList}>
          <Text>
            N O T I C E
          </Text>
        </View>
        <FlatList horizontal={false} style={styles.list}>
          <View style={styles.stylegridView}>
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('RestInfo')}>
              <Image style={styles.logo} source={require('./assets/image/test.png')}
              />
              <View >
                <Text >가게 이름:{this.state.nameOfRestaurant}</Text>
                <Text >최소 주문 수:{this.state.minimum}</Text>
                <Text >최대 주문 수:{this.state.maximum}</Text>
                <Text >현재 주문 수:{this.state.current}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  RestaurantList: {
    backgroundColor: 'aqua',
    width: wp('100%'),  // 스크린 가로 크기 100%
    height: 75, // 스크린 세로 크기 50%
    justifyContent: "center",
    alignItems: "center",
    fontSize: Dimensions.get('window').width / 10
  },
  row: {
    top: 0,
    height: Dimensions.get('window').height / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    padding: 5,
  },
  login: {
    padding: 5,
    textAlign: 'right',
  },
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
  logo: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 5,
  },
  card: {
    alignItems: "center",
    fontSize: Dimensions.get("window").width / 30,
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 3,
  },
});
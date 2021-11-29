import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoggedInPage: 'SignUp',
      loginStatus: '마이페이지',
      nameOfRestaurant: '',
      minimum: 0,
      maximum: 10,
      current: 0,
      datas: [
        {name: '석경호', email: 'skh@naver.com'},
        {name: '박시균', email: 'psk@naver.com'},
        {name: '정현구', email: 'jhk@naver.com'},
        {name: '김민수', email: 'kms@naver.com'},
      ],
    };
  }
  render() {
    axios
      .get('/RestList')
      .then(function (response) {
        if (isLoggedIn == true) {
          this.state.loginStatus = '마이페이지';
          this.state.isLoggedInPage = 'Mypage';
        } else {
          this.state.loginStatus = '로그인/회원가입';
          this.state.isLoggedInPage = 'Signup';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
            onPress={() =>
              this.props.navigation.navigate(this.state.isLoggedInPage)
            }>
            <Text>{this.state.loginStatus}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Notice}>
          <Text>Team ACE</Text>
        </View>
        <View style={styles.noticeList}>
          <FlatList
            horizontal={false}
            data={this.state.datas}
            renderItem={({item}) => {
              return (
                <View style={styles.itemList}>
                  <Text style={styles.item}>{item.name}</Text>
                  <Text style={styles.item}>{item.email}</Text>
                </View>
              );
            }}></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Notice: {
    backgroundColor: 'aqua',
    width: wp('100%'), // 스크린 가로 크기 100%
    height: 75, // 스크린 세로 크기 50%
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Dimensions.get('window').width / 10,
  },
  noticeList: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'skyblue',
    marginBottom: 10,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 5,
  },
  card: {
    alignItems: 'center',
    fontSize: Dimensions.get('window').width / 30,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 3,
  },
  itemView: {
    height: Dimensions.get('window').height / 10,
    flexDirection: 'row',
    padding: 5,
    borderColor: 'aqua',
    borderWidth: 1,
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

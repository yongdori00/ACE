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
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

export default class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoggedInPage: 'Login',
      loginStatus: '로그인/회원가입',
      nameOfRestaurant: '',
      minimum: 0,
      maximum: 10,
      current: 0,
      datas: [
        {title: '다섯번째 공지사항', writer: 'asd', date: '21-11-25'},
        {title: '네번째 공지사항', writer: 'bbb', date: '21-11-24'},
        {title: '세번째 공지사항', writer: 'qwe', date: '21-11-23'},
        {title: '두번째 공지사항', writer: 'rcf', date: '21-11-22'},
        {title: '첫번째 공지사항', writer: 'agg', date: '21-11-21'},
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
        }
        else {
          this.state.loginStatus = '로그인/회원가입';
          this.state.isLoggedInPage = 'Signup';
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    loadMainText = () => {};

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
        <ScrollView style={styles.noticeList}>
          <FlatList
            horizontal={false}
            data={this.state.datas}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.itemView}
                  onPress={() => alert(item.title, '로 이동')}>
                  <View style={styles.itemList}>
                    <Text style={styles.item}>{item.title}</Text>
                    <Text style={styles.item}>{item.writer}</Text>
                    <Text style={styles.item}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}></FlatList>
        </ScrollView>
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
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 5,
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
  noticeist: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: '#cccccc',
    padding: 3,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  itemList: {
    padding: 3,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    margin: 2,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

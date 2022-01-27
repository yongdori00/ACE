import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';

export default class AboutTeam extends React.Component {

  //변경 가능한 변수 생성(생성자 이용)
  constructor(props) {
    super(props);
    this.state = {datas: [
      {name: '김민수', studentid: '2018', email: '21-11-25'},
      {name: '박시균', studentid: '2017', email: '21-11-24'},
      {name: '석경호', studentid: '2017', email: '21-11-23'},
      {name: '정현구', studentid: '20172678', email: 'yongdori98@naver.com'},
      ],
      isLoggedIn: false, isLoggedInPage: 'Mypage', loginStatus: '마이페이지'/*isLoggedInPage: 'Login', loginStatus: '로그인/회원가입'*/ 
    }
  }
  render() {
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
        <FlatList
            horizontal={false}
            data={this.state.datas}
            renderItem={({item}) => {
              return (
                  <View style={styles.itemList}>
                    <Text style={styles.highlight}>{item.name}</Text>
                    <Text style={styles.item}>{item.studentid}</Text>
                    <Text style={styles.item}>{item.email}</Text>
                  </View>
              );
            }}></FlatList>
      </View>
    );
  }
}

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
  itemList: {
    padding: 3,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlight:{
    margin: 2,
    fontSize: 18,
    fontWeight:'bold',
  },
  item: {
    margin: 2,
    fontSize: 15,
    
  },
});

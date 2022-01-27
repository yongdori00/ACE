import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

//각 폰트들의 색이랑 크기 조절은 해야합니다.

export default class ScrollableAboutRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      order: 0,
      nameOfRestaurant: 'name',
      minimum: 0,
      maximum: 10,
      current: 0,
      body: '',
      listPrice: 0,
      discountedPrice: 0,
      ceoComment: '뚝배기 좀 칩니데이~',
      location: '',
    };
    this.state = {
      operatingTime: 'time',
      contact: 'nut_alrnond',
      Images: [],
      isLoggedIn: true,
      loginStatus: '마이페이지',
      isLoggedInPage: 'Mypage',
    }
    this.temporary_data;

  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.stylegridView}>
        <Image
          style={styles.logo}
        /*source={require(item.Image)}*/
        />
      </View>);
  }

  render() {
    //각종 식당 정보 받아온 것을 변환.
    axios.get('/RestInfo')
      .then(function (response) {
        const json_list = JSON.stringify(response.data);
        this.temporary_data = JSON.parse(json_list);
        this.data.order = this.temporary_data.order;
        this.data.nameOfRestaurant = this.temporary_data.nameOfRestaurant;
        this.data.minimum = this.temporary_data.minimum;
        this.data.maximum = this.temporary_data.maximum;
        this.data.current = this.temporary_data.current;
        this.data.body = this.temporary_data.body;
        this.data.listPrice = this.temporary_data.listPrice;
        this.data.discountedPrice = this.temporary_data.discountedPrice;
        this.data.ceoComment = this.temporary_data.ceoComment;
        this.data.location = this.temporary_data.location;

        if (isLoggedIn == true) {
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
            style={styles.logo}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text>
              SSUFUN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login}
            onPress={() => this.props.navigation.navigate('RestList')}>
            <Text>
              {this.state.loginStatus}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.RestaurantList}>
          <Text>
            {this.state.order}. {this.state.nameOfRestaurant}
            {'\n'}
            Min:{this.state.minimum}명 | Max:{this.state.maximum}명{'\n'}
            현재:{this.state.current}명이 예약했습니다!
          </Text>
        </View>
        <ScrollView horizontal={true} style={styles.list}>
          <FlatList
            data={this.temporary_data}
            renderItem={this.renderItem}
            keyExtractor={(item) => String(item.id)}
          />
          {/*<View style={styles.stylegridView}>
            <Image
              style={styles.logo}
              source={require('./assets/image/test.png')}
            />
            <Image
              style={styles.logo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              }}
            />
            <Image
              style={styles.logo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              }}
            />
            </View>*/}
        </ScrollView>
        <View>
          <Text>
            소개
            {this.data.body}
            메뉴와 할인가를 소개합니다.{'\n'}
            정가:{this.data.listPrice} → 할인가:{this.data.discountedPrice}
            {'\n\n\n'}
            사장님의 한마디!{'\n'}
            {this.data.ceoComment}
            {'\n\n\n'}
            정보{'\n\n'}
            주소:{this.data.location}
            {'\n'}
            영업시간:{this.data.operatingTime}
            {'\n'}
            연락처/sns:{this.data.contact}
            {'\n'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.payBottom}
          onPress={() => Alert.alert('결제 창으로 이동')}>
          <View style={styles.payButton}>
            <Text>결제</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  RestaurantList: {
    width: wp('100%'), // 스크린 가로 크기 100%
    fontSize: Dimensions.get('window').width / 10,
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
  payBottom: {
    height: Dimensions.get('window').height / 12,
    alignItems: 'flex-end',
  },
  payButton: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 14,
    width: Dimensions.get('window').width / 4,
  },
});

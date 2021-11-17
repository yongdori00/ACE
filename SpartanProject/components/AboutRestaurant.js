import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//각 폰트들의 색이랑 크기 조절은 해야합니다.

export default class ScrollableAboutRestaurant extends React.Component {

  constructor(props) {
    super(props);
    this.state = { order: 0, NameOfRestaurant: "name", minimum: 0, maximum: 10, current: 0, Body:"" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button style={styles.title}
            title='SSUFUN'
            onPress={() => Alert.alert('홈으로 이동')}
          />
          <Button style={styles.login}
            title='회원가입 / 로그인'
            onPress={() => Alert.alert('회원가입 / 로그인')}
          />
        </View>
        <View style={styles.RestaurantList}>
          <Text>
            {this.state.order}. {this.state.NameOfRestaurant}
            Min:{this.state.minimum}명 | Max:{this.state.maximum}명
            현재:{this.state.current}명이 예약했습니다!
          </Text>
        </View>
        <ScrollView horizontal={true} style={styles.list}>
          <View style={styles.stylegridView}>
            <Image style={styles.logo} source={require('./assets/image/test.png')} />
            <Image style={styles.logo} source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }} />
            <Image style={styles.logo} source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }} />
            <View>
              <Text>
                소개
                {this.state.body}
                메뉴와 할인가를 소개합니다.
                정가:{}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  RestaurantList: {
    width: wp('100%'),  // 스크린 가로 크기 100%
    height: Dimensions.get('window').height / 15, // 스크린 세로 크기 50%
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
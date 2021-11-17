import React, { useState } from 'react';
import {
  TouchableOpacity,
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

export default class ScrollableRestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: 0, NameOfRestaurant: "", minimum: 0, maximum: 10, current: 0 };
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
            식당을 선택해주세요.
          </Text>
        </View>
        <ScrollView horizontal={false} style={styles.list}>
          <View style={styles.stylegridView}>
            <TouchableOpacity style={styles.card} onPress={() => Alert.alert('다음페이지')}>
              <Image style={styles.logo} source={require('./assets/image/test.png')}
              />
              <View >
                <Text >가게 이름:{this.state.NameOfRestaurant}</Text>
                <Text >최소 주문 수:{this.state.minimum}</Text>
                <Text >최대 주문 수:{this.state.maximum}</Text>
                <Text >현재 주문 수:{this.state.current}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => Alert.alert('다음페이지')}>
              <Image style={styles.logo} source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              }} />
              <View >
                <Text >가게 이름:{this.state.NameOfRestaurant}</Text>
                <Text >최소 주문 수:{this.state.minimum}</Text>
                <Text >최대 주문 수:{this.state.maximum}</Text>
                <Text >현재 주문 수:{this.state.current}</Text>
              </View>
            </TouchableOpacity>
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
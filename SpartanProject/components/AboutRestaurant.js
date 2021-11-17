import React, {useState} from 'react';
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

export default class IScrolledDownAndWhatHappenedNextShockedMe extends React.Component {
    render() {
        const [order, setOrder] = useState(null);
        const [NameOfRestaurant, setNameOfRestaurant] = useState(null);
        const [minimum, setMinimum] = useState(null);
        const [maximum, setMaximum] = useState(null);
        const [current, setCurrent] = useState(null);

        //임시로 값 지정정
        setOrder(1);
        setNameOfRestaurant("멘동");
        setMinimum(0);
        setMaximum(10);
        setCurrent(10);

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
            {order}. {NameOfRestaurant}
          </Text>
        </View>
          <ScrollView horizontal={true} style={styles.list}>
            <View style={styles.stylegridView}>
               <Image style={styles.logo} source={require('./assets/image/test.png')}/>
               <Image style={styles.logo} source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',}} />
               <View >
                </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    
    container: {
      flex:1,
  },
    RestaurantList: {
        backgroundColor: 'aqua',
        width : wp('100%'),  // 스크린 가로 크기 100%
        height : 75, // 스크린 세로 크기 50%
        justifyContent: "center",
        alignItems: "center",
        fontSize: Dimensions.get('window').width/10
    },
  row: {
    top:0,
    height: Dimensions.get('window').height/10,
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
    stylegridView:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
    },
    list:{
      flex: 1,
      width:"100%",
      backgroundColor:"#f2f2f2",
  },
  logo: {
    width: Dimensions.get("window").width/2,
    height: Dimensions.get("window").height/5,
  },
  card: {
    alignItems:"center",
    fontSize: Dimensions.get("window").width/30,
    width: Dimensions.get("window").width/2,
    height: Dimensions.get("window").height/3,
  },
  });
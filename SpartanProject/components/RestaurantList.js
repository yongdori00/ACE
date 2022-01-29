import React from 'react';
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
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ScrollableRestaurantList extends React.Component {

  constructor(props) {
    super(props);
    this.LIMIT = 20;
    this.loading = false;
    /*this.data = { order: [], nameOfRestaurant: [], minimum: [], maximum: [], current: []};
    */
    this.state = {isLoggedIn: "", loginStatus:"마이페이지", isLoggedInPage:""};
    this.data;
   this.offset = 0;
   this.data = [
    {title: '다섯번째 공지사항', writer: 'asd', date: '21-11-25'},
    {title: '네번째 공지사항', writer: 'bbb', date: '21-11-24'},
    {title: '세번째 공지사항', writer: 'qwe', date: '21-11-23'},
    {title: '두번째 공지사항', writer: 'rcf', date: '21-11-22'},
    {title: '첫번째 공지사항', writer: 'agg', date: '21-11-21'},
    {title: '다섯번째 공지사항', writer: 'asd', date: '21-11-25'},
    {title: '네번째 공지사항', writer: 'bbb', date: '21-11-24'},
    {title: '세번째 공지사항', writer: 'qwe', date: '21-11-23'},
    {title: '두번째 공지사항', writer: 'rcf', date: '21-11-22'},
    {title: '첫번째 공지사항', writer: 'agg', date: '21-11-21'},
   ];
  }

  //data 안에 각 변수 마다 20개짜리 배열을 넘겨줘야함.

  getData = () => {
    if(this.loading){
      return;
    }
    this.loading=true;
    axios.get('/RestList')
      .then(function (response) {
        //바로 밑의 내용은 parsing이 안되면 주석 해제해야함.
        //const restList = JSON.stringify(response.data);
        const restList = JSON.parse(response.data);
        this.data = [...this.data, restList.slice(this.offset, this.offset+LIMIT)];
        /*this.data.order = [...this.data.order, response.data.order.slice(this.offset, this.offset+this.LIMIT)];
        this.data.nameOfRestaurant = [...this.data.nameOfRestaurant, response.data.nameOfRestaurant.slice(this.offset, this.offset+this.LIMIT)];
        this.data.minimum = [...this.data.minimum, response.data.minimum.slice(this.offset, this.offset+this.LIMIT)];
        this.data.maximum = [...this.data.maximum, response.data.maximum.slice(this.offset, this.offset+this.LIMIT)];
        this.data.current = [...this.data.current, response.data.current.slice(this.offset, this.offset+this.LIMIT)];
        */this.offset += LIMIT;
      })
      .catch(function (error) {
        this.loading=false;
      });
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  renderRestaurant = ({item}) => {
    //플랫리스트 내부의 아이템 구성 및 데이터 전달. (터치 기능 또한 포함.)
    return(
    <View style={styles.stylegridView}>
      <TouchableOpacity style={styles.card} onPress={() => 
        this.props.navigation.navigate('RestInfo', {nameOfRestaurant:item.nameOfRestaurant, minimum:item.minimum, maximum:item.maximum, current:item.current})}>
        <Image style={styles.logo} source={{uri:item.Image}}/>
        <View>
          <Text >가게 이름:{item.title/*nameOfRestaurant*/}</Text>
          <Text >최소 주문 수:{item.minimum}</Text>
          <Text >최대 주문 수:{item.maximum}</Text>
          <Text >현재 주문 수:{item.current}</Text>
        </View>
      </TouchableOpacity>
    </View>);
  };

  onEndReached = () => {
    this.getData();
  };

  render() {

    axios.get('/RestList')
      .then(function (response) {
        if (this.state.isLoggedIn == true) {
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

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.logo}
              onPress={() => this.props.navigation.navigate('Home')}>
              SSUFUN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.login}
              onPress={() => this.props.navigation.navigate('RestList')}
            >
              {this.state.loginStatus}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.RestaurantList}>
          <Text>
            식당을 선택해주세요.
          </Text>
        </View>
        {/*<ScrollView horizontal={false} style={styles.list} 
          onScroll={({ nativeEvent }) => 
            { if (isCloseToBottom(nativeEvent)) 
            { this.getData()} 
        }}>*/}
        <View>
          <FlatList
          //View를 ScrollView로 감싸고 있어서 warning 떠서 제거 했는데 스크롤 안되면 다시 살려야함.
          data = {this.data}
          renderItem = {(this.renderRestaurant)}
          keyExtractor={item => item.id}
          //toString이 아닐 수도 있음.
          horizontal={false}
          bounces={true}
          /*onEndReached={this.onEndReached}*/
          onEndReachedThreshold={0.6}/>
        </View>
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
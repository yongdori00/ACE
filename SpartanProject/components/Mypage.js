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
import axios from 'axios';
import { FlatList, TextInput } from 'react-native-gesture-handler';

function Seperator() {
    return <View style={styles.seperator} />;
}
export default class App extends React.Component {

    //변경 가능한 변수 생성(생성자 이용)
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false
                       ,isLoggedInPage: 'Login'
                       , loginStatus: '로그인/회원가입'
                       , coupondi: null
                       , minimum: 0
                       , maximum: 10
                       , current: 0 
                       , info : [
                            {id:null}
                            ,{password:null}
                            ,{email:null}
                            ,{name:null}
                        ]
                       , data};
    }

    renderCoupon = ({item}) => {
        //플랫리스트 내부의 아이템 구성 및 데이터 전달. (터치 기능 또한 포함.)
        return(
        <View style={styles.stylegridView}>
          <TouchableOpacity style={styles.card} onPress={() => 
            this.props.navigation.navigate('RestInfo', item.nameOfRestaurant, item.minimum, item.maximum, item.current)}>
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

    useCoupon = () =>
    axios.post('./useCoupon', {
        couponId: this.couponid
    })
    ;

    goBackHomeAlert = () =>
  //홈으로 돌아갈 때 확인
    Alert.alert('쿠폰을 사용하시겠습니까?', '확인하실 경우 환불되지 않습니다.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      //해당 부분 axios 이용해서 쿠폰 사용 이력 날려야함.
      {text: 'OK', onPress: () => this.useCoupon},
    ]);

    render() {
        //로그인 세션 get
        /*        axios.get('/')
            .then(function (response) {
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
*/
        //views

        
        axios.get('./getCoupon').
        then(function(response){
            this.state.data = JSON.parse(response.data);
        }).
        catch(function (error){
            console.log('network error');
        });

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.title}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text> SSUFUN </Text> 
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>
                        Id : {this.state.info.id}{'\n'}
                    </Text>
                    <Text>
                        Email : {this.state.info.email}{'\n'}
                    </Text>
                    <Text>
                        Name : {this.state.info.name}{'\n'}
                    </Text>
                </View>
                {/*위에는 기본 정보 밑에는 보유중인 쿠폰 출력*/}
                <View>
                    <FlatList
                        data = {this.state.data}
                        renderItem = {(this.renderCoupon)}
                        keyExtractor={item => item.id}
                        //toString이 아닐 수도 있음.
                        horizontal={false}
                        bounces={true}
                    />
                </View>
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

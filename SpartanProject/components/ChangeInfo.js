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
import { TextInput } from 'react-native-gesture-handler';

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
                       , coupondi: null,
                       , minimum: 0
                       , maximum: 10
                       , current: 0 
                        ,data : [
                            {id:null}
                            ,{password:null}
                            ,{email:null}
                            ,{name:null}
                        ]};
    }

    useCoupon = () =>
    axios.post('./useCoupon', {
        couponId: this.couponid
    })
    ;
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
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.title}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text> SSUFUN </Text> 
                    </TouchableOpacity>
                    <Text>
                        Id : {this.state.data.id}
                    </Text>
                    <TextInput placeholder={'비밀번호'}
                               onChangeText = {(data.id) => this.setState({data.id})}/>
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

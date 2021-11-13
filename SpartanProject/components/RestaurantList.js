import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
    render() {
        return (
        <>
        <View style={styles.RestaurantList}>
          <Text>
            식당을 선택해주세요.
          </Text>
        </View>
          <ScrollView>
          </ScrollView>
        </>
      );
    }
  }

  const styles = StyleSheet.create({
    RestaurantList: {
        backgroundColor: 'aqua',
        width : wp('100%'),  // 스크린 가로 크기 100%
        height : 75, // 스크린 세로 크기 50%
        top : hp('30%'), // 스크린 세로 크기의 30% 만큼 0에서부터 이동 
        justifyContent: "center",
        alignItems: "center",
        fontSize: Dimensions.get('window').width > 500 ? 22 : 18
    },
    container: {
      backgroundColor: 'gold',
  },
  });
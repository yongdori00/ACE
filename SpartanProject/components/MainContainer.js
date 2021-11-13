import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
    render() {
        return (
        <>
        <View style={styles.main}>
        <Text 
        style={{width: 100, height:50}}>  
            Ace
        </Text>
        </View>
          <ScrollView>
          </ScrollView>
        </>
      );
    }
  }
  const styles = StyleSheet.create({
    main: {
        backgroundColor: 'aqua',
    },
  });
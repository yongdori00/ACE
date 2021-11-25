import React from 'react';
import MainComponent from './components/MainContainer';
import RestaurantList from './components/RestaurantList';
import RestaurantInformation from './components/RestaurantInformation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class HomeScreen extends React.Component{
  render(){
    return <MainComponent />;
  }
  //return <MainComponent />;
  //return <RestaurantInformationt />;
};

import React from 'react';
import MainComponent from './components/MainContainer';
import RestaurantList from './components/RestaurantList';
import AboutRestaurant from './components/AboutRestaurant';
<<<<<<< HEAD
import Login from './components/Login';
import Register from './components/Register';

const IScrolledDownAndWhatHappenedNextShockedMe = () => {
  //return <RestaurantList />;
=======
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class HomeScreen extends React.Component{
  render(){
    return <MainComponent />;
  }
>>>>>>> f5b6ceb5b0672e334da4713116337052b9e2b748
  //return <MainComponent />;
  //return <AboutRestaurantt />;
  //return <Login />;
  return <Register />;
};

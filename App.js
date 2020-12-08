import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabBar from './src/TabBar'
import InboundDetail from './src/Home/InboundDetail'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'antoutline': require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
      'antfill': require('@ant-design/icons-react-native/fonts/antfill.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <TabBar navigation={this.props.navigation} />
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
              <Stack.Screen name="InboundDetail" component={InboundDetail} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}
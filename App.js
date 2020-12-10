import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabBar from './src/TabBar'
import Login from './src/Login'
import InboundDetail from './src/Home/InboundDetail'
import InboundSubDetail from './src/Home/InboundSubDetail'
import AddInboundMaterial from './src/Home/AddInboundMaterial'
import AddInboundDetail from './src/Home/AddInboundDetail'
import AddInboundSubDetail from './src/Home/AddInboundSubDetail'
import Camera from './src/template/Camera'
import ImageView from './src/template/ImageView'

import { getAuthUser } from './src/helper'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pegawai: {},
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

    getAuthUser().then(value => {
      this.setState({
        pegawai: value,
        isReady: true
      });
    })
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#F0EFF4' barStyle='dark-content' />
        {!this.state.pegawai.isLogin ?
          <Login navigation={this.props.navigation} />
          :
          <TabBar navigation={this.props.navigation} />
        }
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
        <Stack.Screen name="TabBar" component={TabBar} options={{ title: 'Poca', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#F0EFF4' } }} />
        <Stack.Screen name="InboundDetail" component={InboundDetail} options={{ title: 'Detail Inbound', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#F0EFF4' } }} />
        <Stack.Screen name="InboundSubDetail" component={InboundSubDetail} options={{ title: 'Detail Inbound', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#F0EFF4' } }} />
        <Stack.Screen name="AddInboundMaterial" component={AddInboundMaterial} options={{ title: 'Inbound Material', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#F0EFF4' } }} />
        <Stack.Screen name="AddInboundDetail" component={AddInboundDetail} options={{ title: 'Inbound Detail', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#F0EFF4' } }} />
        <Stack.Screen name="AddInboundSubDetail" component={AddInboundSubDetail} options={{ title: 'Inbound Detail', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#F0EFF4' } }} />
        <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
        <Stack.Screen name="ImageView" component={ImageView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
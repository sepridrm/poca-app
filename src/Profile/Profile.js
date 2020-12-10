import { Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';

import { getColor, getAuthUser, getUrl } from '../helper'
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pegawai: {
        team_leader: {}
      }
    };
  }

  componentDidMount() {
    getAuthUser().then(value => {
      console.log(value);
      this.setState({
        pegawai: value
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
        <View style={{ padding: 3, backgroundColor: getColor.button, borderRadius: 50, marginTop: 50 }}>
          <Thumbnail large source={{ uri: getUrl.baseURLimage+this.state.pegawai.path_foto }} />
        </View>

        <List renderHeader="Profil detail" style={{ width: '100%', marginTop: 20 }}>
          <List.Item arrow="horizontal" extra={this.state.pegawai.nama} >Nama</List.Item>
          <List.Item arrow="horizontal" extra={this.state.pegawai.email} >Email</List.Item>
          <List.Item arrow="horizontal" extra={this.state.pegawai.nomor_telepon} >Nomor telepon</List.Item>
          <List.Item arrow="horizontal" extra={this.state.pegawai.nama_team} >Team</List.Item>
          <List.Item arrow="horizontal" extra={this.state.pegawai.team_leader.nama} >Team Leader</List.Item>

          <List.Item style={{ backgroundColor: 'red' }} arrow="horizontal" onPress={() => logout(this.props.navigation)}>Keluar</List.Item>
        </List>
      </View>
    );
  }
}

function logout(navigation) {
  Alert.alert("Konfirmasi", "Keluar dari akun?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Ok", onPress: () => AsyncStorage.clear().then(() => navigation.replace('App')) }
    ]);
}

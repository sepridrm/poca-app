import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Keyboard, AsyncStorage, ScrollView } from 'react-native';
import { Item, Input, Icon, Button, Root, Toast } from 'native-base';

import { getSize, setAuthUser } from './helper'
import API from './api'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'bambang@gmail.com',
            password: '12345'
        };
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        if (this.state.email === '' || this.state.password === '') {
            Toast.show({
                text: "Mohon lengkapi data.",
                type: "danger"
            })
        } else {
            API.post('login/', this.state)
                .then(res => {
                    // console.log(res);
                    if (res.data.status == 'Ok') {
                        setAuthUser(res.data.data).then(value => {
                            value ?
                                this.props.navigation.replace('TabBar')
                                :
                                Toast.show({
                                    text: 'Gagal menyimpan data. Silahkan coba lagi.',
                                    type: "danger"
                                })
                        })
                    } else {
                        Toast.show({
                            text: res.data.message,
                            type: "danger"
                        })
                    }
                }).catch(err => {
                    Toast.show({
                        text: err.message,
                        type: "danger"
                    })
                })
        }
    }

    render() {
        return (
            <Root>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 20, alignContent: 'center', alignItems: 'center', paddingVertical: getSize.widthScreen / 2.5 }}>
                        <Image
                            style={{ width: getSize.widthScreen / 2.2, height: getSize.widthScreen / 2.2, resizeMode: 'center' }}
                            source={require('../assets/icon.png')}
                        />
                        <Item rounded style={{ marginTop: 30, width: '100%' }}>
                            <Icon active name='ios-mail' style={{ marginLeft: 10, color: 'grey' }} />
                            <Input keyboardType='email-address' placeholder='Alamat email' style={{ fontSize: 15 }} value={this.state.email} onChangeText={text => this.setState({ email: text })} />
                        </Item>
                        <Item rounded style={{ marginTop: 10, width: '100%' }}>
                            <Icon active name='ios-lock' style={{ marginLeft: 10, color: 'grey' }} />
                            <Input secureTextEntry={true} placeholder='Kata sandi' style={{ fontSize: 15 }} value={this.state.password} onChangeText={text => this.setState({ password: text })} />
                        </Item>

                        {/* {this.state.loading ?
                        <Button rounded disabled style={{ marginTop: 30, width: '100%' }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Masuk</Text>
                        </Button>
                        : */}
                        <Button rounded info style={{ marginTop: 30, width: '100%' }} onPress={this.onLogin}>
                            <Text style={{ width: '100%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Login</Text>
                        </Button>
                        {/* } */}

                        {/* <View style={{ flexGrow: 1, flexDirection: 'column-reverse', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Belum punya akun ? </Text>
                            <Text style={{ color: 'green', fontWeight: 'bold', padding: 5 }} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up </Text>
                        </View>
                    </View> */}
                    </View>
                </ScrollView>
            </Root>
        );
    }
}

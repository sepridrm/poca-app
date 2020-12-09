import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';

import { getColor, getRandomChar, getAuthUser } from '../helper'
import API from '../api'
import { Root, Toast } from 'native-base';

export default class AddInboundMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pegawai: {},
            du_id: getRandomChar(),
            du_name: '',
            id_sub_region: null,
            id_operator: null,
            list_sub_region: [],
            list_operator: [],
        };

        this.onSave = this.onSave.bind(this)
    }

    componentDidMount() {
        getAuthUser().then(value => {
            this.setState({
                pegawai: value
            })
        })
        this.getCustomers()
        this.getRegions()
    }

    getRegions() {
        API.get('region')
            .then(res => {
                // console.log(res.data);
                if (res.data.status == 'Ok') {
                    let list = []
                    res.data.data.forEach((element, index) => {
                        list[index] = { label: element.nama_region + ", " + element.nama_sub_region, value: element.id_sub_region }
                    });
                    this.setState({
                        list_sub_region: list
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

    getCustomers() {
        API.get('customer')
            .then(res => {
                // console.log(res.data);
                if (res.data.status == 'Ok') {
                    let list = []
                    res.data.data.forEach((element, index) => {
                        list[index] = { label: element.nama_customer + " (" + element.nama_operator + ")", value: element.id_operator }
                    });
                    this.setState({
                        list_operator: list
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

    onSave() {
        if (this.state.du_id === '' || this.state.du_name === '' || this.state.id_sub_region === null || this.state.id_operator === null) {
            Toast.show({
                text: 'Mohon lengkapi data.',
                type: "danger"
            })
        } else {
            const data = {
                id_pegawai: this.state.pegawai.id,
                du_id: this.state.du_id,
                du_name: this.state.du_name,
                id_sub_region: this.state.id_sub_region[0],
                id_operator: this.state.id_operator[0]
            }

            API.post('inbond', data)
                .then(res => {
                    // console.log(res);
                    if (res.data.status == 'Ok') {
                        this.props.route.params.getInbond()
                        Toast.show({
                            text: res.data.message,
                            type: "success"
                        })
                        this.setState({
                            du_id: '',
                            du_name: '',
                            id_sub_region: null,
                            id_operator: null
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
                <Provider>
                    <List renderHeader="Input Inbound Material">
                        <InputItem
                            textAlign="right" clear value={this.state.du_id} onChangeText={text => this.setState({ du_id: text })} placeholder="Masukkan DU ID"
                        >DU ID</InputItem>

                        <InputItem
                            textAlign="right" clear value={this.state.du_name} onChangeText={text => this.setState({ du_name: text })} placeholder="Masukkan DU Name"
                        >DU Name</InputItem>

                        <Picker
                            data={this.state.list_sub_region}
                            cols={1}
                            value={this.state.id_sub_region}
                            onChange={value => this.setState({ id_sub_region: value })}
                            okText="Ok"
                            dismissText="Cancel"
                            extra="Select one"
                        >
                            <List.Item arrow="horizontal">
                                Region, Sub Region
                                </List.Item>
                        </Picker>

                        <Picker
                            data={this.state.list_operator}
                            cols={1}
                            value={this.state.id_operator}
                            onChange={value => this.setState({ id_operator: value })}
                            okText="Ok"
                            dismissText="Cancel"
                            extra="Select one"
                        >
                            <List.Item arrow="horizontal">
                                Customer (Operator)
                                </List.Item>
                        </Picker>
                        <List.Item style={{ backgroundColor: getColor.button }} arrow="horizontal" onPress={() => this.onSave()}>Simpan</List.Item>
                    </List>
                </Provider>
            </Root>
        );
    }
}

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';

import { getColor } from '../helper'
import API from '../api'
import { Root, Toast } from 'native-base';

export default class AddInboundMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            qty: '',
            id_material: null,
            list_material: [],
        };
        this.onSave = this.onSave.bind(this)
    }

    componentDidMount() {
        this.getMaterial()
    }

    getMaterial() {
        API.get('material')
            .then(res => {
                // console.log(res.data);
                if (res.data.status == 'Ok') {
                    let list = []
                    res.data.data.forEach((element, index) => {
                        list[index] = { label: element.nama_material, value: element.id }
                    });
                    this.setState({
                        list_material: list
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
        if (this.state.id_material === null || this.state.qty === '') {
            Toast.show({
                text: 'Mohon lengkapi data.',
                type: "danger"
            })
        } else {
            const data = {
                id_inbond_material: this.state.item.id,
                id_material: this.state.id_material[0],
                qty: this.state.qty,
            }

            console.log(data);

            API.post('inbond-detail', data)
                .then(res => {
                    // console.log(res);
                    if (res.data.status == 'Ok') {
                        this.props.route.params.getInbondDetail()
                        Toast.show({
                            text: res.data.message,
                            type: "success"
                        })
                        this.setState({
                            id_material: null,
                            qty: ''
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
                    <List renderHeader="Input Inbound Detail">
                        <Picker
                            data={this.state.list_material}
                            cols={1}
                            value={this.state.id_material}
                            onChange={value => this.setState({ id_material: value })}
                            okText="Ok"
                            dismissText="Cancel"
                            extra="Select one"
                        >
                            <List.Item arrow="horizontal">
                                Material
                                </List.Item>
                        </Picker>

                        <InputItem
                            type="number" textAlign="right" clear value={this.state.qty} onChangeText={text => this.setState({ qty: text })} placeholder="Masukkan qty"
                        >Qty</InputItem>
                        <List.Item style={{ backgroundColor: getColor.button }} arrow="horizontal" onPress={() => this.onSave()}>Simpan</List.Item>
                    </List>
                </Provider>
            </Root>
        );
    }
}

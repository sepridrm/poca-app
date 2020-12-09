import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';

import { getColor } from '../helper'

export default class AddInboundMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: '',
            id_material: null,
            list_material: [
                { label: "WRFA", value: "0" },
                { label: "WRFU", value: "1" },
            ],
        };
    }

    render() {
        return (
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
                    <List.Item style={{ backgroundColor: getColor.button }} arrow="horizontal" onPress={() => { }}>Simpan</List.Item>
                </List>
            </Provider>
        );
    }
}

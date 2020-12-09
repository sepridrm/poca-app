import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';

import { getColor } from '../helper'

export default class AddInboundMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            serial_number: '',
            keterangan: null,
            path_foto: null,
            list_keterangan: [
                { label: "Serial Number rusak", value: "Serial Number rusak" },
                { label: "Serial Number tidak ada", value: "Serial Number tidak ada" },
            ],
        };
    }

    render() {
        return (
            <Provider>
                <List renderHeader="Input Inbound Detail">
                    <InputItem
                        textAlign="right" clear value={this.state.type} onChangeText={text => this.setState({ type: text })} placeholder="Masukkan type"
                    >Type</InputItem>
                    <InputItem
                        textAlign="right" clear value={this.state.serial_number} onChangeText={text => this.setState({ serial_number: text })} placeholder="Masukkan serial number"
                    >Serial Number</InputItem>

                    <Picker
                        data={this.state.list_keterangan}
                        cols={1}
                        value={this.state.keterangan}
                        onChange={value => this.setState({ keterangan: value })}
                        okText="Ok"
                        dismissText="Cancel"
                        extra="Select one"
                    >
                        <List.Item arrow="horizontal">
                            Keterangan
                                </List.Item>
                    </Picker>

                    <List.Item style={{ backgroundColor: getColor.button }} arrow="horizontal" onPress={() => { }}>Simpan</List.Item>
                </List>
            </Provider>
        );
    }
}

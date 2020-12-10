import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';

import { getColor, getRandomChar } from '../helper'
import { Root, Thumbnail, Toast } from 'native-base';

import API from '../api'

export default class AddInboundMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            type: '',
            serial_number: '',
            keterangan: null,
            path_foto: null,
            list_keterangan: [
                { label: "Serial Number rusak", value: "Serial Number rusak" },
                { label: "Serial Number tidak ada", value: "Serial Number tidak ada" },
            ],
        };
        this.onSave = this.onSave.bind(this)
        this.setFoto = this.setFoto.bind(this)
    }

    setFoto(foto) {
        const data = {
            uri: foto.uri,
            type: 'image/jpg',
            name: 'image.jpg',
        }
        this.setState({
            path_foto: data
        })
    }

    onSave() {
        if (this.state.type === null || this.state.serial_number === '' || this.state.path_foto === null) {
            Toast.show({
                text: 'Mohon lengkapi data.',
                type: "danger"
            })
        } else {
            let formData = new FormData();
            formData.append('id_detail_inbond_material', this.state.item.id);
            formData.append('type', this.state.type);
            formData.append('serial_number', this.state.serial_number);
            if (this.state.keterangan) {
                formData.append('keterangan', this.state.keterangan[0]);
            }
            formData.append('path_foto', this.state.path_foto);

            API.post('inbond-subdetail', formData)
                .then(res => {
                    // console.log(res);
                    if (res.data.status == 'Ok') {
                        this.props.route.params.getInbondSubDetail()
                        Toast.show({
                            text: res.data.message,
                            type: "success"
                        })
                        this.setState({
                            type: '',
                            serial_number: '',
                            keterangan: null,
                            path_foto: null,
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
                        <List.Item arrow="horizontal" onPress={() => this.props.navigation.navigate('Camera', { setFoto: this.setFoto })} extra={this.state.path_foto === null ? null : <Thumbnail small source={{ uri: this.state.path_foto.uri }} />}>Ambil Foto</List.Item>

                        <List.Item style={{ backgroundColor: getColor.button }} arrow="horizontal" onPress={() => this.onSave()}>Simpan</List.Item>
                    </List>
                </Provider>
            </Root>
        );
    }
}

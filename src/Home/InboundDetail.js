import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';
import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { Button, Fab, Icon } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

import { getAuthUser, getColor } from '../helper'
import API from '../api'
import NoData from '../template/NoData'

export default class InboundDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pegawai: {},
            item: props.route.params.item,
            data: []
        };
        this.getInbondDetail = this.getInbondDetail.bind(this)
    }

    componentDidMount() {
        getAuthUser().then(value => {
            this.setState({
                pegawai: value
            })
        })
        this.getInbondDetail()
    }

    getInbondDetail() {
        API.get('inbond-detail/' + this.state.item.id)
            .then(res => {
                // console.log(res.data);
                if (res.data.status == 'Ok') {
                    this.setState({
                        data: res.data.data
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

    render() {
        return (
            <Provider>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <View style={{ paddingHorizontal: 10, backgroundColor: getColor.devider }}>
                        <Text style={{ fontWeight: 'bold' }}>Pegawai : {this.state.item.nama}</Text>
                        <Text style={{ fontWeight: 'bold' }}>DU ID : {this.state.item.du_id}</Text>
                        <Text>DU Name: {this.state.item.du_name}</Text>
                        <Text>Region, Sub Region: {this.state.item.nama_region}, {this.state.item.nama_sub_region}</Text>
                        <Text>Customer (operator): {this.state.item.nama_customer} ({this.state.item.nama_operator})</Text>
                    </View>
                    <SearchBar placeholder="Search" showCancelButton cancelText={'Cancel'} />

                    {this.state.data.length === 0 ?
                        <NoData />
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                ItemList(item, index, this.state.data.length - 1, this.props.navigation, this.state.item)
                            }
                        />
                    }

                    {this.state.pegawai.id === this.state.item.id_pegawai ?
                        <Fab
                            style={{ backgroundColor: getColor.button }}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate("AddInboundDetail", { item: this.state.item, getInbondDetail: this.getInbondDetail })}>
                            <Icon name="add" />
                        </Fab>
                        : null}
                </View>
            </Provider>
        );
    }
}

function ItemList(item, index, count, navigation, item_material) {
    return (
        <TouchableHighlight onPress={() => navigation.navigate('InboundSubDetail', { item: item, item_material: item_material })}>
            <List>
                <List.Item
                    wrap
                    extra={item.qty + " pcs"}
                    multipleLine
                    align="top"
                    arrow="horizontal"
                >
                    {item.nama_material}
                </List.Item>
            </List>
        </TouchableHighlight>
    )
}
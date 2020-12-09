import { InputItem, List, Picker, Provider, SearchBar } from '@ant-design/react-native';
import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { Button, Fab, Icon } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

import { getColor } from '../helper'

export default class InboundDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            data: [
                { id: '0', nama_material: 'WRFU', qty: 3 },
                { id: '1', nama_material: 'WRFA', qty: 6 },
                { id: '2', nama_material: 'WFA', qty: 8 },
            ]
        };
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
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            ItemList(item, index, this.state.data.length - 1, this.props.navigation)
                        }
                    />

                    <Fab
                        style={{ backgroundColor: getColor.button }}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate("AddInboundDetail")}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Provider>
        );
    }
}

function ItemList(item, index, count, navigation) {
    return (
        <TouchableHighlight onPress={() => navigation.navigate('InboundSubDetail', { item: item })}>
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
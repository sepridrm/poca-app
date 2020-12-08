import { List, SearchBar } from '@ant-design/react-native';
import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: '0', du_id: 'KJBKJS12879HJGK', du_name: 'Alang-alang Lebar', nama_region: 'Sumatera', nama_sub_region: 'Palembang', nama_customer: 'Huawei', nama_operator: 'Xl' },
                { id: '1', du_id: 'KJBKJS12879HJGK', du_name: 'Alang-alang Lebar', nama_region: 'Sumatera', nama_sub_region: 'Palembang', nama_customer: 'Huawei', nama_operator: 'Xl' },
                { id: '2', du_id: 'KJBKJS12879HJGK', du_name: 'Alang-alang Lebar', nama_region: 'Sumatera', nama_sub_region: 'Palembang', nama_customer: 'Huawei', nama_operator: 'Xl' },
                { id: '3', du_id: 'KJBKJS12879HJGK', du_name: 'Alang-alang Lebar', nama_region: 'Sumatera', nama_sub_region: 'Palembang', nama_customer: 'Huawei', nama_operator: 'Xl' },
            ]
        };
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton cancelText={'Cancel'} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        ItemList(item, index, this.state.data.length - 1, this.props.navigation)
                    }
                />
                <View style={{ padding: 10, }}>
                    <Button style={{ width: '100%', justifyContent: 'center' }} iconLeft rounded info><Text>Tambah</Text></Button>
                </View>
            </View>
        );
    }
}

function ItemList(item, index, count, navigation) {
    return (
        <TouchableHighlight onPress={() => navigation.navigate('InboundDetail')}>
            <List>
                <List.Item
                    wrap
                    extra={item.nama_customer+" ("+item.nama_operator+")"}
                    multipleLine
                    align="top"
                    arrow="horizontal"
                >
                    {item.du_id}
                    <Brief>{item.du_name}</Brief>
                    <Brief>{item.nama_sub_region}</Brief>
                    <Brief>{item.nama_region}</Brief>
                </List.Item>
            </List>
        </TouchableHighlight>
    )
}
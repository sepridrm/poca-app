import { Provider, SearchBar } from '@ant-design/react-native';
import { Card, CardItem, Fab, Icon, Body, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import { getColor } from '../helper'

export default class InboundDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            data: [
                { id: '0', type: 'Single', serial_number: 'KLJK857SF', path_foto: 'https://mangaplus.shueisha.co.jp/drm/title/100020/title_thumbnail_main/10687.jpg?key=d35d1f2e8e6116ae0a5440666173b68e&duration=86400', keterangan: '' },
                { id: '1', type: 'Single', serial_number: 'KLJK857SF', path_foto: 'https://mangaplus.shueisha.co.jp/drm/title/100020/title_thumbnail_main/10687.jpg?key=d35d1f2e8e6116ae0a5440666173b68e&duration=86400', keterangan: '' },
                { id: '3', type: 'Single', serial_number: 'KLJK857SF', path_foto: 'https://mangaplus.shueisha.co.jp/drm/title/100020/title_thumbnail_main/10687.jpg?key=d35d1f2e8e6116ae0a5440666173b68e&duration=86400', keterangan: '' },
            ]
        };
    }

    render() {
        return (
            <Provider>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <View style={{ paddingHorizontal: 10, backgroundColor: getColor.devider }}>
                        <Text style={{ fontWeight: 'bold' }}>Material : {this.state.item.nama_material}</Text>
                        <Text>Qty: {this.state.item.qty}</Text>
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
                        onPress={() => this.props.navigation.navigate("AddInboundSubDetail")}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Provider>
        );
    }
}

function ItemList(item, index, count, navigation) {
    return (
        <TouchableOpacity onPress={() => null}>
            <Card style={{ elevation: 0, marginLeft: 10, marginRight: 10, padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ padding: 3, backgroundColor: getColor.button, borderRadius: 40 }}>
                        <Thumbnail source={{ uri: item.path_foto }} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.serial_number}</Text>
                        <Text>{item.type}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}
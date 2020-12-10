import { Provider, SearchBar } from '@ant-design/react-native';
import { Card, CardItem, Fab, Icon, Body, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { getColor, getUrl, getAuthUser } from '../helper'
import API from '../api'
import NoData from '../template/NoData'

export default class InboundDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pegawai: {},
            item: props.route.params.item,
            item_material: props.route.params.item_material,
            data: []
        };
        this.getInbondSubDetail = this.getInbondSubDetail.bind(this)
    }

    componentDidMount() {
        getAuthUser().then(value => {
            this.setState({
                pegawai: value
            })
        })
        this.getInbondSubDetail()
    }

    getInbondSubDetail() {
        API.get('inbond-subdetail/' + this.state.item.id)
            .then(res => {
                // console.log(res.data);
                if (res.data.status == 'Ok') {
                    if (res.data.data.length % 2 !== 0) {
                        let tempArr = res.data.data.concat({});
                        this.setState({ data: tempArr })
                    } else {
                        this.setState({
                            data: res.data.data
                        })
                    }
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
                <StatusBar />
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <View style={{ paddingHorizontal: 10, backgroundColor: getColor.devider }}>
                        <Text style={{ fontWeight: 'bold' }}>Material : {this.state.item.nama_material}</Text>
                        <Text>Qty: {this.state.item.qty}</Text>
                    </View>
                    <SearchBar placeholder="Search" showCancelButton cancelText={'Cancel'} />

                    {this.state.data.length === 0 ?
                        <NoData />
                        :
                        <FlatList
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                ItemList(item, index, this.state.data.length - 1, this.props.navigation)
                            }
                        />
                    }

                    {this.state.pegawai.id === this.state.item_material.id_pegawai ?
                        <Fab
                            style={{ backgroundColor: getColor.button }}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate("AddInboundSubDetail", { item: this.state.item, getInbondSubDetail: this.getInbondSubDetail })}>
                            <Icon name="add" />
                        </Fab>
                        : null}
                </View>
            </Provider>
        );
    }
}

function ItemList(item, index, count, navigation) {
    return (
        !item.id ?
            <View style={{ flex: 1 }} />
            :
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ImageView', {uri: getUrl.baseURLimage + item.path_foto})}>
                    <Card style={{ flex: 1, flexDirection: 'column', marginRight: index % 2 === 0 ? 5 : 15, marginLeft: index % 2 === 0 ? 15 : 5, marginTop: 7, marginBottom: 7, borderRadius: 15, elevation: 0 }}>
                        <Thumbnail square resizeMethod="resize" source={{ uri: getUrl.baseURLimage + item.path_foto }} style={{ width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>SN : {item.serial_number}</Text>
                            <Text>Type : {item.type}</Text>
                            {item.keterangan ?
                                <Text>{item.keterangan}</Text>
                                : null}
                        </View>
                    </Card>
                </TouchableWithoutFeedback>
            </View>
    )
}
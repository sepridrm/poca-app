import { Card, InputItem, List, Picker, Provider, SearchBar, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { Button, Fab, Icon, Root, Toast } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import { getColor, getUrl } from '../helper'
import API from '../api'
import NoData from '../template/NoData'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getInbond = this.getInbond.bind(this)
    }

    componentDidMount() {
        this.getInbond()
    }

    getInbond() {
        API.get('inbond')
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
            <Root>
                <Provider>
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                        <SearchBar placeholder="Search" showCancelButton cancelText={'Cancel'} />
                        {this.state.data.length === 0 ?
                            <NoData />
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    ItemList(item, index, this.state.data.length - 1, this.props.navigation)
                                }
                            />
                        }

                        <Fab
                            style={{ backgroundColor: getColor.button }}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate("AddInboundMaterial", { getInbond: this.getInbond })}>
                            <Icon name="add" />
                        </Fab>
                    </View>
                </Provider>
            </Root>
        );
    }
}

function ItemList(item, index, count, navigation) {
    return (

        // <TouchableHighlight onPress={() => navigation.navigate('InboundDetail', { item: item })}>
        //     <List>
        //         <List.Item
        //             wrap
        //             extra={
        //                 <View>
        //                   <Brief style={{ textAlign: 'right' }}>{item.nama_customer + " (" + item.nama_operator + ")"}</Brief>
        //                   <Brief style={{ textAlign: 'right' }}>{item.nama}</Brief>
        //                 </View>
        //               }
        //             multipleLine
        //             align="top"
        //             arrow="horizontal"
        //         >
        //             {item.du_id}
        //             <Brief>{item.du_name}</Brief>
        //             <Brief>{item.nama_region}, {item.nama_sub_region}</Brief>
        //         </List.Item>
        //     </List>
        // </TouchableHighlight>

        <TouchableOpacity onPress={() => navigation.navigate('InboundDetail', { item: item })}>
            <WingBlank size="lg">
                <WhiteSpace size="sm" />
                <Card>
                    <Card.Header
                        title={item.nama}
                        thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
                        thumb={getUrl.baseURLimage + item.path_foto}
                    // extra="this is extra"
                    />
                    <Card.Body>
                        <View style={{ marginLeft: 15 }}>
                            <Text>{item.du_id}</Text>
                            <Brief>{item.du_name}</Brief>
                            <Brief>{item.nama_region}, {item.nama_sub_region}</Brief>
                        </View>
                    </Card.Body>
                    <Card.Footer
                        // content="footer content"
                        extra={item.nama_customer + " (" + item.nama_operator + ")"}
                    />
                </Card>
                <WhiteSpace size="sm" />
            </WingBlank>
        </TouchableOpacity>
    )
}
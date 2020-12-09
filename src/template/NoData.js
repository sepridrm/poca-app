import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default function NoData() {
    return (
        <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ color: '#626262' }}>Data not available</Text>
        </View>
    )
}
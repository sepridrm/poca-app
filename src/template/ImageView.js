import { Icon } from 'native-base';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const images = [{
            url: this.props.route.params.uri,
        }]
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageViewer imageUrls={images} backgroundColor='white' enableSwipeDown={true} onSwipeDown={() => this.props.navigation.goBack()} />
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', width: '100%', position: 'absolute', top: 0, paddingHorizontal: 10 }}>
                    <TouchableWithoutFeedback style={{ padding: 15 }} onPress={() => this.props.navigation.goBack()} >
                        <Icon name="md-arrow-round-back" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

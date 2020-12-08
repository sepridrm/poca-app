import React, { Component } from 'react';
import { Icon, TabBar } from '@ant-design/react-native';

import Home from './Home/Home'
import Profile from './Profile/Profile'


export default class TabBarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'homeTab',
        };
    }

    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }
    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#f5f5f5"
            >
                <TabBar.Item
                    title="Home"
                    icon={<Icon name="home" />}
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => this.onChangeTab('homeTab')}
                >
                    <Home navigation={this.props.navigation} />
                </TabBar.Item>

                {/* <TabBar.Item
                    icon={<Icon name="ordered-list" />}
                    title="Koubei"
                    badge={2}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => this.onChangeTab('redTab')}
                >
                    {this.renderContent('Koubei Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="like" />}
                    title="Friend"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => this.onChangeTab('greenTab')}
                >
                    {this.renderContent('Friend Tab')}
                </TabBar.Item> */}

                <TabBar.Item
                    icon={<Icon name="user" />}
                    title="Profile"
                    selected={this.state.selectedTab === 'profileTab'}
                    onPress={() => this.onChangeTab('profileTab')}
                >
                    <Profile navigation={this.props.navigation} />
                </TabBar.Item>
            </TabBar>
        );
    }
}
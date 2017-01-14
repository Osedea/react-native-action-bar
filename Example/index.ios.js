/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ActionBar from 'react-native-action-bar';

export default class Example extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActionBar
                    containerStyle={styles.bar}
                    title={'React-native-action-bar Example'}
                    rightText={'Hello'}
                    leftIconName={'menu'}
                    leftBadge={''}
                    onLeftPress={() => console.log('Left!')}
                    onTitlePress={() => console.log('Title!')}
                    rightIcons={[
                        {
                            name: 'star',
                            badge: '1',
                            onPress: () => console.log('Right Star !'),
                        },
                        {
                            name: 'phone',
                            badge: '1',
                            onPress: () => console.log('Right Phone !'),
                            isBadgeLeft: true,
                        },
                        {
                            name: 'plus',
                            onPress: () => console.log('Right Plus !'),
                        },
                        {
                            name: 'flag',
                            badge: '1',
                            onPress: () => console.log('Right Flag !'),
                        },
                    ]}
                />
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('Example', () => Example);

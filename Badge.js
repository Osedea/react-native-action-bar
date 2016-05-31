import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CC0000',
        borderRadius: 10,
        height: 15,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
    },
    badgeText: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 1,
        fontSize: 10,
    },
    leftBadge: {
        left: 5,
    },
    rightBadge: {
        right: 5,
    },
});

export default class Badge extends Component {
    static propTypes = {
        isLeft: React.PropTypes.bool,
        number: React.PropTypes.number,
    };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    { width: 10 + String(this.props.number).length * 5 },
                    this.props.isLeft
                        ? styles.leftBadge
                        : styles.rightBadge,
                ]}
            >
                <Text style={styles.badgeText}>{this.props.number}</Text>
            </View>
        );
    }
}

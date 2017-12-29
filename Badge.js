import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'proptypes';

export default class Badge extends Component {
    static propTypes = {
        backgroundColor: PropTypes.string,
        color: PropTypes.string,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        isLeft: PropTypes.bool,
    };

    static defaultProps = {
        backgroundColor: '#FF0000',
        color: '#FFFFFF',
    }

    render() {
        return (
            <View
                style={[
                    styles.container,
                    {
                        width: 10 + (String(this.props.content).length * 5),
                        backgroundColor: this.props.backgroundColor,
                    },
                    this.props.isLeft
                        ? styles.leftBadge
                        : styles.rightBadge,
                ]}
            >
                <Text
                    style={[
                        styles.badgeText,
                        { color: this.props.color },
                    ]}
                >
                    {this.props.content}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 15,
        minWidth: 15,
        overflow: 'hidden',
        position: 'absolute',
        top: 2,
    },
    badgeText: {
        textAlign: 'center',
        marginTop: 1,
        fontSize: 10,
    },
    leftBadge: {
        left: 2,
    },
    rightBadge: {
        right: 2,
    },
});

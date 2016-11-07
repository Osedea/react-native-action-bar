/**
*
*
* @class
* @classdesc ActionBar Component
* @extends React.Component
*
*
* @author Adrien Thiery <adrien.thiery@osedea.com>
* @version 0.1.0
*
* @copyright Osedea
*
*/

import React, { Component } from 'react';

import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { throttle } from 'lodash';

import Badge from './Badge';
import Spinner from 'react-native-gifted-spinner';
import { Actions } from 'react-native-router-flux';

const colors = {
    defaultTextAndIconColor: '#FFFFFF',
};

const styles = StyleSheet.create({
    container: {
        height: (Platform.OS === 'ios') ? 50 : 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: -3,
        marginBottom: 5,
    },
    leftIconStyle: {
        marginLeft: 10,
    },
    rightIconStyle: {
        marginRight: 5,
        marginLeft: 5,
    },
    child: {
        flex: 1,
        paddingLeft: 5,
        padding: 10,
        paddingBottom: 5,
        flexDirection: 'row',
    },
    leftChild: {
        justifyContent: 'flex-start',
    },
    rightChild: {
        justifyContent: 'flex-end',
    },
    touchButton: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    titleContainer: {
        flex: 2,
        alignSelf: 'flex-end',
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 10,
        color: colors.defaultTextAndIconColor,
        fontWeight: 'bold',
    },
    rightText: {
        textAlign: 'right',
        marginRight: 5,
    },
    text: {
        color: colors.defaultTextAndIconColor,
        marginBottom: 5,
    },
    leftText: {
        textAlign: 'left',
        marginLeft: 10,
    },
});

export default class ActionBar extends Component {
    static propTypes = {
        backgroundColor: React.PropTypes.string,
        iconStyle: Image.propTypes.style,
        leftBadge: React.PropTypes.number,
        leftIconName: React.PropTypes.string,
        leftIconImage: React.PropTypes.number,
        leftIconStyle: Image.propTypes.style,
        leftText: React.PropTypes.string,
        leftTextStyle: Text.propTypes.style,
        onLeftPress: React.PropTypes.func,
        onRightPress: React.PropTypes.func,
        onTitlePress: React.PropTypes.func,
        rightBadge: React.PropTypes.number,
        rightIconName: React.PropTypes.string,
        rightIconImage: React.PropTypes.number,
        rightIconStyle: Image.propTypes.style,
        rightText: React.PropTypes.string,
        rightTextStyle: Text.propTypes.style,
        sideTouchableStyle: View.propTypes.style,
        style: View.propTypes.style,
        title: React.PropTypes.string,
        titleContainerStyle: View.propTypes.style,
        titleStyle: Text.propTypes.style,
    };

    static defaultProps = {
        title: '',
        leftIconName: 'back',
        backgroundColor: colors.darkGrey,
        onLeftPress: Actions.pop,
        iconStyle: {
            tintColor: colors.defaultTextAndIconColor,
        }
    };

    constructor(props) {
        super(props);

        this.handleLeftPress = throttle(
            props.onLeftPress,
            750,
            { trailing: false }
        );
    }

    getIcon = (icon, name, leftOrRightStyle) => {

        switch (name) {
            case 'back':
                icon = require('./ActionBarImages/back.png');
                break;
            case 'star':
                icon = require('./ActionBarImages/star.png');
                break;
            case 'phone':
                icon = require('./ActionBarImages/phone.png');
                break;
            case 'plus':
                icon = require('./ActionBarImages/plus.png');
                break;
            case 'starOutline':
                icon = require('./ActionBarImages/star_outline.png');
                break;
            case 'flag':
                icon = require('./ActionBarImages/flag.png');
                break;
            case 'menu':
                icon = require('./ActionBarImages/hamburger.png');
                break;
            case 'none':
            case 'loading':
                break;
            default:
                icon = require('./ActionBarImages/back.png');
        }

        if (icon) {
            return (
                <Image
                    style={[
                        styles.icon,
                        this.props.iconStyle,
                        styles[leftOrRightStyle],
                        this.props[leftOrRightStyle],
                    ]}
                    source={icon}
                />
            );
        } else if (name === 'loading') {
            return (
                <View style={styles[leftOrRightStyle]}>
                    <Spinner />
                </View>
            );
        } else if (name === 'none') {
            // Don't render anything
            return null;
        } else {
            console.log('Invalid icon name ?');

            return null;
        }
    };

    render() {
        let leftImage = null;
        let rightImage = null;

        if (this.props.leftIconName) {
            leftImage = this.getIcon(null, this.props.leftIconName, 'leftIconStyle');
        }
        if(this.props.leftIconImage) {
            leftImage = this.getIcon(this.props.leftIconImage, 'none', 'leftIconStyle');
        }
        if (this.props.rightIconName) {
            rightImage = this.getIcon(null, this.props.rightIconName, 'rightIconStyle');
        }
        if(this.props.rightIconImage) {
            rightImage = this.getIcon(this.props.rightIconImage, 'none', 'rightIconStyle');
        }

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: this.props.backgroundColor },
                    this.props.style,
                ]}
            >
                {this.props.leftIconName === 'none'
                && !this.props.rightIconName
                && !this.props.rightText
                && !this.props.leftText
                && !this.props.leftIconImage
                && !this.props.rightIconImage
                    ? null
                    : <TouchableWithoutFeedback
                        onPress={this.handleLeftPress}
                        style={[
                            styles.touchButton,
                            this.props.sideTouchableStyle,
                        ]}
                    >
                        <View
                            style={[
                                styles.child,
                                styles.leftChild,
                            ]}
                        >
                            {this.props.leftIconName
                                ? leftImage
                                : null
                            }
                            {this.props.leftIconImage
                                ? leftImage
                                : null
                            }
                            {this.props.leftText
                                ? <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text,
                                        styles.leftText,
                                        this.props.leftTextStyle,
                                    ]}
                                >
                                    {this.props.leftText}
                                </Text>
                                : null
                            }
                            {this.props.leftBadge
                                ? <Badge
                                    isLeft={true}
                                    number={this.props.leftBadge}
                                />
                                : null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                }
                <View
                    style={[
                        styles.titleContainer,
                        this.props.titleContainerStyle,
                    ]}
                >
                    <Text
                        onPress={this.props.onTitlePress}
                        allowFontScaling={false}
                        style={[
                            styles.title,
                            this.props.titleStyle,
                        ]}
                    >
                        {this.props.title}
                    </Text>
                </View>
                {!this.props.rightIconName
                && this.props.leftIconName === 'none'
                && !this.props.rightText
                && !this.props.leftText
                && !this.props.rightIconImage
                && !this.props.leftIconImage
                    ? null
                    : <TouchableWithoutFeedback
                        onPress={this.props.onRightPress}
                    >
                        <View
                            style={[
                                styles.child,
                                styles.rightChild,
                            ]}
                        >
                            {this.props.rightText
                                ? <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text,
                                        styles.rightText,
                                        this.props.rightTextStyle
                                    ]}
                                >
                                    {this.props.rightText}
                                </Text>
                                : null
                            }
                            {this.props.rightIconName
                                ? rightImage
                                : null
                            }
                            {this.props.rightIconImage
                                ? rightImage
                                : null
                            }
                            {this.props.rightBadge
                                ? <Badge number={this.props.rightBadge} />
                                : null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
        );
    }
}

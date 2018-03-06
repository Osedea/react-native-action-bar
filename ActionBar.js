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
import PropTypes from 'proptypes';

import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ViewPropTypes,
} from 'react-native';
import { throttle } from 'lodash';
import color from 'color';

import Badge from './Badge';
import Icon from './Icon';

const colors = {
    defaultTextAndIconColor: '#FFFFFF',
    defaultSeparatorColor: '#CCCCCC',
};

export default class ActionBar extends Component {
    static propTypes = {
        allowFontScaling: PropTypes.bool,
        backgroundColor: PropTypes.string,
        badgeColor: PropTypes.string,
        badgeTextColor: PropTypes.string,
        containerStyle: ViewPropTypes.style,
        disableShadows: PropTypes.bool,
        disableStatusBarHandling: PropTypes.bool,
        elevation: PropTypes.number,
        iconContainerStyle: ViewPropTypes.style,
        iconImageStyle: Image.propTypes.style,
        isLeftBadgeLeft: PropTypes.bool,
        leftBadge: Badge.propTypes.content,
        leftIconContainerStyle: Icon.propTypes.containerStyle,
        leftIconImage: Icon.propTypes.source,
        leftIconImageStyle: Icon.propTypes.imageStyle,
        leftIconName: Icon.propTypes.name,
        leftTouchableChildStyle: ViewPropTypes.style,
        leftZoneContentContainerStyle: ViewPropTypes.style,
        onLeftPress: PropTypes.func,
        onRightTextPress: PropTypes.func,
        onTitlePress: PropTypes.func,
        renderLeftSide: PropTypes.func,
        renderRightSide: PropTypes.func,
        rightIconContainerStyle: Icon.propTypes.containerStyle,
        rightIconImageStyle: Icon.propTypes.imageStyle,
        // rightIcons: PropTypes.arrayOf(
        //     PropTypes.shape({
        //         ...Icon.propTypes,
        //         badge: Badge.propTypes.content,
        //         onPress: PropTypes.func.isRequired,
        //     })
        // ),
        rightText: PropTypes.string,
        rightTextStyle: Text.propTypes.style,
        rightTouchableChildStyle: ViewPropTypes.style,
        rightZoneContentContainerStyle: ViewPropTypes.style,
        throttleDelay: PropTypes.number,
        title: PropTypes.string,
        titleContainerStyle: ViewPropTypes.style,
        titleStyle: Text.propTypes.style,
    };

    static defaultProps = {
        allowFontScaling: false,
        backgroundColor: '#339933',
        disableShadows: false,
        disableStatusBarHandling: false,
        iconStyle: {
            tintColor: colors.defaultTextAndIconColor,
        },
        leftIconName: '',
        throttleDelay: 750,
        title: '',
        rightIcons: [],
    };

    constructor(props) {
        super(props);

        if (!props.disableStatusBarHandling) {
            this.oldBarStyle = StatusBar._defaultProps.barStyle.value;
            this.oldColor = StatusBar._defaultProps.backgroundColor.value;

            // Set BackgroundColor of Info bar according to this.props.backgroundColor
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(this.props.backgroundColor);
            } else {
                StatusBar.setBarStyle(
                    color(this.props.backgroundColor).luminosity() < 0.5
                        ? 'light-content'
                        : 'default'
                );
            }
        }
    }

    componentWillUnmount() {
        if (!this.props.disableStatusBarHandling) {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(this.oldColor);
            } else {
                StatusBar.setBarStyle(this.oldBarStyle);
            }
        }
    }

    handleLeftPress = this.props.onLeftPress
        ? throttle(
            this.props.onLeftPress,
            this.props.throttleDelay,
            { trailing: false }
        )
        : null;

    render() {
        let leftSide = this.props.renderLeftSide
            ? this.props.renderLeftSide()
            : (
                <View
                    style={[
                        styles.zoneContentContainer,
                        styles.leftZoneContentContainer,
                        this.props.leftZoneContentContainerStyle,
                    ]}
                >
                    <TouchableWithoutFeedback
                        onPress={this.handleLeftPress}
                    >
                        <View
                            style={[
                                styles.touchableChild,
                                styles.leftTouchableChild,
                                this.props.leftTouchableChildStyle,
                            ]}
                        >
                            {this.props.leftIconName
                                ? <Icon
                                    name={this.props.leftIconName}
                                    containerStyle={[
                                        styles.leftIconContainerStyle,
                                        this.props.iconContainerStyle,
                                        this.props.leftIconContainerStyle,
                                    ]}
                                    imageStyle={[
                                        styles.leftIconImageStyle,
                                        this.props.iconImageStyle,
                                        this.props.leftIconImageStyle,
                                    ]}
                                />
                                : null
                            }
                            {this.props.leftIconImage
                                ? <Icon
                                    source={this.props.leftIconImage}
                                    containerStyle={[
                                        styles.leftIconContainerStyle,
                                        this.props.iconContainerStyle,
                                        this.props.leftIconContainerStyle,
                                    ]}
                                    imageStyle={[
                                        styles.leftIconImageStyle,
                                        this.props.iconImageStyle,
                                        this.props.leftIconImageStyle,
                                    ]}
                                />
                                : null
                            }
                            {this.props.leftBadge !== undefined
                                ? <Badge
                                    content={this.props.leftBadge}
                                    color={this.props.badgeTextColor}
                                    backgroundColor={this.props.badgeColor}
                                    isLeft={Boolean(this.props.isLeftBadgeLeft)}
                                />
                                : null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );

        let rightSide = this.props.renderRightSide
            ? this.props.renderRightSide()
            : (
                <View
                    style={[
                        styles.zoneContentContainer,
                        styles.rightZoneContentContainer,
                        this.props.rightZoneContentContainerStyle,
                    ]}
                >
                    {this.props.rightText
                        ? <Text
                            style={[
                                styles.text,
                                styles.rightText,
                                this.props.rightTextStyle,
                            ]}
                            allowFontScaling={this.props.allowFontScaling}
                            onPress={this.props.onRightTextPress}
                        >
                            {this.props.rightText}
                        </Text>
                        : null
                    }
                    {this.props.rightIcons.map((iconObject, index) => (
                        <TouchableWithoutFeedback
                            key={`right-icon-${iconObject.name || index}`}
                            onPress={throttle(
                                iconObject.onPress,
                                this.props.throttleDelay,
                                { trailing: false }
                            )}
                        >
                            <View
                                style={[
                                    styles.touchableChild,
                                    styles.rightTouchableChild,
                                    this.props.rightTouchableChildStyle,
                                ]}
                            >
                                {iconObject.name
                                    ? <Icon
                                        name={iconObject.name}
                                        containerStyle={[
                                            styles.rightIconContainerStyle,
                                            this.props.iconContainerStyle,
                                            this.props.rightIconContainerStyle,
                                            iconObject.containerStyle,
                                        ]}
                                        imageStyle={[
                                            styles.rightIconImageStyle,
                                            this.props.iconImageStyle,
                                            this.props.rightIconImageStyle,
                                            iconObject.imageStyle,
                                        ]}
                                    />
                                    : null
                                }
                                {iconObject.image
                                    ? <Icon
                                        source={iconObject.image}
                                        containerStyle={[
                                            styles.rightIconContainerStyle,
                                            this.props.iconContainerStyle,
                                            this.props.rightIconContainerStyle,
                                            iconObject.containerStyle,
                                        ]}
                                        imageStyle={[
                                            styles.rightIconImageStyle,
                                            this.props.iconImageStyle,
                                            this.props.rightIconImageStyle,
                                            iconObject.imageStyle,
                                        ]}
                                    />
                                    : null
                                }
                                {iconObject.badge !== undefined
                                    ? <Badge
                                        isLeft={Boolean(iconObject.isBadgeLeft)}
                                        content={iconObject.badge}
                                        color={this.props.badgeTextColor}
                                        backgroundColor={this.props.badgeColor}
                                    />
                                    : null
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            );

        if (!this.props.leftIconName && !this.props.leftIconImage && !this.props.renderLeftSide) {
            leftSide = null;
        }
        if (!this.props.rightIcons.length && !this.props.renderRightSide) {
            rightSide = null;
        }

        // To have shadows on Android
        let elevation = this.props.elevation;

        if (!elevation) {
            elevation = !this.props.disableShadows ? 2 : 0;
        }

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: this.props.backgroundColor },
                    !this.props.disableShadows ? styles.shadows : null,
                    this.props.containerStyle,
                ]}
                elevation={elevation}
            >
                {leftSide}
                <View
                    style={[
                        styles.titleContainer,
                        this.props.titleContainerStyle,
                    ]}
                >
                    <Text
                        onPress={this.props.onTitlePress}
                        allowFontScaling={this.props.allowFontScaling}
                        numberOfLines={1}
                        style={[
                            styles.text,
                            styles.title,
                            this.props.titleStyle,
                        ]}
                    >
                        {this.props.title}
                    </Text>
                </View>
                {rightSide}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: (Platform.OS === 'ios') ? 60 : 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    shadows: {
        shadowOffset: {
            height: 4,
        },
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        ...(Platform.OS === 'android'
            ? {
                borderBottomWidth: 1,
                borderBottomColor: colors.defaultSeparatorColor,
            }
            : {}
        ),
        zIndex: 9999,
    },
    zoneContentContainer: {
        flexDirection: 'row',
    },
    leftZoneContentContainer: {
    },
    rightZoneContentContainer: {
        justifyContent: 'flex-end',
    },
    titleContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    rightText: {
        alignSelf: 'center',
        textAlign: 'right',
        marginRight: 10,
    },
    text: {
        color: colors.defaultTextAndIconColor,
    },
});

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    View,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'proptypes';

export default class Icon extends Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        imageStyle: Image.propTypes.style,
        name: PropTypes.string,
        source: Image.propTypes.source,
    };

    render() {
        let source;
        let icon;

        if (this.props.source) {
            source = this.props.source;
        } else if (this.props.name) {
            switch (this.props.name) {
                case 'back':
                    source = require('./ActionBarImages/back.png');
                    break;
                case 'flag':
                    source = require('./ActionBarImages/flag.png');
                    break;
                case 'loading':
                    icon = (<ActivityIndicator />);
                    break;
                case 'location':
                    source = require('./ActionBarImages/location.png');
                    break;
                case 'menu':
                    source = require('./ActionBarImages/menu.png');
                    break;
                case 'phone':
                    source = require('./ActionBarImages/phone.png');
                    break;
                case 'plus':
                    source = require('./ActionBarImages/plus.png');
                    break;
                case 'star':
                    source = require('./ActionBarImages/star.png');
                    break;
                case 'star-outline':
                    source = require('./ActionBarImages/star_outline.png');
                    break;
                case 'none':
                    // Don't render anything
                    return null;
                default:
                    if (__DEV__) {
                        console.log(`${this.props.name} is an invalid icon name. Did you want to say 'none'?`);
                    }

                    return null;
            }
        }

        if (source && !icon) {
            icon = (
                <Image
                    style={[
                        styles.icon,
                        this.props.imageStyle,
                    ]}
                    source={source}
                />
            );
        }

        return (
            <View
                style={[
                    styles.container,
                    this.props.containerStyle,
                ]}
            >
                {icon}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#FFFFFF',
    },
});

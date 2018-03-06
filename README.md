# react-native-action-bar
An Android-like action bar for react-native

For react-native v0.39+

# :warning: Breaking change for versions < 2.*

The component has been redone so it hasn't much in common.

Check that [README](https://github.com/Osedea/react-native-action-bar/blob/965d0c7a6c081cd68375a85e610ddf58361cd103/README.md) for versions lower than 2.*

# Example

iOS             |  Android
:-------------------------:|:-------------------------:
<img src="https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/ios.png" height="500"/> | <img src="https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/android.png" height="500"/>

```js
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
        {
            image: require('my-custom-image.png'), // To use a custom image
            badge: '1',
            onPress: () => console.log('Right Custom image !'),
        },
    ]}
/>
```

# Are you looking for React-native's [ToolbarAndroid](https://facebook.github.io/react-native/docs/toolbarandroid.html)?

To allow more customization, I do not use [ToolbarAndroid](https://facebook.github.io/react-native/docs/toolbarandroid.html), however, this might be what you are looking for instead of my package.

`react-native-action-bar` is here to provide a similar top screen bar but that looks the same on Android and iOS.

# Properties

Property Name | Type | Comment
--- | --- | ---
allowFontScaling | React.PropTypes.bool | If you want to allow font scaling on the title and the right text (`false` by default)
backgroundColor | React.PropTypes.string | The background color of the Bar
badgeColor | [Badge](./Badge.js).propTypes.backgroundColor | The color of all badges
badgeTextColor | [Badge](./Badge.js).propTypes.color | The color of the text of the badges
containerStyle | ViewPropTypes.style | Style of the container of the bar (has the backgroundColor)
disableShadows | React.PropTypes.bool | If you want the ActionBar to drop a shadow or not (The default is `false`)
disableStatusBarHandling | React.PropTypes.bool | If you want the ActionBar to set the color/style of the StatusBar (The default is `false`)
elevation | React.PropTypes.number | On Android, to 'control' the Shadow dropped by the bar (default is `2`)
iconContainerStyle | ViewPropTypes.style | See the [Icon](./Icon.js) component (applies to all Icons (left and right)
iconImageStyle | Image.propTypes.style | See the [Icon](./Icon.js) component (applies to all Icons (left and right)
isLeftBadgeLeft | React.PropTypes.bool | Position of the badge on the left Icon
leftBadge | [Badge](./Badge.js).propTypes.content | Text of the badge on the left Icon (`''` is a valid value, it will display an empty badge. `undefined` is needed to not have the badge displayed)
leftIconContainerStyle | [Icon](./Icon.js).propTypes.containerStyle | See the [Icon](./Icon.js) component
leftIconImage | [Icon](./Icon.js).propTypes.source | An image to use as Icon (`require()`). Don't use remote images (`{ uri: ... }`) as it will have bad performance, but I guess you can
leftIconImageStyle | [Icon](./Icon.js).propTypes.imageStyle | See the [Icon](./Icon.js) component
leftIconName | [Icon](./Icon.js).propTypes.name | The name of one of the predefined Icons (see [`List of predefined Icons`](#predefined-icons))
leftTouchableChildStyle | ViewPropTypes.style | The style of the View inside the `TouchableWithoutFeedback` element for the left Icon
leftZoneContentContainerStyle | ViewPropTypes.style | The style of the View around the `TouchableWithoutFeedback` element for the left Icon
onLeftPress | React.PropTypes.func | The function to execute `onPress` for the left Icon
onRightTextPress | React.PropTypes.func | The function to execute `onPress` for the `Text` that you can display on the right of the Title
onTitlePress | React.PropTypes.func | The function to execute `onPress` for the Title
renderLeftSide | React.PropTypes.func | A function to override the rendering of the part left of the Title
renderRightSide | React.PropTypes.func | A function to override the rendering of the part right of the Title
rightIconContainerStyle | [Icon](./Icon.js).propTypes.containerStyle | See the [Icon](./Icon.js) component
rightIconImageStyle | [Icon](./Icon.js).propTypes.imageStyle | See the [Icon](./Icon.js) component
rightIcons | React.PropTypes.arrayOf(<br>    React.PropTypes.shape({<br>         ...[Icon](./Icon.js).propTypes,<br>        badge: [Badge](./Badge.js).propTypes.content,<br>        onPress: React.PropTypes.func.isRequired,<br>    }),<br>) | See below
rightText | React.PropTypes.string | The text to display on the right
rightTextStyle | Text.propTypes.style | Style of the text to display on the right
rightTouchableChildStyle | ViewPropTypes.style | The style of the View inside the `TouchableWithoutFeedback` element for all the Icons on the right
rightZoneContentContainerStyle | ViewPropTypes.style | The style of the View around all the Icons + Text on the right
throttleDelay | React.PropTypes.number | The delay to throttle the presses on the Icons (The default is `750ms`)
title | React.PropTypes.string | The Text of the Title
titleContainerStyle | ViewPropTypes.style | The style of the `View` containing the `Text` element for the Title
titleStyle | Text.propTypes.style | The style of the `Text` element for the Title

## rightIcons elements example

```
{
    name: 'phone',
    badge: '1',
    onPress: () => console.log('Right Phone !'),
    isBadgeLeft: true,
}
```

# Predefined Icons

Right now the following Icons are defined:
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/back.png' width=40 /> back
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/flag.png' width=40 /> flag
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/loading.png' width=40 /> loading
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/location.png' width=40 /> location
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/menu.png' width=40 /> menu
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/phone.png' width=40 /> phone
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/plus.png' width=40 /> plus
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/star.png' width=40 /> star
 * <img src='https://cdn.rawgit.com/Osedea/react-native-action-bar/603a698fe435c5e4ce860e80a2fa7d839d3fee3a/doc-images/star-outline.png' width=40 /> star-outline

# Example

See an implementation example in the [Example](./Example/) folder

# Log steps to recreate solution

### add react-native-reanimated
```bash
npx expo install react-native-reanimated
```

update babel.config.js
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

### implementation
add state
```js
const [height, setHeight] = useState(0);
const animatedHeight = useSharedValue(0);
```

calculate collapsible content height
```js
const onLayout = (event: LayoutChangeEvent) => {
  const onLayoutHeight = event.nativeEvent.layout.height;

  if (onLayoutHeight > 0 && height !== onLayoutHeight) {
    setHeight(onLayoutHeight);
  }
};
```

collapsable animated style
```js
const collapsableStyle = useAnimatedStyle(() => {
  animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

  return {
    height: animatedHeight.value,
  };
}, [expanded]);
```

collapsable content view wrapper
```js
<Animated.View style={[collapsableStyle, {overflow: 'hidden'}]}>
  <View style={{ position: 'absolute'  }} onLayout={onLayout}>
    <Text style={[styles.details, styles.text]}>{item.details}</Text>
  </View>
</Animated.View>
```




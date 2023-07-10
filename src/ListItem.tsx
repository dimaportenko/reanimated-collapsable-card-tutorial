import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from "react-native";
import { ListItemType } from "./getData";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;

    if (layoutHeight > 0 && layoutHeight !== height) {
      setHeight(layoutHeight);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });

  return (
    <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
      <View onLayout={onLayout} style={{ position: "absolute" }}>
        {children}
      </View>
    </Animated.View>
  );
};

export const ListItem = ({ item }: { item: ListItemType }) => {
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={onItemPress}>
        <View style={styles.container}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.subtitle}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <CollapsableContainer expanded={expanded}>
        <Text style={[styles.details, styles.text]}>{item.details}</Text>
      </CollapsableContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
  },
  container: { flexDirection: "row" },
  image: { width: 50, height: 50, margin: 10, borderRadius: 5 },
  textContainer: { justifyContent: "space-around" },
  details: { margin: 10 },
  text: { opacity: 0.7 },
});

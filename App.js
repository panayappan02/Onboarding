// import React from 'react';
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

// import { Home } from "./screens/";

// const theme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         border: "transparent",
//     },
// };

// const Stack = createStackNavigator();

// const App = () => {
//     return (
//         <NavigationContainer theme={theme}>
//             <Stack.Navigator
//                 screenOptions={{
//                     headerShown: false
//                 }}
//                 initialRouteName={'Home'}
//             >
//                 <Stack.Screen name="Home" component={Home} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };

// export default App;

import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import { OnboardingItem, Paginator, NextButton } from "./components";
import { slides } from "./constants";
const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last Item");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

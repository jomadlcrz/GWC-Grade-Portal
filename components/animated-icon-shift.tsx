import { type ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type AnimatedIconShiftProps = {
  active: boolean;
  children: ReactNode;
  distance?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedIconShift({
  active,
  children,
  distance = 4,
  duration = 180,
  style,
}: AnimatedIconShiftProps) {
  const translateX = useRef(new Animated.Value(active ? distance : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: active ? distance : 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [active, distance, duration, translateX]);

  return (
    <Animated.View style={[style, { transform: [{ translateX }] }]}>
      {children}
    </Animated.View>
  );
}

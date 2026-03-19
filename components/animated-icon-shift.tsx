import { type ReactNode, useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";

type AnimatedIconShiftProps = {
  active: boolean;
  children: ReactNode;
  distance?: number;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedIconShift({
  active,
  children,
  distance = 5,
  style,
}: AnimatedIconShiftProps) {
  const translateX = useRef(new Animated.Value(active ? distance : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: active ? distance : 0,
      damping: 16,
      stiffness: 180,
      mass: 0.9,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      useNativeDriver: true,
    }).start();
  }, [active, distance, translateX]);

  return (
    <Animated.View style={[style, { transform: [{ translateX }] }]}>
      {children}
    </Animated.View>
  );
}

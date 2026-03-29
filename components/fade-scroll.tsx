import { type ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";

type FadeScrollDirection = "up" | "down" | "left" | "right";

type FadeScrollProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: FadeScrollDirection;
  duration?: number;
  fadeDuration?: number;
  revealed: boolean;
};

function getInitialTransform(
  direction: FadeScrollDirection,
  distance: number,
) {
  switch (direction) {
    case "down":
      return { translateY: -distance };
    case "left":
      return { translateX: distance };
    case "right":
      return { translateX: -distance };
    case "up":
    default:
      return { translateY: distance };
  }
}

export function FadeScroll({
  children,
  delay = 0,
  distance = 32,
  direction = "up",
  duration = 520,
  fadeDuration = 420,
  revealed,
}: FadeScrollProps) {
  const initialTransform = getInitialTransform(direction, distance);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(
    new Animated.Value(initialTransform.translateX ?? 0),
  ).current;
  const translateY = useRef(
    new Animated.Value(initialTransform.translateY ?? 0),
  ).current;
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const nextTransform = getInitialTransform(direction, distance);
    translateX.setValue(nextTransform.translateX ?? 0);
    translateY.setValue(nextTransform.translateY ?? 0);
  }, [direction, distance, translateX, translateY]);

  useEffect(() => {
    if (!revealed || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: fadeDuration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    delay,
    duration,
    fadeDuration,
    opacity,
    revealed,
    translateX,
    translateY,
  ]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }, { translateY }] }}>
      {children}
    </Animated.View>
  );
}

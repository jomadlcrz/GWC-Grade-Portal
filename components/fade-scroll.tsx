import { type ReactNode, useEffect, useRef } from "react";
import { AccessibilityInfo, Animated } from "react-native";

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
  const opacity = useRef(new Animated.Value(revealed ? 1 : 0)).current;
  const translateX = useRef(
    new Animated.Value(revealed ? 0 : (initialTransform.translateX ?? 0)),
  ).current;
  const translateY = useRef(
    new Animated.Value(revealed ? 0 : (initialTransform.translateY ?? 0)),
  ).current;
  const hasAnimatedRef = useRef(revealed);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) {
      return;
    }

    const nextTransform = getInitialTransform(direction, distance);
    translateX.setValue(nextTransform.translateX ?? 0);
    translateY.setValue(nextTransform.translateY ?? 0);
  }, [direction, distance, translateX, translateY]);

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (!isMounted) {
          return;
        }

        reduceMotionRef.current = enabled;
      })
      .catch(() => {
        reduceMotionRef.current = false;
      });

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => {
        reduceMotionRef.current = enabled;
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!revealed) {
      hasAnimatedRef.current = false;

      const nextTransform = getInitialTransform(direction, distance);
      opacity.setValue(0);
      translateX.setValue(nextTransform.translateX ?? 0);
      translateY.setValue(nextTransform.translateY ?? 0);
      return;
    }

    if (hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;

    if (reduceMotionRef.current) {
      opacity.setValue(1);
      translateX.setValue(0);
      translateY.setValue(0);
      return;
    }

    animationRef.current?.stop();
    animationRef.current = Animated.parallel([
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
    ]);
    animationRef.current.start(({ finished }) => {
      if (finished) {
        opacity.setValue(1);
        translateX.setValue(0);
        translateY.setValue(0);
      }

      animationRef.current = null;
    });

    return () => {
      animationRef.current?.stop();
      animationRef.current = null;
    };
  }, [
    delay,
    direction,
    distance,
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

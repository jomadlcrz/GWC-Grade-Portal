import { type ComponentProps, type ReactNode, useEffect, useRef } from "react";
import {
  type LayoutChangeEvent,
  View,
} from "react-native";

import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

type FadeScrollDirection = "up" | "down" | "left" | "right";

type FadeScrollProps = Omit<ComponentProps<typeof Animated.View>, "children" | "style"> & {
  animateOnce?: boolean;
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: FadeScrollDirection;
  duration?: number;
  fadeDuration?: number;
  reduceMotionEnabled?: boolean;
  revealOffset?: number;
  scrollY: SharedValue<number>;
  style?: ComponentProps<typeof Animated.View>["style"];
  viewportHeight: number;
};

function getInitialOffset(direction: FadeScrollDirection, distance: number) {
  switch (direction) {
    case "down":
      return -distance;
    case "left":
      return distance;
    case "right":
      return -distance;
    case "up":
    default:
      return distance;
  }
}

export function FadeScroll({
  animateOnce = true,
  children,
  delay = 0,
  distance = 32,
  direction = "up",
  duration = 520,
  fadeDuration = 420,
  reduceMotionEnabled = false,
  revealOffset = 140,
  scrollY,
  style,
  viewportHeight,
  ...rest
}: FadeScrollProps) {
  const initialOffset = getInitialOffset(direction, distance);
  const isHorizontal = direction === "left" || direction === "right";
  const motionReduced = reduceMotionEnabled;
  const startsVisible = motionReduced;
  const viewRef = useRef<View>(null);
  const hasAnimated = useSharedValue(false);
  const absoluteTop = useSharedValue(0);
  const elementHeight = useSharedValue(0);
  const layoutReady = useSharedValue(startsVisible);
  const opacity = useSharedValue(startsVisible ? 1 : 0);
  const translate = useSharedValue(startsVisible ? 0 : initialOffset);

  useEffect(() => {
    if (motionReduced) {
      layoutReady.value = true;
      hasAnimated.value = true;
      opacity.value = 1;
      translate.value = 0;
    }
  }, [hasAnimated, layoutReady, motionReduced, opacity, translate]);

  const handleLayout = (_event: LayoutChangeEvent) => {
    if (motionReduced) {
      return;
    }

    viewRef.current?.measureInWindow((_x, pageY, _width, height) => {
      absoluteTop.value = pageY + scrollY.value;
      elementHeight.value = height;
      layoutReady.value = true;
    });
  };

  useAnimatedReaction(
    () => {
      const animationsDisabled = motionReduced;
      const revealLine = viewportHeight - revealOffset;
      const currentAbsoluteTop = absoluteTop.value;
      const currentElementHeight = elementHeight.value;
      const isLayoutReady = layoutReady.value;
      const scrollOffset = scrollY.value;

      let shouldShow = animationsDisabled;

      if (!animationsDisabled && isLayoutReady) {
        const top = currentAbsoluteTop - scrollOffset;
        const bottom = top + currentElementHeight;
        const isInView = bottom >= 0 && top <= revealLine;

        if (isInView) {
          hasAnimated.value = true;
        }

        shouldShow = animateOnce ? hasAnimated.value || isInView : isInView;
      } else if (animationsDisabled) {
        hasAnimated.value = true;
      }

      return {
        animationsDisabled,
        isLayoutReady,
        shouldShow,
      };
    },
    (current, previous) => {
      const isInitialReaction = previous === null;
      const layoutBecameReady =
        !isInitialReaction && current.isLayoutReady && !previous.isLayoutReady;
      const visibilityChanged =
        isInitialReaction || current.shouldShow !== previous.shouldShow;
      const motionChanged =
        !isInitialReaction &&
        current.animationsDisabled !== previous.animationsDisabled;

      if (layoutBecameReady || visibilityChanged || motionChanged) {
        if (current.shouldShow) {
          if (isInitialReaction || current.animationsDisabled) {
            opacity.value = 1;
            translate.value = 0;
          } else {
            opacity.value = withDelay(delay, withTiming(1, { duration: fadeDuration }));
            translate.value = withDelay(delay, withTiming(0, { duration }));
          }
        } else if (isInitialReaction) {
          opacity.value = 0;
          translate.value = initialOffset;
        } else {
          opacity.value = withTiming(0, { duration: 180 });
          translate.value = withTiming(initialOffset, { duration: 220 });
        }
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: isHorizontal
        ? [{ translateX: translate.value }]
        : [{ translateY: translate.value }],
    };
  });

  return (
    <Animated.View
      ref={viewRef}
      {...rest}
      onLayout={handleLayout}
      style={[style, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}

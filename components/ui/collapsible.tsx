import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";

type CollapsibleRenderProps = {
  isOpen: boolean;
  toggle: () => void;
  progress: Animated.Value;
};

type CollapsibleProps = PropsWithChildren & {
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderTrigger?: (props: CollapsibleRenderProps) => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Collapsible({
  children,
  title,
  open,
  defaultOpen = false,
  onOpenChange,
  renderTrigger,
  containerStyle,
  contentStyle,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : uncontrolledOpen;
  const progress = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const toggle = useMemo(
    () => () => {
      const next = !isOpen;

      if (!isControlled) {
        setUncontrolledOpen(next);
      }

      onOpenChange?.(next);
    },
    [isControlled, isOpen, onOpenChange],
  );

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isOpen ? 1 : 0,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isOpen, progress]);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const nextHeight = Math.ceil(event.nativeEvent.layout.height);

    if (nextHeight !== contentHeight) {
      setContentHeight(nextHeight);
    }
  };

  const animatedContentStyle = {
    height:
      contentHeight > 0
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight],
          })
        : undefined,
    opacity: progress,
    overflow: "hidden" as const,
  };

  return (
    <View style={containerStyle}>
      {renderTrigger ? (
        renderTrigger({ isOpen, toggle, progress })
      ) : (
        <Pressable style={styles.heading} onPress={toggle}>
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={Colors.light.icon}
            style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
          />

          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </Pressable>
      )}
      <Animated.View style={animatedContentStyle} pointerEvents={isOpen ? "auto" : "none"}>
        <View style={styles.contentMeasure} onLayout={handleContentLayout}>
          <View style={[styles.content, contentStyle]}>{children}</View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  contentMeasure: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});

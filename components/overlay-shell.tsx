import { StatusBar } from "expo-status-bar";
import { type ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context";

type OverlayShellProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  backgroundColor: string;
  safeAreaStyle?: ViewStyle;
  edges?: readonly Edge[];
};

const DEFAULT_EDGES: readonly Edge[] = ["top", "left", "right", "bottom"];

export function OverlayShell({
  visible,
  onClose,
  children,
  backgroundColor,
  safeAreaStyle,
  edges = DEFAULT_EDGES,
}: OverlayShellProps) {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [opacity, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      },
    );

    return () => subscription.remove();
  }, [onClose, visible]);

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        styles.overlay,
        {
          opacity,
          zIndex: visible ? 100 : -1,
          elevation: visible ? 100 : 0,
        },
      ]}
    >
      {visible && (
        <StatusBar style="light" translucent backgroundColor="transparent" />
      )}
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor }, safeAreaStyle]}
        edges={edges}
      >
        {children}
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
});

import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";
import { useReducedMotion as useReanimatedReducedMotion } from "react-native-reanimated";

export function useReducedMotion() {
  const initialReduceMotionEnabled = useReanimatedReducedMotion();
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(
    initialReduceMotionEnabled,
  );

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (!isMounted) {
          return;
        }

        setReduceMotionEnabled(enabled);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setReduceMotionEnabled(false);
      });

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => {
        setReduceMotionEnabled(enabled);
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return reduceMotionEnabled;
}

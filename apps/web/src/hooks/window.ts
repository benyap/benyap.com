import { useState } from "react";
import { useWindowEvent } from "@mantine/hooks";

/**
 * Returns the current scroll position, relative to the top of the window.
 */
export function useScrollPosition() {
  const [position, setPosition] = useState(0);
  useWindowEvent("scroll", () => {
    setPosition(document.documentElement.scrollTop);
  });
  return position;
}

/**
 * Returns `true` if the current scroll position is past the specified scroll position.
 */
export function usePastScrollPosition(position: number) {
  const currentPosition = useScrollPosition();
  return currentPosition > position;
}

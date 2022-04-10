import { useEffect, useLayoutEffect } from "react";

/**
 * A React helper hook for scheduling a layout effect with a fallback to a regular effect for
 * environments where layout effects should not be used (such as server-side rendering).
 */
export const useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

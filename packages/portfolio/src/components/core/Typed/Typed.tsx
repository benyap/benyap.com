"use client";

import { useEffect, useRef } from "react";
import TypedJS, { TypedOptions } from "typed.js";

export function Typed(props: TypedOptions) {
  const { typeSpeed = 50, backSpeed = 50, ...rest } = props;

  const ref = useRef(null);

  useEffect(() => {
    const typed = new TypedJS(ref.current, {
      typeSpeed,
      backSpeed,
      ...rest,
    });
    return () => typed.destroy();
  }, []);

  return <span ref={ref}></span>;
}

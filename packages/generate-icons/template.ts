import type { Template } from "@svgr/babel-plugin-transform-svg-component";

const template: Template = (variables, { tpl }) => {
  return tpl`
import React, { forwardRef } from "react";
type SVGProps = React.SVGAttributes<SVGElement>;
export const ${variables.componentName} = forwardRef<SVGSVGElement, SVGProps>(({ className, ...props }, forwardedRef) => ${variables.jsx})
${variables.componentName}.displayName = "${variables.componentName}";
`;
};

export default template;

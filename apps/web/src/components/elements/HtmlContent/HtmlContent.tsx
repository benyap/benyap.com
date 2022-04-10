export interface HtmlContentProps<T extends keyof JSX.IntrinsicElements = "div"> {
  element?: T;
  children?: string;
}

/**
 * ASSUMPTION: HTML content being rendered has already been sanitised server-side.
 */
export function HtmlContent<T extends keyof JSX.IntrinsicElements = "div">(
  props: HtmlContentProps<T> & JSX.IntrinsicElements[T]
) {
  const { element, children, ...elementProps } = props;
  const Element = (props.element || "div") as keyof JSX.IntrinsicElements;
  return (
    <Element
      {...(elementProps as JSX.IntrinsicAttributes)}
      dangerouslySetInnerHTML={{ __html: String(children ?? "") }}
    />
  );
}

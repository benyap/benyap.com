export interface ResumeSectionTitleProps {
  children?: React.ReactNode;
}

export function ResumeSectionTitle(props: ResumeSectionTitleProps) {
  const { children } = props;
  return <h2 className="text-4xl font-black">{children}</h2>;
}

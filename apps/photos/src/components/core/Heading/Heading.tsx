import clsx from "clsx";

export function Heading(
  props: React.PropsWithChildren<{ collapseWhenNarrow?: boolean }>,
) {
  const { children, collapseWhenNarrow } = props;
  return (
    <div className="@container/heading">
      <header
        className={clsx(
          "mb-6 flex justify-between gap-4",
          collapseWhenNarrow && "@min-lg/heading:flex-row flex-col",
        )}
      >
        {children}
      </header>
    </div>
  );
}

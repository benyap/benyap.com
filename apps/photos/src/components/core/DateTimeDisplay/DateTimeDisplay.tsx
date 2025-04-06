import { DateTime } from "luxon";

export function DateTimeDisplay(props: {
  className?: string;
  format?: "date_med" | "date_full" | "relative";
  children?: Date | null;
}) {
  const { className, format = "date_med", children: date } = props;
  if (!date) return null;
  const datetime = DateTime.fromJSDate(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      {format === "date_med" && datetime.toLocaleString(DateTime.DATE_MED)}
      {format === "date_full" && datetime.toLocaleString(DateTime.DATE_FULL)}
      {format === "relative" && datetime.toRelative()}
    </time>
  );
}

import type { SampleReport } from "@/content/schemas";
import { cn } from "@/lib/class-names";

export function SampleReportTable({ report }: { report: SampleReport }) {
  return (
    <figure
      // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable tables must be reachable by keyboard on small screens
      tabIndex={0}
      aria-label={report.caption}
      className="mt-auto overflow-x-auto rounded-md border border-panel-line"
    >
      <table className="w-full min-w-[420px] border-collapse text-left text-body-sm tabular-nums">
        <thead>
          <tr className="text-caption tracking-[0.06em] text-panel-muted uppercase">
            {report.columns.map((column) => (
              <th key={column} scope="col" className="px-3.5 py-2.5 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {report.rows.map((row) => (
            <tr key={row.studentName} className="border-t border-panel-line">
              <td className="px-3.5 py-2.5">{row.studentName}</td>
              <td className="px-3.5 py-2.5">{row.attendancePercent}%</td>
              <td className="px-3.5 py-2.5">{row.contestScore}</td>
              <td className="px-3.5 py-2.5">{row.mocksCompleted}</td>
              <td
                className={cn(
                  "px-3.5 py-2.5 font-bold",
                  row.status === "ready" ? "text-panel-success" : "text-panel-warning",
                )}
              >
                {report.statusLabels[row.status]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-panel-line px-3.5 py-2 text-caption text-panel-muted">
        {report.caption}
      </figcaption>
    </figure>
  );
}

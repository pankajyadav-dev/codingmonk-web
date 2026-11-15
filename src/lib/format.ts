const indianNumberFormat = new Intl.NumberFormat("en-IN");

export function formatIndianNumber(value: number) {
  return indianNumberFormat.format(value);
}

export function formatPackageLpa(packageLpa: number) {
  return `${Number(packageLpa.toFixed(2))} LPA`;
}

export function formatVideoDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}` : `${minutes}:${paddedSeconds}`;
}

export function formatCourseLength(totalSeconds: number) {
  if (totalSeconds >= 3600) return `${(totalSeconds / 3600).toFixed(1)} h`;
  return `${Math.max(1, Math.round(totalSeconds / 60))} min`;
}

export function fillTemplate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
    key in values ? String(values[key]) : placeholder,
  );
}

import { SampleReportTable } from "@/components/molecules/sample-report-table";
import { ServiceTile } from "@/components/molecules/service-tile";
import type { SampleReport, Service } from "@/content/schemas";
import { cn } from "@/lib/class-names";

const desktopColumnCount = 3;

function getLastRowFillClass(services: Service[]) {
  const occupiedCells = services.reduce((cells, service) => cells + (service.variant === "feature" ? 4 : 1), 0);
  const emptyCellsInLastRow = (desktopColumnCount - (occupiedCells % desktopColumnCount)) % desktopColumnCount;
  return emptyCellsInLastRow === 0 ? "" : emptyCellsInLastRow === 1 ? "lg:col-span-2" : "lg:col-span-3";
}

export function ServicesBento({ services, sampleReport }: { services: Service[]; sampleReport: SampleReport }) {
  const lastRowFillClass = getLastRowFillClass(services);
  return (
    <ul className="grid auto-rows-[minmax(170px,auto)] grid-flow-dense gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {services.map((service, serviceIndex) => {
        const isFeature = service.variant === "feature";
        const isLast = serviceIndex === services.length - 1;
        return (
          <li
            key={service.title}
            className={cn("min-w-0", isFeature && "md:col-span-2 lg:row-span-2", isLast && lastRowFillClass)}
          >
            <ServiceTile service={service}>
              {isFeature ? <SampleReportTable report={sampleReport} /> : null}
            </ServiceTile>
          </li>
        );
      })}
    </ul>
  );
}

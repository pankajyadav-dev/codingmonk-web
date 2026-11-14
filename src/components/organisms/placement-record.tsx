"use client";

import { useState } from "react";
import { Chip } from "@/components/atoms/chip";
import { PlacementRow } from "@/components/molecules/placement-row";
import type { CompanyType, Placement } from "@/content/schemas";
import { fillTemplate } from "@/lib/format";

type PlacementRecordLabels = {
  title: string;
  sampleLabel: string;
  emptyMessage: string;
  allBatchesLabel: string;
  batchLabel: string;
  allCompanyTypesLabel: string;
  companyTypeLabels: Record<CompanyType, string>;
};

type PlacementRecordProps = { placements: Placement[]; showFilters: boolean; labels: PlacementRecordLabels };

export function PlacementRecord({ placements, showFilters, labels }: PlacementRecordProps) {
  const [selectedBatchYear, setSelectedBatchYear] = useState<number | "all">("all");
  const [selectedCompanyType, setSelectedCompanyType] = useState<CompanyType | "all">("all");
  const batchYears = [...new Set(placements.map((placement) => placement.batchYear))].sort(
    (first, second) => second - first,
  );
  const companyTypes = [...new Set(placements.map((placement) => placement.companyType))];
  const visiblePlacements = placements.filter(
    (placement) =>
      (selectedBatchYear === "all" || placement.batchYear === selectedBatchYear) &&
      (selectedCompanyType === "all" || placement.companyType === selectedCompanyType),
  );
  return (
    <div className="grid gap-5">
      {showFilters ? (
        <div className="flex flex-wrap gap-2">
          <Chip isSelected={selectedBatchYear === "all"} onClick={() => setSelectedBatchYear("all")}>
            {labels.allBatchesLabel}
          </Chip>
          {batchYears.map((batchYear) => (
            <Chip
              key={batchYear}
              isSelected={selectedBatchYear === batchYear}
              onClick={() => setSelectedBatchYear(batchYear)}
            >
              {fillTemplate(labels.batchLabel, { year: batchYear })}
            </Chip>
          ))}
          <span aria-hidden="true" className="mx-1 w-px self-stretch bg-line" />
          <Chip isSelected={selectedCompanyType === "all"} onClick={() => setSelectedCompanyType("all")}>
            {labels.allCompanyTypesLabel}
          </Chip>
          {companyTypes.map((companyType) => (
            <Chip
              key={companyType}
              isSelected={selectedCompanyType === companyType}
              onClick={() => setSelectedCompanyType(companyType)}
            >
              {labels.companyTypeLabels[companyType]}
            </Chip>
          ))}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-xl bg-panel text-panel-ink">
        <div className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-3.5">
          <p className="font-display text-body font-bold">{labels.title}</p>
          <p className="text-caption font-semibold text-panel-success">{labels.sampleLabel}</p>
        </div>
        {visiblePlacements.length > 0 ? (
          <ul aria-live="polite">
            {visiblePlacements.map((placement) => (
              <PlacementRow
                key={`${placement.studentName}-${placement.companyName}-${placement.batchYear}`}
                placement={placement}
              />
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-body text-panel-muted">{labels.emptyMessage}</p>
        )}
      </div>
    </div>
  );
}

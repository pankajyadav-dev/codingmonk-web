import {
  brandMarkViewBox,
  leftBracketPath,
  monkArmsPath,
  monkArmsStrokeWidth,
  monkCrossedLegsPath,
  monkHead,
  monkStandingArmsPath,
  monkStandingRobePath,
  monkTorsoPath,
  rightBracketPath,
} from "@/lib/brand-geometry";
import { cn } from "@/lib/class-names";

type BrandMarkProps = { size?: number; isAnimated?: boolean; className?: string };

const animatedPartStyles = "[transform-box:fill-box]";

export function BrandMark({ size = 36, isAnimated = false, className }: BrandMarkProps) {
  const bracketStyles = cn(
    "stroke-current transition-transform duration-300 ease-out",
    isAnimated && "animate-brand-brackets-draw [stroke-dasharray:1]",
  );
  const restingArms = (
    <path
      d={monkArmsPath}
      fill="none"
      strokeWidth={monkArmsStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "stroke-brand",
        isAnimated && cn("animate-monk-arms-rest [transform-origin:top]", animatedPartStyles),
      )}
    />
  );
  const crossedLegs = (
    <path
      d={monkCrossedLegsPath}
      className={cn(
        "fill-brand",
        isAnimated && cn("animate-monk-legs-cross [transform-origin:center]", animatedPartStyles),
      )}
    />
  );
  return (
    <svg
      width={size}
      height={size}
      viewBox={brandMarkViewBox}
      aria-hidden="true"
      className={cn("shrink-0 overflow-visible", className)}
    >
      <path
        d={leftBracketPath}
        pathLength={1}
        fill="none"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(bracketStyles, isAnimated && "group-hover:-translate-x-[1.5px]")}
      />
      <path
        d={rightBracketPath}
        pathLength={1}
        fill="none"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(bracketStyles, isAnimated && "group-hover:translate-x-[1.5px]")}
      />
      {isAnimated ? (
        <circle
          {...monkHead}
          fill="none"
          strokeWidth="1.5"
          className={cn("animate-monk-aura stroke-brand opacity-0 [transform-origin:center]", animatedPartStyles)}
        />
      ) : null}
      {restingArms}
      {crossedLegs}
      <g className={cn("fill-brand", isAnimated && "animate-monk-sit-down")}>
        <circle {...monkHead} />
        <path d={monkTorsoPath} />
        {isAnimated ? (
          <path
            d={monkStandingArmsPath}
            fill="none"
            strokeWidth={monkArmsStrokeWidth}
            strokeLinecap="round"
            className="animate-monk-arms-lower stroke-brand opacity-0"
          />
        ) : null}
        {isAnimated ? (
          <path
            d={monkStandingRobePath}
            className={cn("animate-monk-legs-fold opacity-0 [transform-origin:top]", animatedPartStyles)}
          />
        ) : null}
      </g>
    </svg>
  );
}

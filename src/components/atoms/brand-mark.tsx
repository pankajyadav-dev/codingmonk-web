import {
  brandMarkViewBox,
  brandMarkViewBoxSize,
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
  const auraDiameterPercent = ((monkHead.r * 2) / brandMarkViewBoxSize) * 100;
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {isAnimated ? (
        <span
          className="absolute animate-monk-aura rounded-full border-brand opacity-0 will-change-[transform,opacity]"
          style={{
            left: `${(monkHead.cx / brandMarkViewBoxSize) * 100}%`,
            top: `${(monkHead.cy / brandMarkViewBoxSize) * 100}%`,
            width: `${auraDiameterPercent}%`,
            height: `${auraDiameterPercent}%`,
            marginLeft: `${-auraDiameterPercent / 2}%`,
            marginTop: `${-auraDiameterPercent / 2}%`,
            borderWidth: (size * 1.5) / brandMarkViewBoxSize,
          }}
        />
      ) : null}
      <svg
        width={size}
        height={size}
        viewBox={brandMarkViewBox}
        aria-hidden="true"
        className="relative overflow-visible"
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
    </span>
  );
}

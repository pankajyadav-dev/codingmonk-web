import { BrandMark } from "@/components/atoms/brand-mark";

type HeroRingProps = { outerRingText: string; innerRingText: string; badges: { value: string; label: string }[] };

export function HeroRing({ outerRingText, innerRingText, badges }: HeroRingProps) {
  const [firstBadge, secondBadge] = badges;
  return (
    <div className="relative mx-0 aspect-square w-full max-w-[440px] justify-self-start lg:max-w-[560px] lg:justify-self-end">
      <div className="absolute inset-[8%]">
        <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
          <circle cx="200" cy="200" r="199" fill="none" className="stroke-line" />
          <circle cx="200" cy="200" r="166" fill="none" strokeDasharray="2 7" className="stroke-line" />
        </svg>
        <svg
          viewBox="0 0 400 400"
          aria-hidden="true"
          className="absolute inset-0 size-full animate-ring-spin overflow-visible will-change-transform"
        >
          <path id="hero-ring-outer" d="M200,200 m-185,0 a185,185 0 1,1 370,0 a185,185 0 1,1 -370,0" fill="none" />
          <text className="fill-muted font-display text-[13.5px] tracking-[2.2px]">
            <textPath href="#hero-ring-outer">{outerRingText}</textPath>
          </text>
        </svg>
        <svg
          viewBox="0 0 400 400"
          aria-hidden="true"
          className="absolute inset-0 size-full animate-ring-spin-reverse overflow-visible will-change-transform"
        >
          <path id="hero-ring-inner" d="M200,200 m-150,0 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0" fill="none" />
          <text className="fill-brand font-display text-[12px] tracking-[1.6px]">
            <textPath href="#hero-ring-inner">{innerRingText}</textPath>
          </text>
        </svg>
        <div className="absolute inset-[26%] grid place-items-center rounded-full border-[6px] border-brand bg-surface-raised shadow-brand">
          <BrandMark size={96} isAnimated />
        </div>
      </div>
      {firstBadge ? (
        <p className="absolute bottom-0 left-0 grid gap-0.5 rounded-md border border-line bg-background px-3.5 py-2.5 shadow-raised">
          <span className="font-display text-heading-md font-extrabold">{firstBadge.value}</span>
          <span className="text-caption text-muted">{firstBadge.label}</span>
        </p>
      ) : null}
      {secondBadge ? (
        <p className="absolute top-0 right-0 grid gap-0.5 rounded-md border border-line bg-background px-3.5 py-2.5 shadow-raised">
          <span className="font-display text-heading-md font-extrabold">{secondBadge.value}</span>
          <span className="text-caption text-muted">{secondBadge.label}</span>
        </p>
      ) : null}
    </div>
  );
}

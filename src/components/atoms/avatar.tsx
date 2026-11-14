import Image from "next/image";
import { cn } from "@/lib/class-names";

const avatarSizes = { sm: 40, md: 48, lg: 64 } as const;

type AvatarProps = {
  name: string;
  photoSrc?: string;
  size?: keyof typeof avatarSizes;
  className?: string;
};

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function Avatar({ name, photoSrc, size = "md", className }: AvatarProps) {
  const pixelSize = avatarSizes[size];
  const sharedStyles = cn("shrink-0 rounded-full", className);
  if (photoSrc) {
    return (
      <Image
        src={photoSrc}
        alt={name}
        width={pixelSize}
        height={pixelSize}
        className={cn(sharedStyles, "object-cover")}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ width: pixelSize, height: pixelSize }}
      className={cn(
        sharedStyles,
        "grid place-items-center bg-surface-raised font-display text-body-sm font-bold text-brand-strong",
      )}
    >
      {getInitials(name)}
    </span>
  );
}

import Image from "next/image";

type Tone = "dropoff" | "booth" | "about" | "event" | "hero" | "generic";

const tones: Record<Tone, string> = {
  dropoff: "from-[#FFE8D4] via-[#FFD3AE] to-[#F0A46A]",
  booth: "from-[#FFF1E4] via-[#F5C49A] to-[#E07A3D]",
  about: "from-[#FFF8F2] via-[#FFE8D6] to-[#E8D9C8]",
  event: "from-[#FFEFD9] via-[#F5C49A] to-[#D98A55]",
  hero: "from-[#FFF5EE] via-[#FFDCC3] to-[#F0A46A]",
  generic: "from-[#FFF8F2] via-[#FFE8D6] to-[#F0A46A]",
};

interface ImagePlaceholderProps {
  tone?: Tone;
  label?: string;
  className?: string;
  rounded?: string;
  logo?: boolean;
}

/** Intentional visual stand-in until real photography is added. */
export function ImagePlaceholder({
  tone = "generic",
  label = "Photo coming soon",
  className = "",
  rounded = "rounded-[2rem]",
  logo = true,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`placeholder-media relative aspect-[4/5] overflow-hidden ${rounded} bg-gradient-to-br ${tones[tone]} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
        <div className="absolute bottom-8 right-4 h-48 w-48 rounded-full bg-orange-accent/25 blur-3xl" />
      </div>
      {logo ? (
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <Image
            src="/images/sunset-tea-logo.png"
            alt=""
            width={220}
            height={220}
            className="h-auto w-[55%] max-w-[220px] opacity-90 drop-shadow-sm"
          />
        </div>
      ) : null}
      <span className="absolute bottom-4 left-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

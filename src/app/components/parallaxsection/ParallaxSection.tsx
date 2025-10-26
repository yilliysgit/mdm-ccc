// components/ParallaxFixedSection.tsx
"use client";

type Props = {
  src: string;          // bv. "/images/maroc-desert.jpg"
  height?: string;      // bv. "80vh"
  className?: string;
  overlay?: boolean;    // donkere gradient erboven
};

export default function ParallaxSection({
  src,
  height = "80vh",
  className = "",
  overlay = true,
}: Props) {
  return (
    <section
      className={`relative bg-fixed bg-center bg-cover ${className}`}
      style={{ backgroundImage: `url(${src})`, height }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 pointer-events-none" />
      )}
      {/* zachte schaduw onderaan zodat hij blendt met de volgende sectie */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}

interface LogoImageProps {
  size?: 40 | 48 | 56;
  className?: string;
  pulse?: boolean;
}

const SIZE_MAP = {
  40: { width: 40, height: 40, webp: '/logo-80.webp' },
  48: { width: 48, height: 48, webp: '/logo-80.webp' },
  56: { width: 56, height: 56, webp: '/logo-160.webp' },
} as const;

/** Decorative brand mark — adjacent text provides the accessible name. */
export function LogoImage({ size = 40, className = '', pulse = false }: LogoImageProps) {
  const { width, height, webp } = SIZE_MAP[size];
  const pulseClass = pulse ? ' animate-pulse' : '';

  return (
    <picture>
      <source srcSet={`${webp} ${width * 2}w`} type="image/webp" sizes={`${width}px`} />
      <img
        src="/logo.png"
        alt=""
        width={width}
        height={height}
        decoding="async"
        className={`${className}${pulseClass}`.trim()}
      />
    </picture>
  );
}

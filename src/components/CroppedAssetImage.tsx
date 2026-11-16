import React, { useId } from 'react';
import { ImageCrop } from '../data/catalog';
import { resolveAssetPath } from '../utils/assetPath';

interface CroppedAssetImageProps {
  crop: ImageCrop;
  alt: string;
  className?: string;
  paddingRatio?: number;
  decorative?: boolean;
  eager?: boolean;
}

export const CroppedAssetImage: React.FC<CroppedAssetImageProps> = ({
  crop,
  alt,
  className = 'w-full h-full',
  paddingRatio = 0,
  decorative = false,
}) => {
  const rawId = useId();
  const clipId = `crop-clip-${rawId.replace(/:/g, '')}`;

  const padX = crop.w * paddingRatio;
  const padY = crop.h * paddingRatio;
  const vx = Math.max(0, crop.x - padX);
  const vy = Math.max(0, crop.y - padY);
  const vw = Math.min(crop.imgW - vx, crop.w + padX * 2);
  const vh = Math.min(crop.imgH - vy, crop.h + padY * 2);

  const resolvedHref = resolveAssetPath(crop.src);

  return (
    <svg
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? 'true' : undefined}
      className={`block select-none overflow-hidden ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {!decorative && <title>{alt}</title>}
      <defs>
        <clipPath id={clipId}>
          <rect x={vx} y={vy} width={vw} height={vh} rx={Math.min(vw, vh) * 0.03} />
        </clipPath>
      </defs>
      <image
        href={resolvedHref}
        width={crop.imgW}
        height={crop.imgH}
        preserveAspectRatio="none"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
};

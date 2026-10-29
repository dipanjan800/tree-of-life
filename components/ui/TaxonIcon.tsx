"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import { getNodeAccentColor } from "@/lib/tree-utils";

interface TaxonIconProps {
  node: TaxonNode;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * High-fidelity SVG icon for Dickinsonia costata.
 * Dickinsonia is an iconic Ediacaran organism with an oval shape,
 * a central axial ridge, and quilted transverse isomers with glide symmetry.
 */
export function DickinsoniaSvg({
  size = 20,
  color = "#2dd4bf",
}: {
  size?: number;
  color?: string;
}) {
  const gradientId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
      aria-label="Dickinsonia costata icon"
      role="img"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Outer oval / quilted body boundary */}
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="10.5"
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="1.3"
      />

      {/* Central midline / axial groove */}
      <line
        x1="12"
        y1="2.5"
        x2="12"
        y2="21.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Quilted transverse isomers (alternating glide symmetry) */}
      <path d="M12 4.5 C15 4.5 18 5.5 19.5 7.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 6 C9 6 6 7 4.5 9" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 8 C15.5 8 19 9 20.2 11" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 9.5 C8.5 9.5 5 10.5 3.8 12.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 11.5 C15.5 11.5 19 12.5 20.2 14.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 13 C8.5 13 5 14 3.8 16" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 15 C15 15 18.5 16 19.5 18" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 16.5 C9 16.5 6 17.5 4.5 19" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M12 18.5 C14.5 18.5 17 19.5 18 20.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M12 19.5 C9.5 19.5 7 20.2 6 21" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export default function TaxonIcon({
  node,
  size = 20,
  className,
  style,
}: TaxonIconProps) {
  if (node.id === "dickinsonia-costata") {
    const accentColor = getNodeAccentColor(node);
    return <DickinsoniaSvg size={size} color={accentColor} />;
  }

  if (!node.iconEmoji) return null;

  return (
    <span
      className={className}
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      {node.iconEmoji}
    </span>
  );
}


"use client";

import React from "react";
import type { IUCNCategory } from "@/types/conservation";
import { IUCN_CATEGORY_COLORS } from "@/data/conservation/modern-iucn";
import { useLanguage } from "@/lib/i18n";

interface IUCNStatusPillProps {
  category: IUCNCategory;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function IUCNStatusPill({
  category,
  size = "md",
  showLabel = true,
  className = "",
}: IUCNStatusPillProps) {
  const { ui } = useLanguage();
  const theme = IUCN_CATEGORY_COLORS[category] ?? IUCN_CATEGORY_COLORS.NE;
  const categoryFullLabel = ui.conservation?.iucnCategories?.[category] || category;

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[9.5px]",
    md: "px-2 py-0.5 text-[11px]",
    lg: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border select-none tracking-wide transition-all ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        borderColor: theme.border,
        boxShadow: `0 0 10px ${theme.glow}`,
      }}
      title={`IUCN Red List: ${categoryFullLabel}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: theme.border }}
        aria-hidden="true"
      />
      <span className="font-bold">{category}</span>
      {showLabel && (
        <span className="opacity-90 font-medium hidden sm:inline">
          · {categoryFullLabel.replace(`(${category})`, "").trim()}
        </span>
      )}
    </span>
  );
}


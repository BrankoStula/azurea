// components/ui/Magazine.tsx
"use client";

import React, { forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

const Page = forwardRef<HTMLDivElement, { imageUrl: string; pageNum: number }>(
  (props, ref) => {
    return (
      // Removed "bg-white", now transparent/dark to blend with the site
      <div className="page shadow-2xl bg-brand-black" ref={ref}>
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <Image
            src={props.imageUrl}
            alt={`Brochure Page ${props.pageNum}`}
            fill
            className="object-contain" // Ensures the whole page is visible without cropping
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={props.pageNum <= 4} 
          />
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

interface MagazineProps {
  pages: string[];
}

export default function Magazine({ pages }: MagazineProps) {
  return (
    <div className="flex items-center justify-center w-full h-full perspective-[2000px]">
      {/* @ts-expect-error - react-pageflip types are slightly outdated for React 18 */}
 <HTMLFlipBook
  width={600}
  height={848}
  size="stretch"
  minWidth={315}
  maxWidth={1200}
  minHeight={400}
  maxHeight={1600}
  maxShadowOpacity={0.5}
  showCover={true}
  mobileScrollSupport={true}
  className="magazine-flipbook"
  // Centered within the flexbox modal
  style={{ margin: "0 auto", transform: "scale(1.05)" }} 
>
        {pages.map((url, index) => (
          <Page key={index} imageUrl={url} pageNum={index + 1} />
        ))}
      </HTMLFlipBook>
    </div>
  );
}
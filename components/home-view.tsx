"use client";

import Image from "next/image";
import { brand } from "@/lib/menu";
import { Logo } from "./logo";

type HomeViewProps = {
  onOpenMenu: () => void;
  onOpenContact: () => void;
  onOpenStar: () => void;
};

export function HomeView({
  onOpenMenu,
  onOpenContact,
  onOpenStar,
}: HomeViewProps) {
  return (
    <div id="t9_main_page">
      <div id="t9_header_slider">
        <div className="gallery_item">
          <video autoPlay playsInline preload="auto" loop muted>
            <source src={brand.heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="t9_home"
        className="back_pattern"
        style={{ backgroundImage: `url('${brand.pattern}')` }}
      >
        <button
          type="button"
          onClick={onOpenMenu}
          className="t9_category"
          aria-label="منوی کافه"
        >
          <div>
            <Image
              src={brand.menuButton}
              alt="منوی کافه"
              width={1331}
              height={500}
              priority
            />
          </div>
          <div>منو</div>
        </button>

        <div id="t9_contact">
          <span onClick={onOpenContact} role="button" tabIndex={0}>
            <Image
              src="/ui/t9_about.png"
              alt=""
              width={14}
              height={14}
            />
            مشاهده اطلاعات تماس
          </span>
        </div>
        <div id="t9_star">
          <span onClick={onOpenStar} role="button" tabIndex={0} aria-label="باشگاه مشتریان">
            <Image src="/ui/t9_star.png" alt="" width={20} height={20} />
          </span>
        </div>
      </div>

      <div id="t9_logo">
        <Logo size="lg" />
      </div>
    </div>
  );
}

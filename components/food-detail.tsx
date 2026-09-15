"use client";

import Image from "next/image";
import type { Food } from "@/lib/types";
import { Logo } from "./logo";

type FoodDetailProps = {
  food: Food;
  onBack: () => void;
  onHome: () => void;
};

export function FoodDetail({ food, onBack, onHome }: FoodDetailProps) {
  return (
    <div id="t9_detail">
      <div id="t9_detail_header" className="tbl">
        <div>
          <span onClick={onBack} role="button" tabIndex={0}>
            <Image src="/ui/t9_home.png" alt="" width={18} height={18} />
            بازگشت
          </span>
        </div>
        <div>
          <button type="button" onClick={onHome} aria-label="ویژن">
            <Logo size="sm" />
          </button>
        </div>
        <div />
      </div>
      <div id="t9_detail_container">
        <div id="t9_detail_title">{food.name}</div>
        <div id="t9_detail_price">{food.price}</div>
        <div id="t9_detail_image">
          {food.image ? (
            <Image
              src={food.image}
              alt={food.name}
              width={900}
              height={900}
              sizes="(max-width: 600px) 90vw, 600px"
            />
          ) : null}
        </div>
        <div
          id="t9_detail_content"
          dangerouslySetInnerHTML={{ __html: food.content }}
        />
      </div>
    </div>
  );
}

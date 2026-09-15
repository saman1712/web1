"use client";

import Image from "next/image";
import type { Category, Food } from "@/lib/types";
import { Logo } from "./logo";

type MenuViewProps = {
  categories: Category[];
  activeIndex: number;
  onSelectCategory: (index: number) => void;
  onBack: () => void;
  onOpenFood: (food: Food) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function MenuView({
  categories,
  activeIndex,
  onSelectCategory,
  onBack,
  onOpenFood,
  onPrev,
  onNext,
}: MenuViewProps) {
  const category = categories[activeIndex];

  return (
    <div id="t9_list_page">
      <div id="t9_menu">
        {categories.map((cat, index) => (
          <button
            type="button"
            key={cat.id}
            className={`t9_menu${index === activeIndex ? " selected" : ""}`}
            onClick={() => onSelectCategory(index)}
          >
            <div>
              {cat.icon ? (
                <Image src={cat.icon} alt="" width={45} height={45} />
              ) : null}
            </div>
            <div>{cat.name}</div>
            <div style={{ fontSize: "6pt", lineHeight: "11px" }}>
              {cat.enName}
            </div>
          </button>
        ))}
      </div>

      <div id="t9_foods">
        <div id="t9_header" className="tbl">
          <div>
            <span onClick={onBack} role="button" tabIndex={0}>
              <Image src="/ui/t9_home.png" alt="" width={18} height={18} />
              بازگشت
            </span>
          </div>
          <div>
            <button type="button" onClick={onBack} aria-label="ویژن">
              <Logo size="sm" />
            </button>
          </div>
          <div />
        </div>

        <div id="t9_food_title">{category.name}</div>

        <div id="t9_food_container">
          {category.items.map((food) => (
            <article key={food.id} className="t9_food">
              <div>
                <div>
                  <div
                    onClick={() => onOpenFood(food)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onOpenFood(food);
                    }}
                    aria-label={food.name}
                  >
                    {food.image ? (
                      <Image
                        src={food.image}
                        alt={food.name}
                        fill
                        sizes="(max-width: 800px) 96vw, 1000px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {food.icon ? (
                      <Image
                        className="food_icon"
                        src={food.icon}
                        alt=""
                        width={18}
                        height={18}
                      />
                    ) : null}
                    {food.name}
                  </div>
                  <div>{food.enName}</div>
                  <div className="t9_description">{food.description}</div>
                  <div>{food.price}</div>
                  <div>
                    {/* Ordering is disabled on the original (order_null.js) */}
                    <div className="t8_food_button" style={{ display: "none" }} />
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="clr" />
          <div id="t9_buttons">
            <div onClick={onPrev} role="button" tabIndex={0}>
              قبلی
            </div>
            <div onClick={onNext} role="button" tabIndex={0}>
              بعدی
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

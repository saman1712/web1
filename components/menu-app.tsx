"use client";

import { useCallback, useEffect, useState } from "react";
import { categories } from "@/lib/menu";
import type { Food } from "@/lib/types";
import { HomeView } from "./home-view";
import { MenuView } from "./menu-view";
import { FoodDetail } from "./food-detail";
import { ContactPanel } from "./contact-panel";
import { StarRating } from "./star-rating";

type View = "home" | "menu" | "detail";

export function MenuApp() {
  const [view, setView] = useState<View>("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [starOpen, setStarOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const showLoading = useCallback((fn: () => void, ms = 220) => {
    setLoading(true);
    window.setTimeout(() => {
      fn();
      setLoading(false);
    }, ms);
  }, []);

  const openMenu = useCallback(() => {
    showLoading(() => {
      setActiveIndex(0);
      setView("menu");
      window.history.pushState({ view: "menu" }, "", "#list");
    });
  }, [showLoading]);

  const goHome = useCallback(() => {
    setView("home");
    setFood(null);
    window.history.pushState({ view: "home" }, "", "/");
  }, []);

  const openFood = useCallback((item: Food) => {
    showLoading(() => {
      setFood(item);
      setView("detail");
      window.history.pushState({ view: "detail", id: item.id }, "", "#foodDetail");
    });
  }, [showLoading]);

  const backToList = useCallback(() => {
    setView("menu");
    setFood(null);
    window.history.pushState({ view: "menu" }, "", "#list");
  }, []);

  const selectCategory = useCallback((index: number) => {
    setActiveIndex(index);
    const scroller = document.getElementById("t9_foods");
    if (scroller) scroller.scrollTop = 0;
  }, []);

  const stepCategory = useCallback(
    (dir: "prev" | "next") => {
      setActiveIndex((current) => {
        const len = categories.length;
        if (dir === "next") return (current + 1) % len;
        return (current - 1 + len) % len;
      });
      const scroller = document.getElementById("t9_foods");
      if (scroller) scroller.scrollTop = 0;
    },
    [],
  );

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash;
      if (hash === "#foodDetail" && food) {
        setView("detail");
      } else if (hash === "#list") {
        setView("menu");
        setFood(null);
      } else {
        setView("home");
        setFood(null);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [food]);

  return (
    <>
      {view === "home" ? (
        <HomeView
          onOpenMenu={openMenu}
          onOpenContact={() => setContactOpen(true)}
          onOpenStar={() => setStarOpen(true)}
        />
      ) : null}

      {view === "menu" ? (
        <MenuView
          categories={categories}
          activeIndex={activeIndex}
          onSelectCategory={selectCategory}
          onBack={goHome}
          onOpenFood={openFood}
          onPrev={() => stepCategory("prev")}
          onNext={() => stepCategory("next")}
        />
      ) : null}

      {view === "detail" && food ? (
        <FoodDetail food={food} onBack={backToList} onHome={goHome} />
      ) : null}

      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />

      <StarRating
        starOpen={starOpen}
        ratingOpen={ratingOpen}
        onOpenStarClose={() => setStarOpen(false)}
        onOpenRating={() => {
          setRatingOpen(true);
        }}
        onCloseRating={() => setRatingOpen(false)}
      />

      {loading ? (
        <div id="loading" className="tbl">
          <div>
            <i />
          </div>
        </div>
      ) : null}
    </>
  );
}

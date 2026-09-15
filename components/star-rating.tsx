"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StarRatingProps = {
  starOpen: boolean;
  ratingOpen: boolean;
  onOpenStarClose: () => void;
  onOpenRating: () => void;
  onCloseRating: () => void;
};

const QUESTIONS = [
  "نظر شما در مورد کیفیت غذاهای مجموعه چه بود؟",
  "نظر شما در مورد نحوه ارائه خدمات توسط پرسنل مجموعه چه بود؟",
];

export function StarRating({
  starOpen,
  ratingOpen,
  onOpenStarClose,
  onOpenRating,
  onCloseRating,
}: StarRatingProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["عالی", "عالی"]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  function reset() {
    setStep(0);
    setAnswers(["عالی", "عالی"]);
    setName("");
    setMobile("");
    setComment("");
  }

  async function submit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: QUESTIONS.map((question, i) => ({
            question,
            answer: answers[i],
          })),
          name,
          mobile,
          comment,
        }),
      });
      const data = await res.json();
      setToast({ ok: Boolean(data.status), text: data.message });
      if (data.status) {
        reset();
        onCloseRating();
      }
    } catch {
      setToast({ ok: false, text: "خطا در برقراری ارتباط" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <>
      <AnimatePresence>
        {starOpen ? (
            <motion.div
              key="star"
              id="t9_star_window"
              className="tbl"
              initial={{ x: "120%" }}
              animate={{ x: 0 }}
              exit={{ x: "120%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ position: "fixed", right: 0, left: 0 }}
            >
              <div>
                <div>
                  <span onClick={onOpenRating} role="button" tabIndex={0}>
                    باشگاه مشتریان
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="drawer-close"
                onClick={onOpenStarClose}
                aria-label="بستن"
              />
            </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {ratingOpen ? (
          <>
            <motion.div
              id="action_back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseRating}
            />
            <motion.div
              className="action_window"
              id="rate"
              initial={{ opacity: 0, bottom: -800 }}
              animate={{ opacity: 1, bottom: 20 }}
              exit={{ opacity: 0, bottom: -800 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 ? (
                <div className="rate_step">
                  <div className="pager_title">{QUESTIONS[0]}</div>
                  <div className="pager_buttons">
                    {["عالی", "متوسط", "ضعیف"].map((value) => (
                      <label key={value}>
                        <input
                          type="radio"
                          name="rate_0"
                          checked={answers[0] === value}
                          value={value}
                          onChange={() =>
                            setAnswers((prev) => [value, prev[1]])
                          }
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                  <div className="quiz_button">
                    <span onClick={() => setStep(1)}>بعدی</span>
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="rate_step">
                  <div className="pager_title">{QUESTIONS[1]}</div>
                  <div className="pager_buttons">
                    {["عالی", "متوسط", "ضعیف"].map((value) => (
                      <label key={value}>
                        <input
                          type="radio"
                          name="rate_1"
                          checked={answers[1] === value}
                          value={value}
                          onChange={() =>
                            setAnswers((prev) => [prev[0], value])
                          }
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                  <div className="quiz_button">
                    <span onClick={() => setStep(0)}>قبلی</span>
                    <span onClick={() => setStep(2)}>بعدی</span>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="rate_step">
                  <div className="pager_title">نظر خود را ثبت نمائید</div>
                  <div className="pager_input">
                    <div>نام شما</div>
                    <input
                      type="text"
                      placeholder="___ _____"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="pager_input">
                    <div>شماره موبایل</div>
                    <input
                      type="text"
                      className="ltr"
                      placeholder="09__________"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="pager_input">
                    <div>اگر نظر دیگری دارید اینجا وارد کنید</div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="pager_save">
                    <span onClick={submitting ? undefined : submit}>
                      {submitting ? "..." : "ثبت نظر"}
                    </span>
                  </div>
                  <div className="quiz_button">
                    <span onClick={() => setStep(1)}>بازگشت به سوالات</span>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {toast ? (
        <div id="message_bar" className={toast.ok ? "true_message" : "false_message"}>
          <div onClick={() => setToast(null)}>
            <i />
            <span>{toast.text}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}

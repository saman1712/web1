"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/lib/menu";

type ContactPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactPanel({ open, onClose }: ContactPanelProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="contact"
          initial={{ x: "-120%" }}
          animate={{ x: 0 }}
          exit={{ x: "-120%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
          }}
        >
          <div id="t9_contact_window" className="tbl" style={{ left: 0 }}>
            <div>
              <div id="contact_container">
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="t8_contact"
                >
                  <div>
                    <Image
                      src="/ui/t8_instagram.png"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <div className="ltr">{brand.instagram}</div>
                  </div>
                </a>
                <a
                  id="location_link"
                  href={brand.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="t8_contact"
                >
                  <div>
                    <Image
                      src="/ui/t8_address.png"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <div className="ltr">{brand.mapLabel}</div>
                  </div>
                </a>
                <div className="clr" />
                <div className="t8_contact t8_contact_address">
                  <div>{brand.address}</div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="بستن"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

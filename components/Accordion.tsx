"use client";

import { useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

/** Akadálymentes accordion aria-expanded / aria-controls attribútumokkal. */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-bronze"
              >
                <span className="font-serif text-2xl font-light text-inherit">{item.question}</span>
                <svg
                  viewBox="0 0 14 14"
                  className={`h-3.5 w-3.5 shrink-0 text-bronze transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-6 pr-10"
            >
              <p className="text-sm leading-relaxed text-faded">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

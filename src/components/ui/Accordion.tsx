"use client";

import { useId, useState, type ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-border rounded-[1.75rem] border border-border bg-white/70 backdrop-blur-sm">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="px-5 sm:px-7">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-charcoal transition-colors hover:text-orange-deep sm:text-lg"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-peach-100 text-orange-accent transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={isOpen ? "pb-5 pr-8 text-muted leading-relaxed" : undefined}
            >
              {isOpen ? item.content : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

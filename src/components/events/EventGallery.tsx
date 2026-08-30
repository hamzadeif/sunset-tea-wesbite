"use client";

import { useMemo, useState } from "react";
import { EVENT_CATEGORIES, EVENTS, type EventCategory } from "@/lib/config/events";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Image from "next/image";

export function EventGallery() {
  const [filter, setFilter] = useState<EventCategory | "all">("all");

  const items = useMemo(
    () => (filter === "all" ? EVENTS : EVENTS.filter((e) => e.category === filter)),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Event categories">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {EVENT_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.id}
            active={filter === cat.id}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </FilterChip>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((event) => (
          <article
            key={event.id}
            className="overflow-hidden rounded-[2rem] border border-border bg-white/70 shadow-[var(--shadow-soft)]"
          >
            <div className="relative">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.name}
                  width={800}
                  height={600}
                  className="aspect-[5/4] w-full object-cover"
                />
              ) : (
                <ImagePlaceholder
                  tone="event"
                  label="Add event photo"
                  className="aspect-[5/4] rounded-none"
                  rounded="rounded-none"
                />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-accent backdrop-blur-sm">
                {EVENT_CATEGORIES.find((c) => c.id === event.category)?.label}
              </span>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-2xl text-charcoal">{event.name}</h3>
              <p className="mt-1 text-sm font-medium text-muted">
                {event.city}
                {event.date ? ` · ${event.date}` : ""}
              </p>
              <p className="mt-3 text-muted leading-relaxed">{event.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-charcoal text-white"
          : "bg-white/80 text-muted hover:bg-peach-100 hover:text-charcoal"
      }`}
    >
      {children}
    </button>
  );
}

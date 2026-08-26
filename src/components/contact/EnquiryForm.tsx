"use client";

import { useState } from "react";
import { stores } from "@/content/site";
import { contact } from "@/content/pages";
import { Button, Arrow } from "@/components/primitives/Button";

/**
 * The site is static and takes no orders, so there is no server to post to
 * and no honest reason to pretend otherwise. The form composes a WhatsApp
 * message to the chosen store instead, which is where these conversations
 * actually happen and which leaves the sender a copy of what they asked for.
 */
export function EnquiryForm() {
  const [storeSlug, setStore] = useState(stores[0].slug);
  const [reason, setReason] = useState<string>(contact.reasons[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const store = stores.find((s) => s.slug === storeSlug) ?? stores[0];

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Hello CDS ${store.city},`,
      "",
      `My name is ${name || "a customer"}.`,
      `I am getting in touch about: ${reason}.`,
      message ? "" : null,
      message || null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(
      `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <form onSubmit={send} className="flex flex-col gap-5">
      <Field label="Which store" htmlFor="store">
        <div className="grid grid-cols-2 gap-2">
          {stores.map((s) => {
            const on = s.slug === storeSlug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setStore(s.slug)}
                aria-pressed={on}
                className={`rounded-xl border px-4 py-3.5 text-left text-[0.9375rem] transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] ${
                  on
                    ? "border-caramel bg-clay text-cocoa"
                    : "border-[rgba(138,90,59,0.3)] bg-cream text-body hover:border-caramel"
                }`}
              >
                {s.city}
                <span className="mt-0.5 block text-[0.8125rem] tnum text-caramel">
                  {s.phoneDisplay}
                </span>
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Your name" htmlFor="name">
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="So we know who we are speaking to"
          className={input}
        />
      </Field>

      <Field label="What is it about" htmlFor="reason">
        <select
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={`${input} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-11`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%238a5a3b' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
          }}
        >
          {contact.reasons.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </Field>

      <Field label="Anything else" htmlFor="message" optional>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Sizes, dates, flavours, how many boxes"
          className={`${input} resize-y`}
        />
      </Field>

      <div className="mt-2 flex flex-col gap-3">
        <Button type="submit" fluid>
          Send on WhatsApp
          <Arrow />
        </Button>
        <p className="text-[0.8125rem] leading-relaxed text-caramel">
          This opens WhatsApp with your message ready to send to the {store.city}{" "}
          counter. Nothing is stored on this website, and no order is placed
          here.
        </p>
      </div>
    </form>
  );
}

const input =
  "w-full rounded-xl border border-[rgba(138,90,59,0.3)] bg-cream px-4 py-3.5 text-[0.9375rem] text-cocoa " +
  "transition-[border-color,box-shadow] duration-200 hover:border-caramel " +
  "focus:border-terracotta-700 focus:outline-none focus:shadow-[0_0_0_3px_rgba(190,95,60,0.28)]";

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 text-[0.875rem] text-cocoa"
      >
        {label}
        {optional && (
          <span className="text-[0.75rem] text-caramel">Optional</span>
        )}
      </label>
      {children}
    </div>
  );
}

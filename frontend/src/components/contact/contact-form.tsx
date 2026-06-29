"use client";

import { useState } from "react";
import { User, Mail, Phone, Pencil, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

const SUBJECT_KEYS = [
  "subj.product",
  "subj.price",
  "subj.install",
  "subj.consult",
  "subj.other",
];

const inputCls =
  "w-full rounded-lg border bg-background py-3 pl-10 pr-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";

export function ContactForm() {
  const t = useT();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to backend /api/contact once the endpoint is ready
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="size-12 text-brand-accent" />
        <h3 className="text-lg font-semibold">{t("form.successTitle")}</h3>
        <p className="text-sm text-muted-foreground">{t("form.successText")}</p>
        <Button
          variant="outline"
          onClick={() => setSent(false)}
          className="mt-2"
        >
          {t("form.new")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-bold tracking-tight text-brand">
        {t("form.title")}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("form.subtitle")}</p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="name"
              required
              placeholder={`${t("form.name")}*`}
              className={inputCls}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="email"
              type="email"
              required
              placeholder={`${t("form.email")}*`}
              className={inputCls}
            />
          </div>
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input name="phone" placeholder={t("form.phone")} className={inputCls} />
        </div>

        <select
          name="subject"
          defaultValue=""
          className="w-full rounded-lg border bg-background px-3 py-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
        >
          <option value="" disabled>
            {t("form.chooseTopic")}
          </option>
          {SUBJECT_KEYS.map((s) => (
            <option key={s} value={t(s)}>
              {t(s)}
            </option>
          ))}
        </select>

        <div className="relative">
          <Pencil className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
          <textarea
            name="message"
            required
            rows={5}
            placeholder={`${t("form.message")}*`}
            className="w-full resize-y rounded-lg border bg-background py-3 pl-10 pr-3 text-sm outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="self-start bg-brand-accent text-white hover:bg-brand-accent/90"
        >
          <Send className="size-4" />
          {t("form.send")}
        </Button>
      </div>
    </form>
  );
}

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { site, artists, styles } from "@/data/site";
export type Booking = { service?: string; artist?: string; style?: string };
export function Questionnaire({ initial }: { initial: Booking }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Record<string, string>>({
    service: initial.service || "Tatuagem",
    artist: initial.artist || "Quero uma indicação",
    style: initial.style || "",
  });
  const stepTitle = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (step > 0) stepTitle.current?.focus();
  }, [step]);
  const update = (key: string, value: string) =>
    setA((s) => ({ ...s, [key]: value }));
  const field = (
    key: string,
    label: string,
    required = false,
    options?: string[],
  ) => (
    <label key={key}>
      {label}
      {options ? (
        <select
          value={a[key] || ""}
          onChange={(e) => update(key, e.target.value)}
          required={required}
        >
          <option value="">Selecione</option>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      ) : key === "idea" ? (
        <textarea
          value={a[key] || ""}
          onChange={(e) => update(key, e.target.value)}
          required={required}
          rows={3}
        />
      ) : (
        <input
          value={a[key] || ""}
          onChange={(e) => update(key, e.target.value)}
          required={required}
          autoComplete={key === "name" ? "given-name" : "off"}
          maxLength={300}
        />
      )}
    </label>
  );
  const details = Object.entries(a).filter(
    ([key, value]) =>
      value &&
      (a.service === "Tatuagem" || !["style", "artist"].includes(key)) &&
      (a.service !== "Piercing" || key !== "size"),
  );
  const labels: Record<string, string> = {
    service: "Serviço",
    artist: "Profissional",
    style: "Estilo",
    region: "Região",
    size: "Tamanho",
    idea: "Ideia / dúvidas",
    name: "Nome",
    availability: "Disponibilidade",
  };
  const message =
    "Olá, Good Vibe! Gostaria de conversar sobre um orçamento.\n" +
    details.map(([k, v]) => `${labels[k]}: ${v}`).join("\n");
  return (
    <div className="questionnaire">
      <p className="eyebrow">VAMOS CRIAR ALGO SEU</p>
      <h2>
        Sua próxima
        <br />
        história começa aqui.
      </h2>
      <p ref={stepTitle} tabIndex={-1} className="step" aria-live="polite">
        Etapa {step + 1} de 3 —{" "}
        {["Serviço", "Sua ideia", "Vamos conversar"][step]}
      </p>
      <div className="progress">
        <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep((s) => Math.min(2, s + 1));
        }}
      >
        {step === 0 && (
          <fieldset>
            <legend>O que você tem em mente?</legend>
            {["Tatuagem", "Piercing", "Remoção a laser"].map((s) => (
              <label className="radio" key={s}>
                <input
                  type="radio"
                  name="service"
                  value={s}
                  checked={a.service === s}
                  onChange={() => update("service", s)}
                />
                {s}
                <ArrowUpRight size={18} />
              </label>
            ))}
          </fieldset>
        )}
        {step === 1 && (
          <div className="fields">
            {a.service === "Tatuagem" &&
              field("style", "Estilo desejado", true, [
                ...styles,
                "Quero uma indicação",
              ])}
            {field("region", "Região do corpo", true)}
            {a.service !== "Piercing" &&
              field("size", "Tamanho aproximado", true)}
            {field(
              "idea",
              a.service === "Piercing"
                ? "Preferências ou dúvidas"
                : "Conte sua ideia",
              true,
            )}
            {a.service === "Tatuagem" &&
              field("artist", "Profissional de preferência", true, [
                "Quero uma indicação",
                ...artists.slice(0, 3).map((x) => x.name || x.specialty),
              ])}
            {a.service === "Piercing" && <p>Profissional: Moreira</p>}
          </div>
        )}
        {step === 2 && (
          <div className="fields">
            {field("name", "Seu nome", true)}
            {field("availability", "Período ou disponibilidade", true)}
            <div className="summary">
              {details.map(([k, v]) => (
                <p key={k}>
                  <span>{labels[k]}</span> {v}
                </p>
              ))}
              {a.service === "Piercing" && <p>Profissional: Moreira</p>}
            </div>
            <p className="muted">
              A conversa no WhatsApp não confirma o agendamento. Você poderá
              enviar suas referências por lá.
            </p>
          </div>
        )}
        <div className="form-actions">
          {step > 0 && (
            <button
              type="button"
              className="text-button"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} /> Voltar
            </button>
          )}
          {step < 2 ? (
            <button className="button" type="submit">
              Continuar <ArrowUpRight size={17} />
            </button>
          ) : (
            <button
              className="button"
              type="button"
              onClick={(e) => {
                if (e.currentTarget.form?.reportValidity())
                  window.open(
                    `${site.whatsapp}?text=${encodeURIComponent(message + (a.service === "Piercing" ? "\nProfissional: Moreira" : ""))}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
              }}
            >
              Continuar no WhatsApp <ArrowUpRight size={17} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

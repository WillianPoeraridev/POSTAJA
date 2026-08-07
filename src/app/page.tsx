"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Check } from "lucide-react";

// Preview do produto no hero — o objeto de desejo, não um exemplo pra convencer.
const PREVIEW = [
  { day: 1, pillar: "Atração", color: "bg-rose-600", glow: "shadow-rose-600/40", theme: "O erro que afasta cliente" },
  { day: 2, pillar: "Conexão", color: "bg-cyan-600", glow: "shadow-cyan-600/40", theme: "O bastidor de hoje" },
  { day: 5, pillar: "Conversão", color: "bg-green-600", glow: "shadow-green-600/40", theme: "Tá na hora de agendar" },
];

const PRO_FEATURES = [
  "A estratégia dos 30 dias, montada todo mês",
  "Cada post com função — atrair, conectar, vender",
  "O post do dia no seu WhatsApp",
  "Roteiro de Reels e horário certo por post",
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

/** Card com tilt 3D que segue o mouse — profundidade real via preserve-3d + translateZ. */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [11, -11]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-13, 13]), { stiffness: 140, damping: 18 });

  return (
    <div
      style={{ perspective: 1100 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070707] text-foreground">
      {/* Fundo vivo — mesh animado + grain por cima de tudo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mesh-blob absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-rose-600/25 blur-[140px]" />
        <div className="mesh-blob-slow absolute top-1/4 -right-48 h-[38rem] w-[38rem] rounded-full bg-orange-500/15 blur-[140px]" />
        <div className="mesh-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-rose-900/20 blur-[120px]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* NAV — mínima, some na frente do produto */}
      <nav className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
            Cadência
          </span>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-neutral-400 transition-colors hover:text-white">
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
            >
              Ver meu mês grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — uma frase, um objeto, um botão */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-14 pb-24 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-5xl font-extrabold leading-[0.98] tracking-[-0.03em] md:text-6xl lg:text-7xl"
            >
              O trabalho difícil do seu Instagram é a estratégia.{" "}
              <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                Ela já vem pronta.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-6 max-w-md text-lg text-neutral-400"
            >
              Cada post com uma função — atrair, criar confiança, vender. Você só posta.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/cadastro"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_8px_40px_-8px] shadow-rose-600/50 transition-all hover:shadow-[0_8px_50px_-6px] hover:shadow-rose-500/60 hover:brightness-110"
              >
                Ver meu mês grátis
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-xs leading-relaxed text-neutral-500">
                Grátis pra ver funcionar.
                <br className="hidden sm:block" /> Sem cartão.
              </span>
            </motion.div>
          </div>

          {/* O produto como objeto 3D */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-rose-600/30 to-orange-500/15 blur-3xl" />
            <TiltCard>
              <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-200">Seu mês, com função</span>
                  <span className="font-mono text-xs text-neutral-500">30 dias</span>
                </div>
                <div className="space-y-3">
                  {PREVIEW.map((p, i) => (
                    <div
                      key={p.day}
                      style={{ transform: `translateZ(${34 + i * 14}px)` }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 px-4 py-3"
                    >
                      <span className="w-10 shrink-0 font-mono text-xs text-neutral-500">D{String(p.day).padStart(2, "0")}</span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg ${p.color} ${p.glow}`}
                      >
                        {p.pillar}
                      </span>
                      <span className="truncate text-sm text-neutral-300">{p.theme}</span>
                    </div>
                  ))}
                </div>
                <p style={{ transform: "translateZ(20px)" }} className="mt-5 text-xs text-neutral-500">
                  + 27 dias, cada um com um propósito.
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* A EXPLICAÇÃO INTEIRA EM TRÊS FRASES — quem é bom não faz tutorial */}
      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="flex flex-col gap-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            {["Você diz teu negócio.", "A estratégia chega pronta.", "Você posta."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={i === 2 ? "bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent" : "text-neutral-300"}
              >
                {line}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇO — um card só, dominando */}
      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <motion.div {...reveal} className="mx-auto max-w-xl">
            <h2 className="text-center text-4xl font-extrabold tracking-tight md:text-5xl">Liga a estratégia.</h2>
            <p className="mt-3 text-center text-neutral-400">
              Cada mês sem estratégia é audiência que não converte.
            </p>

            <div className="mt-12 rounded-[1.75rem] bg-gradient-to-b from-rose-500/60 via-rose-500/20 to-transparent p-px">
              <div className="rounded-[calc(1.75rem-1px)] bg-neutral-950/95 p-8 md:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold">Cadência</span>
                  <span className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 text-xs font-bold text-white">
                    1º mês R$197
                  </span>
                </div>
                <p className="mt-4 text-6xl font-extrabold tracking-tight">
                  R$497<span className="text-xl font-normal text-neutral-500">/mês</span>
                </p>
                <p className="mt-2 text-sm text-neutral-500">Primeiro mês por R$197, pra testar de pé.</p>

                <ul className="mt-8 space-y-3.5 text-[0.95rem] text-neutral-300">
                  {PRO_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-rose-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/cadastro"
                  className="group mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 py-4 text-lg font-semibold text-white shadow-[0_8px_40px_-8px] shadow-rose-600/50 transition-all hover:shadow-rose-500/60 hover:brightness-110"
                >
                  Começar por R$197
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Quer ver funcionar antes?{" "}
              <Link href="/cadastro" className="text-neutral-300 underline underline-offset-4 transition-colors hover:text-white">
                Vê teu mês grátis
              </Link>{" "}
              — sem cartão.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-10 text-center text-xs text-neutral-700">Cadência</footer>
    </div>
  );
}

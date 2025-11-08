"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  Instagram,
  Facebook,
  Link,
  BrainCircuit,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { useRef } from "react";
import CookieBanner from "@/components/cookie/cookie-banner";

type FeatureFlipCardProps = {
  title: string;
  children: React.ReactNode;
};

const FeatureFlipCard: React.FC<FeatureFlipCardProps> = ({
  title,
  children,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative perspective-[1200px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      aria-label={
        hovered ? "Karte umdrehen (zurück)" : "Karte umdrehen (mehr Info)"
      }
      role="button"
      style={{
        outline: "none",
        width: "100%",
        height: "320px",
        maxWidth: "400px",
      }}
    >
      <div
        className={`transition-transform duration-500 ease-in-out w-full h-full`}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          minHeight: "320px",
          height: "100%",
          width: "100%",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            zIndex: 2,
            height: "100%",
            width: "100%",
          }}
        >
          <h3 className="text-xl font-semibold text-black text-center">
            {title}
          </h3>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            zIndex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <p className="text-gray-600 text-left">{children}</p>
        </div>
      </div>
    </div>
  );
};

// 3D Card Tilt effect (reusable)

type CardTiltProps = {
  children: React.ReactNode;
  maxTilt?: number; // degrees
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  maxTilt = 15,
  scale = 1.04,
  className = "",
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * maxTilt;
    const rotateX = -((y - midY) / midY) * maxTilt;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.4s cubic-bezier(.21,.98,.6,.99)";
      card.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
      setTimeout(() => {
        // Restore original transition after animation
        card.style.transition = "transform 0.2s cubic-bezier(.21,.98,.6,.99)";
      }, 400);
    }
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transition: "transform 0.2s cubic-bezier(.21,.98,.6,.99)",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const TestimonialCard = ({
  avatarText,
  name,
  role,
  children,
}: {
  avatarText: string;
  name: string;
  role: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-8">
    <p className="text-gray-800 italic">&quot;{children}&quot;</p>
    <div className="flex items-center mt-6">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
        {avatarText}
      </div>
      <div className="ml-4">
        <p className="font-semibold text-black">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const FaqItem = ({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) => (
  <details className="group bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:border-black">
    <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-black">
      {question}
      <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
    </summary>
    <p className="mt-4 text-gray-600">{children}</p>
  </details>
);

const Header = () => (
  <header
    className="sticky top-0 z-50"
    style={{
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    }}
  >
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <ScrollProgress className="top-[65px]" />
      <a
        href="#start"
        className="font-bold text-xl text-black flex items-center gap-2"
      >
        <Image
          src="/images/congrads-logo.svg"
          alt="Congrads Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <span>Congrads</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-gray-500">
        <a href="#how-it-works" className="hover:text-black transition-colors">
          Warum Tracking?
        </a>
        <a href="#features" className="hover:text-black transition-colors">
          Pixel & CAPI
        </a>
        <a href="#why-both" className="hover:text-black transition-colors">
          Warum beides?
        </a>
        <a href="#about-us" className="hover:text-black transition-colors">
          Über uns
        </a>
        <a href="#faq" className="hover:text-black transition-colors">
          FAQ
        </a>
      </nav>
      <button
        type="button"
        className="bg-gradient-to-r from-[#2d5cf2] via-[#90a5e8ff] to-[#2b428bff] text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors transform relative overflow-hidden hover:scale-105"
        style={{
          background: "linear-gradient(270deg, #2d5cf2, #90a5e8ff, #2b428bff)",
          backgroundSize: "600% 600%",
          animation: "gradientMove 10s ease infinite",
        }}
        onClick={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          if (btn.dataset.running) return;
          btn.dataset.running = "1";
          const originalText = btn.innerText;
          // start visual nudge
          btn.classList.add(
            "scale-105",
            "transition-transform",
            "duration-200",
            "ease-out"
          );

          let sec = 3;
          btn.innerText = `Los geht's! (${sec})`;
          const interval = setInterval(() => {
            sec -= 1;
            if (sec > 0) {
              btn.innerText = `Los geht's! (${sec})`;
            } else {
              clearInterval(interval);
              // subtle fade-out before redirect
              btn.classList.add(
                "opacity-0",
                "transition-opacity",
                "duration-300"
              );
              setTimeout(() => {
                window.location.href = "mailto:contact@congrads.de";
              }, 300);
            }
          }, 1000);

          // safety: after 6s ensure state cleared (in case)
          setTimeout(() => {
            delete btn.dataset.running;
            btn.innerText = originalText;
            btn.classList.remove("scale-105", "opacity-0");
          }, 6000);
        }}
      >
        Jetzt anfragen
        <style>
          {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
          `}
        </style>
      </button>
    </div>
  </header>
);

const HeroSection = () => {
  return (
    <section id="start" className="relative py-24 md:py-32 text-center overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-0 max-w-3xl mx-auto text-center">
        <BlurFade direction="down" delay={0.25 * 1}>
          <Image
            src="/images/congrads-logo.svg"
            alt="Congrads Logo"
            width={80}
            height={80}
            className="mx-auto mb-8 w-20 h-20"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-center text-black leading-snug md:leading-tight tracking-tighter">
            Dein Tracking{" "}
            <AuroraText colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}>
              lügt
            </AuroraText>
            .
            <br className="md:block" />
            Wir{" "}
            <AuroraText colors={["#2d5cf2", "#2b428bff", "#90a5e8ff"]}>
              beweisen
            </AuroraText>{" "}
            es.
          </h1>
        </BlurFade>
        <BlurFade direction="down" delay={0.25 * 2}>
          <p className="mt-4 md:mt-6 max-w-xl mx-auto text-left sm:text-lg text-gray-600 leading-relaxed">
            Wir bringen dein Meta-Tracking auf Kurs, damit deine Ads treffen.
            Konzentrier dich auf dein Business, wir kümmern uns um die Technik
            dahinter.
          </p>
        </BlurFade>
      </div>
      <div className="mt-10 flex justify-center gap-4">
        <BlurFade direction="down" delay={0.25 * 3}>
          <a
            href="mailto:contact@congrads.de"
            className="bg-gradient-to-r from-[#2d5cf2] via-[#2b428bff] to-[#90a5e8ff] text-white px-8 py-3 rounded-lg font-semibold hover:brightness-50 transition relative overflow-hidden"
            style={{
              background:
                "linear-gradient(270deg, #2d5cf2, #2b428bff, #90a5e8ff)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 10s ease infinite",
            }}
          >
            Unverbindlichen Termin buchen
            <style>
              {`
                  @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
            </style>
          </a>
        </BlurFade>
      </div>
    </section>
  );
};

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 bg-white">
    <div className="container mx-auto px-6 text-center">
      <BlurFade direction="down" delay={0.25 * 4} inView>
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Budget{" "}
          <span
            className="relative inline-block"
            style={{
              cursor: "pointer",
              color: "#111827",
              transition:
                "color 0.3s, background-position 0.5s cubic-bezier(.21,.98,.6,.99)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "transparent";
              el.style.backgroundImage =
                "linear-gradient(90deg, #ff9800, #ff5722, #e91e63, #ff9800)";
              el.style.backgroundSize = "200% 100%";
              el.style.webkitBackgroundClip = " text";
              el.style.backgroundPosition = "100% 0";
              el.style.webkitTextFillColor = "transparent";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundImage = "";
              el.style.backgroundPosition = "";
              el.style.webkitBackgroundClip = " text";
              el.style.webkitTextFillColor = "";
              el.style.color = "#111827";
            }}
          >
            verbrannt
          </span>
          ?
          <br />
          Das muss nicht sein.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Deine Ad-Performance ist ein Glücksspiel, weil dein Tracking
          lückenhaft ist. Ohne saubere Daten durch Meta Pixel & die Conversions
          API optimierst du ins Blaue. Das kostet dich jeden Tag bares Geld.
        </p>
      </BlurFade>
      <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12">
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-black text-black rounded-xl w-16 h-16 border border-gray-200 mx-auto">
                <Link className=" w-8 h-8 mx-auto text-white" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">
                Intransparente Ergebnisse
              </h3>
              <p className="mt-2 text-left text-gray-600">
                Du investierst fleißig in Meta-Anzeigen, doch am Monatsende
                herrscht Verwirrung. Die Zahlen im Werbeanzeigenmanager und in
                deinem Shop-Backend erzählen unterschiedliche Geschichten. Du
                kannst nicht mit Sicherheit sagen, welche Anzeige wirklich den
                Kauf ausgelöst hat. Dieses Gefühl, Werbebudget im Blindflug
                auszugeben, ohne den echten ROI zu kennen, ist frustrierend und
                teuer.
              </p>
            </div>
          </CardTilt>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-black text-black rounded-xl w-16 h-16 border border-gray-200 mx-auto">
                <BrainCircuit className="w-8 h-8 mx-auto text-white" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">
                Stagnierende Kampagnen-Performance
              </h3>
              <p className="mt-2 text-left text-gray-600">
                Deine Kampagnen laufen, aber sie optimieren sich nicht von
                selbst, wie sie sollten. Die Kosten pro Kauf steigen, obwohl die
                Klickzahlen in Ordnung sind. Meta kann deine Anzeigen nicht
                effektiv den richtigen Leuten zeigen, weil die Datenbasis durch
                Ad-Blocker, fehlerhaftes Pixel-Setup und iOS-Updates
                unvollständig ist. Deine Kampagnen treten auf der Stelle,
                anstatt profitabler zu werden.
              </p>
            </div>
          </CardTilt>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-black text-black rounded-xl w-16 h-16 border border-gray-200 mx-auto">
                <Sparkles className="w-8 h-8 mx-auto text-white" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">
                Technische Überforderung
              </h3>
              <p className="mt-2 text-left text-gray-600">
                Du hast von Tracking gehört und weißt, dass du etwas tun musst,
                aber der technische Aufwand lähmt dich. Die Vorstellung, dich
                mit Server-Containern, Event-Deduplizierung und der sich ständig
                ändernden Technikwelt auseinandersetzen zu müssen, hält dich
                davon ab, zu handeln. Die Sorge wächst, den Anschluss zu
                verlieren und mit einem veralteten Setup nicht mehr
                wettbewerbsfähig zu sein..
              </p>
            </div>
          </CardTilt>
        </BlurFade>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-gray-50/70 border-y">
    <div className="container mx-auto px-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Das{" "}
          <AuroraText colors={["#2d5cf2", "#2b428bff", "#90a5e8ff"]}>
            Power-Duo
          </AuroraText>{" "}
          für dein Marketing
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-left text-gray-600">
          Stell dir dein Tracking wie ein Sicherheitssystem vor. Du willst keine
          einzige Bewegung verpassen, um die richtigen Entscheidungen zu
          treffen. Genau hier kommen das Meta Pixel und die Conversions API
          (CAPI) ins Spiel.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          <FeatureFlipCard title="Meta Pixel - Dein Spion im Browser">
            Das Meta Pixel ist ein kleines Stück Code auf deiner Website. Es
            beobachtet, was Besucher direkt im &quot;Schaufenster&quot; – also
            in ihrem Browser – tun: Welche Produkte schauen sie an? Was legen
            sie in den Warenkorb? Wer kauft am Ende? Diese Informationen sind
            Gold wert, damit Meta deine Anzeigen an ähnliche, kaufbereite Nutzer
            ausspielen kann.
          </FeatureFlipCard>
          <FeatureFlipCard title="Conversions API: Dein Server spricht mit Meta">
            Die Conversions API ist die Verstärkung. Anstatt nur im Schaufenster
            zu beobachten, schafft sie eine direkte, unsichtbare Verbindung von
            deinem Shop-System (deinem Server) zu Meta. Wenn ein Kauf
            stattfindet, meldet dein Server das direkt an Meta – sicher und
            zuverlässig. Diese Verbindung kann von Ad-Blockern nicht gestört
            werden.
          </FeatureFlipCard>
        </div>
      </div>
    </div>
  </section>
);

const WhyBothSection = () => (
  <section className="py-20 bg-white" id="why-both">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Left */}
        <div>
          <BlurFade direction="down" delay={0.25} inView>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Warum du{" "}
              <AuroraText colors={["#2d5cf2", "#2b428bff", "#90a5e8ff"]}>
                beides
              </AuroraText>{" "}
              brauchst?
            </h2>
          </BlurFade>
          <BlurFade direction="down" delay={0.25} inView>
            <p className="mt-4 text-gray-600">
              Das Meta Pixel und die Conversions API ergänzen sich perfekt. Das
              Pixel trackt direkt im Browser, ist aber anfällig für Ad-Blocker
              und Datenschutz-Einschränkungen. Die Conversions API sendet Events
              direkt vom Server – unabhängig vom Browser des Nutzers. Das Pixel
              allein reicht nicht mehr aus. Die CAPI allein ist nicht flexibel
              genug. Erst zusammen sind sie unschlagbar. Nur mit beiden Systemen
              erhältst du die vollständigen, zuverlässigen Daten, die Meta
              braucht, um deine Anzeigen optimal auszuspielen und dein Budget
              maximal effizient einzusetzen.
            </p>
          </BlurFade>
          <ul className="mt-8 space-y-6">
            <BlurFade direction="down" delay={0.25} inView>
              <li className="flex items-start gap-3">
                <div>
                  <span className="font-semibold text-xl text-black">
                    Mehr Daten, bessere Optimierung
                  </span>
                  <div className="text-gray-600">
                    Durch die Kombination von Pixel und API werden doppelt so
                    viele Conversions erkannt. Meta kann deine Zielgruppe
                    präziser ansprechen und deine Kampagnen automatisch
                    optimieren.
                  </div>
                </div>
              </li>
            </BlurFade>
            <BlurFade direction="down" delay={0.25} inView>
              <li className="flex items-start gap-3">
                <div>
                  <span className="font-semibold text-xl text-black">
                    Sicher und zukunftsfähig
                  </span>
                  <div className="text-gray-600">
                    Mit beiden Systemen bist du gegen technische Änderungen und
                    Datenschutz-Updates gewappnet. Deine Tracking-Infrastruktur
                    bleibt stabil – egal, was im Browser passiert.
                  </div>
                </div>
              </li>
            </BlurFade>
          </ul>
        </div>
        {/* Images Right */}
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="flex flex-col gap-8 items-center">
            <Image
              src="/images/meta-logo.png"
              alt="Meta Pixel Illustration"
              width={100}
              height={100}
              className="w-100 h-100 object-contain"
            />
          </CardTilt>
        </BlurFade>
      </div>
    </div>
  </section>
);

// import { useState, useRef } from 'react';

const testimonials = [
  {
    avatarText: "MK",
    name: "Markus Klein",
    role: "E-Commerce Unternehmer",
    text: "Dank Congrads ist unser Meta-Tracking endlich sauber. Die Kampagnen performen deutlich besser und wir sparen jeden Monat Werbebudget.",
  },
  {
    avatarText: "SB",
    name: "Sophie Bauer",
    role: "Marketing Managerin",
    text: "Die Kombination aus Pixel und CAPI hat unsere Conversion-Daten verdoppelt. Endlich wissen wir, welche Anzeigen wirklich verkaufen.",
  },
  {
    avatarText: "FH",
    name: "Felix Hartmann",
    role: "Shop-Betreiber",
    text: "Technik war für mich immer ein Buch mit sieben Siegeln. Congrads hat alles eingerichtet und erklärt – jetzt läuft das Tracking wie von selbst.",
  },
  {
    avatarText: "AN",
    name: "Anna Neumann",
    role: "Performance Marketing Expertin",
    text: "Mit Congrads haben wir endlich eine zukunftssichere Tracking-Lösung. Unsere Kampagnen optimieren sich jetzt automatisch und wir sehen klare Ergebnisse.",
  },
  {
    avatarText: "JL",
    name: "Jan Lehmann",
    role: "Digital Marketing Consultant",
    text: "Die technische Umsetzung war super einfach dank Congrads. Jetzt können wir uns auf die Strategie konzentrieren, weil das Tracking zuverlässig funktioniert.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <BlurFade direction="down" delay={0.25} inView>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Wie unsere Kunden{" "}
              <AuroraText colors={["#2d5cf2", "#2b428bff", "#90a5e8ff"]}>
                schwärmen
              </AuroraText>
              .
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Das sagen unsere ersten Nutzer über ihre Erfahrungen mit Congrads.
            </p>
          </BlurFade>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <div className="w-full max-w-lg relative">
            <BlurFade direction="down" delay={0.5} inView>
              <CardTilt>
                <TestimonialCard
                  avatarText={testimonials[current].avatarText}
                  name={testimonials[current].name}
                  role={testimonials[current].role}
                >
                  {testimonials[current].text}
                </TestimonialCard>
              </CardTilt>
            </BlurFade>
          </div>
          <BlurFade direction="down" delay={0.75} inView>
            <div className="flex gap-2 mt-6 justify-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === current ? "bg-black" : "bg-gray-300"
                  } transition`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

const AboutUsSection = () => (
  <section id="about-us" className="py-20 bg-gray-50/70 border-y">
    <div className="container mx-auto px-6 max-w-4xl">
      <BlurFade direction="down" delay={0.25} inView>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Über uns
          </h2>
          <p className="mt-4 text-gray-600">
            Congrads ist ein Team aus erfahrenen E-Commerce- und Tracking-Experten. Wir helfen Online-Shops, ihr Meta-Tracking zu perfektionieren, damit Werbebudgets effizient eingesetzt werden und Wachstum messbar wird. Unser Ansatz: verständliche Beratung, technische Exzellenz und echte Ergebnisse.
          </p>
        </div>
      </BlurFade>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <BlurFade direction="down" delay={0.5} inView>
          <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg text-black">Unsere Mission</h3>
        <p className="text-gray-600">
          Wir glauben, dass jedes Unternehmen Klarheit über seine Marketing-Performance verdient. Mit Congrads bringen wir Transparenz und Kontrolle in dein Tracking – damit du bessere Entscheidungen treffen kannst.
        </p>
        <h3 className="font-semibold text-lg text-black mt-6">Unser Team</h3>
        <p className="text-gray-600">
          Hinter Congrads stehen Entwickler, Marketing-Profis und Berater mit jahrelanger Erfahrung in E-Commerce und Performance Marketing. Wir sprechen deine Sprache und setzen die Technik so um, dass sie einfach funktioniert.
        </p>
          </div>
        </BlurFade>
        <BlurFade direction="down" delay={0.75} inView>
          <CardTilt className="relative holographic-pokemon-card overflow-visible">
            <div
              className="relative rounded-2xl shadow-xl border-4 border-yellow-400 bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 pokemon-card-inner"
              style={{ minHeight: 420, width: 320, maxWidth: "100%" }}
            >
              {/* Rainbow holographic shimmer */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 holographic-shimmer" />
              </div>
              {/* Card header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="bg-white border border-gray-300 rounded px-2 py-0.5 text-xs font-bold text-gray-700 shadow-sm">
                  BASIC
                </span>
                <span className="text-2xl font-bold text-yellow-900 ml-2 tracking-wide">
                  Congrads
                </span>
                <span className="flex items-center gap-1 text-yellow-900 font-bold text-lg">
                  <span>HP</span>
                  <span>60</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f55a13ff"><circle cx="12" cy="12" r="10" /><path d="M12 7v5l3 3" /></svg>
                </span>
              </div>
              {/* Main image area */}
              <div className="relative mx-4 mt-2 rounded-lg overflow-hidden border border-gray-300" style={{ height: 120 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-pink-200 to-green-200 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/images/congrads-logo.svg"
                    alt="Congrads Logo"
                    className="w-20 h-20 object-contain drop-shadow-lg"
                  />
                </div>
              </div>
              {/* Card info */}
              <div className="px-4 py-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Nr. 001</span>
                  <span>Agentur</span>
                  <span>4 Mitglieder</span>
                  <span>∞ Ideen</span>
                </div>
                <div className="mt-2">
                    <span className="font-bold text-yellow-900 text-lg">Consulting Power</span>
                    <span className="ml-2 text-yellow-900 font-bold">∞</span>
                    <div className="text-xs text-gray-700 mt-1">
                    Unlocks growth by combining tech expertise and marketing strategy. The more challenges you face, the stronger the results.
                    </div>
                </div>
              </div>
              {/* Card footer */}
              <div className="flex justify-between items-center px-4 py-2 text-xs">
                <div className="flex gap-2">
                    <span className="bg-white border border-gray-300 rounded px-1">Stärken</span>
                    <span className="text-green-600 font-bold">Brand Scaling</span>
                    <span className="bg-white border border-gray-300 rounded px-1">Schwächen</span>
                    <span className="text-red-600 font-bold">Kaffee</span>
                </div>
              </div>
                <div className="px-4 pb-3 text-xs text-gray-600 italic">
                Congrads bündelt Know-how und Energie, um für Unternehmen messbare Ergebnisse und nachhaltiges Wachstum zu schaffen.
                </div>
              {/* Styles */}
              <style jsx>{`
                .holographic-pokemon-card {
                  box-shadow: 0 8px 32px 0 rgba(236, 204, 72, 0.18), 0 2px 8px 0 rgba(59, 130, 246, 0.10);
                  position: relative;
                  overflow: visible;
                  transition: box-shadow 0.3s;
                  border-radius: 1.5rem;
                  background: linear-gradient(135deg, #fef9c3 0%, #fde68a 100%);
                }
                .holographic-shimmer {
                  background: linear-gradient(
                    120deg,
                    #ff0000 0%,
                    #ff9900 16%,
                    #ffee00 32%,
                    #33ff00 48%,
                    #00ffee 64%,
                    #0066ff 80%,
                    #cc00ff 100%
                  );
                  opacity: 0.35;
                  mix-blend-mode: lighten;
                  filter: blur(2px);
                  background-size: 200% 200%;
                  background-position: 50% 50%;
                  animation: rainbow-shimmer 2.5s linear infinite;
                  border-radius: 1.25rem;
                }
                @keyframes rainbow-shimmer {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .pokemon-card-inner {
                  position: relative;
                  overflow: hidden;
                  border-radius: 1.25rem;
                  background: linear-gradient(135deg, #fef9c3 0%, #fde68a 100%);
                  box-shadow: 0 4px 24px 0 rgba(236, 204, 72, 0.12);
                  will-change: transform;
                  transition: box-shadow 0.3s;
                }
              `}</style>
              {/* Tilt and shimmer interaction */}
              <script dangerouslySetInnerHTML={{
                __html: `
                (() => {
                  const card = document.currentScript.previousElementSibling;
                  if (!card) return;
                  card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    // Tilt effect
                    const tiltX = (y - 50) / 8;
                    const tiltY = (x - 50) / 8;
                    card.style.transform = \`rotateX(\${-tiltX}deg) rotateY(\${tiltY}deg)\`;
                    // Holo shimmer
                    const shimmer = card.querySelector('.holographic-shimmer');
                    if (shimmer) {
                      shimmer.style.backgroundPosition = \`\${x}% \${y}%\`;
                    }
                  });
                  card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                    const shimmer = card.querySelector('.holographic-shimmer');
                    if (shimmer) {
                      shimmer.style.backgroundPosition = '50% 50%';
                    }
                  });
                })();
              `}} />
            </div>
          </CardTilt>
        </BlurFade>
      </div>
    </div>
  </section>
);

const FaqSection = () => (
  <section id="faq" className="py-20 bg-gray-50/70 border-y">
    <div className="container mx-auto px-6 max-w-3xl">
      <BlurFade direction="down" delay={0.25} inView>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Häufige Fragen (FAQ)
          </h2>
          <p className="mt-4 text-gray-600">
            Noch unsicher? Hier findest du Antworten auf die wichtigsten Fragen
            rund um Tracking, Pixel & CAPI.
          </p>
        </div>
      </BlurFade>
      <div className="mt-12 space-y-4">
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Ist mein Tracking mit Congrads DSGVO-konform?">
            Ja, wir richten dein Tracking so ein, dass es den aktuellen
            Datenschutzbestimmungen entspricht.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Brauche ich technisches Vorwissen für die Einrichtung?">
            Nein. Unser Team übernimmt die komplette technische Umsetzung und
            erklärt dir die wichtigsten Schritte – verständlich und transparent.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Was ist der Unterschied zwischen Pixel und Conversions API?">
            Das Pixel sammelt Daten direkt im Browser deiner Besucher, die
            Conversions API sendet Events vom Server. Zusammen sorgen sie für
            maximale Datenqualität und Zuverlässigkeit.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Wie lange dauert die Einrichtung?">
            In der Regel ist dein Tracking innerhalb weniger Tage einsatzbereit.
            Wir stimmen den Ablauf individuell mit dir ab.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Für welche Systeme bietet ihr Tracking an?">
            Wir unterstützen alle gängigen Systeme wie Shopify, WordPress und
            individuelle Lösungen.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Was kostet die Zusammenarbeit mit Congrads?">
            Die Kosten richten sich nach deinem Bedarf und Umfang des Projekts.
            Nach einem kostenlosen & unverbindlichen Erstgespräch erhältst du
            ein individuelles Angebot.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Kann ich mein Tracking später selbst erweitern oder anpassen?">
            Ja, wir dokumentieren alle Schritte und bieten auf Wunsch Schulungen
            an, damit du dein Tracking eigenständig weiterentwickeln kannst.
          </FaqItem>
        </BlurFade>
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <BlurFade direction="down" delay={0.25} inView>
        <div className="bg-black text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Bereit für messbares Wachstum?
          </h2>
          <BlurFade direction="down" delay={0.5} inView>
            <p className="mt-4 max-w-xl mx-auto text-gray-300">
              Starte jetzt unverbindlich und entdecke, wie sauberes Tracking
              dein Marketing auf das nächste Level bringt.
            </p>
          </BlurFade>
          <BlurFade direction="down" delay={0.75} inView>
            <div className="mt-8">
              <button
                type="button"
                className="bg-gradient-to-r from-[#2d5cf2] via-[#2b428bff] to-[#90a5e8ff] text-white px-8 py-3 rounded-lg font-semibold transition-transform duration-200 hover:scale-105 hover:brightness-90 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(270deg, #2d5cf2, #2b428bff, #90a5e8ff)",
                  backgroundSize: "600% 600%",
                  animation: "gradientMove 10s ease infinite",
                }}
                onClick={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  if (btn.dataset.running) return;
                  btn.dataset.running = "1";
                  const originalText = btn.innerText;
                  // start visual nudge
                  btn.classList.add(
                    "scale-105",
                    "transition-transform",
                    "duration-200",
                    "ease-out"
                  );

                  let sec = 3;
                  btn.innerText = `Los geht's! (${sec})`;
                  const interval = setInterval(() => {
                    sec -= 1;
                    if (sec > 0) {
                      btn.innerText = `Los geht's! (${sec})`;
                    } else {
                      clearInterval(interval);
                      // subtle fade-out before redirect
                      btn.classList.add(
                        "opacity-0",
                        "transition-opacity",
                        "duration-300"
                      );
                      setTimeout(() => {
                        window.location.href = "mailto:contact@congrads.de";
                      }, 300);
                    }
                  }, 1000);

                  // safety: after 6s ensure state cleared (in case)
                  setTimeout(() => {
                    delete btn.dataset.running;
                    btn.innerText = originalText;
                    btn.classList.remove("scale-105", "opacity-0");
                  }, 6000);
                }}
              >
                Kontakt aufnehmen
                <style>
                  {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              `}
                </style>
              </button>
            </div>
          </BlurFade>
        </div>
      </BlurFade>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <a
            href="#"
            className="font-bold text-xl text-black flex items-center gap-2"
          >
            <Image
              src="/images/congrads-logo.svg"
              alt="Congrads Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span>Congrads</span>
          </a>
          <p className="mt-4 text-gray-500 text-sm">
            Tracking, Beratung & Umsetzung für Unternehmen – powered by
            Congrads.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-black">Rechtliches</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <NextLink
                href="/impressum"
                className="text-gray-500 hover:text-black hover:underline"
              >
                Impressum
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/datenschutz"
                className="text-gray-500 hover:text-black hover:underline"
              >
                Datenschutz
              </NextLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          &copy; 2025 Congrads Agency. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="text-gray-500 hover:text-black">
            <Instagram />
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            <Facebook />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            // Optionally update the URL hash:
            window.history.pushState(null, "", href);
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
  return (
    <>
      <style>{`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #ffffff;
                    color: #111827;
                }
            `}</style>
      <div className="bg-white">
        <CookieBanner />
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          <WhyBothSection />
          <TestimonialsSection />
          <AboutUsSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

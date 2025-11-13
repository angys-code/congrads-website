"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  ChevronDown,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaPinterest, FaTiktok } from 'react-icons/fa';
import { BsFillMegaphoneFill } from "react-icons/bs";


import { BlurFade } from "@/components/magicui/blur-fade";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { useRef } from "react";
import CookieBanner from "@/components/cookie/cookie-banner";
import { FaChartSimple } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";

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
  shimmerEffect?: boolean; // Optional shimmer effect toggle
};

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  maxTilt = 15,
  scale = 1.04,
  className = "",
  style = {},
  shimmerEffect = true, // Default to true
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

    if (shimmerEffect) {
      // Add shimmer effect
      card.style.boxShadow = `0 0 20px rgba(10, 83, 161, 1)`;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 123, 255, 0.3), transparent)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition =
        "transform 0.4s cubic-bezier(.21,.98,.6,.99), box-shadow 0.4s, background 0.4s";
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
      if (shimmerEffect) {
        card.style.boxShadow = "none";
        card.style.background = "none";
      }
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
        transition: "transform 0.2s cubic-bezier(.21,.98,.6,.99), box-shadow 0.2s, background 0.2s",
        willChange: "transform, box-shadow, background",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};



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

    {/* Google Tag Manager */}
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5JJVGZGJ');
        `,
      }}
    />
    {/* End Google Tag Manager */}

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
          Dienstleistungen
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
          <CardTilt shimmerEffect={false}>
            <Image
              src="/images/Logo3.png"
              alt="Congrads Logo3"
              width={180}
              height={180}
              className="mx-auto mb-8 w-112 h-50 hidden md:block"
            />
          </CardTilt>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-black leading-snug md:leading-tight tracking-tighter">
            Wir bauen{" "}
            <AuroraText colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}>
              Brücken
            </AuroraText>
            <span className="text-black">.</span>
            <br />
            Zwischen{" "}
            <AuroraText colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}>
              Generationen
            </AuroraText>
            <span className="text-black">.</span>
          </h1>
        </BlurFade>
        <BlurFade direction="down" delay={0.25 * 2}>
          <p className="mt-4 md:mt-6 max-w-xl mx-auto text-center sm:text-lg text-gray-600 leading-relaxed">
            Als junge Strategen übersetzen wir Ihr Marketing für die Generation von heute. Unsere Mission: Wir machen Ihr Wachstum messbar – durch transparente Ads, präzises Tracking und Social Media Management, das wirklich ankommt. Bereit für Ihr Level Up?
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
      <BlurFade direction="down" delay={0.25 * 2} inView>
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
          Ist Ihre Ad-Performance ein Glücksspiel? Ihr Tracking lückenhaft? Oder doch das Social Media Management zu stressig? Der Punkt ist: Alles hängt miteinander zusammen.
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600">
          Wir bringen System in Ihre Medienpräsenz. Wir koordinieren uns um Ihre Ad Performance, ein lückenloses Tracking und Ihr Social Media, damit Sie sich auf Ihr Kerngeschäft fokussieren können.
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600">
          Wir arbeiten nicht nur für Sie – wir arbeiten mit Ihnen. Im Team. Mit 100% Transparenz.
        </p>
      </BlurFade>
      <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12">
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <a href="#social-media-management">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-black text-black rounded-xl w-16 h-16 border border-gray-200 mx-auto">
                  <IoSparkles className="w-8 h-8 mx-auto text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Social Media Management</h3>
                <p className="mt-2 text-center text-gray-600 block">
                  Wir koordinieren die Planung, Erstellung und Verwaltung Ihrer Inhalte. Als {`"Digital Natives"`} wissen wir, wie man eine Community begeistert oder von Grund auf neu aufbaut. Wir schaffen gemeinsam eine moderne & gesunde Medienpräsenz für Ihre Marke. Die nicht nur gesehen wird, sondern auch ankommt.
                </p>
              </div>
            </a>
          </CardTilt>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <a href="#ads">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-black text-black rounded-xl w-16 h-16 border border-gray-200 mx-auto">
                  <BsFillMegaphoneFill className="w-8 h-8 mx-auto text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Ads</h3>
                <p className="mt-2 text-center text-gray-600">
                  Wir bauen die Strategie hinter Ihren Ads.
                  <br />
                  Von optimierten Copies, zeitgemäßen Creatives bis hin zum Management auf Meta, Google & Co.
                  <br />
                  Wir sorgen dafür, dass Sie Ihr Budget nicht verbrennen.
                </p>
              </div>
            </a>
          </CardTilt>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <CardTilt className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <a href="#tracking">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-black text-black rounded-xl w-16 h-16 border border-gray-200 mx-auto">
                  <FaChartSimple className="w-8 h-8 mx-auto text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Tracking</h3>
                <p className="mt-2 text-center text-gray-600">
                  Performance ist kein Glück. <br />
                  Wir implementieren lückenloses Tracking für Ihre gesamte digitale Präsenz – von der Website über Social Media bis zu den Ads. So sehen Sie, was wirklich funktioniert.
                  Datenbasiert, messbar und 100% transparent.
                  Leiden Sie nicht länger unter Datenverlust.
                </p>
              </div>
            </a>
          </CardTilt>
        </BlurFade>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="space-y-16">
        <div className="text-center mb-15"></div>

        {/* Social Media Management Section */}
        <div
          id="social-media-management"
          className="text-center mb-8"
          style={{ scrollMarginTop: "-330px" }}
        >
          <h2 className="text-4xl font-bold text-black">
            <AuroraText
              colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}
              className="text-5xl"
            >
              How to Social Media
            </AuroraText>
          </h2>
          <p className="mt-2 text-gray-600">
            {`"Kontinuität und Kreativität sind der Schlüssel zum Erfolg"`}
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-9">
          <div className="hidden xl:flex xl:w-1/4 flex-wrap justify-center gap-21">
            <div className="flex flex-col gap-20">
              <div className="flex gap-20">
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/facebook.png"
                    alt="Social Media Management Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/instagram.png"
                    alt="Social Media Management Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
              </div>
              <div className="flex gap-20">
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/pinterest.png"
                    alt="Social Media Management Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/tiktok.png"
                    alt="Social Media Management Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-2/3">
            <h2 className="text-3xl xl:text-4xl font-bold text-black">
              Social Media Management
            </h2>
            <p className="mt-4 text-gray-600">
              Eine moderne und gesunde Medienpräsenz ist kein Zufall, sondern das Ergebnis einer ganzheitlichen Strategie. Egal, ob Sie bei Null anfangen oder eine bestehende Community optimieren wollen: <strong>Wir sind Ihr strategischer Partner</strong> für das Management Ihrer Social-Media-Kanäle – von der Konzeption bis zur Community-Interaktion.
            </p>
            <p className="mt-4 text-gray-600">
              Unser <em>{`"Alles-aus-einer-Hand"`}</em>-Ansatz umfasst:
            </p>
            <ul className="mt-4 text-gray-600 list-disc list-inside">
              <li>
                <strong>Individuelle Strategie & Planung:</strong> Wir entwickeln mit Ihnen gemeinsam einen individuellen Redaktionsplan, der exakt auf Ihre Ziele zugeschnitten ist. Als <em>{`"Digital Natives"`}</em> verstehen wir die Dynamik von Trends und integrieren diese, wo es für Ihre Marke strategisch sinnvoll ist.
              </li>
              <li className="mt-2">
                <strong>Content-Erstellung (Full-Service):</strong> Unser Team setzt die Content-Erstellung für Sie um – immer in enger Abstimmung mit Ihrer Markenstimme. Wir designen zeitgemäße Creatives und Visuals, verfassen SEO-optimierte Copies und entwickeln eine fundierte Hashtag-Strategie.
              </li>
              <li className="mt-2">
                <strong>Technisches Management & Analyse:</strong> Wir kümmern uns nicht nur um die Veröffentlichung. Wir führen kontinuierlich Algorithmus- und Richtlinien-Analysen durch, um immer auf dem neuesten Stand zu sein und Ihre Präsenz sicher und effektiv zu gestalten.
              </li>
            </ul>
            <p className="mt-4 text-gray-600">
              Wir managen Ihre Kanäle auf <strong>Facebook, Instagram, TikTok und Pinterest</strong>. Unser Ziel ist es, dass Sie Ihre Zielgruppe authentisch erreichen und eine loyale Community aufbauen – während Sie sich auf Ihr Kerngeschäft konzentrieren.
            </p>
          </div>
        </div>
        <div className="text-center mb-45"></div>


        {/* Ads Section */}
        <div id="ads" className="text-center mb-8" style={{ scrollMarginTop: "-330px" }}>
          <h2 className="text-4xl font-bold text-black">
            <AuroraText
              colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}
              className="text-5xl"
            >
              How to Advertise
            </AuroraText>
          </h2>
          <p className="mt-2 text-gray-600">
            {`"Egal was Sie bewerben wollen – wir bringen Ihre Botschaft mit kreativer Strategie auf den Markt."`}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-2/3">
            <h2 className="text-3x1 md:text-4xl font-bold text-black">Werbekampagnen Optimierung</h2>
            <p className="mt-4 text-gray-600 text-left">
              Einfach Geld in Ads zu stecken, ist nicht zielführend und kann schnell nach hinten losgehen. <br />
              Wir <strong>optimieren</strong> Ihre Ausgaben und maximieren Ihre Ergebnisse. Je nach Zielsetzung steigern wir gezielt Ihre <em>Reichweite</em>, <em>Klicks</em>, <em>Impressions</em> oder generieren wertvolle <strong>Leads</strong> für Ihr Unternehmen. <br />
              Die optimale Werbekampagne ergibt sich aus den richtigen Fragen: <br />
              Welche <strong> Ziele</strong> werden verfolgt? <strong>Wie ist Ihre Zielgruppe</strong> exakt definiert? <strong>Wie setzen wir Ihr Budget</strong> optimal ein? <br />
              Nur mit einer klaren <strong>Strategie</strong> und <em>Kreativität</em> werden aus einfachen Ads, Werbeanzeigen, die <strong>Congrads</strong> würdig sind.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mt-6">Google Ads</h3>
            <p className="mt-4 text-gray-600">
              Wir nutzen die Macht der Suchintention. Mit strategischer Keyword-Analyse und SEO-optimierten Anzeigetexten erreichen wir Ihre Kunden, genau dann, wenn diese nach Ihren Produkten oder Dienstleistungen suchen.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mt-6">Meta Ads</h3>
            <p className="mt-4 text-gray-600">
              Wir erreichen Ihre Zielgruppe auf Meta (Facebook & Instagram). Mit präzisem Targeting nach Interessen und zeitgemäßen Creatives, die im Feed herausstechen, verwandeln wir passive Nutzer in aktive Kunden.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mt-6">TikTok Ads</h3>
            <p className="mt-4 text-gray-600">
              Als die schnelllebigste Social-Media-Plattform ist TikTok für maximale Impressionen und Clicks heute unersetzlich. Als {`Digital Natives"`} verstehen wir nicht nur Trends, sondern erstellen für Sie authentische, performende Creatives, die nicht wie Fremdkörper in Ihrer Nische wirken, sondern Ihre Zielgruppe wirklich erreichen.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mt-6">Pinterest Ads</h3>
            <p className="mt-4 text-gray-600">
              Pinterest ist eine oft unterschätzte Goldgrube. Nutzer suchen hier gezielt Kreativität und Inspiration. Wir nehmen Ihnen die Hürde der Ästhetik ab und integrieren Ihre Ads nahtlos in die Feeds – als wären es organische, inspirierende Pins.
            </p>
          </div>

          <div className="hidden md:flex md:w-1/3 flex-col gap-12">
            <div className="text-center mb-54"></div>
            <div className="flex flex-col items-center">
              <CardTilt shimmerEffect={false} style={{ width: 45, height: 45 }}>
                <Image
                  src="/images/google-logo.png"
                  alt="Google Tracking Service"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </CardTilt>
              <h3 className="mt-4 text-xl font-semibold text-center">Google Ads</h3>
            </div>
            <div className="flex flex-col items-center">
              <CardTilt shimmerEffect={false} style={{ width: 90, height: 45 }}>
                <Image
                  src="/images/meta-logo.png"
                  alt="Social Media Management Service"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </CardTilt>
              <h3 className="mt-4 text-xl font-semibold text-center">Meta Ads</h3>
            </div>
            <div className="flex flex-col items-center">
              <CardTilt shimmerEffect={false} style={{ width: 45, height: 45 }}>
                <Image
                  src="/images/tiktok.png"
                  alt="Social Media Management Service"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </CardTilt>
              <h3 className="mt-4 text-xl font-semibold text-center">TikTok Ads</h3>
            </div>
            <div className="flex flex-col items-center">
              <CardTilt shimmerEffect={false} style={{ width: 45, height: 45 }}>
                <Image
                  src="/images/pinterest.png"
                  alt="Social Media Management Service"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </CardTilt>
              <h3 className="mt-4 text-xl font-semibold text-center">Pinterest Ads</h3>
            </div>
          </div>
        </div>
        <div className="text-center mb-45"></div>

        {/* Tracking Section */}
        <div id="tracking" className="text-center mb-8" style={{ scrollMarginTop: "-330px" }}>
          <h2 className="text-4xl font-bold text-black">
            <AuroraText
              colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}
              className="text-5xl"
            >
              How to Track
            </AuroraText>
          </h2>
          <p className="mt-2 text-gray-600">
            {`"Performance ist kein Glücksspiel. Leiden Sie nicht länger unter Datenverlust."`}
          </p>
        </div>
        <div className="flex flex-col xl:flex-row items-center gap-9">
          <div className="hidden xl:flex xl:w-1/4 flex-wrap justify-center gap-21">
            <div className="flex flex-col gap-20">
              <div className="flex gap-20">
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/meta-logo.png"
                    alt="Meta Tracking Service"
                    width={150}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/google-logo.png"
                    alt="Google Tracking Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
              </div>
              <div className="flex gap-20">
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/pinterest.png"
                    alt="Pinterest Tracking Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
                <CardTilt shimmerEffect={false} style={{ width: 200, height: 150 }}>
                  <Image
                    src="/images/tiktok.png"
                    alt="TikTok Tracking Service"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardTilt>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Tracking</h2>
            <p className="mt-4 text-gray-600">
              <strong>Tracking</strong> ist das Fundament für jede datenbasierte Entscheidung. Doch es geht nicht nur darum, Daten zu sammeln, sondern diese auch <em>strategisch zu analysieren</em>, um die Performance Ihrer Kampagnen wirklich zu verstehen.
              <br />
              Nur so können wir gemeinsam die <strong>Ziele</strong> erreichen, die Sie sich vorgenommen haben.
              <br />
              Wir sind Ihr <strong>strategischer Partner</strong> für ein <em>360°-Tracking-System</em> – von <strong>Google Tags</strong> und dem <strong>Pinterest Tag</strong> bis hin zu <strong>Meta Pixel</strong> und der <strong>Conversions API (CAPI)</strong>.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mt-6">Pinterest Tag</h3>
            <p className="mt-4 text-gray-600">
              Der Pinterest Tag ist ein Code-Schnipsel, der die Aktionen misst, die Nutzer nach dem Sehen Ihrer Pins auf Ihrer Website ausführen. Diese Daten sind die Grundlage für die Analyse und strategische Optimierung Ihrer Kampagnen-Performance.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mt-6"> Google Tag</h3>
            <p className="mt-4 text-gray-600">
              Der Google Tag ist die zentrale Tracking-Lösung, die Ihre Website mit Google Ads und Google Analytics verbindet. Dieser einzelne Code-Schnipsel misst Website-Aktivitäten und Nutzerinteraktionen, um die Performance Ihrer Google Ads-Kampagnen zu analysieren und Website-Traffic-Daten zu erfassen.
            </p>
          </div>
        </div>
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
          für Ihr Marketing
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-gray-600">
          Stellen Sie sich Ihr Tracking wie ein Sicherheitssystem vor. Sie wollen keine einzige Bewegung verpassen, um die richtigen Entscheidungen zu treffen. Genau hier kommen das Meta Pixel und die Conversions API (CAPI) ins Spiel.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          <FeatureFlipCard title="Meta Pixel - Dein Spion im Browser">
            Das Meta Pixel ist ein Code-Segment auf Ihrer Website. Es funktioniert wie ein Blick ins {`'Schaufenster'`}: Es erfasst, was Besucher direkt im Browser tun. Welche Produkte sehen sie an? Was legen sie in den Warenkorb? Diese Informationen sind entscheidend, damit Meta Ihre Anzeigen an kaufbereite Zielgruppen ausspielen kann.
          </FeatureFlipCard>
          <FeatureFlipCard title="Conversions API: Dein Server spricht mit Meta">
            Die Conversions API (CAPI) ist die strategische Verstärkung. Sie schafft eine direkte und unsichtbare Verbindung von Ihrem Shop-System (Ihrem Server) zu Meta. Findet ein Kauf statt, meldet Ihr Server dies auf direktem Weg – sicher und zuverlässig. Diese serverseitige Verbindung kann von Ad-Blockern nicht beeinträchtigt werden.
          </FeatureFlipCard>
        </div>
      </div>
    </div>
  </section>
);

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

  return null; // Removed the "Why both" section and returning null to avoid rendering issues
};


const AboutUsSection = () =>
  <section id="about-us" className="py-20 bg-gray-50/70 border-y" style={{ scrollMarginTop: "60px" }}>
    <div className="container mx-auto px-6 max-w-4xl">
      <BlurFade direction="down" delay={0.25} inView>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            <AuroraText colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}>
              Über uns
            </AuroraText>
          </h2>
          <p className="mt-4 text-gray-600">
            Wir sind Congrads – ein Team aus vier jungen Strategen und die Marketingbrücke der Generationen. Wir haben früh erkannt, dass viele Unternehmen die Generation von heute marketingtechnisch nicht mehr verstehen. Wir übersetzen Ihre Botschaft für das digitale Zeitalter, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
          </p>
        </div>
      </BlurFade>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <BlurFade direction="down" delay={0.5} inView>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-black">Unsere Mission</h3>
            <p className="text-gray-600">
              Unsere Mission ist es, Sie einen Schritt weiterzubringen und dies durch eine Marketingbrücke der Generationen. Viele Unternehmen verstehen den ständigen Wandel nicht mehr und lassen unsere Generation marketingtechnisch außer Acht.
              Unser Alter ist unser größter strategischer Vorteil: Wir sind die Generation von heute. Basierend auf 100% Transparenz und gemeinsamem Lernen, helfen wir Ihnen, jede Generation zu erreichen – von {`"New School"`} bis {`"Old School"`}.
            </p>
            <h3 className="font-semibold text-lg text-black mt-6">Unser Team</h3>
            <p className="text-gray-600">
              Wir sind ein vierköpfiges Team, das bereits im Alter von ca. 16 Jahren begann, sich autodidaktisch mit Marketing, Investments und kontinuierlicher Weiterbildung zu beschäftigen. Unsere Stärke liegt in unserer außergewöhnlichen Zusammensetzung: Wir vereinen unterschiedliche Persönlichkeitsmodelle, vom kreativen Optimisten bis zum präzisen Strategen. Das ermöglicht uns, flexibel, wohlüberlegt und perfektionistisch an jede Herausforderung heranzugehen.

            </p>
          </div>
        </BlurFade>
        <BlurFade direction="down" delay={0.75} inView>
          <CardTilt shimmerEffect={false} className="relative holographic-pokemon-card overflow-visible">
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
                  <span>90</span>
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
                  <span className="font-bold text-yellow-900 text-lg">Hyper-Entwicklung</span>
                  <span className="ml-2 text-yellow-900 font-bold">∞</span>
                  <div className="text-xs text-gray-700 mt-1">
                    Autonome Entwicklung direkt in der Aktion. Je größer die Herausforderung, desto stärker das Ergebnis.
                  </div>
                </div>
              </div>
              {/* Card footer */}
              <div className="flex justify-between items-center px-4 py-2 text-xs">
                <div className="flex gap-2">
                  <span className="bg-white border border-gray-300 rounded px-1">Stärken</span>
                  <span className="text-green-600 font-bold">Kreativität</span>
                  <span className="bg-white border border-gray-300 rounded px-1">Schwächen</span>
                  <span className="text-red-600 font-bold">Kaffee</span>
                </div>
              </div>
              <div className="px-4 pb-3 text-xs text-gray-600 italic">
                {`"Haben für diese Agentur fast unser Abi geschmissen – keine Sorge, wir haben bestanden."`}
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
  ;


const FaqSection = () => (
  <section id="faq" className="py-20 bg-gray-50/70 border-y" style={{ scrollMarginTop: "240px" }}>
    <div className="container mx-auto px-6 max-w-3xl">
      <BlurFade direction="down" delay={0.25} inView>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            <AuroraText colors={["#2d5cf2", "#0026a2ff", "#90a5e8ff"]}>
              Häufige Fragen (FAQ)
            </AuroraText>
          </h2>
          <p className="mt-4 text-gray-600">
            Noch unsicher? Hier findest du Antworten auf die wichtigsten Fragen
            rund um unsere Services.
          </p>
        </div>
      </BlurFade>
      <div className="mt-12 space-y-4">
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Sie sind ja noch sehr jung. Warum ist das ein Vorteil und kein Nachteil für mich?">
            Unser Alter ist unser größter strategischer Vorteil. Wir sind die Generation von heute. Näher am Geschehen und am Wandel kann niemand sein. Unsere Arbeit besteht nicht aus {`"stupider, gelernter Anwendung"`}, sondern aus der agilen Kombination von Kreativität und Strategie. Kurz gesagt: Wir sind der Wandel.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Funktioniert Ihre 'Marketingbrücke der Generationen' auch für traditionelle Branchen, oder liegt Ihr Fokus nur auf der Generation Z?">
            Wir sehen uns als Dolmetscher der Generationen. Unsere Mission ist es, eine Verbindung zu schaffen. Das bedeutet, wir verstehen nicht nur die {`"neue Welt"`} (Gen Z), sondern können Ihre traditionelle Branchen-Expertise aufnehmen und so übersetzen, dass sie verstanden wird.
            So schlagen wir die Brücke zwischen {`"New School"`} und {`"Old School"`} und stellen sicher, dass Ihre Botschaft bei jeder Generation ankommt.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Wie stellen Sie sicher, dass Sie unsere Markenstimme treffen? Wir wollen nicht plötzlich, wie Teenager klingen.">
            Das ist ein Kernpunkt unserer {`"Junge Strategen"`}-Identität. {`"Jung" bedeutet für uns "Kreativität"`}, {`"Stratege" bedeutet "Professionalität"`}.
            Durch unseren partnerschaftlichen Ansatz und das {`"gemeinsame Lernen"`} stellen wir durch 100% Transparenz sicher, dass wir Ihre Markenstimme treffen und nicht unsere eigene durchsetzen. Wir sorgen dafür, dass die junge Generation Sie versteht – nicht, dass Sie wie die junge Generation klingen.

          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Wie transparent ist der Prozess? Meine letzte Agentur hat mich von allem ausgeschlossen.">
            Transparenz ist die Basis unserer {`"gemeinsames Lernen"`}-Philosophie. Wir sind davon überzeugt, dass eine Herausforderung nur durch gemeinsames Anpacken bewältigt werden kann. Sie werden nicht ausgeschlossen, sondern sind Teil des Teams.
            Wie ein Mitglied unseres Teams sagt: {`"Teamwork makes it dreamwork."`} ~ Angelo
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Muss ich das 'Gesamtpaket' (Ads, Tracking, SMM) buchen oder bieten Sie auch einzelne Leistungen an?">
            Unser Aufgabenfeld ist breit gefächert, und strategisch hängt alles zusammen. Dennoch bieten wir unsere Dienstleistungen flexibel and passend zu Ihren Bedürfnissen an. Sie können einzelne Leistungen buchen oder mit uns ein ganzheitliches System aufbauen.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Gibt es ein Mindest-Werbebudget, das Sie für Ads voraussetzen?">
            Nein. Wir definieren kein starres Mindestbudget. Der nötige Aufwand ist abhängig von den Zielen, die Sie erreichen wollen.
            In einem transparenten Erstgespräch klären wir, welches Budget für Ihre Ziele – ob nur für Google Ads oder ein kombiniertes Setup – strategisch sinnvoll ist.
          </FaqItem>
        </BlurFade>
        <BlurFade direction="down" delay={0.25} inView>
          <FaqItem question="Wie stellen Sie sicher, dass das eingesetzte Tracking DSGVO-konform ist?">
            Datenschutz und Transparenz haben für uns höchste Priorität. Wir sind Ihr technischer und strategischer Partner, um das Tracking (wie Meta CAPI oder Google Tags) so sauber und datensparsam wie möglich zu implementieren.
            Wir sorgen für die korrekte technische Anbindung an Ihre bestehenden Consent-Management-Tools (Cookie-Banner). Wir bieten jedoch keine Rechtsberatung – die finale rechtliche Prüfung und Verantwortung liegt immer bei Ihnen bzw. Ihrem Datenschutzbeauftragten.
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
        <div className="bg-[radial-gradient(circle,_#003153,_#324a5a)] text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Bereit für spürbaren Wandel?
          </h2>
          <BlurFade direction="down" delay={0.5} inView>
            <p className="mt-4 max-w-xl mx-auto text-white-300">
              Gehen Sie heute noch einen Schritt weiter in die richtige Richtung? Gemeinsam gestalten wir die Zukunft Ihres Marketings.
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



          <div className="flex gap-6 mt-4 sm:mt-0">
            {/* Instagram */}
            <a href="https://www.instagram.com/congradsagency/"
              className="text-gray-500 hover:text-black"
              aria-label="Instagram">
              <FaInstagram className="w-6 h-6" />
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61564512660477"
              className="text-gray-500 hover:text-black"
              aria-label="Facebook">
              <FaFacebookF className="w-6 h-6" />
            </a>

            {/* Pinterest */}
            <a href="https://www.pinterest.com/congrads/"
              className="text-gray-500 hover:text-black"
              aria-label="Pinterest">
              <FaPinterest className="w-6 h-6" />
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@congradsagency?lang=en"
              className="text-gray-500 hover:text-black"
              aria-label="TikTok">
              <FaTiktok className="w-6 h-6" />
            </a>
          </div>
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
      <div className="bg-white/100">
        <CookieBanner />
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <ServicesSection />
          <FeaturesSection />
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

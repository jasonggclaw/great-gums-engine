"use client";

import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export default function GumDiseaseAdultsPage() {
  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`} style={{ fontFamily: "var(--font-inter)" }}>
      {/* ═══════ SECTION A — NAV ═══════ */}
      <nav className="w-full bg-white border-b border-gray-100 py-5 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
          <span
            className="text-2xl italic"
            style={{ fontFamily: "var(--font-playfair)", color: "#5B7FBF" }}
          >
            Great Gums
          </span>
        </div>
      </nav>

      {/* ═══════ SECTION B — HERO ═══════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #071120 0%, #0f1f3d 40%, #1a3366 100%)",
        }}
      >
        <Image
          src="/images/heroes/toothbrush-macro.jpg"
          alt="Great Gums bioelectric toothbrush macro shot"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Social Proof Badge */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
          <div className="bg-white rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: "#F5A623" }} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <span
              className="font-bold text-sm"
              style={{ color: "#1A1A1A", fontFamily: "var(--font-inter)" }}
            >
              4.8
            </span>
            <span
              className="text-xs"
              style={{ color: "#555555", fontFamily: "var(--font-inter)" }}
            >
              5,697 reviews
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-40">
          <h1
            className="text-5xl md:text-6xl lg:text-8xl text-white italic leading-[1.1] mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Stop Losing Teeth
            <br />
            to a Disease Most
            <br className="hidden md:block" />
            {" "}People Ignore
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mb-3 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-inter)",
            }}
          >
            The world's{" "}
            <strong className="text-white underline decoration-2" style={{ textDecorationColor: "#5B7FBF" }}>
              ONLY
            </strong>{" "}
            <strong className="text-white">BIOELECTRIC</strong> toothbrush that
            penetrates 6mm below the gumline to kill bacteria where regular
            brushes can&apos;t reach — healing your gums while you brush.
          </p>

          <p
            className="text-sm mb-10 tracking-wide"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Clinically tested · 30-day guarantee · Free shipping
          </p>

          <a
            href="#cta"
            className="inline-block rounded-full px-10 py-4 border-2 border-white text-white uppercase tracking-widest font-bold text-sm transition-all duration-300 hover:bg-white hover:text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            GET GREAT GUMS NOW
          </a>
        </div>
      </section>

      {/* ═══════ SECTION C — PAIN ("THE BRUTAL TRUTH") ═══════ */}
      <section
        className="py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: "#111827" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy Left */}
            <div>
              <h2
                className="text-5xl md:text-6xl text-white italic leading-[1.1] mb-10"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The Brutal Truth
              </h2>

              <div className="space-y-8">
                {[
                  {
                    lead: "Gum disease — not cavities — is the #1 cause of tooth loss in adults.",
                    body: "By the time you notice loose teeth, years of silent damage have already destroyed the bone holding them in place. This isn\u2019t something a regular toothbrush can reverse.",
                  },
                  {
                    lead: "75% of adults over 35 have active gum disease and don\u2019t know it.",
                    body: "It starts painlessly \u2014 a little blood when you floss, gums that look slightly puffy. Most people dismiss the signs until their dentist delivers the bad news.",
                  },
                  {
                    lead: "Once gum tissue recedes, it never grows back on its own.",
                    body: "Every day without intervention means more tissue lost, more bone exposed, and more expensive procedures to repair what could have been prevented.",
                  },
                ].map((bullet, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 text-sm font-bold"
                      style={{ backgroundColor: "rgba(91,127,191,0.2)", color: "#5B7FBF" }}
                    >
                      ⚠
                    </div>
                    <div>
                      <p
                        className="text-white font-bold text-lg leading-snug mb-1"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {bullet.lead}
                      </p>
                      <p
                        className="text-base leading-relaxed"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {bullet.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Image Right */}
            <div
              className="relative h-[400px] md:h-[520px] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              }}
            >
              <Image
                src="/images/editorial/gum-disease-bw.jpg"
                alt="The reality of gum disease"
                fill
                className="object-cover grayscale rounded-2xl"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION D — PRODUCT INTRO ═══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image Left */}
            <div
              className="relative h-[380px] md:h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1"
              style={{
                background:
                  "linear-gradient(145deg, #DDE9F7 0%, #EEF4FB 50%, #f0f5fc 100%)",
              }}
            >
              <Image
                src="/images/product/great-gums-product.png"
                alt="Great Gums bioelectric toothbrush"
                fill
                className="object-contain p-8"
                quality={90}
              />
            </div>

            {/* Copy Right */}
            <div className="order-1 lg:order-2">
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
                style={{ color: "#5B7FBF", fontFamily: "var(--font-inter)" }}
              >
                INTRODUCING GREAT GUMS
              </p>

              <h2
                className="text-4xl md:text-5xl italic leading-[1.15] mb-8"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#1A1A1A",
                }}
              >
                Meet the <u>first</u> toothbrush designed to heal your gums
              </h2>

              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "#555555", fontFamily: "var(--font-inter)" }}
              >
                When you press Great Gums against your gumline, gentle
                micro-pulses of bioelectric energy penetrate the tissue and
                increase blood flow to the area — the same biological process
                your body uses to heal a cut. Simultaneously, these pulses reach
                bacteria hiding up to 6mm below the surface, where no manual or
                sonic brush has ever gone. The result: your gums get the
                circulation they need to rebuild, while the infection driving
                the disease is eliminated at its source.
              </p>

              <div className="space-y-4">
                {[
                  "Reaches bacteria 6mm below the gumline",
                  "Stimulates natural blood flow to damaged tissue",
                  "Clinically proven to reduce inflammation by 75%",
                  "Gentle enough for sensitive, receding gums",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-white text-xs font-bold"
                      style={{ backgroundColor: "#5B7FBF" }}
                    >
                      ✓
                    </div>
                    <span
                      className="text-base"
                      style={{
                        color: "#1A1A1A",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION E — CLINICAL STATS STRIP ═══════ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#DDE9F7" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-center text-xs uppercase tracking-[0.25em] font-semibold mb-3"
            style={{ color: "#5B7FBF", fontFamily: "var(--font-inter)" }}
          >
            CLINICALLY PROVEN RESULTS
          </p>

          <div
            className="w-full max-w-md mx-auto mb-12"
            style={{ borderBottom: "1px solid rgba(91,127,191,0.2)" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {[
              { number: "75%", label: "Less Inflammation" },
              { number: "59%", label: "Less Bleeding" },
              { number: "67%", label: "Better Cavity Protection" },
              { number: "6x", label: "Deeper Clean" },
              { number: "53%", label: "Fresher Breath" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-5xl md:text-6xl font-bold mb-2"
                  style={{
                    color: "#5B7FBF",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-sm uppercase tracking-wider"
                  style={{
                    color: "#555555",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-center text-xs mt-12"
            style={{ color: "#555555", fontFamily: "var(--font-inter)" }}
          >
            Based on 30-day clinical study of 5,697 participants
          </p>
        </div>
      </section>

      {/* ═══════ SECTION F — TESTIMONIALS ═══════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#EEF4FB" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl md:text-5xl italic text-center leading-[1.15] mb-14"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#1A1A1A",
            }}
          >
            Real People. Real Results.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Matt F.",
                role: "Verified Buyer",
                quote:
                  "\u201CMy dentist even pointed out the improvement. For the first time in years, I left the chair without bad news.\u201D",
              },
              {
                name: "Sarah J.",
                role: "Verified Buyer",
                quote:
                  "\u201CWithin days I noticed less irritation around my gums. By week three, the sensitivity I\u2019d lived with for years was gone.\u201D",
              },
              {
                name: "David R.",
                role: "Verified Buyer",
                quote:
                  "\u201CI was skeptical but after 30 days my gums stopped bleeding completely. I wish I\u2019d found this years ago.\u201D",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span
                        key={j}
                        className="text-xl"
                        style={{ color: "#5B7FBF" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote
                    className="text-3xl md:text-4xl italic leading-snug mb-8"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "#1A1A1A",
                    }}
                  >
                    {testimonial.quote}
                  </blockquote>
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{
                      color: "#1A1A1A",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: "#555555",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION G — FINAL CTA ═══════ */}
      <section
        id="cta"
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(to bottom right, #DDE9F7, #EEF4FB)",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl italic leading-[1.15] mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#1A1A1A",
            }}
          >
            Your gums can heal.
            <br />
            Every day you wait, you lose more.
          </h2>

          <p
            className="text-lg mb-8 max-w-lg mx-auto"
            style={{ color: "#555555", fontFamily: "var(--font-inter)" }}
          >
            5,697 people have already stopped gum disease in its tracks. Join
            them risk-free today.
          </p>

          <div className="flex items-center justify-center gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg" style={{ color: "#F5A623" }}>
                ★
              </span>
            ))}
            <span
              className="ml-2 text-sm font-semibold"
              style={{ color: "#1A1A1A", fontFamily: "var(--font-inter)" }}
            >
              4.8 — Based on 5,697 verified reviews
            </span>
          </div>

          <a
            href="https://getgreatgums.com"
            className="inline-block rounded-full px-12 py-5 text-white uppercase tracking-widest font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: "#5B7FBF",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#4a6aaa")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#5B7FBF")
            }
          >
            GET GREAT GUMS NOW
          </a>

          <p
            className="text-xs mt-6"
            style={{ color: "#555555", fontFamily: "var(--font-inter)" }}
          >
            Free shipping · 30-day money-back guarantee · Cancel anytime
          </p>
        </div>
      </section>

      {/* ═══════ SECTION H — FOOTER ═══════ */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p
            className="text-xl italic mb-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#5B7FBF" }}
          >
            Great Gums
          </p>
          <a
            href="mailto:hello@getgreatgums.com"
            className="text-sm transition-colors duration-300"
            style={{ color: "#555555", fontFamily: "var(--font-inter)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#5B7FBF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
          >
            hello@getgreatgums.com
          </a>
        </div>
      </footer>
    </div>
  );
}
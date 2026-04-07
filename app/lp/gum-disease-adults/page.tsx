"use client"

import Image from 'next/image'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["normal", "italic"] });

export default function GumDiseaseAdultsPage() {
  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`}>
      {/* Navigation */}
      <nav className="relative z-20 bg-white py-4">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-playfair italic" style={{color: '#5B7FBF'}}>
            Great Gums
          </h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a2d5a 50%, #2d4a8a 100%)'}}>
            <Image
              src="/images/heroes/toothbrush-macro.jpg"
              alt="Bioelectric toothbrush macro shot"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Social Proof Badge */}
        <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg" style={{color: '#F5A623'}}>★</span>
              ))}
            </div>
            <span className="text-sm font-medium" style={{color: '#1A1A1A'}}>4.8</span>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair italic leading-tight mb-6">
              Stop Losing Teeth to Gum Disease
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
              The world's <span className="font-bold underline">ONLY</span> <span className="font-bold underline uppercase">bioelectric</span> toothbrush that heals while you brush
            </p>
            <button className="rounded-full px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-colors duration-300 uppercase tracking-widest font-bold text-sm">
              GET GREAT GUMS NOW
            </button>
          </div>
        </div>
      </section>

      {/* Pain Section - The Brutal Truth */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-playfair italic mb-8" style={{color: '#1A1A1A'}}>
                The Brutal Truth
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-3 bg-red-500 flex-shrink-0"></div>
                  <p className="text-lg" style={{color: '#555555'}}>
                    <strong>Gum disease causes 70% of adult tooth loss</strong> — not cavities like most people think
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-3 bg-red-500 flex-shrink-0"></div>
                  <p className="text-lg" style={{color: '#555555'}}>
                    <strong>Nearly 65% of adults over 35</strong> have moderate to severe gum disease
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-3 bg-red-500 flex-shrink-0"></div>
                  <p className="text-lg" style={{color: '#555555'}}>
                    <strong>Regular toothbrushes can't reach</strong> the bacteria hiding deep in gum pockets
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/editorial/gum-disease-bw.jpg"
                alt="Gum disease clinical imagery"
                width={600}
                height={400}
                className="rounded-lg shadow-lg grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Introduction */}
      <section className="py-20 md:py-28" style={{backgroundColor: '#DDE9F7'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-playfair italic mb-8" style={{color: '#1A1A1A'}}>
            Meet the first toothbrush designed to heal your gums
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-8 leading-relaxed" style={{color: '#555555'}}>
              Great Gums uses patented bioelectric technology to generate gentle microcurrents that penetrate deep into gum tissue. These therapeutic currents reduce inflammation, kill harmful bacteria, and stimulate natural healing — something no regular toothbrush can do.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{color: '#1A1A1A'}}>
                  BIOELECTRIC HEALING
                </h3>
                <p style={{color: '#555555'}}>
                  Microcurrents penetrate gum pockets to kill bacteria where regular brushes can't reach
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{color: '#1A1A1A'}}>
                  REDUCES INFLAMMATION
                </h3>
                <p style={{color: '#555555'}}>
                  Clinically proven to reduce gum inflammation by 75% in just 30 days
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{color: '#1A1A1A'}}>
                  PREVENTS TOOTH LOSS
                </h3>
                <p style={{color: '#555555'}}>
                  Heals gum disease at the source to stop tooth loss before it starts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Stats Strip */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2" style={{color: '#5B7FBF'}}>75%</div>
              <p className="text-sm uppercase tracking-wide font-medium" style={{color: '#555555'}}>Less Inflammation</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{color: '#5B7FBF'}}>59%</div>
              <p className="text-sm uppercase tracking-wide font-medium" style={{color: '#555555'}}>Less Bleeding</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{color: '#5B7FBF'}}>67%</div>
              <p className="text-sm uppercase tracking-wide font-medium" style={{color: '#555555'}}>Better Cavity Protection</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{color: '#5B7FBF'}}>6x</div>
              <p className="text-sm uppercase tracking-wide font-medium" style={{color: '#555555'}}>Deeper Clean</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{color: '#5B7FBF'}}>53%</div>
              <p className="text-sm uppercase tracking-wide font-medium" style={{color: '#555555'}}>Fresher Breath</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28" style={{backgroundColor: '#DDE9F7'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl" style={{color: '#5B7FBF'}}>★</span>
                ))}
              </div>
              <blockquote className="text-3xl md:text-4xl font-playfair italic mb-6 leading-tight" style={{color: '#1A1A1A'}}>
                "My dentist even pointed out the improvement."
              </blockquote>
              <cite className="text-lg font-medium" style={{color: '#555555'}}>
                Matt F., Verified Buyer
              </cite>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl" style={{color: '#5B7FBF'}}>★</span>
                ))}
              </div>
              <blockquote className="text-3xl md:text-4xl font-playfair italic mb-6 leading-tight" style={{color: '#1A1A1A'}}>
                "Within days I noticed less irritation around my gums."
              </blockquote>
              <cite className="text-lg font-medium" style={{color: '#555555'}}>
                Sarah J., Verified Buyer
              </cite>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl" style={{color: '#5B7FBF'}}>★</span>
                ))}
              </div>
              <blockquote className="text-3xl md:text-4xl font-playfair italic mb-6 leading-tight" style={{color: '#1A1A1A'}}>
                "I was skeptical but after 30 days my gums stopped bleeding completely."
              </blockquote>
              <cite className="text-lg font-medium" style={{color: '#555555'}}>
                David R., Verified Buyer
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28" style={{backgroundColor: '#DDE9F7'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-playfair italic mb-8" style={{color: '#1A1A1A'}}>
            Don't wait until it's too late
          </h2>
          <p className="text-xl mb-8 leading-relaxed" style={{color: '#555555'}}>
            Join thousands who've already saved their teeth with bioelectric healing technology
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl" style={{color: '#F5A623'}}>★</span>
              ))}
            </div>
            <span className="text-lg font-medium" style={{color: '#1A1A1A'}}>4.8 ★★★★★ Based on 5,697 reviews</span>
          </div>
          <button className="rounded-full px-10 py-4 text-white hover:bg-opacity-90 transition-colors duration-300 uppercase tracking-widest font-bold text-sm" style={{backgroundColor: '#5B7FBF'}}>
            GET GREAT GUMS NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl md:text-3xl font-playfair italic mb-4" style={{color: '#5B7FBF'}}>
            Great Gums
          </div>
          <p style={{color: '#555555'}}>
            hello@getgreatgums.com
          </p>
        </div>
      </footer>
    </div>
  )
}
import React from 'react';
import { Compass, Sparkles, MapPin, ArrowRight, Heart, Film, Ticket, Stamp } from 'lucide-react';

interface ZoonJourneyPassportProps {
  onSelectJourneyStop: (countryOrGenre: string) => void;
  activeJourneyStop?: string;
}

export const ZoonJourneyPassport: React.FC<ZoonJourneyPassportProps> = ({
  onSelectJourneyStop,
  activeJourneyStop = 'All Journeys',
}) => {
  const journeyStops = [
    {
      id: 'All Journeys',
      label: 'All Journeys',
      ticketNo: '№ ALL-00',
      stampType: 'WORLD PASS',
      flag: '🌍',
      films: 'World Cinema Panorama',
      goodies: 'Full Merch Catalog',
      seal: 'ALL-ACCESS',
      rotation: 'rotate-0',
    },
    {
      id: 'Japen',
      label: 'Japen',
      ticketNo: '№ JPN-01',
      stampType: 'CINE STAMP',
      flag: '🇯🇵',
      films: 'Kurosawa · Ozu · Miyazaki',
      goodies: 'Auteur Trumps & 35mm Brass',
      seal: 'TOKYO ALLEY',
      rotation: '-rotate-1',
    },
    {
      id: 'France',
      label: 'France',
      ticketNo: '№ FRA-02',
      stampType: 'CINÉ TICKET',
      flag: '🇫🇷',
      films: 'Varda · Godard · Truffaut',
      goodies: 'Nouvelle Vague Cards & Logs',
      seal: 'RIVE GAUCHE',
      rotation: 'rotate-1',
    },
    {
      id: 'Iran',
      label: 'Iran',
      ticketNo: '№ IRN-03',
      stampType: 'VISA STAMP',
      flag: '🇮🇷',
      films: 'Kiarostami · Farhadi · Majidi',
      goodies: 'Poetic Stamps & Bookmarks',
      seal: 'TEHRAN ARTHOUSE',
      rotation: '-rotate-1',
    },
    {
      id: 'Korea',
      label: 'Korea',
      ticketNo: '№ KOR-04',
      stampType: 'ADMIT TICKET',
      flag: '🇰🇷',
      films: 'Bong Joon-ho · Park Chan-wook',
      goodies: 'Golden Wave Trumps & Stubs',
      seal: 'SEOUL NOIR',
      rotation: 'rotate-1',
    },
    {
      id: 'India',
      label: 'India',
      ticketNo: '№ IND-05',
      stampType: 'FOLK STAMP',
      flag: '🇮🇳',
      films: 'Satyajit Ray · Guru Dutt · Pop Art',
      goodies: 'Truck-Art Stickers & Jaali Metal',
      seal: 'KOLKATA & MUMBAI',
      rotation: 'rotate-0',
    },
  ];

  return (
    <section className="my-10 sm:my-14 bg-[#fffdf9] p-5 sm:p-8 rounded-3xl border-[3px] border-[#1e1b24] shadow-pop-lg relative overflow-hidden">
      {/* Decorative indie background accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-300/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Zoon Introduction */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-[#1e1b24] relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src="/public/assets/aistudio/image_63c6260c.png"
              alt="Zoon"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#1e1b24] shadow-pop-sm bg-purple-100 -rotate-2"
            />
            <span className="absolute -bottom-2 -right-2 bg-amber-300 text-[#1e1b24] text-[10px] font-black px-1.5 py-0.5 rounded-md border border-[#1e1b24] shadow-2xs rotate-3">
              Medallion "Z" 🐾
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-300 border-2 border-[#1e1b24] shadow-pop-sm text-[11px] font-black uppercase text-[#1e1b24] mb-1.5 -rotate-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Zoon's Cinema Travelogue · Yellow Ticket & Stamp Stubs</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1e1b24] tracking-tight">
              Join Zoon Down the Alleys of World Cinema
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl mt-0.5 leading-relaxed">
              Zoon wanders the global film alleys, exploring international cinema treasures from Japen to France, Iran to Korea. Tap a vintage yellow ticket or stamp below to discover the curated goodies she brought back for you!
            </p>
          </div>
        </div>

        <div className="bg-[#fef08a] p-3 rounded-2xl border-2 border-[#1e1b24] shadow-pop-sm shrink-0 hidden lg:block text-center rotate-1">
          <div className="text-[10px] font-mono font-bold uppercase text-amber-900 tracking-wider">
            ★ OFFICIAL CINEPHILE VISA ★
          </div>
          <div className="font-hand text-lg font-bold text-[#1e1b24] leading-tight mt-0.5">
            "I watch, I wander, <br />and I bring goodies back for you!"
          </div>
          <div className="text-[11px] font-black text-purple-900 mt-1">
            — Zoon 🐾
          </div>
        </div>
      </div>

      {/* Interactive Travel Stops Grid: Vintage Yellow Tickets & Stamps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-6 relative z-10">
        {journeyStops.map((stop) => {
          const isSelected = activeJourneyStop === stop.id;
          return (
            <button
              key={stop.id}
              onClick={() => onSelectJourneyStop(stop.id)}
              className={`group relative p-3 rounded-2xl border-2 border-[#1e1b24] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-amber-300 shadow-pop -translate-y-1 scale-102 ring-2 ring-purple-600'
                  : 'bg-[#fef9c3] hover:bg-[#fef08a] shadow-pop-sm hover:-translate-y-0.5'
              }`}
            >
              {/* Semi-circular ticket notch cutouts */}
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#fffdf9] border-r-2 border-[#1e1b24] pointer-events-none" />
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#fffdf9] border-l-2 border-[#1e1b24] pointer-events-none" />

              {/* Ticket Top Header Barcode & Number */}
              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#1e1b24] pb-1.5 border-b border-[#1e1b24]/30">
                <span className="tracking-tight">{stop.ticketNo}</span>
                <span className="bg-[#1e1b24] text-amber-300 px-1 py-0.2 rounded text-[8px] font-black tracking-wider uppercase">
                  {stop.stampType}
                </span>
              </div>

              {/* Main Yellow Ticket & Stamp Name Module */}
              <div className="my-2 text-center">
                <div className="text-xl mb-1">{stop.flag}</div>

                {/* THE COUNTRY NAME AS A TACTILE YELLOW STAMP / TICKET */}
                <div
                  className={`inline-flex items-center justify-center gap-1 w-full px-2 py-1 rounded-lg border-2 border-dashed border-[#1e1b24] transition-transform ${stop.rotation} ${
                    isSelected ? 'bg-amber-400 font-black shadow-xs' : 'bg-[#fde047] font-bold group-hover:scale-105'
                  }`}
                >
                  <span className="text-[10px] text-amber-950 font-black">★</span>
                  <span className="font-display text-xs sm:text-sm font-black uppercase tracking-wider text-[#1e1b24]">
                    {stop.label}
                  </span>
                  <span className="text-[10px] text-amber-950 font-black">★</span>
                </div>

                {/* Directors / films subtitle */}
                <div className="text-[10px] text-stone-700 font-bold mt-1.5 line-clamp-1 leading-tight">
                  {stop.films}
                </div>
              </div>

              {/* Perforated Dashed Tear-Off Stub */}
              <div className="mt-auto pt-2 border-t-2 border-dashed border-[#1e1b24]/40 flex flex-col justify-between">
                <div className="text-[9px] font-semibold text-purple-950 line-clamp-1">
                  {stop.goodies}
                </div>
                <div className="flex items-center justify-between mt-1 text-[8px] font-mono font-bold text-stone-600">
                  <span>{stop.seal}</span>
                  {isSelected && (
                    <span className="bg-purple-700 text-white px-1.5 py-0.2 rounded font-black tracking-wide">
                      STAMPED ✓
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

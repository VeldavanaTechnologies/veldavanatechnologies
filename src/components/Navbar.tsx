'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import vendavanaLogo from '../assets/veldavanafulllogo.png';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Enhanced navbar entrance animation
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
    
    // Animate navbar items with stagger
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.8 }
    );
    
    // Animate brand text
    gsap.fromTo('.brand-text', 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to('.mobile-menu', { 
        x: 0, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
    } else {
      gsap.to('.mobile-menu', { 
        x: '100%', 
        duration: 0.3, 
        ease: 'power2.in' 
      });
    }
  };

  // Scroll to section with offset for navbar
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 64; // 64px navbar
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${
      scrolled ? 'bg-black/80 backdrop-blur-lg border-purple-600' : 'bg-transparent border-purple-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 relative">
          {/* Brand - top left logo with 20px margin, very large logo */}
          <div className="flex-shrink-0 flex items-center" style={{ marginLeft: 30 }}>
            <a 
              href="#home" 
              className="brand-text hover:opacity-80 transition-opacity cursor-pointer flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ height: 300 }}
            >
              <Image
                src={vendavanaLogo}
                alt="VENDAVANA Logo"
                height={300}
                style={{ width: 'auto', display: 'block', maxHeight: 300 }}
                priority
              />
            </a>
          </div>

          {/* Navigation - perfectly centered, equal spacing, larger font */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center justify-center gap-x-32" style={{ minWidth: 600, marginRight: '-150px' }}>
              <a
                href="#services"
                className="nav-item text-gray-200 hover:text-white px-6 py-2 text-lg font-semibold transition-all duration-300 relative group"
                style={{ letterSpacing: 0.5 }}
              >
                What we do
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#think"
                className="nav-item text-gray-200 hover:text-white px-6 py-2 text-lg font-semibold transition-all duration-300 relative group"
                style={{ letterSpacing: 0.5 }}
              >
                What we think
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#about"
                className="nav-item text-gray-200 hover:text-white px-6 py-2 text-lg font-semibold transition-all duration-300 relative group"
                style={{ letterSpacing: 0.5 }}
                onClick={e => { e.preventDefault(); scrollToSection('about'); }}
              >
                Who we are
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#careers"
                className="nav-item text-gray-200 hover:text-white px-6 py-2 text-lg font-semibold transition-all duration-300 relative group"
                style={{ letterSpacing: 0.5 }}
              >
                Careers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>

          {/* Country dropdown - 30px from right margin */}
          {/* Country dropdown - extreme right, 30px from right edge */}
          <div className="hidden md:flex items-center" style={{ position: 'fixed', right: 30, top: 0, height: '64px', zIndex: 60 }}>
            <CountryDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="mobile-menu fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg transform translate-x-full md:hidden">
        <div className="pt-20 pb-3 space-y-1">
          <a
            href="#services"
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            What we do
          </a>
          <a
            href="#about"
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={e => { e.preventDefault(); setIsOpen(false); scrollToSection('about'); }}
          >
            Who we are
          </a>
          <a
            href="#careers"
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Careers
          </a>
        </div>
      </div>
    </nav>
  );
}
// CountryDropdown component for all countries
import React from 'react';
const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica","Croatia","Cuba","Cyprus","Czechia (Czech Republic)","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini (fmr. 'Swaziland')","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar (formerly Burma)","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine State","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// Helper to get country code from country name
const countryNameToCode: Record<string, string> = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "Andorra": "AD",
  "Angola": "AO",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cabo Verde": "CV",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo (Congo-Brazzaville)": "CG",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czechia (Czech Republic)": "CZ",
  "Democratic Republic of the Congo": "CD",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini (fmr. 'Swaziland')": "SZ",
  "Ethiopia": "ET",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Greece": "GR",
  "Grenada": "GD",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Holy See": "VA",
  "Honduras": "HN",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar (formerly Burma)": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "North Korea": "KP",
  "North Macedonia": "MK",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine State": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States of America": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
};

// Helper to get emoji flag from country code
function getFlagEmoji(countryCode: string) {
  if (!countryCode) return '';
  // Unicode regional indicator symbols
  return countryCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function CountryDropdown() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('United States of America');
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const selectedCode = countryNameToCode[selected] || '';
  const selectedFlag = getFlagEmoji(selectedCode);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-x-2 text-gray-300 hover:text-white focus:outline-none px-3 py-1 rounded"
        onClick={() => setOpen((prev: boolean) => !prev)}
        type="button"
      >
        {/* Show flag for selected country */}
        <span className="text-lg" style={{ minWidth: 24, display: 'inline-block' }}>{selectedFlag}</span>
        <span className="text-sm">{selected}</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 max-h-72 overflow-y-auto bg-black border border-gray-700 rounded shadow-lg z-50">
          {countries.map((country: string) => {
            const code = countryNameToCode[country] || '';
            const flag = getFlagEmoji(code);
            return (
              <div
                key={country}
                className={`flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-purple-600/30 text-gray-200 ${selected === country ? 'bg-purple-700/40' : ''}`}
                onClick={() => { setSelected(country); setOpen(false); }}
              >
                <span className="text-lg" style={{ minWidth: 24, display: 'inline-block' }}>{flag}</span>
                <span>{country}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

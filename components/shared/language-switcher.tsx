"use client";

import React, { useEffect, useState } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState('en');

  const languages = [
    { name: 'English', code: 'en', label: 'English' },
    { name: 'Urdu', code: 'ur', label: 'اردو' },
    { name: 'Pashto', code: 'ps', label: 'پښتو' },
  ];

  useEffect(() => {
    // 1. Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ur,ps',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // 2. Load the script
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 3. Check for existing cookie to set initial state
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const transCookie = getCookie('googtrans');
    if (transCookie) {
      const lang = transCookie.split('/').pop();
      if (lang) setCurrentLangCode(lang);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    // Set the cookie Google Translate looks for
    // Format: /en/ur, /en/ps, etc.
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/`; // Fallback for local dev
    
    // Update local state
    setCurrentLangCode(langCode);
    setIsOpen(false);

    // Refresh the page to apply translation (Standard Google Translate behavior for custom UI)
    window.location.reload();
  };

  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

  return (
    <div className="relative flex items-center">
      {/* Required hidden element for Google Translate to mount */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-all text-xs font-semibold shadow-sm active:scale-95"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Languages className="w-3.5 h-3.5 text-primary" />
        <span className="min-w-[45px] text-left">{currentLang.name}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform text-muted-foreground", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[110]" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 z-[120] w-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
            <div className="px-3 py-2 border-b border-border bg-muted/30">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Language</span>
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-xs hover:bg-muted transition-colors flex items-center justify-between group",
                  currentLangCode === lang.code && "text-primary bg-primary/5"
                )}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-[10px] text-muted-foreground">{lang.label}</span>
                </div>
                {currentLangCode === lang.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Styles to clean up any leaked Google UI elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        .goog-te-banner-frame.skiptranslate,
        .goog-te-gadget-icon,
        .goog-te-gadget-simple span,
        .goog-te-menu-value span:nth-child(3),
        .goog-te-gadget {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: transparent !important;
          box-shadow: none !important;
        }
      ` }} />
    </div>
  );
};

export default LanguageSwitcher;

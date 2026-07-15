"use client";

import React, { useEffect, useState } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: unknown;
            autoDisplay: boolean;
          }, elementId: string): void;
          InlineLayout: { SIMPLE: unknown };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState(() => {
    if (typeof document === 'undefined') return 'en';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; googtrans=`);
    if (parts.length === 2) {
      const cookieVal = parts.pop()?.split(';').shift();
      if (cookieVal) return cookieVal.split('/').pop() || 'en';
    }
    return 'en';
  });
  const [pendingLangCode, setPendingLangCode] = useState<string | null>(null);

  useEffect(() => {
    if (pendingLangCode) {
      document.cookie = `googtrans=/en/${pendingLangCode}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${pendingLangCode}; path=/`;
      window.location.reload();
    }
  }, [pendingLangCode]);

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
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLangCode(langCode);
    setIsOpen(false);
    setPendingLangCode(langCode);
  };

  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

  return (
    <div className="relative flex items-center ">
      {/* Required hidden element for Google Translate to mount */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2   border border-border bg-background hover:bg-muted transition-all text-xs font-semibold shadow-sm active:scale-95"
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

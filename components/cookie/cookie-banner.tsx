"use client";

import React, { useEffect, useState } from "react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const STORAGE_KEY = "congrads_cookie_consent_v1";

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore write errors
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (!consent) {
      setVisible(true);
    } else {
      // apply saved preferences on load
      applyConsent(consent);
      setVisible(false);
    }
  }, []);

  const applyConsent = (consent: Consent) => {
    // Placeholder hooks where you can initialize/disable tracking tools
    // e.g. if (consent.analytics) initAnalytics(); else disableAnalytics();
    // e.g. if (consent.marketing) initMarketingPixels(); else disableMarketingPixels();
    // Keep this minimal to avoid adding external libs here.
    console.log("Applying consent:", consent);
  };

  const acceptAll = () => {
    const consent: Consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    writeConsent(consent);
    applyConsent(consent);
    setVisible(false);
  };

  const rejectAll = () => {
    const consent: Consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    writeConsent(consent);
    applyConsent(consent);
    setVisible(false);
  };

  const saveSettings = () => {
    const consent: Consent = {
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    writeConsent(consent);
    applyConsent(consent);
    setSettingsOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div>
      {/* overlay for settings */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSettingsOpen(false)}
          />
          <div className="relative z-[10000] max-w-xl w-full bg-white rounded-t-lg md:rounded-lg p-6 m-4 shadow-lg">
            <h3 className="text-lg font-semibold text-black">
              Cookie-Einstellungen
            </h3>
            <p className="mt-2 text-gray-600">
              Wähle aus, welche Arten von Cookies du zulassen möchtest.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-black">Essentiell</p>
                    <p className="text-sm text-gray-600">
                      Notwendig für die Funktion der Website.
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">Immer aktiv</div>
                </div>
              </div>

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-black">Analytics</p>
                    <p className="text-sm text-gray-600">
                      Hilft uns, die Nutzung der Seite zu verstehen und zu
                      verbessern.
                    </p>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-black">Marketing</p>
                    <p className="text-sm text-gray-600">
                      Für personalisierte Anzeigen und Werbemaßnahmen.
                    </p>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSettingsOpen(false)}
                className="px-4 py-2 text-sm rounded bg-gray-100 text-gray-800"
              >
                Abbrechen
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 text-sm rounded bg-black text-white"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* banner */}
      <div className="fixed bottom-4 left-4 right-4 z-[9998] md:left-8 md:right-8 md:bottom-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-700 max-w-3xl">
            <strong className="font-semibold">Wir verwenden Cookies</strong>
            <div className="mt-1">
              Wir und unsere Partner verwenden Cookies, um die Website zu
              betreiben, zu analysieren und personalisierte Werbung anzuzeigen.
              Du kannst deine Einstellungen anpassen.
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={rejectAll}
              className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700"
            >
              Ablehnen
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700"
            >
              Einstellungen
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm rounded bg-black text-white"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Datenschutzerklärung
        </h1>

        <section className="mt-6 text-gray-700 space-y-6">
          <p>
            Diese Datenschutzerklärung informiert dich darüber, welche
            personenbezogenen Daten wir im Zusammenhang mit dieser Website
            (https://www.congrads.de bzw. die lokale Entwicklungs-URL) erheben,
            wie wir sie verarbeiten und welche Rechte du hast. Sie bezieht sich
            auf alle auf der Seite sichtbaren Funktionen (z. B. Kontakt via
            E‑Mail, Cookie-Banner, Social-Links, Tracking-Integrationen,
            Bild-Uploads in /public). Bitte lies sie aufmerksam.
          </p>

          <h2 className="mt-6 font-semibold text-black">
            Verantwortliche Stelle
          </h2>
          <p>
            Congrads Agency
            <br />
            Wildparkstr. 19B, 63456 Hanau
            <br />
            Deutschland
            <br />
            E-Mail:{" "}
            <a href="mailto:info.congrads@gmail.com" className="text-blue-600">
              info.congrads@gmail.com
            </a>
          </p>

          <h2 className="font-semibold text-black">Kontakt Datenschutz</h2>
          <p>
            Wenn du Fragen zur Verarbeitung deiner personenbezogenen Daten hast
            oder deine Rechte geltend machen möchtest, schreibe uns an die oben
            genannte E‑Mail-Adresse.
          </p>

          <h2 className="font-semibold text-black">Welche Daten wir erheben</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              Verbindungs- und Nutzungsdaten (z. B. IP-Adresse, Zugriffszeit,
              User-Agent, Referrer).
            </li>
            <li>
              Technische Daten (Browsertyp, Bildschirmgröße, verwendetes
              Betriebssystem).
            </li>
            <li>
              Inhalte, die du uns freiwillig übermittelst (z. B. E‑Mail via
              mailto: links).
            </li>
            <li>
              Einwilligungsstatus und Cookie-/LocalStorage-Einstellungen (siehe
              Cookie-Banner).
            </li>
            <li>
              Eventuelle weitere Daten, die du bei einer Kontaktaufnahme
              freiwillig nennst.
            </li>
          </ul>

          <h2 className="font-semibold text-black">
            Cookies &amp; LocalStorage
          </h2>
          <p>
            Wir setzen Cookies und Web‑Storage (localStorage) ein, um die
            Funktionalität der Website sicherzustellen und deine Einstellungen
            zu speichern.
          </p>
          <p className="text-sm text-gray-600">
            Konkret speichert das Cookie-Banner deine Einwilligungspräferenzen
            in localStorage unter dem Schlüssel{" "}
            <code>congrads_cookie_consent_v1</code>. Wenn du zustimmst, werden
            zusätzliche Tracking-Skripte (z. B. Meta Pixel) geladen; bei
            Nicht-Zustimmung bleiben diese deaktiviert.
          </p>

          <h2 className="font-semibold text-black">Cookie-Banner / Consent</h2>
          <p>
            Beim ersten Besuch erscheint ein Cookie-Banner mit den Optionen
            „Alle akzeptieren“, „Ablehnen“ und „Einstellungen“. Deine Auswahl
            wird lokal gespeichert und kann jederzeit über die Einstellungen auf
            dieser Website geändert werden (sofern eine entsprechende Steuerung
            sichtbar ist). Technisch notwendige Cookies sind unabhängig von
            einer Einwilligung aktiv, da sie für den Betrieb erforderlich sind.
          </p>

          <h2 className="font-semibold text-black">Tracking &amp; Analyse</h2>
          <p>
            Wir nutzen keine eingebetteten Kontaktformulare, aber es gibt
            Mailto-Links (z. B. <code>mailto:contact@congrads.de</code>) — das
            Versenden einer E‑Mail erfolgt über deinen E‑Mail‑Client und ist
            nicht durch uns technisch protokolliert außer in unseren
            Postfächern.
          </p>

          <h3 className="font-semibold text-black">
            Meta Pixel (Facebook/Meta)
          </h3>
          <p>
            Diese Website kann das Meta Pixel verwenden. Das Meta Pixel ist ein
            Tracking-Skript von Meta Platforms, mit dem das Nutzerverhalten
            gemessen wird. Das Pixel wird nur geladen, wenn du
            Marketing‑/Tracking‑Cookies aktivierst. Die Datenübertragung an Meta
            erfolgt dann in der Form und unter den Bedingungen, die Meta
            vorgibt. Meta kann diese Daten mit weiteren Informationen aus
            anderen Quellen zusammenführen.
          </p>
          <p className="text-sm text-gray-600">
            Wenn du auf der Seite etwas bestellt hast, können wir das Ereignis
            als Client‑Event (via Pixel) und zusätzlich serverseitig per
            Conversion API (CAPI) an Meta übertragen. Um Doppelzählungen zu
            vermeiden, verwenden wir ein gemeinsames <em>event_id</em> für die
            Client- und Server-Übertragung; Meta führt anschließende
            Deduplizierung durch. Personenbezogene Daten (z. B. E‑Mail, Telefon)
            werden vor dem Versand an Meta gehasht (SHA‑256). Die serverseitige
            Übermittlung erfolgt nur, wenn die rechtliche Grundlage vorliegt (in
            der Regel deine Einwilligung für Marketing).
          </p>

          <h3 className="font-semibold text-black">
            Facebook Conversions API (CAPI)
          </h3>
          <p>
            Die Conversions API sendet Ereignisse sicher vom Server an Meta
            (Graph API). Für die Verwendung benötigen wir einen serverseitigen
            Access Token. Serverseitige Ereignisse werden nur bei Vorliegen der
            jeweiligen Einwilligung bzw. Rechtgrundlage weitergeleitet.
          </p>

          <h2 className="font-semibold text-black">
            Server-Logs, Hosting &amp; Domain
          </h2>
          <p>
            Zur Verfügungstellung der Website speichern unsere Server
            automatisch Verbindungsdaten (Server-Logs) wie IP‑Adresse, Zeitpunkt
            des Zugriffs, aufgerufene URL und HTTP‑Status. Diese Daten verwenden
            wir zur Sicherstellung des Betriebs, zur Fehleranalyse und zur
            Sicherheitsüberwachung.
          </p>
          <p>
            Hosting: Wir betreiben die Website auf der Infrastruktur von Vercel
            (Vercel, Inc.). Vercel verarbeitet Daten in unserem Auftrag als
            Auftragsverarbeiter. Informationen zu den Datenverarbeitungs‑
            aktivitäten von Vercel sowie zu möglichen Datenübermittlungen in
            Drittländer findest du in den Datenschutzhinweisen von Vercel.
            Soweit Daten in Länder außerhalb der EU/des EWR übermittelt werden,
            treffen wir geeignete Maßnahmen (z. B. Standardvertragsklauseln) um
            ein angemessenes Datenschutzniveau sicherzustellen.
          </p>
          <p>
            Domain / Registrar: Die Domain ist bei IONOS (1&1 IONOS SE)
            registriert. Bitte beachte, dass bei der Domain-Registrierung
            bestimmte Kontaktdaten (z. B. zur Eintragung in WHOIS-Listen)
            öffentlich einsehbar sein können. Nähere Informationen hierzu sowie
            zur Datenverarbeitung durch IONOS findest du in den
            Datenschutzhinweisen des Registrars.
          </p>

          <h2 className="font-semibold text-black">
            Drittanbieter / Bibliotheken
          </h2>
          <p>
            Die Website nutzt verschiedene Open-Source-Bibliotheken (z. B.
            <em>lucide-react</em>, <em>rough-notation</em>, Tailwind CSS) zur
            Darstellung und Funktion. Diese Bibliotheken werden lokal im Build
            ausgeliefert und senden standardmäßig keine Nutzerdaten an ihre
            Anbieter. Falls externe Ressourcen (z. B. Webfonts von einem CDN)
            eingebunden werden, kann dies eine Verbindung zu Dritten auslösen —
            siehe Abschnitt &quot;Webfonts / Externe Inhalte&quot; weiter unten.
          </p>

          <h2 className="font-semibold text-black">
            Webfonts / Externe Inhalte
          </h2>
          <p>
            Auf der Website wird die Schriftfamilie <em>Inter</em> per CSS
            verwendet. Falls du Webfonts oder andere Ressourcen von externen
            Anbietern (z. B. Google Fonts) laden möchtest, prüfe bitte, ob diese
            Einbindung datenschutzkonform erfolgt. Externe Ressourcen können
            beim Laden ggf. Informationen an die Drittanbieter übermitteln (z.
            B. IP-Adresse).
          </p>

          <h2 className="font-semibold text-black">Kontakt per E‑Mail</h2>
          <p>
            Wenn du uns per E‑Mail kontaktierst, werden die von dir
            übermittelten personenbezogenen Daten zum Zweck der Bearbeitung
            deiner Anfrage gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 S.1
            lit. f DSGVO (berechtigtes Interesse an der Beantwortung von
            Anfragen) oder Art. 6 Abs. 1 lit. b DSGVO, wenn aus der Anfrage ein
            Vertragsverhältnis entsteht.
          </p>

          <h2 className="font-semibold text-black">Speicherdauer</h2>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es für die
            Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen
            bestehen (z. B. steuerrechtliche Aufbewahrungsfristen).
            Personenbezogene Daten aus Supportanfragen werden in der Regel für
            die Dauer von 3 Jahren aufbewahrt, sofern keine gesetzlichen
            Pflichten etwas anderes vorschreiben.
          </p>

          <h2 className="font-semibold text-black">
            Weitergabe / Auftragsverarbeitung
          </h2>
          <p>
            Wir geben personenbezogene Daten nur weiter, wenn dies zur
            Vertragserfüllung, zur Rechtsverfolgung oder aufgrund gesetzlicher
            Verpflichtungen erforderlich ist. Externe Dienstleister (z. B.
            Hosting-Provider, Zahlungsabwickler, E‑Mail-Provider) werden als
            Auftragsverarbeiter gemäß Art. 28 DSGVO eingesetzt und vertraglich
            gebunden.
          </p>

          <h2 className="font-semibold text-black">Rechtsgrundlagen</h2>
          <p>
            Die Rechtsgrundlagen der Datenverarbeitung ergeben sich aus der
            DSGVO: Einwilligung (Art. 6 Abs. 1 lit. a), Erfüllung eines Vertrags
            (Art. 6 Abs. 1 lit. b), rechtliche Verpflichtungen (Art. 6 Abs. 1
            lit. c) sowie berechtigtes Interesse (Art. 6 Abs. 1 lit. f).
          </p>

          <h2 className="font-semibold text-black">Deine Rechte</h2>
          <p>
            Du hast das Recht auf Auskunft über die zu deiner Person
            gespeicherten Daten, Berichtigung falscher Daten, Löschung,
            Einschränkung der Verarbeitung sowie auf Datenübertragbarkeit. Du
            kannst erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft
            widerrufen. Zur Ausübung deiner Rechte schreibe an
            <a href="mailto:contact@congrads.de" className="text-blue-600">
              {" "}
              contact@congrads.de
            </a>
            .
          </p>

          <h2 className="font-semibold text-black">Beschwerderecht</h2>
          <p>
            Du hast das Recht, bei einer Aufsichtsbehörde Beschwerde
            einzureichen (z. B. bei der zuständigen Datenschutzbehörde in deinem
            Wohnortbundesland), wenn du der Ansicht bist, dass die Verarbeitung
            deiner personenbezogenen Daten gegen die DSGVO verstößt.
          </p>

          <h2 className="font-semibold text-black">Sicherheit</h2>
          <p>
            Wir treffen technische und organisatorische Maßnahmen, um die
            Sicherheit deiner Daten zu gewährleisten und sie vor unbefugtem
            Zugriff, Verlust oder Missbrauch zu schützen. Trotzdem ist keine
            Übertragung über das Internet vollkommen sicher.
          </p>

          <h2 className="font-semibold text-black">
            Änderungen dieser Erklärung
          </h2>
          <p>
            Wir passen diese Datenschutzerklärung an, sobald dies aufgrund der
            Weiterentwicklung unserer Website oder geänderter gesetzlicher
            Vorgaben erforderlich wird. Das aktuelle Datum der letzten Änderung
            findest du oben auf der Seite (bitte manuell pflegen).
          </p>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              Hinweis: Diese Datenschutzerklärung wurde speziell an die
              sichtbaren Funktionen dieser Website angepasst (z. B. Cookie
              Banner, Meta Pixel/CAPI, Mailto-Kontakt). Sie stellt keine
              rechtliche Beratung dar. Bitte lass die Erklärung von einer
              fachkundigen Person (z. B. Rechtsanwalt, externer
              Datenschutzbeauftragter) prüfen, bevor du sie final
              veröffentlichst.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/impressum" className="text-blue-600 hover:underline">
              Zum Impressum
            </Link>
            <span className="mx-3">·</span>
            <Link href="/" className="text-blue-600 hover:underline">
              Zurück zur Startseite
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

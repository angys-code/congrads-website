import React from "react";
import Link from "next/link";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-black">Impressum</h1>

        <section className="mt-8 text-gray-700">
          <h2 className="font-semibold text-lg text-black">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="mt-2">
            Congrads Agency GbR 
            <br />
            Wildparkstr. 19B
            <br />
            63456 Hanau
            <br />
            Deutschland
          </p>

          <h3 className="mt-6 font-semibold text-black">Vertreten durch</h3>
          <p className="mt-2">Angelo Ostinato, Leo Hohmann, Marko Stojanovic, Yigit Hasanalioglu (Geschäftsführer)</p>

          <h3 className="mt-6 font-semibold text-black">Kontakt</h3>
          <p className="mt-2">Telefon: +49 (0) 177 1594098</p>
          <p>
            Email:{" "}
            <a href="mailto:contact@congrads.de" className="text-blue-600">
              contact@congrads.de
            </a>
          </p>


          <h3 className="mt-6 font-semibold text-black">Umsatzsteuer-ID</h3>
          <p className="mt-2">
            Umsatzsteuer-Identifikationsnummer: DE370296525
            
          </p>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              Hinweis: Die Website befindet sich noch in Bearbeitung, weshalb die oben genannten Punkte noch aktualisiert werden.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/datenschutz" className="text-blue-600 hover:underline">
              Zur Datenschutzerklärung
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

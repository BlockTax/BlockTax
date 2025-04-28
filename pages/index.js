import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <header className="w-full p-6 bg-white shadow">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Image src={logo} alt="BlockTax" width={120} height={40} />
          <Link href="/auth/signin">
            <a className="text-blue-600 hover:underline">Login</a>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-extrabold mb-4">Crypto in. Tax out.</h1>
        <p className="text-lg text-gray-700 mb-8">
          BlockTax analysiert deine Krypto-Transaktionen und erstellt automatisch deinen Steuerbericht.
        </p>
        <Link href="/auth/signup">
          <a className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition">
            Hier starten (kostenlos, bis 100 Transaktionen)
          </a>
        </Link>
      </main>
      <footer className="w-full p-4 bg-white text-center text-sm text-gray-500">
        <Link href="/impressum"><a className="mx-2 hover:underline">Impressum</a></Link>
        <Link href="/datenschutz"><a className="mx-2 hover:underline">Datenschutz</a></Link>
        <Link href="/agb"><a className="mx-2 hover:underline">AGB</a></Link>
      </footer>
    </div>
  );
}

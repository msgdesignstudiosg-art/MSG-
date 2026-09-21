import PortfolioSection from './components/PortfolioSection';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

export default function Admin() {
  return <LanguageProvider>
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <a href="/" className="inline-block px-6 pt-8 underline underline-offset-4">← MSG Design Studio</a>
      <PortfolioSection />
    </main>
  </LanguageProvider>;
}

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      <Header />
      {/* O main cresce para empurrar o footer para o final da tela */}
      <main className="p-4 md:p-6 flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
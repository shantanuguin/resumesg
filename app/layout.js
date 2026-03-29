import { Inter, IBM_Plex_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './lib/theme';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Shantanu Guin | Apparel Technology & Innovation',
  description:
    'Portfolio of Shantanu Guin — Apparel Technology Innovator at NIFT New Delhi. Specializing in production technology, automation, IoT, and data-driven solutions for the fashion industry.',
  openGraph: {
    title: 'Shantanu Guin | Apparel Technology & Innovation',
    description:
      'Portfolio of Shantanu Guin — blending analytical engineering with aesthetic vision to shape the future of fashion technology.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${playfair.variable}`} data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Cursor />
          <div className="aurora" aria-hidden="true" />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
          <BottomNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

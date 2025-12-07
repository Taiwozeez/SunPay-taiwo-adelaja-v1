


import './globals.css';
import { Poppins } from 'next/font/google';
import RootLayoutClient from './RootLayoutClient'; // client wrapper

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'SunPay',
  description: 'Secure and Easy Payment Solutions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans relative">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}



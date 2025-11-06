import Header from './components/header'
import Footer from './components/footer'
import FloatingChat from './components/FloatingChat'
import NotificationSystem from './components/NotificationSystem'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'SunPay',
  description: 'Secure and Easy Payment Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans relative">
        <Header />
        <NotificationSystem />
        {children}
        <Footer />
        <FloatingChat />
      </body>
    </html>
  )
}
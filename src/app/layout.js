import Navbar from './components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UNSDG Healthcare portal',
  description: 'Health care portal for UN',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar></Navbar>
      
      {children}</body>
    </html>
  )
}

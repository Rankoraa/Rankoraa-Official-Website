import type { Metadata } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-body',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Rankoraa — Mumbai IT Services Agency | Web Dev, Design, SEO',
  description:
    'Rankoraa is a Mumbai, IN based IT services agency specializing in web development, web design, and SEO. We craft fast, modern, and SEO-first websites for startups and enterprises.',
  keywords:
    'Rankoraa, Mumbai, IT services, web development, web design, SEO, e-commerce, WooCommerce, custom websites, performance',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="rankoraa-theme"
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

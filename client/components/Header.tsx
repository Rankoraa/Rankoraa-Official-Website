'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/theme-toggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass-morphism shadow-2xl' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold text-shimmer">
            Rankoraa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-300 transition-all duration-300 font-semibold hover:scale-110"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="https://calendly.com/rankoraa-info/30min" target='blank'>
              <Button className="neomorphic-button px-5 py-2.5 rounded-2xl text-purple-700 dark:text-purple-200 hover:opacity-90">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden neomorphic-button p-2.5 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 glass-morphism rounded-2xl p-4 animate-scale-in">
            <div className="flex flex-col space-y-4 pt-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-300 transition-all duration-300 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button className="neomorphic-button px-5 py-2.5 rounded-2xl text-purple-700 dark:text-purple-200">
                  Get Free Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

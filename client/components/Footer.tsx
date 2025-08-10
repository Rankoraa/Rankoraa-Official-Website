import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="neomorphic text-gray-800 dark:text-gray-200 mt-16">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-shimmer">Rankoraa</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mumbai, IN based IT services agency crafting high-performance websites and SEO-first experiences.
            </p>
            <div className="flex space-x-3">
              <div className="neomorphic-button p-2.5 rounded-full hover-glow cursor-pointer">
                <Facebook className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="neomorphic-button p-2.5 rounded-full hover-glow cursor-pointer">
                <Twitter className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="neomorphic-button p-2.5 rounded-full hover-glow cursor-pointer">
                <Instagram className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="neomorphic-button p-2.5 rounded-full hover-glow cursor-pointer">
                <Linkedin className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">Home</Link>
              <Link href="/services" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">Services</Link>
              <Link href="/blog" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">Blog</Link>
              <Link href="/about" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">About</Link>
              <Link href="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">Web Development</p>
              <p className="text-gray-600 dark:text-gray-300">Web Design</p>
              <p className="text-gray-600 dark:text-gray-300">SEO & Growth</p>
              <p className="text-gray-600 dark:text-gray-300">WooCommerce</p>
              <p className="text-gray-600 dark:text-gray-300">Shopify</p>
              <p className="text-gray-600 dark:text-gray-300">Maintenance & Care</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                <span className="text-gray-600 dark:text-gray-300">info@rankoraa.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                <span className="text-gray-600 dark:text-gray-300">+91 7582093554</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                <span className="text-gray-600 dark:text-gray-300">Mumbai, IN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300/60 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Rankoraa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="neomorphic bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-shimmer">Rankoraa</h3>
            <p className="text-gray-600">
              Full-service web development agency creating beautiful, functional websites that drive results.
            </p>
            <div className="flex space-x-4">
              <div className="neomorphic-button p-3 rounded-full hover-glow cursor-pointer">
                <Facebook className="w-5 h-5 text-purple-600" />
              </div>
              <div className="neomorphic-button p-3 rounded-full hover-glow cursor-pointer">
                <Twitter className="w-5 h-5 text-purple-600" />
              </div>
              <div className="neomorphic-button p-3 rounded-full hover-glow cursor-pointer">
                <Instagram className="w-5 h-5 text-purple-600" />
              </div>
              <div className="neomorphic-button p-3 rounded-full hover-glow cursor-pointer">
                <Linkedin className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">Services</Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-400">WooCommerce Websites</p>
              <p className="text-gray-400">Custom Dynamic Sites</p>
              <p className="text-gray-400">Simple Websites</p>
              <p className="text-gray-400">Maintenance Plans</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">hello@rankoraa.dev</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Rankoraa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

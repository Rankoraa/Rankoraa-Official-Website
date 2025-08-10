'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Clock, CheckCircle, Link } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display), var(--font-body)' }}>
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 font-semibold">
              We’re in Mumbai, IN — building bold web experiences worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-5">Send us a Message</h2>
                  {isSubmitted && (
                    <div className="mb-5 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                      <p className="text-green-700 dark:text-green-200 text-sm sm:text-base">Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Full Name</label>
                      <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Email Address</label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Message</label>
                      <Textarea id="message" name="message" rows={6} required value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." />
                    </div>
                    <Button type="submit" className="w-full gradient-bg text-white hover:opacity-90 transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info */}
            <div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Contact Information</h2>
                  <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-semibold">
                    We’re here to help bring your vision to life.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold">Email</h3>
                      <p className="text-gray-700 dark:text-gray-200">info@rankoraa.com</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">We usually reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold">Phone</h3>
                      <p className="text-gray-700 dark:text-gray-200">+91 7582093554</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Mon–Fri, 10 AM–6 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold">Location</h3>
                      <p className="text-gray-700 dark:text-gray-200">Mumbai, IN</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Available for projects worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700 dark:text-orange-300" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold">Response Time</h3>
                      <p className="text-gray-700 dark:text-gray-200">Within 24 hours</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Usually much faster</p>
                    </div>
                  </div>
                </div>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-black">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-extrabold mb-2">Prefer to Talk?</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 text-sm sm:text-base font-semibold">
                      Schedule a free 30-minute consultation to discuss your project in detail.
                    </p>
                    <Button asChild={true}>
                      <a
                        href="https://calendly.com/rankoraa-info/30min"
                        target="_blank"
                        className="gradient-bg bg-orange-900/30 dark:bg-slate-100/30 hover:opacity-90 transition-all duration-300"
                      >
                        Schedule a Call
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Find Us</h2>
            <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-semibold">Mumbai, IN</p>
          </div>

          <div className="bg-gray-200 dark:bg-slate-800 h-64 sm:h-80 lg:h-96 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 dark:text-gray-300 mx-auto mb-3" />
              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-semibold">Interactive map would be embedded here</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Mumbai, IN</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

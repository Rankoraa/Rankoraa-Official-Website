import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    title: '10 Web Design Trends That Will Dominate 2024',
    excerpt: 'Discover the latest design trends that are shaping the future of web development and user experience.',
    image: '/web-design-trends-2024.png',
    date: 'March 15, 2024',
    readTime: '5 min read'
  },
  {
    title: 'Why Your E-commerce Site Needs a Mobile-First Approach',
    excerpt: 'Learn how mobile-first design can significantly boost your online sales and customer satisfaction.',
    image: '/placeholder-gdyly.png',
    date: 'March 10, 2024',
    readTime: '7 min read'
  },
  {
    title: 'The Complete Guide to Website Performance Optimization',
    excerpt: 'Master the art of creating lightning-fast websites that rank higher and convert better.',
    image: '/website-performance.png',
    date: 'March 5, 2024',
    readTime: '10 min read'
  }
]

export default function BlogTeaser() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Latest <span className="text-shimmer">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from the world of web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.title}
              className="neomorphic group hover-lift hover-glow transition-all duration-500 rounded-3xl overflow-hidden animate-bounce-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-shimmer transition-all duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                  {post.excerpt}
                </p>
                <button className="neomorphic-button px-4 py-2 rounded-xl text-purple-600 font-medium group/btn">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="neomorphic-button px-8 py-4 rounded-2xl text-purple-600 font-semibold hover-glow hover-lift">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  )
}

import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const blogPosts = [
  {
    title: '10 Web Design Trends That Will Dominate 2024',
    excerpt: 'Discover design trends shaping modern, SEO-first experiences.',
    image: '/web-design-trends-2024.png',
    date: 'March 15, 2024',
    readTime: '5 min read',
  },
  {
    title: 'Why Your E-commerce Site Needs a Mobile-First Approach',
    excerpt: 'Mobile-first thinking to boost conversions and search visibility.',
    image: '/placeholder-gdyly.png',
    date: 'March 10, 2024',
    readTime: '7 min read',
  },
  {
    title: 'The Complete Guide to Website Performance Optimization',
    excerpt: 'Build blazing-fast sites that rank and convert.',
    image: '/website-performance.png',
    date: 'March 5, 2024',
    readTime: '10 min read',
  },
]

export default function BlogTeaser() {
  return (
    // Increased bottom padding on mobile/tablet; balanced top padding
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 lg:py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display), var(--font-body)' }}>
            Latest <span className="text-shimmer">Insights</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-semibold">
            Web development, design, and SEO strategies from Rankoraa — Mumbai’s IT partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.title}
              className="neomorphic group hover-lift hover-glow transition-all duration-500 rounded-3xl overflow-hidden animate-bounce-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold mb-2 sm:mb-3 group-hover:text-shimmer transition-all duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base font-semibold">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center text-purple-700 dark:text-purple-300 font-bold">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

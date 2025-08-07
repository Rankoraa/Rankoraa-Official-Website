import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: '10 Web Design Trends That Will Dominate 2024',
    excerpt: 'Discover the latest design trends that are shaping the future of web development and user experience.',
    image: '/web-design-trends-2024.png',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Design',
    tags: ['Web Design', 'Trends', 'UX/UI']
  },
  {
    id: 2,
    title: 'Why Your E-commerce Site Needs a Mobile-First Approach',
    excerpt: 'Learn how mobile-first design can significantly boost your online sales and customer satisfaction.',
    image: '/placeholder-gdyly.png',
    date: 'March 10, 2024',
    readTime: '7 min read',
    category: 'E-commerce',
    tags: ['Mobile', 'E-commerce', 'Conversion']
  },
  {
    id: 3,
    title: 'The Complete Guide to Website Performance Optimization',
    excerpt: 'Master the art of creating lightning-fast websites that rank higher and convert better.',
    image: '/website-performance.png',
    date: 'March 5, 2024',
    readTime: '10 min read',
    category: 'Performance',
    tags: ['Performance', 'SEO', 'Optimization']
  }
]

const categories = ['All', 'Design', 'E-commerce', 'Performance', 'Accessibility', 'Technology', 'SEO']

export default function BlogPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Stay updated with the latest trends, tips, and insights from the world of web development.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:w-2/3">
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'All' ? 'default' : 'outline'}
                    size="sm"
                    className={category === 'All' ? 'gradient-bg text-white' : 'hover:bg-purple-50 hover:text-purple-600'}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {blogPosts.map((post, index) => (
                  <Card 
                    key={post.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-44 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-purple-600">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button size="lg" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Load More Posts
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-6 lg:space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Stay Updated</h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                      Get the latest web development tips and insights delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button className="w-full gradient-bg text-white">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Web Design', 'React', 'Next.js', 'SEO', 'Performance', 'E-commerce', 'UX/UI', 'JavaScript'].map((tag) => (
                        <span key={tag} className="bg-gray-100 hover:bg-purple-100 hover:text-purple-600 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex gap-3">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={60}
                            height={60}
                            className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                          />
                          <div>
                            <h4 className="text-sm font-medium line-clamp-2 hover:text-purple-600 cursor-pointer transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

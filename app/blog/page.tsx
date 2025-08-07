import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: '10 Web Design Trends That Will Dominate 2024',
    excerpt: 'Discover the latest design trends that are shaping the future of web development and user experience. From AI-powered interfaces to sustainable design practices.',
    image: '/web-design-trends-2024.png',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Design',
    tags: ['Web Design', 'Trends', 'UX/UI']
  },
  {
    id: 2,
    title: 'Why Your E-commerce Site Needs a Mobile-First Approach',
    excerpt: 'Learn how mobile-first design can significantly boost your online sales and customer satisfaction. Statistics show that mobile commerce is growing rapidly.',
    image: '/placeholder-gdyly.png',
    date: 'March 10, 2024',
    readTime: '7 min read',
    category: 'E-commerce',
    tags: ['Mobile', 'E-commerce', 'Conversion']
  },
  {
    id: 3,
    title: 'The Complete Guide to Website Performance Optimization',
    excerpt: 'Master the art of creating lightning-fast websites that rank higher and convert better. Learn about Core Web Vitals, image optimization, and more.',
    image: '/website-performance.png',
    date: 'March 5, 2024',
    readTime: '10 min read',
    category: 'Performance',
    tags: ['Performance', 'SEO', 'Optimization']
  },
  {
    id: 4,
    title: 'Building Accessible Websites: A Developer\'s Guide',
    excerpt: 'Creating inclusive web experiences that work for everyone. Learn about WCAG guidelines, semantic HTML, and accessibility testing tools.',
    image: '/web-accessibility-design.png',
    date: 'February 28, 2024',
    readTime: '8 min read',
    category: 'Accessibility',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design']
  },
  {
    id: 5,
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'Explore emerging technologies and frameworks that are reshaping web development. From AI integration to new JavaScript frameworks.',
    image: '/future-web-development-2024.png',
    date: 'February 20, 2024',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['Future Tech', 'JavaScript', 'AI']
  },
  {
    id: 6,
    title: 'SEO Best Practices for Modern Websites',
    excerpt: 'Boost your website\'s search engine rankings with these proven SEO strategies. Learn about technical SEO, content optimization, and link building.',
    image: '/seo-best-practices.png',
    date: 'February 15, 2024',
    readTime: '9 min read',
    category: 'SEO',
    tags: ['SEO', 'Search Rankings', 'Content Strategy']
  }
]

const categories = ['All', 'Design', 'E-commerce', 'Performance', 'Accessibility', 'Technology', 'SEO']

export default function BlogPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest trends, tips, and insights from the world of web development. 
              Learn from our experts and grow your digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-12">
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

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <Card 
                    key={post.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-purple-600">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700 group/btn">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Load More Posts
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter Signup */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                    <p className="text-gray-600 mb-4">
                      Get the latest web development tips and insights delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button className="w-full gradient-bg text-white">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Web Design', 'React', 'Next.js', 'SEO', 'Performance', 'E-commerce', 'UX/UI', 'JavaScript'].map((tag) => (
                        <span key={tag} className="bg-gray-100 hover:bg-purple-100 hover:text-purple-600 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex space-x-3">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded-lg flex-shrink-0"
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

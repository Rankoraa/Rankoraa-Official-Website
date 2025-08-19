import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16">
      {/* Floating blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-28 h-28 bg-purple-300/40 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-16 right-8 w-24 h-24 bg-blue-300/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 animate-slide-up-stagger">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight" style={{ fontFamily: 'var(--font-display), var(--font-body), system-ui' }}>
              Mumbai’s{' '}
              <span className="text-shimmer block">Bold IT Partner</span>
              for the Web
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-xl font-semibold">
              Rankoraa is a Mumbai, IN based IT services agency specializing in Web Development, Web Design, and SEO. We build fast, modern, SEO-first websites that grow your business.
            </p>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative z-10 neomorphic rounded-3xl p-6 md:p-8 animate-morph">
              <Image
                src="/modern-website-mockup.png"
                alt="Modern website mockup"
                width={520}
                height={540}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'

const clients = [
  { name: 'Google', logo: '/Google-Logo.wine.svg' },
  { name: 'Wordpress', logo: '/wordpress-ar21.svg' },
  { name: 'Woocommerce', logo: '/Woocommerce--Streamline-Svg-Logos.svg' },
  { name: 'Shopify', logo: '/Shopify_logo_2018.svg' },
  { name: 'Yoast SEO', logo: '/Yoast_idmGkMosKx_0.svg' },
  { name: 'React', logo: '/reactjs-ar21.svg' },
  { name: 'Node.Js', logo: '/Node.js_logo_2015.svg' },
  { name: 'AWS', logo: '/Amazon_Web_Services_Logo.svg' },
  { name: 'Oracle Cloud', logo: '/Oracle_Cloud_Platform-Logo.wine.svg' },
]

export default function ClientLogoMarquee() {
  const items = [...clients, ...clients, ...clients]

  return (
    <section aria-label="Our Clients" className="pt-10 pb-10 sm:pt-12 sm:pb-12 md:pt-14 md:pb-14 lg:py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Title removed intentionally per request */}

        {/* Row 1 */}
        <div className="relative overflow-hidden fade-mask">
          <div className="marquee-track" aria-hidden="false">
            {items.map((client, idx) => (
              <div key={`${client.name}-${idx}`} className="mx-8 sm:mx-10 lg:mx-14 flex items-center justify-center flex-none">
                <Image
                  src={client.logo || '/placeholder.svg'}
                  alt={`${client.name} logo`}
                  width={200}
                  height={70}
                  className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden fade-mask mt-6 sm:mt-8">
          <div className="marquee-track reverse" aria-hidden="false">
            {items.map((client, idx) => (
              <div key={`row2-${client.name}-${idx}`} className="mx-8 sm:mx-10 lg:mx-14 flex items-center justify-center flex-none">
                <Image
                  src={client.logo || '/placeholder.svg'}
                  alt={`${client.name} logo`}
                  width={200}
                  height={70}
                  className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

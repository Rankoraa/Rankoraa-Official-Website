import { Award, Users, Clock, Heart } from 'lucide-react'

const stats = [
    { icon: Users, number: '50+', label: 'Happy Clients' },
    { icon: Award, number: '100+', label: 'Projects Completed' },
    { icon: Clock, number: '4+', label: 'Years Experience' },
    { icon: Heart, number: '99%', label: 'Client Satisfaction' },
  ]

  export default function Stats() {
    return (

<section className="pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-16">
<div className="container mx-auto px-4">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
    {stats.map((stat) => (
      <div key={stat.label} className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
          <stat.icon className="w-7 h-7 text-purple-700 dark:text-purple-300" />
        </div>
        <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">{stat.number}</div>
        <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold">{stat.label}</div>
      </div>
    ))}
  </div>
</div>
</section>
)}
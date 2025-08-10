'use client'

import { useEffect, useState } from 'react'

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const target = e.target as Element | null
      const hovering =
        !!target &&
        typeof (target as Element).closest === 'function' &&
        !!(target as Element).closest('.hover-glow, .neomorphic-button')

      setIsHovering(hovering)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-300 ${
        isHovering ? 'w-12 h-12' : 'w-6 h-6'
      }`}
      style={{
        left: mousePosition.x - (isHovering ? 24 : 12),
        top: mousePosition.y - (isHovering ? 24 : 12),
        background: isHovering
          ? 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
      }}
    />
  )
}

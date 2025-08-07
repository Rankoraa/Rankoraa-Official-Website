'use client'

import { useEffect, useState } from 'react'

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('hover-glow') || target.classList.contains('neomorphic-button')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
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
        mixBlendMode: 'multiply'
      }}
    />
  )
}

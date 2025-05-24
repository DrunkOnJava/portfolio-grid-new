import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  image: string
  description: string
  theme: {
    primary: string
    secondary: string
    accent: string
  }
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    image: '/models/Gaming Room.png',
    description: 'A modern gaming setup with RGB lighting',
    theme: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#ddd6fe'
    }
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm ambiance',
    theme: {
      primary: '#ec4899',
      secondary: '#db2777',
      accent: '#fce7f3'
    }
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'A spacious living room for relaxation',
    theme: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#dbeafe'
    }
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'A fully equipped modern kitchen',
    theme: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#d1fae5'
    }
  }
]

export default function Room3DDiorama() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const roomId = urlParams.get('room')
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId)
      if (roomIndex !== -1) {
        setActiveRoom(roomIndex)
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const currentRoom = rooms[activeRoom]

  return (
    <div 
      className="w-full h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${currentRoom.theme.primary}20 0%, ${currentRoom.theme.secondary}20 100%)`
      }}
    >
      {/* 3D Diorama Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div 
          className="relative w-[800px] h-[600px] transform-gpu transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Background Layer */}
          <div 
            className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              transform: 'translateZ(-100px) scale(1.2)',
              background: `linear-gradient(135deg, ${currentRoom.theme.primary}40, ${currentRoom.theme.secondary}40)`
            }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>
          </div>

          {/* Middle Layer - Room Image */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: 'translateZ(0px)'
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={currentRoom.image}
                alt={currentRoom.name}
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>

          {/* Foreground Elements */}
          <div 
            className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            style={{
              transform: 'translateZ(50px)',
              maxWidth: '300px'
            }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: currentRoom.theme.primary }}>
              {currentRoom.name}
            </h2>
            <p className="text-gray-700 text-sm">{currentRoom.description}</p>
          </div>

          {/* Floating Elements */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: currentRoom.theme.accent,
                top: `${20 + i * 15}%`,
                left: `${80 + (i % 2) * 10}%`,
                transform: `translateZ(${30 + i * 10}px)`,
                animation: `float ${3 + i}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* UI Controls */}
      <div className="relative z-20">
        {/* Back Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => router.push('/isometric-gallery')}
            className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-xl font-medium hover:bg-white transition-all shadow-lg"
            style={{ color: currentRoom.theme.primary }}
          >
            ← Back to Gallery
          </button>
        </div>

        {/* Room Selector */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
            <div className="flex gap-2">
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeRoom === index
                      ? 'text-white shadow-md scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: activeRoom === index ? room.theme.primary : undefined
                  }}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-6 left-6">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 text-sm">
            <p style={{ color: currentRoom.theme.primary }}>
              ↔️ Move mouse to view in 3D
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}
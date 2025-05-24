import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  image: string
  description: string
  features: string[]
  color: string
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    image: '/models/Gaming Room.png',
    description: 'A modern gaming setup with RGB lighting and high-end equipment',
    features: ['RGB Lighting', 'Dual Monitors', 'Gaming Chair', 'LED Panels'],
    color: '#8b5cf6'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm ambiance and modern furniture',
    features: ['King Bed', 'Warm Lighting', 'Modern Decor', 'Cozy Atmosphere'],
    color: '#ec4899'
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'A spacious living room perfect for relaxation and entertainment',
    features: ['Large Sofa', 'Entertainment Center', 'Natural Light', 'Open Space'],
    color: '#3b82f6'
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'A fully equipped kitchen with modern appliances and clean design',
    features: ['Modern Appliances', 'Island Counter', 'Clean Design', 'Storage Space'],
    color: '#10b981'
  }
]

export default function IsometricShowcase() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
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

  const currentRoom = rooms[activeRoom]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => router.push('/isometric-gallery')}
          className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-white hover:bg-white/20 transition-all"
        >
          ← Back to Gallery
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Room Display */}
        <div className="relative">
          <div 
            className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl cursor-zoom-in transition-all duration-300 ${
              isZoomed ? 'scale-110' : 'scale-100 hover:scale-105'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            style={{
              boxShadow: `0 20px 60px -10px ${currentRoom.color}40`
            }}
          >
            {/* Decorative Corner */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20"
              style={{ backgroundColor: currentRoom.color }}
            />
            
            {/* Room Image */}
            <div className="relative h-96 w-full">
              <Image
                src={currentRoom.image}
                alt={currentRoom.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Zoom Indicator */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm">
              {isZoomed ? '🔍 Click to zoom out' : '🔍 Click to zoom in'}
            </div>
          </div>

          {/* Floating Elements */}
          <div 
            className="absolute -top-4 -left-4 w-20 h-20 rounded-xl flex items-center justify-center shadow-lg animate-bounce"
            style={{ backgroundColor: currentRoom.color }}
          >
            <span className="text-white text-2xl">✨</span>
          </div>
        </div>

        {/* Room Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">{currentRoom.name}</h1>
            <p className="text-xl text-gray-300">{currentRoom.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Key Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {currentRoom.features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: currentRoom.color }}
                    >
                      <span className="text-white">✓</span>
                    </div>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button 
              className="px-8 py-4 rounded-xl font-medium text-white shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: currentRoom.color }}
            >
              Download Assets
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-medium text-white hover:bg-white/20 transition-all">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Room Selector */}
      <div className="max-w-7xl mx-auto mt-16">
        <h3 className="text-2xl font-semibold text-white mb-6 text-center">Explore Other Rooms</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(index)}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                activeRoom === index 
                  ? 'ring-4 ring-white/50 scale-105' 
                  : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white font-medium text-sm">{room.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
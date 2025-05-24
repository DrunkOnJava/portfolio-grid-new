import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  image: string
  description: string
  tags: string[]
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    image: '/models/Gaming Room.png',
    description: 'A modern gaming setup with RGB lighting and dual monitors',
    tags: ['Gaming', 'RGB', 'Tech']
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm lighting and modern furniture',
    tags: ['Bedroom', 'Cozy', 'Modern']
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'A spacious living room perfect for relaxation and entertainment',
    tags: ['Living', 'Spacious', 'Entertainment']
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'A fully equipped kitchen with modern appliances and clean design',
    tags: ['Kitchen', 'Modern', 'Clean']
  }
]

export default function IsometricGallery() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Isometric Room Collection
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore beautifully crafted 3D isometric rooms with stunning details and modern designs
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`relative group cursor-pointer transform transition-all duration-300 ${
              hoveredRoom === room.id ? 'scale-105' : 'scale-100'
            }`}
            onMouseEnter={() => setHoveredRoom(room.id)}
            onMouseLeave={() => setHoveredRoom(null)}
            onClick={() => setSelectedRoom(room)}
          >
            {/* Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
              {/* Image Container */}
              <div className="relative h-80 bg-gradient-to-br from-gray-700 to-gray-800">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
                
                {/* Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                  hoveredRoom === room.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-sm">{room.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{room.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {room.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-3 shadow-lg transform group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 bg-gradient-to-br from-gray-700 to-gray-800">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.name}
                fill
                className="object-contain p-8"
              />
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 bg-gray-900/80 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">{selectedRoom.name}</h2>
              <p className="text-gray-300 text-lg mb-6">{selectedRoom.description}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => router.push(`/rooms?room=${selectedRoom.id}`)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View in 3D
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Download Assets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
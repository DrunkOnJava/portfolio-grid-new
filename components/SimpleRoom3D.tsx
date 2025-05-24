import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  image: string
  description: string
  color: string
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    image: '/models/Gaming Room.png',
    description: 'A modern gaming setup with RGB lighting',
    color: 'from-purple-600 to-blue-600'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm ambiance',
    color: 'from-pink-600 to-purple-600'
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'A spacious living room for relaxation',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'A fully equipped modern kitchen',
    color: 'from-green-600 to-teal-600'
  }
]

export default function SimpleRoom3D() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [rotation, setRotation] = useState(0)
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
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`w-full h-screen bg-gradient-to-br ${rooms[activeRoom].color} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* 3D Room Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[600px] h-[600px] transform-gpu transition-transform duration-300"
          style={{
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Room Image with 3D effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={rooms[activeRoom].image}
                alt={rooms[activeRoom].name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          
          {/* 3D Shadow */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-20 bg-black/20 blur-xl"
            style={{
              transform: `translateZ(-100px) rotateX(90deg)`
            }}
          />
        </div>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 max-w-md">
            <h1 className="text-3xl font-bold text-white mb-2">{rooms[activeRoom].name}</h1>
            <p className="text-white/80">{rooms[activeRoom].description}</p>
          </div>

          <button
            onClick={() => router.push('/isometric-gallery')}
            className="bg-black/20 backdrop-blur-xl px-6 py-3 rounded-xl text-white hover:bg-black/30 transition-all"
          >
            ← Back to Gallery
          </button>
        </div>

        {/* Room Selector */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-xl rounded-2xl p-6">
            <div className="flex justify-center gap-3 flex-wrap">
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all text-white ${
                    activeRoom === index
                      ? 'bg-white/30 scale-105 shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-white/70 text-sm space-y-2">
            <p>🔄 Auto-rotating</p>
            <p>👆 Click rooms below</p>
          </div>
        </div>
      </div>
    </div>
  )
}
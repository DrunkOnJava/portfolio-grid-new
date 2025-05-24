import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html, Image as DreiImage, PerspectiveCamera } from '@react-three/drei'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  image: string
  description: string
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    image: '/models/Gaming Room.png',
    description: 'A modern gaming setup with RGB lighting'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm ambiance'
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'A spacious living room for relaxation'
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'A fully equipped modern kitchen'
  }
]

function IsometricRoomDisplay({ room }: { room: Room }) {
  return (
    <group>
      {/* Display the isometric room image on a plane */}
      <DreiImage
        url={room.image}
        scale={[8, 8, 1]}
        position={[0, 0, 0]}
        transparent
        opacity={1}
      />
      
      {/* Add subtle shadow plane beneath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function IsometricRoom3D() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const router = useRouter()
  
  // Get room from URL query
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const roomId = urlParams.get('room')
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId)
      if (roomIndex !== -1) {
        setActiveRoom(roomIndex)
      }
    }
  }, [])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <Suspense fallback={
          <Html center>
            <div className="text-white text-xl">Loading 3D View...</div>
          </Html>
        }>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
          <spotLight position={[-5, 10, -5]} intensity={0.3} color="#a855f7" />
          
          {/* Room Display */}
          <IsometricRoomDisplay room={rooms[activeRoom]} />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            maxDistance={20}
            minDistance={5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
          />
          
          {/* Environment */}
          <Environment preset="apartment" />
          <fog attach="fog" args={['#1a1a2e', 10, 50]} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-8 pointer-events-auto">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            {/* Room Info */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 max-w-md">
              <h1 className="text-3xl font-bold text-white mb-2">{rooms[activeRoom].name}</h1>
              <p className="text-gray-300">{rooms[activeRoom].description}</p>
            </div>

            {/* Back Button */}
            <button
              onClick={() => router.push('/isometric-gallery')}
              className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl text-white hover:bg-black/60 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gallery
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-auto">
          <div className="max-w-4xl mx-auto">
            {/* Room Selector */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6">
              <div className="flex justify-center gap-3 mb-4">
                {rooms.map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoom(index)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                      activeRoom === index
                        ? 'bg-purple-600 text-white scale-105 shadow-lg shadow-purple-600/50'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  {autoRotate ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white/60 text-sm pointer-events-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 space-y-1">
            <p className="flex items-center gap-2">
              <span className="text-purple-400">⟲</span> Drag to rotate
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-400">⟳</span> Scroll to zoom
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
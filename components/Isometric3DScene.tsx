import React, { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Text, Box, Image as DreiImage, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/router'
import * as THREE from 'three'

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
    color: '#8b5cf6'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm ambiance',
    color: '#ec4899'
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'A spacious living room for relaxation',
    color: '#3b82f6'
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'A fully equipped modern kitchen',
    color: '#10b981'
  }
]

function RoomCard({ room, isActive }: { room: Room; isActive: boolean }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Float
      speed={isActive ? 1.5 : 0}
      rotationIntensity={isActive ? 0.2 : 0}
      floatIntensity={isActive ? 0.3 : 0}
    >
      <group ref={meshRef} scale={isActive ? 1.1 : 1}>
        {/* Isometric Room Display */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial transparent opacity={0} />
          
          {/* Room Image */}
          <DreiImage
            url={room.image}
            scale={[6, 6, 1]}
            position={[0, 0, 0.01]}
            transparent
          />
        </mesh>

        {/* 3D Frame around the image */}
        <Box args={[6.2, 6.2, 0.2]} position={[0, 0, -0.1]}>
          <meshStandardMaterial color={room.color} metalness={0.8} roughness={0.2} />
        </Box>

        {/* Floating elements */}
        {isActive && (
          <>
            {/* Glow effect */}
            <mesh position={[0, 0, -0.2]}>
              <planeGeometry args={[8, 8]} />
              <meshBasicMaterial color={room.color} transparent opacity={0.2} />
            </mesh>
            
            {/* Title */}
            <Text
              position={[0, -4, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {room.name}
            </Text>
          </>
        )}
      </group>
    </Float>
  )
}

export default function Isometric3DScene() {
  const [activeRoom, setActiveRoom] = useState(0)
  const router = useRouter()
  
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
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          {/* Main Room Display */}
          <RoomCard room={rooms[activeRoom]} isActive={true} />
          
          {/* Background elements */}
          <Float speed={2} rotationIntensity={0.5}>
            <Box args={[1, 1, 1]} position={[5, 3, -5]}>
              <MeshDistortMaterial color="#8b5cf6" speed={5} distort={0.3} />
            </Box>
          </Float>
          
          <Float speed={3} rotationIntensity={0.3}>
            <Box args={[0.8, 0.8, 0.8]} position={[-5, -3, -5]}>
              <MeshDistortMaterial color="#ec4899" speed={3} distort={0.2} />
            </Box>
          </Float>
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          
          {/* Environment */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 max-w-md">
            <h1 className="text-3xl font-bold text-white mb-2">{rooms[activeRoom].name}</h1>
            <p className="text-gray-300">{rooms[activeRoom].description}</p>
          </div>

          <button
            onClick={() => router.push('/isometric-gallery')}
            className="bg-black/30 backdrop-blur-xl px-6 py-3 rounded-xl text-white hover:bg-black/50 transition-all"
          >
            ← Back to Gallery
          </button>
        </div>

        {/* Room Selector */}
        <div className="absolute bottom-6 left-6 right-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-xl rounded-2xl p-6">
            <div className="flex justify-center gap-3 flex-wrap">
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeRoom === index
                      ? 'text-white scale-105 shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeRoom === index ? room.color : undefined,
                  }}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 pointer-events-auto">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-white/70 text-sm space-y-1">
            <p>🖱️ Drag to orbit</p>
            <p>📏 Scroll to zoom</p>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Box, Sphere, Torus, MeshWobbleMaterial, MeshDistortMaterial, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  color: string
  accent: string
}

const rooms: Room[] = [
  { id: 'gaming', name: 'Gaming Room', color: '#8b5cf6', accent: '#a78bfa' },
  { id: 'bedroom', name: 'Cozy Bedroom', color: '#ec4899', accent: '#f472b6' },
  { id: 'living', name: 'Living Room', color: '#3b82f6', accent: '#60a5fa' },
  { id: 'kitchen', name: 'Modern Kitchen', color: '#10b981', accent: '#34d399' }
]

function AnimatedBox({ color, scale = 1 }: { color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshWobbleMaterial color={color} speed={2} factor={0.2} />
    </mesh>
  )
}

function RoomStructure({ room }: { room: Room }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main Room Box */}
        <Box args={[3, 2.5, 3]} position={[0, 0, 0]}>
          <meshStandardMaterial color={room.color} metalness={0.3} roughness={0.4} />
        </Box>
        
        {/* Floor */}
        <Box args={[3.2, 0.1, 3.2]} position={[0, -1.3, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </Box>
        
        {/* Walls */}
        <Box args={[0.1, 2.5, 3]} position={[-1.55, 0, 0]}>
          <meshStandardMaterial color={room.accent} metalness={0.3} roughness={0.4} />
        </Box>
        <Box args={[3, 2.5, 0.1]} position={[0, 0, -1.55]}>
          <meshStandardMaterial color={room.accent} metalness={0.3} roughness={0.4} />
        </Box>
        
        {/* Furniture Elements */}
        <AnimatedBox color="#ffffff" scale={0.5} />
        
        {/* Window */}
        <Box args={[1, 1, 0.1]} position={[1.5, 0.5, 0]}>
          <meshStandardMaterial color="#87ceeb" metalness={0.9} roughness={0.1} transparent opacity={0.5} />
        </Box>
        
        {/* Door */}
        <Box args={[0.8, 1.8, 0.1]} position={[0, -0.35, 1.5]}>
          <meshStandardMaterial color="#8b4513" metalness={0.2} roughness={0.8} />
        </Box>
      </group>
    </Float>
  )
}

function BackgroundElements() {
  return (
    <>
      {/* Floating geometric shapes */}
      <Float speed={2} rotationIntensity={0.5}>
        <Sphere args={[0.5]} position={[4, 2, -3]}>
          <MeshDistortMaterial color="#8b5cf6" speed={5} distort={0.3} />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={0.3}>
        <Torus args={[0.6, 0.2, 16, 32]} position={[-4, -2, -3]}>
          <MeshDistortMaterial color="#ec4899" speed={3} distort={0.2} />
        </Torus>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.7}>
        <Box args={[0.8, 0.8, 0.8]} position={[3, -3, -5]}>
          <MeshWobbleMaterial color="#3b82f6" speed={2} factor={0.3} />
        </Box>
      </Float>
    </>
  )
}

export default function FloatingRoom3D() {
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
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
        
        {/* Main 3D Room */}
        <RoomStructure room={rooms[activeRoom]} />
        
        {/* Background Elements */}
        <BackgroundElements />
        
        {/* Environment */}
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={['#000000', 5, 30]} />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-auto">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">
              {rooms[activeRoom].name}
            </h1>
            <p className="text-gray-400 text-lg">Interactive 3D Room Model</p>
          </div>
          
          <button
            onClick={() => router.push('/isometric-gallery')}
            className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-white hover:bg-white/20 transition-all"
          >
            ← Back to Gallery
          </button>
        </div>

        {/* Room Selector */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <div className="flex gap-3">
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeRoom === index
                      ? 'text-white scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeRoom === index ? room.color : undefined
                  }}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Indicator */}
        <div className="absolute bottom-6 right-6 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white/70 text-sm">
            <p className="font-bold text-white mb-2">3D Room Model</p>
            <p>✨ Floating animation</p>
            <p>🎨 Dynamic colors</p>
            <p>🏠 Isometric style</p>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, useTexture, Text, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
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
    description: 'Modern gaming setup'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    image: '/models/Cozy Bed Room.png',
    description: 'Comfortable bedroom'
  },
  {
    id: 'living',
    name: 'Living Room',
    image: '/models/Living Room.png',
    description: 'Spacious living area'
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    image: '/models/Kitchen.png',
    description: 'Fully equipped kitchen'
  }
]

function RoomCube({ rooms, onFaceClick }: { rooms: Room[], onFaceClick: (index: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Load all room textures
  const textures = rooms.map(room => useTexture(room.image))
  
  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Create materials for each face
  const materials = [
    new THREE.MeshStandardMaterial({ map: textures[0] }), // right
    new THREE.MeshStandardMaterial({ map: textures[1] }), // left
    new THREE.MeshStandardMaterial({ color: '#1a1a1a' }), // top
    new THREE.MeshStandardMaterial({ color: '#1a1a1a' }), // bottom
    new THREE.MeshStandardMaterial({ map: textures[2] }), // front
    new THREE.MeshStandardMaterial({ map: textures[3] }), // back
  ]

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      <boxGeometry args={[4, 4, 4]} />
      {materials.map((material, index) => (
        <meshStandardMaterial 
          key={index} 
          attach={`material-${index}`} 
          {...material} 
        />
      ))}
    </mesh>
  )
}

function Scene({ rooms }: { rooms: Room[] }) {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <spotLight position={[-10, 10, -5]} intensity={0.5} angle={0.3} penumbra={1} />
      
      {/* Main Cube */}
      <RoomCube rooms={rooms} onFaceClick={setSelectedRoom} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Floating Labels */}
      <group>
        <Text position={[5, 0, 0]} fontSize={0.3} color="white">
          {rooms[0].name}
        </Text>
        <Text position={[-5, 0, 0]} fontSize={0.3} color="white">
          {rooms[1].name}
        </Text>
        <Text position={[0, 0, 5]} fontSize={0.3} color="white">
          {rooms[2].name}
        </Text>
        <Text position={[0, 0, -5]} fontSize={0.3} color="white">
          {rooms[3].name}
        </Text>
      </group>
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        autoRotate={false}
      />
      
      <Environment preset="city" />
    </>
  )
}

export default function Room3DCube() {
  const router = useRouter()
  const [activeView, setActiveView] = useState('cube')

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <Suspense fallback={null}>
          <Scene rooms={rooms} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-auto">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">3D Room Showcase</h1>
            <p className="text-gray-400">Drag to rotate • Scroll to zoom</p>
          </div>
          
          <button
            onClick={() => router.push('/isometric-gallery')}
            className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-white hover:bg-white/20 transition-all"
          >
            ← Back to Gallery
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <p className="text-white text-lg mb-2">Interactive 3D Cube</p>
            <p className="text-gray-400">Each face displays a different isometric room</p>
          </div>
        </div>
      </div>
    </div>
  )
}
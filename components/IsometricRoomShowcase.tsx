import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  objPath: string
  mtlPath: string
  texturePath: string
  description: string
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    objPath: '/models/Gaming Room.obj',
    mtlPath: '/models/Gaming Room.mtl',
    texturePath: '/models/Gaming Room.png',
    description: 'A modern gaming setup with RGB lighting'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    objPath: '/models/Cozy Bed Room.obj',
    mtlPath: '/models/Cozy Bed Room.mtl',
    texturePath: '/models/Cozy Bed Room.png',
    description: 'A comfortable bedroom with warm ambiance'
  },
  {
    id: 'living',
    name: 'Living Room',
    objPath: '/models/Living Room.obj',
    mtlPath: '/models/Living Room.mtl',
    texturePath: '/models/Living Room.png',
    description: 'A spacious living room for relaxation'
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    objPath: '/models/Kitchen.obj',
    mtlPath: '/models/Kitchen.mtl',
    texturePath: '/models/Kitchen.png',
    description: 'A fully equipped modern kitchen'
  }
]

function RoomModel({ room, isActive }: { room: Room; isActive: boolean }) {
  const meshRef = useRef<THREE.Group>(null)
  const texture = useTexture(room.texturePath)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} scale={isActive ? 1.1 : 1} position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {isActive && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
            {room.description}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function IsometricRoomShowcase() {
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
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={
          <Html center>
            <div className="text-white text-xl">Loading...</div>
          </Html>
        }>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <spotLight position={[-10, 10, -5]} intensity={0.5} />
          
          <RoomModel room={rooms[activeRoom]} isActive={true} />
          
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2.5}
            minPolarAngle={Math.PI / 4}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
          />
          
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} />
        </Suspense>
      </Canvas>

      {/* UI Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Room Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {rooms[activeRoom].name}
            </h2>
            <p className="text-gray-300">
              {rooms[activeRoom].description}
            </p>
          </div>

          {/* Room Selector */}
          <div className="flex justify-center gap-4 mb-4">
            {rooms.map((room, index) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeRoom === index
                    ? 'bg-blue-600 text-white scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {autoRotate ? 'Stop' : 'Start'} Rotation
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-6 left-6 text-white/80 text-sm">
        <p>Click and drag to rotate</p>
        <p>Scroll to zoom</p>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => router.push('/isometric-gallery')}
          className="px-4 py-2 bg-gray-800/80 backdrop-blur text-white rounded-lg hover:bg-gray-700/80 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Gallery
        </button>
      </div>
    </div>
  )
}
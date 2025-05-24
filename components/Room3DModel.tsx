import React, { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Stage, PresentationControls, ContactShadows, Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRouter } from 'next/router'

interface Room {
  id: string
  name: string
  objPath: string
  mtlPath: string
  description: string
  scale?: number
}

const rooms: Room[] = [
  {
    id: 'gaming',
    name: 'Gaming Room',
    objPath: '/models/Gaming Room.obj',
    mtlPath: '/models/Gaming Room.mtl',
    description: 'A modern gaming setup with RGB lighting',
    scale: 0.1
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    objPath: '/models/Cozy Bed Room.obj',
    mtlPath: '/models/Cozy Bed Room.mtl',
    description: 'A comfortable bedroom with warm ambiance',
    scale: 0.1
  },
  {
    id: 'living',
    name: 'Living Room',
    objPath: '/models/Living Room.obj',
    mtlPath: '/models/Living Room.mtl',
    description: 'A spacious living room for relaxation',
    scale: 0.1
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    objPath: '/models/Kitchen.obj',
    mtlPath: '/models/Kitchen.mtl',
    description: 'A fully equipped modern kitchen',
    scale: 0.1
  }
]

function Model({ room }: { room: Room }) {
  const meshRef = useRef<THREE.Group>(null)
  const materials = useLoader(MTLLoader, room.mtlPath)
  const obj = useLoader(OBJLoader, room.objPath, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      <primitive 
        object={obj} 
        scale={room.scale || 0.1}
        position={[0, -2, 0]}
      />
    </group>
  )
}

// Fallback component for loading
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshNormalMaterial wireframe />
      <Html center>
        <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
          Loading 3D Model...
        </div>
      </Html>
    </mesh>
  )
}

export default function Room3DModel() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [error, setError] = useState<string | null>(null)
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
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [4, 4, 4], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Stage
            intensity={0.5}
            environment="city"
            shadows={{ type: 'accumulative', color: '#9b87d4', opacity: 0.8 }}
            adjustCamera={1.2}
          >
            <Model room={rooms[activeRoom]} />
          </Stage>
          
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          {/* Room Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md">
            <h1 className="text-3xl font-bold text-white mb-2">{rooms[activeRoom].name}</h1>
            <p className="text-gray-300">{rooms[activeRoom].description}</p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push('/isometric-gallery')}
            className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </button>
        </div>
      </div>

      {/* Room Selector */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <div className="flex justify-center gap-3">
            {rooms.map((room, index) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoom(index)
                  setError(null)
                }}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  activeRoom === index
                    ? 'bg-purple-600 text-white scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 text-white">
            <p className="text-xl mb-2">Unable to load 3D model</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        </div>
      )}

      {/* Controls Info */}
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white/60 text-sm">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-1">
          <p>🖱️ Drag to rotate</p>
          <p>📏 Scroll to zoom</p>
          <p>🔄 Auto-rotating</p>
        </div>
      </div>
    </div>
  )
}
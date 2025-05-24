import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

// Dynamically import to avoid SSR issues
const FloatingRoom3D = dynamic(
  () => import('@/components/FloatingRoom3D'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading 3D Room...</div>
      </div>
    )
  }
)

export default function RoomsPage() {
  return (
    <>
      <Head>
        <title>Isometric Rooms - Interactive 3D Showcase</title>
        <meta name="description" content="Explore beautiful isometric 3D rooms in an interactive showcase" />
      </Head>
      <FloatingRoom3D />
    </>
  )
}
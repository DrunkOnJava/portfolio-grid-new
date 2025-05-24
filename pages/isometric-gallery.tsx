import React from 'react'
import Head from 'next/head'
import IsometricGallery from '@/components/IsometricGallery'

export default function IsometricGalleryPage() {
  return (
    <>
      <Head>
        <title>Isometric Room Gallery - Portfolio Showcase</title>
        <meta name="description" content="A stunning gallery of isometric 3D rooms showcasing modern interior designs" />
      </Head>
      <IsometricGallery />
    </>
  )
}
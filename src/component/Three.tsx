import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Model from './Model'
import { Html, useProgress } from '@react-three/drei'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % Loading Now</Html>
}

const Three: React.VFC = () => {
  return (
    <div>
      <Canvas style={{height : "100vh"}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Loader />}>
          <Model scale={5}/>
        </Suspense>
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />

      </Canvas>
    </div>
  )
}

export default Three

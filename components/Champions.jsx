/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/champions.glb 
*/
import useMousePosition from './useMousePosition'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'

export function Model(props) {
  const { nodes, materials } = useGLTF('/champions.glb')
  const { x, y } = useMousePosition()
  const {color} = useSpring({
    from: { color: '#f00' },
    to: [{ color: '#fff' }, { color: '#f00' }],
  
    config: { duration: 1000 },
    loop: true
  })
  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = 10; // Define the radius of the circular path
    camera.position.x = radius * Math.cos(x/500  -1  ) ;
    camera.position.z = radius * Math.sin(x/500  -1 ) ;
    camera.position.y =  y /100;
    camera.lookAt(0, 0, 0); // Make the camera always look at the center of the scene
  });
  return (
    <group {...props} dispose={null} position={[0,-6,1]} scale={10}>
      <mesh geometry={nodes.Circle001.geometry} >
        <meshPhysicalMaterial roughness={0} color={color} metalness={0.8} />
      </mesh>
      <mesh geometry={nodes.Circle001_1.geometry}  >
        <meshPhysicalMaterial roughness={0} color={"gold"} metalness={0.8} />
      </mesh>
      <mesh geometry={nodes.Circle001_2.geometry} material={materials['black metal']} />
    </group>
  )
}

useGLTF.preload('/champions.glb')
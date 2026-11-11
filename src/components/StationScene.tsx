import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Component, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { projects } from '../data/projects'
import { SceneFallback } from './SceneFallback'

type Props = {
  activeIndex: number
  reducedMotion: boolean
  roomOpen: boolean
  onSelect: (index: number) => void
}

function Stars() {
  const points = useMemo(() => {
    let seed = 38
    const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    return Float32Array.from({ length: 900 }, () => (random() - 0.5) * 60)
  }, [])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b7d7ff" size={0.045} transparent opacity={0.68} sizeAttenuation />
    </points>
  )
}

function CameraRig({ activeIndex, reducedMotion, roomOpen }: Pick<Props, 'activeIndex' | 'reducedMotion' | 'roomOpen'>) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame((_, delta) => {
    const angle = (activeIndex - 1) * 0.28
    target.set(Math.sin(angle) * (roomOpen ? 3.1 : 2.2), roomOpen ? 0.9 : 1.25, (roomOpen ? 5.4 : 8.2) - Math.abs(activeIndex - 1) * 0.35)
    if (reducedMotion) camera.position.copy(target)
    else camera.position.lerp(target, 1 - Math.exp(-delta * 2.8))
    camera.lookAt(0, 0.65, 0)
  })
  return null
}

function RoomPortal({ accent, reducedMotion }: { accent: string; reducedMotion: boolean }) {
  const rings = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!reducedMotion && rings.current) {
      rings.current.rotation.z += delta * 0.16
      rings.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.025)
    }
  })
  return (
    <group position={[0, 0.05, -0.28]}>
      <group ref={rings}>
        <mesh><torusGeometry args={[1.12, 0.055, 10, 48]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={3.2} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}><torusGeometry args={[0.94, 0.018, 8, 48]} /><meshBasicMaterial color="#e9ffff" transparent opacity={0.7} /></mesh>
        <mesh rotation={[0, 0, -Math.PI / 3]}><torusGeometry args={[0.76, 0.012, 8, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.64} /></mesh>
      </group>
      <mesh position={[0, 0, -0.03]}><circleGeometry args={[1.05, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.09} side={THREE.DoubleSide} /></mesh>
      <spotLight position={[0, 1.8, 1.8]} target-position={[0, 0, 0]} color={accent} intensity={22} distance={6} angle={0.55} penumbra={0.8} />
    </group>
  )
}

function EnergyConduit({ destination, accent, selected, reducedMotion, offset }: { destination: [number, number, number]; accent: string; selected: boolean; reducedMotion: boolean; offset: number }) {
  const signal = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.55, 0),
    new THREE.Vector3(destination[0] * 0.42, 1.05 + Math.abs(destination[0]) * 0.08, destination[2] + 0.35),
    new THREE.Vector3(...destination),
  ]), [destination])
  useFrame((state) => {
    if (!signal.current) return
    const progress = reducedMotion ? 0.72 : (state.clock.elapsedTime * 0.16 + offset) % 1
    signal.current.position.copy(curve.getPointAt(progress))
  })
  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 48, selected ? 0.022 : 0.01, 6, false]} />
        <meshBasicMaterial color={accent} transparent opacity={selected ? 0.72 : 0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={signal} scale={selected ? 1 : 0.58}>
        <sphereGeometry args={[0.065, 10, 10]} />
        <meshBasicMaterial color="#efffff" transparent opacity={selected ? 0.95 : 0.42} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Station({ activeIndex, reducedMotion, roomOpen, onSelect }: Props) {
  const station = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!reducedMotion && station.current) station.current.rotation.y += delta * 0.055
    if (!reducedMotion && core.current) {
      core.current.rotation.x += delta * 0.16
      core.current.rotation.z -= delta * 0.1
      core.current.position.y = 0.55 + Math.sin(state.clock.elapsedTime * 0.7) * 0.08
    }
  })

  return (
    <group ref={station}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.35, 0.18, 12, 72]} />
        <meshStandardMaterial color="#17283c" metalness={0.9} roughness={0.2} emissive="#153851" emissiveIntensity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.72, 0.035, 8, 72]} />
        <meshBasicMaterial color="#65f5ff" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.1, 3.1, 0.16, 48, 1, true]} />
        <meshStandardMaterial color="#0d1624" metalness={0.8} roughness={0.38} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={core} position={[0, 0.55, 0]}>
        <octahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial color="#6fffe9" emissive="#2ed8cb" emissiveIntensity={2.2} wireframe transparent opacity={0.86} />
      </mesh>
      {projects.map((project, index) => {
        const angle = (index - 1) * 0.72
        return <EnergyConduit key={`${project.id}-conduit`} destination={[Math.sin(angle) * 3.2, 0.65, Math.cos(angle) * 0.3]} accent={project.accent} selected={index === activeIndex} reducedMotion={reducedMotion} offset={index / projects.length} />
      })}
      {[0, 1, 2].map((index) => {
        const angle = (index - 1) * 0.72
        const selected = index === activeIndex
        return (
          <group key={projects[index].id} position={[Math.sin(angle) * 3.2, 0.65, Math.cos(angle) * 0.3]} rotation={[0, -angle, 0]}>
            <mesh
              onClick={(event) => { event.stopPropagation(); onSelect(index) }}
              onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
              onPointerLeave={() => { document.body.style.cursor = '' }}
              scale={selected ? 1.08 : 0.9}
            >
              <boxGeometry args={[1.38, 1.72, 0.06]} />
              <meshStandardMaterial color={projects[index].accent} emissive={projects[index].accent} emissiveIntensity={selected ? 1.5 : 0.55} transparent opacity={selected ? 0.32 : 0.14} />
            </mesh>
            <mesh position={[0, -1.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.74, 0.9, 0.08, 28]} />
              <meshBasicMaterial color={projects[index].accent} transparent opacity={selected ? 0.72 : 0.24} />
            </mesh>
            {selected && roomOpen && <RoomPortal accent={projects[index].accent} reducedMotion={reducedMotion} />}
          </group>
        )
      })}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 3.35, 0.12, 0]}>
          <mesh><cylinderGeometry args={[0.22, 0.32, 2.5, 10]} /><meshStandardMaterial color="#213247" metalness={0.85} roughness={0.22} /></mesh>
          <pointLight color={side < 0 ? '#6fffe9' : '#a98bff'} intensity={13} distance={5} position={[0, 1.2, 0]} />
        </group>
      ))}
    </group>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children }
}

export default function StationScene(props: Props) {
  return (
    <SceneBoundary>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.25, 8.2], fov: 44, near: 0.1, far: 80 }} gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }} fallback={<SceneFallback />}>
        <color attach="background" args={['#060913']} />
        <fog attach="fog" args={['#060913', 10, 34]} />
        <ambientLight intensity={0.4} color="#89a8c8" />
        <directionalLight position={[3, 6, 4]} intensity={2.1} color="#d9efff" />
        <CameraRig activeIndex={props.activeIndex} reducedMotion={props.reducedMotion} roomOpen={props.roomOpen} />
        <Stars />
        <Station {...props} />
      </Canvas>
    </SceneBoundary>
  )
}

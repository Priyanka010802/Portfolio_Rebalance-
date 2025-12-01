import React, { useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PieSlice = ({ startAngle, angle, color, radius, height, label }) => {
  const createArcShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, startAngle + angle, false);
    shape.lineTo(0, 0);
    return shape;
  };

  return (
    <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
      <extrudeGeometry
        attach="geometry"
        args={[createArcShape(), { depth: height, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 }]}
      />
      <meshStandardMaterial attach="material" color={color} roughness={0.4} metalness={0.7} />
      <Html
        position={[
          radius * Math.cos(startAngle + angle / 2),
          height + 0.3,
          radius * Math.sin(startAngle + angle / 2),
        ]}
        style={{ color: color, fontWeight: '700', fontSize: '14px', userSelect: 'none', textShadow: '0 0 5px rgba(0,0,0,0.7)' }}
        center
      >
        {label}
      </Html>
    </mesh>
  );
};

const colors = ['#FF4C4C', '#4C9EFF', '#FFCE56', '#36CFC9', '#9966FF'];

function FullScreenSimulation({ portfolio }) {
  useEffect(() => {
    AOS.init({ duration: 1300, once: true });
  }, []);

  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0);

  let currentAngle = 0;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: '40px 20px',
        backgroundImage: `linear-gradient(
          rgba(2,0,36,0.85), 
          rgba(9,9,121,0.7),
          rgba(0,212,255,0.6)
        ), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        overflowY: 'auto',
      }}
    >
      <div
        className="p-5 rounded-4"
        style={{
          maxWidth: '900px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 36px rgba(0, 0, 0, 0.37)',
          color: '#e0f7fa',
        }}
        data-aos="fade-up"
      >
        <h1 className="mb-4 fw-bold text-center" style={{ textShadow: '0 0 15px #00ffe7' }}>
          Stock Market Portfolio Simulation
        </h1>
        <p className="text-center fs-5 mb-5">
          Total Portfolio Value: <span className="fw-bold text-info">${totalValue.toFixed(2)}</span>
        </p>

        <Canvas
          shadows
          style={{ height: '500px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.35)' }}
          camera={{ position: [0, 6, 13], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 15, 10]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 0, -10]} intensity={0.4} />
          <OrbitControls enablePan enableRotate enableZoom />
          {portfolio.map((asset, idx) => {
            const angle = (asset.value / totalValue) * Math.PI * 2;
            const slice = (
              <PieSlice
                key={asset.id}
                startAngle={currentAngle}
                angle={angle}
                color={colors[idx % colors.length]}
                radius={3}
                height={1.5}
                label={`${asset.name}: ${(asset.value / totalValue * 100).toFixed(1)}%`}
              />
            );
            currentAngle += angle;
            return slice;
          })}
        </Canvas>

        <div className="text-center mt-4" style={{ fontStyle: 'italic', color: '#00d8ffcc' }}>
          Tip: Drag to explore your portfolio allocation in 3D
        </div>
      </div>
    </div>
  );
}

export default FullScreenSimulation;

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const DynamicBackground = ({ theme }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const bgGradients = {
    agni: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)",
    jal: "linear-gradient(135deg, #082f49 0%, #0c4a6e 100%)",
    prithvi: "linear-gradient(135deg, #14532d 0%, #064e3b 100%)",
    vaayu: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
    akash: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
  };

  const currentBg = theme && bgGradients[theme] ? bgGradients[theme] : bgGradients['akash'];

  const getOptions = () => {
    let baseColor = "#ffffff";
    let options = {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        color: { value: baseColor },
        links: { enable: false },
        move: { enable: true, speed: 1 },
        number: { density: { enable: true, area: 800 }, value: 80 },
        opacity: { value: { min: 0.1, max: 0.5 } },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } }
      },
      detectRetina: true
    };

    switch (theme) {
      case 'agni':
        options.particles.color.value = ["#ff4500", "#ff8c00", "#ffff00"];
        options.particles.move.direction = "top";
        options.particles.shape.type = ["circle", "triangle"];
        options.particles.size.value = { min: 1, max: 5 };
        options.particles.number.value = 150;
        options.particles.move.speed = 3;
        break;
      case 'jal':
        options.particles.color.value = ["#00bfff", "#87cefa", "#ffffff"];
        options.particles.move.direction = "top";
        options.particles.size.value = { min: 2, max: 8 };
        options.particles.number.value = 100;
        options.particles.move.speed = 2;
        break;
      case 'prithvi':
        options.particles.shape.type = "image";
        options.particles.shape.options = {
          image: [
            { src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2322c55e"><path d="M11 20V12H7l5-8 5 8h-4v8z"/></svg>', width: 24, height: 24 },
            { src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2316a34a"><path d="M12 14c-4-4-8-2-8-2s2-4 8-2 8 2 8 2-4-2-8 2z"/></svg>', width: 24, height: 24 }
          ]
        };
        options.particles.size.value = { min: 15, max: 35 };
        options.particles.move.direction = "right";
        options.particles.move.speed = 0.5;
        options.particles.number.value = 40;
        options.particles.opacity.value = { min: 0.6, max: 0.9 };
        break;
      case 'vaayu':
        options.particles.shape.type = "image";
        options.particles.shape.options = {
          image: [
            { src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.8-4.2-4.1-4.5C17.2 7.2 14.8 5 12 5c-3 0-5.5 2.2-6 5.1C3.8 10.3 2 12.2 2 14.5 2 17 4 19 6.5 19h11z"/></svg>', width: 48, height: 48 },
            { src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2394a3b8"><path d="M12 2L10 12l10-2-10 2L14 22l-2-10-10 2 10-2z"/></svg>', width: 32, height: 32 }
          ]
        };
        options.particles.size.value = { min: 30, max: 80 };
        options.particles.move.direction = "right";
        options.particles.move.speed = 1.5;
        options.particles.number.value = 30;
        options.particles.opacity.value = { min: 0.5, max: 0.9 };
        options.particles.rotate = {
          value: 0,
          animation: { enable: true, speed: 2, sync: false }
        };
        break;
      case 'akash':
        options.particles.color.value = ["#8a2be2", "#dda0dd", "#ffffff"];
        options.particles.move.direction = "none";
        options.particles.size.value = { min: 0.5, max: 2 };
        options.particles.opacity.animation = { enable: true, speed: 1, sync: false };
        options.particles.number.value = 200;
        options.particles.move.speed = 0.5;
        break;
      default:
        break;
    }

    return options;
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, background: currentBg, margin: 0, padding: 0 }} />
      {init && theme && (
        <Particles
          id="dynamic-app-background"
          options={getOptions()}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}
        />
      )}
    </>
  );
};

export default DynamicBackground;

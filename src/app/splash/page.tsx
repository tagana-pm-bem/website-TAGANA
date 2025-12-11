"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

function Homepage() {
  const router = useRouter();
  const [counters, setCounters] = useState({
    volunteers: 0,
    missions: 0,
    provinces: 0
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const targets = { volunteers: 1000, missions: 500, provinces: 34 };
    const duration = 1200;
    const steps = 60;
    const stepDuration = duration / steps;

    (Object.keys(targets) as Array<keyof typeof targets>).forEach(key => {
      let current = 0;
      const increment = targets[key] / steps;
      const timer = setInterval(() => {
        current += increment;
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
        if (current >= targets[key]) {
          setCounters(prev => ({
            ...prev,
            [key]: targets[key]
          }));
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  const handlePelajariClick = () => {
    router.push('/peta-page');
  };
  return (
    <main>
      <style>{`
        .hero {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          overflow: hidden;
        }
        .hero-video-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1;
        }
        .hero-content, .hero-stats {
          position: relative;
          z-index: 2;
        }
        .hero-content {
          text-align: center;
          padding: 3rem 1rem 1rem 1rem;
        }
        .hero-title {
          font-size: 5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .hero-description {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .btn {
          padding: 0.7rem 1.5rem;
          border-radius: 25px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          background: #1b7213ff;
          color: #fff;
          transition: background 0.2s;
        }
        .btn.secondary {
          background: transparent;
          border: 2px solid #fff;
        }
        .btn:hover {
          background: #687213ff;
        }
        .hero-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .stat-item {
          text-align: center;
        }
        .stat-item h3 {
          font-size: 1.5rem;
          margin-bottom: 0.3rem;
        }
       @media (max-width: 600px) {
          .hero-title { font-size: 1.5rem; }
          .hero-stats { flex-direction: column; gap: 1rem; }
          .hero {
            min-height: 100vh;
            width: 100vw;
          }
          .hero-video-bg {
            width: 100vw;
            height: 100vh;
          }
        }
      `}</style>
      <div className="hero">
        <video
          ref={videoRef}
          className="hero-video-bg"
          src="/video/video homepage.mp4"
          autoPlay
          muted
          loop={false}
          playsInline
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">SRIHARJO</h1>
          <p className="hero-description">
            Peta interaktif desa Sriharjo, menyediakan informasi lengkap mengenai potensi, fasilitas, dan demografi desa kami.
          </p>
          <div className="hero-buttons">
            <button
              className="btn"
              onClick={handlePelajariClick}
            >
              Selengkapnya
            </button>
            <button className="btn secondary">Login</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <h3>{counters.volunteers}+</h3>
            <p>Total Penduduk</p>
          </div>
          <div className="stat-item">
            <h3>{counters.missions}+</h3>
            <p>Lokasi</p>
          </div>
          <div className="stat-item">
            <h3>{counters.provinces}</h3>
            <p>Isi apa ya bingung</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
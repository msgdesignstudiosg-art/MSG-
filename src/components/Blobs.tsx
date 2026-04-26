export default function Blobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Atmospheric Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]" />
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>
    </div>
  );
}

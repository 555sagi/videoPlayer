import { useEffect, useRef, useState } from 'react'

import './App.css'

function PortraitVideoPlayer() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPortrait, setIsPortrait] = useState(true)
  const [current, setCurrent] = useState('0:00')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      const sec = Math.floor(video.currentTime)
      const mins = Math.floor(sec / 60)
      const secs = sec % 60
      setCurrent(`${mins}:${secs.toString().padStart(2, '0')}`)
    }

    const onEnded = () => setIsPlaying(false)

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const step = (amount) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + amount))
  }

  return (
    <section className={`portrait-player ${isPortrait ? 'portrait' : 'landscape'}`}>
      <h2>Portrait Video Player</h2>
      <div className="video-frame">
        <video
          ref={videoRef}
          playsInline
          poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.jpg"
        >
          <source src="/video/sister-wishes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="controls">
        <button onClick={() => step(-10)} aria-label="Rewind 10 seconds">« 10s</button>
        <button onClick={togglePlay} aria-label="Play/Pause">{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => step(10)} aria-label="Forward 10 seconds">10s »</button>
        <button className="toggle-mode" onClick={() => setIsPortrait((p) => !p)} aria-label="Toggle portrait mode">
          {isPortrait ? 'Landscape' : 'Portrait'}
        </button>
        <span className="time">{current}</span>
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <PortraitVideoPlayer />
      
    </>
  )
}

export default App

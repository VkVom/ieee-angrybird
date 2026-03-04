import { useState, useRef, useEffect } from 'react'

import imgBackground from './assets/background.png'
import imgBirdBlack from './assets/bird_black.png'
import imgBirdBlue from './assets/bird_blue.png'
import imgBirdRed from './assets/bird_red.png'
import imgBirdWhite from './assets/bird_white.png'
import imgBirdYellow from './assets/bird_yellow.png'
import imgArrowLeft from './assets/arrow_left.png'
import imgArrowRight from './assets/arrow_right.png'
import imgIeeeLogo from './assets/ieee_logo.png'
import imgWoodenBoard from './assets/wooden_board.png'
import imgPigRegular from './assets/pig_regular.png'
import imgPigKing from './assets/pig_king.png'
import imgPigHelmet from './assets/pig_helmet.png'
import imgPigMustache from './assets/pig_mustache.png'
import imgPigSmall from './assets/pig_small.png'
import bgMusic from './assets/angry-bird.mp3'

/* ── slide data ── */
const slides = [
  {
    id: 1,
    title: 'AS7007 INCIDENT (1997)',
    quote: '"Trust me bro routing."',
    damage:
      'Damage: A rogue router falsely claimed it owned the internet, black-holing massive amounts of global traffic.',
    pig: imgPigKing,
  },
  {
    id: 2,
    title: 'DYN DNS DDOS ATTACK (2016)',
    quote: '"It\'s always DNS."',
    damage:
      "Damage: A massive DDoS attack killed the internet's phonebook, instantly taking down Twitter, Netflix, and GitHub.",
    pig: imgPigRegular,
  },
  {
    id: 3,
    title: 'LOG4SHELL EXPLOIT (2021)',
    quote: '"One dependency to rule them all."',
    damage:
      'Damage: A critical zero-day in Log4j gave attackers remote code execution on millions of servers worldwide.',
    pig: imgPigHelmet,
  },
  {
    id: 4,
    title: 'CLOUDFLARE OUTAGE (2022)',
    quote: '"Have you tried turning it off and on again?"',
    damage:
      'Damage: A misconfigured network change knocked out 19 data centers, disrupting millions of websites globally.',
    pig: imgPigMustache,
  },
  {
    id: 5,
    title: 'CROWDSTRIKE BSOD (2024)',
    quote: '"Windows has encountered a problem."',
    damage:
      'Damage: A faulty kernel-level update caused 8.5 million Windows machines to blue-screen simultaneously worldwide.',
    pig: imgPigSmall,
  },
]

export default function App() {
  const [cur, setCur] = useState(0)
  const [birdOffset, setBirdOffset] = useState(0)
  const touchX = useRef(null)
  const audioRef = useRef(null)

  // Background music — autoplay on first user interaction
  useEffect(() => {
    const audio = new Audio(bgMusic)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    const playOnInteraction = () => {
      audio.play().catch(() => { })
      document.removeEventListener('click', playOnInteraction)
      document.removeEventListener('touchstart', playOnInteraction)
    }

    document.addEventListener('click', playOnInteraction)
    document.addEventListener('touchstart', playOnInteraction)

    return () => {
      audio.pause()
      document.removeEventListener('click', playOnInteraction)
      document.removeEventListener('touchstart', playOnInteraction)
    }
  }, [])

  const birds = [imgBirdRed, imgBirdYellow, imgBirdBlue, imgBirdBlack, imgBirdWhite]

  const show = (n) => setCur(((n % slides.length) + slides.length) % slides.length)
  const go = (d) => {
    show(cur + d)
    setBirdOffset((prev) => prev + d)
  }

  const handleTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchX.current === null) return
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
    touchX.current = null
  }

  const slide = slides[cur]

  // Calculate bird style — one bird centered, others hidden
  const getBirdStyle = (index) => {
    // Which bird is currently active (centered)
    const activeIndex = (((-birdOffset % birds.length) + birds.length) % birds.length)
    const isActive = index === activeIndex

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${isActive ? 1.1 : 0.3})`,
      zIndex: isActive ? 10 : 1,
      opacity: isActive ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      filter: isActive
        ? 'drop-shadow(3px 6px 8px rgba(0,0,0,0.4))'
        : 'none',
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center "
      style={{ background: '#1a2744' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel container */}
      <div className="relative w-full max-w-[500px] mx-auto select-none">

        {/* ── THE SLIDE ── */}
        <div className="relative w-full overflow-hidden">

          {/* Background image — sets the slide's natural height */}
          <img
            src={imgBackground}
            alt=""
            className="w-full h-auto max-h-[100vh] block"
          />

          {/* All content overlaid on the background */}
          <div className="absolute inset-0 flex flex-col">

            {/* IEEE Logo */}
            <div className="flex justify-center pt-2">
              <img src={imgIeeeLogo} alt="IEEE" className="w-[18%] max-w-[80px] object-contain" />
            </div>

            {/* Birds area — 3D circular carousel */}
            <div className="relative  flex-1 mx-auto w-full" style={{ maxHeight: '55%' }}>
              {birds.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-[44%] object-contain"
                  style={getBirdStyle(i)}
                />
              ))}
            </div>

            {/* Title */}
            <div className="text-center px-4 pb-1 z-[4]">
              <h1
                className="text-white text-[5.5vw] sm:text-[24px] md:text-[30px] font-black uppercase tracking-wider leading-none"
                style={{
                  fontFamily: "'Feast of Flesh BB','Impact','Arial Black',sans-serif",
                  textShadow: '2px 2px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000',
                  // WebkitTextStroke: '0.8px #000',
                  // textDecoration: 'underline',
                  textDecorationColor: 'rgba(255,255,255,0.5)',
                  textUnderlineOffset: '4px',
                }}
              >
                {slide.title}
              </h1>
            </div>

            {/* Grass divider */}
            <div
              className="h-[6%] min-h-[30px] "
              style={{
                background: 'linear-gradient(180deg,transparent 0%,#4a8c2a 30%,#5ca632 50%,#3d7a22 70%,#4a8c2a 100%)',
              }}
            />

            {/* Green section with board + pig */}
            <div
              className="relative overflow-hidden pb-20"
              style={{
                background: 'linear-gradient(180deg,#3d7a22 0%,#2d5a18 60%,#1a3d0f 100%)',
              }}
            >
              {/* Wooden board — wider than the container */}
              <div
                className="relative mx-auto mb-10"
                style={{ width: '136%', marginLeft: '-18%', marginTop: '-5%' }}
              >
                <img src={imgWoodenBoard} alt="" className="w-full h-auto block" />

                {/* Board content overlay */}
                <div
                  className="absolute inset-0 flex flex-col  "
                  style={{ padding: '18% 32% 10%' }}
                >
                  {/* Dark wooden header strip */}
                  <div
                    className="rounded-sm flex-shrink-0"
                    style={{
                      height: '7%',
                      // background: 'tran',
                      // boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.2)',
                    }}
                  />

                  {/* Parchment / paper area */}
                  <div
                    className="flex-1 mt-[3%] rounded-sm px-5 py-3 sm:px-6 sm:py-4"
                    style={{
                      // background: 'linear-gradient(160deg, #f5e6c8 0%, #f0deb8 25%, #ecdaaf 50%, #f2e0bc 75%, #ebd5a5 100%)',
                      // boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.12)',
                    }}
                  >
                    <p
                      className="text-[#201c1c] text-[3.2vw] sm:text-[17px] md:text-[19px] font-semibold mb-2 leading-snug"
                      style={{ fontFamily: "'ADLaM Display','Georgia',serif" }}
                    >
                      {slide.quote}
                    </p>
                    <p
                      className="text-[#8b0000] text-[3vw] sm:text-[15px] md:text-[17px] font-bold leading-normal"
                      style={{ fontFamily: "'ADLaM Display','Georgia',serif" }}
                    >
                      {slide.damage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pig — bottom-left, overlapping the board edge */}
              <img
                src={slide.pig}
                alt=""
                className="absolute bottom-[25%] left-[2%] w-[24%] max-w-[110px] object-contain drop-shadow-lg z-[10]"
              />
            </div>
          </div>
        </div>

        {/* ── NAV ARROWS ── */}
        <button
          onClick={() => go(-1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 w-14 h-14 z-20 cursor-pointer border-none bg-transparent p-0 hover:scale-110 transition-transform"
        >
          <img src={imgArrowLeft} alt="Previous" className="w-full h-full object-contain" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 w-14 h-14 z-20 cursor-pointer border-none bg-transparent p-0 hover:scale-110 transition-transform"
        >
          <img src={imgArrowRight} alt="Next" className="w-full h-full object-contain" />
        </button>

        {/* ── DOTS ── */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => show(i)}
              className={`w-[10px] h-[10px] rounded-full border-none cursor-pointer transition-all duration-200 ${i === cur ? 'bg-[#d48a2e] scale-130' : 'bg-white/70'
                }`}
            />
          ))}
        </div>

        {/* Powered by inwoq — right below dots */}
        <a
          href="https://www.instagram.com/inwoq.official/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-bold text-white/60 text-[17px] hover:text-white/90 transition-colors no-underline"
          style={{ fontFamily: "'ADLaM Display','Georgia',serif" }}
        >
          Powered By INWOQ
        </a>
      </div>
    </div>
  )
}

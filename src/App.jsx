import './global.css'
import { useEffect } from 'react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  useEffect(() => {
    const handleStart = () => {
      const handleMove = e => {
        const { clientX, clientY } = e.touches[0]
        const element = document.elementFromPoint(clientX, clientY)
        const isHexagon = element?.classList?.contains('hexagon')
        const isNotActive = !element?.classList?.contains('active')
        if (element && isHexagon && isNotActive) {
          element.classList.add('active')
          setTimeout(() => element.classList.remove('active'), 1000)
        }
      }
      const handleEnd = () => {
        document.removeEventListener('touchmove', handleMove)
      }
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleEnd)
    }
    document.addEventListener('touchstart', handleStart)
    return () => document.removeEventListener('touchstart', handleStart)
  }, [])

  return (
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col">
      {Array.from({ length: 30 }).map((_, rowIndex) => (
        <section
          key={rowIndex}
          className={`flex w-full h-[120px] gap-[3px] relative mt-[-26px] ${
            rowIndex % 2 === 1 ? 'left-[-62px]' : ''
          }`}
          style={{ transform: 'translateX(-140px)' }}
        >
          {Array.from({ length: 30 }).map((_, hexIndex) => (
            <aside
              key={hexIndex}
              className="hexagon w-[120px] h-[120px] shrink-0 grow-0 bg-[#222] text-[#222] transition-all duration-[1500ms]"
              style={{
                clipPath:
                  'polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%)',
                boxShadow: 'inset 0 0 64px 8px currentColor'
              }}
            />
          ))}
        </section>
      ))}
    </div>
  )
}

const root = createElement('div')
document.body.appendChild(root)
createRoot(root).render(<App />)

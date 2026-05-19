import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { Footer } from './Footer'
import { leonConfigs } from '../../utils/leons'

import backgroundImage from '../../assets/bg.png'

export function Layout() {
  const location = useLocation()

  const leonConfig =
    Object.entries(leonConfigs).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1] || null

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col relative overflow-hidden">
      {/* Background */}
      <div
        className="
          fixed inset-0 z-0
          bg-center bg-cover bg-no-repeat
          opacity-[1]
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        aria-hidden="true"
      />

      <Header />

      {/* Leones */}
      {leonConfig && (
        <div
          className={`
            pointer-events-none fixed inset-0 z-10
            flex items-center justify-center
            ${leonConfig.containerClassName}
          `}
          aria-hidden="true"
        >
          <img
            src={leonConfig.image}
            alt=""
            className={`
              object-contain opacity-[1] select-none
              ${leonConfig.imageClassName}
            `}
          />
        </div>
      )}

      <main className="relative z-20 flex-1 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Outlet />
        </div>
      </main>

      <div className="relative z-20">
  <BottomNav />
  <Footer />
</div>
    </div>
  )
}
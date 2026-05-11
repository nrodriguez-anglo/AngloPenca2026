import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()
  const showLeon = location.pathname === '/mis-predicciones'

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Header />

      {showLeon && (
        <div
          className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center"
          style={{ marginLeft: '900px' }}
          aria-hidden="true"
        >
          <img
            src="/leon-base.png"
            alt=""
            className="w-70 h-70 object-contain opacity-[0.3] select-none"
          />
        </div>
      )}

      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Outlet />
        </div>
      </main>
      <BottomNav />
      <Footer />
    </div>
  )
}
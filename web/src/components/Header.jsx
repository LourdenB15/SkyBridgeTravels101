import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthButtons from './AuthButtons'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] px-4 py-4 shadow-md md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center md:flex md:justify-between">
        <button
          onClick={toggleMobileMenu}
          className="order-1 flex flex-col gap-[5px] p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-[3px] w-7 rounded-sm bg-white transition-all ${
              mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-[3px] w-7 rounded-sm bg-white transition-all ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-[3px] w-7 rounded-sm bg-white transition-all ${
              mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>

        <Link
          to="/"
          className="order-2 flex items-center gap-3 justify-self-center transition-transform hover:scale-[1.02] md:order-none md:justify-self-auto"
        >
          <span className="text-2xl md:text-3xl">✈️</span>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-white md:text-[1.3rem]">
              SkyBridge Travels
            </span>
            <span className="hidden text-[0.7rem] text-white/85 lg:block">
              Your journey begins here
            </span>
          </div>
        </Link>

        <div
          className={`${
            mobileMenuOpen
              ? 'absolute left-4 right-4 top-full z-50 mt-4 flex flex-col gap-2 rounded-lg bg-white/[0.98] p-4 shadow-lg backdrop-blur-sm'
              : 'hidden'
          } order-4 col-span-3 md:static md:order-none md:col-span-1 md:flex md:flex-row md:items-center md:gap-8 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all ${
              isActive('/')
                ? 'bg-white/25 font-semibold text-white md:bg-white/25'
                : 'text-gray-700 hover:bg-[#4e8cff]/10 hover:text-[#4e8cff] md:text-white md:hover:bg-white/20 md:hover:text-white'
            }`}
          >
            Stays
          </Link>
          <Link
            to="/flights"
            onClick={closeMobileMenu}
            className={`rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all ${
              isActive('/flights')
                ? 'bg-white/25 font-semibold text-white md:bg-white/25'
                : 'text-gray-700 hover:bg-[#4e8cff]/10 hover:text-[#4e8cff] md:text-white md:hover:bg-white/20 md:hover:text-white'
            }`}
          >
            Flights
          </Link>
          <Link
            to="/bookings"
            onClick={closeMobileMenu}
            className={`rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all ${
              isActive('/bookings')
                ? 'bg-white/25 font-semibold text-white md:bg-white/25'
                : 'text-gray-700 hover:bg-[#4e8cff]/10 hover:text-[#4e8cff] md:text-white md:hover:bg-white/20 md:hover:text-white'
            }`}
          >
            My Bookings
          </Link>
        </div>

        <div className="order-3 flex items-center justify-self-end md:order-none">
          <AuthButtons />
        </div>
      </div>
    </nav>
  )
}

export default Header

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, loading, logout } = useAuth()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const hamburgerRef = useRef(null)

  const isActive = (path) => location.pathname === path

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleSignOut = async () => {
    setDropdownOpen(false)
    closeMobileMenu()
    await logout()
    navigate('/')
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = user?.firstName || 'User'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <nav className="relative sticky top-0 z-50 bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] px-4 py-4 shadow-md md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center md:flex md:justify-between">
        <button
          ref={hamburgerRef}
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
          <Plane className="h-7 w-7 text-white md:h-8 md:w-8" />
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
          ref={mobileMenuRef}
          className={`${
            mobileMenuOpen
              ? 'absolute left-0 right-0 top-full z-50 flex flex-col gap-2 bg-black/80 p-4 backdrop-blur-sm'
              : 'hidden'
          } order-4 col-span-3 md:static md:order-none md:col-span-1 md:flex md:flex-row md:items-center md:gap-8 md:bg-transparent md:p-0`}
        >
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all ${
              isActive('/')
                ? 'bg-white/20 text-white md:bg-white/25'
                : 'text-white/80 hover:bg-white/10 hover:text-white md:text-white md:hover:bg-white/20'
            }`}
          >
            Stays
          </Link>
          <Link
            to="/flights"
            onClick={closeMobileMenu}
            className={`rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all ${
              isActive('/flights')
                ? 'bg-white/20 text-white md:bg-white/25'
                : 'text-white/80 hover:bg-white/10 hover:text-white md:text-white md:hover:bg-white/20'
            }`}
          >
            Flights
          </Link>
          <Link
            to="/bookings"
            onClick={closeMobileMenu}
            className={`rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all ${
              isActive('/bookings')
                ? 'bg-white/20 text-white md:bg-white/25'
                : 'text-white/80 hover:bg-white/10 hover:text-white md:text-white md:hover:bg-white/20'
            }`}
          >
            My Bookings
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="rounded-lg px-4 py-2 text-left text-[0.95rem] font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white md:hidden"
            >
              Logout
            </button>
          )}
        </div>

        <div className="order-3 flex items-center justify-self-end md:order-none">
          {loading ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-white/20 md:h-10 md:w-24 md:rounded-lg" />
          ) : isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/20"
              >
                <span className="hidden text-[0.95rem] font-medium text-white lg:block">
                  {displayName}
                </span>
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-white/30 bg-white text-[0.95rem] font-bold text-[#4e8cff]">
                  {initial}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 hidden min-w-[200px] overflow-hidden rounded-lg bg-black/80 backdrop-blur-sm md:block">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center px-5 py-3 text-[0.95rem] text-white/80 transition-all hover:bg-white/10 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[#4e8cff] shadow-sm transition-all hover:bg-white/95 hover:shadow-md md:h-auto md:w-auto md:rounded-lg md:border-0 md:px-6 md:py-2.5 md:hover:-translate-y-0.5"
            >
              <span className="text-lg md:hidden">👤</span>
              <span className="hidden text-[0.95rem] font-semibold md:block">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header

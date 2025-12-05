import { useState, useRef, useEffect } from 'react'
import { useUser, useClerk, SignInButton } from '@clerk/clerk-react'

function AuthButtons() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    setDropdownOpen(false)
    signOut()
  }

  if (!isLoaded) {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-white/20" />
  }

  if (isSignedIn) {
    const displayName = user.username || user.firstName || 'User'
    const initial = displayName.charAt(0).toUpperCase()

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/20"
        >
          <span className="hidden text-[0.95rem] font-medium text-white lg:block">
            {displayName}
          </span>
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="h-[38px] w-[38px] rounded-full border-2 border-white/30 object-cover"
            />
          ) : (
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-white/30 bg-white text-[0.95rem] font-bold text-[#4e8cff]">
              {initial}
            </div>
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 min-w-[200px] overflow-hidden rounded-lg bg-white shadow-lg">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-5 py-3 text-[0.95rem] text-gray-700 transition-all hover:bg-[#4e8cff]/10 hover:text-[#4e8cff]"
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <SignInButton mode="modal">
      <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[#4e8cff] shadow-sm transition-all hover:bg-white/95 hover:shadow-md md:h-auto md:w-auto md:rounded-lg md:border-0 md:px-6 md:py-2.5 md:hover:-translate-y-0.5">
        <span className="text-lg md:hidden">👤</span>
        <span className="hidden text-[0.95rem] font-semibold md:block">Sign In</span>
      </button>
    </SignInButton>
  )
}

export default AuthButtons

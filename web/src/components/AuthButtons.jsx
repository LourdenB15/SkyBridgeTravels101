import { useUser, SignInButton, UserButton } from '@clerk/clerk-react'

function AuthButtons() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="h-8 w-20 bg-white/20 rounded animate-pulse" />
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-white text-sm">
          Hi, {user.firstName || 'User'}!
        </span>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8'
            }
          }}
        />
      </div>
    )
  }

  return (
    <SignInButton mode="modal">
      <button className="bg-white text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
        Sign In
      </button>
    </SignInButton>
  )
}

export default AuthButtons

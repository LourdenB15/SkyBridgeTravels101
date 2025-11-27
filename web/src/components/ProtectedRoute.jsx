import { useAuth, SignInButton } from '@clerk/clerk-react'

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-text">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Sign in required</h2>
          <p className="text-gray-text mb-6">
            Please sign in to continue with your booking. Your booking details will be saved.
          </p>
          <SignInButton mode="modal">
            <button className="w-full bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Sign In to Continue
            </button>
          </SignInButton>
          <p className="mt-4 text-sm text-gray-text">
            Don't have an account? Sign up for free when you sign in.
          </p>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute

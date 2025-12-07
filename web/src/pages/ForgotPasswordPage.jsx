import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '@/services/authApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plane, Loader2, Mail, ArrowLeft } from 'lucide-react'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await forgotPassword(email)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    setError('')

    try {
      await forgotPassword(email)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] p-4">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#4e8cff] to-[#3d7ae8] p-8 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-8 w-8" />
            <span className="text-2xl font-bold">SkyBridge Travels</span>
          </div>
          <p className="text-blue-100 text-sm mb-6">Your journey begins here</p>
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-blue-100">
            {submitted
              ? 'Check your inbox for the reset link'
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        <div className="p-8">
          {submitted ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Check your email</h2>
                <p className="text-gray-600 text-sm">
                  We've sent a password reset link to
                </p>
                <p className="text-gray-800 font-medium mt-1">{email}</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleResend}
                disabled={loading}
                className="w-full text-center text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50"
              >
                {loading ? 'Sending...' : "Didn't receive it? Resend"}
              </button>

              <div className="border-t border-gray-200 pt-6">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-[#4e8cff] to-[#3d7ae8] hover:from-[#3d7ae8] hover:to-[#2d6ad8] text-white font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>

              <div className="border-t border-gray-200 pt-6">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

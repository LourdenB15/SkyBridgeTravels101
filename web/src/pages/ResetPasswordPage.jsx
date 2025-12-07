import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '@/services/authApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plane, Eye, EyeOff, Loader2, Check, Circle, AlertCircle } from 'lucide-react'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a letter', met: /[a-zA-Z]/.test(password) },
    { label: 'Contains a number', met: /[0-9]/.test(password) }
  ]

  const allRequirementsMet = passwordRequirements.every((req) => req.met)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!allRequirementsMet) {
      setError('Please meet all password requirements')
      return
    }

    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await resetPassword(token, password)
      navigate('/login', {
        state: { message: 'Password reset successful. Please sign in with your new password.' }
      })
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. The link may be invalid or expired.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] p-4">
        <div className="w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#4e8cff] to-[#3d7ae8] p-8 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plane className="h-8 w-8" />
              <span className="text-2xl font-bold">SkyBridge Travels</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Invalid Link</h1>
            <p className="text-blue-100">This reset link is invalid or missing</p>
          </div>
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-gray-600 mb-6">
              The password reset link appears to be invalid. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="inline-block w-full py-3 bg-gradient-to-r from-[#4e8cff] to-[#3d7ae8] hover:from-[#3d7ae8] hover:to-[#2d6ad8] text-white font-medium rounded-lg text-center"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] p-4">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#4e8cff] to-[#3d7ae8] p-8 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-8 w-8" />
            <span className="text-2xl font-bold">SkyBridge Travels</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Set New Password</h1>
          <p className="text-blue-100">Create a new secure password</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
              {error.includes('invalid or expired') && (
                <Link to="/forgot-password" className="block mt-2 text-blue-500 hover:text-blue-600">
                  Request a new reset link
                </Link>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="space-y-1 mt-2">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {req.met ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300" />
                  )}
                  <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <div className="flex items-center gap-2 text-sm mt-1">
                {passwordsMatch ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4 text-red-400" />
                    <span className="text-red-500">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-[#4e8cff] to-[#3d7ae8] hover:from-[#3d7ae8] hover:to-[#2d6ad8] text-white font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage

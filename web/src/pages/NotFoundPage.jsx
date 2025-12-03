import { Link } from 'react-router-dom'
import { XCircle, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-dark mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-text mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

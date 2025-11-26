import { Link } from 'react-router-dom'
import AuthButtons from './AuthButtons'

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#3B82F6] text-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4v16" />
                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                <path d="M2 17h20" />
                <path d="M6 8v9" />
              </svg>
              <span className="text-sm font-medium">Stays</span>
            </div>
          </Link>
          <AuthButtons />
        </div>
      </div>
    </header>
  )
}

export default Header

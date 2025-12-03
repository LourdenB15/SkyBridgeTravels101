import { Loader2 } from 'lucide-react'

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

function LoadingSpinner({ size = 'lg', text = '', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && <p className="mt-4 text-gray-text">{text}</p>}
    </div>
  )
}

export default LoadingSpinner

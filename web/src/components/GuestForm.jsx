import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

function GuestForm({ onValuesChange, onValidationChange }) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return value.trim() === '' ? 'First name is required' : ''
      case 'lastName':
        return value.trim() === '' ? 'Last name is required' : ''
      case 'email':
        if (value.trim() === '') return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        return ''
      default:
        return ''
    }
  }

  const validateAll = () => {
    const newErrors = {
      firstName: validateField('firstName', values.firstName),
      lastName: validateField('lastName', values.lastName),
      email: validateField('email', values.email)
    }
    setErrors(newErrors)
    setTouched({
      firstName: true,
      lastName: true,
      email: true
    })
    return !newErrors.firstName && !newErrors.lastName && !newErrors.email
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))

    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(values)
    }
  }, [values, onValuesChange])

  useEffect(() => {
    if (onValidationChange) {
      const isValid = !errors.firstName && !errors.lastName && !errors.email &&
        values.firstName.trim() !== '' && values.lastName.trim() !== '' &&
        values.email.trim() !== '' && validateEmail(values.email)
      onValidationChange(isValid, validateAll)
    }
  }, [errors, values, onValidationChange])

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-dark mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-primary focus:outline-none ${
            errors.firstName && touched.firstName ? 'border-red-500' : 'border-dark'
          }`}
          aria-invalid={errors.firstName && touched.firstName ? 'true' : 'false'}
        />
        {errors.firstName && touched.firstName && (
          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-dark mb-1">
          Last Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-primary focus:outline-none ${
            errors.lastName && touched.lastName ? 'border-red-500' : 'border-dark'
          }`}
          aria-invalid={errors.lastName && touched.lastName ? 'true' : 'false'}
        />
        {errors.lastName && touched.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-primary focus:outline-none ${
            errors.email && touched.email ? 'border-red-500' : 'border-dark'
          }`}
          aria-invalid={errors.email && touched.email ? 'true' : 'false'}
        />
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
    </div>
  )
}

export default GuestForm

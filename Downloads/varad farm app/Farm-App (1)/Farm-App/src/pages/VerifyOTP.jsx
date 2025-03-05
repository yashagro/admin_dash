import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaShieldAlt, FaArrowRight } from 'react-icons/fa'
import axios from 'axios'
const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const mobile = location.state?.mobile
  useEffect(() => {
    if (!mobile) {
      navigate('/login')
    }
  }, [mobile, navigate])
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])
  const handleChange = (index, value) => {
    if (value && !/\d/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setErrorMsg('Please enter the complete 6-digit code')
      return
    }
    setIsLoading(true)
    setErrorMsg('')
    try {
      const response = await axios.post('http://194.164.148.246/api/auth/verify-otp', {
        mobile_no: mobile,
        otp: otpValue
      })
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token)
        navigate('/dashboard')
      } else {
        throw new Error(response.data.message || 'Invalid OTP')
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid verification code')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleResendOTP = async () => {
    setCountdown(30)
    setCanResend(false)
    try {
      await axios.post('http://194.164.148.246/api/auth/send-otp', { mobile_no: mobile })
    } catch (err) {
      setErrorMsg('Failed to resend verification code')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaShieldAlt className="text-green-600 text-3xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Phone</h2>
          <p className="text-gray-700 mt-2">We've sent a 6-digit code to <span className="font-medium">{mobile}</span></p>
        </div>
        {errorMsg && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white "
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-700 transition" disabled={isLoading}>
            {isLoading ? <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span> : <FaArrowRight className="mr-2" />}
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Didn't receive the code?{' '}
            {canResend ? <button onClick={handleResendOTP} className="text-gray-600 hover:underline">Resend Code</button> : <span className="text-gray-500">Resend in {countdown}s</span>}
          </p>
        </div>
      </div>
    </div>
  )
}
export default VerifyOTP

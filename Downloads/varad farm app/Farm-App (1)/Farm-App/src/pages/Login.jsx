import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMobileAlt, FaSms, FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const Login = () => {
  const [mobile, setMobile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const navigate = useNavigate()

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    try {
      const response = await axios.post('http://194.164.148.246/api/auth/send-otp', {
        mobile_no: mobile
      })

      if (response.data?.success) {
        navigate('/verify-otp', { state: { mobile } }) // Redirect to OTP page
      } else {
        throw new Error(response.data?.message || 'Failed to send OTP.')
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to send OTP. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">Farmer Admin Login</h2>
          <p className="text-gray-600">Enter your mobile number to receive an OTP</p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSendOTP}>
          {/* Mobile Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMobileAlt className="text-gray-400" />
              </div>
              <input
                id="mobile"
                type="tel"
                className="w-full pl-10 bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={isLoading || mobile.length !== 10}
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : <FaSms className="mr-2" />}
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

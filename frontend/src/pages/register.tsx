
import Navbar from '../component/navbar'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

  


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      const Chek_user = await axios.get(
        'http://localhost:5000/api/auth/check-user-existing',
        {
          params: {
          username: username
        }
        }
      )
      console.log("API Response:", Chek_user);
      console.log("API Response:", Chek_user.data);
      
      if (!Chek_user.data.available) {
          setMessage(Chek_user.data.message);
          setMessageType("error");
        } else {
          setMessage("");
        }
    }catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
            "Validation Error:",
            JSON.stringify(error.response?.data, null, 2)
        )
    }
    }

  if (password !== confirmPassword) {
    setMessage("There is an issue with the password.");
    setMessageType("error");
  }

  if (password.length < 8) {
    setMessage("There is an issue with the password.");
    setMessageType("error");
  }

  if (!category) {
    setMessage("Please select your category");
    setMessageType("error");
  }

  if (password.length > 0) {
    return;
  }


    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username: username,
          password: password,
          category: category
        }
      )

      
      

      console.log(response.data)
      alert('Register Success!')
      
      if (response.status === 200) {
        navigate("/")
      }

    } catch (error) {
       if (axios.isAxiosError(error)) {
        console.log(
            "Validation Error:",
            JSON.stringify(error.response?.data, null, 2)
        )
    }
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-center text-cyan-700 mb-2">
            Register
          </h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">

           
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
                Category
              </label>

            <select className="w-full border border-gray-300 rounded-lg px-4 py-3" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select category</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>

            </select>
          </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

           
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {message && (
          <div
            className={`p-3 mb-4 rounded-lg border ${
              messageType === "success"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition duration-300"
            >
              Register
            </button>

          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            You have an account?

            <a href="/login" className="text-cyan-700 font-semibold ml-1 hover:underline">
              Sign in
            </a>
          </p>

        </div>
      </div>
    </>
  )
}

export default Register

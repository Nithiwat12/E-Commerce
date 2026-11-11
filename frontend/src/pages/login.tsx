import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

type LoginProps = {
  setIsLogin: (value: boolean) => void;
};

function Login({ setIsLogin }: LoginProps) {
const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username: username,
          password: password
        },
  {
    withCredentials: true
  }
      )
      
      if (response.data.available) {
          setIsLogin(true);
          navigate("/");
        } else {
          setMessage(response.data.message);
          setMessageType("error");
        }



    } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log("Status:", error.response?.status);
          console.log("Response Data:", JSON.stringify(error.response?.data, null, 2));
          console.log("Request Data:", error.config?.data);
  } else {
    console.log(error);
  }
    }
  }
  return (
    <>

      <div className="flex justify-center items-center min-h-[80vh] ">
            <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-cyan-700 mb-2">
                     Login
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"/>
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
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"/>
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
                    <button type="submit" className="w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition duration-300">
                        Login

                    </button>
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Don't have an account?
                    <a href="/register" className="text-cyan-700 font-semibold ml-1 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
      </div>
    </>
  )
}

export default Login
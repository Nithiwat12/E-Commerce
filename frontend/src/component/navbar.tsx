import { Link } from 'react-router-dom'

type NavbarProps = {
  IsLogin: boolean;
  setIsLogin: (value: boolean) => void;
};
function  Navbar({ IsLogin, setIsLogin }: NavbarProps) {




  return (
    <>
      <nav className="flex items-center justify-between bg-cyan-700 px-12 py-4">

      
      <h2 className="text-2xl font-bold text-white">
       <a href="/">E-Commerce</a>
      </h2>

      
      <div className="flex items-center gap-6 text-white">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      {IsLogin ? (
        <div className="flex items-center gap-4 text-white">
          <Link to="#">Profile</Link>
          <button >Logout</button>
        </div>
) : (
      <div className="flex items-center gap-4 text-white">
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-white hover:bg-cyan-600 transition duration-300"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 rounded-lg text-white hover:bg-cyan-600 transition duration-300"
        >
          Register
        </Link>
      </div>
)}

    </nav>
    </>
  )
}

export default Navbar

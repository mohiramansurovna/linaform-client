import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex text-cyan-300 text-6xl gap-1.5 flex-col items-center justify-center h-screen w-screen">
      hello there its home page
      <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>
  )
}

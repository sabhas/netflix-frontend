import "./home.scss"
import Navbar from "../../components/navbar"
import Featured from "../../components/featured"

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured />
    </div>
  )
}

export default Home

import "./home.scss"
import Navbar from "../../components/navbar"
import Featured from "../../components/featured"
import List from "../../components/list"

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured />
      <List />
      <List />
      <List />
      <List />
    </div>
  )
}

export default Home

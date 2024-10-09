import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingcartPovider } from "./context/shoppingCartContext"

function App() {
  return (
    <ShoppingcartPovider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingcartPovider>


  )

}

export default App

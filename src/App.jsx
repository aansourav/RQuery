import ProductList from './components/ProductList'
import ProductDetails from "./components/ProductDetails.jsx";
import {useState} from "react";
import {AddProduct} from "./components/AddProduct.jsx";

function App() {
    const [id, setID] = useState(null)
    return (
        <div className="flex m-2">
            <AddProduct/>
            <ProductList setID={setID} />
            <ProductDetails id={id}/>
        </div>
    )
}

export default App

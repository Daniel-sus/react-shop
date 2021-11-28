import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import SideBar from './components/SideBar';
import React, {useState} from 'react';
import axios from "axios";
import { Route } from 'react-router-dom'
import Favourites from './components/Favourites'
import Account from './components/Account';
import AppContext from './context';
import BurgerSlider from "./components/BurgerSlider"
import Overlay from './components/Overlay';

function App() {

  const [cartItems, setCartItems] = useState([])

  const [favouriteItems, setFavouriteItems] = useState([])
  
  const [wrapperItems, setWrapperItems] = useState([]);

  const [counter, setCounter] = useState()

  const { setIsFavorite } = React.useContext(AppContext)

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  const isItemLiked = (id) => {
    return favouriteItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  React.useEffect(() => {
    async function Preload() {
      const serverItems = await axios
      .get("https://613397247859e700176a3760.mockapi.io/items")
      
      const serverCartItems = await  axios
      .get("https://613397247859e700176a3760.mockapi.io/cart")

      const serverFavourites = await axios
      .get('https://613397247859e700176a3760.mockapi.io/favourites')

        
        setCartItems(serverCartItems.data);
        setFavouriteItems(serverFavourites.data);
        setWrapperItems(serverItems.data);
    }
    Preload()
  }, []);

  const onAddToFavourite = async (obj) => {
    try {
      if (favouriteItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://613397247859e700176a3760.mockapi.io/favourites/${obj.id}`)
        setFavouriteItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        setIsFavorite(false)
      } else {
        const { data } = await
        axios.post('https://613397247859e700176a3760.mockapi.io/favourites', obj)
        setFavouriteItems((prev) => [...prev, data])
      }
    } catch (error) {
      
    }
  }

  React.useEffect(() => {
    setCounter(cartItems.length)
  }, [cartItems])
 

  const onAddToCart = async (cartItemObj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(cartItemObj.id))
    if (findItem) {
    setCartItems((prev) => prev.filter( item => Number(item.parentId) !==  Number(cartItemObj.id)))
    await axios
    .delete(`https://613397247859e700176a3760.mockapi.io/cart/${findItem.id}`);
    } else {
    const {data} = await axios
    .post('https://613397247859e700176a3760.mockapi.io/cart', cartItemObj);
    setCartItems((prev) => [...prev, data]);
    }
  } catch (error) {
    alert("Ошибка при добвалении в корзину")
  }
    
  };
 

  const deleteItem = (id) => {
    axios
    .delete(`https://613397247859e700176a3760.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !==  Number(id)))
  }
  const [cartOpened, setCartOpened] = useState(false)
  const [burgerOpened, setBurgerOpened] = useState(false)
  return (
    <AppContext.Provider value={{ onAddToFavourite, wrapperItems, cartOpened, cartItems, favouriteItems, isItemAdded, isItemLiked, setCartOpened,  setCartItems, setBurgerOpened, burgerOpened, onAddToCart }}>
      <div className="App">
      <div className="main_wrapper"> 
      {cartOpened ? <Overlay onClose={()=> setCartOpened((false))}/> : null}
      {cartOpened ? <SideBar deleteItem={(cartitem) => deleteItem(cartitem)} items={cartItems} onRemoveItem onClose={() => setCartOpened(false)} />: null}
        <Header onClickCart={() => setCartOpened(true)} counter={counter}/>
        <BurgerSlider onClickCart={() => setCartOpened(!cartOpened)} />
       <Route path={process.env.PUBLIC_URL + "/favourites"} >
         <Favourites />
       </Route>
        <Route path={process.env.PUBLIC_URL + "/"} exact >
          <Home />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/account"}>
         <Account />
       </Route>
      </div>
    </div>
    </AppContext.Provider>
    
  );
}

export default App;

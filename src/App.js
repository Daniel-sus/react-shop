import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import SideBar from './components/SideBar';
import React, {useState} from 'react';
import axios from "axios";
import { Route } from 'react-router-dom'
import Favourites from './components/Favourites'
import Account from './components/Account';
import Overlay from './components/Overlay';
import AppContext from './context';
import BurgerSlider from "./components/BurgerSlider"

function App() {

  const [cartItems, setCartItems] = useState([])

  const [favouriteItems, setFavouriteItems] = useState([])
  
  const [wrapperItems, setWrapperItems] = useState([]);

  const [counter, setCounter] = useState()

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) == Number(id))
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


  const onAddToFavourite = async (item) => {
   try {
    if (favouriteItems.find((f) => Number(f.id) == Number(item.id))){
      axios
      .delete(`https://613397247859e700176a3760.mockapi.io/favourites/${item.id}`)
      setFavouriteItems((prev) => prev.filter( f => Number(f.id) !== Number(item.id)))
    } else {
      const {data} = await axios.post('https://613397247859e700176a3760.mockapi.io/favourites', item)
    setFavouriteItems((prev) => [...prev, data])}
   } catch (error) {
     alert("ты еблан")
   }
  }

  React.useEffect(() => {
    setCounter(cartItems.length)
  })
 

  const onAddToCart = (item) => {
    if (cartItems.find(f => Number(f.id) == Number(item.id))) {
       axios
    .delete(`https://613397247859e700176a3760.mockapi.io/cart/${item.id}`);
      setCartItems((cartItems) => cartItems.filter( f => Number(f.id) !==  Number(item.id)))
    } else {
      axios
    .post('https://613397247859e700176a3760.mockapi.io/cart', item);
    setCartItems((cartItems) => [...cartItems, item]);
    setCounter(cartItems.length)
    console.log(item.id)
    }
  };
 

  const deleteItem = (item) => {
    
    setCartItems((prev) => prev.filter( f => Number(f.id) !==  Number(item.id)))
    axios
    .delete(`https://613397247859e700176a3760.mockapi.io/cart/${item.id}`);
    setCounter(cartItems.length)
  }
  const [cartOpened, setCartOpened] = useState(false)
  const [burgerOpened, setBurgerOpened] = useState(false)
  return (
    <AppContext.Provider value={{wrapperItems, cartItems, favouriteItems, isItemAdded, setCartOpened,  setCartItems, setBurgerOpened, burgerOpened }}>
      <div className="App">
      <div className="main_wrapper"> 
      {cartOpened ? <Overlay onClickOverlay={() => setCartOpened(false)}/> : null}
        {cartOpened ? <SideBar deleteItem={(cartitem) => deleteItem(cartitem)} items={cartItems} onRemoveItem onClose={() => setCartOpened(false)} /> : null}
        
        <Header onClickCart={() => setCartOpened(true)} counter={counter}/>
        <BurgerSlider />
       <Route path="/favourites">
         <Favourites onFavourite={(item) => onAddToFavourite(item)} onPlus={(item) => onAddToCart(item)}/>
       </Route>
        <Route path="/" exact>
          <Home wrapperItems={wrapperItems} cartItems={cartItems} favouriteItems={favouriteItems} onFavourite={(item) => onAddToFavourite(item)} onPlus={(item) => onAddToCart(item)} />
          </Route>
          <Route path="/account">
         <Account />
       </Route>
      </div>
    </div>
    </AppContext.Provider>
    
  );
}

export default App;

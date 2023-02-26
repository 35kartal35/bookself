import React,{useEffect} from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePages";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api";
import urls from "./api/urls";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import Error from "./pages/Error";
import EditBook from "./pages/EditBook";
import AddCategory from "./pages/AddCategory";

function App() {
  const dispatch=useDispatch()
  const {booksState, categoriesState}=useSelector(state=>state)

  useEffect(()=>{
    /*fetch books*/
    dispatch({type:actionTypes.bookaction.GET_BOOKS_START})
    api.get(urls.books)
    .then((res)=>{
      dispatch({type:actionTypes.bookaction.GET_BOOKS_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
      dispatch({type:actionTypes.bookaction.GET_BOOKS_FAİL,payload:"serverda bir hata oldu"})
    })

    /*fetch categories*/
    dispatch({type:actionTypes.categoryAction.GET_CATEGORIES_START})
    api.get(urls.categories)
    .then((res)=>{
      dispatch({type:actionTypes.categoryAction.GET_CATEGORIES_SUCCESS,payload:res.data}) 
       })
       .catch((err)=>{
        dispatch({type:actionTypes.categoryAction.GET_CATEGORIES_FAİL,payload:"serverda bir hata oldu"})
       });
  }, [dispatch]);
    if (booksState.success === false || categoriesState.success === false)
    return null;
    return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/add-book" element={<AddBook/>}/>
      <Route path="/book-detail/:bookId" element={<BookDetail/>} />
      <Route path="*" element={<Error/>} />
      <Route path="/edit-book/:bookId" element={<EditBook/>}/>
      <Route path="/add-category" element={<AddCategory/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

import React,{useEffect,useState} from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";


const BookDetail=()=>{
    const params=useParams()
    const[myBook,setMyBook]=useState(null)
    const[bookCategory,setBookCategory]=useState(null)
    useEffect(()=>{
        /* http:/localhoost:3000/books/2 */
        api.get(`${urls.books}/${params.bookId}`)
        .then(resBook=>{
            console.log(resBook.data)
            setMyBook(resBook.data)
            api
            .get(`${urls.categories}/${resBook.data.categoryId}`)
            .then((resCategory)=>{
                console.log(resCategory.data)
                setBookCategory(resCategory.data)
            })
            .catch((err)=>{});
        })
        .catch(err=>{});
        
    },[]) 
    if(myBook === null || bookCategory === null) return null;                                     
    return(
        <div>
            <Header/>
            <div className="container my-5">
            <h1>Kitap Adı: {myBook.name}</h1>
            <h1>Yazar Adı: {myBook.author}</h1>
            <h1>Fiyatı: {myBook.price}</h1>
            <h1>Yayınevi: {myBook.publisher}</h1>
            <h1>ISBN: {myBook.isbn}</h1>
            <h1>Kategori: {bookCategory.name}</h1>
            <Link to={"/"}>Geri</Link>
            </div>
        </div>
    );
    };

export default BookDetail;
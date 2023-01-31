import React from "react";
import { useState } from "react";
import "../assets/style/General.css"
import api from "../api/api";
import urls from "../api/urls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
const Listbooks=()=>{
    const dispatch = useDispatch();
    const {booksState} = useSelector(state=>state);
    const {categoriesState} = useSelector(state=>state)
    const [showDeleteModal,setShowdeleteModal]=useState(false)
    const [willDeleteBook,setWillDeleteBook]=useState("")
    
    console.log(booksState);

    const deleteBook=(id)=>{
        
          dispatch({type:actionTypes.bookaction.DELETE_BOOK_START})
        api.delete(`${urls.books}/${id}`)
            .then((res)=>{
                dispatch({
                    type: actionTypes.bookaction.DELETE_BOOK_SUCCESS,
                    payload: id,
                });
            })
            .catch((err)=>{
                dispatch({
                    type: actionTypes.bookaction.DELETE_BOOK_FAİL,
                    payload: "Kitap silerken hata oluştu",

                });
                });

        
              };
        
    return (
        <>
        <div className="d-flex justify-content-end">
          <Link to={"/add-book"} className="btn btn-primary">Kitap Ekle</Link>
        </div>
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Sıra No</th>
      <th scope="col">Adı</th>
      <th scope="col">Yazar</th>
      <th scope="col">Kategori</th>
      <th scope="col">İşlemler</th>
    </tr>
  </thead>
  <tbody>
    {booksState.books.map((book, index)=>{ 
        const myCategory = categoriesState.categories.find(
            (item)=>item.id === book.categoryId
        );
        return (
    <tr key={book.id}>
      <th scope="row">{index+1}</th>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.price} &#8378;</td>
      <td>{myCategory.name}</td>
      <td>
        <button onClick={()=> {
          setShowdeleteModal(true)
          setWillDeleteBook(book.id)
        }} className="generalBtn deleteBtn">sil</button>
        <button className="generalBtn editBtn">Güncelle</button>
        <Link to={`/book-detail/${book.id}`} className="generalBtn detailBtn">Detay</Link>
      </td>
    </tr>
  ) })}
  </tbody>
</table>
{
  showDeleteModal===true && (
    <CustomModal title="Silme" 
    message="Silmek İstediğinize Emin misiniz?"
    onCancel={()=>setShowdeleteModal(false)}
    onConfirm={()=>{
      deleteBook(willDeleteBook)
      setShowdeleteModal(false)
    }}
    />
    
  )}
</>
    );
    
};

export default Listbooks;
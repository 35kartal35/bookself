import React from "react";

import "../assets/style/General.css"
import api from "../api/api";
import urls from "../api/urls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Listbooks=()=>{
    const dispatch = useDispatch();
    const {booksState} = useSelector(state=>state);
    const {categoriesState} = useSelector(state=>state)
    console.log(booksState);

    const deleteBook=(id)=>{
        
        dispatch({type:actionTypes.bookaction.DELETE_BOOK_START})
        api
            .delete(`${urls.books}/${id}`)
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
        <table className="table table-striped my-5">
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
      <td>@mdo</td>
      <td>
        <button onClick={()=> deleteBook(book.id)} className="generalBtn deleteBtn">sil</button>
        <button className="generalBtn editBtn">Güncelle</button>
        <button className="generalBtn detailBtn">Detay</button>
      </td>
    </tr>
  ) })}
  </tbody>
</table>
    );
    
}

export default Listbooks
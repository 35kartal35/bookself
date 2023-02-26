import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch,useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditBook=()=>{
    const dispatch = useDispatch();
    const {booksState,categoriesState} = useSelector((state)=>state);
    const navigate = useNavigate();
    const params = useParams();
    const myBook = booksState.books.find((item)=> item.id === params.Id);
    
    //console.log(myBook)
    const [edite,setEdite] = useState(myBook);
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        /*validation*/
        if (edite.name === "" || edite.author === "" || edite.categoryId === "" ) {
            alert("kitap adı, yazarı ve kategori boş bırakılamaz");
            return;
        }
        if (edite.name.length<2){
            alert("kitap adı 2 karakterden az olamaz");
            return;
        }
        api.put(`${urls.books}/${params.bookId}`,edite)
        .then((res)=>{
            dispatch({type: actionTypes.bookaction.EDİT_BOOK,payload: edite});
            navigate("/");
        })
        .catch((err)=> {});
    };
    return(
        <div>
            <Header/>
            <div className="container my-5">
        <edite onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="edite-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="edite-control"
              id="name"
              placeholder="Yalnızız"
              value={edite.name}
              onChange={(event) =>
                setEdite({ ...edite, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="edite-label">
              Yazar
            </label>
            <input
              type="text"
              className="edite-control"
              id="author"
              placeholder="Peyami Safa"
              value={edite.author}
              onChange={(event) =>
                setEdite({ ...edite, author: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="edite-label">
              Yayın Evi
            </label>
            <input
              type="text"
              className="edite-control"
              id="publisher"
              placeholder="Ötüken"
              value={edite.publisher}
              onChange={(event) =>
                setEdite({ ...edite, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="edite-label">
              Fiyatı
            </label>
            <input
              type="number"
              className="edite-control"
              id="price"
              placeholder="69.70"
              value={edite.price}
              onChange={(event) =>
                setEdite({ ...edite, price: Number(event.target.value) })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="edite-label">
              ISBN
            </label>
            <input
              type="number"
              className="edite-control"
              id="isbn"
              placeholder="9789754370577"
              value={edite.isbn}
              onChange={(event) =>
                setEdite({ ...edite, isbn: event.target.value })
              }
            />
          </div>
          <select
            className="edite-select"
            defaultValue={categoriesState.categories[0].id}
            value={edite.categoryId}
            onChange={(event) =>
              setEdite({ ...edite, categoryId: event.target.value })
            }>
            {categoriesState.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Güncelle
            </button>
          </div>
        </edite>
      </div>
        </div>
    )
}

export default EditBook;
import React, { useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import urls from "../api/urls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";

const AddBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { categoriesState } = useSelector(state => state)
    const [myBook, setMyBook] = useState({
        id: String(new Date().getTime()),
        name: "",
        aother: "",
        publisher: "",
        isbn: "",
        price: "",
        categoryId: categoriesState.categories[0].id,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(myBook);
        /*validation*/
        if (myBook.name === "" || myBook.author === "" || myBook.categoryId === "") {
            alert("Kitap adı, yazarı ve Kategori boş bırakılamaz");
            return;
        }


        /* request*/

        api.post(urls.books, myBook)
            .then((res) => {
                dispatch({
                    type: actionTypes.bookaction.ADD_BOOK,
                    payload: myBook,
                });
                navigate("/")
            })
            .catch((err) => {});
    };
    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1"
                            className="form-label">Kitap Adı</label>
                        <input type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="İnce Mehmet"
                            value={myBook.name}
                            onChange={(event) => setMyBook({ ...myBook, name: event.target.value })} />

                        <label htmlFor="exampleFormControlInput1"
                            className="form-label">Yazar</label>
                        <input type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Necip Fazıl Kısakürek"
                            value={myBook.author}
                            onChange={(event) => setMyBook({ ...myBook, author: event.target.value })} />

                        <label htmlFor="exampleFormControlInput1"
                            className="form-label">Yayınevi</label>
                        <input type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="YKY"
                            value={myBook.publisher}
                            onChange={(event) => setMyBook({ ...myBook, publisher: event.target.value })} />

                        <label htmlFor="exampleFormControlInput1"
                            className="form-label">ISBN</label>
                        <input type="number"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="15887256655"
                            value={myBook.isbn}
                            onChange={(event) => setMyBook({ ...myBook, isbn: event.target.value })} />

                        <label htmlFor="exampleFormControlInput1"
                            className="form-label">Fiyatı</label>
                        <input type="number"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="150"
                            value={myBook.price}
                            onChange={(event) => setMyBook({ ...myBook, price: event.target.value })} />

                        <select className="form-select"
                            defaultValue={categoriesState.categories[0].id}
                            value={myBook.categoryId}
                            onChange={(event) =>
                                setMyBook({ ...myBook, categoryId: event.target.value })}>
                            {
                                categoriesState.categories.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <button className="btn btn-primary w-50" type="submit">
                            Kaydet
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBook;
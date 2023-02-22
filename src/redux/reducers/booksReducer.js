import actionTypes from "../actions/actionTypes";

const initialState = {
    pending: false,
    success: false,
    books: [],
    fail: false,
    error: ""
}

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.bookaction.GET_BOOKS_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.bookaction.GET_BOOKS_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                books: action.payload
            }
        case actionTypes.bookaction.GET_BOOKS_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionTypes.bookaction.DELETE_BOOK_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.bookaction.DELETE_BOOK_SUCCESS:
            let filteredbooks = state.books.filter(item => item.id !== action.payload)
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                books: filteredbooks
            }

        case actionTypes.bookaction.DELETE_BOOK_FAİL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }

        case actionTypes.bookaction.ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload]
            }

        case actionTypes.bookaction.EDİT_BOOK:
            var temp = [];
            for (let i = 0; i < state.books.length; i++) {
                if (state.books[i].id !== action.payload.id) {
                    temp.push(state.books[i]);
                } else {
                    temp.push(action.payload);
                }
            }
            return {
                ...state,
                books: temp,
            };
        default:
            return state
    }
}

export default booksReducer

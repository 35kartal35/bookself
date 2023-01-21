import actionTypes from "../actions/actionTypes";

const initialState={
    pending:false,
    success:false,
    books:[],
    fail:false,
    error:""
}

const booksReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.bookaction.GET_BOOKS_START:
            return{
                ...state,
                pending:true
            }
            case actionTypes.bookaction.GET_BOOKS_SUCCESS:
            return{
                ...state,
                pending:false,
                success:true,
                fail:false,
                books:action.payload
            }
        case actionTypes.bookaction.GET_BOOKS_FAIL:
            return{
                ...state,
                pending:false,
                success:false,
                fail:true,
                error:action.payload
            }
            case actionTypes.bookaction.DELETE_BOOK_START:
                return{
                    ...state,
                    pending:true
                }
                case actionTypes.bookaction.DELETE_BOOK_SUCCESS:
                    let filteredbooks=state.books.filter(item=>item.id !== action.payload)
        default:
            return state
    }
}

export default booksReducer

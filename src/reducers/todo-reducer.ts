import { put, takeEvery, all } from 'redux-saga/effects'

export type Todo = {id:number, desc:string, priority:number, isDone: boolean};
export type TodoState = {todos: Todo[]};

export type TodoAction = AddTodoAction | DeleteTodoAction | PopulateTodos | RetrieveTodos | TodoSubmit | TodoDelete

export type AddTodoAction = {type:"ADD_TODO", payload:Todo};
export type DeleteTodoAction = {type:"DELETE_TODO", payload: number};
export type PopulateTodos = {type:"POPULATE_TODOS",payload: Todo[]};


export const initialState: TodoState = {todos:[]};

export function todoReducer(state: TodoState = initialState, action: TodoAction): TodoState{
    const deepCopy: TodoState = JSON.parse(JSON.stringify(state));

   switch(action.type){
    case "ADD_TODO":
        deepCopy.todos.push(action.payload);
        return deepCopy;

    case "DELETE_TODO":
        deepCopy.todos = deepCopy.todos.filter(t => t.id !== action.payload)
        return deepCopy;
    
    case "POPULATE_TODOS":
        deepCopy.todos = action.payload
        return deepCopy
        
    default:
        return deepCopy;
   }

}

// thunks
export function addTodoThunk(todo: Todo){
    console.log("here")

    return async function(dispatch: (action:TodoAction) => void, state: TodoState){
        const response = await fetch("http://localhost:8000/todos",
            {
            method:"POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(todo)
        })
        await response.json()
        dispatch({type:"ADD_TODO", payload: todo})
    }

}

export function deleteTodoThunk(id: number){

    return async function(dispatch: (action:TodoAction) => void, state: TodoState){
        const response = await fetch(`http://localhost:8000/todos/${id}`, {method:"DELETE"})
        await response.json()
        dispatch({type:"DELETE_TODO", payload:id})
    }

}

export function retrieveTodoThunk(){

    return async function(dispatch: (action:TodoAction) => void, state: TodoState){
        const response = await fetch(`http://localhost:8000/todos`)
        const todos:Todo[] =  await response.json()
        dispatch({type:"POPULATE_TODOS", payload:todos})
    }

}

// Sagas
// saga action types 
// SAGA ACTIONS MUST BE NAMED DIFFERENT FROM ACTIONS IN THE REDUCER. INFINITE LOOP OTHERWISE !!!!!
export type RetrieveTodos = {type:"RETRIEVE_TODOS_REQUEST"};
export type TodoSubmit = {type:"TODO_SUBMIT_REQUEST", payload:Todo};
export type TodoDelete = {type:"TODO_DELETE_REQUEST", payload:number};

// worker sagas
function* getTodos():any {
    const response = yield fetch(`http://localhost:8000/todos`);
    const todos:Todo[] = yield response.json()
    yield put({type:"POPULATE_TODOS", payload:todos})
}

function* addTodo(action: TodoSubmit): any{
    const response = yield fetch("http://localhost:8000/todos",{
        method:"POST", 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(action.payload)
    });
    yield response.json();
    yield put({type:"ADD_TODO", payload: action.payload});

}

function* deleteTodo(action: TodoDelete):any{
    const response = yield fetch(`http://localhost:8000/todos/${action.payload}`, {method:"DELETE"})
    yield response.json()
    yield put({type:"DELETE_TODO", payload:action.payload});
}

//watcher sagas
function* watchRetrieve():any{
    yield takeEvery("RETRIEVE_TODOS_REQUEST", getTodos)
}

function* watchAddTodo():any{
    yield takeEvery("TODO_SUBMIT_REQUEST", addTodo);
}

function* watchDeleteTodo():any {
    yield takeEvery("TODO_DELETE_REQUEST", deleteTodo)
}


//root saga
export function* rootSaga(){
    yield all([
        watchRetrieve(),
        watchAddTodo(),
        watchDeleteTodo()
    ])
}
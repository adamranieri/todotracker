import { useEffect, useReducer, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addTodoThunk, deleteTodoThunk, initialState, retrieveTodoThunk, TodoAction, todoReducer, TodoState } from "../reducers/todo-reducer"


export default function TodoPageSaga(){

    const state = useSelector((s:TodoState) => s);
    const dispatch = useDispatch()<TodoAction>;
    
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState(0)


    useEffect(()=>{
        dispatch({type:"RETRIEVE_TODOS_REQUEST"})
    },[dispatch]);


    return <>
        <h1>Todos</h1>

        <input type="text" placeholder="description" onChange={e=>setDesc(e.target.value)}/>
        <input type="number" onChange={e=>setPriority(Number(e.target.value))} />
        <button onClick={()=>dispatch({type:"TODO_SUBMIT_REQUEST", payload:{id:Math.random(), desc, priority, isDone:false}})}>Add Todo</button>

        <ul>
            {state.todos.map(t => <li key={t.id}> {t.desc} <button onClick={()=>dispatch({type:"TODO_DELETE_REQUEST", payload:t.id})}>Remove</button></li>)}
        </ul>
        
    
    </>

}
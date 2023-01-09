import { useEffect, useReducer, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addTodoThunk, deleteTodoThunk, initialState, retrieveTodoThunk, TodoAction, todoReducer, TodoState } from "../reducers/todo-reducer"


export default function TodoPage(){

    const state = useSelector((s:TodoState) => s);
    const dispatch = useDispatch()<TodoAction | any>;
    
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState(0)

    useEffect(()=>{
        dispatch(retrieveTodoThunk())
    },[dispatch])

    return <>
        <h1>Todos</h1>

        <input type="text" placeholder="description" onChange={e=>setDesc(e.target.value)}/>
        <input type="number" onChange={e=>setPriority(Number(e.target.value))} />
        <button onClick={()=>dispatch(addTodoThunk({id:Math.random(), desc, priority, isDone:false}))}>Add Todo</button>

        <ul>
            {state.todos.map(t => <li key={t.id}> {t.desc} <button onClick={()=>dispatch(deleteTodoThunk(t.id))}>Remove</button></li>)}
        </ul>
        
    
    
    
    </>

}
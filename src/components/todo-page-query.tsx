import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query"
import {deleteTodo, postTodo, retrieveTodos} from "../api/api";
import { Todo } from "../reducers/todo-reducer";


export default function TodoPageQuery(){

    const queryClient = useQueryClient();
    const { isLoading, isError, data:todos = []} = useQuery('todos', retrieveTodos);

    const addTodoMutation = useMutation(postTodo, {
        onSuccess: ()=> queryClient.invalidateQueries("todos")
        });
    const deleteTodoMutation = useMutation(deleteTodo,{
        onSuccess:() => queryClient.invalidateQueries("todos")
    })

    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState(0)

    if (isLoading){
        return <h1>LOADING</h1>
    }

    if (isError){
        return <h1>ERROR</h1>
    }



    return <>
    <h1>Todo Page Query</h1>

            <h1>Todos</h1>

        <input type="text" placeholder="description" onChange={e=>setDesc(e.target.value)}/>
        <input type="number" onChange={e=>setPriority(Number(e.target.value))} />
        <button onClick={()=>addTodoMutation.mutate({id:Math.random(),desc, priority, isDone:false})} >Add Todo</button>

        {addTodoMutation.isLoading && <h3>Todo Sent</h3>}
        {addTodoMutation.isSuccess && <h3>New todo added successfully</h3>}

        <ul>
            {todos.map(t => <li key={t.id}> {t.desc} <button onClick={()=>deleteTodoMutation.mutate(t.id)}>Remove</button></li>)}
        </ul>

    
    
    </>
}
import { Todo } from "../reducers/todo-reducer";


export async function retrieveTodos():Promise<Todo[]>{
    const response = await fetch(`http://localhost:8000/todos`)
    const todos:Todo[] =  await response.json()
    return todos;
}

export async function postTodo(todo:Todo):Promise<void>{
    const response = await fetch("http://localhost:8000/todos",{
        method:"POST", 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(todo)
    })
    await response.json()
}

export async function deleteTodo(id:number):Promise<void> {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {method:"DELETE"})
    await response.json()
}
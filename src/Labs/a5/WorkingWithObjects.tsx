import React, {useEffect, useState} from "react";
import axios from "axios";


function WorkingWithObjects() {

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);


    const [todos, setTodos] = useState<{ id: number; title: string, completed: boolean, description: string, due: string }[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);


    const removeTodo = async (todo : { id: number; title: string, completed: boolean, description: string, due: string }) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };


    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };


    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };



    const updateTitle2 = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };


    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };


    const [errorMessage, setErrorMessage] = useState(null);


    const deleteTodo = async (todo : { id: number; title: string, completed: boolean, description: string, due: string }) => {
        try {
            const response = await axios.delete(
                `${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error) {
            console.log(error);
            // @ts-ignore
            setErrorMessage(error.response.data.message);
        }

    };


    const updateTodo = async () => {

        try {
            const response = await axios.put(
                `${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (
                t.id === todo.id ? todo : t)));
        } catch (error) {
            console.log(error);
            // @ts-ignore
            setErrorMessage(error.response.data.message);
        }

    };





    return (
        <div>

            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                </div>
            )}


            <h3>Working with Arrays</h3>
            {/*<button onClick={createTodo} >*/}
            {/*    Create Todo*/}
            {/*</button>*/}
            {/*<button onClick={updateTitle2} >*/}
            {/*    Update Title*/}
            {/*</button>*/}


            <input value={todo.id}
                   onChange={(e) => setTodo({
                       ...todo,
                       id: Number(e.target.value)
                   })}/>
            <input type="text" value={todo.title}
                   onChange={(e) => setTodo({
                       ...todo, title: e.target.value
                   })}/>
            <textarea value={todo.description}
                      onChange={(e) => setTodo({ ...todo,
                          description: e.target.value })} />
            <input value={todo.due} type="date"
                   onChange={(e) => setTodo({
                       ...todo, due: e.target.value })} />
            <label>
                <input checked={todo.completed} type="checkbox"
                       onChange={(e) => setTodo({
                           ...todo, completed: e.target.checked })} />
                Completed
            </label>
            <button onClick={postTodo}> Post Todo </button>
            <button onClick={updateTodo}>
                Update Todo
            </button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item">
                        <input checked={todo.completed}
                               type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>
                        <button onClick={() => fetchTodoById(todo.id)}
                                className="btn btn-info float-end ms-2">
                            Edit
                        </button>
                        {/*<button onClick={() => removeTodo(todo)} >*/}
                        {/*    Remove*/}
                        {/*</button>*/}
                        <button onClick={() => deleteTodo(todo)}
                                className="btn btn-danger float-end ms-2">
                            Delete
                        </button>
                        {todo.title}
                    </li>
                ))}
            </ul>


            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>


            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`}>
                Create Todo
            </a>


            <h4>Retrieving Arrays</h4>
            <a href={API}>
                Get Todos
            </a>

            <h4>Retrieving an Item from an Array by ID</h4>
            <input value={todo.id}
                   onChange={(e) => setTodo({
                       ...todo,
                       id: Number(e.target.value)
                   })}/>
            <a href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>

            <input type="text" value={todo.title}
                   onChange={(e) => setTodo({
                       ...todo, title: e.target.value
                   })}/>
            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`}>
                Update Title to {todo.title}
            </a>


            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`}>
                Get Completed Todos
            </a>


            <h3>Working With Objects</h3>


            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                   value={assignment.title} type="text"/>
            <button onClick={updateTitle}>
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment}>
                Fetch Assignment
            </button>


            <h4>Modifying Properties</h4>
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                   onChange={(e) => setAssignment({
                       ...assignment,
                       title: e.target.value
                   })}
                   value={assignment.title}/>


            <h4>Retrieving Objects</h4>
            <a href="http://localhost:4000/a5/assignment">
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a>
        </div>
    );
}

export default WorkingWithObjects;
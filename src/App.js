import './App.css';
import { db } from './firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { useState, useEffect } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState('');

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  }

  // read,
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data != null) {
        Object.values(Object.values(data)[0]).forEach((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, [])

  // write, 
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, ` /${uuid}`), {
      todo,
      uuid
    });

    setTodo('');
  }
  // update, 
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  }

  const handleSubmitChange = () => {
    update(ref(db, ` /${tempUuid}`), {
      todo,
      uuid: tempUuid,
    });

    setTodo('');
    setIsEdit(false);
  }

  // delete
  const handleDelete = (todo) => {
    console.log(todo)
    remove(ref(db, ` /${todo.uuid}`));
  }

  console.log(todos.length)
  return (
    <div className="app gradient">
      <main className="">
        <input type="text" value={todo} onChange={handleTodoChange} placeholder="Add some info" />
        {
          isEdit ? (
            <>
              <button onClick={handleSubmitChange}>submit change</button>
              <button onClick={() => {
                setIsEdit(false);
                setTodo('');
              }}>
                X
              </button>
            </>
          ) : (
            <button onClick={writeToDatabase}>submit</button>
          )
        }
        {
          todos.length !== 0 ?
            todos.map((todo) => (
              <div key={todo.uuid}>
                <h1>{todo.todo}</h1>
                <button onClick={() => handleUpdate(todo)}>update</button>
                <button onClick={() => handleDelete(todo)}>delete</button>
              </div>
            )) :
            <h1>This list is empty now. Please, add some info for this list.</h1>
        }
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

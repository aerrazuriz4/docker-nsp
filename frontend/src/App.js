import { useEffect, useState } from 'react';
import logo from './logo.svg';
import api from './api';
import { setPosts } from './store';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';

function App() {
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/posts').then((response) => {
      dispatch(setPosts(response.data));
    });
  }, []);


  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Descripción
            </th>
            <th>
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.value.map((post) => (
            <tr key={posts.id}>
              <td>
                {post.name}
              </td>
              <td>
                {post.description}
              </td>
              <td>
                Eliminar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

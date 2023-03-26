import { useEffect, useState } from 'react';
import api from './api';
import { setPosts } from './store';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';

function App() {
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [apliedFilter, setApliedFilter] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    api.get('/posts').then((response) => {
      dispatch(setPosts(response.data));
    });
  }, []);


  return (
    <div className="App">
      <div className="title">
        <img src="tcit_logo.png"/>
        <h1>
          Posts CRUD App
        </h1>
      </div>
      <div className="filter">
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Filtro de Nombre"
        />
        <button
          onClick={() => {
            setApliedFilter(searchText);
          }}
        >
          Filtrar
        </button>
      </div>
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
          {posts.value.filter((post) => apliedFilter.length === 0 || post.name === apliedFilter).map((post, idx) => (
            <tr key={post.id}>
              <td>
                {post.name}
              </td>
              <td>
                {post.description}
              </td>
              <td>
                <div
                  className="delete-button"
                  onClick={() => {
                    api.request({
                      method: 'delete',
                      url: `/posts/${post.id}`,
                    }).then(() => {
                      const newPosts = [
                        ...posts.value.slice(0, idx),
                        ...posts.value.slice(idx + 1),
                      ];
                      dispatch(setPosts(newPosts));
                    });
                  }}
                >
                  Eliminar
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="new-post">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
        <button
          onClick={(e) => {
            if (name.length > 0 && description.length > 0) {
              api.request({
                url: '/posts',
                method: 'post',
                data: {
                  name,
                  description,
                },
              }).then((response) => {
                console.log(response);
                const newPosts = [...posts.value]
                newPosts.push(response.data);
                dispatch(setPosts(newPosts));
              });
            }
          }}
        >
          Crear
        </button>
      </div>
    </div>
  );
}

export default App;

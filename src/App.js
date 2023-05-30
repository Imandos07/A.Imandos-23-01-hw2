import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    userId: 1,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/posts/add', newPost);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleInputChange = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Создание поста</h1>
      <form>
        <label>
          Заголовок:
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={createPost}>Создать пост</button>
      </form>

      <h1>Список постов</h1>
      <ul>
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;


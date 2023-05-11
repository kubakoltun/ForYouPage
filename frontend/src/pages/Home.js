import { React, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext.js'

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        navigate(`/login`);
      } else {
        axios.get("http://127.0.0.1:8000/posts",{
          headers: {accessToken: localStorage.getItem("accessToken")}
        })
        .then((response) => {
            setListOfPosts(response.data.listOfPosts);
            setLikedPosts(response.data.likedPosts.map((like) => {
              return like.postId;
            }));
        });
      }
    }, []);

    const likePost = (postId) => {
        axios.post(
          'http://127.0.0.1:8000/likes', 
          {postId: postId}, 
          {headers: {accessToken: localStorage.getItem("accessToken")}}
        )
          .then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
              if (post.id === postId) {
                if (response.data.liked) {
                    return {...post, likes: [...post.likes, 0]};
                } else {
                  const likesArray = post.likes;
                  likesArray.pop();
                  return {...post, likes: likesArray};
                }
              } else {
                return post;
              } 
            })
            );

            if (likedPosts.includes(postId)) {
              setLikedPosts(likedPosts.filter((id) => {
                return id !== postId;
              }))
            } else {
              setLikedPosts([...likedPosts, postId]);
            }
          });
    }

    return (
      <div className="App">
        {listOfPosts.map((value, key) => {
          return (
          <div 
            key={key}
            className="post"
          > 
            <div className="title">{value.title}</div>
            <div 
              className="body" 
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className='username'>
                <Link to={`/profile/${value.userId}`}> 
                  {value.userName}
                </Link>
              </div>
              <div className='buttons'>
                <ThumbUpAltIcon
                  className={likedPosts.includes(value.id) ? 
                    "unlikePostBttn" : "likeBttn"
                  }
                  onClick={() => {
                    likePost(value.id)
                  }}
                />
                <label> {value.likes.length} </label>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    );
}

export default Home;
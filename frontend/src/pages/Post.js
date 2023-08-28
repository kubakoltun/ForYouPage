import { React, useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext.js'

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/posts/byId/${id}`)
        .then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://127.0.0.1:8000/comments/${id}`)
        .then((response) => {
            setComments(response.data);
        });
    }, []);

    const addComment = () => {
        axios.post(`http://127.0.0.1:8000/comments`, 
            {
                commentBody: newComment, 
                postId: id,
            }, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const commentToAdd = {commentBody: newComment, username: response.data.username}
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deleteComment = (id) => {
        axios.delete(`http://127.0.0.1:8000/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        })
            .then(() => {
                setComments(comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios.delete(`http://127.0.0.1:8000/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        })
            .then((response) => {
                navigate('/');
            });
    };

    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter new title:");
            axios.put(`http://127.0.0.1:8000/posts/title`, 
                {
                    newTitle: newTitle, 
                    id: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    },
                }
            );
            setPostObject({...postObject, title: newTitle});
        } else {
            let newPostText = prompt("Enter new text:");
            axios.put(`http://127.0.0.1:8000/posts/postText`, 
                {
                    newPostText: newPostText, 
                    id: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    },
                }
            );
            setPostObject({...postObject, postText: newPostText});
        }
    }
    

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div 
                        className="title" 
                        onClick={() => {
                            if (authState.username === postObject.userName) {
                                editPost("title")
                            }
                        }}
                    >
                        {postObject.title}
                        {authState.username === postObject.userName && 
                            <button onClick={() => {deletePost(postObject.id)}}>Delete post</button>
                        }
                    </div>
                    <div 
                        className="body"
                        onClick={() => {
                            if (authState.username === postObject.userName) {
                                editPost("body")
                            }
                        }}
                    >
                        {postObject.postText}
                    </div>
                    <div className="footer">
                        <div className='username'>
                            <Link to={`/profile/${postObject.userId}`}> 
                                {postObject.userName}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className='addCommentContainer'>
                    <input 
                        type="text" 
                        placeholder="Comment..."
                        value={newComment} 
                        onChange={(event) => {
                            setNewComment(event.target.value)
                        }} 
                    />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                {comment.commentBody}
                                <label> Username: {comment.username}</label>
                                {authState.username === comment.username && 
                                    <button 
                                        onClick={() => {deleteComment(comment.id)}}
                                    > 
                                        X 
                                    </button>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;

import { React, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext.js'

function Profile() {
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/auth/basicinfo/${id}`)
            .then((response) => {
                setUsername(response.data.username);
            });

        axios.get(`http://127.0.0.1:8000/posts/byuserId/${id}`)
            .then((response) => {
                setListOfPosts(response.data);
            });
    }, []);

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                
                {authState.username === username ? (
                        <>
                        <h1>Your posts {username}</h1>
                        <button 
                            onClick={() => {
                                navigate(`/change-password`);
                            }}
                        > 
                            Change my password 
                        </button>
                        </>
                    ) : (
                        <h1>{username}'s posts</h1>
                    )
                }
            </div>
            <div className='listOfPosts'>
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
                                    {value.userName}
                                </div>  
                                <div className='buttons'>
                                    <ThumbUpAltIcon
                                        className="unlikeBttn"
                                    />
                                    <label> {value.likes.length} </label>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;

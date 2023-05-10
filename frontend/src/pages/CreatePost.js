import { React, useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext.js'

function CreatePost() {
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login');
        }
    }, []);

    const validationSchema =  Yup.object().shape({
        title: Yup.string().required("Title must be entered"),
        postText: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://127.0.0.1:8000/posts", 
            data,
            {headers: {
                accessToken: localStorage.getItem("accessToken")
            },}
        )
        .then((response) => {
            navigate('/');
        });
    };

    return (
        <div className='createPostPage'>
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field 
                        autoComplete="off"
                        id="inputCreatePost" 
                        name="title" 
                        placeholder="Dragon title..." 
                    />
            
                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field 
                        autoComplete="off"
                        id="inputCreatePost" 
                        name="postText" 
                        placeholder="Dr. Dragon" 
                    />

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;

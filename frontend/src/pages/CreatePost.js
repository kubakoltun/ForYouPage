import { React } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CreatePost() {
    const initialValues = {
        title: "",
        postText: "",
        userName: "",
    };

    const validationSchema =  Yup.object().shape({
        title: Yup.string().required("Title must be entered"),
        postText: Yup.string().required(),
        userName: Yup.string().min(3).max(15).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://127.0.0.1:8000/posts", data)
        .then((response) => {
            console.log(`positive submition`);
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
                
                    <label>Username: </label>
                    <ErrorMessage name="userName" component="span" />
                    <Field 
                        id="inputCreatePost" 
                        name="userName" 
                        placeholder="DragonExpert7" 
                    />

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;

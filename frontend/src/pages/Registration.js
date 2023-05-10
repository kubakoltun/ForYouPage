import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema =  Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post('http://127.0.0.1:8000/auth', data)
            .then(() => {
                navigate(`/`);
                console.log(data);
            });
    };

    return (
        <div>
           <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field 
                        id="inputCreatePost" 
                        name="username" 
                        placeholder="Your Username..." 
                        autoComplete="off"
                    />
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field 
                        id="inputCreatePost" 
                        type="password"
                        name="password" 
                        placeholder="Your Password..." 
                        autoComplete="off"
                    />

                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
import axios from 'axios';
import { Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <div className='login-card'>
            <h1>¡Bienvenido!</h1>

            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = '* Requerido';
                    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)) {
                        errors.email = '* Email inválido';
                    }

                    if (!values.password) {
                        errors.password = '* Requerido'
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

                    const formData = new URLSearchParams();
                    formData.append('email', values.email);
                    formData.append('password', values.password);

                    console.log({
                        email: values.email,
                        password: values.password
                    });

                    axios.post('https://todo-api-310b.onrender.com/auth/signin', formData)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form className='login-form' onSubmit={handleSubmit}>
                        <p>Correo electrónico</p>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <p className='error'>{errors.email && touched.email && errors.email}</p>
                        <p>Contraseña</p>
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <p className='error'>{errors.password && touched.password && errors.password}</p>

                        <p><i>¿Aún no estás <Link to="/register" id='to-register'>registrado</Link>?</i></p>
                        <button type="submit" disabled={isSubmitting} className='submit-button' onClick={handleSubmit}>
                            Iniciar sesión
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

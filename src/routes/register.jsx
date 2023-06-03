import { Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom';


export const Register = () => {
    return (
        <div>
            <div className='login-card'>
                <h1>¡Bienvenido!</h1>

                <Formik
                    initialValues={{ email: '', username: '', password: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Requerido';
                        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
                            errors.email = 'Correo Inválido';
                        }

                        if (!values.username) {
                            errors.username = 'Requerido';
                        } else if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(values.username)) {
                            errors.username = 'Usuario inválido';
                        }

                        if (!values.password) {
                            errors.password = 'Requerido'
                        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
                            errors.password = 'Al menos 8 carácteres, una letra y un número.'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
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
                        <form>
                            <p>Correo electrónico</p>
                            <input
                                type='email'
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <p className='error'>{errors.email && touched.email && errors.email}</p>
                            <p>Nombre de usuario</p>
                            <input
                                type='text'
                                name='username'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            <p className='error'>{errors.username && touched.username && errors.username}</p>
                            <p>Contraseña</p>
                            <input
                                type='password'
                                name='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <p className='error'>{errors.password && touched.password && errors.password}</p>

                            <p>Si ya estás registrado <Link to="..">inicia sesión.</Link></p>
                            <button type="submit" disabled={isSubmitting}>
                                Registrarse
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

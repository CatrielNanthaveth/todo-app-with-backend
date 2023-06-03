import { Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <div>
            <div className='login-card'>
                <h1>¡Bienvenido!</h1>

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Requerido';
                        } else if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(values.username)) {
                            errors.username = 'Usuario inválido';
                        }

                        if (!values.password) {
                            errors.password = 'Requerido'
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

                            <p>¿Aún no estás <Link to="/register">registrado</Link>?</p>
                            <button type="submit" disabled={isSubmitting}>
                                Iniciar sesión
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

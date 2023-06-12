import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { Formik } from 'formik';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Create = () => {

  const { id } = jwtDecode(localStorage.getItem('token'));

  return (
    <div className='container'>

      <Link to='/todo' className='btn'>Volver</Link>
      <h1>Crea una tarea</h1>

      <Formik
        initialValues={{ title: '', description:'' }}
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = '* Requerido';
          }

          if (!values.description) {
            errors.description = '* Requerido';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {

          const formData = new URLSearchParams();
          formData.append('title', values.title);
          formData.append('description', values.description);
          formData.append('user_id', id);

          console.log({
            title: values.title,
            description: values.description,
            user_id: id
          });

          axios.post(`https://todo-api-310b.onrender.com/tasks`, formData)
            .then((res) => {
              Swal.fire({
                title: `¡Agregada!`,
                text: 'Tarea agregada.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '¡Gracias!',
                timer: 2000,
                timerProgressBar: true
              });
            })
            .catch((err) => {
              Swal.fire({
                title: 'Error',
                text: 'Tarea no agregada.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '¡:(!',
                timer: 2000,
                timerProgressBar: true
              });
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
            <p>Título</p>
            <input
              type='text'
              name='title'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <p className='error'>{errors.title && touched.title && errors.title}</p>
            <p>Descripción</p>
            <TextArea
              type='text'
              name='description'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <p className='error'>{errors.description && touched.description && errors.description}</p>
            <button type="submit" disabled={isSubmitting} className='submit-button' onClick={handleSubmit}>
              Agregar
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

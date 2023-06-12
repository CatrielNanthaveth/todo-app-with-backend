import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Edit = () => {

  const { id } = useParams();

  return (
    <div className='container'>

      <Link to='/todo' className='btn'>Volver</Link>
      <h1>Edita tu tarea</h1>

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
          formData.append('completed', false);

          console.log({
            title: values.title,
            description: values.description,
            completed: false
          });

          axios.put(`https://todo-api-310b.onrender.com/tasks/${id}`, formData)
            .then((res) => {
              Swal.fire({
                title: `¡Actualizada!`,
                text: 'Tarea actualizada.',
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
                text: 'Tarea no actualizada.',
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
              Actualizar
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

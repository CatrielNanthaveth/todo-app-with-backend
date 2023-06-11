import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card, Space, Table } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

export const Todo = () => {

  const [tasks, setTasks] = useState([]);

  const user = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    axios.get(`https://todo-api-310b.onrender.com/tasks/user/${user.id}`)
      .then(res => {
        const data = res.data.map(task =>
          task = {
            key: task.id,
            title: task.title,
            description: task.description,
            completed: task.completed
          }
        )
        setTasks(data)
      })
      .catch((err) => {
        Swal.fire({
          title: 'Hubo un error',
          text: 'No se han podido recuperar los datos',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '¡:(!',
          timer: 2000,
          timerProgressBar: true
        })
        console.error(err);
      })
  }, [user.id, tasks]);

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      render: (text) => {
        return (
          <p>{text}</p>
        );
      }
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditOutlined onClick={() => handleEdit(record)} style={{ color: '#77B5FE' }} />
            <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }} />
          </Space>
        )
      },
    },
    {
      title: 'Completado',
      dataIndex: 'completed',
      key: 'completed',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={record.completed}
          onChange={e => handleCheck(e.target.checked, record)}
        />
      ),
    },
  ];

  const deleteTask = async (id) => {
    try {
      axios.delete(`https://todo-api-310b.onrender.com/tasks/${id}`);
      setTasks(tasks.filter(item => item.key !== id))
    } catch (e) {
      Swal.fire({
        title: "¡Error!",
        text: "La tarea no ha podido ser eliminada",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '¡:(!',
        timer: 2000,
        timerProgressBar: true
      });
    };
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "¡Eliminar!",
      text: "¿Estás seguro de querer eliminar la novedad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(record.key);
      }
    })
  };

  const handleEdit = (record) => {
    //navigate('/backoffice/edit-news/' + record.key);
  }

  const handleCheck = (checked, record) => {
    const updatedTasks = tasks.map(task =>
      task.id === record.key ? { ...task, completed: checked } : task
    );
    setTasks(updatedTasks);

    console.log(record)
    const formData = new URLSearchParams();
    formData.append('title', record.title);
    formData.append('description', record.description);
    formData.append('completed', !record.completed);


    axios.put(`https://todo-api-310b.onrender.com/tasks/${record.key}`, formData)
      .then((res) => {
        Swal.fire({
          title: `¡Estado cambiado!`,
          text: 'Has completado una tarea',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '¡:)!',
          timer: 2000,
          timerProgressBar: true
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "¡Error!",
          text: "Algo ha salido mal",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '¡:(!',
          timer: 2000,
          timerProgressBar: true
        });
      })
  };

  return (
    <div>

        <Table dataSource={tasks} columns={columns} id='tasks-table'/>;

    </div>
  )
}

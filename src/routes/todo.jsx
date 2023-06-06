import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

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
            description: task.description
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
  }, [user.id]);

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
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
  return (
    <div>
      <Table dataSource={tasks} columns={columns} />;
    </div>
  )
}

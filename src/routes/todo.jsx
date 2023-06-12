import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Space, Table } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';

export const Todo = () => {

  const navigate = useNavigate();

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
      fixed: 'left',
      width: '80px',
      render: (text) => {
        return (
          <p>{text}</p>
        );
      }
    },
    {
      title: <InfoCircleOutlined />,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <WarningOutlined />,
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width: '60px',
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
      title: <CheckCircleOutlined />,
      dataIndex: 'completed',
      key: 'completed',
      fixed: 'right',
      width: '40px',
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
    navigate('/edit-task/' + record.key);
  };

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
    <div className='container'>
      <h1 className='tasks-text'>Tareas</h1>
      <Link className='btn' to='../' onClick={() => localStorage.removeItem('token')}>Cerrar sesión</Link>
      <Table scroll={{x: 600,}} dataSource={tasks} columns={columns} id='tasks-table' size='small' />
      <Link to='/create' className='btn'>Agregar Tarea</Link>
    </div>
  )
}

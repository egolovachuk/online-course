import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div>
      <h1>Личный кабинет</h1>
      <h2>Мои курсы:</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> - Прогресс: {course.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
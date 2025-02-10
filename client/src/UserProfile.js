import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:5000/progress/1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Личный кабинет</h2>
      <h3>Мои курсы:</h3>
      {Object.keys(courses).length === 0 ? (
        <p>Нет активных курсов</p>
      ) : (
        <ul>
          {Object.entries(courses).map(([course, status]) => (
            <li key={course}>
              {course}: {status ? 'Завершен' : 'В процессе'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default UserProfile;
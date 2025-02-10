import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Добро пожаловать на платформу онлайн-курсов!</h1>
      <p>Здесь вы можете изучать новые навыки и развиваться.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default HomePage;
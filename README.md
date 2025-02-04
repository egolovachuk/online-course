# online-course

Для размещения вашего проекта на сервере, вам нужно выполнить несколько шагов. Мы будем использовать **Linux-сервер** (например, Ubuntu) с установленным **Node.js**, **MongoDB** и **Nginx** для проксирования запросов. Также предполагается, что у вас есть доменное имя.

---

### 1. Подготовка сервера

#### 1.1. Подключение к серверу
Подключитесь к вашему серверу через SSH:

```bash
ssh username@your_server_ip
```

Замените `username` на ваше имя пользователя и `your_server_ip` на IP-адрес вашего сервера.

---

#### 1.2. Обновление системы
Обновите пакеты на сервере:

```bash
sudo apt update && sudo apt upgrade -y
```

---

#### 1.3. Установка Node.js
Установите Node.js и npm:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Проверьте установку:

```bash
node -v
npm -v
```

---

#### 1.4. Установка MongoDB
Добавьте репозиторий MongoDB и установите его:

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
```

Запустите MongoDB:

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

Проверьте статус:

```bash
sudo systemctl status mongod
```

---

#### 1.5. Установка Nginx
Установите Nginx:

```bash
sudo apt install nginx -y
```

Запустите и включите Nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

### 2. Размещение проекта

#### 2.1. Клонирование репозитория
Если ваш проект находится в Git-репозитории, клонируйте его:

```bash
git clone https://github.com/your-repo-url.git
cd your-repo-folder
```

Если нет, загрузите файлы на сервер через FTP или SCP.

---

#### 2.2. Установка зависимостей
Установите зависимости Node.js:

```bash
npm install
```

---

#### 2.3. Настройка переменных окружения
Создайте файл `.env` в корне проекта и добавьте необходимые переменные:

```env
MONGO_URI=mongodb://localhost:27017/online_course
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
PORT=5000
```

---

#### 2.4. Запуск приложения
Запустите приложение в режиме разработки:

```bash
node server.js
```

Для продакшена используйте **PM2** (менеджер процессов):

```bash
sudo npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

---

### 3. Настройка Nginx

#### 3.1. Создание конфигурации Nginx
Создайте конфигурационный файл для вашего приложения:

```bash
sudo nano /etc/nginx/sites-available/online-course
```

Добавьте следующее содержимое:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /static/ {
        root /path/to/your/frontend/files;
    }
}
```

Замените `your-domain.com` на ваш домен и `/path/to/your/frontend/files` на путь к вашим статическим файлам (HTML, CSS, JS).

---

#### 3.2. Активация конфигурации
Создайте символическую ссылку:

```bash
sudo ln -s /etc/nginx/sites-available/online-course /etc/nginx/sites-enabled/
```

Проверьте конфигурацию:

```bash
sudo nginx -t
```

Перезапустите Nginx:

```bash
sudo systemctl restart nginx
```

---

### 4. Настройка домена и SSL

#### 4.1. Добавление домена
Настройте DNS-записи для вашего домена, указав IP-адрес вашего сервера.

---

#### 4.2. Установка SSL-сертификата
Используйте **Certbot** для получения бесплатного SSL-сертификата от Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Следуйте инструкциям Certbot. После завершения перезапустите Nginx:

```bash
sudo systemctl restart nginx
```

---

### 5. Проверка работы

Откройте браузер и перейдите по адресу `https://your-domain.com`. Ваш сайт должен быть доступен.

---

### 6. Дополнительные рекомендации

- **Бэкапы**: Настройте регулярные бэкапы базы данных.
- **Мониторинг**: Используйте инструменты, такие как **New Relic** или **Datadog**, для мониторинга производительности.
- **Безопасность**: Настройте брандмауэр (`ufw`) и защитите сервер от несанкционированного доступа.

---

Теперь ваш проект размещен на сервере и готов к использованию!

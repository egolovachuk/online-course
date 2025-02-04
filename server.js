const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('your_stripe_secret_key'); // Замените на ваш секретный ключ Stripe

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Маршрут для получения информации о курсе
app.get('/api/course', (req, res) => {
    const course = {
        title: 'Онлайн курс по программированию',
        description: 'Изучите основы программирования и создайте свой первый проект.',
        price: 1000, // Цена в копейках (или центах)
    };
    res.json(course);
});

// Маршрут для обработки платежей через Stripe
app.post('/api/create-checkout-session', async (req, res) => {
    const { price } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Онлайн курс по программированию',
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Запрос на сброс пароля
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 час
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Сброс пароля',
            text: `Перейдите по ссылке для сброса пароля: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Письмо для сброса пароля отправлено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Сброс пароля
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Неверный или просроченный токен' });
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Пароль успешно изменен' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Проверка роли администратора
const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }

    next();
};

// Получение всех курсов
app.get('/api/admin/courses', isAdmin, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Добавление нового курса
app.post('/api/admin/courses', isAdmin, async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const course = new Course({ title, description, price });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Редактирование курса
app.put('/api/admin/courses/:id', isAdmin, async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, price },
            { new: true }
        );
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Удаление курса
app.delete('/api/admin/courses/:id', isAdmin, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Курс удален' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
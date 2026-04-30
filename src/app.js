const express = require('express');
const path = require('path');
const app = express();
const cmdRoutes = require('./routes/cmdRoutes');
const sqlRoutes = require('./routes/sqlRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const configRoutes = require('./routes/configRoutes');
const idorRoutes = require('./routes/idorRoutes');
const cookieParser = require('cookie-parser');

// Middlewares para procesar datos de formularios 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/cmd', cmdRoutes);
app.use('/sql', sqlRoutes)
app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);
app.use('/config', configRoutes);
app.use('/idor', idorRoutes);
app.use(cookieParser());

const xssRoutes = require('./routes/xssRoutes');
const storedXssRoutes = require('./routes/storedXssRoutes');
// Usamos las rutas
app.use('/xss', xssRoutes);
app.use('/xss-stored', storedXssRoutes);

// Configuración de Vistas (EJS) 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir el CSS en la carpeta public 
app.use(express.static(path.join(__dirname, './public')));
// Ruta principal provisional
app.get('/', (req, res) => {
    res.render('index', { title: 'euVWA - Bienvenido' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor euVWA corriendo en http://localhost:${PORT}`);
});
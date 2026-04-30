const jwt = require('jsonwebtoken');
const SECRET_KEY = "clave_secreta_para_el_examen_2026";

module.exports = (req, res, next) => {
    const token = req.cookies.token; // Necesitas instalar 'cookie-parser'

    if (!token) {
        return res.status(401).send("Acceso denegado: No hay Token.");
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next(); // Token válido, puede pasar
    } catch (err) {
        res.status(400).send("Token no válido o expirado.");
    }
};
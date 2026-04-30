const jwt = require('jsonwebtoken');
const SECRET_KEY = "clave_secreta_para_el_examen_2026";

// Renderiza la vista del login vulnerable (GET)
exports.getLoginVulnerable = (req, res) => {
    res.render('vulnerabilities/auth', { msg: null, isVulnerable: true });
};

// Lógica de login vulnerable (POST)
exports.postLoginVulnerable = (req, res) => {
    const { username, password } = req.body;
    // Simulación de login vulnerable 
    if (username === 'admin' && password === 'admin') {
        return res.render('vulnerabilities/auth', { msg: "Login (Vulnerable) Exitoso", isVulnerable: true });
    }
    res.render('vulnerabilities/auth', { msg: "Credenciales incorrectas", isVulnerable: true });
};

// Renderiza la vista del login seguro con JWT (GET)
exports.getLoginSecure = (req, res) => {
    res.render('vulnerabilities/auth', { msg: null, isVulnerable: false });
};

// Lógica de login SEGURO con JWT (POST)
exports.postLoginSecure = (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'P@ssw0rd_Muy_Segur4_2026') {
        const userPayload = { username, role: 'admin' };
        
        // Generamos el Token
        const token = jwt.sign(userPayload, SECRET_KEY, { expiresIn: '1h' });

        // Guardamos en Cookie con configuración compatible para Docker/Localhost
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: false, 
            path: '/', 
            sameSite: 'lax' 
        });

        return res.render('vulnerabilities/auth', { 
            msg: "¡ÉXITO! JWT generado y guardado en Cookie segura.", 
            isVulnerable: false 
        });
    } else {
        res.render('vulnerabilities/auth', { 
            msg: "ERROR: Credenciales incorrectas.", 
            isVulnerable: false 
        });
    }
};
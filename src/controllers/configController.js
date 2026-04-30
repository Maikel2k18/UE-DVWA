exports.getErrorVulnerable = (req, res) => {
    try {
        // Forzamos un error de sistema
        throw new Error("Fallo crítico en el módulo de conexión a la Base de Datos SQLITE_V3.2");
    } catch (err) {
        //  Enviamos el stack trace completo al cliente. 
        // Esto le dice al atacante rutas de carpetas, versiones y lógica del servidor.
        res.render('vulnerabilities/config', { 
            error: err.stack, 
            isVulnerable: true 
        });
    }
};

exports.getErrorSecure = (req, res) => {
    try {
        throw new Error("Database connection failed");
    } catch (err) {
        //  Mensaje genérico para el usuario y log detallado solo en consola (servidor)
        console.error(err.stack); 
        res.render('vulnerabilities/config', { 
            error: "Lo sentimos, ha ocurrido un error interno. Por favor, contacte con el administrador.", 
            isVulnerable: false 
        });
    }
};
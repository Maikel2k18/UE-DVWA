const users = {
    "1": { name: "Administrador", email: "admin@empresa.com", tlf: "+34 600 000 001", secreto: "Clave_Maestra_2026" },
    "2": { name: "Usuario Normal", email: "user@test.com", tlf: "+34 655 123 456", secreto: "Me gusta el café" }
};

// VERSIÓN VULNERABLE
exports.getIdorVulnerable = (req, res) => {
    const { id } = req.query;
    // Buscamos el ID que manda el usuario y lo mostramos sin preguntar quién es.
    const user = users[id];
    res.render('vulnerabilities/idor', { user, isVulnerable: true });
};

// VERSIÓN SEGURA
exports.getIdorSecure = (req, res) => {
    const { id } = req.query;
    
    // Supongo que el usuario logueado es el ID 2
    const loggedInUser = "2";

    //  Verifico que el ID solicitado coincida con el de la sesión
    if (id !== loggedInUser) {
        return res.render('vulnerabilities/idor', { 
            user: null, 
            error: "¡Acceso Denegado! No tienes permiso para ver los datos de otro usuario.", 
            isVulnerable: false 
        });
    }

    const user = users[id];
    res.render('vulnerabilities/idor', { user, isVulnerable: false });
};
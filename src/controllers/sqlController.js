const sqlite3 = require('sqlite3').verbose();

// Creamos la base de datos en memoria
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER, username TEXT, password TEXT, role TEXT)");
    db.run("INSERT INTO users VALUES (1, 'admin', 'p@ssword123', 'Administrador')");
    db.run("INSERT INTO users VALUES (2, 'pepe', '12345', 'Usuario')");
    db.run("INSERT INTO users VALUES (3, 'ana', 'qwerty', 'Editor')");
});

// VERSIÓN VULNERABLE
exports.getSqlVulnerable = (req, res) => {
    const { id } = req.query;
    if (!id) return res.render('vulnerabilities/sql-injection', { users: [], isVulnerable: true });

    // Cambiamos la consulta para que NO traiga el password por defecto
    const query = `SELECT id, username, role FROM users WHERE id = ${id}`;
    
    db.all(query, (err, rows) => {
        // Pasamos los resultados a la vista
        res.render('vulnerabilities/sql-injection', { users: rows || [], isVulnerable: true });
    });
};

// VERSIÓN SEGURA
exports.getSqlSecure = (req, res) => {
    const { id } = req.query;
    if (!id) return res.render('vulnerabilities/sql-injection', { users: [], isVulnerable: false });

    // En la segura usamos parámetros y seleccionamos campos fijos
    const query = "SELECT id, username, role FROM users WHERE id = ?";
    
    db.all(query, [id], (err, rows) => {
        res.render('vulnerabilities/sql-injection', { users: rows || [], isVulnerable: false });
    });
};
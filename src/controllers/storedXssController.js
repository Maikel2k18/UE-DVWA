const escapeHtml = require('escape-html');

// Simulamos una base de datos en memoria
let comments = [];

// VERSIÓN VULNERABLE
exports.getStoredVulnerable = (req, res) => {
    res.render('vulnerabilities/xss-stored', { 
        comments: comments, 
        isVulnerable: true 
    });
};

exports.postStoredVulnerable = (req, res) => {
    const { comment } = req.body;
    // Se guarda el comentario sin sanear
    comments.push(comment);
    res.redirect('/xss-stored/vulnerable');
};

// VERSIÓN SEGURA
exports.getStoredSecure = (req, res) => {
    // SACAMOS cada comentario antes de enviarlo a la vista
    const safeComments = comments.map(c => escapeHtml(c));
    res.render('vulnerabilities/xss-stored', { 
        comments: safeComments, 
        isVulnerable: false 
    });
};

exports.postStoredSecure = (req, res) => {
    const { comment } = req.body;
    if (comment) comments.push(comment);
    res.redirect('/xss-stored/secure');
};
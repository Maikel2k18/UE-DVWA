const path = require('path');
const fs = require('fs');

// VERSIÓN VULNERABLE
exports.getUploadVulnerable = (req, res) => {
    res.render('vulnerabilities/upload', { msg: null, isVulnerable: true });
};

exports.postUploadVulnerable = (req, res) => {
    if (!req.file) return res.send("No se subió ningún archivo.");
    res.render('vulnerabilities/upload', { 
        msg: `Archivo "${req.file.originalname}" subido con ÉXITO (Vulnerable)`, 
        isVulnerable: true 
    });
};

// VERSIÓN SEGURA
exports.getUploadSecure = (req, res) => {
    res.render('vulnerabilities/upload', { msg: null, isVulnerable: false });
};

exports.postUploadSecure = (req, res) => {
    if (!req.file) return res.send("No se subió ningún archivo.");

    const file = req.file;
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExt = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        return res.render('vulnerabilities/upload', { 
            msg: "ERROR: Extensión no permitida.", 
            isVulnerable: false 
        });
    }

    res.render('vulnerabilities/upload', { 
        msg: `Archivo "${file.originalname}" subido de forma SEGURA.`, 
        isVulnerable: false 
    });
};
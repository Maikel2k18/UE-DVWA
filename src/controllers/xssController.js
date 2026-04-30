const escapeHtml = require('escape-html');

// VERSIÓN VULNERABLE

exports.getReflectedVulnerable = (req, res) => {
    const { name } = req.query;
    res.render('vulnerabilities/xss-reflected', { 
        name: name || '', 
        isVulnerable: true 
    });
};

exports.getReflectedSecure = (req, res) => {
    const { name } = req.query;
    const safeName = name ? escapeHtml(name) : '';
    res.render('vulnerabilities/xss-reflected', { 
        name: safeName, 
        isVulnerable: false 
    });
};
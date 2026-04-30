const { exec } = require('child_process'); //terminal

// VERSIÓN VULNERABLE
exports.getCmdVulnerable = (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.render('vulnerabilities/cmd-injection', { result: null, isVulnerable: true });

    // Concatenamos el input directamente en un comando del sistema
    exec(`ping -c 1 ${ip}`, (error, stdout, stderr) => {
        res.render('vulnerabilities/cmd-injection', { 
            result: stdout || stderr, 
            isVulnerable: true 
        });
    });
};

// VERSIÓN SEGURA
exports.getCmdSecure = (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.render('vulnerabilities/cmd-injection', { result: null, isVulnerable: false });

    //  Validamos que el input sea realmente una IP (regex)
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ip)) {
        return res.render('vulnerabilities/cmd-injection', { 
            result: "Error: Formato de IP no válido. Inyección bloqueada.", 
            isVulnerable: false 
        });
    }

    exec(`ping -c 1 ${ip}`, (error, stdout, stderr) => {
        res.render('vulnerabilities/cmd-injection', { result: stdout, isVulnerable: false });
    });
};
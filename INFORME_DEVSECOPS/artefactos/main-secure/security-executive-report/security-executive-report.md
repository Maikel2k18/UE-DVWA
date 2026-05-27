# 🔐 Informe Ejecutivo de Seguridad — euVWA

**Proyecto:** euVWA — Laboratorio de Vulnerabilidades Web
**Repositorio:** https://github.com/Maikel2k18/UE-DVWA
**Rama analizada:** `main-secure`
**Commit:** `70bd00038761041552fb0a6a9fa2739b1c0241d1`
**Fecha:** 2026-05-27 14:54 UTC
**Pipeline:** [26518844520](https://github.com/Maikel2k18/UE-DVWA/actions/runs/26518844520)

---

## 1. Resumen Ejecutivo

Este informe consolida los resultados de los análisis de seguridad
automatizados ejecutados sobre la aplicación euVWA como parte del
pipeline DevSecOps. Se han aplicado técnicas de **Shift Left Security**,
integrando controles de seguridad en todas las fases del ciclo de vida
del desarrollo.

| Fase | Herramienta | Tipo |
|---|---|---|
| Código fuente | Semgrep (OWASP Top 10) | SAST |
| Código fuente | ESLint Security Plugin | SAST |
| Dependencias npm | Trivy (filesystem) | SCA |
| Inventario software | Trivy (CycloneDX/SPDX) | SBOM |
| Imagen Docker | Trivy (image scan) | Container Security |
| Aplicación en vivo | OWASP ZAP Baseline | DAST |

## 2. Estado del Pipeline

| Job | Estado |
|---|---|
| SAST (Semgrep + ESLint) | success |
| Dependencias + SBOM | success |
| Escaneo de imagen Docker | success |
| DAST (OWASP ZAP) | success |

## 3. Hallazgos

Ver artefactos descargables en este pipeline:
- `sast-semgrep-report` — Hallazgos SAST de Semgrep
- `sast-eslint-report` — Hallazgos ESLint Security
- `dependency-trivy-report` — CVEs en dependencias npm
- `sbom-cyclonedx` — SBOM formato CycloneDX
- `sbom-spdx` — SBOM formato SPDX
- `image-trivy-report` — CVEs en imagen Docker
- `zap-baseline-report` — Informe DAST ZAP Baseline
- `zap-full-report` — Informe DAST ZAP Full (solo main-vulnerable)

## 4. Recommendations

1. **SQLi:** Reemplazar concatenación de strings por Prepared Statements
2. **XSS:** Aplicar Contextual Output Encoding en todas las vistas EJS
3. **Command Injection:** Sustituir exec() por APIs nativas de Node.js
4. **Docker:** Migrar a imagen multi-stage, usuario no-root, sin chmod 777
5. **Dependencias:** Actualizar paquetes con CVEs conocidos
6. **Headers HTTP:** Configurar Helmet.js (HSTS, CSP, X-Content-Type)
7. **Principio mínimo privilegio:** Usuario DB sin permisos root

---
*Generado automáticamente por el pipeline DevSecOps — euVWA*

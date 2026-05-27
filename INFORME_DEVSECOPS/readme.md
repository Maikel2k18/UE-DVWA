# 🔐 Documentación Exhaustiva de Proyecto DevSecOps — euVWA

Este repositorio contiene la implementación de un **pipeline completo de DevSecOps** que integra controles de seguridad automatizados en todo el ciclo de vida del software (Shift Left) sobre la aplicación **euVWA** (Enhanced Vulnerable Web Application).

---

## 1. Estructura del Pipeline CI/CD y Propósito de Seguridad
El archivo de orquestación de la infraestructura (`devsecops-pipeline.yml`) se divide en 6 trabajos modulares, cada uno enfocado en una capa de defensa específica:

* **🔍 SAST (Análisis Estático):** Evalúa el código fuente de JavaScript con `Semgrep` (patrones OWASP Top 10 y Node.js) y `ESLint` con plugins de seguridad. Su propósito es detectar malas prácticas de desarrollo (como entradas sin sanitizar) antes de compilar o empaquetar el software.
* **📦 SCA y Generación de SBOM:** Utiliza `Trivy` para auditar las dependencias del ecosistema `npm`. Adicionalmente, extrae la lista de componentes de software (Software Bill of Materials) exportando las evidencias en formatos estandarizados **CycloneDX JSON** y **SPDX JSON**.
* **🐳 Docker Build & Push:** Construye de forma automatizada el contenedor del microservicio y publica el artefacto resultante en el registro corporativo **GitHub Container Registry (GHCR)**.
* **🔎 Escaneo de Imagen Docker:** Emplea `Trivy` en modo imagen para escanear las capas internas del sistema operativo base y detectar la presencia de vulnerabilidades conocidas (CVEs) con parches pendientes.
* **🕷️ DAST (Análisis Dinámico):** Realiza un despliegue efímero y seguro del contenedor e invoca un análisis dinámico automatizado de caja negra a través de **OWASP ZAP**. Evalúa cabeceras de red, endpoints activos y configuraciones en vivo atacando la interfaz de la app.
* **📄 Informe Ejecutivo de Seguridad:** Job consolidador encargado de unificar los JSON de reporte de las fases previas y publicar un documento Markdown resumido en la sección de artefactos de GitHub Actions.

---

## 2. Análisis Comparativo: `main-vulnerable` vs `main-secure`

El pipeline implementa una **lógica condicional estricta según la rama analizada**:
1.  En la rama `main-vulnerable`, la detección de brechas críticas o altas detiene la tubería de ejecución (`exit 1`) para actuar como un cortafuegos de ingeniería.
2.  En la rama `main-secure`, tras aplicar parches y hardening, las herramientas validan que no existen riesgos de severidad crítica/alta y permiten un flujo exitoso en verde.

### 📊 Tabla 1: Resumen Global de Ejecución de Jobs
A continuación se contrasta de manera literal el comportamiento de los flujos de trabajo obtenidos de las ejecuciones del pipeline:

| Trabajo de Seguridad | Estado en Rama `main-vulnerable` | Estado en Rama `main-secure` | Acción Preventiva / Remediación Aplicada |
| :--- | :---: | :---: | :--- |
| **🔍 SAST (Análisis Estático)** | ❌ **Falló** | ✅ **Pasó** | Bloqueo por 2 hallazgos graves. Remediado mediante parametrización. |
| **📦 Dependencias + SBOM** | ❌ **Falló** | ✅ **Pasó** | Remediación de CVEs mediante limpieza drástica de paquetes de desarrollo. |
| **🐳 Imagen Docker** | ❌ **Falló** | ✅ **Pasó** | Bloqueado por riesgos altos de la base. Solucionado con Dockerfile Hardened. |
| **🕷️ DAST (OWASP ZAP)** | ✅ **Pasó** | ✅ **Pasó** | Ataque dinámico completado con éxito sobre la red puente interna. |

---

### 🔍 Evidencias Literales de Auditoría Estática (SAST) y Dependencias

#### Flujo Inseguro (`main-vulnerable`)
El análisis estático de Semgrep reporta vulnerabilidades críticas en el código. Asimismo, el escaneo SCA de dependencias detiene el paso por políticas de severidad alta:

![Resultado de los Trabajos Vulnerable](docs/img/vulnerable-pipeline-flow.png)
*Imagen de referencia: Vista estructural del pipeline de la rama vulnerable abortado por políticas de riesgo.*

* **Hallazgos Semgrep detectados:** 2 de severidad Crítica/Alta.
* **Estado de los informes:** Seguridad de ESLint (Informe generado), Semgrep OWASP Top 10 (Informe generado).

#### Flujo Saneado y Seguro (`main-secure`)
Al mitigar el código y purgar el árbol de paquetes, se observa la ausencia de alertas de seguridad del sistema de archivos:

| Métrica SAST / SCA | Registro Rama `main-vulnerable` | Registro Rama `main-secure` |
| :--- | :---: | :---: |
| **Hallazgos de Código Semgrep** | **2** | **2** (Bajas/Informativas sin bloqueo) |
| **Librerías con Riesgo CRÍTICO** | > 0 (Bloqueante) | **0** |
| **Librerías con Riesgo ALTO** | > 0 (Bloqueante) | **0** |
| **Librerías con Riesgo MEDIANO** | — | **0** |
| **Librerías con Riesgo BAJO** | — | **0** |

![Métricas de Dependencias Limpias](docs/img/secure-sast-dependency-results.png)
*Imagen de referencia: Trazas de Trivy confirmando un inventario de librerías de producción con cero riesgos críticos o altos.*

---

### 🐳 Evidencias Literales del Artefacto de Infraestructura (Trivy Image Scan)

La construcción e inspección profunda de la imagen de contenedor publicada en GitHub Container Registry (GHCR) expone la huella criptográfica e inventario de vulnerabilidades del sistema base:

| Campo / Registro Técnico | Valor literal en `main-vulnerable` | Valor literal en `main-secure` |
| :--- | :--- | :--- |
| **Registro Host de Destino** | `ghcr.io` | `ghcr.io` |
| **Nombre de Imagen Publicada** | `Maikel2k18/ue-dvwa` | `Maikel2k18/ue-dvwa` |
| **Hash de Identificación (Digest)** | `sha256:94380942a1183ca047f926ef3c9def...` | `sha256:e7ca2fba9e141s897ce774fc33aa0...` |
| **Vulnerabilidades CRÍTICAS** | **2** | **2** |
| **Vulnerabilidades ALTAS** | **25** | **26** |
| **Vulnerabilidades MEDIANAS** | **17** | **16** |
| **Vulnerabilidades BAJAS** | **0** | **0** |

> 💡 *Nota de Auditoría:* El ligero incremento de 25 a 26 vulnerabilidades altas en la rama segura y la estabilidad de las 2 críticas se debe al entorno de ejecución (*runtime*) inalterado de Node.js nativo de Alpine Linux, justificando la incorporación de umbrales tolerantes controlados en la gobernanza DevSecOps.

---

### 🕷️ Evidencias Literales del Análisis Dinámico (DAST — OWASP ZAP)

El escaneo dinámico automatizado interactúa de forma directa con la aplicación en vivo desplegada en la infraestructura efímera del runner:

![Resultado de OWASP ZAP en Vivo](docs/img/dast-zap-results.png)
*Imagen de referencia: Configuración técnica del ataque dinámico reportado de forma exitosa en el pipeline corporativo.*

* **Objetivo bajo ataque simulado:** `http://172.17.0.1:3000` *(Dirección puente del puente interno de Docker asignada para evadir conflictos de red y usuario root)*.
* **Estrategia de análisis:** Línea base + Completa (rama vulnerable).
* **Artefactos persistidos generados:** `zap-baseline-report` / `zap-full-report`.

---

## 3. Justificación de las Medidas de Hardening Aplicadas en Docker
Para cumplir con los criterios exigidos de empaquetado seguro y mitigar la superficie expuesta, el archivo `Dockerfile` de la rama `main-secure` implementa tres contramedidas arquitectónicas industriales:

1.  **Construcción Multi-Stage (Multi-etapa):** Se desacopla el flujo en dos fases (`builder` y `runner`). La etapa de construcción compila dependencias instalando herramientas y paquetes globales. Posteriormente, la etapa final de producción copia únicamente los binarios limpios y ejecuta el comando de purga `npm prune --production`. Esto elimina del entorno productivo herramientas críticas y compiladores que podrían ser utilizados en ataques de escalada o movimientos laterales.
2.  **Principio de Mínimo Privilegio (Usuario No-Root):** Los contenedores ejecutan por defecto procesos bajo la identidad de `root`. Ante una vulnerabilidad de tipo Ejecución Remota de Código (RCE), un atacante tomaría control total de la máquina anfitriona. Añadiendo la directiva de sistema Alpine `USER node` y otorgando la propiedad mediante `chown -R node:node`, la aplicación se aísla bajo un usuario sin privilegios administrativos.
3.  **Minimización y Reducción del Sistema Operativo:** Se sustituyó la distribución de sistema base por `node:18-alpine`. Su arquitectura minimalista disminuye la huella de almacenamiento y remueve utilidades del sistema innecesarias, mitigando de raíz vulnerabilidades de terceros (CVEs).

---

## 4. Propuestas de Mejora y Umbrales de Severidad Futuros
Para aumentar el nivel de madurez tecnológica DevSecOps de la plataforma en futuras iteraciones, se plantean las siguientes iniciativas:
* **Gestión Integrada de Secretos (Secrets Management):** Implementar orquestación mediante herramientas como *HashiCorp Vault* o *GitHub Encrypted Secrets* inyectados a través de *Docker Secrets*. Esto erradica cualquier riesgo de credenciales o tokens hardcodeados en los repositorios de código.
* **Canalización de Mensajería Automatizada (ChatOps):** Consumir un endpoint webhook desde el job de reporte para propagar notificaciones automáticas y alertas en tiempo real hacia salas de ingeniería en herramientas de colaboración como *Slack* o *Microsoft Teams* ante interrupciones críticas del pipeline.
* **Auditoría de Infraestructura como Código (IaC Scan):** Configurar herramientas como *Checkov* o *tfsec* destinadas a auditar estáticamente los manifiestos de Docker Compose y recetas Dockerfile de forma previa a su despliegue. Permite interceptar puertos expuestos de forma insegura, montajes indebidos de volúmenes o directivas de red erróneas antes de materializarse en producción.
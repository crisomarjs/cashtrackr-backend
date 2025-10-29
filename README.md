# ⚙️ CashTrackr Backend

**CashTrackr** Domina tus finanzas con nuestro **Administrador de Gastos**.  
Simplifica la gestión de tus **ingresos y egresos** en un solo lugar, de manera **intuitiva y eficiente**.  
Toma el control total de tus **finanzas personales o empresariales** con nuestra plataforma fácil de usar.  
Este repositorio contiene el **backend**, desarrollado con **Node.js**, **Express**, **TypeScript** y **PostgreSQL**.

---

## 🧱 Tecnologías utilizadas


- 🟩 **Node.js** — entorno de ejecución
- 🚀 **Express** — framework para la API REST
- 🟦 **TypeScript** — tipado estático y modularidad
- 🐘 **PostgreSQL** — base de datos relacional
- 🔐 **dotenv** para variables de entorno    

---

## 📂 Estructura del proyecto

- `config/` → Configuración general (DB, entorno)
- `controllers/` → Controladores para la lógica de negocio
- `handlers/` → Controladores o lógica de negocio
- `middleware/` → Middlewares personalizados
- `models/` → Modelos de datos con Sequelize
- `utils/` → Funciones auxiliares
- `routes/` → Definición de rutas de la API
- `index.ts` → Archivo principal del backend
- `server.ts` → Inicialización del servidor Express
---

## ⚙️ Configuración del entorno

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```env
DATABASE_URL = url_database
FRONTEND_URL = url_frontend
JWT_SECRET = palabra_secreta_para_el_jwt
EMAIL_HOST= nombre_de_cloud
EMAIL_PORT= numero_puerto
EMAIL_USER= email_user
EMAIL_PASS= email_pass

```


## 🔗 Repositorios relacionados

- [Frontend - Next.js + TS](https://github.com/crisomarjs/cashtrackr-frontend)
- [Backend - Node + Express + TS + PostgreSQL](https://github.com/crisomarjs/cashtrackr-backend)

## Gestion-de-Eventos---Javascript-FullStack ##
Repositorio que almacena el frontend y el backend de el proyecto Final de Javascript.

# Resumen del Proyecto
eTOMIC es una aplicación fullstack que permite a los usuarios interactuar con registro y login. Ver y marcar asistencia en eventos seleccionados por aplicacion. Actualizacion informacion personal. Eliminacion de cuenta, propia, y sin restricciones para administrador. Visualizacion de eventos "asist". 
Administrador adquiere propiedades superiores como, eliminar otros perfiles, crear, editar y eliminar eventos. Control de comunidad. 

El Frontend ofrece una interfaz de usuario responsiva y ligera.
El Backend expone una API REST protegida mediante JWT y gestiona la lógica de negocio y la persistencia de datos.


# Características Principales

 
Registro e inicio de sesión de usuarios.
Gestión de perfiles de usuario (carga de avatar, edición de datos).
CRUD completo Usuarios Eventos.
Autenticación y autorización con tokens JWT.
Gestion de Eventos y otras funciones usuario administrador.


# 🔧 Instalación y Configuración

# 1. Clonar el Repositorio
   
   git clone https://github.com/MSS1410/Gestion-de-Eventos-Javascript-FullStack.git
   
# 1.1 - cd Gestion-de-Eventos---Javascript-FullStack



# 2.  Configurar e iniciar el Backend

   -- cd backend -- 

  cp .env.example .env
*editelo y rellene con*

MONGO_URI=mongodb+srv://maarcsesa:GestionDeEventos@clustergde.ats5apc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGDE

JWT_SECRET=GestionDeEventos 
PORT_BACKEND=5000

CLOUDINARY_CLOUD_NAME=dhmrsz0cw
CLOUDINARY_API_KEY=162557192587135
CLOUDINARY_API_SECRET=9rY28EquXMmAyFQFLUN5QEDXzhI



# 2.3 Instale dependencias
npm install


# 2.4 Arranque el servidor en modo desarrollo
npm run dev




# 3. Configurar e iniciar el Frontend
  
-- frontEnd -- 
   cd ../frontend/gestionDeEventos
   cp .env.example .env

*editelo y rellene con*   

VITE_API_URL=http://localhost:5000/api

NODE_ENV= development

# 3.3 Instale dependencias
npm install

# 3.4 Levante la aplicación con Vite
npm run dev



# 4. 📦 Scripts útiles

- Backend -

npm run dev → inicia con nodemon

conectado a mongo y administrador encontrado

- Frontend -

npm run dev → arranca Vite en modo desarrollo

click en el enlace proporcionado



# 5. Credenciales para administrador:

- email: etomic_off_admin@etomic.com
- password:etomic
  

 
# 6. Credenciales para usuario

- email:mariagonza@gmail.com
- password:mariagonza

# 7. Creacion de usuario disponible desde SignUp, en la vista login.
 

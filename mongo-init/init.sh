#!/bin/bash
set -e

echo "Creating application user and data..."

mongosh -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$APP_DB_NAME');

// 1. Seguridad: Creación de usuario con privilegios mínimos
db.createUser({
  user: "$APP_DB_USER",
  pwd: "$APP_DB_PASS",
  roles: [
    { role: "readWrite", db: "$APP_DB_NAME" }
  ]
});

print("Conectado a la base de datos: " + db.getName());
print("Creando colecciones...");
db.createCollection("usuarios");
db.createCollection("publicaciones");
db.createCollection("comentarios");
db.createCollection("reacciones");
db.createCollection("seguidores");
db.createCollection("mensajes");
db.createCollection("notificaciones");

print("Insertando usuarios...");
db.usuarios.insertMany([
  {
    id_usuario: 1,
    nombre_usuario: "ana_lopez",
    correo: "ana@hoteleasetest.com",
    contraseña: "hashed_password_123",
    foto_perfil: "https://static.vecteezy.com/system/resources/previews/017/293/219/non_2x/hand-drawing-cartoon-girl-cute-girl-drawing-for-profile-picture-png.png",
    biografia: "Entusiasta de los viajes y la tecnología."
  },
  {
    id_usuario: 2,
    nombre_usuario: "beta_gomez",
    correo: "beta@hoteleasetest.com",
    contraseña: "hashed_password_456",
    foto_perfil: "https://img.freepik.com/foto-gratis/linda-chica-posando_23-2147639420.jpg",
    biografia: "Desarrolladora de software y amante del café."
  },
  {
    id_usuario: 3,
    nombre_usuario: "carlos_diaz",
    correo: "carlos@hoteleasetest.com",
    contraseña: "hashed_password_789",
    foto_perfil: "https://img.freepik.com/fotos-premium/chico-adolescente-atractivo-parque_58409-13244.jpg",
    biografia: "Fotógrafo aficionado."
  }
]);

print("Insertando publicaciones...");
db.publicaciones.insertMany([
  {
    id_publicacion: 101,
    id_usuario: 1,
    contenido_texto: "¡Qué vista increíble desde la habitación! #viajes #relax",
    multimedia_url: "https://www.carre.net/wp-content/uploads/2023/07/carre-hotel-qgat-2023-6.jpeg",
    fecha_creacion: "2025-11-08T14:30:00Z"
  },
  {
    id_publicacion: 102,
    id_usuario: 2,
    contenido_texto: "Trabajando en un nuevo proyecto de codigo en el hotel. ¡Emocionado por esta experiencia!",
    multimedia_url: "https://thumbs.dreamstime.com/b/correo-electr%C3%B3nico-de-la-lectura-del-hombre-en-el-ordenador-port%C3%A1til-mientras-que-se-relaja-playa-128421099.jpg",
    fecha_creacion: "2025-11-09T09:15:00Z"
  }
]);

print("Insertando comentarios...");
db.comentarios.insertMany([
  {
    id_comentario: 201,
    id_usuario: 2,
    id_publicacion: 101,
    comentario: "¡Wow! ¿Dónde es eso? Se ve espectacular.",
    fecha: "2025-11-08T15:00:00Z"
  },
  {
    id_comentario: 202,
    id_usuario: 1,
    id_publicacion: 101,
    comentario: "¡Es en Cancún! Totalmente recomendado.",
    fecha: "2025-11-08T15:05:00Z"
  },
  {
    id_comentario: 203,
    id_usuario: 3,
    id_publicacion: 102,
    comentario: "¡Éxito con eso! ¿Estás usando MongoDB?",
    fecha: "2025-11-09T10:00:00Z"
  }
]);

print("Insertando reacciones...");
db.reacciones.insertMany([
  {
    id_reaccion: 301,
    id_usuario: 2,
    id_publicacion: 101,
    tipo_reaccion: "like"
  },
  {
    id_reaccion: 302,
    id_usuario: 3,
    id_publicacion: 101,
    tipo_reaccion: "love"
  },
  {
    id_reaccion: 303,
    id_usuario: 1,
    id_publicacion: 102,
    tipo_reaccion: "like"
  }
]);

print("Insertando seguidores...");
db.seguidores.insertMany([
  {
    id_seguidor: 401,
    id_usuario: 1,
    id_seguido: 2
  },
  {
    id_seguidor: 402,
    id_usuario: 2,
    id_seguido: 1
  },
  {
    id_seguidor: 403,
    id_usuario: 3,
    id_seguido: 1
  }
]);

print("Insertando mensajes...");
db.mensajes.insertMany([
  {
    id_mensaje: 501,
    id_emisor: 1,
    id_receptor: 2,
    contenido: "¡Hola Beta! Vi tu comentario en mi post. ¿Qué tal todo?",
    fecha_envio: "2025-11-08T16:00:00Z"
  },
  {
    id_mensaje: 502,
    id_emisor: 2,
    id_receptor: 1,
    contenido: "¡Hola Ana! Todo bien, mucho trabajo. ¡Tu viaje se ve increíble!",
    fecha_envio: "2025-11-08T16:05:00Z"
  }
]);

print("Insertando notificaciones...");
db.notificaciones.insertMany([
  {
    id_notificacion: 601,
    id_usuario: 1,
    mensaje: "beta_gomez ha comentado tu publicación.",
    fecha: "2025-11-08T15:00:00Z"
  },
  {
    id_notificacion: 602,
    id_usuario: 1,
    mensaje: "carlos_diaz ha comenzado a seguirte.",
    fecha: "2025-11-08T17:00:00Z"
  },
  {
    id_notificacion: 603,
    id_usuario: 2,
    mensaje: "ana_lopez ha reaccionado a tu publicación.",
    fecha: "2025-11-09T10:00:00Z"
  }
]);

print("\n¡Proceso completado! Base de datos '$APP_DB_NAME' y colecciones creadas con datos de prueba.");
EOF

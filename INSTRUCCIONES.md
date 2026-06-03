# ⚡ ElecTrack — Instrucciones de despliegue

## Lo que necesitas configurar (15–20 minutos)

### PASO 1: Crear proyecto en Firebase (base de datos gratuita)

1. Ve a **https://console.firebase.google.com**
2. Inicia sesión con tu cuenta de Google
3. Pulsa **"Crear un proyecto"** → ponle nombre: `electracker` → Continuar
4. Desactiva Google Analytics (no lo necesitas) → **Crear proyecto**
5. En el panel lateral izquierdo pulsa **"Firestore Database"**
6. Pulsa **"Crear base de datos"**
7. Selecciona la ubicación **europe-west** (la más cercana a España)
8. Selecciona **"Iniciar en modo de prueba"** → Crear
9. Ve a **Configuración del proyecto** (rueda dentada ⚙️ arriba a la izquierda)
10. Baja hasta **"Tus apps"** → pulsa el icono **Web** (el de `</>`)
11. Ponle nombre: `ElecTrack` → **Registrar app**
12. Te mostrará un bloque `firebaseConfig` con apiKey, authDomain, etc.
13. **Copia esos valores** para el paso 2.

### PASO 2: Pegar la config en la app

Abre `index.html` y busca `FIREBASE_CONFIG` al principio del script.
Sustituye los valores de ejemplo por los tuyos de Firebase.

### PASO 3: Configurar emails (Resend)

1. Ve a **https://resend.com** y crea cuenta gratuita
2. Panel → **API Keys** → **Create API Key**
3. Copia la clave (algo como `re_xxxxxxxx`)

### PASO 4: Desplegar en Vercel

1. Sube `index.html` y la carpeta `api/` a un repositorio de GitHub
2. Ve a **https://vercel.com** → inicia sesión con GitHub
3. **Add New Project** → selecciona tu repo
4. En **Environment Variables** añade:
   - `RESEND_API_KEY` = tu clave de Resend
   - `ADMIN_EMAIL` = tu email
5. Pulsa **Deploy** → en 1 minuto tendrás tu URL

### PASO 5: Reglas Firebase

En Firebase Console → Firestore → Reglas, pon:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

# Hábitos Saludables — Guía de instalación en XAMPP

## Estructura de archivos

Copiar TODO el contenido de esta carpeta en:
```
C:\xampp\htdocs\juegophaser\
```

```
htdocs/
└── juegophaser/
    ├── index.html                  ← Abrir en el navegador
    ├── database.sql                ← Opcional: ejecutar en phpMyAdmin
    ├── api/
    │   ├── login.php               ← API PHP (opcional, ver nota)
    │   └── registro.php
    └── src/
        ├── main.js                 ← Punto de entrada Phaser
        ├── utils/
        │   ├── gameData.js         ← Datos de juego (alimentos, preguntas, etc.)
        │   └── userData.js         ← Gestión de usuarios (localStorage)
        └── scenes/
            ├── BaseScene.js        ← Componentes reutilizables
            ├── LoginScene.js       ← Pantalla de inicio de sesión
            ├── MenuScene.js        ← Menú principal con 3 módulos
            ├── ProfileScene.js     ← Perfil, racha y logros
            ├── FoodScene.js        ← Módulo Alimentación (clasificación)
            ├── HygieneScene.js     ← Módulo Higiene (quiz)
            └── ActivityScene.js    ← Módulo Actividad (desafíos + quiz)
```

---

## Paso 1 — Abrir el juego

Asegúrate de que Apache esté iniciado en XAMPP, luego ve a:

```
http://localhost/juegophaser/
```

> ⚠️ Debe accederse por `http://localhost/...` y NO por `file://`
> porque Phaser necesita un servidor HTTP para cargar módulos ES6.

---

## Cuentas de prueba (ya incluidas)

| Usuario | Contraseña | Rol        |
|---------|-----------|------------|
| sofia   | 1234      | Estudiante |
| lucas   | 1234      | Estudiante |
| maria   | 1234      | Estudiante |
| diego   | 1234      | Estudiante |
| profe   | admin     | Profesor   |

---

## ¿Dónde se guardan los datos?

Los datos de usuarios se guardan en **localStorage** del navegador.
Esto significa que:
- No se necesita MySQL para funcionar
- Los datos persisten entre sesiones en el mismo navegador
- Cada navegador tiene sus propios datos

La carpeta `api/` con los archivos PHP está incluida para uso futuro
si se desea sincronizar con una base de datos MySQL.

---

## Módulos de juego

| Módulo | Tipo de juego | Puntos por acierto |
|--------|--------------|-------------------|
| 🍎 Alimentación | Clasificar alimentos (saludable/no saludable) | 10 pts |
| 🪥 Higiene | Quiz de 6 preguntas | 15 pts |
| 🏃 Actividad | 3 desafíos físicos con timer + 5 preguntas | 15-25 pts |

---

## Posibles errores

**Pantalla en blanco / Error CORS**
→ Accede por `http://localhost/juegophaser/` no por `file://`

**Los módulos no cargan**
→ Verifica que todos los archivos de `src/` estén en su lugar
→ Abre F12 → Consola y revisa si hay errores de importación

**Los datos no se guardan**
→ Verifica que el navegador no esté en modo incógnito

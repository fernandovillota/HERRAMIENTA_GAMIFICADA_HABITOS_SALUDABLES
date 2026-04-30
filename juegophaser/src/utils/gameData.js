// src/utils/gameData.js — Datos del juego portados desde el proyecto original

export const FOOD_ITEMS = [
  { id: 'apple',      name: 'Manzana',    emoji: '🍎', category: 'healthy',   description: '¡Las manzanas tienen vitaminas A y C que fortalecen tu sistema inmunológico! También tienen fibra que ayuda a tu digestión.' },
  { id: 'broccoli',   name: 'Brócoli',    emoji: '🥦', category: 'healthy',   description: '¡El brócoli es un superalimento lleno de vitaminas K, C y hierro! Te ayuda a crecer fuerte y protege tus huesos.' },
  { id: 'carrot',     name: 'Zanahoria',  emoji: '🥕', category: 'healthy',   description: '¡Las zanahorias son ricas en vitamina A! Son excelentes para la salud de tus ojos y para tener una piel saludable.' },
  { id: 'banana',     name: 'Plátano',    emoji: '🍌', category: 'healthy',   description: '¡Los plátanos tienen potasio que fortalece tus músculos y te da energía natural! Perfectos para antes de jugar.' },
  { id: 'fish',       name: 'Pescado',    emoji: '🐟', category: 'healthy',   description: '¡El pescado contiene omega-3 que ayuda al desarrollo de tu cerebro! También fortalece tus músculos.' },
  { id: 'milk',       name: 'Leche',      emoji: '🥛', category: 'healthy',   description: '¡La leche es rica en calcio y vitamina D, esenciales para tener huesos y dientes fuertes!' },
  { id: 'egg',        name: 'Huevo',      emoji: '🥚', category: 'healthy',   description: '¡Los huevos tienen proteína completa y vitaminas B y D! Perfectos para el desayuno porque te dan energía todo el día.' },
  { id: 'watermelon', name: 'Sandía',     emoji: '🍉', category: 'healthy',   description: '¡La sandía está compuesta de 92% de agua! Perfecta para mantenerte hidratado en días calurosos.' },
  { id: 'orange',     name: 'Naranja',    emoji: '🍊', category: 'healthy',   description: '¡Las naranjas son famosas por su vitamina C que protege tu cuerpo de resfriados y enfermedades!' },
  { id: 'salad',      name: 'Ensalada',   emoji: '🥗', category: 'healthy',   description: '¡Las ensaladas con verduras frescas tienen muchas vitaminas y minerales! Te ayudan a tener buena digestión.' },
  { id: 'candy',      name: 'Dulces',     emoji: '🍬', category: 'unhealthy', description: 'Los dulces tienen muchísima azúcar que puede dañar tus dientes. Come solo de vez en cuando y cepilla tus dientes después.' },
  { id: 'fries',      name: 'Papas fritas',emoji: '🍟', category: 'unhealthy', description: 'Las papas fritas tienen mucha grasa y sal. El exceso puede afectar tu corazón. Come mejor papas al horno.' },
  { id: 'pizza',      name: 'Pizza',      emoji: '🍕', category: 'unhealthy', description: 'La pizza típica tiene mucho queso graso y sal. Comerla seguido puede causar sobrepeso. ¡Disfrútala ocasionalmente!' },
  { id: 'soda',       name: 'Refresco',   emoji: '🥤', category: 'unhealthy', description: 'Los refrescos contienen hasta 10 cucharadas de azúcar por lata. No tienen nutrientes útiles. ¡Mejor toma agua!' },
  { id: 'donut',      name: 'Dona',       emoji: '🍩', category: 'unhealthy', description: 'Las donas combinan harina frita y azúcar. Dan energía muy rápida pero luego te sientes débil.' },
  { id: 'burger',     name: 'Hamburguesa',emoji: '🍔', category: 'unhealthy', description: 'Las hamburguesas de comida rápida tienen mucha grasa saturada y sal. Si comes una, hazla casera con vegetales.' },
  { id: 'icecream',   name: 'Helado',     emoji: '🍦', category: 'unhealthy', description: 'El helado tiene mucha azúcar y grasa. Disfrútalo solo de vez en cuando como premio especial.' },
  { id: 'cookies',    name: 'Galletas',   emoji: '🍪', category: 'unhealthy', description: 'Las galletas comerciales contienen azúcar refinada y conservantes. Mejor come frutas como snack.' },
];

export const HYGIENE_QUESTIONS = [
  { id: 'teeth_times',      question: '¿Cuántas veces al día debes cepillarte los dientes?', options: ['1 vez','2 veces','3 veces','No es necesario'], correctAnswer: 2, emoji: '🪥', explanation: '¡Debes cepillarte los dientes 3 veces al día: después del desayuno, almuerzo y antes de dormir! Cada cepillado debe durar al menos 2 minutos.' },
  { id: 'hands_when',       question: '¿Cuándo debes lavarte las manos?', options: ['Solo al despertar','Antes de comer','Solo antes de dormir','Una vez al día'], correctAnswer: 1, emoji: '🧼', explanation: '¡Es fundamental lavarte las manos antes de cada comida, después de ir al baño y al llegar a casa! Usa agua y jabón, frota por 20 segundos.' },
  { id: 'shower_frequency', question: '¿Con qué frecuencia debes bañarte?', options: ['Una vez al mes','Cada 3 días','Todos los días','Solo los fines de semana'], correctAnswer: 2, emoji: '🚿', explanation: '¡Debes bañarte todos los días para eliminar sudor, suciedad y bacterias de tu piel! El baño diario previene malos olores e infecciones.' },
  { id: 'hair_care',        question: '¿Qué debes hacer con tu cabello todos los días?', options: ['Nada','Peinarlo','Cortarlo','Pintarlo'], correctAnswer: 1, emoji: '💇', explanation: '¡Debes peinar tu cabello todos los días para desenredarlo! Esto previene nudos difíciles y distribuye los aceites naturales.' },
  { id: 'nail_care',        question: '¿Qué debes hacer para mantener tus uñas limpias?', options: ['Pintarlas','Cortarlas y limpiarlas','Morderlas','Dejarlas crecer mucho'], correctAnswer: 1, emoji: '💅', explanation: '¡Debes cortar tus uñas cada 1-2 semanas y limpiarlas diariamente! Las uñas largas acumulan gérmenes. Nunca te las muerdas.' },
  { id: 'sleep_hygiene',    question: '¿Cuántas horas debe dormir un niño de tu edad?', options: ['5-6 horas','7-8 horas','9-11 horas','12-14 horas'], correctAnswer: 2, emoji: '😴', explanation: '¡Los niños necesitan dormir entre 9 y 11 horas cada noche! Durante el sueño tu cuerpo se repara y tu cerebro organiza lo aprendido.' },
];

export const PHYSICAL_CHALLENGES = [
  { id: 'jumping_jacks', name: 'Saltos de Estrella',    description: '¡Haz 10 saltos abriendo brazos y piernas!',           emoji: '⭐', duration: 30, points: 20 },
  { id: 'squats',        name: 'Sentadillas',            description: '¡Haz 8 sentadillas como si te sentaras en una silla!',  emoji: '🦵', duration: 30, points: 20 },
  { id: 'arm_circles',   name: 'Círculos con Brazos',    description: '¡Haz círculos con tus brazos por 20 segundos!',         emoji: '💪', duration: 20, points: 15 },
  { id: 'march',         name: 'Marcha en el Lugar',     description: '¡Marcha levantando bien las rodillas por 30 segundos!', emoji: '🚶', duration: 30, points: 20 },
  { id: 'toe_touches',   name: 'Tocar los Pies',         description: '¡Intenta tocar tus pies 10 veces!',                    emoji: '🤸', duration: 30, points: 20 },
  { id: 'side_steps',    name: 'Pasos Laterales',        description: '¡Da pasos de lado a lado por 30 segundos!',            emoji: '👟', duration: 30, points: 20 },
  { id: 'balance',       name: 'Equilibrio',             description: '¡Párate en un pie por 15 segundos!',                   emoji: '🧘', duration: 15, points: 15 },
  { id: 'dance',         name: '¡A Bailar!',             description: '¡Baila libremente por 45 segundos!',                   emoji: '💃', duration: 45, points: 25 },
];

export const ACTIVITY_QUESTIONS = [
  { id: 'daily_exercise',  question: '¿Cuánto tiempo debes jugar y moverte cada día?', options: ['10 minutos','30 minutos','1 hora','No es necesario'], correctAnswer: 2, emoji: '⏰', explanation: '¡Los niños necesitan al menos 1 hora de actividad física diaria! El ejercicio fortalece tu corazón, músculos y huesos.' },
  { id: 'exercise_benefits',question: '¿Qué te ayuda hacer ejercicio?', options: ['Solo crecer','Ser más fuerte y saludable','Dormir menos','Nada'], correctAnswer: 1, emoji: '💪', explanation: '¡El ejercicio regular te hace más fuerte física y mentalmente! Mejora tu concentración, reduce el estrés y te da más energía.' },
  { id: 'outdoor_play',    question: '¿Es bueno jugar al aire libre?', options: ['No','Solo en verano','Sí, es muy bueno','Solo los fines de semana'], correctAnswer: 2, emoji: '🌳', explanation: '¡Jugar al aire libre te da vitamina D del sol, aire fresco y espacio para correr! También mejora tu vista y sistema inmune.' },
  { id: 'stretching',      question: '¿Cuándo debes estirarte?', options: ['Nunca','Antes y después de hacer ejercicio','Solo cuando duele algo','Una vez al mes'], correctAnswer: 1, emoji: '🤸', explanation: '¡Estirarte antes del ejercicio prepara tus músculos y previene lesiones! Después del ejercicio reduce el dolor muscular.' },
  { id: 'screen_time',     question: '¿Cuánto tiempo máximo debes ver pantallas al día?', options: ['Todo el día','5-6 horas','1-2 horas','No importa'], correctAnswer: 2, emoji: '📱', explanation: '¡Los niños no deben pasar más de 1-2 horas al día frente a pantallas! Reemplaza ese tiempo con juegos activos y deportes.' },
];

export const ACHIEVEMENTS = [
  { id: 'food_beginner',    name: '¡Primera Comida!',      description: 'Completaste tu primer juego de alimentación', icon: '🍎', points: 50,   category: 'food' },
  { id: 'food_expert',      name: 'Experto en Nutrición',  description: 'Completaste 5 juegos de alimentación',        icon: '🥗', points: 200,  category: 'food' },
  { id: 'food_master',      name: 'Maestro de Alimentos',  description: 'Completaste 10 juegos de alimentación',       icon: '🏆', points: 500,  category: 'food' },
  { id: 'hygiene_beginner', name: '¡Super Limpio!',         description: 'Completaste tu primer juego de higiene',      icon: '🧼', points: 50,   category: 'hygiene' },
  { id: 'hygiene_expert',   name: 'Campeón de Higiene',    description: 'Completaste 5 juegos de higiene',             icon: '✨', points: 200,  category: 'hygiene' },
  { id: 'hygiene_master',   name: 'Maestro de Limpieza',   description: 'Completaste 10 juegos de higiene',            icon: '🏆', points: 500,  category: 'hygiene' },
  { id: 'activity_beginner',name: '¡En Movimiento!',       description: 'Completaste tu primer desafío físico',        icon: '🏃', points: 50,   category: 'activity' },
  { id: 'activity_expert',  name: 'Atleta Saludable',      description: 'Completaste 5 desafíos físicos',              icon: '⚽', points: 200,  category: 'activity' },
  { id: 'activity_master',  name: 'Maestro del Deporte',   description: 'Completaste 10 desafíos físicos',             icon: '🏆', points: 500,  category: 'activity' },
  { id: 'points_100',       name: 'Coleccionista',         description: 'Alcanzaste 100 puntos',                       icon: '⭐', points: 100,  category: 'general' },
  { id: 'points_500',       name: 'Súper Estrella',        description: 'Alcanzaste 500 puntos',                       icon: '🌟', points: 500,  category: 'general' },
  { id: 'points_1000',      name: 'Leyenda Saludable',     description: 'Alcanzaste 1000 puntos',                      icon: '💎', points: 1000, category: 'general' },
  { id: 'all_modules',      name: 'Explorador Completo',   description: 'Jugaste en los 3 módulos',                    icon: '🎯', points: 150,  category: 'general' },
  { id: 'streak_7',         name: 'Semana Perfecta',       description: 'Mantuviste una racha de 7 días',              icon: '🔥', points: 100,  category: 'streak' },
  { id: 'streak_15',        name: 'Imparable',             description: 'Mantuviste una racha de 15 días consecutivos',icon: '⚡', points: 300,  category: 'streak' },
  { id: 'streak_30',        name: 'Leyenda de Constancia', description: '¡30 días seguidos de aprendizaje!',           icon: '👑', points: 1000, category: 'streak' },
];

export const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
export const getRandomItems = (arr, count) => shuffleArray(arr).slice(0, count);

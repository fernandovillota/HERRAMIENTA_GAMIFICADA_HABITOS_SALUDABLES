// Font global
const F = '"Segoe UI",Arial,sans-serif';

// ═══════════════════════════════════════════════════
// HABITOS SALUDABLES — Bundle único sin módulos ES6
// Compatible con file:// y http://
// ═══════════════════════════════════════════════════

// src/utils/gameData.js

const FOOD_ITEMS = [
  { id:'apple',      name:'Manzana',     emoji:'🍎', category:'healthy',   description:'¡Las manzanas tienen vitaminas A y C que fortalecen tu sistema inmunológico! También tienen fibra que ayuda a tu digestión.' },
  { id:'broccoli',   name:'Brócoli',     emoji:'🥦', category:'healthy',   description:'¡El brócoli es un superalimento lleno de vitaminas K, C y hierro! Te ayuda a crecer fuerte y protege tus huesos.' },
  { id:'carrot',     name:'Zanahoria',   emoji:'🥕', category:'healthy',   description:'¡Las zanahorias son ricas en vitamina A! Excelentes para la salud de tus ojos y para tener una piel saludable.' },
  { id:'banana',     name:'Plátano',     emoji:'🍌', category:'healthy',   description:'¡Los plátanos tienen potasio que fortalece tus músculos y te da energía natural! Perfectos para antes de jugar.' },
  { id:'fish',       name:'Pescado',     emoji:'🐟', category:'healthy',   description:'¡El pescado contiene omega-3 que ayuda al desarrollo de tu cerebro! También fortalece tus músculos.' },
  { id:'milk',       name:'Leche',       emoji:'🥛', category:'healthy',   description:'¡La leche es rica en calcio y vitamina D, esenciales para tener huesos y dientes fuertes!' },
  { id:'egg',        name:'Huevo',       emoji:'🥚', category:'healthy',   description:'¡Los huevos tienen proteína completa y vitaminas B y D! Perfectos para el desayuno porque te dan energía todo el día.' },
  { id:'watermelon', name:'Sandía',      emoji:'🍉', category:'healthy',   description:'¡La sandía está compuesta de 92% de agua! Perfecta para mantenerte hidratado en días calurosos.' },
  { id:'orange',     name:'Naranja',     emoji:'🍊', category:'healthy',   description:'¡Las naranjas son famosas por su vitamina C que protege tu cuerpo de resfriados y enfermedades!' },
  { id:'salad',      name:'Ensalada',    emoji:'🥗', category:'healthy',   description:'¡Las ensaladas con verduras frescas tienen muchas vitaminas y minerales! Te ayudan a tener buena digestión.' },
  { id:'candy',      name:'Dulces',      emoji:'🍬', category:'unhealthy', description:'Los dulces tienen muchísima azúcar que puede dañar tus dientes. Come solo de vez en cuando y cepilla tus dientes después.' },
  { id:'fries',      name:'Papas fritas',emoji:'🍟', category:'unhealthy', description:'Las papas fritas tienen mucha grasa y sal. El exceso puede afectar tu corazón. Come mejor papas al horno.' },
  { id:'pizza',      name:'Pizza',       emoji:'🍕', category:'unhealthy', description:'La pizza típica tiene mucho queso graso y sal. Comerla seguido puede causar sobrepeso. ¡Disfrútala ocasionalmente!' },
  { id:'soda',       name:'Refresco',    emoji:'🥤', category:'unhealthy', description:'Los refrescos contienen hasta 10 cucharadas de azúcar por lata. No tienen nutrientes útiles. ¡Mejor toma agua!' },
  { id:'donut',      name:'Dona',        emoji:'🍩', category:'unhealthy', description:'Las donas combinan harina frita y azúcar. Dan energía muy rápida pero luego te sientes débil.' },
  { id:'burger',     name:'Hamburguesa', emoji:'🍔', category:'unhealthy', description:'Las hamburguesas de comida rápida tienen mucha grasa saturada y sal. Hazla casera con vegetales si puedes.' },
  { id:'icecream',   name:'Helado',      emoji:'🍦', category:'unhealthy', description:'El helado tiene mucha azúcar y grasa. Disfrútalo solo de vez en cuando como premio especial.' },
  { id:'cookies',    name:'Galletas',    emoji:'🍪', category:'unhealthy', description:'Las galletas comerciales contienen azúcar refinada y conservantes. Mejor come frutas como snack.' },
];

const HYGIENE_QUESTIONS = [
  { id:'teeth_times',       question:'¿Cuántas veces al día debes cepillarte los dientes?',          options:['1 vez','2 veces','3 veces','No es necesario'],    correctAnswer:2, emoji:'🪥', explanation:'¡Debes cepillarte los dientes 3 veces al día: después del desayuno, almuerzo y antes de dormir! Cada cepillado debe durar al menos 2 minutos.' },
  { id:'hands_when',        question:'¿Cuándo debes lavarte las manos?',                              options:['Solo al despertar','Antes de comer','Solo antes de dormir','Una vez al día'], correctAnswer:1, emoji:'🧼', explanation:'¡Es fundamental lavarte las manos antes de cada comida, después de ir al baño y al llegar a casa! Usa agua y jabón, frota por 20 segundos.' },
  { id:'shower_frequency',  question:'¿Con qué frecuencia debes bañarte?',                           options:['Una vez al mes','Cada 3 días','Todos los días','Solo los fines de semana'], correctAnswer:2, emoji:'🚿', explanation:'¡Debes bañarte todos los días para eliminar sudor, suciedad y bacterias de tu piel! El baño diario previene malos olores e infecciones.' },
  { id:'hair_care',         question:'¿Qué debes hacer con tu cabello todos los días?',              options:['Nada','Peinarlo','Cortarlo','Pintarlo'],           correctAnswer:1, emoji:'💇', explanation:'¡Debes peinar tu cabello todos los días para desenredarlo! Esto previene nudos difíciles y distribuye los aceites naturales.' },
  { id:'nail_care',         question:'¿Qué debes hacer para mantener tus uñas limpias?',             options:['Pintarlas','Cortarlas y limpiarlas','Morderlas','Dejarlas crecer mucho'], correctAnswer:1, emoji:'💅', explanation:'¡Debes cortar tus uñas cada 1-2 semanas y limpiarlas diariamente! Las uñas largas acumulan gérmenes. Nunca te las muerdas.' },
  { id:'sleep_hygiene',     question:'¿Cuántas horas debe dormir un niño de tu edad?',               options:['5-6 horas','7-8 horas','9-11 horas','12-14 horas'], correctAnswer:2, emoji:'😴', explanation:'¡Los niños necesitan dormir entre 9 y 11 horas cada noche! Durante el sueño tu cuerpo se repara y tu cerebro organiza lo aprendido.' },
];

const PHYSICAL_CHALLENGES = [
  { id:'jumping_jacks', name:'Saltos de Estrella',   description:'¡Haz 10 saltos abriendo brazos y piernas!',            emoji:'⭐', duration:30, points:20 },
  { id:'squats',        name:'Sentadillas',           description:'¡Haz 8 sentadillas como si te sentaras en una silla!',  emoji:'🦵', duration:30, points:20 },
  { id:'arm_circles',   name:'Círculos con Brazos',   description:'¡Haz círculos con tus brazos por 20 segundos!',         emoji:'💪', duration:20, points:15 },
  { id:'march',         name:'Marcha en el Lugar',    description:'¡Marcha levantando bien las rodillas por 30 segundos!', emoji:'🚶', duration:30, points:20 },
  { id:'toe_touches',   name:'Tocar los Pies',        description:'¡Intenta tocar tus pies 10 veces!',                     emoji:'🤸', duration:30, points:20 },
  { id:'side_steps',    name:'Pasos Laterales',       description:'¡Da pasos de lado a lado por 30 segundos!',             emoji:'👟', duration:30, points:20 },
  { id:'balance',       name:'Equilibrio',            description:'¡Párate en un pie por 15 segundos!',                    emoji:'🧘', duration:15, points:15 },
  { id:'dance',         name:'¡A Bailar!',            description:'¡Baila libremente por 45 segundos!',                    emoji:'💃', duration:45, points:25 },
];

const ACTIVITY_QUESTIONS = [
  { id:'daily_exercise',    question:'¿Cuánto tiempo debes jugar y moverte cada día?',           options:['10 minutos','30 minutos','1 hora','No es necesario'],  correctAnswer:2, emoji:'⏰', explanation:'¡Los niños necesitan al menos 1 hora de actividad física diaria! El ejercicio fortalece tu corazón, músculos y huesos.' },
  { id:'exercise_benefits', question:'¿Qué te ayuda hacer ejercicio?',                           options:['Solo crecer','Ser más fuerte y saludable','Dormir menos','Nada'], correctAnswer:1, emoji:'💪', explanation:'¡El ejercicio regular te hace más fuerte física y mentalmente! Mejora tu concentración, reduce el estrés y te da más energía.' },
  { id:'outdoor_play',      question:'¿Es bueno jugar al aire libre?',                           options:['No','Solo en verano','Sí, es muy bueno','Solo los fines de semana'], correctAnswer:2, emoji:'🌳', explanation:'¡Jugar al aire libre te da vitamina D del sol, aire fresco y espacio para correr! También mejora tu vista y sistema inmune.' },
  { id:'stretching',        question:'¿Cuándo debes estirarte?',                                 options:['Nunca','Antes y después de hacer ejercicio','Solo cuando duele algo','Una vez al mes'], correctAnswer:1, emoji:'🤸', explanation:'¡Estirarte antes del ejercicio prepara tus músculos y previene lesiones! Después del ejercicio reduce el dolor muscular.' },
  { id:'screen_time',       question:'¿Cuánto tiempo máximo debes ver pantallas al día?',        options:['Todo el día','5-6 horas','1-2 horas','No importa'],     correctAnswer:2, emoji:'📱', explanation:'¡Los niños no deben pasar más de 1-2 horas al día frente a pantallas! Reemplaza ese tiempo con juegos activos y deportes.' },
];

const ACHIEVEMENTS = [
  { id:'food_beginner',     name:'¡Primera Comida!',       description:'Completaste tu primer juego de alimentación', icon:'🍎', points:50,   category:'food'     },
  { id:'food_expert',       name:'Experto en Nutrición',   description:'Completaste 5 juegos de alimentación',        icon:'🥗', points:200,  category:'food'     },
  { id:'food_master',       name:'Maestro de Alimentos',   description:'Completaste 10 juegos de alimentación',       icon:'🏆', points:500,  category:'food'     },
  { id:'hygiene_beginner',  name:'¡Super Limpio!',          description:'Completaste tu primer juego de higiene',      icon:'🧼', points:50,   category:'hygiene'  },
  { id:'hygiene_expert',    name:'Campeón de Higiene',     description:'Completaste 5 juegos de higiene',             icon:'✨', points:200,  category:'hygiene'  },
  { id:'hygiene_master',    name:'Maestro de Limpieza',    description:'Completaste 10 juegos de higiene',            icon:'🏆', points:500,  category:'hygiene'  },
  { id:'activity_beginner', name:'¡En Movimiento!',        description:'Completaste tu primer desafío físico',        icon:'🏃', points:50,   category:'activity' },
  { id:'activity_expert',   name:'Atleta Saludable',       description:'Completaste 5 desafíos físicos',              icon:'⚽', points:200,  category:'activity' },
  { id:'activity_master',   name:'Maestro del Deporte',    description:'Completaste 10 desafíos físicos',             icon:'🏆', points:500,  category:'activity' },
  { id:'points_100',        name:'Coleccionista',          description:'Alcanzaste 100 puntos',                       icon:'⭐', points:100,  category:'general'  },
  { id:'points_500',        name:'Súper Estrella',         description:'Alcanzaste 500 puntos',                       icon:'🌟', points:500,  category:'general'  },
  { id:'points_1000',       name:'Leyenda Saludable',      description:'Alcanzaste 1000 puntos',                      icon:'💎', points:1000, category:'general'  },
  { id:'all_modules',       name:'Explorador Completo',    description:'Jugaste en los 3 módulos',                    icon:'🎯', points:150,  category:'general'  },
  { id:'streak_7',          name:'Semana Perfecta',        description:'Mantuviste una racha de 7 días',              icon:'🔥', points:100,  category:'streak'   },
  { id:'streak_15',         name:'Imparable',              description:'Mantuviste una racha de 15 días consecutivos',icon:'⚡', points:300,  category:'streak'   },
  { id:'streak_30',         name:'Leyenda de Constancia',  description:'¡30 días seguidos de aprendizaje!',           icon:'👑', points:1000, category:'streak'   },
];

const shuffleArray   = (arr) => [...arr].sort(() => Math.random() - 0.5);
const getRandomItems = (arr, count) => shuffleArray(arr).slice(0, count);


// src/utils/userData.js

const _mem = {};
const storage = {
    get(key)        { try { const v=localStorage.getItem(key); if(v!==null)return v; }catch(e){} return _mem[key]??null; },
    set(key,value)  { try { localStorage.setItem(key,value); }catch(e){} _mem[key]=value; },
    remove(key)     { try { localStorage.removeItem(key); }catch(e){} delete _mem[key]; }
};

// ── Roles ────────────────────────────────────────────────
// Roles del sistema:
// 'student' → Estudiante   → menú principal + juegos + perfil (verde)
// 'teacher' → Profesor     → panel del tutor (azul)
// 'parent'  → Padre/Madre  → panel del tutor (naranja)
const isTutor   = (u) => u && (u.role==='teacher' || u.role==='parent' || u.role==='tutor');
const isStudent = (u) => u && u.role==='student';
const isTeacher = (u) => u && (u.role==='teacher');
const isParent  = (u) => u && (u.role==='parent');

const _bs  = () => ({ current:0, longest:0, lastPlayDate:'', daysCompleted:[] });
const _bp  = () => ({ food:0, hygiene:0, activity:0 });

// ── Predefinidos ─────────────────────────────────────────
const PREDEFINED_USERS = [
    { id:'1',username:'sofia', password:'1234', name:'Sofía',        avatar:'student2',role:'student',points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() },
    { id:'2',username:'lucas', password:'1234', name:'Lucas',        avatar:'student1',role:'student',points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() },
    { id:'3',username:'maria', password:'1234', name:'María',        avatar:'student4',role:'student',points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() },
    { id:'4',username:'diego', password:'1234', name:'Diego',        avatar:'student3',role:'student',points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() },
    { id:'5',username:'profe', password:'admin',name:'Profesora Ana',avatar:'tutor2',  role:'teacher',points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() },
    { id:'6',username:'padre', password:'1234', name:'Carlos Padre',  avatar:'parent1', role:'parent', points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() },
];

const DATA_VERSION = '3';
const _init = () => {
    if (storage.get('habitos_initialized') !== DATA_VERSION) {
        storage.set('all_users', JSON.stringify(PREDEFINED_USERS));
        storage.set('habitos_initialized', DATA_VERSION);
        storage.remove('habitos_salones');
    }
};
_init();

// ── CRUD ─────────────────────────────────────────────────
const getAllUsers  = () => { try{return JSON.parse(storage.get('all_users')||'[]');}catch{return[];} };
const getUserData  = (id) => getAllUsers().find(u=>u.id===id)||null;
const saveUserData = (user) => {
    const all=getAllUsers(), idx=all.findIndex(u=>u.id===user.id);
    if(idx>=0)all[idx]=user;else all.push(user);
    storage.set('all_users',JSON.stringify(all));
};

// ── Sesión ───────────────────────────────────────────────
const getCurrentUser   = () => { try{const id=storage.get('current_user_id');return id?getUserData(id):null;}catch{return null;} };
const setCurrentUser   = (id) => storage.set('current_user_id',id);
const clearCurrentUser = ()   => storage.remove('current_user_id');

// ── Auth ─────────────────────────────────────────────────
const loginUser = (username,password) => {
    const all = getAllUsers();
    const user = all.find(u => u.username===username && u.password===password);
    if (user) {
        // Normalizar roles de versiones anteriores
        const legacyTutor  = ['tutor','profesor','docente'];
        const legacyStudent = ['estudiante','alumno'];
        if (legacyTutor.includes(user.role))   { user.role='tutor';   saveUserData(user); }
        if (legacyStudent.includes(user.role)) { user.role='student'; saveUserData(user); }
        setCurrentUser(user.id);
        return getUserData(user.id);
    }
    return null;
};

const registerUser = (username,password,name,role='student',avatar='avatar1') => {
    // Roles válidos: 'student', 'teacher', 'parent'
    const validRoles = ['student','teacher','parent'];
    const normalizedRole = validRoles.includes(role) ? role : (role==='tutor'?'teacher':'student');
    const all=getAllUsers();
    if(all.find(u=>u.username===username))return{error:'Ese usuario ya existe'};
    // Asignar avatar por defecto según rol si no se especificó
    const _roleAvatars = normalizedRole === 'teacher' ? ['tutor1','tutor2','tutor3','tutor4'] :
                         normalizedRole === 'parent'  ? ['parent1','parent2','parent3','parent4'] :
                                                        ['student1','student2','student3','student4'];
    const _isGeneric = !avatar || avatar.startsWith('avatar');
    const finalAvatar = _isGeneric ? _roleAvatars[Math.floor(Math.random() * _roleAvatars.length)] : avatar;
    const u={ id:Date.now().toString(),username,password,name,avatar:finalAvatar,role:normalizedRole,
              points:0,level:1,achievements:[],featuredAchievement:null,streak:_bs(),moduleProgress:_bp() };
    all.push(u); storage.set('all_users',JSON.stringify(all)); setCurrentUser(u.id); return u;
};

// ── Puntos ───────────────────────────────────────────────
const addPoints = (userId,pts) => {
    const u=getUserData(userId); if(!u)return null;
    u.points=(u.points||0)+pts; u.level=Math.max(1,Math.floor(u.points/100)+1);
    saveUserData(u); return u;
};

// ── Progreso módulo ──────────────────────────────────────
const updateModuleProgress = (userId,module,correctas=null,total=null) => {
    const u=getUserData(userId); if(!u)return null;
    if(!u.moduleProgress)u.moduleProgress=_bp();
    u.moduleProgress[module]=(u.moduleProgress[module]||0)+1;
    if(!u.sessionHistory)u.sessionHistory={food:[],hygiene:[],activity:[]};
    if(!u.sessionHistory[module])u.sessionHistory[module]=[];
    if(correctas!==null&&total!==null){
        const entry={date:new Date().toISOString(),correctas,total};
        u.sessionHistory[module].push(entry);
        if(u.sessionHistory[module].length>20)u.sessionHistory[module]=u.sessionHistory[module].slice(-20);
    }
    saveUserData(u); return u;
};

// ── Logros ───────────────────────────────────────────────
const unlockAchievement = (userId,id) => {
    const u=getUserData(userId); if(!u)return null;
    if(!u.achievements)u.achievements=[];
    if(!u.achievements.includes(id)){
        u.achievements.push(id);
        const a=ACHIEVEMENTS.find(a=>a.id===id);
        if(a){u.points=(u.points||0)+a.points;u.level=Math.max(1,Math.floor(u.points/100)+1);}
        saveUserData(u);
    }
    return u;
};

const checkAndUnlockAchievements = (user) => {
    const n=[],mp=user.moduleProgress||_bp(),s=user.streak||{};
    const chk=(c,id)=>{ if(c&&!(user.achievements||[]).includes(id)){unlockAchievement(user.id,id);n.push(id);} };
    chk(mp.food>=1,'food_beginner'); chk(mp.food>=5,'food_expert'); chk(mp.food>=10,'food_master');
    chk(mp.hygiene>=1,'hygiene_beginner'); chk(mp.hygiene>=5,'hygiene_expert'); chk(mp.hygiene>=10,'hygiene_master');
    chk(mp.activity>=1,'activity_beginner'); chk(mp.activity>=5,'activity_expert'); chk(mp.activity>=10,'activity_master');
    chk((user.points||0)>=100,'points_100'); chk((user.points||0)>=500,'points_500'); chk((user.points||0)>=1000,'points_1000');
    chk(mp.food>=1&&mp.hygiene>=1&&mp.activity>=1,'all_modules');
    chk((s.current||0)>=7,'streak_7'); chk((s.current||0)>=15,'streak_15'); chk((s.current||0)>=30,'streak_30');
    return n;
};

// ── Racha ────────────────────────────────────────────────
const _ds  = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const _diff= (a,b) => { if(!a||!b)return 0; return Math.abs(Math.floor((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/(864e5))); };

const updateStreak = (userId) => {
    const u=getUserData(userId); if(!u)return{user:null,streakPoints:0,newAchievements:[]};
    if(!u.streak)u.streak=_bs();
    const today=_ds(new Date());
    if(u.streak.lastPlayDate===today)return{user:u,streakPoints:0,newAchievements:[]};
    const diff=_diff(u.streak.lastPlayDate,today);
    u.streak.current=(u.streak.lastPlayDate&&diff===1)?(u.streak.current||0)+1:1;
    if(u.streak.current>(u.streak.longest||0))u.streak.longest=u.streak.current;
    const sc=u.streak.current;
    const sp=sc<=7?sc*5:sc<=15?sc*10:sc*15;
    u.points=(u.points||0)+sp; u.level=Math.max(1,Math.floor(u.points/100)+1);
    u.streak.lastPlayDate=today;
    if(!Array.isArray(u.streak.daysCompleted))u.streak.daysCompleted=[];
    if(!u.streak.daysCompleted.includes(today)){
        u.streak.daysCompleted.push(today);
        if(u.streak.daysCompleted.length>30)u.streak.daysCompleted=u.streak.daysCompleted.slice(-30);
    }
    saveUserData(u);
    const na=checkAndUnlockAchievements(getUserData(userId));
    return{user:getUserData(userId),streakPoints:sp,newAchievements:na};
};

const getStreakCalendar = (user) => {
    const t=new Date();
    return Array.from({length:30},(_,i)=>{
        const d=new Date(t); d.setDate(d.getDate()-(29-i));
        const ds=_ds(d);
        return{date:ds,completed:(user.streak?.daysCompleted||[]).includes(ds)};
    });
};

const setFeaturedAchievement = (userId,id) => {
    const u=getUserData(userId); if(!u||!(u.achievements||[]).includes(id))return null;
    u.featuredAchievement=id; saveUserData(u); return u;
};
const updateUserAvatar = (userId,avatar) => {
    const u=getUserData(userId); if(!u)return null;
    u.avatar=avatar; saveUserData(u); return u;
};

// ══════════════════════════════════════════════════════════
//  SISTEMA DE SALONES
// ══════════════════════════════════════════════════════════
const _gc = () => { const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; return Array.from({length:6},()=>c[Math.floor(Math.random()*c.length)]).join(''); };

const getAllSalones     = () => { try{return JSON.parse(storage.get('habitos_salones')||'[]');}catch{return[];} };
const _saveSalones = (l)        => storage.set('habitos_salones',JSON.stringify(l));
const getSalonById      = (id) => getAllSalones().find(s=>s.id===id)||null;
const getSalonesDeTutor = (tutorId) => getAllSalones().filter(s=>s.tutorId===tutorId);

const crearSalon = (tutorId,nombre,descripcion='') => {
    const all=getAllSalones();
    const s={ id:Date.now().toString(),tutorId,nombre:nombre.trim(),descripcion:descripcion.trim(),
              codigo:_gc(),estudiantes:[],creadoEn:new Date().toISOString() };
    all.push(s); _saveSalones(all); return s;
};

const editarSalon = (salonId,cambios) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    all[idx]={...all[idx],...cambios}; _saveSalones(all); return all[idx];
};

const eliminarSalon = (salonId,tutorId) => {
    _saveSalones(getAllSalones().filter(s=>!(s.id===salonId&&s.tutorId===tutorId)));
};

const agregarEstudiante = (salonId,studentId) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    if(!all[idx].estudiantes.includes(studentId)){all[idx].estudiantes.push(studentId);_saveSalones(all);}
    return all[idx];
};

const agregarEstudianteConRol = (salonId,studentId,rolFamiliar) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    if(!all[idx].estudiantes.includes(studentId)){all[idx].estudiantes.push(studentId);}
    if(!all[idx].rolesFamiliares)all[idx].rolesFamiliares={};
    all[idx].rolesFamiliares[studentId]=rolFamiliar;
    _saveSalones(all);
    return all[idx];
};

const getRolFamiliar = (salonId,studentId) => {
    const s=getSalonById(salonId);
    return s?.rolesFamiliares?.[studentId]||null;
};

const removerEstudiante = (salonId,studentId) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    all[idx].estudiantes=all[idx].estudiantes.filter(id=>id!==studentId);
    _saveSalones(all); return all[idx];
};

const unirseConCodigo = (codigo,studentId) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.codigo===codigo.toUpperCase().trim());
    if(idx<0)return{error:'Código de salón no encontrado'};
    if(all[idx].estudiantes.includes(studentId))return{error:'Ya estás en este salón'};
    all[idx].estudiantes.push(studentId); _saveSalones(all); return{salon:all[idx]};
};

const getEstudiantesDeSalon = (salonId) => {
    const s=getSalonById(salonId); if(!s)return[];
    return s.estudiantes.map(id=>getUserData(id)).filter(Boolean);
};

const getEstadisticasEstudiante = (userId) => {
    const u=getUserData(userId); if(!u)return null;
    const mp=u.moduleProgress||_bp(), st=u.streak||_bs();
    const sh=u.sessionHistory||{food:[],hygiene:[],activity:[]};
    return {
        id:u.id, name:u.name, username:u.username, avatar:u.avatar,
        points:u.points||0, level:u.level||1,
        logros:(u.achievements||[]).length, totalLogros:ACHIEVEMENTS.length,
        food:mp.food||0, hygiene:mp.hygiene||0, activity:mp.activity||0,
        rachaActual:st.current||0, rachaMasLarga:st.longest||0,
        diasActivos:(st.daysCompleted||[]).length, ultimaVez:st.lastPlayDate||null,
        sessionHistory:sh,
    };
};


// src/scenes/BaseScene.js — Componentes reutilizables


// ── Renderiza avatar: personaje ilustrado si existe, sino inicial con círculo ──
// Los avatares de personaje (student*, tutor*, parent*) se muestran directamente.
// Los genéricos (avatar*) se muestran con máscara circular.
window.renderAvatar = function(scene, x, y, size, user) {
    const key = user?.avatar || '';
    if (key && scene.textures.exists(key)) {
        const isCharacter = key.startsWith('student') || key.startsWith('tutor') || key.startsWith('parent');
        const img = scene.add.image(x, y, key)
            .setDisplaySize(size, size)
            .setOrigin(0.5);
        if (!isCharacter) {
            // Avatares genéricos: aplicar máscara circular
            const mask = scene.add.graphics();
            mask.fillStyle(0xffffff);
            mask.fillCircle(x, y, size / 2);
            img.setMask(mask.createGeometryMask());
        }
        return img;
    }
    // Fallback: círculo morado con inicial
    const g = scene.add.graphics();
    g.fillStyle(0x7c3aed, 1);
    g.fillCircle(x, y, size / 2);
    const inicial = (user?.name || user?.username || '?')[0].toUpperCase();
    const t = scene.add.text(x, y, inicial, {
        fontSize: Math.round(size * 0.42) + 'px', fontFamily: F,
        fontStyle: 'bold', fill: '#fff'
    }).setOrigin(0.5);
    return t;
}

class BaseScene extends Phaser.Scene {

    // ── Precargar todos los avatares ──────────────────────────
    preloadAvatars() {
        // Avatares genéricos (fallback)
        for (let i = 1; i <= 4; i++) {
            if (!this.textures.exists(`avatar${i}`))
                this.load.image(`avatar${i}`, `assets/images/avatar${i}.png`);
        }
        // Personajes ilustrados por rol
        for (let i = 1; i <= 4; i++) {
            if (!this.textures.exists(`student${i}`)) this.load.image(`student${i}`, `assets/images/student${i}.png`);
            if (!this.textures.exists(`tutor${i}`))   this.load.image(`tutor${i}`,   `assets/images/tutor${i}.png`);
            if (!this.textures.exists(`parent${i}`))  this.load.image(`parent${i}`,  `assets/images/parent${i}.png`);
        }
    }

    // ── Fondo degradado ─────────────────────────────────────
    crearFondo(c1 = 0xf5eeff, c2 = 0xffe8f8) {
        const bg = this.add.graphics();
        bg.fillGradientStyle(c1, c1, c2, c2, 1);
        bg.fillRect(0, 0, this.scale.width, this.scale.height);
    }

    // ── Topbar estándar ─────────────────────────────────────
    crearTopbar(usuario, onPerfil, onSalir) {
        const W = this.scale.width;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x16a34a, 0x16a34a, 0x22c55e, 0x22c55e, 1);
        bg.fillRect(0, 0, W, 68);

        // Logo
        this.add.text(58, 34, '✦', { fontSize: '28px', fill: '#fbbf24', fontFamily: 'Arial' }).setOrigin(0.5);
        this.add.text(82, 21, 'Hábitos Saludables', { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
        this.add.text(82, 43, '¡Aprende jugando!', { fontSize: '11px', fontFamily: F, fill: 'rgba(255,255,255,.8)' });

        // Puntos
        const pts   = usuario?.points || 0;
        const nivel = usuario?.level  || 1;
        const pBg = this.add.graphics();
        pBg.fillStyle(0xfbbf24, 1); pBg.fillRoundedRect(W - 514, 16, 82, 36, 18);
        this.add.text(W - 473, 34, `★ ${pts}`, { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);

        const nBg = this.add.graphics();
        nBg.fillStyle(0x6366f1, 1); nBg.fillRoundedRect(W - 424, 16, 92, 36, 18);
        this.add.text(W - 408, 21, 'Nivel', { fontSize: '10px', fill: '#c7d2fe', fontFamily: F });
        this.add.text(W - 408, 33, `${nivel}`, { fontSize: '18px', fill: '#fff', fontFamily: F, fontStyle: 'bold' });

        const prog = pts % 100;
        const prBg = this.add.graphics();
        prBg.fillStyle(0xffffff, 0.2); prBg.fillRoundedRect(W - 324, 28, 112, 12, 6);
        if (prog > 0) {
            const pF = this.add.graphics();
            pF.fillStyle(0xffffff, 0.9); pF.fillRoundedRect(W - 324, 28, (prog / 100) * 112, 12, 6);
        }
        this.add.text(W - 324, 14, `${100 - prog} pts → nivel ${nivel + 1}`, { fontSize: '10px', fill: 'rgba(255,255,255,.85)', fontFamily: F });

        // Avatar + nombre (botón perfil)
        const nombre = (usuario?.name || '').split(' ')[0];
        window.renderAvatar(this, W - 194, 34, 36, usuario);
        const pLabel = this.add.text(W - 164, 34, nombre, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0, 0.5);
        const pZone  = this.add.graphics();
        pZone.fillStyle(0xffffff, 0); pZone.fillRoundedRect(W - 214, 14, 120, 40, 20);
        const pHit = this.add.rectangle(W - 154, 34, 120, 40, 0, 0).setInteractive({ useHandCursor: true });
        pHit.on('pointerover',  () => { pZone.clear(); pZone.fillStyle(0xffffff, 0.18); pZone.fillRoundedRect(W - 214, 14, 120, 40, 20); this.tweens.add({ targets: pLabel, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        pHit.on('pointerout',   () => { pZone.clear(); pZone.fillStyle(0xffffff, 0);    pZone.fillRoundedRect(W - 214, 14, 120, 40, 20); this.tweens.add({ targets: pLabel, scaleX: 1, scaleY: 1, duration: 110 }); });
        pHit.on('pointerdown',  () => { this.tweens.add({ targets: pLabel, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: () => { if (onPerfil) onPerfil(); } }); });

        // Botón Salir
        const sBg = this.add.graphics();
        sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W - 84, 14, 74, 40, 20);
        const sT = this.add.text(W - 47, 34, '→ Salir', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const sH = this.add.rectangle(W - 47, 34, 74, 40, 0, 0).setInteractive({ useHandCursor: true });
        sH.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xdc2626, 1); sBg.fillRoundedRect(W - 84, 14, 74, 40, 20); this.tweens.add({ targets: sT, scaleX: 1.06, scaleY: 1.06, duration: 100 }); });
        sH.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W - 84, 14, 74, 40, 20); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 100 }); });
        sH.on('pointerdown',  () => { this.tweens.add({ targets: sT, scaleX: 0.88, scaleY: 0.88, duration: 70, yoyo: true, onComplete: () => { if (onSalir) onSalir(); } }); });
    }

    // ── Botón volver ────────────────────────────────────────
    crearBotonVolver(x, y, label, callback) {
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0x86efac, 1); bg.fillRoundedRect(x, y, 170, 38, 19);
        const t = this.add.text(x + 85, y + 19, `← ${label}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        const hit = this.add.rectangle(x + 85, y + 19, 170, 38, 0, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => this.tweens.add({ targets: t, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: callback }));
        hit.on('pointerover', () => { bg.clear(); bg.fillStyle(0xf0fdf4, 1); bg.lineStyle(2, 0x16a34a, 1); bg.fillRoundedRect(x, y, 170, 38, 19); });
        hit.on('pointerout',  () => { bg.clear(); bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0x86efac, 1); bg.fillRoundedRect(x, y, 170, 38, 19); });
    }

    // ── Toast ────────────────────────────────────────────────
    mostrarToast(texto, color = 0x16a34a, duracion = 2800) {
        if (this._toast) this._toast.destroy();
        const W = this.scale.width, H = this.scale.height;
        const c = this.add.container(0, 0);
        const bg = this.add.graphics();
        bg.fillStyle(color, 0.95); bg.fillRoundedRect(W / 2 - 244, H - 76, 488, 50, 25);
        const t = this.add.text(W / 2, H - 51, texto, { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff', align: 'center' }).setOrigin(0.5);
        c.add([bg, t]); c.setAlpha(0); c.y = 10; this._toast = c;
        this.tweens.add({ targets: c, alpha: 1, y: 0, duration: 260, ease: 'Back.easeOut', onComplete: () => {
            this.time.delayedCall(duracion, () => this.tweens.add({ targets: c, alpha: 0, y: -10, duration: 280, onComplete: () => c.destroy() }));
        }});
    }

    // ── Popup logro desbloqueado ─────────────────────────────
    mostrarLogro(achievement) {
        if (!achievement) return;
        const W = this.scale.width, H = this.scale.height;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.5); ov.fillRect(0, 0, W, H); ov.setDepth(100);
        const popup = this.add.container(W / 2, H / 2); popup.setDepth(101); popup.setAlpha(0);
        const bg  = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(-180, -120, 360, 240, 20);
        const hdr = this.add.graphics(); hdr.fillGradientStyle(0xf59e0b, 0xf59e0b, 0xfbbf24, 0xfbbf24, 1); hdr.fillRoundedRect(-180, -120, 360, 96, 20);
        const hFx = this.add.graphics(); hFx.fillStyle(0xfbbf24, 1); hFx.fillRect(-180, -36, 360, 20);
        const ico = this.add.text(0, -60, achievement.icon, { fontSize: '46px' }).setOrigin(0.5);
        const t1  = this.add.text(0, 30,  '¡Logro desbloqueado!', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#78350f' }).setOrigin(0.5);
        const t2  = this.add.text(0, 58,  achievement.name,       { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#1f1235' }).setOrigin(0.5);
        const t3  = this.add.text(0, 88,  `+${achievement.points} puntos`, { fontSize: '16px', fontFamily: F, fill: '#7c3aed', fontStyle: 'bold' }).setOrigin(0.5);
        popup.add([bg, hFx, hdr, ico, t1, t2, t3]);
        this.tweens.add({ targets: popup, alpha: 1, scaleX: { from: 0.5, to: 1 }, scaleY: { from: 0.5, to: 1 }, duration: 380, ease: 'Back.easeOut' });
        this.tweens.add({ targets: ico, angle: { from: -15, to: 15 }, duration: 280, ease: 'Sine.easeInOut', yoyo: true, repeat: 2 });
        this.time.delayedCall(2800, () => {
            this.tweens.add({ targets: [popup, ov], alpha: 0, duration: 300, onComplete: () => { popup.destroy(); ov.destroy(); } });
        });
    }

    // ── Pantalla de resultado de módulo ─────────────────────
    mostrarResultado({ W, H, pts, correctas, total, color, onReintentar, onMenu }) {
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.5); ov.fillRect(0, 0, W, H); ov.setDepth(80);
        const popup = this.add.container(W / 2, H / 2); popup.setDepth(81); popup.setAlpha(0);
        const bg  = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(-220, -200, 440, 400, 24);
        const hdr = this.add.graphics(); hdr.fillStyle(color, 1); hdr.fillRoundedRect(-220, -200, 440, 112, 24);
        const hFx = this.add.graphics(); hFx.fillStyle(color, 1); hFx.fillRect(-220, -100, 440, 14);
        const ico = this.add.text(0, -160, pts > 0 ? '🏆' : '😊', { fontSize: '46px' }).setOrigin(0.5);
        const tit = this.add.text(0, -112, pts > 0 ? '¡Excelente trabajo!' : '¡Sigue intentando!', { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const pT  = this.add.text(0, -44,  `+${pts} puntos`, { fontSize: '38px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        const cT  = this.add.text(0,  6,   `${correctas} de ${total} correctas`, { fontSize: '16px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);
        const bBg = this.add.graphics(); bBg.fillStyle(0xe5e7eb, 1); bBg.fillRoundedRect(-150, 34, 300, 14, 7);
        if (total > 0) {
            const bF = this.add.graphics(); bF.fillStyle(color, 1); bF.fillRoundedRect(-150, 34, (correctas / total) * 300, 14, 7); popup.add(bF);
        }
        popup.add([bg, hFx, hdr, ico, tit, pT, cT, bBg]);
        this._btnResultado(popup, ov, -95, 90, '🔄 Reintentar', 0x16a34a, 0x15803d, onReintentar);
        this._btnResultado(popup, ov,  95, 90, '🏠 Menú',       0x22c55e, 0x16a34a, onMenu);
        this.tweens.add({ targets: popup, alpha: 1, scaleX: { from: 0.6, to: 1 }, scaleY: { from: 0.6, to: 1 }, duration: 400, ease: 'Back.easeOut' });
        if (pts > 0) this.tweens.add({ targets: ico, y: '-=8', duration: 600, ease: 'Sine.easeInOut', yoyo: true, repeat: 2 });
    }

    _btnResultado(popup, ov, cx, cy, label, c1, c2, cb, w = 162, h = 44) {
        const g  = this.add.graphics(); g.fillStyle(c1, 1); g.fillRoundedRect(cx - w/2, cy - h/2, w, h, h/2);
        const t  = this.add.text(cx, cy, label, { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const hit= this.add.rectangle(cx, cy, w, h, 0, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerover',  () => { g.clear(); g.fillStyle(c2, 1); g.fillRoundedRect(cx-w/2, cy-h/2, w, h, h/2); });
        hit.on('pointerout',   () => { g.clear(); g.fillStyle(c1, 1); g.fillRoundedRect(cx-w/2, cy-h/2, w, h, h/2); });
        hit.on('pointerdown',  () => { this.tweens.add({ targets: [g, t], scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => { popup.destroy(); ov.destroy(); if (cb) cb(); } }); });
        popup.add([g, t, hit]);
    }

    // ── Dibuja un sapito con Graphics (reemplaza emojis mascota) ─
    _dibujarSapito(cx, cy, size=1, container=null) {
        const s = size;
        const add = (obj) => { if(container) container.add(obj); return obj; };

        // Cuerpo verde
        const body = add(this.add.graphics());
        body.fillStyle(0x4ade80, 1);
        body.fillEllipse(cx, cy+4*s, 54*s, 42*s);

        // Panza clara
        const belly = add(this.add.graphics());
        belly.fillStyle(0xbbf7d0, 1);
        belly.fillEllipse(cx, cy+8*s, 34*s, 26*s);

        // Cabeza
        const head = add(this.add.graphics());
        head.fillStyle(0x4ade80, 1);
        head.fillCircle(cx, cy-8*s, 24*s);

        // Ojos blancos
        const eyeL = add(this.add.graphics());
        eyeL.fillStyle(0xffffff, 1); eyeL.fillCircle(cx-11*s, cy-16*s, 9*s);
        const eyeR = add(this.add.graphics());
        eyeR.fillStyle(0xffffff, 1); eyeR.fillCircle(cx+11*s, cy-16*s, 9*s);

        // Pupilas
        const pupL = add(this.add.graphics());
        pupL.fillStyle(0x1e293b, 1); pupL.fillCircle(cx-10*s, cy-15*s, 4*s);
        const pupR = add(this.add.graphics());
        pupR.fillStyle(0x1e293b, 1); pupR.fillCircle(cx+12*s, cy-15*s, 4*s);

        // Brillo ojos
        const shL = add(this.add.graphics());
        shL.fillStyle(0xffffff, 1); shL.fillCircle(cx-9*s, cy-17*s, 2*s);
        const shR = add(this.add.graphics());
        shR.fillStyle(0xffffff, 1); shR.fillCircle(cx+13*s, cy-17*s, 2*s);

        // Boca sonriente
        const mouth = add(this.add.graphics());
        mouth.lineStyle(2.5*s, 0x166534, 1);
        mouth.beginPath();
        mouth.arc(cx, cy-4*s, 10*s, 0.2, Math.PI-0.2, false);
        mouth.strokePath();

        // Patas delanteras
        const legL = add(this.add.graphics());
        legL.fillStyle(0x4ade80, 1);
        legL.fillEllipse(cx-28*s, cy+10*s, 18*s, 10*s);
        const legR = add(this.add.graphics());
        legR.fillStyle(0x4ade80, 1);
        legR.fillEllipse(cx+28*s, cy+10*s, 18*s, 10*s);

        // Patas traseras
        const backL = add(this.add.graphics());
        backL.fillStyle(0x22c55e, 1);
        backL.fillEllipse(cx-24*s, cy+22*s, 22*s, 12*s);
        const backR = add(this.add.graphics());
        backR.fillStyle(0x22c55e, 1);
        backR.fillEllipse(cx+24*s, cy+22*s, 22*s, 12*s);

        // Manchas decorativas
        const spot = add(this.add.graphics());
        spot.fillStyle(0x22c55e, 0.5); spot.fillCircle(cx+8*s, cy+4*s, 6*s);
        spot.fillCircle(cx-6*s, cy+10*s, 4*s);

        // Retorna array de objetos para poder hacer tweens
        return [body, belly, head, eyeL, eyeR, pupL, pupR, shL, shR, mouth, legL, legR, backL, backR, spot];
    }

    // ── Cuadro de diálogo del sapito ─────────────────────────────
    // cx,cy = posicion del sapito existente. La burbuja aparece a su izquierda.
    // NO dibuja un segundo sapito — usa el decorativo ya visible en escena.
    _dialogoSapito(cx, cy, mensaje, correcto, container=null) {
        const W = this.scale.width;
        const add = (obj) => { if(container) container.add(obj); return obj; };

        // Burbuja a la izquierda del sapito
        const bw = Math.min(280, W - 200), bh = 80;
        const gap = 18;
        const bx  = cx - bw - gap - 40;
        const by  = cy - bh / 2 - 20;

        const bubBg = add(this.add.graphics());
        bubBg.fillStyle(correcto ? 0xf0fdf4 : 0xfef2f2, 1);
        bubBg.lineStyle(2.5, correcto ? 0x16a34a : 0xdc2626, 1);
        bubBg.fillRoundedRect(bx, by, bw, bh, 14);

        // Cola apuntando a la derecha (hacia el sapito)
        const tailX = bx + bw;
        const tailY = by + bh / 2;
        const tail = add(this.add.graphics());
        tail.fillStyle(correcto ? 0xf0fdf4 : 0xfef2f2, 1);
        tail.fillTriangle(tailX, tailY - 9, tailX, tailY + 9, tailX + 14, tailY);
        const tailB = add(this.add.graphics());
        tailB.lineStyle(2.5, correcto ? 0x16a34a : 0xdc2626, 1);
        tailB.beginPath();
        tailB.moveTo(tailX, tailY - 9); tailB.lineTo(tailX + 14, tailY); tailB.lineTo(tailX, tailY + 9);
        tailB.strokePath();

        // Icono
        const icoT = add(this.add.text(bx + 12, by + bh / 2, correcto ? '✅' : '💡', { fontSize: '18px' }).setOrigin(0, 0.5));

        // Texto
        const msgT = add(this.add.text(bx + 40, by + bh / 2, mensaje, {
            fontSize: '11px', fontFamily: F,
            fill: correcto ? '#166534' : '#991b1b',
            wordWrap: { width: bw - 52 }
        }).setOrigin(0, 0.5));

        // Animacion entrada (solo burbuja, sin sapito nuevo)
        const all = [bubBg, tail, tailB, icoT, msgT];
        all.forEach(o => o.setAlpha(0));
        this.tweens.add({ targets: all, alpha: 1, duration: 280 });

        return all;
    }

}


// src/scenes/LoginScene.js — Login con localStorage userData

class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
        this.tabActual = 'login';
        this.rolSeleccionado = 'student';
        this._cx=0; this._cy=0; this._cardW=480;
    }

    preload() {
        for (let i = 1; i <= 4; i++) {
            if (!this.textures.exists(`student${i}`)) this.load.image(`student${i}`, `assets/images/student${i}.png`);
            if (!this.textures.exists(`tutor${i}`))   this.load.image(`tutor${i}`,   `assets/images/tutor${i}.png`);
            if (!this.textures.exists(`parent${i}`))  this.load.image(`parent${i}`,  `assets/images/parent${i}.png`);
        }
    }

    create() {
        const W = this.scale.width, H = this.scale.height;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0xf5eeff,0xf5eeff,0xffe8f8,0xf0e8ff,1);
        bg.fillRect(0,0,W,H);

        const cardW=480, cardH=780;
        const cx=(W-cardW)/2, cy=(H-cardH)/2;
        this._cx=cx; this._cy=cy; this._cardW=cardW;

        const cardBg=this.add.graphics();
        cardBg.fillStyle(0xffffff,1); cardBg.fillRoundedRect(cx,cy,cardW,cardH,24);

        this.crearEstrella(W/2,cy+82);
        this.add.text(W/2,cy+148,'Hábitos Saludables',{fontSize:'26px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#7c3aed',align:'center'}).setOrigin(0.5);
        this.add.text(W/2,cy+180,'¡Aprende y diviértete!',{fontSize:'15px',fontFamily:'"Segoe UI",Arial',fill:'#a78bda',align:'center'}).setOrigin(0.5);

        this.crearTabs(W,cx,cy,cardW);
        this.contenedorForm=this.add.container(0,0);
        this.mostrarFormulario();
    }

    crearEstrella(x,y) {
        const g=this.add.graphics();
        g.fillStyle(0xfbbf24,1);
        this.dibujarEstrellaPath(g,x,y,5,28,14);
        g.fillStyle(0xfde68a,1);
        [{dx:-32,dy:-10,r:4},{dx:32,dy:-8,r:3},{dx:-18,dy:30,r:3},{dx:22,dy:26,r:4}].forEach(d=>g.fillCircle(x+d.dx,y+d.dy,d.r));
        this.tweens.add({targets:g,y:-3,duration:1800,ease:'Sine.easeInOut',yoyo:true,repeat:-1});
        this.tweens.add({targets:g,angle:12,duration:2200,ease:'Sine.easeInOut',yoyo:true,repeat:-1});
    }
    dibujarEstrellaPath(g,cx,cy,p,R,r){
        const pts=[];
        for(let i=0;i<p*2;i++){const rad=i%2===0?R:r;const a=(i*Math.PI)/p-Math.PI/2;pts.push({x:cx+rad*Math.cos(a),y:cy+rad*Math.sin(a)});}
        g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(p2=>g.lineTo(p2.x,p2.y));g.closePath();g.fillPath();
    }

    crearTabs(W,cx,cy,cardW) {
        const tY=cy+204,tX=cx+24,tW=cardW-48;
        const tabBg=this.add.graphics(); tabBg.fillStyle(0xede9fe,1); tabBg.fillRoundedRect(tX,tY,tW,48,24);
        this.tabLoginBg=this.add.graphics();
        this.tabRegBg=this.add.graphics();
        this.tabLoginText=this.add.text(cx+cardW/4,tY+24,'→  Iniciar Sesión',{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff'}).setOrigin(0.5).setInteractive({useHandCursor:true});
        this.tabRegText=this.add.text(cx+cardW*3/4,tY+24,'⊕  Registrarse',{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#7c3aed'}).setOrigin(0.5).setInteractive({useHandCursor:true});
        this.tabLoginText.on('pointerdown',()=>this.cambiarTab('login'));
        this.tabRegText.on('pointerdown',()=>this.cambiarTab('registro'));
        this._tabX=tX;this._tabY=tY;this._tabW=tW;
        this.actualizarTabs();
    }

    actualizarTabs() {
        const eL=this.tabActual==='login',tX=this._tabX,tY=this._tabY,tW=this._tabW;
        this.tabLoginBg.clear();
        if(eL){this.tabLoginBg.fillStyle(0x7c3aed,1);this.tabLoginBg.fillRoundedRect(tX+2,tY+2,tW/2-2,44,22);}
        this.tabRegBg.clear();
        if(!eL){this.tabRegBg.fillStyle(0x7c3aed,1);this.tabRegBg.fillRoundedRect(tX+tW/2,tY+2,tW/2-2,44,22);}
        this.tabLoginText.setStyle({fill:eL?'#fff':'#7c3aed'});
        this.tabRegText.setStyle({fill:!eL?'#fff':'#7c3aed'});
    }

    cambiarTab(tab) {
        if(this.tabActual===tab) return;
        this.tabActual=tab; this.rolSeleccionado='student';
        this.actualizarTabs();
        this.tweens.add({targets:this.contenedorForm,alpha:0,x:tab==='registro'?-20:20,duration:130,onComplete:()=>{
            this.contenedorForm.destroy();
            this.contenedorForm=this.add.container(0,0);
            this.contenedorForm.setAlpha(0);
            this.mostrarFormulario();
            this.tweens.add({targets:this.contenedorForm,alpha:1,x:0,duration:180});
        }});
    }

    mostrarFormulario() {
        if(this.tabActual==='login') this.crearFormLogin();
        else this.crearFormRegistro();
    }

    crearFormLogin() {
        const cx=this._cx,cy=this._cy,cW=this._cardW;
        const fX=cx+24,fW=cW-48;
        let y=cy+272;
        this.etiqueta('👤  Usuario',fX,y);y+=28;
        const iUser=this.campo(fX,y,fW,46,'Escribe tu usuario');y+=62;
        this.etiqueta('🔒  Contraseña',fX,y);y+=28;
        const iPass=this.campo(fX,y,fW,46,'Escribe tu contraseña',true);y+=70;
        this.botonPrincipal(fX,fW,cx,cW,y,'Entrar',()=>{
            const u=iUser.node.value.trim(),p=iPass.node.value.trim();
            if(!u||!p){this.toast('⚠️ Completa todos los campos',0xdc2626);return;}
            const user=loginUser(u,p);
            if(user){
                this.toast(`✓ ¡Bienvenido, ${user.name}!`,0x16a34a);
                const destino = isTutor(user) ? 'TutorScene' : 'MenuScene';
                this.time.delayedCall(900,()=>this.scene.start(destino));
            }
            else{this.toast('❌ Usuario o contraseña incorrectos',0xdc2626);}
        });y+=62;

    }

    crearFormRegistro() {
        const cx=this._cx,cy=this._cy,cW=this._cardW;
        const fX=cx+24,fW=cW-48;
        let y=cy+272;
        this.etiqueta('👤  Usuario',fX,y);y+=28;
        const iUser=this.campo(fX,y,fW,46,'Elige un nombre de usuario');y+=50;
        this.hint('Mínimo 3 caracteres',fX,y);y+=22;
        this.etiqueta('🔒  Contraseña',fX,y);y+=28;
        const iPass=this.campo(fX,y,fW,46,'Crea una contraseña',true);y+=50;
        this.hint('Mínimo 4 caracteres',fX,y);y+=22;
        this.etiqueta('👤  Nombre completo',fX,y);y+=28;
        const iNom=this.campo(fX,y,fW,46,'Tu nombre completo');y+=62;
        const rLabel=this.add.text(fX+4,y,'Rol:',{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#4b2d8a'});
        this.contenedorForm.add(rLabel);y+=24;
        this.selectorRol(fX,fW,y);y+=84;
        this.botonPrincipal(fX,fW,cx,cW,y,'Crear cuenta',()=>{
            const u=iUser.node.value.trim(),p=iPass.node.value.trim(),n=iNom.node.value.trim();
            if(!u||!p||!n){this.toast('⚠️ Completa todos los campos',0xdc2626);return;}
            if(u.length<3){this.toast('⚠️ Usuario: mínimo 3 caracteres',0xdc2626);return;}
            if(p.length<4){this.toast('⚠️ Contraseña: mínimo 4 caracteres',0xdc2626);return;}
            const role = this.rolSeleccionado; // 'student', 'teacher' o 'parent'
            const res=registerUser(u,p,n,role,'avatar1');
            if(res.error){this.toast(`❌ ${res.error}`,0xdc2626);}
            else{this.toast('✓ ¡Cuenta creada! Ahora inicia sesión',0x16a34a);this.time.delayedCall(1200,()=>this.cambiarTab('login'));}
        });
    }

    // ── Helpers UI ────────────────────────────────────────────
    etiqueta(texto,x,y) {
        const t=this.add.text(x+4,y,texto,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#4b2d8a'});
        this.contenedorForm.add(t);
    }
    hint(texto,x,y) {
        const t=this.add.text(x+4,y,texto,{fontSize:'11px',fontFamily:'"Segoe UI",Arial',fill:'#a78bda'});
        this.contenedorForm.add(t);
    }
    separador(fX,fW,y) {
        const sep=this.add.graphics(); sep.lineStyle(1,0xddd8f0,1); sep.lineBetween(fX,y+4,fX+fW,y+4);
        this.contenedorForm.add(sep);
    }

    campo(x,y,w,h,placeholder,isPass=false) {
        const bg=this.add.graphics(); bg.lineStyle(1.5,0xd8b4fe,1); bg.fillStyle(0xfdfcff,1); bg.fillRoundedRect(x,y,w,h,12);
        this.contenedorForm.add(bg);
        const inp=this.add.dom(x+w/2,y+h/2,'input',{width:(w-24)+'px',height:(h-10)+'px',border:'none',outline:'none',background:'transparent',fontSize:'14px',fontFamily:'"Segoe UI",Arial,sans-serif',color:'#3b1f7a',padding:'0 8px'});
        inp.node.type=isPass?'password':'text'; inp.node.placeholder=placeholder;
        if(!document.head.querySelector('[data-hs-style]')){const s=document.createElement('style');s.setAttribute('data-hs-style','1');s.textContent='input::placeholder{color:#c4b5d8;}';document.head.appendChild(s);}
        inp.node.addEventListener('focus',()=>{bg.clear();bg.lineStyle(2,0x7c3aed,1);bg.fillStyle(0xfaf5ff,1);bg.fillRoundedRect(x,y,w,h,12);});
        inp.node.addEventListener('blur', ()=>{bg.clear();bg.lineStyle(1.5,0xd8b4fe,1);bg.fillStyle(0xfdfcff,1);bg.fillRoundedRect(x,y,w,h,12);});
        this.contenedorForm.add(inp);
        return inp;
    }

    botonPrincipal(fX,fW,cx,cW,y,label,cb) {
        const bBg=this.add.graphics(); bBg.fillStyle(0x7c3aed,1); bBg.fillRoundedRect(fX,y,fW,50,25);
        const ov=this.add.graphics(); ov.fillStyle(0xec4899,0.45); ov.fillRoundedRect(fX+fW/2,y,fW/2,50,{tl:0,tr:25,bl:0,br:25});
        const t=this.add.text(cx+cW/2,y+25,label,{fontSize:'17px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff',align:'center'}).setOrigin(0.5);
        const hit=this.add.rectangle(cx+cW/2,y+25,fW,50,0,0).setInteractive({useHandCursor:true});
        hit.on('pointerover',()=>this.tweens.add({targets:[bBg,ov,t],scaleX:1.02,scaleY:1.02,duration:100}));
        hit.on('pointerout', ()=>this.tweens.add({targets:[bBg,ov,t],scaleX:1,scaleY:1,duration:100}));
        hit.on('pointerdown',()=>{this.tweens.add({targets:[bBg,ov,t],scaleX:0.97,scaleY:0.97,duration:80,yoyo:true});cb();});
        this.contenedorForm.add([bBg,ov,t,hit]);
    }



    selectorRol(fX,fW,y) {
        const roles=[{id:'student',label:'Estudiante',e:'📖'},{id:'teacher',label:'Profesor',e:'👨‍🏫'},{id:'parent',label:'Padre/Madre',e:'🏠'}];
        const bW=(fW-20)/3;
        this._rolesBgs=[];
        roles.forEach((r,i)=>{
            const bx=fX+i*(bW+10),by=y;
            const bg=this.add.graphics(); this._rolesBgs.push({bg,bx,by,bW,id:r.id});
            this.contenedorForm.add(bg);
            this.dibujarRol(bg,bx,by,bW,60,r.id===this.rolSeleccionado);
            const e=this.add.text(bx+bW/2,by+20,r.e,{fontSize:'20px',fontFamily:'"Segoe UI",Arial'}).setOrigin(0.5);
            const l=this.add.text(bx+bW/2,by+45,r.label,{fontSize:r.id==='parent'?'10px':'12px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:r.id===this.rolSeleccionado?'#7c3aed':'#6b7280'}).setOrigin(0.5);
            this.contenedorForm.add([e,l]);
            const hit=this.add.rectangle(bx+bW/2,by+30,bW,60,0,0).setInteractive({useHandCursor:true});
            this.contenedorForm.add(hit);
            hit.on('pointerdown',()=>{this.rolSeleccionado=r.id;this._rolesBgs.forEach(rb=>{rb.bg.clear();this.dibujarRol(rb.bg,rb.bx,rb.by,rb.bW,60,rb.id===this.rolSeleccionado);});l.setStyle({fill:'#7c3aed'});});
        });
    }
    dibujarRol(g,x,y,w,h,activo){g.fillStyle(activo?0xf0e8ff:0xfafafa,1);g.lineStyle(activo?2:1,activo?0x7c3aed:0xe5e7eb,1);g.fillRoundedRect(x,y,w,h,10);}

    toast(texto,color=0x16a34a) {
        if(this._toastObj) this._toastObj.destroy();
        const W=this.scale.width,H=this.scale.height;
        const c=this.add.container(0,0);
        const bg=this.add.graphics(); bg.fillStyle(color,0.93); bg.fillRoundedRect(W/2-230,H-78,460,48,12);
        const t=this.add.text(W/2,H-54,texto,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff',align:'center'}).setOrigin(0.5);
        c.add([bg,t]); c.setAlpha(0); this._toastObj=c;
        this.tweens.add({targets:c,alpha:1,duration:200,onComplete:()=>{
            this.time.delayedCall(2600,()=>this.tweens.add({targets:c,alpha:0,duration:280,onComplete:()=>c.destroy()}));
        }});
    }
}


// src/scenes/MenuScene.js

class MenuScene extends BaseScene {
    constructor() { super({ key: 'MenuScene' }); }

    preload() { this.preloadAvatars(); }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user) { this.scene.start('LoginScene'); return; }
        // Los tutores van a su panel dedicado
        if (isTutor(this.user)) { this.scene.start('TutorScene'); return; }
        // Fondo verde claro para estudiantes
        this.crearFondo(0xf0fdf4, 0xecfdf5);
        // Topbar verde para estudiantes
        this._topbarVerde(W);
        this.crearContenido(W, H);
    }

    _topbarVerde(W) {
        const u = this.user;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x16a34a, 0x16a34a, 0x22c55e, 0x22c55e, 1);
        bg.fillRect(0, 0, W, 68);
        this.add.text(58,34,'✦',{fontSize:'28px',fill:'#fbbf24',fontFamily:'Arial'}).setOrigin(0.5);
        this.add.text(82,21,'Hábitos Saludables',{fontSize:'18px',fontFamily:F,fontStyle:'bold',fill:'#fff'});
        this.add.text(82,43,'¡Aprende jugando!',{fontSize:'11px',fontFamily:F,fill:'rgba(255,255,255,.85)'});
        const pts=u.points||0, nivel=u.level||1;
        const pBg=this.add.graphics(); pBg.fillStyle(0xfbbf24,1); pBg.fillRoundedRect(W-514,16,82,36,18);
        this.add.text(W-473,34,`★ ${pts}`,{fontSize:'15px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const nBg=this.add.graphics(); nBg.fillStyle(0x166534,1); nBg.fillRoundedRect(W-424,16,92,36,18);
        this.add.text(W-408,21,'Nivel',{fontSize:'10px',fill:'#bbf7d0',fontFamily:F});
        this.add.text(W-408,33,`${nivel}`,{fontSize:'18px',fill:'#fff',fontFamily:F,fontStyle:'bold'});
        const prog=pts%100;
        const prBg=this.add.graphics(); prBg.fillStyle(0xffffff,0.25); prBg.fillRoundedRect(W-324,28,112,12,6);
        if(prog>0){const pF=this.add.graphics();pF.fillStyle(0xffffff,0.9);pF.fillRoundedRect(W-324,28,(prog/100)*112,12,6);}
        this.add.text(W-324,14,`${100-prog} pts → nivel ${nivel+1}`,{fontSize:'10px',fill:'rgba(255,255,255,.9)',fontFamily:F});
        const nombre=(u.name||'').split(' ')[0];
        window.renderAvatar(this,W-194,34,36,u);
        const pLabel=this.add.text(W-164,34,nombre,{fontSize:'13px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0,0.5);
        const pZone=this.add.graphics(); pZone.fillStyle(0xffffff,0); pZone.fillRoundedRect(W-214,14,120,40,20);
        const pHit=this.add.rectangle(W-154,34,120,40,0,0).setInteractive({useHandCursor:true});
        pHit.on('pointerover',()=>{pZone.clear();pZone.fillStyle(0xffffff,0.18);pZone.fillRoundedRect(W-214,14,120,40,20);this.tweens.add({targets:pLabel,scaleX:1.05,scaleY:1.05,duration:110});});
        pHit.on('pointerout', ()=>{pZone.clear();pZone.fillStyle(0xffffff,0);pZone.fillRoundedRect(W-214,14,120,40,20);this.tweens.add({targets:pLabel,scaleX:1,scaleY:1,duration:110});});
        pHit.on('pointerdown',()=>{this.tweens.add({targets:pLabel,scaleX:0.92,scaleY:0.92,duration:70,yoyo:true,onComplete:()=>this.scene.start('ProfileScene')});});
        const sBg=this.add.graphics(); sBg.fillStyle(0xf43f5e,1); sBg.fillRoundedRect(W-84,14,74,40,20);
        const sT=this.add.text(W-47,34,'→ Salir',{fontSize:'12px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const sH=this.add.rectangle(W-47,34,74,40,0,0).setInteractive({useHandCursor:true});
        sH.on('pointerover',()=>{sBg.clear();sBg.fillStyle(0xdc2626,1);sBg.fillRoundedRect(W-84,14,74,40,20);this.tweens.add({targets:sT,scaleX:1.06,scaleY:1.06,duration:100});});
        sH.on('pointerout', ()=>{sBg.clear();sBg.fillStyle(0xf43f5e,1);sBg.fillRoundedRect(W-84,14,74,40,20);this.tweens.add({targets:sT,scaleX:1,scaleY:1,duration:100});});
        sH.on('pointerdown',()=>{this.tweens.add({targets:sT,scaleX:0.88,scaleY:0.88,duration:70,yoyo:true,onComplete:()=>{clearCurrentUser();this.scene.start('LoginScene');}});});
    }

    crearContenido(W, H) {
        const margin = 80, cW = W - margin*2;
        let y = 90;
        this.crearBienvenida(margin, y, cW); y+=140;
        this.crearModulos(margin, y, cW);   y+=220;
        this.crearLogros(margin, y, cW);    y+=110;
        this.crearSapitoConcejo(margin, y, cW);
        const hBg=this.add.graphics(); hBg.fillStyle(0x6b7280,1); hBg.fillCircle(W-30,H-30,20);
        this.add.text(W-30,H-30,'?',{fontSize:'16px',fontStyle:'bold',fill:'#fff',fontFamily:'"Segoe UI",Arial'}).setOrigin(0.5);
    }

    crearBienvenida(x,y,w) {
        const nombre=(this.user.name||'Campeón').split(' ')[0];
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.lineStyle(1,0xbbf7d0,1); bg.fillRoundedRect(x,y,w,118,16);
        this.add.text(x+30,y+28,`¡Hola, ${nombre}! 👋`,{fontSize:'26px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#1f1235'});
        this.add.text(x+30,y+68,'¡Es genial verte de nuevo! ¿Listo para aprender y divertirte?',{fontSize:'15px',fontFamily:'"Segoe UI",Arial',fill:'#6b7280'});
        window.renderAvatar(this, x+w-58, y+59, 78, this.user);
    }

    crearModulos(x,y,w) {
        const gap=24, modW=(w-gap*2)/3;
        const mods=[
            {titulo:'Alimentación Saludable',desc:'Aprende sobre alimentos nutritivos',emoji:'🍎',iconBg:'🍏',c1:0x22c55e,c2:0x16a34a,scene:'FoodScene',pk:'food'},
            {titulo:'Higiene Personal',desc:'Descubre buenos hábitos de limpieza',emoji:'✨',iconBg:'✦',c1:0x22c55e,c2:0x16a34a,scene:'HygieneScene',pk:'hygiene'},
            {titulo:'Actividad Física',desc:'Muévete y mantente activo',emoji:'🏃',iconBg:'〜',c1:0x22c55e,c2:0x16a34a,scene:'ActivityScene',pk:'activity'},
        ];
        mods.forEach((m,i)=>this.crearTarjetaMod(x+i*(modW+gap),y,modW,196,m));
    }

    crearTarjetaMod(x,y,w,h,m) {
        const bg=this.add.graphics();
        bg.fillGradientStyle(m.c1,m.c1,m.c2,m.c2,1); bg.fillRoundedRect(x,y,w,h,16);
        this.add.text(x+w-54,y+20,m.iconBg,{fontSize:'40px',fill:'rgba(255,255,255,0.2)',fontFamily:'"Segoe UI",Arial'});
        this.add.text(x+26,y+28,m.emoji,{fontSize:'46px'});
        const prog=this.user.moduleProgress?.[m.pk]||0;
        if(prog>0){const pb=this.add.graphics();pb.fillStyle(0xffffff,0.2);pb.fillRoundedRect(x+w-74,y+28,58,26,13);this.add.text(x+w-45,y+41,`×${prog}`,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);}
        this.add.text(x+22,y+100,m.titulo,{fontSize:'17px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff',wordWrap:{width:w-30}});
        this.add.text(x+22,y+138,m.desc,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fill:'rgba(255,255,255,0.85)',wordWrap:{width:w-30}});
        const hit=this.add.rectangle(x+w/2,y+h/2,w,h,0,0).setInteractive({useHandCursor:true});
        hit.on('pointerover',()=>this.tweens.add({targets:bg,alpha:0.85,duration:120}));
        hit.on('pointerout', ()=>this.tweens.add({targets:bg,alpha:1,duration:120}));
        hit.on('pointerdown',()=>this.tweens.add({targets:bg,scaleX:0.96,scaleY:0.96,duration:80,yoyo:true,onComplete:()=>this.scene.start(m.scene)}));
    }

    crearLogros(x,y,w) {
        const bg=this.add.graphics();
        bg.fillGradientStyle(0xfbbf24,0xfbbf24,0xf59e0b,0xf97316,1); bg.fillRoundedRect(x,y,w,88,16);
        this.add.text(x+28,y+44,'🏆',{fontSize:'34px'}).setOrigin(0.5);
        this.add.text(x+60,y+20,'Mis Logros',{fontSize:'20px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff'});
        const n=this.user.achievements?.length||0;
        this.add.text(x+60,y+50,`${n} logros desbloqueados`,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fill:'rgba(255,255,255,0.85)'});
        this.add.text(x+w-40,y+44,'🏆',{fontSize:'44px'}).setOrigin(0.5);
        const hit=this.add.rectangle(x+w/2,y+44,w,88,0,0).setInteractive({useHandCursor:true});
        hit.on('pointerdown',()=>this.scene.start('ProfileScene'));
        hit.on('pointerover',()=>{bg.clear();bg.fillGradientStyle(0xf59e0b,0xf59e0b,0xf97316,0xef4444,1);bg.fillRoundedRect(x,y,w,88,16);});
        hit.on('pointerout', ()=>{bg.clear();bg.fillGradientStyle(0xfbbf24,0xfbbf24,0xf59e0b,0xf97316,1);bg.fillRoundedRect(x,y,w,88,16);});
    }

    crearTip(x,y,w) {
        const tips=['¡Mueve tu cuerpo al menos 1 hora al día! 💪','¡Comer frutas y verduras te da superpoderes! 🥦','¡Lávate las manos antes de comer siempre! 🙌','¡Dormir bien te ayuda a aprender mejor! 😴','¡Cepíllate los dientes 3 veces al día! 🪥'];
        const t=tips[Math.floor(Math.random()*tips.length)];
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.lineStyle(1,0xbbf7d0,1); bg.fillRoundedRect(x,y,w,88,16);
        this.add.text(x+26,y+20,'💡  ¿Sabías que...?',{fontSize:'15px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#374151'});
        this.add.text(x+26,y+52,t,{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fill:'#4b5563'});
    }

    crearSapitoConcejo(x,y,w) {
        const tips=['¡Mueve tu cuerpo al menos 1 hora al día!','¡Comer frutas y verduras te da superpoderes!','¡Lávate las manos antes de comer siempre!','¡Dormir bien te ayuda a aprender mejor!','¡Cepíllate los dientes 3 veces al día!'];
        const t=tips[Math.floor(Math.random()*tips.length)];
        const h=100;
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.lineStyle(1.5,0x86efac,1); bg.fillRoundedRect(x,y,w,h,16);

        // Sapito pequeño a la izquierda
        const sapX = x + 58, sapY = y + h/2;
        const parts = this._dibujarSapito(sapX, sapY, 0.72);
        this.tweens.add({ targets: parts, y: '-=5', duration: 1400, ease:'Sine.easeInOut', yoyo:true, repeat:-1 });

        // Burbuja de texto
        const bubX = x + 118, bubY = y + 14, bubW = w - 136, bubH = h - 28;
        const bub=this.add.graphics(); bub.fillStyle(0xf0fdf4,1); bub.lineStyle(1.5,0x86efac,1); bub.fillRoundedRect(bubX,bubY,bubW,bubH,12);
        // Cola de burbuja apuntando al sapito
        const tc=this.add.graphics(); tc.fillStyle(0xf0fdf4,1);
        tc.fillTriangle(bubX,bubY+bubH/2-8,bubX,bubY+bubH/2+8,bubX-14,bubY+bubH/2);
        this.add.text(bubX+14,bubY+10,'💬 Consejo de Rana',{fontSize:'12px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#16a34a'});
        this.add.text(bubX+14,bubY+32,t,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fill:'#374151',wordWrap:{width:bubW-24}});
    }
}


// src/scenes/ProfileScene.js

// Avatares por rol
const STUDENT_AVATARS = ['student1','student2','student3','student4'];
const TUTOR_AVATARS   = ['tutor1','tutor2','tutor3','tutor4','parent1','parent2','parent3','parent4'];

class ProfileScene extends BaseScene {

    constructor() {
        super({ key: 'ProfileScene' });
        this.scrollY      = 0;
        this.maxScroll    = 0;
        this.isDragging   = false;
        this.lastPointerY = 0;
        this.tabActual    = 'resumen';
    }

    // ── Cargar imágenes de avatar ─────────────────────────────
    preload() { this.preloadAvatars(); }

    create() {
        this.W = this.scale.width;
        this.H = this.scale.height;

        this.user = getCurrentUser();
        if (!this.user) { this.scene.start('LoginScene'); return; }

        this._fondo();
        this._topbar();
        this._navTabs();          // ← barra de tabs fija

        this.scrollCont = this.add.container(0, 0);
        this._cargarTab(this.tabActual);

        // Scroll rueda
        this.input.on('wheel', (_p,_o,_dx,dy) => {
            this.scrollY = Phaser.Math.Clamp(this.scrollY + dy * 0.8, 0, this.maxScroll);
            this.scrollCont.y = -this.scrollY;
        });
        // Scroll táctil (sólo debajo de la barra de nav)
        this.input.on('pointerdown', p => {
            if (p.y > 130) {
                const hits = this.input.hitTestPointer(p);
                if (!hits || hits.length === 0) {
                    this.isDragging = true;
                    this.lastPointerY = p.y;
                }
            }
        });
        this.input.on('pointermove', p => {
            if (!this.isDragging) return;
            const d = this.lastPointerY - p.y;
            this.scrollY = Phaser.Math.Clamp(this.scrollY + d, 0, this.maxScroll);
            this.scrollCont.y = -this.scrollY;
            this.lastPointerY = p.y;
        });
        this.input.on('pointerup', () => { this.isDragging = false; });
    }

    // ════════════════════════════════════════════════════
    //  FONDO
    // ════════════════════════════════════════════════════
    _fondo() {
        const g = this.add.graphics();
        g.fillGradientStyle(0xf5eeff, 0xf5eeff, 0xffe8f8, 0xf0e8ff, 1);
        g.fillRect(0, 0, this.W, this.H);
    }

    // ════════════════════════════════════════════════════
    //  TOPBAR
    // ════════════════════════════════════════════════════
    _topbar() {
        const W = this.W, u = this.user;
        const isStud = u?.role === 'student';
        const bg = this.add.graphics();
        if (isStud) {
            bg.fillGradientStyle(0x16a34a, 0x16a34a, 0x22c55e, 0x22c55e, 1);
        } else {
            bg.fillGradientStyle(0x7c3aed, 0x7c3aed, 0xec4899, 0xec4899, 1);
        }
        bg.fillRect(0, 0, W, 68);

        // Logo
        this.add.text(58,  34, '✦', { fontSize: '28px', fill: '#fbbf24', fontFamily: 'Arial' }).setOrigin(0.5);
        this.add.text(80,  22, 'Hábitos Saludables', { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
        this.add.text(80,  44, '¡Aprende jugando!',  { fontSize: '11px', fontFamily: F, fill: 'rgba(255,255,255,0.8)' });

        // Puntos
        const pts = u.points || 0;
        const pBg = this.add.graphics(); pBg.fillStyle(0xfbbf24, 1); pBg.fillRoundedRect(W-512, 16, 80, 36, 18);
        this.add.text(W-472, 34, `★ ${pts}`, { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);

        // Nivel
        const nivel = u.level || 1;
        const nBg = this.add.graphics(); nBg.fillStyle(isStud ? 0x166534 : 0x6366f1, 1); nBg.fillRoundedRect(W-424, 16, 90, 36, 18);
        this.add.text(W-408, 22, 'Nivel', { fontSize: '10px', fill: '#c7d2fe', fontFamily: F });
        this.add.text(W-408, 34, `${nivel}`, { fontSize: '18px', fill: '#fff', fontFamily: F, fontStyle: 'bold' });

        // Barra progreso
        const prog = pts % 100;
        const prBg = this.add.graphics(); prBg.fillStyle(0xffffff, 0.2); prBg.fillRoundedRect(W-326, 28, 110, 12, 6);
        if (prog > 0) { const pF=this.add.graphics(); pF.fillStyle(0xffffff,0.9); pF.fillRoundedRect(W-326,28,(prog/100)*110,12,6); }
        this.add.text(W-326, 14, `${100-prog} pts para nivel ${nivel+1}`, { fontSize: '10px', fill: 'rgba(255,255,255,0.85)', fontFamily: F });

        // Avatar + nombre
        window.renderAvatar(this, W-194, 34, 36, u);
        const nombre = (u.name || '').split(' ')[0];
        const nameT = this.add.text(W-164, 34, nombre, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0, 0.5);

        // Btn Salir
        const sBg = this.add.graphics(); sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W-82, 14, 72, 40, 20);
        const sT = this.add.text(W-46, 34, '→ Salir', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const sHit = this.add.rectangle(W-46, 34, 72, 40, 0, 0).setInteractive({ useHandCursor: true });
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xdc2626,1); sBg.fillRoundedRect(W-82,14,72,40,20); this.tweens.add({targets:sT,scaleX:1.06,scaleY:1.06,duration:100}); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0xf43f5e,1); sBg.fillRoundedRect(W-82,14,72,40,20); this.tweens.add({targets:sT,scaleX:1,scaleY:1,duration:100}); });
        sHit.on('pointerdown',  () => { this.tweens.add({targets:sT,scaleX:0.88,scaleY:0.88,duration:70,yoyo:true,onComplete:()=>{clearCurrentUser();this.scene.start('LoginScene');}}); });
    }

    // ════════════════════════════════════════════════════
    //  BARRA DE NAVEGACIÓN POR TABS — FIJA sobre el scroll
    // ════════════════════════════════════════════════════
    _navTabs() {
        const W = this.W;

        // Fondo blanco sólido, siempre encima
        const navBg = this.add.graphics();
        navBg.fillStyle(0xffffff, 1);
        navBg.fillRect(0, 68, W, 58);
        navBg.lineStyle(1, 0xe5e7eb, 1);
        navBg.lineBetween(0, 126, W, 126);
        navBg.setDepth(50);   // encima del contenido scrollable

        const tabW = W / 3;
        const TABS = [
            { id: 'resumen', label: '👤  Resumen' },
            { id: 'racha',   label: '🔥  Racha' },
            { id: 'logros',  label: '🏆  Logros' },
        ];

        // Indicador deslizante (línea inferior morada)
        this._indicator = this.add.graphics();
        this._indicator.setDepth(52);

        this._tabLabels = {};

        TABS.forEach((tab, i) => {
            const tx = i * tabW + tabW / 2;
            const isActive = tab.id === this.tabActual;

            const _tabActC = (this.user?.role === 'student') ? '#16a34a' : '#7c3aed';
            const txt = this.add.text(tx, 97, tab.label, {
                fontSize: '15px', fontFamily: F, fontStyle: 'bold',
                fill: isActive ? _tabActC : '#6b7280'
            }).setOrigin(0.5).setDepth(51);

            this._tabLabels[tab.id] = { txt, x: i * tabW, w: tabW };

            const hit = this.add.rectangle(tx, 97, tabW, 58, 0, 0)
                .setInteractive({ useHandCursor: true }).setDepth(53);

            hit.on('pointerover',  () => { if (this.tabActual !== tab.id) this.tweens.add({ targets: txt, scaleX: 1.06, scaleY: 1.06, duration: 110 }); });
            hit.on('pointerout',   () => { if (this.tabActual !== tab.id) this.tweens.add({ targets: txt, scaleX: 1, scaleY: 1, duration: 110 }); });
            hit.on('pointerdown',  () => {
                if (this.tabActual === tab.id) return;
                this.tweens.add({ targets: txt, scaleX: 0.9, scaleY: 0.9, duration: 70, yoyo: true });
                this._cambiarTab(tab.id);
            });
        });

        this._dibujarIndicador(this.tabActual);
    }

    _dibujarIndicador(tabId) {
        const info = this._tabLabels[tabId];
        if (!info) return;
        const _iColor    = (this.user?.role === 'student') ? 0x16a34a : 0x7c3aed;
        const _iColorHex = (this.user?.role === 'student') ? '#16a34a' : '#7c3aed';
        this._indicator.clear();
        this._indicator.fillStyle(_iColor, 1);
        this._indicator.fillRoundedRect(info.x + 20, 122, info.w - 40, 4, 2);

        Object.entries(this._tabLabels).forEach(([id, { txt }]) => {
            txt.setStyle({ fill: id === tabId ? _iColorHex : '#6b7280' });
        });
    }

    _cambiarTab(tabId) {
        this.tabActual = tabId;
        this.scrollY = 0;

        this._dibujarIndicador(tabId);

        // Fade out → recrear → fade in
        this.tweens.add({ targets: this.scrollCont, alpha: 0, duration: 120, onComplete: () => {
            this.scrollCont.destroy();
            this.scrollCont = this.add.container(0, 0);
            this.scrollCont.y = 0;
            this.scrollCont.setAlpha(0);
            this._cargarTab(tabId);
            this.tweens.add({ targets: this.scrollCont, alpha: 1, duration: 200 });
        }});
    }

    _cargarTab(tabId) {
        this.scrollY = 0;
        this.maxScroll = 0;
        if (tabId === 'resumen') this._tabResumen();
        if (tabId === 'racha')   this._tabRacha();
        if (tabId === 'logros')  this._tabLogros();
    }

    // ════════════════════════════════════════════════════
    //  TAB 1 — RESUMEN
    // ════════════════════════════════════════════════════
    _tabResumen() {
        const W = this.W, margin = 80, cW = W - margin * 2;
        let y = 142;

        // Botón volver
        this._btnVolver(margin, y); y += 54;

        // Tarjeta de perfil
        this._tarjetaPerfil(margin, y, cW); y += 250;

        // Estadísticas módulos
        this._estadModulos(margin, y, cW); y += 160;

        this.maxScroll = Math.max(0, y - this.H + 20);
    }

    _btnVolver(x, y) {
        const bg = this.add.graphics();
        const _vBC = (this.user?.role === 'student') ? 0xbbf7d0 : 0xd8b4fe;
        const _vTC = (this.user?.role === 'student') ? '#16a34a' : '#7c3aed';
        bg.fillStyle(0xffffff,1); bg.lineStyle(1.5,_vBC,1); bg.fillRoundedRect(x,y,165,38,19);
        const t = this.add.text(x+82, y+19, '← Volver al menú', { fontSize:'13px', fontFamily:F, fontStyle:'bold', fill:_vTC }).setOrigin(0.5);
        const hit = this.add.rectangle(x+82, y+19, 165, 38, 0, 0).setInteractive({ useHandCursor: true });
        this.scrollCont.add([bg, t, hit]);
        hit.on('pointerover',  () => { bg.clear(); bg.fillStyle(0xf5f3ff,1); bg.lineStyle(2,0x7c3aed,1); bg.fillRoundedRect(x,y,165,38,19); this.tweens.add({targets:t,scaleX:1.04,scaleY:1.04,duration:110}); });
        hit.on('pointerout',   () => { bg.clear(); bg.fillStyle(0xffffff,1); bg.lineStyle(1.5,_vBC,1); bg.fillRoundedRect(x,y,165,38,19); this.tweens.add({targets:t,scaleX:1,scaleY:1,duration:110}); });
        hit.on('pointerdown',  () => { this.tweens.add({targets:t,scaleX:0.92,scaleY:0.92,duration:70,yoyo:true,onComplete:()=>this.scene.start('MenuScene')}); });
    }

    _tarjetaPerfil(x, y, w) {
        const u = this.user;
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1, 0xf3e8ff, 1); bg.fillRoundedRect(x, y, w, 220, 18);
        this.scrollCont.add(bg);

        // Avatar grande con imagen
        const avaImg = window.renderAvatar(this, x + 68, y + 90, 90, u);
        if (avaImg.setDepth) avaImg.setDepth(1);
        this.scrollCont.add(avaImg);


        // Nombre y username
        const nT = this.add.text(x+148, y+28, u.name || u.username, { fontSize:'28px', fontFamily:F, fontStyle:'bold', fill:'#1f1235' });
        const uT = this.add.text(x+148, y+64, `@${u.username}`, { fontSize:'13px', fontFamily:F, fill:'#9ca3af' });
        this.scrollCont.add([nT, uT]);

        // Badges
        const pts=u.points||0, nivel=u.level||1, logros=u.achievements?.length||0;
        [
            { t:`★ ${pts}`, label:'puntos', bg:0xfef3c7, bd:0xfbbf24, tc:'#92400e' },
            { t:`🏅 ${nivel}`, label:'nivel',  bg:0xede9fe, bd:0x6366f1, tc:'#4338ca' },
            { t:`🏆 ${logros}`, label:'logros', bg:0xfce7f3, bd:0xec4899, tc:'#9d174d' },
        ].forEach((b, i) => {
            const bx = x + 148 + i * 138;
            const bbg = this.add.graphics();
            bbg.fillStyle(b.bg, 1); bbg.lineStyle(1.5, b.bd, 1); bbg.fillRoundedRect(bx, y+102, 124, 32, 16);
            const bt = this.add.text(bx+62, y+118, `${b.t} ${b.label}`, { fontSize:'12px', fontFamily:F, fontStyle:'bold', fill:b.tc }).setOrigin(0.5);
            this.scrollCont.add([bbg, bt]);
        });

        // Logro Destacado
        const featId  = u.featuredAchievement;
        const featAch = featId ? ACHIEVEMENTS.find(a => a.id === featId) : null;
        const featTxt = featAch ? `${featAch.icon}  ${featAch.name} · +${featAch.points} pts` : '⭐  Desbloquea logros jugando para destacar uno aquí';
        const lBg = this.add.graphics();
        lBg.fillStyle(0xfffbeb, 1); lBg.lineStyle(1.5, 0xfbbf24, 1); lBg.fillRoundedRect(x+20, y+152, w-40, 50, 12);
        const fT = this.add.text(x+w/2, y+177, featTxt, { fontSize:'13px', fontFamily:F, fill:'#92400e', align:'center' }).setOrigin(0.5);
        this.scrollCont.add([lBg, fT]);

        // Botón editar
        this._btnEditar(x + w - 172, y + 16);
    }

    _btnEditar(x, y) {
        const bg = this.add.graphics();
        const _eC1 = (this.user?.role === 'student') ? 0x16a34a : 0x7c3aed;
        const _eC2 = (this.user?.role === 'student') ? 0x15803d : 0x6d28d9;
        bg.fillStyle(_eC1, 1); bg.fillRoundedRect(x, y, 154, 38, 19);
        const sh = this.add.graphics();
        sh.fillStyle(_eC1, 0.18); sh.fillRoundedRect(x+2, y+4, 154, 38, 19);
        const t = this.add.text(x+77, y+19, '✏️  Editar perfil', { fontSize:'13px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);
        const hit = this.add.rectangle(x+77, y+19, 154, 38, 0, 0).setInteractive({ useHandCursor: true });
        this.scrollCont.add([sh, bg, t, hit]);
        hit.on('pointerover',  () => { bg.clear(); bg.fillStyle(_eC2,1); bg.fillRoundedRect(x,y,154,38,19); this.tweens.add({targets:t,scaleX:1.05,scaleY:1.05,duration:110}); });
        hit.on('pointerout',   () => { bg.clear(); bg.fillStyle(_eC1,1); bg.fillRoundedRect(x,y,154,38,19); this.tweens.add({targets:t,scaleX:1,scaleY:1,duration:110}); });
        hit.on('pointerdown',  () => { this.tweens.add({targets:t,scaleX:0.92,scaleY:0.92,duration:70,yoyo:true,onComplete:()=>this._modalEditar()}); });
    }

    _estadModulos(x, y, w) {
        const gap = 20, mW = (w - gap * 2) / 3;
        const mp = this.user.moduleProgress || { food:0, hygiene:0, activity:0 };
        [
            { n:'Alimentación', e:'🍎', bg:0xe6f4ea, tc:'#166534', val:mp.food||0,    label:'Juegos completados',  scene:'FoodScene' },
            { n:'Higiene',      e:'✨', bg:0xe0f2fe, tc:'#075985', val:mp.hygiene||0, label:'Juegos completados',  scene:'HygieneScene' },
            { n:'Actividad',    e:'🏃', bg:0xfff3e0, tc:'#92400e', val:mp.activity||0,label:'Desafíos completados',scene:'ActivityScene' },
        ].forEach((m, i) => {
            const mx = x + i * (mW + gap);
            const mbg = this.add.graphics(); mbg.fillStyle(m.bg, 1); mbg.fillRoundedRect(mx, y, mW, 140, 14);
            this.scrollCont.add(mbg);
            const nameT = this.add.text(mx+20, y+22, m.n, { fontSize:'15px', fontFamily:F, fontStyle:'bold', fill:m.tc });
            const emoT  = this.add.text(mx+mW-20, y+22, m.e, { fontSize:'26px' }).setOrigin(1, 0);
            const valT  = this.add.text(mx+20, y+60, `${m.val}`, { fontSize:'36px', fontFamily:F, fontStyle:'bold', fill:m.tc });
            const labT  = this.add.text(mx+20, y+106, m.label, { fontSize:'12px', fontFamily:F, fill:'#6b7280' });
            this.scrollCont.add([nameT, emoT, valT, labT]);

            // Mini botón jugar
            const pbg = this.add.graphics(); pbg.fillStyle(0x7c3aed, 0.9); pbg.fillRoundedRect(mx+mW-90, y+100, 78, 28, 14);
            const pt = this.add.text(mx+mW-51, y+114, '▶ Jugar', { fontSize:'11px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);
            const ph = this.add.rectangle(mx+mW-51, y+114, 78, 28, 0, 0).setInteractive({ useHandCursor: true });
            this.scrollCont.add([pbg, pt, ph]);
            ph.on('pointerover',  () => { pbg.clear(); pbg.fillStyle(0x6d28d9,1); pbg.fillRoundedRect(mx+mW-90,y+100,78,28,14); this.tweens.add({targets:pt,scaleX:1.06,scaleY:1.06,duration:100}); });
            ph.on('pointerout',   () => { pbg.clear(); pbg.fillStyle(0x7c3aed,0.9); pbg.fillRoundedRect(mx+mW-90,y+100,78,28,14); this.tweens.add({targets:pt,scaleX:1,scaleY:1,duration:100}); });
            ph.on('pointerdown',  () => { this.tweens.add({targets:pt,scaleX:0.88,scaleY:0.88,duration:70,yoyo:true,onComplete:()=>this.scene.start(m.scene)}); });
        });
    }

    // ════════════════════════════════════════════════════
    //  TAB 2 — RACHA
    // ════════════════════════════════════════════════════
    _tabRacha() {
        const W = this.W, margin = 80, cW = W - margin * 2;
        const u = this.user;
        const y = 142;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1, 0xfed7aa, 1); bg.fillRoundedRect(margin, y, cW, 440, 18);
        this.scrollCont.add(bg);

        const titleT = this.add.text(margin+24, y+24, '🔥  Racha de Constancia', { fontSize:'20px', fontFamily:F, fontStyle:'bold', fill:'#374151' });
        this.scrollCont.add(titleT);

        // 3 tarjetas estadísticas
        const streak = u.streak || { current:0, longest:0, daysCompleted:[] };
        const gap = 20, cardW = (cW - 48 - gap * 2) / 3;
        [
            { e:'🔥', title:'Racha Actual',    val:streak.current||0,               sub:'días seguidos',  bg:0xfff7ed, tc:'#ea580c' },
            { e:'🎖️', title:'Racha Más Larga', val:streak.longest||0,               sub:'días en total',  bg:0xf5f3ff, tc:'#7c3aed' },
            { e:'📅', title:'Días Activos',    val:streak.daysCompleted?.length||0, sub:'totales',        bg:0xeff6ff, tc:'#2563eb' },
        ].forEach((c, i) => {
            const cx = margin + 24 + i * (cardW + gap), cy = y + 62;
            const cbg = this.add.graphics(); cbg.fillStyle(c.bg, 1); cbg.fillRoundedRect(cx, cy, cardW, 144, 16);
            this.scrollCont.add(cbg);
            const eT  = this.add.text(cx+cardW/2, cy+34,  c.e,     { fontSize:'34px' }).setOrigin(0.5);
            const ttT = this.add.text(cx+cardW/2, cy+68,  c.title, { fontSize:'12px', fontFamily:F, fontStyle:'bold', fill:c.tc, align:'center', wordWrap:{width:cardW-14} }).setOrigin(0.5);
            const vT  = this.add.text(cx+cardW/2, cy+96,  `${c.val}`, { fontSize:'38px', fontFamily:F, fontStyle:'bold', fill:c.tc }).setOrigin(0.5);
            const sT  = this.add.text(cx+cardW/2, cy+128, c.sub,   { fontSize:'11px', fontFamily:F, fill:c.tc, align:'center' }).setOrigin(0.5);
            this.scrollCont.add([eT, ttT, vT, sT]);
        });

        // Título calendario
        const calTitle = this.add.text(margin+24, y+228, '📅  Últimos 30 días', { fontSize:'16px', fontFamily:F, fontStyle:'bold', fill:'#374151' });
        this.scrollCont.add(calTitle);

        // Calendario
        const calendar = getStreakCalendar(u);
        const today  = new Date();
        const todayStr = [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-');
        const cols = 10, cellSz = 62, cellGap = 8;
        const gridX = margin + 24, gridY = y + 254;

        for (let i = 0; i < 30; i++) {
            const col = i % cols, row = Math.floor(i / cols);
            const cx  = gridX + col * (cellSz + cellGap), cy = gridY + row * (cellSz + cellGap);
            const entry = calendar[i];
            const isDone   = entry?.completed || false;
            const isToday  = entry?.date === todayStr;

            const cell = this.add.graphics();
            if (isDone)      { cell.fillStyle(0x22c55e, 1); }
            else if (isToday){ cell.fillStyle(0xfef08a, 1); cell.lineStyle(2, 0xca8a04, 1); }
            else             { cell.fillStyle(0xe5e7eb, 1); }
            cell.fillRoundedRect(cx, cy, cellSz, cellSz, 10);
            this.scrollCont.add(cell);

            if (isDone) {
                const ck = this.add.text(cx+cellSz/2, cy+cellSz/2, '✓', { fontSize:'22px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);
                this.scrollCont.add(ck);
            }
            if (isToday && !isDone) {
                const bl = this.add.text(cx+cellSz/2, cy+cellSz/2, '⚡', { fontSize:'22px' }).setOrigin(0.5);
                this.scrollCont.add(bl);
            }
        }

        // Leyenda
        const leyY = gridY + 3 * (cellSz + cellGap) + 12;
        [{ c:0x22c55e, t:'Día completado' }, { c:0xfef08a, t:'Hoy' }, { c:0xe5e7eb, t:'No completado' }].forEach((l, i) => {
            const lx = margin + 24 + i * 200;
            const dot = this.add.graphics(); dot.fillStyle(l.c, 1); dot.fillRoundedRect(lx, leyY+4, 16, 16, 4);
            const lt  = this.add.text(lx+22, leyY+4, l.t, { fontSize:'12px', fontFamily:F, fill:'#6b7280' });
            this.scrollCont.add([dot, lt]);
        });

        // Tip
        const tipBg = this.add.graphics(); tipBg.fillStyle(0xfffbeb,1); tipBg.lineStyle(1,0xfcd34d,1); tipBg.fillRoundedRect(margin+24,leyY+32,cW-48,44,12);
        const tipT  = this.add.text(margin+cW/2, leyY+54, '💡 Tip: ¡Comienza tu racha jugando cualquier módulo hoy!', { fontSize:'13px', fontFamily:F, fontStyle:'bold', fill:'#92400e', align:'center' }).setOrigin(0.5);
        this.scrollCont.add([tipBg, tipT]);

        this.maxScroll = Math.max(0, leyY + 90 - this.H + 20);
    }

    // ════════════════════════════════════════════════════
    //  TAB 3 — LOGROS
    // ════════════════════════════════════════════════════
    _tabLogros() {
        const W = this.W, margin = 80, cW = W - margin * 2;
        const desbloqueados = this.user.achievements || [];
        const y = 142;

        const bg = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(margin, y, cW, 680, 18);
        this.scrollCont.add(bg);

        this.add.text(margin+24, y+24, '🔒  Logros', { fontSize:'20px', fontFamily:F, fontStyle:'bold', fill:'#374151' });
        this.scrollCont.add(this.children.getAll().pop());
        this.add.text(margin+24, y+56, `${desbloqueados.length} de ${ACHIEVEMENTS.length} desbloqueados`, { fontSize:'13px', fontFamily:F, fill:'#9ca3af' });
        this.scrollCont.add(this.children.getAll().pop());

        // Barra global
        const progW = cW - 48;
        const pct = ACHIEVEMENTS.length > 0 ? desbloqueados.length / ACHIEVEMENTS.length : 0;
        const prBg = this.add.graphics(); prBg.fillStyle(0xe5e7eb,1); prBg.fillRoundedRect(margin+24,y+82,progW,12,6);
        this.scrollCont.add(prBg);
        if (pct > 0) {
            const prF = this.add.graphics(); prF.fillGradientStyle(0x7c3aed,0x7c3aed,0xec4899,0xec4899,1); prF.fillRoundedRect(margin+24,y+82,pct*progW,12,6);
            this.scrollCont.add(prF);
        }

        const cols = 4, gap = 14, lW = (cW - 48 - gap * (cols-1)) / cols, lH = 132;

        ACHIEVEMENTS.forEach((ach, i) => {
            const col = i % cols, row = Math.floor(i / cols);
            const lx = margin + 24 + col * (lW + gap), ly = y + 108 + row * (lH + gap);
            const desbloqueado = desbloqueados.includes(ach.id);

            const lbg = this.add.graphics();
            lbg.fillStyle(desbloqueado ? 0xfaf5ff : 0xf9fafb, 1);
            lbg.lineStyle(desbloqueado ? 2 : 1, desbloqueado ? 0x7c3aed : 0xe5e7eb, 1);
            lbg.fillRoundedRect(lx, ly, lW, lH, 14);
            this.scrollCont.add(lbg);

            const iconT = this.add.text(lx+lW/2, ly+28, desbloqueado ? ach.icon : '🔒', { fontSize:'28px' }).setOrigin(0.5);
            const nameT = this.add.text(lx+lW/2, ly+62, ach.name, { fontSize:'11px', fontFamily:F, fontStyle:'bold', fill:desbloqueado?'#7c3aed':'#374151', align:'center', wordWrap:{width:lW-16} }).setOrigin(0.5);
            const descT = this.add.text(lx+lW/2, ly+86, ach.description, { fontSize:'9px', fontFamily:F, fill:'#9ca3af', align:'center', wordWrap:{width:lW-18} }).setOrigin(0.5);
            const ptsT  = this.add.text(lx+lW/2, ly+116, desbloqueado?`✅ +${ach.points} pts`:`★ +${ach.points} pts`, { fontSize:'10px', fontFamily:F, fontStyle:'bold', fill:desbloqueado?'#16a34a':'#f59e0b', align:'center' }).setOrigin(0.5);
            this.scrollCont.add([iconT, nameT, descT, ptsT]);

            if (desbloqueado) {
                const hit = this.add.rectangle(lx+lW/2, ly+lH/2, lW, lH, 0, 0).setInteractive({ useHandCursor: true });
                this.scrollCont.add(hit);
                hit.on('pointerover',  () => { lbg.clear(); lbg.fillStyle(0xede9fe,1); lbg.lineStyle(2,0x7c3aed,1); lbg.fillRoundedRect(lx,ly,lW,lH,14); });
                hit.on('pointerout',   () => { lbg.clear(); lbg.fillStyle(0xfaf5ff,1); lbg.lineStyle(2,0x7c3aed,1); lbg.fillRoundedRect(lx,ly,lW,lH,14); });
            }
        });

        this.maxScroll = Math.max(0, y + 108 + Math.ceil(ACHIEVEMENTS.length / cols) * (lH + gap) + 40 - this.H + 20);
    }

    // ════════════════════════════════════════════════════
    //  MODAL EDITAR PERFIL
    // ════════════════════════════════════════════════════
    _modalEditar() {
        const W = this.W, H = this.H;
        const u = this.user;

        const ov = this.add.graphics(); ov.fillStyle(0x000000,0.56); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();

        const mW = 640, mH = 460;
        const mx = (W - mW) / 2, my = (H - mH) / 2;
        const panel = this.add.container(0, 0); panel.setDepth(201); panel.setAlpha(0);

        // Sombra + fondo
        const sh = this.add.graphics(); sh.fillStyle(0x7c3aed,0.14); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg = this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr= this.add.graphics(); hdr.fillGradientStyle(0x7c3aed,0x7c3aed,0xec4899,0xec4899,1); hdr.fillRoundedRect(mx,my,mW,70,20);
        const hdrFix=this.add.graphics(); hdrFix.fillStyle(0x7c3aed,1); hdrFix.fillRect(mx,my+46,mW,28);
        const titleT = this.add.text(W/2, my+35, '✏️  Editar Perfil', { fontSize:'20px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);

        // X cerrar
        const xBg = this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-28, my+28, 17);
        const xT  = this.add.text(mx+mW-28, my+28, '✕', { fontSize:'16px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);
        const xHit= this.add.rectangle(mx+mW-28,my+28,38,38,0,0).setInteractive({useHandCursor:true});
        xHit.on('pointerover',  () => { xBg.clear(); xBg.fillStyle(0xffffff,0.42); xBg.fillCircle(mx+mW-28,my+28,17); });
        xHit.on('pointerout',   () => { xBg.clear(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-28,my+28,17); });
        xHit.on('pointerdown',  () => this.tweens.add({targets:[panel,ov],alpha:0,duration:220,onComplete:()=>{panel.destroy();ov.destroy();}}));

        panel.add([sh, bg, hdrFix, hdr, titleT, xBg, xT, xHit]);

        // ── Campo Nombre ──
        const lNom = this.add.text(mx+36, my+86, 'Nombre completo', { fontSize:'14px', fontFamily:F, fontStyle:'bold', fill:'#374151' });
        panel.add(lNom);

        const inBg = this.add.graphics(); inBg.lineStyle(1.5,0xd8b4fe,1); inBg.fillStyle(0xfaf5ff,1); inBg.fillRoundedRect(mx+36,my+110,mW-72,44,12);
        panel.add(inBg);

        const inNom = this.add.dom(mx+36+(mW-72)/2, my+132, 'input', {
            width: (mW-110)+'px', height:'28px', border:'none', outline:'none',
            background:'transparent', fontSize:'15px', fontFamily:F.replace(/"/g,"'"), color:'#1f1235', padding:'0 10px'
        });
        inNom.node.value = u.name || '';
        inNom.node.addEventListener('focus', ()=>{ inBg.clear(); inBg.lineStyle(2,0x7c3aed,1); inBg.fillStyle(0xfaf5ff,1); inBg.fillRoundedRect(mx+36,my+110,mW-72,44,12); });
        inNom.node.addEventListener('blur',  ()=>{ inBg.clear(); inBg.lineStyle(1.5,0xd8b4fe,1); inBg.fillStyle(0xfaf5ff,1); inBg.fillRoundedRect(mx+36,my+110,mW-72,44,12); });
        panel.add(inNom);

        // ── Selector de Avatar ──
        const lAv = this.add.text(mx+36, my+168, 'Elige tu foto de perfil', { fontSize:'14px', fontFamily:F, fontStyle:'bold', fill:'#374151' });
        panel.add(lAv);

        let avatarSel = u.avatar || 'avatar1';
        const avBtns  = [];
        const aPerRow = 4;  // 4 por fila
        const aW = 88, aH = 80, aGap = 16;

        const avatarKeys = (u.role === 'tutor') ? TUTOR_AVATARS : STUDENT_AVATARS;
        avatarKeys.forEach((key, i) => {
            const ax = mx + 36 + i % aPerRow * (aW + aGap);
            const ay = my + 196 + Math.floor(i / aPerRow) * (aH + 12);

            const avBg = this.add.graphics();
            const esSel = key === avatarSel;
            avBg.fillStyle(esSel ? 0xede9fe : 0xf9fafb, 1);
            avBg.lineStyle(esSel ? 2.5 : 1, esSel ? 0x7c3aed : 0xe5e7eb, 1);
            avBg.fillRoundedRect(ax, ay, aW, aH, 14);

            // Mostrar imagen o fallback letra
            let avEl;
            if (this.textures.exists(key)) {
                avEl = this.add.image(ax + aW/2, ay + aH/2 - 4, key).setDisplaySize(52, 52).setOrigin(0.5);
                // Máscara circular para imagen
                const avMask = this.add.graphics();
                avMask.fillStyle(0xffffff);
                avMask.fillCircle(ax + aW/2, ay + aH/2 - 4, 26);
                avEl.setMask(avMask.createGeometryMask());
            } else {
                avEl = this.add.text(ax+aW/2, ay+aH/2-4, `${i+1}`, { fontSize:'26px', fontFamily:F, fontStyle:'bold', fill:esSel?'#7c3aed':'#9ca3af' }).setOrigin(0.5);
            }

            const avHit = this.add.rectangle(ax+aW/2, ay+aH/2, aW, aH, 0, 0).setInteractive({ useHandCursor: true });
            panel.add([avBg, avEl, avHit]);
            avBtns.push({ key, bg: avBg, ax, ay, aW, aH });

            const _redrawAll = () => {
                avBtns.forEach(b => {
                    b.bg.clear();
                    const sel = b.key === avatarSel;
                    b.bg.fillStyle(sel ? 0xede9fe : 0xf9fafb, 1);
                    b.bg.lineStyle(sel ? 2.5 : 1, sel ? 0x7c3aed : 0xe5e7eb, 1);
                    b.bg.fillRoundedRect(b.ax, b.ay, b.aW, b.aH, 14);
                });
            };

            avHit.on('pointerdown', () => {
                avatarSel = key;
                _redrawAll();

            });
            avHit.on('pointerover',  () => { if (key !== avatarSel) { avBg.clear(); avBg.fillStyle(0xf5f3ff,1); avBg.lineStyle(1.5,0xa78bda,1); avBg.fillRoundedRect(ax,ay,aW,aH,14); } });
            avHit.on('pointerout',   () => { if (key !== avatarSel) { avBg.clear(); avBg.fillStyle(0xf9fafb,1); avBg.lineStyle(1,0xe5e7eb,1);  avBg.fillRoundedRect(ax,ay,aW,aH,14); } });
        });

        // ── Botones Guardar / Cancelar ──
        const btnY = my + mH - 66;

        // Cancelar
        const canBg = this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+36,btnY,126,46,23);
        const canT  = this.add.text(mx+99, btnY+23, 'Cancelar', { fontSize:'14px', fontFamily:F, fontStyle:'bold', fill:'#6b7280' }).setOrigin(0.5);
        const canH  = this.add.rectangle(mx+99, btnY+23, 126, 46, 0, 0).setInteractive({ useHandCursor: true });
        panel.add([canBg, canT, canH]);
        canH.on('pointerover',  () => { canBg.clear(); canBg.fillStyle(0xe5e7eb,1); canBg.lineStyle(1,0xd1d5db,1); canBg.fillRoundedRect(mx+36,btnY,126,46,23); });
        canH.on('pointerout',   () => { canBg.clear(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+36,btnY,126,46,23); });
        canH.on('pointerdown',  () => this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        // Guardar
        const savBg = this.add.graphics(); savBg.fillStyle(0x7c3aed,1); savBg.fillRoundedRect(mx+mW-170,btnY,134,46,23);
        const savSh = this.add.graphics(); savSh.fillStyle(0x7c3aed,0.18); savSh.fillRoundedRect(mx+mW-168,btnY+4,134,46,23);
        const savT  = this.add.text(mx+mW-103, btnY+23, '💾 Guardar', { fontSize:'14px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);
        const savH  = this.add.rectangle(mx+mW-103, btnY+23, 134, 46, 0, 0).setInteractive({ useHandCursor: true });
        panel.add([savSh, savBg, savT, savH]);
        savH.on('pointerover',  () => { savBg.clear(); savBg.fillStyle(0x6d28d9,1); savBg.fillRoundedRect(mx+mW-170,btnY,134,46,23); this.tweens.add({targets:savT,scaleX:1.06,scaleY:1.06,duration:110}); });
        savH.on('pointerout',   () => { savBg.clear(); savBg.fillStyle(0x7c3aed,1); savBg.fillRoundedRect(mx+mW-170,btnY,134,46,23); this.tweens.add({targets:savT,scaleX:1,scaleY:1,duration:110}); });
        savH.on('pointerdown',  () => {
            this.tweens.add({ targets: savT, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: () => {
                u.name   = inNom.node.value.trim() || u.name;
                u.avatar = avatarSel;
                saveUserData(u);
                this.user = u;
                this.tweens.add({ targets: [panel, ov], alpha: 0, duration: 200, onComplete: () => {
                    panel.destroy(); ov.destroy();
                    this.scene.restart();  // recarga la escena con los nuevos datos
                }});
            }});
        });

        // Entrada del modal con animación
        this.tweens.add({ targets: panel, alpha: 1, scaleX: { from:0.88, to:1 }, scaleY: { from:0.88, to:1 }, duration: 320, ease: 'Back.easeOut' });
    }
}


// src/scenes/FoodScene.js — Módulo Alimentación Saludable


class FoodScene extends BaseScene {
    constructor() { super({ key: 'FoodScene' }); }

    preload() { this.preloadAvatars(); }

    create() {
        this.W = this.scale.width;
        this.H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user) { this.scene.start('LoginScene'); return; }

        this.foods    = shuffleArray(getRandomItems(FOOD_ITEMS, 8));
        this.current  = 0;
        this.correctas = 0;
        this.answered  = false;

        this.crearFondo(0xf0fdf4, 0xecfdf5);
        this.crearTopbar(this.user, () => this.scene.start('ProfileScene'), () => { clearCurrentUser(); this.scene.start('LoginScene'); });
        this._crearUI();
    }

    _crearUI() {
        const W = this.W, H = this.H;
        this.crearBotonVolver(80, 82, 'Volver al menú', () => this.scene.start('MenuScene'));

        // Cabecera
        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(2, 0xbbf7d0, 1);
        hBg.fillRoundedRect(W / 2 - 280, 112, 560, 72, 16);
        this.add.text(W / 2, 143, 'Clasificación de Alimentos', { fontSize: '24px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        this.add.text(W / 2, 170, '¿Este alimento es saludable o no saludable?', { fontSize: '14px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);

        // Sapito mascota flotante
        this._sapParts = this._dibujarSapito(W - 88, H / 2, 1.0);
        this.tweens.add({ targets: this._sapParts, y: '-=14', duration: 1600, ease:'Sine.easeInOut', yoyo:true, repeat:-1 });

        // Progreso
        this.progBg   = this.add.graphics();
        this.progFill = this.add.graphics();
        this.progText = this.add.text(0, 0, '', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' });
        this._actualizarBarra();

        this.cardCont = this.add.container(0, 0);
        this._mostrarAlimento();
    }

    _actualizarBarra() {
        const W = this.W;
        this.progBg.clear(); this.progFill.clear();
        this.progBg.fillStyle(0xe5e7eb, 1); this.progBg.fillRoundedRect(W / 2 - 220, 200, 440, 14, 7);
        const pct = this.current / this.foods.length;
        if (pct > 0) { this.progFill.fillStyle(0x16a34a, 1); this.progFill.fillRoundedRect(W / 2 - 220, 200, pct * 440, 14, 7); }
        this.progText.setText(`${this.current + 1} / ${this.foods.length}`);
        this.progText.setPosition(W / 2 - this.progText.width / 2, 220);
    }

    _mostrarAlimento() {
        this.cardCont.destroy();
        this.cardCont = this.add.container(0, 0);
        this.answered = false;
        const food = this.foods[this.current];
        const W = this.W;

        // Tarjeta con animación de entrada
        const card = this.add.graphics();
        card.fillStyle(0xffffff, 1); card.lineStyle(2, 0xd1fae5, 1);
        card.fillRoundedRect(W / 2 - 210, 244, 420, 270, 20);
        this.cardCont.add(card);
        card.setAlpha(0);
        this.tweens.add({ targets: card, alpha: 1, scaleX: { from: 0.88, to: 1 }, scaleY: { from: 0.88, to: 1 }, duration: 280, ease: 'Back.easeOut' });

        // Emoji del alimento — flota
        const emoT = this.add.text(W / 2, 316, food.emoji, { fontSize: '76px' }).setOrigin(0.5);
        this.cardCont.add(emoT);
        this.tweens.add({ targets: emoT, y: 308, duration: 1000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        const nameT = this.add.text(W / 2, 390, food.name, { fontSize: '22px', fontFamily: F, fontStyle: 'bold', fill: '#1f2937' }).setOrigin(0.5);
        this.cardCont.add(nameT);

        // Badge de correctas
        const pBg = this.add.graphics();
        pBg.fillStyle(0xfef9c3, 1); pBg.fillRoundedRect(W / 2 - 55, 420, 110, 28, 14);
        this.cardCont.add(pBg);
        const pT = this.add.text(W / 2, 434, `✅ ${this.correctas} correctas`, { fontSize: '12px', fontFamily: F, fill: '#78350f' }).setOrigin(0.5);
        this.cardCont.add(pT);

        this._crearBotonesClasificacion(food);
    }

    _crearBotonesClasificacion(food) {
        const W = this.W;
        const btns = [
            { label: '✅  ¡Saludable!', ans: 'healthy',   c1: 0x16a34a, c2: 0x15803d },
            { label: '❌  No saludable', ans: 'unhealthy', c1: 0xdc2626, c2: 0xb91c1c },
        ];
        btns.forEach((b, i) => {
            const bx = W / 2 - 198 + i * 218;
            const bg = this.add.graphics();
            bg.fillStyle(b.c1, 1); bg.fillRoundedRect(bx, 530, 184, 52, 26);
            this.cardCont.add(bg);

            const shadow = this.add.graphics();
            shadow.fillStyle(b.c1, 0.2); shadow.fillRoundedRect(bx + 2, 534, 184, 52, 26);
            this.cardCont.add(shadow);

            const t = this.add.text(bx + 92, 556, b.label, { fontSize: '16px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
            this.cardCont.add(t);

            const hit = this.add.rectangle(bx + 92, 556, 184, 52, 0, 0).setInteractive({ useHandCursor: true });
            this.cardCont.add(hit);

            hit.on('pointerover', () => {
                if (this.answered) return;
                bg.clear(); bg.fillStyle(b.c2, 1); bg.fillRoundedRect(bx, 530, 184, 52, 26);
                this.tweens.add({ targets: t, scaleX: 1.06, scaleY: 1.06, duration: 110 });
            });
            hit.on('pointerout', () => {
                if (this.answered) return;
                bg.clear(); bg.fillStyle(b.c1, 1); bg.fillRoundedRect(bx, 530, 184, 52, 26);
                this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 110 });
            });
            hit.on('pointerdown', () => {
                if (this.answered) return;
                this.answered = true;
                this.tweens.add({ targets: t, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true });
                this._evaluar(food, b.ans, bg, b.c1, bx);
            });
        });
    }

    _evaluar(food, respuesta, bgRef, colorOriginal, bx) {
        const correcto = food.category === respuesta;
        if (correcto) this.correctas++;

        bgRef.clear();
        bgRef.fillStyle(correcto ? 0x16a34a : 0xdc2626, 1);
        bgRef.fillRoundedRect(bx, 530, 184, 52, 26);

        // Ocultar sapito decorativo y mostrar burbuja de dialogo a su lado
        const W = this.W;
        const sapY = this.H / 2;
        if (this._sapParts) this._sapParts.forEach(p => { this.tweens.killTweensOf(p); p.setAlpha(0); });
        this._sapParts = this._dibujarSapito(W - 88, sapY, 1.0);
        this.tweens.add({ targets: this._sapParts, y: '-=8', duration: 800, ease:'Sine.easeInOut', yoyo:true, repeat:-1 });
        this._dialogoSapito(W - 88, sapY, food.description, correcto, this.cardCont);

        // Botón siguiente
        const esUltimo = this.current >= this.foods.length - 1;
        const sBg = this.add.graphics();
        sBg.fillStyle(0x7c3aed, 1); sBg.fillRoundedRect(W / 2 - 88, 694, 176, 48, 24);
        this.cardCont.add(sBg);
        const sT = this.add.text(W / 2, 718, esUltimo ? 'Ver resultado →' : 'Siguiente →', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.cardCont.add(sT);
        const sHit = this.add.rectangle(W / 2, 718, 176, 48, 0, 0).setInteractive({ useHandCursor: true });
        this.cardCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0x6d28d9, 1); sBg.fillRoundedRect(W / 2 - 88, 694, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0x7c3aed, 1); sBg.fillRoundedRect(W / 2 - 88, 694, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
        sHit.on('pointerdown',  () => {
            this.tweens.add({ targets: sT, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: () => {
                if (esUltimo) this._completar();
                else { this.current++; this._actualizarBarra(); this._mostrarAlimento(); }
            }});
        });
    }

    _completar() {
        const pts = this.correctas * 10;
        addPoints(this.user.id, pts);
        updateModuleProgress(this.user.id, 'food', this.correctas, this.foods.length);
        updateStreak(this.user.id);
        const updated = getUserData(this.user.id);
        const newAchs = checkAndUnlockAchievements(updated);
        if (newAchs.length > 0) {
            const ach = ACHIEVEMENTS.find(a => a.id === newAchs[0]);
            if (ach) this.time.delayedCall(600, () => this.mostrarLogro(ach));
        }
        this.mostrarResultado({ W: this.W, H: this.H, pts, correctas: this.correctas, total: this.foods.length, color: 0x16a34a, onReintentar: () => this.scene.restart(), onMenu: () => this.scene.start('MenuScene') });
    }
}


// src/scenes/HygieneScene.js — Módulo Higiene Personal


class HygieneScene extends BaseScene {
    constructor() { super({ key: 'HygieneScene' }); }

    preload() { this.preloadAvatars(); }

    create() {
        this.W = this.scale.width;
        this.H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user) { this.scene.start('LoginScene'); return; }

        this.questions = shuffleArray([...HYGIENE_QUESTIONS]);
        this.current   = 0;
        this.correctas = 0;
        this.answered  = false;

        this.crearFondo(0xf0fdf4, 0xecfdf5);
        this.crearTopbar(this.user, () => this.scene.start('ProfileScene'), () => { clearCurrentUser(); this.scene.start('LoginScene'); });
        this._crearUI();
    }

    _crearUI() {
        const W = this.W;
        this.crearBotonVolver(80, 82, 'Volver al menú', () => this.scene.start('MenuScene'));

        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(2, 0xbbf7d0, 1);
        hBg.fillRoundedRect(W / 2 - 280, 112, 560, 72, 16);
        this.add.text(W / 2, 143, 'Higiene Personal', { fontSize: '24px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        this.add.text(W / 2, 170, '¿Cuánto sabes sobre buenos hábitos de limpieza?', { fontSize: '14px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);

        this._sapParts = this._dibujarSapito(this.W - 88, this.H / 2, 1.0);
        this.tweens.add({ targets: this._sapParts, y: '-=14', duration: 1800, ease:'Sine.easeInOut', yoyo:true, repeat:-1 });

        this.progBg   = this.add.graphics();
        this.progFill = this.add.graphics();
        this.progText = this.add.text(0, 0, '', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' });
        this._actualizarBarra();

        this.cardCont = this.add.container(0, 0);
        this._mostrarPregunta();
    }

    _actualizarBarra() {
        const W = this.W;
        this.progBg.clear(); this.progFill.clear();
        this.progBg.fillStyle(0xe5e7eb, 1); this.progBg.fillRoundedRect(W / 2 - 220, 200, 440, 14, 7);
        const pct = this.current / this.questions.length;
        if (pct > 0) { this.progFill.fillStyle(0x16a34a, 1); this.progFill.fillRoundedRect(W / 2 - 220, 200, pct * 440, 14, 7); }
        this.progText.setText(`${this.current + 1} / ${this.questions.length}`);
        this.progText.setPosition(W / 2 - this.progText.width / 2, 220);
    }

    _mostrarPregunta() {
        this.cardCont.destroy();
        this.cardCont = this.add.container(0, 0);
        this.answered = false;
        const q = this.questions[this.current];
        const W = this.W;

        // Emoji circular
        const eBg = this.add.graphics();
        eBg.fillStyle(0xffffff, 1); eBg.lineStyle(2, 0xbbf7d0, 1); eBg.fillRoundedRect(W / 2 - 44, 244, 88, 88, 44);
        this.cardCont.add(eBg);
        const eT = this.add.text(W / 2, 288, q.emoji, { fontSize: '44px' }).setOrigin(0.5);
        this.cardCont.add(eT);
        this.tweens.add({ targets: eT, scaleX: 1.14, scaleY: 1.14, duration: 700, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        // Caja de pregunta
        const qBg = this.add.graphics();
        qBg.fillStyle(0xffffff, 1); qBg.lineStyle(2, 0xbbf7d0, 1); qBg.fillRoundedRect(W / 2 - 290, 344, 580, 80, 14);
        this.cardCont.add(qBg);
        const qT = this.add.text(W / 2, 384, q.question, {
            fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#14532d', align: 'center', wordWrap: { width: 540 }
        }).setOrigin(0.5);
        this.cardCont.add(qT);

        // 4 opciones 2×2
        const cols = 2, optW = 262, optH = 62, gapX = 14, gapY = 10;
        const startX = W / 2 - optW - gapX / 2, startY = 444;
        q.options.forEach((opt, i) => {
            const col = i % cols, row = Math.floor(i / cols);
            this._crearOpcion(startX + col * (optW + gapX), startY + row * (optH + gapY), optW, optH, opt, i, q, i === q.correctAnswer);
        });
    }

    _crearOpcion(x, y, w, h, texto, idx, pregunta, esCorrecta) {
        const bg = this.add.graphics();
        bg.fillStyle(0xf0fdf4, 1); bg.lineStyle(2, 0xbbf7d0, 1); bg.fillRoundedRect(x, y, w, h, 12);
        this.cardCont.add(bg);

        const letra = ['A', 'B', 'C', 'D'][idx];
        const lBg = this.add.graphics();
        lBg.fillStyle(0x16a34a, 1); lBg.fillCircle(x + 22, y + h / 2, 14);
        this.cardCont.add(lBg);
        const lT = this.add.text(x + 22, y + h / 2, letra, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.cardCont.add(lT);

        const t = this.add.text(x + 46, y + h / 2, texto, { fontSize: '14px', fontFamily: F, fill: '#14532d', wordWrap: { width: w - 56 } }).setOrigin(0, 0.5);
        this.cardCont.add(t);

        const hit = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this.cardCont.add(hit);

        hit.on('pointerover', () => {
            if (this.answered) return;
            bg.clear(); bg.fillStyle(0xdcfce7, 1); bg.lineStyle(2, 0x16a34a, 1); bg.fillRoundedRect(x, y, w, h, 12);
            this.tweens.add({ targets: t, scaleX: 1.03, scaleY: 1.03, duration: 100 });
        });
        hit.on('pointerout', () => {
            if (this.answered) return;
            bg.clear(); bg.fillStyle(0xf0fdf4, 1); bg.lineStyle(2, 0xbbf7d0, 1); bg.fillRoundedRect(x, y, w, h, 12);
            this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 100 });
        });
        hit.on('pointerdown', () => {
            if (this.answered) return;
            this.answered = true;
            this.tweens.add({ targets: bg, scaleX: 0.96, scaleY: 0.96, duration: 70, yoyo: true });
            this._evaluar(pregunta, idx, esCorrecta, bg, x, y, w, h);
        });
    }

    _evaluar(pregunta, _idx, esCorrecta, bg, x, y, w, h) {
        if (esCorrecta) this.correctas++;
        bg.clear();
        bg.fillStyle(esCorrecta ? 0xdcfce7 : 0xfee2e2, 1);
        bg.lineStyle(2.5, esCorrecta ? 0x16a34a : 0xdc2626, 1);
        bg.fillRoundedRect(x, y, w, h, 12);

        const W = this.W;
        const sapY = this.H / 2;
        if (this._sapParts) this._sapParts.forEach(p => { this.tweens.killTweensOf(p); p.setAlpha(0); });
        this._sapParts = this._dibujarSapito(W - 88, sapY, 1.0);
        this.tweens.add({ targets: this._sapParts, y: '-=8', duration: 800, ease:'Sine.easeInOut', yoyo:true, repeat:-1 });
        this._dialogoSapito(W - 88, sapY, pregunta.explanation, esCorrecta, this.cardCont);

        const esUltimo = this.current >= this.questions.length - 1;
        const sBg = this.add.graphics();
        sBg.fillStyle(0x16a34a, 1); sBg.fillRoundedRect(W / 2 - 88, 692, 176, 48, 24);
        this.cardCont.add(sBg);
        const sT = this.add.text(W / 2, 716, esUltimo ? 'Ver resultado →' : 'Siguiente →', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.cardCont.add(sT);
        const sHit = this.add.rectangle(W / 2, 716, 176, 48, 0, 0).setInteractive({ useHandCursor: true });
        this.cardCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0x15803d, 1); sBg.fillRoundedRect(W / 2 - 88, 692, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0x16a34a, 1); sBg.fillRoundedRect(W / 2 - 88, 692, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
        sHit.on('pointerdown',  () => {
            this.tweens.add({ targets: sT, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: () => {
                if (esUltimo) this._completar();
                else { this.current++; this._actualizarBarra(); this._mostrarPregunta(); }
            }});
        });
    }

    _completar() {
        const pts = this.correctas * 15;
        addPoints(this.user.id, pts);
        updateModuleProgress(this.user.id, 'hygiene', this.correctas, this.questions.length);
        updateStreak(this.user.id);
        const updated = getUserData(this.user.id);
        const newAchs = checkAndUnlockAchievements(updated);
        if (newAchs.length > 0) {
            const ach = ACHIEVEMENTS.find(a => a.id === newAchs[0]);
            if (ach) this.time.delayedCall(600, () => this.mostrarLogro(ach));
        }
        this.mostrarResultado({ W: this.W, H: this.H, pts, correctas: this.correctas, total: this.questions.length, color: 0x16a34a, onReintentar: () => this.scene.restart(), onMenu: () => this.scene.start('MenuScene') });
    }
}


// src/scenes/ActivityScene.js — Módulo Actividad Física


class ActivityScene extends BaseScene {
    constructor() { super({ key: 'ActivityScene' }); }

    preload() { this.preloadAvatars(); }

    create() {
        this.W = this.scale.width; this.H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user) { this.scene.start('LoginScene'); return; }

        this.challenges   = getRandomItems(PHYSICAL_CHALLENGES, 3);
        this.questions    = shuffleArray([...ACTIVITY_QUESTIONS]);
        this.challIdx     = 0;
        this.timerVal     = 0;
        this.timerRunning = false;
        this.challDone    = 0;
        this.score        = 0;
        this.quizIdx      = 0;
        this.quizCorrect  = 0;
        this.quizAnswered = false;

        this.crearFondo(0xf0fdf4, 0xecfdf5);
        this.crearTopbar(this.user, () => this.scene.start('ProfileScene'), () => { clearCurrentUser(); this.scene.start('LoginScene'); });
        this._crearUI();
    }

    _crearUI() {
        const W = this.W;
        this.crearBotonVolver(80, 82, 'Volver al menú', () => this.scene.start('MenuScene'));

        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(2, 0xbbf7d0, 1);
        hBg.fillRoundedRect(W / 2 - 280, 112, 560, 72, 16);
        this.add.text(W / 2, 143, '🏃 Actividad Física', { fontSize: '24px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        this.add.text(W / 2, 170, '¡Muévete y mantente activo!', { fontSize: '14px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);

        this.mascota = this.add.text(this.W - 100, this.H / 2, '🏋️', { fontSize: '72px' });
        this.tweens.add({ targets: this.mascota, y: this.H / 2 - 18, duration: 1400, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        this.mainCont = this.add.container(0, 0);
        this._mostrarMenu();
    }

    // ════════════════════════════════
    //  MENÚ DE DESAFÍOS
    // ════════════════════════════════
    _mostrarMenu() {
        this.mainCont.destroy();
        this.mainCont = this.add.container(0, 0);
        const W = this.W;

        const sub = this.add.text(W / 2, 218, 'Completa los 3 desafíos físicos y luego responde el quiz', { fontSize: '14px', fontFamily: F, fill: '#9a3412' }).setOrigin(0.5);
        this.mainCont.add(sub);

        this.challenges.forEach((ch, i) => {
            const cy = 264 + i * 130;
            const card = this.add.graphics();
            card.fillStyle(0xffffff, 1); card.lineStyle(2, 0xbbf7d0, 1); card.fillRoundedRect(W / 2 - 280, cy, 560, 110, 16);
            this.mainCont.add(card);

            const numBg = this.add.graphics();
            numBg.fillStyle(0x16a34a, 1); numBg.fillCircle(W / 2 - 244, cy + 55, 22);
            this.mainCont.add(numBg);
            const numT = this.add.text(W / 2 - 244, cy + 55, `${i + 1}`, { fontSize: '16px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
            this.mainCont.add(numT);

            const emoT = this.add.text(W / 2 - 196, cy + 55, ch.emoji, { fontSize: '38px' }).setOrigin(0, 0.5);
            this.mainCont.add(emoT);

            const nT = this.add.text(W / 2 - 138, cy + 30, ch.name, { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#1c1917' });
            const dT = this.add.text(W / 2 - 138, cy + 58, ch.description, { fontSize: '13px', fontFamily: F, fill: '#57534e' });
            this.mainCont.add([nT, dT]);

            const ptsBg = this.add.graphics();
            ptsBg.fillStyle(0xfef9c3, 1); ptsBg.fillRoundedRect(W / 2 + 138, cy + 38, 100, 28, 14);
            this.mainCont.add(ptsBg);
            const ptsT = this.add.text(W / 2 + 188, cy + 52, `⭐ ${ch.points} pts`, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#78350f' }).setOrigin(0.5);
            this.mainCont.add(ptsT);
        });

        // Botón comenzar
        const sBg = this.add.graphics();
        sBg.fillGradientStyle(0x16a34a, 0x16a34a, 0x15803d, 0x15803d, 1);
        sBg.fillRoundedRect(W / 2 - 126, 678, 252, 58, 29);
        this.mainCont.add(sBg);

        const sT = this.add.text(W / 2, 707, '▶  ¡Comenzar desafíos!', { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.mainCont.add(sT);

        const sHit = this.add.rectangle(W / 2, 707, 252, 58, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xdc2626, 1); sBg.fillRoundedRect(W / 2 - 126, 678, 252, 58, 29); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillGradientStyle(0x16a34a, 0x16a34a, 0x15803d, 0x15803d, 1); sBg.fillRoundedRect(W / 2 - 126, 678, 252, 58, 29); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
        sHit.on('pointerdown',  () => { this.tweens.add({ targets: sT, scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => this._iniciarDesafio() }); });
    }

    // ════════════════════════════════
    //  DESAFÍO CON TIMER
    // ════════════════════════════════
    _iniciarDesafio() {
        this.mainCont.destroy();
        this.mainCont = this.add.container(0, 0);
        const ch = this.challenges[this.challIdx];
        const W = this.W;

        const progT = this.add.text(W / 2, 216, `Desafío ${this.challIdx + 1} de ${this.challenges.length}`, {
            fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#9a3412'
        }).setOrigin(0.5);
        this.mainCont.add(progT);

        const card = this.add.graphics();
        card.fillStyle(0xffffff, 1); card.lineStyle(3, 0xbbf7d0, 1);
        card.fillRoundedRect(W / 2 - 250, 244, 500, 196, 20);
        this.mainCont.add(card);

        const emoT = this.add.text(W / 2, 290, ch.emoji, { fontSize: '56px' }).setOrigin(0.5);
        this.mainCont.add(emoT);
        this.tweens.add({ targets: emoT, y: 282, duration: 800, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        const nT = this.add.text(W / 2, 342, ch.name, { fontSize: '22px', fontFamily: F, fontStyle: 'bold', fill: '#1c1917' }).setOrigin(0.5);
        const dT = this.add.text(W / 2, 374, ch.description, { fontSize: '14px', fontFamily: F, fill: '#57534e', align: 'center', wordWrap: { width: 440 } }).setOrigin(0.5);
        const p2T = this.add.text(W / 2, 416, `+${ch.points} puntos al completar`, { fontSize: '13px', fontFamily: F, fill: '#16a34a', fontStyle: 'bold' }).setOrigin(0.5);
        this.mainCont.add([nT, dT, p2T]);

        // Timer circular
        this.timerGraf = this.add.graphics();
        this.mainCont.add(this.timerGraf);
        this.timerNumT = this.add.text(W / 2, 530, '', { fontSize: '52px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        this.mainCont.add(this.timerNumT);
        const timerLbl = this.add.text(W / 2, 582, 'segundos restantes', { fontSize: '13px', fontFamily: F, fill: '#9a3412' }).setOrigin(0.5);
        this.mainCont.add(timerLbl);
        this._drawTimer(ch.duration, ch.duration);

        // Botón iniciar
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0x16a34a, 1); btnBg.fillRoundedRect(W / 2 - 108, 626, 216, 54, 27);
        this.mainCont.add(btnBg);
        const btnT = this.add.text(W / 2, 653, '▶ ¡Empieza ya!', { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.mainCont.add(btnT);
        const btnHit = this.add.rectangle(W / 2, 653, 216, 54, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(btnHit);

        let started = false;
        btnHit.on('pointerover',  () => { if (!started) { btnBg.clear(); btnBg.fillStyle(0x15803d, 1); btnBg.fillRoundedRect(W / 2 - 108, 626, 216, 54, 27); this.tweens.add({ targets: btnT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); } });
        btnHit.on('pointerout',   () => { if (!started) { btnBg.clear(); btnBg.fillStyle(0x16a34a, 1); btnBg.fillRoundedRect(W / 2 - 108, 626, 216, 54, 27); this.tweens.add({ targets: btnT, scaleX: 1, scaleY: 1, duration: 110 }); } });
        btnHit.on('pointerdown',  () => {
            if (started) return;
            started = true;
            this.timerRunning = true;
            btnHit.disableInteractive();
            btnBg.clear(); btnBg.fillStyle(0x6b7280, 1); btnBg.fillRoundedRect(W / 2 - 108, 626, 216, 54, 27);
            btnT.setText('⏱ Corriendo...');
            this.timerVal = ch.duration;

            this._timerEvt = this.time.addEvent({
                delay: 1000, repeat: ch.duration - 1,
                callback: () => {
                    this.timerVal--;
                    this._drawTimer(this.timerVal, ch.duration);
                    if (this.timerVal <= 0) {
                        this.timerRunning = false;
                        this._timerEvt.remove();
                        this.challDone++;
                        this.score += ch.points;
                        this.mostrarToast(`¡Desafío completado! +${ch.points} pts 🎉`, 0x16a34a);
                        this.time.delayedCall(1200, () => {
                            if (this.challIdx < this.challenges.length - 1) {
                                this.challIdx++;
                                this._iniciarDesafio();
                            } else {
                                this._mostrarQuiz();
                            }
                        });
                    }
                }
            });
        });
    }

    _drawTimer(val, total) {
        const W = this.W;
        this.timerNumT.setText(`${val}`);
        this.timerGraf.clear();
        this.timerGraf.lineStyle(10, 0xbbf7d0, 1);
        this.timerGraf.strokeCircle(W / 2, 530, 52);
        const pct = total > 0 ? val / total : 0;
        if (pct > 0) {
            this.timerGraf.lineStyle(10, 0x16a34a, 1);
            this.timerGraf.beginPath();
            this.timerGraf.arc(W / 2, 530, 52, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(-90 + pct * 360), false);
            this.timerGraf.strokePath();
        }
    }

    // ════════════════════════════════
    //  QUIZ DE ACTIVIDAD
    // ════════════════════════════════
    _mostrarQuiz() {
        this.mainCont.destroy();
        this.mainCont = this.add.container(0, 0);
        this.quizIdx = 0; this.quizAnswered = false;
        this._mostrarPreguntaQuiz();
    }

    _mostrarPreguntaQuiz() {
        this.mainCont.destroy();
        this.mainCont = this.add.container(0, 0);
        this.quizAnswered = false;
        const q = this.questions[this.quizIdx];
        const W = this.W;

        // Barra de progreso quiz
        const pBg = this.add.graphics();
        pBg.fillStyle(0xe5e7eb, 1); pBg.fillRoundedRect(W / 2 - 220, 200, 440, 14, 7);
        this.mainCont.add(pBg);
        const pct = this.quizIdx / this.questions.length;
        if (pct > 0) {
            const pF = this.add.graphics();
            pF.fillStyle(0x16a34a, 1); pF.fillRoundedRect(W / 2 - 220, 200, pct * 440, 14, 7);
            this.mainCont.add(pF);
        }
        const pLabel = this.add.text(W / 2, 220, `Pregunta ${this.quizIdx + 1} de ${this.questions.length}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        this.mainCont.add(pLabel);

        // Emoji
        const ec = this.add.graphics(); ec.fillStyle(0xffffff, 1); ec.lineStyle(2, 0xbbf7d0, 1); ec.fillRoundedRect(W / 2 - 42, 238, 84, 84, 42);
        const eT = this.add.text(W / 2, 280, q.emoji, { fontSize: '40px' }).setOrigin(0.5);
        this.mainCont.add([ec, eT]);

        // Pregunta
        const qc = this.add.graphics();
        qc.fillStyle(0xffffff, 1); qc.lineStyle(2, 0xbbf7d0, 1); qc.fillRoundedRect(W / 2 - 290, 334, 580, 80, 14);
        const qT = this.add.text(W / 2, 374, q.question, { fontSize: '16px', fontFamily: F, fontStyle: 'bold', fill: '#1c1917', align: 'center', wordWrap: { width: 540 } }).setOrigin(0.5);
        this.mainCont.add([qc, qT]);

        // Opciones
        const cols = 2, optW = 262, optH = 62, gX = 14, gY = 10;
        const startX = W / 2 - optW - gX / 2, startY = 434;
        q.options.forEach((opt, i) => {
            const col = i % cols, row = Math.floor(i / cols);
            this._crearOpcionQuiz(startX + col * (optW + gX), startY + row * (optH + gY), optW, optH, opt, i, q);
        });
    }

    _crearOpcionQuiz(x, y, w, h, texto, idx, pregunta) {
        const bg = this.add.graphics();
        bg.fillStyle(0xf0fdf4, 1); bg.lineStyle(2, 0xbbf7d0, 1); bg.fillRoundedRect(x, y, w, h, 12);
        this.mainCont.add(bg);

        const letra = ['A', 'B', 'C', 'D'][idx];
        const lBg = this.add.graphics(); lBg.fillStyle(0x16a34a, 1); lBg.fillCircle(x + 22, y + h / 2, 14);
        const lT = this.add.text(x + 22, y + h / 2, letra, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const t = this.add.text(x + 44, y + h / 2, texto, { fontSize: '13px', fontFamily: F, fill: '#1c1917', wordWrap: { width: w - 52 } }).setOrigin(0, 0.5);
        this.mainCont.add([lBg, lT, t]);

        const hit = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(hit);
        hit.on('pointerover',  () => { if (!this.quizAnswered) { bg.clear(); bg.fillStyle(0xdcfce7, 1); bg.lineStyle(2, 0x16a34a, 1); bg.fillRoundedRect(x, y, w, h, 12); this.tweens.add({ targets: t, scaleX: 1.03, scaleY: 1.03, duration: 100 }); } });
        hit.on('pointerout',   () => { if (!this.quizAnswered) { bg.clear(); bg.fillStyle(0xf0fdf4, 1); bg.lineStyle(2, 0xbbf7d0, 1); bg.fillRoundedRect(x, y, w, h, 12); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 100 }); } });
        hit.on('pointerdown',  () => {
            if (this.quizAnswered) return;
            this.quizAnswered = true;
            const correcto = idx === pregunta.correctAnswer;
            if (correcto) { this.quizCorrect++; this.score += 10; }
            bg.clear();
            bg.fillStyle(correcto ? 0xdcfce7 : 0xfee2e2, 1);
            bg.lineStyle(2.5, correcto ? 0x16a34a : 0xdc2626, 1);
            bg.fillRoundedRect(x, y, w, h, 12);
            this.tweens.add({ targets: bg, scaleX: 0.96, scaleY: 0.96, duration: 70, yoyo: true });
            this._mostrarExplicacion(pregunta, correcto);
        });
    }

    _mostrarExplicacion(pregunta, correcto) {
        const W = this.W;
        const sapY = this.H / 2;
        this._dialogoSapito(W - 88, sapY, pregunta.explanation, correcto, this.mainCont);

        const esUltimo = this.quizIdx >= this.questions.length - 1;
        const sBg = this.add.graphics();
        sBg.fillStyle(0x16a34a, 1); sBg.fillRoundedRect(W / 2 - 88, 666, 176, 48, 24);
        this.mainCont.add(sBg);
        const sT = this.add.text(W / 2, 690, esUltimo ? 'Ver resultado →' : 'Siguiente →', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.mainCont.add(sT);
        const sHit = this.add.rectangle(W / 2, 690, 176, 48, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xc2410c, 1); sBg.fillRoundedRect(W / 2 - 88, 666, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0x16a34a, 1); sBg.fillRoundedRect(W / 2 - 88, 666, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
        sHit.on('pointerdown',  () => {
            this.tweens.add({ targets: sT, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: () => {
                if (esUltimo) this._completar();
                else { this.quizIdx++; this._mostrarPreguntaQuiz(); }
            }});
        });
    }

    _completar() {
        addPoints(this.user.id, this.score);
        updateModuleProgress(this.user.id, 'activity', this.quizCorrect + this.challDone, this.questions.length + this.challenges.length);
        updateStreak(this.user.id);
        const updated = getUserData(this.user.id);
        const newAchs = checkAndUnlockAchievements(updated);
        if (newAchs.length > 0) {
            const ach = ACHIEVEMENTS.find(a => a.id === newAchs[0]);
            if (ach) this.time.delayedCall(600, () => this.mostrarLogro(ach));
        }
        this.mostrarResultado({
            W: this.W, H: this.H,
            pts: this.score,
            correctas: this.quizCorrect + this.challDone,
            total: this.questions.length + this.challenges.length,
            color: 0x16a34a,
            onReintentar: () => this.scene.restart(),
            onMenu: () => this.scene.start('MenuScene')
        });
    }
}


// src/scenes/TutorScene.js — Panel del Tutor (Profesor / Padre / Madre)
class TutorScene extends BaseScene {

    constructor() {
        super({ key: 'TutorScene' });
        this.vista           = 'salones';   // 'salones' | 'salon_detalle'
        this.salonActivo     = null;
        this.estudianteSelec = null;        // estudiante activo en el panel derecho
        this.scrollY         = 0;
        this.maxScroll       = 0;
        this.isDragging      = false;
        this.lastPY          = 0;
    }

    preload() { this.preloadAvatars(); }

    // Devuelve los colores de acento según el rol del tutor
    _colores() {
        const isP = this.user?.role === 'parent';
        return {
            c1:    isP ? 0xea580c : 0x1d4ed8,   // color principal
            c2:    isP ? 0xc2410c : 0x1e40af,   // color hover
            c3:    isP ? 0xf97316 : 0x2563eb,   // color secundario
            sh:    isP ? 0xfed7aa : 0xbfdbfe,   // sombra/borde suave
            bgH:   isP ? 0xfff7ed : 0xeff6ff,   // fondo hover
            hex1:  isP ? '#ea580c' : '#1d4ed8', // color principal hex
            hex2:  isP ? '#c2410c' : '#1e40af', // hover hex
        };
    }

    create() {
        this.W = this.scale.width;
        this.H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user || !isTutor(this.user)) { this.scene.start('LoginScene'); return; }

        // Recuperar estado de navegación del registry
        const savedVista   = this.registry.get('tutor_vista');
        const savedSalonId = this.registry.get('tutor_salon_id');
        const savedEstId   = this.registry.get('tutor_est_id');
        if (savedVista)   this.vista = savedVista;
        if (savedSalonId) this.salonActivo = getSalonById(savedSalonId);
        if (savedEstId)   this.estudianteSelec = getUserData(savedEstId);

        this._dibujarBase();
    }

    _dibujarBase() {
        this.scrollY = 0;
        this._fondo();
        this._topbar();
        this._contenidoCont = this.add.container(0, 0);

        if (this.vista === 'salones')       this._vistaSalones();
        if (this.vista === 'salon_detalle') this._vistaSalonDetalle();

        this._initScroll();
    }

    // ════════════════════════════════════════════════════════
    //  FONDO
    // ════════════════════════════════════════════════════════
    _fondo() {
        const g = this.add.graphics();
        const isP = this.user?.role === 'parent';
        // parent → fondo naranja muy claro | teacher → fondo azul muy claro
        if (isP) {
            g.fillGradientStyle(0xfff7ed, 0xfff7ed, 0xffedd5, 0xfef3c7, 1);
        } else {
            g.fillGradientStyle(0xeff6ff, 0xeff6ff, 0xdbeafe, 0xede9fe, 1);
        }
        g.fillRect(0, 0, this.W, this.H);
    }

    // ════════════════════════════════════════════════════════
    //  TOPBAR — blanco, estilo referencia
    // ════════════════════════════════════════════════════════
    _topbar() {
        const W = this.W, u = this.user;

        // Colores según rol
        const isTeacherRole = u?.role === 'teacher';
        const isParentRole  = u?.role === 'parent';
        // teacher → azul  | parent → naranja | legacy tutor → azul
        const C1 = isParentRole ? 0xea580c : 0x1e40af;
        const C2 = isParentRole ? 0xf97316 : 0x2563eb;
        const rolLabel = isParentRole ? 'Panel de Padres  ·  Gestión de grupos' :
                                        'Panel del Docente  ·  Gestión de grupos';
        const rolColor = isParentRole ? '#ea580c' : '#1d4ed8';

        // Fondo blanco con borde de color
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(20, 10, W - 40, 68, 16);
        bg.lineStyle(2, isParentRole ? 0xfed7aa : 0xdbeafe, 1);
        bg.strokeRoundedRect(20, 10, W - 40, 68, 16);

        // Franja de color en el lado izquierdo de la tarjeta
        const stripe = this.add.graphics();
        stripe.fillStyle(C1, 1);
        stripe.fillRoundedRect(20, 10, 6, 68, 3);

        // Avatar + info tutor
        window.renderAvatar(this, 60, 44, 44, u);
        const tNombre = this.add.text(90, 32, u.name || u.username, { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        const tRol    = this.add.text(90, 54, rolLabel, { fontSize: '12px', fontFamily: F, fill: rolColor });

        // Btn Editar Perfil
        const cfgBg = this.add.graphics();
        cfgBg.fillStyle(0xfafafa, 1); cfgBg.lineStyle(1.5, isParentRole ? 0xfed7aa : 0xbfdbfe, 1);
        cfgBg.fillRoundedRect(W - 280, 22, 148, 38, 19);
        const cfgT = this.add.text(W - 206, 41, '✏️  Editar perfil', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#374151' }).setOrigin(0.5);
        const cfgH = this.add.rectangle(W - 206, 41, 148, 38, 0, 0).setInteractive({ useHandCursor: true });
        cfgH.on('pointerover',  () => { cfgBg.clear(); cfgBg.fillStyle(isParentRole?0xfff7ed:0xeff6ff, 1); cfgBg.lineStyle(1.5, C1, 1); cfgBg.fillRoundedRect(W-280, 22, 148, 38, 19); });
        cfgH.on('pointerout',   () => { cfgBg.clear(); cfgBg.fillStyle(0xfafafa, 1); cfgBg.lineStyle(1.5, isParentRole?0xfed7aa:0xbfdbfe, 1); cfgBg.fillRoundedRect(W-280, 22, 148, 38, 19); });
        cfgH.on('pointerdown',  () => { this.tweens.add({ targets: cfgT, scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => this._modalEditarPerfil() }); });

        // Btn Salir
        const sBg = this.add.graphics();
        sBg.fillStyle(0xfafafa, 1); sBg.lineStyle(1.5, 0xe5e7eb, 1);
        sBg.fillRoundedRect(W - 122, 22, 90, 38, 19);
        const sT = this.add.text(W - 77, 41, '→  Salir', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#374151' }).setOrigin(0.5);
        const sH = this.add.rectangle(W - 77, 41, 90, 38, 0, 0).setInteractive({ useHandCursor: true });
        sH.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xfef2f2, 1); sBg.lineStyle(1.5, 0xef4444, 1); sBg.fillRoundedRect(W-122, 22, 90, 38, 19); sT.setStyle({ fill: '#ef4444' }); });
        sH.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0xfafafa, 1); sBg.lineStyle(1.5, 0xe5e7eb, 1); sBg.fillRoundedRect(W-122, 22, 90, 38, 19); sT.setStyle({ fill: '#374151' }); });
        sH.on('pointerdown',  () => { this.tweens.add({ targets: sT, scaleX: 0.9, scaleY: 0.9, duration: 70, yoyo: true, onComplete: () => { clearCurrentUser(); this.registry.remove('tutor_vista'); this.registry.remove('tutor_salon_id'); this.registry.remove('tutor_est_id'); this.scene.start('LoginScene'); } }); });
    }

    // ════════════════════════════════════════════════════════
    //  SCROLL
    // ════════════════════════════════════════════════════════
    _initScroll() {
        this.input.off('wheel'); this.input.off('pointerdown'); this.input.off('pointermove'); this.input.off('pointerup');
        this.input.on('wheel', (_p,_o,_dx,dy) => { this.scrollY = Phaser.Math.Clamp(this.scrollY+dy*0.8,0,this.maxScroll); this._contenidoCont.y=-this.scrollY; });
        this.input.on('pointerdown', p => { if(p.y>90){this.isDragging=true;this.lastPY=p.y;} });
        this.input.on('pointermove', p => { if(!this.isDragging)return; const d=this.lastPY-p.y; this.scrollY=Phaser.Math.Clamp(this.scrollY+d,0,this.maxScroll); this._contenidoCont.y=-this.scrollY; this.lastPY=p.y; });
        this.input.on('pointerup', ()=>{ this.isDragging=false; });
    }

    _add(obj) { this._contenidoCont.add(obj); return obj; }

    _recargar() {
        this.registry.set('tutor_vista', this.vista);
        this.registry.set('tutor_salon_id', this.salonActivo?.id || null);
        this.registry.set('tutor_est_id', this.estudianteSelec?.id || null);
        if (this._contenidoCont) this._contenidoCont.destroy();
        this.scrollY = 0;
        this._contenidoCont = this.add.container(0, 0);
        if (this.vista === 'salones')       this._vistaSalones();
        if (this.vista === 'salon_detalle') this._vistaSalonDetalle();
        this._initScroll();
        this._contenidoCont.setAlpha(0);
        this.tweens.add({ targets: this._contenidoCont, alpha: 1, duration: 180 });
    }

    // ════════════════════════════════════════════════════════
    //  VISTA 1 — LISTA DE SALONES
    // ════════════════════════════════════════════════════════
    _vistaSalones() {
        const W = this.W, margin = 30, cW = W - margin * 2;
        let y = 96;

        // Cabecera panel
        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(1, 0xe9d5ff, 1); hBg.fillRoundedRect(margin, y, cW, 88, 14);
        this._add(hBg);
        window.renderAvatar(this, margin + 52, y + 44, 54, this.user);
        this._add(this.children.getAll().pop());
        const tB  = this.add.text(margin + 94, y + 18, `Bienvenido/a, ${(this.user.name||'').split(' ')[0]} 👋`, { fontSize: '21px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        const tR  = this.add.text(margin + 94, y + 50, 'Gestiona tus grupos y monitorea el progreso de tus estudiantes', { fontSize: '13px', fontFamily: F, fill: '#6b7280' });
        this._add(tB); this._add(tR);
        y += 104;

        // Botón crear salón
        const { c1:_C1, c2:_C2 } = this._colores();
        const _isParent = this.user?.role==='parent';
        const _btnLabel = _isParent ? '＋  Nuevo grupo familiar' : '＋  Nuevo grupo';
        const _btnW = _isParent ? 250 : 210;
        const _btnY = y;
        const cbg = this.add.graphics(); cbg.fillStyle(_C1, 1); cbg.fillRoundedRect(margin, _btnY, _btnW, 44, 22);
        const ct = this.add.text(margin + _btnW/2, _btnY + 22, _btnLabel, { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const ch = this.add.rectangle(margin + _btnW/2, _btnY + 22, _btnW, 44, 0, 0).setInteractive({ useHandCursor: true });
        this._add(cbg); this._add(ct); this._add(ch);
        ch.on('pointerover', () => { cbg.clear(); cbg.fillStyle(_C2, 1); cbg.fillRoundedRect(margin, _btnY, _btnW, 44, 22); });
        ch.on('pointerout',  () => { cbg.clear(); cbg.fillStyle(_C1, 1); cbg.fillRoundedRect(margin, _btnY, _btnW, 44, 22); });
        ch.on('pointerdown', () => { this.tweens.add({targets:ct,scaleX:0.93,scaleY:0.93,duration:70,yoyo:true,onComplete:()=>this._modalNuevoSalon()}); });
        y += 58;

        // Título
        const tSec = this.add.text(margin, y, 'Mis grupos de clase', { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        this._add(tSec); y += 28;

        const salones = getSalonesDeTutor(this.user.id);

        if (salones.length === 0) {
            const eBg = this.add.graphics(); eBg.fillStyle(0xffffff, 1); eBg.lineStyle(1.5, 0xe9d5ff, 1); eBg.fillRoundedRect(margin, y, cW, 130, 14);
            this._add(eBg);
            const eT1 = this.add.text(W / 2, y + 44, '🏫', { fontSize: '40px' }).setOrigin(0.5);
            const eT2 = this.add.text(W / 2, y + 96, 'Aún no tienes grupos. ¡Crea uno para empezar!', { fontSize: '14px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(eT1); this._add(eT2); y += 146;
        } else {
            salones.forEach(salon => { y = this._tarjetaSalon(margin, y, cW, salon) + 12; });
        }

        this.maxScroll = Math.max(0, y - this.H + 40);
    }

    _tarjetaSalon(x, y, w, salon) {
        const estudiantes = getEstudiantesDeSalon(salon.id);
        const stats = estudiantes.map(e => getEstadisticasEstudiante(e.id)).filter(Boolean);
        const totalPts = stats.reduce((s, e) => s + (e.points || 0), 0);
        const h = 118;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0xe9d5ff, 1); bg.fillRoundedRect(x, y, w, h, 14);
        this._add(bg);
        // Barra lateral por rol
        const _bColor = this.user?.role==='parent' ? 0xea580c : 0x1d4ed8;
        const bar = this.add.graphics(); bar.fillStyle(_bColor, 1); bar.fillRoundedRect(x, y, 5, h, 3);
        this._add(bar);

        // Código badge
        const _codBgColor = this.user?.role==='parent' ? 0xffedd5 : 0xdbeafe;
        const _codTColor  = this.user?.role==='parent' ? '#c2410c' : '#1e40af';
        const codBg = this.add.graphics(); codBg.fillStyle(_codBgColor, 1); codBg.fillRoundedRect(x + w - 122, y + 14, 106, 28, 14);
        this._add(codBg);
        const codT = this.add.text(x + w - 69, y + 28, `🔑 ${salon.codigo}`, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: _codTColor }).setOrigin(0.5);
        this._add(codT);

        // Info salón
        const nT  = this.add.text(x + 22, y + 14, salon.nombre, { fontSize: '19px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        const dT  = this.add.text(x + 22, y + 40, salon.descripcion || 'Sin descripción', { fontSize: '12px', fontFamily: F, fill: '#9ca3af' });
        const stT = this.add.text(x + 22, y + 62, `👥 ${estudiantes.length} estudiante${estudiantes.length !== 1 ? 's' : ''}  ·  ⭐ ${totalPts} puntos totales`, { fontSize: '12px', fontFamily: F, fill: '#374151' });
        this._add(nT); this._add(dT); this._add(stT);

        // Avatares mini
        estudiantes.slice(0, 5).forEach((est, i) => {
            const av = window.renderAvatar(this, x + 22 + i * 30, y + 92, 22, est);
            this._add(av);
        });
        if (estudiantes.length > 5) {
            const mT = this.add.text(x + 22 + 5 * 30 + 6, y + 92, `+${estudiantes.length - 5}`, { fontSize: '11px', fontFamily: F, fill: '#7c3aed' }).setOrigin(0, 0.5);
            this._add(mT);
        }

        // Botones
        const { c1:_bsC1, c2:_bsC2 } = this._colores();
        this._btnSmall(x + w - 220, y + h - 42, 100, 32, '👁 Ver grupo', _bsC1, _bsC2, () => this._irDetalle(salon));
        this._btnSmall(x + w - 112, y + h - 42, 100, 32, '🗑 Eliminar', 0xef4444, 0xdc2626, () => this._confirmarEliminar(salon));

        return y + h;
    }

    _btnSmall(x, y, w, h, label, c1, c2, cb) {
        const bg = this.add.graphics(); bg.fillStyle(c1, 1); bg.fillRoundedRect(x, y, w, h, h / 2);
        const t  = this.add.text(x + w / 2, y + h / 2, label, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const hit= this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this._add(bg); this._add(t); this._add(hit);
        hit.on('pointerover', () => { bg.clear(); bg.fillStyle(c2, 1); bg.fillRoundedRect(x, y, w, h, h/2); });
        hit.on('pointerout',  () => { bg.clear(); bg.fillStyle(c1, 1); bg.fillRoundedRect(x, y, w, h, h/2); });
        hit.on('pointerdown', () => { this.tweens.add({targets:t,scaleX:0.9,scaleY:0.9,duration:60,yoyo:true,onComplete:cb}); });
    }

    _irDetalle(salon) {
        this.vista = 'salon_detalle';
        this.salonActivo = salon;
        const estudiantes = getEstudiantesDeSalon(salon.id);
        this.estudianteSelec = estudiantes[0] || null;
        this._recargar();
    }

    // ════════════════════════════════════════════════════════
    //  VISTA 2 — DETALLE DE SALÓN (layout de 2 columnas)
    // ════════════════════════════════════════════════════════
    _vistaSalonDetalle() {
        const W = this.W, H = this.H;
        const salon = this.salonActivo;
        if (!salon) { this.vista = 'salones'; this._recargar(); return; }

        const startY  = 96;
        const colGap  = 18;
        const leftW   = 320;
        const rightW  = W - leftW - colGap - 60;
        const leftX   = 30;
        const rightX  = leftX + leftW + colGap;
        let   y       = startY;

        // ── Botón volver ──
        const _vC = this.user?.role==='parent' ? {bd:0xfed7aa,tc:'#c2410c',hBg:0xfff7ed,hBd:0xea580c} : {bd:0xbfdbfe,tc:'#1d4ed8',hBg:0xeff6ff,hBd:0x1d4ed8};
        const vBg = this.add.graphics(); vBg.fillStyle(0xffffff, 1); vBg.lineStyle(1.5, _vC.bd, 1); vBg.fillRoundedRect(leftX, y, 170, 36, 18);
        const vT  = this.add.text(leftX + 85, y + 18, '← Mis grupos', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: _vC.tc }).setOrigin(0.5);
        const vH  = this.add.rectangle(leftX + 85, y + 18, 170, 36, 0, 0).setInteractive({ useHandCursor: true });
        this._add(vBg); this._add(vT); this._add(vH);
        vH.on('pointerover', () => { vBg.clear(); vBg.fillStyle(_vC.hBg, 1); vBg.lineStyle(2, _vC.hBd, 1); vBg.fillRoundedRect(leftX, y, 170, 36, 18); });
        vH.on('pointerout',  () => { vBg.clear(); vBg.fillStyle(0xffffff, 1); vBg.lineStyle(1.5, _vC.bd, 1); vBg.fillRoundedRect(leftX, y, 170, 36, 18); });
        vH.on('pointerdown', () => { this.vista='salones'; this.salonActivo=null; this.estudianteSelec=null; this._recargar(); });
        y += 46;

        // ── Nombre del salón y código ──
        const _hC = this.user?.role==='parent' ? 0xea580c : 0x1d4ed8;
        const hnBg = this.add.graphics(); hnBg.fillStyle(_hC, 1); hnBg.fillRoundedRect(leftX, y, W - 60, 56, 14);
        this._add(hnBg);
        const snT = this.add.text(leftX + 20, y + 14, salon.nombre, { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
        const sdT = this.add.text(leftX + 20, y + 38, salon.descripcion || 'Sin descripción', { fontSize: '12px', fontFamily: F, fill: 'rgba(255,255,255,0.8)' });
        this._add(snT); this._add(sdT);
        // Código
        const codBg = this.add.graphics(); codBg.fillStyle(0xfbbf24, 1); codBg.fillRoundedRect(W - 178, y + 12, 148, 32, 16);
        this._add(codBg);
        const codT = this.add.text(W - 104, y + 28, `🔑 Código: ${salon.codigo}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#1c1917' }).setOrigin(0.5);
        this._add(codT);
        y += 68;

        // ════════════════════════════════
        //  COLUMNA IZQUIERDA — Estudiantes
        // ════════════════════════════════
        const estudiantesAll = getEstudiantesDeSalon(salon.id);
        this._columnaEstudiantes(leftX, y, leftW, H, estudiantesAll, salon);

        // ════════════════════════════════
        //  COLUMNA DERECHA — Métricas del estudiante seleccionado
        // ════════════════════════════════
        this._columnaDerecha(rightX, y, rightW, H, salon);

        this.maxScroll = 0; // layout fijo, sin scroll vertical global
    }

    // ── Columna izquierda: lista de estudiantes ──────────
    _columnaEstudiantes(x, y, w, H, estudiantes, salon) {
        const panelH = H - y - 30;

        // Fondo panel
        const panBg = this.add.graphics();
        panBg.fillStyle(0xffffff, 1); panBg.lineStyle(1.5, 0xe9d5ff, 1); panBg.fillRoundedRect(x, y, w, panelH, 14);
        this._add(panBg);

        // Título + botón agregar
        const titT = this.add.text(x + 18, y + 18, 'Estudiantes', { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        this._add(titT);

        // Botón Agregar
        const _aC1 = this.user?.role==='parent' ? 0xea580c : 0x1d4ed8;
        const _aC2 = this.user?.role==='parent' ? 0xc2410c : 0x1e40af;
        const aBg = this.add.graphics(); aBg.fillStyle(_aC1, 1); aBg.fillRoundedRect(x + w - 98, y + 12, 82, 30, 15);
        const aT  = this.add.text(x + w - 57, y + 27, '＋ Agregar', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const aH  = this.add.rectangle(x + w - 57, y + 27, 82, 30, 0, 0).setInteractive({ useHandCursor: true });
        this._add(aBg); this._add(aT); this._add(aH);
        aH.on('pointerover', () => { aBg.clear(); aBg.fillStyle(_aC2, 1); aBg.fillRoundedRect(x+w-98, y+12, 82, 30, 15); });
        aH.on('pointerout',  () => { aBg.clear(); aBg.fillStyle(_aC1, 1); aBg.fillRoundedRect(x+w-98, y+12, 82, 30, 15); });
        aH.on('pointerdown', () => { this.tweens.add({targets:aT,scaleX:0.9,scaleY:0.9,duration:60,yoyo:true,onComplete:()=>this._modalAgregarEstudiante(salon)}); });

        let ey = y + 50;

        if (estudiantes.length === 0) {
            const emT = this.add.text(x + w / 2, ey + 40, '📚 Sin estudiantes', { fontSize: '13px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(emT);
        } else {
            estudiantes.forEach(est => {
                const stats = getEstadisticasEstudiante(est.id);
                const esSelec = this.estudianteSelec?.id === est.id;
                const rowH = 62;

                const rowBg = this.add.graphics();
                rowBg.fillStyle(esSelec ? 0x1e1b4b : 0xfafafa, 1);
                rowBg.fillRoundedRect(x + 8, ey, w - 16, rowH, 12);
                this._add(rowBg);

                const av = window.renderAvatar(this, x + 36, ey + rowH / 2, 34, est);
                this._add(av);

                const nT = this.add.text(x + 62, ey + rowH / 2 - 9, est.name, {
                    fontSize: '14px', fontFamily: F, fontStyle: 'bold',
                    fill: esSelec ? '#ffffff' : '#1f2937'
                }).setOrigin(0, 0.5);
                const _rolFam = this.user?.role==='parent' ? getRolFamiliar(salon.id, est.id) : null;
                const _statsLabel = _rolFam
                    ? `${_rolFam}  ·  ⭐ ${stats?.points||0} pts`
                    : `${stats?.points || 0} puntos · ${(stats?.food||0) + (stats?.hygiene||0) + (stats?.activity||0)} juegos`;
                const sT = this.add.text(x + 62, ey + rowH / 2 + 10, _statsLabel, {
                    fontSize: '11px', fontFamily: F,
                    fill: esSelec ? 'rgba(255,255,255,0.75)' : '#6b7280'
                }).setOrigin(0, 0.5);
                this._add(nT); this._add(sT);

                const hit = this.add.rectangle(x + w / 2, ey + rowH / 2, w - 16, rowH, 0, 0).setInteractive({ useHandCursor: true });
                this._add(hit);
                hit.on('pointerdown', () => {
                    this.estudianteSelec = est;
                    this._recargar();
                });

                ey += rowH + 4;
            });
        }
    }

    // ── Columna derecha: métricas del estudiante seleccionado ──
    _columnaDerecha(x, y, w, H, salon) {
        const panelH = H - y - 30;
        const est    = this.estudianteSelec;

        if (!est) {
            // Sin selección
            const emBg = this.add.graphics(); emBg.fillStyle(0xffffff, 1); emBg.lineStyle(1, 0xe9d5ff, 1); emBg.fillRoundedRect(x, y, w, panelH, 14);
            this._add(emBg);
            const emT = this.add.text(x + w / 2, y + panelH / 2, '👈 Selecciona un estudiante', { fontSize: '15px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(emT);
            return;
        }

        const stats = getEstadisticasEstudiante(est.id);
        const totalJuegos = (stats.food || 0) + (stats.hygiene || 0) + (stats.activity || 0);
        const precisionPct = totalJuegos > 0 ? Math.round((stats.logros / stats.totalLogros) * 100) : 0;

        // ── Tarjetas de métricas (3 colores) ──
        const _isParentRole = this.user?.role==='parent';
        const metricas = [
            { label: 'Total Puntos',        value: `${stats.points}`,      emoji: '⭐', color: _isParentRole ? 0xf97316 : 0x7c3aed, tcolor: '#fff' },
            { label: 'Juegos Jugados',       value: `${totalJuegos}`,       emoji: '🎮', color: _isParentRole ? 0xea580c : 0x2563eb, tcolor: '#fff' },
            { label: 'Logros Desbloqueados', value: `${stats.logros}/${stats.totalLogros}`, emoji: '🏆', color: 0x16a34a, tcolor: '#fff' },
        ];
        const mW = (w - 32) / 3, mGap = 16;
        metricas.forEach((m, i) => {
            const mx = x + i * (mW + mGap);
            const mBg = this.add.graphics(); mBg.fillStyle(m.color, 1); mBg.fillRoundedRect(mx, y, mW, 100, 14);
            this._add(mBg);
            const mIcon = this.add.text(mx + 18, y + 16, m.emoji, { fontSize: '22px' });
            const mLabel= this.add.text(mx + 50, y + 18, m.label, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: m.tcolor });
            const mVal  = this.add.text(mx + 18, y + 52, m.value, { fontSize: '30px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
            this._add(mIcon); this._add(mLabel); this._add(mVal);
        });

        // Racha
        const rMx = x + 3 * (mW + mGap) - mGap;
        // (las 3 tarjetas ya cubren el ancho)

        const actY = y + 112;

        // ── Botones Editar / Eliminar ──
        const ebBg = this.add.graphics(); ebBg.fillStyle(0xfafafa, 1); ebBg.lineStyle(1.5, 0xe5e7eb, 1); ebBg.fillRoundedRect(x, actY, (w - 12) / 2, 44, 22);
        const ebT  = this.add.text(x + (w - 12) / 4, actY + 22, '✏️  Editar Estudiante', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#374151' }).setOrigin(0.5);
        const ebH  = this.add.rectangle(x + (w - 12) / 4, actY + 22, (w - 12) / 2, 44, 0, 0).setInteractive({ useHandCursor: true });
        this._add(ebBg); this._add(ebT); this._add(ebH);
        const { c1:_ebC1, sh:_ebSh, bgH:_ebBgH } = this._colores();
        ebH.on('pointerover', () => { ebBg.clear(); ebBg.fillStyle(_ebBgH, 1); ebBg.lineStyle(1.5, _ebC1, 1); ebBg.fillRoundedRect(x, actY, (w-12)/2, 44, 22); this.tweens.add({targets:ebT,scaleX:1.04,scaleY:1.04,duration:100}); });
        ebH.on('pointerout',  () => { ebBg.clear(); ebBg.fillStyle(0xfafafa, 1); ebBg.lineStyle(1.5, 0xe5e7eb, 1); ebBg.fillRoundedRect(x, actY, (w-12)/2, 44, 22); this.tweens.add({targets:ebT,scaleX:1,scaleY:1,duration:100}); });
        ebH.on('pointerdown', () => { this.tweens.add({targets:ebT,scaleX:0.93,scaleY:0.93,duration:70,yoyo:true,onComplete:()=>this._modalEditarEstudiante(est)}); });

        const delBtnX = x + (w - 12) / 2 + 12;
        const dlBg = this.add.graphics(); dlBg.fillStyle(0xef4444, 1); dlBg.fillRoundedRect(delBtnX, actY, (w - 12) / 2, 44, 22);
        const dlT  = this.add.text(delBtnX + (w - 12) / 4, actY + 22, '🗑  Eliminar Estudiante', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const dlH  = this.add.rectangle(delBtnX + (w - 12) / 4, actY + 22, (w - 12) / 2, 44, 0, 0).setInteractive({ useHandCursor: true });
        this._add(dlBg); this._add(dlT); this._add(dlH);
        dlH.on('pointerover', () => { dlBg.clear(); dlBg.fillStyle(0xdc2626, 1); dlBg.fillRoundedRect(delBtnX, actY, (w-12)/2, 44, 22); this.tweens.add({targets:dlT,scaleX:1.04,scaleY:1.04,duration:100}); });
        dlH.on('pointerout',  () => { dlBg.clear(); dlBg.fillStyle(0xef4444, 1); dlBg.fillRoundedRect(delBtnX, actY, (w-12)/2, 44, 22); this.tweens.add({targets:dlT,scaleX:1,scaleY:1,duration:100}); });
        dlH.on('pointerdown', () => { this.tweens.add({targets:dlT,scaleX:0.93,scaleY:0.93,duration:70,yoyo:true,onComplete:()=>this._confirmarRemoverEstudiante(salon, est)}); });

        const detY = actY + 56;

        // ── Panel: Sin actividad o progreso por módulo ──
        const haPlayed = totalJuegos > 0;
        const statsBg = this.add.graphics();
        statsBg.fillStyle(0xffffff, 1); statsBg.lineStyle(1, 0xe9d5ff, 1); statsBg.fillRoundedRect(x, detY, w, 100, 14);
        this._add(statsBg);

        if (!haPlayed) {
            const noT = this.add.text(x + w / 2, detY + 50, `${est.name.split(' ')[0]} aún no ha jugado ningún juego.`, { fontSize: '14px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(noT);
        } else {
            const modStats = [
                { label: 'Alimentación', val: stats.food,     emoji: '🍎', color: '#16a34a' },
                { label: 'Higiene',      val: stats.hygiene,  emoji: '🪥', color: '#0ea5e9' },
                { label: 'Actividad',    val: stats.activity, emoji: '🏃', color: '#ea580c' },
            ];
            modStats.forEach((ms, i) => {
                const mx2 = x + 20 + i * ((w - 40) / 3);
                const mE = this.add.text(mx2, detY + 22, ms.emoji, { fontSize: '24px' });
                const mL = this.add.text(mx2, detY + 52, ms.label, { fontSize: '11px', fontFamily: F, fill: '#6b7280' });
                const mV = this.add.text(mx2, detY + 70, `${ms.val} juegos`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: ms.color });
                this._add(mE); this._add(mL); this._add(mV);
            });
        }

        // ── Sección Racha + Logros ──
        const rachY = detY + 112;
        const rachBg = this.add.graphics(); rachBg.fillStyle(0xffffff, 1); rachBg.lineStyle(1, 0xe9d5ff, 1); rachBg.fillRoundedRect(x, rachY, w, 96, 14);
        this._add(rachBg);
        const rachT = this.add.text(x + 18, rachY + 14, '🔥  Racha de Constancia', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        this._add(rachT);
        const rachCards = [
            { label: 'Racha actual',     val: stats.rachaActual,    color: '#ea580c' },
            { label: 'Racha más larga',  val: stats.rachaMasLarga,  color: '#7c3aed' },
            { label: 'Días activos',     val: stats.diasActivos,    color: '#2563eb' },
        ];
        rachCards.forEach((rc, i) => {
            const rcX = x + 18 + i * (w - 36) / 3;
            const rcV = this.add.text(rcX, rachY + 48, `${rc.val}`, { fontSize: '22px', fontFamily: F, fontStyle: 'bold', fill: rc.color });
            const rcL = this.add.text(rcX, rachY + 74, rc.label, { fontSize: '11px', fontFamily: F, fill: '#6b7280' });
            this._add(rcV); this._add(rcL);
        });

        // ── Diagnóstico por Módulo ──
        const ulpY = rachY + 108;
        const ulpH = H - ulpY - 30;
        const ulpBg = this.add.graphics(); ulpBg.fillStyle(0xffffff, 1); ulpBg.lineStyle(1, 0xe9d5ff, 1); ulpBg.fillRoundedRect(x, ulpY, w, ulpH, 14);
        this._add(ulpBg);
        const ulpT = this.add.text(x + 18, ulpY + 16, '🔬  Diagnóstico por Módulo', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        this._add(ulpT);

        // Helper: calcular promedio de aciertos de las sesiones
        const _diagNivel = (sesiones) => {
            if (!sesiones || sesiones.length === 0) return null;
            const tot = sesiones.reduce((s,e) => s + e.correctas, 0);
            const totMax = sesiones.reduce((s,e) => s + e.total, 0);
            if (totMax === 0) return null;
            const pct = tot / totMax;
            if (pct >= 0.85) return { nivel:'Excelente', color:0x16a34a, tc:'#166534', bg:0xdcfce7, barra:0x16a34a, icon:'🌟' };
            if (pct >= 0.65) return { nivel:'Bien',      color:0x22c55e, tc:'#166534', bg:0xd1fae5, barra:0x22c55e, icon:'✅' };
            if (pct >= 0.45) return { nivel:'Regular',   color:0xf59e0b, tc:'#92400e', bg:0xfef3c7, barra:0xf59e0b, icon:'⚠️' };
            return                  { nivel:'Necesita práctica', color:0xef4444, tc:'#991b1b', bg:0xfee2e2, barra:0xef4444, icon:'📚' };
        };

        const modsDiag = [
            { key:'food',     label:'Alimentación', emoji:'🍎', sesiones: stats.sessionHistory?.food     || [] },
            { key:'hygiene',  label:'Higiene',      emoji:'🪥', sesiones: stats.sessionHistory?.hygiene  || [] },
            { key:'activity', label:'Actividad',    emoji:'🏃', sesiones: stats.sessionHistory?.activity || [] },
        ];

        let dpy = ulpY + 48;
        const cardH = 68;
        const cardGap = 10;

        modsDiag.forEach(mod => {
            const _dpy = dpy;
            const diag = _diagNivel(mod.sesiones);
            const jugados = mod.sesiones.length;

            // Fondo tarjeta
            const cardBg = this.add.graphics();
            if (diag) {
                cardBg.fillStyle(diag.bg, 1); cardBg.lineStyle(1.5, diag.barra, 0.35);
            } else {
                cardBg.fillStyle(0xf9fafb, 1); cardBg.lineStyle(1, 0xe5e7eb, 1);
            }
            cardBg.fillRoundedRect(x + 12, _dpy, w - 24, cardH, 12);
            this._add(cardBg);

            // Emoji módulo
            const modE = this.add.text(x + 30, _dpy + cardH/2, mod.emoji, { fontSize: '22px' }).setOrigin(0.5);
            this._add(modE);

            // Nombre módulo
            const modL = this.add.text(x + 52, _dpy + 14, mod.label, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#374151' });
            this._add(modL);

            if (!diag) {
                // Sin sesiones
                const noS = this.add.text(x + 52, _dpy + 38, 'Sin jugar aún', { fontSize: '12px', fontFamily: F, fill: '#9ca3af' });
                this._add(noS);
            } else {
                // Sesiones jugadas
                const jugT = this.add.text(x + 52, _dpy + 36, `${jugados} sesión${jugados!==1?'es':''} jugada${jugados!==1?'s':''}`, { fontSize: '11px', fontFamily: F, fill: '#6b7280' });
                this._add(jugT);

                // Barra de progreso
                const lastSes = mod.sesiones[mod.sesiones.length - 1];
                const pct = lastSes ? (lastSes.correctas / lastSes.total) : 0;
                const barW = w - 130;
                const barBg = this.add.graphics(); barBg.fillStyle(0xe5e7eb, 1); barBg.fillRoundedRect(x + 52, _dpy + 52, barW, 8, 4);
                const barF  = this.add.graphics(); barF.fillStyle(diag.barra, 1); barF.fillRoundedRect(x + 52, _dpy + 52, Math.max(4, pct * barW), 8, 4);
                this._add(barBg); this._add(barF);

                // Nivel diagnóstico
                const diagT = this.add.text(x + w - 36, _dpy + cardH/2, `${diag.icon} ${diag.nivel}`, {
                    fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: diag.tc
                }).setOrigin(1, 0.5);
                this._add(diagT);

                // Porcentaje última sesión
                const pctTxt = this.add.text(x + w - 36, _dpy + cardH/2 + 18, `Última: ${lastSes.correctas}/${lastSes.total}`, {
                    fontSize: '10px', fontFamily: F, fill: '#6b7280'
                }).setOrigin(1, 0.5);
                this._add(pctTxt);
            }

            dpy += cardH + cardGap;
        });
    }

    // ════════════════════════════════════════════════════════
    //  MODALES
    // ════════════════════════════════════════════════════════

    _modalNuevoSalon() {
        const W = this.W, H = this.H;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=520,mH=340,mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const { c1:_mC, c2:_mC2 } = this._colores();
        const sh=this.add.graphics(); sh.fillStyle(_mC,0.14); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(_mC,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(_mC,1); hFix.fillRect(mx,my+44,mW,26);
        const _isParentModal = this.user?.role==='parent';
        const _modalTitulo = _isParentModal ? '🏠  Crear grupo familiar' : '🏫  Crear nuevo grupo';
        const titT=this.add.text(W/2,my+34,_modalTitulo,{fontSize:'19px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);

        const xBg=this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-26,my+26,16);
        const xT=this.add.text(mx+mW-26,my+26,'✕',{fontSize:'15px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xH=this.add.rectangle(mx+mW-26,my+26,34,34,0,0).setInteractive({useHandCursor:true});
        xH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));
        xH.on('pointerover',()=>{xBg.clear();xBg.fillStyle(0xffffff,0.4);xBg.fillCircle(mx+mW-26,my+26,16);});
        xH.on('pointerout', ()=>{xBg.clear();xBg.fillStyle(0xffffff,0.22);xBg.fillCircle(mx+mW-26,my+26,16);});
        panel.add([sh,bg,hFix,hdr,titT,xBg,xT,xH]);

        // Campo Nombre
        const lN=this.add.text(mx+32,my+84,'Nombre del grupo *',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'});
        const inNBg=this.add.graphics(); inNBg.lineStyle(1.5,0xd8b4fe,1); inNBg.fillStyle(0xfaf5ff,1); inNBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);
        const inN=this.add.dom(mx+32+(mW-64)/2,my+130,'input',{width:(mW-100)+'px',height:'28px',border:'none',outline:'none',background:'transparent',fontSize:'15px',fontFamily:F.replace(/"/g,"'"),color:'#1e1b4b',padding:'0 10px'});
        inN.node.placeholder=this.user?.role==='parent'?'Ej: Familia García':'Ej: Grado 3A — Semestre 2025';
        panel.add([lN,inNBg,inN]);
        inN.node.addEventListener('focus',()=>{inNBg.clear();inNBg.lineStyle(2,_mC,1);inNBg.fillStyle(0xf0f9ff,1);inNBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});
        inN.node.addEventListener('blur', ()=>{inNBg.clear();inNBg.lineStyle(1.5,0xd8b4fe,1);inNBg.fillStyle(0xfaf5ff,1);inNBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});

        // Campo Descripción
        const lD=this.add.text(mx+32,my+164,'Descripción (opcional)',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'});
        const inDBg=this.add.graphics(); inDBg.lineStyle(1.5,0xd8b4fe,1); inDBg.fillStyle(0xfaf5ff,1); inDBg.fillRoundedRect(mx+32,my+188,mW-64,44,12);
        const inD=this.add.dom(mx+32+(mW-64)/2,my+210,'input',{width:(mW-100)+'px',height:'28px',border:'none',outline:'none',background:'transparent',fontSize:'14px',fontFamily:F.replace(/"/g,"'"),color:'#374151',padding:'0 10px'});
        inD.node.placeholder='Ej: Grupo matutino de hábitos saludables';
        panel.add([lD,inDBg,inD]);
        inD.node.addEventListener('focus',()=>{inDBg.clear();inDBg.lineStyle(2,_mC,1);inDBg.fillStyle(0xf0f9ff,1);inDBg.fillRoundedRect(mx+32,my+188,mW-64,44,12);});
        inD.node.addEventListener('blur', ()=>{inDBg.clear();inDBg.lineStyle(1.5,0xd8b4fe,1);inDBg.fillStyle(0xfaf5ff,1);inDBg.fillRoundedRect(mx+32,my+188,mW-64,44,12);});

        const btnY=my+mH-60;
        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,btnY,120,42,21);
        const canT=this.add.text(mx+92,btnY+21,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,btnY+21,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover',()=>{canBg.clear();canBg.fillStyle(0xe5e7eb,1);canBg.lineStyle(1,0xd1d5db,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerout', ()=>{canBg.clear();canBg.fillStyle(0xf3f4f6,1);canBg.lineStyle(1,0xe5e7eb,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const _crLabel = this.user?.role==='parent' ? '🏠 Crear grupo' : '🏫 Crear grupo';
        const crBg=this.add.graphics(); crBg.fillStyle(_mC,1); crBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);
        const crT=this.add.text(mx+mW-97,btnY+21,_crLabel,{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const crH=this.add.rectangle(mx+mW-97,btnY+21,130,42,0,0).setInteractive({useHandCursor:true});
        panel.add([crBg,crT,crH]);
        crH.on('pointerover',()=>{crBg.clear();crBg.fillStyle(_mC2,1);crBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);});
        crH.on('pointerout', ()=>{crBg.clear();crBg.fillStyle(_mC,1);crBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);});
        crH.on('pointerdown',()=>{
            const nombre=inN.node.value.trim();
            if(!nombre){this.mostrarToast('⚠️ El nombre del grupo es obligatorio',0xdc2626);return;}
            crearSalon(this.user.id,nombre,inD.node.value.trim());
            panel.destroy(); ov.destroy();
            this.mostrarToast('✅ Grupo creado correctamente',0x16a34a);
            this.time.delayedCall(600,()=>this._recargar());
        });

        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.88,to:1},scaleY:{from:0.88,to:1},duration:300,ease:'Back.easeOut'});
    }

    _modalAgregarEstudiante(salon) {
        const W=this.W,H=this.H;
        const todos=getAllUsers().filter(u=>isStudent(u));
        const enSalon=new Set(getEstudiantesDeSalon(salon.id).map(e=>e.id));
        const disponibles=todos.filter(u=>!enSalon.has(u.id));

        const ov=this.add.graphics(); ov.fillStyle(0x000000,0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=560, mH=Math.min(520,130+disponibles.length*66+80);
        const mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const { c1:_agC1, c2:_agC2 } = this._colores();
        const sh=this.add.graphics(); sh.fillStyle(_agC1,0.12); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(_agC1,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(_agC1,1); hFix.fillRect(mx,my+44,mW,26);
        const titT=this.add.text(W/2,my+34,'👥  Agregar estudiante al grupo',{fontSize:'18px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const subT=this.add.text(W/2,my+78,`Grupo: ${salon.nombre}`,{fontSize:'13px',fontFamily:F,fill:'#374151'}).setOrigin(0.5);

        const xBg=this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-26,my+26,16);
        const xT=this.add.text(mx+mW-26,my+26,'✕',{fontSize:'15px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xH=this.add.rectangle(mx+mW-26,my+26,34,34,0,0).setInteractive({useHandCursor:true});
        xH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));
        xH.on('pointerover',()=>{xBg.clear();xBg.fillStyle(0xffffff,0.4);xBg.fillCircle(mx+mW-26,my+26,16);});
        xH.on('pointerout', ()=>{xBg.clear();xBg.fillStyle(0xffffff,0.22);xBg.fillCircle(mx+mW-26,my+26,16);});
        panel.add([sh,bg,hFix,hdr,titT,subT,xBg,xT,xH]);

        if(disponibles.length===0){
            const emT=this.add.text(W/2,my+mH/2,'🎉 Todos los estudiantes ya están en este grupo',{fontSize:'14px',fontFamily:F,fill:'#9ca3af',align:'center',wordWrap:{width:mW-60}}).setOrigin(0.5);
            panel.add(emT);
        } else {
            let ly=my+104;
            disponibles.forEach(est=>{
                const _ly=ly;
                const stats=getEstadisticasEstudiante(est.id);
                const rBg=this.add.graphics(); rBg.fillStyle(0xf9fafb,1); rBg.lineStyle(1,0xe5e7eb,1); rBg.fillRoundedRect(mx+20,_ly,mW-40,54,12);
                const av=window.renderAvatar(this,mx+46,_ly+27,34,est);
                const nT=this.add.text(mx+74,_ly+12,est.name,{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#1f2937'});
                const sT=this.add.text(mx+74,_ly+34,`@${est.username}  ·  ⭐ ${stats?.points||0} pts  ·  🏆 ${stats?.logros||0} logros`,{fontSize:'11px',fontFamily:F,fill:'#6b7280'});
                const aBg=this.add.graphics(); aBg.fillStyle(_agC1,1); aBg.fillRoundedRect(mx+mW-106,_ly+12,82,30,15);
                const aT=this.add.text(mx+mW-65,_ly+27,'＋ Añadir',{fontSize:'12px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
                const aH=this.add.rectangle(mx+mW-65,_ly+27,82,30,0,0).setInteractive({useHandCursor:true});
                panel.add([rBg,av,nT,sT,aBg,aT,aH]);
                aH.on('pointerover',()=>{aBg.clear();aBg.fillStyle(_agC2,1);aBg.fillRoundedRect(mx+mW-106,_ly+12,82,30,15);});
                aH.on('pointerout', ()=>{aBg.clear();aBg.fillStyle(_agC1,1);aBg.fillRoundedRect(mx+mW-106,_ly+12,82,30,15);});
                aH.on('pointerdown',()=>{
                    if(this.user?.role==='parent'){
                        panel.destroy(); ov.destroy();
                        this._modalRolFamiliar(salon, est);
                    } else {
                        agregarEstudiante(salon.id,est.id);
                        this.mostrarToast(`✅ ${est.name} agregado al grupo`,0x16a34a);
                        panel.destroy(); ov.destroy();
                        this.estudianteSelec=getUserData(est.id);
                        this.time.delayedCall(500,()=>this._recargar());
                    }
                });
                ly+=66;
            });
        }
        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.88,to:1},scaleY:{from:0.88,to:1},duration:300,ease:'Back.easeOut'});
    }

    _modalRolFamiliar(salon, est) {
        const W=this.W, H=this.H;
        const { c1:_rC1, c2:_rC2 } = this._colores();
        const ROLES = [
            { label:'👦 Hijo',       val:'Hijo' },
            { label:'👧 Hija',       val:'Hija' },
            { label:'👨 Hermano',    val:'Hermano' },
            { label:'👩 Hermana',    val:'Hermana' },
            { label:'🧒 Sobrino',    val:'Sobrino' },
            { label:'👧 Sobrina',    val:'Sobrina' },
            { label:'👤 Otro',       val:'Otro' },
        ];
        const ov=this.add.graphics(); ov.fillStyle(0x000000,0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=520, mH=400, mx=(W-mW)/2, my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const sh=this.add.graphics(); sh.fillStyle(_rC1,0.14); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(_rC1,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(_rC1,1); hFix.fillRect(mx,my+44,mW,26);
        const titT=this.add.text(W/2,my+34,'👨‍👩‍👧  ¿Qué rol cumple en la familia?',{fontSize:'17px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const subT=this.add.text(W/2,my+78,est.name,{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'}).setOrigin(0.5);

        const xBg=this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-26,my+26,16);
        const xT=this.add.text(mx+mW-26,my+26,'✕',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xH=this.add.rectangle(mx+mW-26,my+26,34,34,0,0).setInteractive({useHandCursor:true});
        xH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));
        xH.on('pointerover',()=>{xBg.clear();xBg.fillStyle(0xffffff,0.4);xBg.fillCircle(mx+mW-26,my+26,16);});
        xH.on('pointerout', ()=>{xBg.clear();xBg.fillStyle(0xffffff,0.22);xBg.fillCircle(mx+mW-26,my+26,16);});
        panel.add([sh,bg,hFix,hdr,titT,subT,xBg,xT,xH]);

        let rolSel = null;
        const btnBgs = [];
        const cols=3, btnW=(mW-80)/cols, btnH=48, gap=14;
        ROLES.forEach((r,i)=>{
            const col=i%cols, row=Math.floor(i/cols);
            const bx=mx+32+col*(btnW+gap), by=my+100+row*(btnH+10);
            const bbg=this.add.graphics(); bbg.fillStyle(0xf9fafb,1); bbg.lineStyle(1.5,0xe5e7eb,1); bbg.fillRoundedRect(bx,by,btnW,btnH,12);
            const bt=this.add.text(bx+btnW/2,by+btnH/2,r.label,{fontSize:'13px',fontFamily:F,fontStyle:'bold',fill:'#374151'}).setOrigin(0.5);
            const bh=this.add.rectangle(bx+btnW/2,by+btnH/2,btnW,btnH,0,0).setInteractive({useHandCursor:true});
            panel.add([bbg,bt,bh]);
            btnBgs.push({bbg,bx,by,btnW,btnH,val:r.val,bt});
            const redraw=()=>{
                btnBgs.forEach(b=>{
                    const sel=b.val===rolSel;
                    b.bbg.clear();
                    b.bbg.fillStyle(sel?_rC1:0xf9fafb,1);
                    b.bbg.lineStyle(sel?2:1.5,sel?_rC1:0xe5e7eb,1);
                    b.bbg.fillRoundedRect(b.bx,b.by,b.btnW,b.btnH,12);
                    b.bt.setStyle({fill:sel?'#ffffff':'#374151'});
                });
            };
            bh.on('pointerdown',()=>{ rolSel=r.val; redraw(); });
            bh.on('pointerover',()=>{ if(r.val!==rolSel){bbg.clear();bbg.fillStyle(0xfff7ed,1);bbg.lineStyle(1.5,_rC1,1);bbg.fillRoundedRect(bx,by,btnW,btnH,12);} });
            bh.on('pointerout', ()=>{ if(r.val!==rolSel){bbg.clear();bbg.fillStyle(0xf9fafb,1);bbg.lineStyle(1.5,0xe5e7eb,1);bbg.fillRoundedRect(bx,by,btnW,btnH,12);} });
        });

        const btnY=my+mH-60;
        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,btnY,120,42,21);
        const canT=this.add.text(mx+92,btnY+21,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,btnY+21,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover',()=>{canBg.clear();canBg.fillStyle(0xe5e7eb,1);canBg.lineStyle(1,0xd1d5db,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerout', ()=>{canBg.clear();canBg.fillStyle(0xf3f4f6,1);canBg.lineStyle(1,0xe5e7eb,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const confBg=this.add.graphics(); confBg.fillStyle(_rC1,1); confBg.fillRoundedRect(mx+mW-172,btnY,140,42,21);
        const confT=this.add.text(mx+mW-102,btnY+21,'✅ Confirmar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const confH=this.add.rectangle(mx+mW-102,btnY+21,140,42,0,0).setInteractive({useHandCursor:true});
        panel.add([confBg,confT,confH]);
        confH.on('pointerover',()=>{confBg.clear();confBg.fillStyle(_rC2,1);confBg.fillRoundedRect(mx+mW-172,btnY,140,42,21);});
        confH.on('pointerout', ()=>{confBg.clear();confBg.fillStyle(_rC1,1);confBg.fillRoundedRect(mx+mW-172,btnY,140,42,21);});
        confH.on('pointerdown',()=>{
            if(!rolSel){this.mostrarToast('⚠️ Selecciona un rol familiar',0xdc2626);return;}
            agregarEstudianteConRol(salon.id,est.id,rolSel);
            panel.destroy(); ov.destroy();
            this.mostrarToast(`✅ ${est.name} agregado como ${rolSel}`,0x16a34a);
            this.estudianteSelec=getUserData(est.id);
            this.time.delayedCall(500,()=>this._recargar());
        });

        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.88,to:1},scaleY:{from:0.88,to:1},duration:300,ease:'Back.easeOut'});
    }

    _modalEditarEstudiante(est) {
        const W=this.W,H=this.H;
        const ov=this.add.graphics(); ov.fillStyle(0x000000,0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=460,mH=280,mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const { c1:_edC1, c2:_edC2 } = this._colores();
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(_edC1,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(_edC1,1); hFix.fillRect(mx,my+44,mW,26);
        const titT=this.add.text(W/2,my+34,'✏️  Editar Estudiante',{fontSize:'19px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xBg=this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-26,my+26,16);
        const xT=this.add.text(mx+mW-26,my+26,'✕',{fontSize:'15px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xH=this.add.rectangle(mx+mW-26,my+26,34,34,0,0).setInteractive({useHandCursor:true});
        xH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));
        xH.on('pointerover',()=>{xBg.clear();xBg.fillStyle(0xffffff,0.4);xBg.fillCircle(mx+mW-26,my+26,16);});
        xH.on('pointerout', ()=>{xBg.clear();xBg.fillStyle(0xffffff,0.22);xBg.fillCircle(mx+mW-26,my+26,16);});
        panel.add([bg,hFix,hdr,titT,xBg,xT,xH]);

        const lN=this.add.text(mx+32,my+84,'Nombre completo',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'});
        const inBg=this.add.graphics(); inBg.lineStyle(1.5,0xd8b4fe,1); inBg.fillStyle(0xfaf5ff,1); inBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);
        const inN=this.add.dom(mx+32+(mW-64)/2,my+130,'input',{width:(mW-100)+'px',height:'28px',border:'none',outline:'none',background:'transparent',fontSize:'15px',fontFamily:F.replace(/"/g,"'"),color:'#1e1b4b',padding:'0 10px'});
        inN.node.value=est.name||'';
        panel.add([lN,inBg,inN]);
        inN.node.addEventListener('focus',()=>{inBg.clear();inBg.lineStyle(2,_edC1,1);inBg.fillStyle(0xf0f9ff,1);inBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});
        inN.node.addEventListener('blur', ()=>{inBg.clear();inBg.lineStyle(1.5,0xd8b4fe,1);inBg.fillStyle(0xfaf5ff,1);inBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});

        const btnY=my+mH-60;
        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,btnY,120,42,21);
        const canT=this.add.text(mx+92,btnY+21,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,btnY+21,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover',()=>{canBg.clear();canBg.fillStyle(0xe5e7eb,1);canBg.lineStyle(1,0xd1d5db,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerout', ()=>{canBg.clear();canBg.fillStyle(0xf3f4f6,1);canBg.lineStyle(1,0xe5e7eb,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const savBg=this.add.graphics(); savBg.fillStyle(_edC1,1); savBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);
        const savT=this.add.text(mx+mW-97,btnY+21,'💾 Guardar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const savH=this.add.rectangle(mx+mW-97,btnY+21,130,42,0,0).setInteractive({useHandCursor:true});
        panel.add([savBg,savT,savH]);
        savH.on('pointerover',()=>{savBg.clear();savBg.fillStyle(_edC2,1);savBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);});
        savH.on('pointerout', ()=>{savBg.clear();savBg.fillStyle(_edC1,1);savBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);});
        savH.on('pointerdown',()=>{
            const nuevoNombre=inN.node.value.trim();
            if(!nuevoNombre){this.mostrarToast('⚠️ El nombre no puede estar vacío',0xdc2626);return;}
            const u=getUserData(est.id); if(!u)return;
            u.name=nuevoNombre; saveUserData(u);
            this.estudianteSelec=getUserData(est.id);
            panel.destroy(); ov.destroy();
            this.mostrarToast(`✅ Nombre actualizado a "${nuevoNombre}"`,0x16a34a);
            this.time.delayedCall(500,()=>this._recargar());
        });

        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.88,to:1},scaleY:{from:0.88,to:1},duration:280,ease:'Back.easeOut'});
    }

    _confirmarRemoverEstudiante(salon, est) {
        const W=this.W,H=this.H;
        const ov=this.add.graphics(); ov.fillStyle(0x000000,0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=440,mH=230,mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const ico=this.add.text(W/2,my+46,'🗑',{fontSize:'38px'}).setOrigin(0.5);
        const t1=this.add.text(W/2,my+94,'¿Eliminar a este estudiante?',{fontSize:'19px',fontFamily:F,fontStyle:'bold',fill:'#1f2937'}).setOrigin(0.5);
        const t2=this.add.text(W/2,my+124,`"${est.name}" será removido del grupo "${salon.nombre}".`,{fontSize:'13px',fontFamily:F,fill:'#6b7280',align:'center',wordWrap:{width:mW-60}}).setOrigin(0.5);
        panel.add([bg,ico,t1,t2]);

        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,my+mH-56,120,42,21);
        const canT=this.add.text(mx+92,my+mH-35,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,my+mH-35,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const delBg=this.add.graphics(); delBg.fillStyle(0xef4444,1); delBg.fillRoundedRect(mx+mW-162,my+mH-56,130,42,21);
        const delT=this.add.text(mx+mW-97,my+mH-35,'🗑 Eliminar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const delH=this.add.rectangle(mx+mW-97,my+mH-35,130,42,0,0).setInteractive({useHandCursor:true});
        panel.add([delBg,delT,delH]);
        delH.on('pointerover',()=>{delBg.clear();delBg.fillStyle(0xdc2626,1);delBg.fillRoundedRect(mx+mW-162,my+mH-56,130,42,21);});
        delH.on('pointerout', ()=>{delBg.clear();delBg.fillStyle(0xef4444,1);delBg.fillRoundedRect(mx+mW-162,my+mH-56,130,42,21);});
        delH.on('pointerdown',()=>{
            removerEstudiante(salon.id,est.id);
            this.estudianteSelec=null;
            panel.destroy(); ov.destroy();
            this.mostrarToast(`${est.name} eliminado del grupo`,0x6b7280);
            this.time.delayedCall(500,()=>this._recargar());
        });

        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.86,to:1},scaleY:{from:0.86,to:1},duration:270,ease:'Back.easeOut'});
    }

    _confirmarEliminar(salon) {
        const W=this.W,H=this.H;
        const ov=this.add.graphics(); ov.fillStyle(0x000000,0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=440,mH=230,mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const ico=this.add.text(W/2,my+46,'🗑',{fontSize:'38px'}).setOrigin(0.5);
        const t1=this.add.text(W/2,my+94,'¿Eliminar este grupo?',{fontSize:'19px',fontFamily:F,fontStyle:'bold',fill:'#1f2937'}).setOrigin(0.5);
        const t2=this.add.text(W/2,my+124,`"${salon.nombre}" y todos sus datos serán eliminados.`,{fontSize:'13px',fontFamily:F,fill:'#6b7280',align:'center',wordWrap:{width:mW-60}}).setOrigin(0.5);
        panel.add([bg,ico,t1,t2]);

        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,my+mH-56,120,42,21);
        const canT=this.add.text(mx+92,my+mH-35,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,my+mH-35,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const delBg=this.add.graphics(); delBg.fillStyle(0xef4444,1); delBg.fillRoundedRect(mx+mW-162,my+mH-56,130,42,21);
        const delT=this.add.text(mx+mW-97,my+mH-35,'🗑 Eliminar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const delH=this.add.rectangle(mx+mW-97,my+mH-35,130,42,0,0).setInteractive({useHandCursor:true});
        panel.add([delBg,delT,delH]);
        delH.on('pointerover',()=>{delBg.clear();delBg.fillStyle(0xdc2626,1);delBg.fillRoundedRect(mx+mW-162,my+mH-56,130,42,21);});
        delH.on('pointerout', ()=>{delBg.clear();delBg.fillStyle(0xef4444,1);delBg.fillRoundedRect(mx+mW-162,my+mH-56,130,42,21);});
        delH.on('pointerdown',()=>{
            eliminarSalon(salon.id,this.user.id);
            panel.destroy(); ov.destroy();
            this.mostrarToast('Grupo eliminado',0x6b7280);
            this.time.delayedCall(500,()=>{this.vista='salones';this.salonActivo=null;this.estudianteSelec=null;this._recargar();});
        });

        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.86,to:1},scaleY:{from:0.86,to:1},duration:270,ease:'Back.easeOut'});
    }

    // ════════════════════════════════════════════════════════
    //  MODAL EDITAR PERFIL DEL TUTOR
    // ════════════════════════════════════════════════════════
    _modalEditarPerfil() {
        const W = this.W, H = this.H;
        const u = this.user;

        // Avatares según rol exacto del tutor
        const TUTOR_AVATARS = u.role==='parent'
            ? ['parent1','parent2','parent3','parent4']
            : ['tutor1','tutor2','tutor3','tutor4'];

        const ov = this.add.graphics(); ov.fillStyle(0x000000,0.56); ov.fillRect(0,0,W,H); ov.setDepth(300).setInteractive();

        const mW = 680, mH = 480;
        const mx = (W-mW)/2, my = (H-mH)/2;
        const panel = this.add.container(0,0); panel.setDepth(301); panel.setAlpha(0);

        const { c1:_mpC1, c2:_mpC2, c3:_mpC3 } = this._colores();
        const sh = this.add.graphics(); sh.fillStyle(_mpC1,0.14); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg = this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr = this.add.graphics(); hdr.fillGradientStyle(_mpC1,_mpC1,_mpC3,_mpC3,1); hdr.fillRoundedRect(mx,my,mW,70,20);
        const hFx = this.add.graphics(); hFx.fillStyle(_mpC1,1); hFx.fillRect(mx,my+46,mW,27);
        const titT = this.add.text(W/2,my+35,'✏️  Editar mi perfil',{fontSize:'20px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);

        // X cerrar
        const xBg = this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-28,my+28,17);
        const xT  = this.add.text(mx+mW-28,my+28,'✕',{fontSize:'16px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xH  = this.add.rectangle(mx+mW-28,my+28,38,38,0,0).setInteractive({useHandCursor:true});
        xH.on('pointerover',()=>{xBg.clear();xBg.fillStyle(0xffffff,0.42);xBg.fillCircle(mx+mW-28,my+28,17);});
        xH.on('pointerout', ()=>{xBg.clear();xBg.fillStyle(0xffffff,0.22);xBg.fillCircle(mx+mW-28,my+28,17);});
        xH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:220,onComplete:()=>{panel.destroy();ov.destroy();}}));
        panel.add([sh,bg,hFx,hdr,titT,xBg,xT,xH]);

        // ── Nombre ──
        const lN = this.add.text(mx+36,my+86,'Nombre completo',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'});
        panel.add(lN);
        const inBg = this.add.graphics(); inBg.lineStyle(1.5,0xd8b4fe,1); inBg.fillStyle(0xfaf5ff,1); inBg.fillRoundedRect(mx+36,my+110,mW-72,44,12);
        panel.add(inBg);
        const inNom = this.add.dom(mx+36+(mW-72)/2,my+132,'input',{
            width:(mW-110)+'px',height:'28px',border:'none',outline:'none',
            background:'transparent',fontSize:'15px',fontFamily:F.replace(/"/g,"'"),color:'#1f1235',padding:'0 10px'
        });
        inNom.node.value = u.name || '';
        inNom.node.addEventListener('focus',()=>{inBg.clear();inBg.lineStyle(2,_pC1,1);inBg.fillStyle(0xf0f9ff,1);inBg.fillRoundedRect(mx+36,my+110,mW-72,44,12);});
        inNom.node.addEventListener('blur', ()=>{inBg.clear();inBg.lineStyle(1.5,_pC1,0.4);inBg.fillStyle(0xfaf5ff,1);inBg.fillRoundedRect(mx+36,my+110,mW-72,44,12);});
        panel.add(inNom);

        // ── Selector de foto ──
        const lAv = this.add.text(mx+36,my+168,'Elige tu foto de perfil',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'});
        panel.add(lAv);

        let avatarSel = u.avatar || 'tutor1';
        const avBtns  = [];
        const aPerRow = 4, aW = 82, aH = 76, aGap = 14;

        TUTOR_AVATARS.forEach((key,i) => {
            const ax = mx+36 + i%aPerRow*(aW+aGap);
            const ay = my+196 + Math.floor(i/aPerRow)*(aH+12);

            const avBg = this.add.graphics();
            const esSel = key===avatarSel;
            avBg.fillStyle(esSel?0xede9fe:0xf9fafb,1);
            avBg.lineStyle(esSel?2.5:1, esSel?_pC1:0xe5e7eb,1);
            avBg.fillRoundedRect(ax,ay,aW,aH,12);

            let avEl;
            if (this.textures.exists(key)) {
                avEl = this.add.image(ax+aW/2,ay+aH/2-4,key).setDisplaySize(50,50).setOrigin(0.5);
            } else {
                avEl = this.add.text(ax+aW/2,ay+aH/2-4,`${i+1}`,{fontSize:'24px',fontFamily:F,fontStyle:'bold',fill:esSel?'#7c3aed':'#9ca3af'}).setOrigin(0.5);
            }

            const avHit = this.add.rectangle(ax+aW/2,ay+aH/2,aW,aH,0,0).setInteractive({useHandCursor:true});
            panel.add([avBg,avEl,avHit]);
            avBtns.push({key,bg:avBg,ax,ay,aW,aH});

            const redraw = () => avBtns.forEach(b=>{
                b.bg.clear();
                const sel=b.key===avatarSel;
                b.bg.fillStyle(sel?0xdbeafe:0xf9fafb,1);
                b.bg.lineStyle(sel?2.5:1,sel?_pC1:0xe5e7eb,1);
                b.bg.fillRoundedRect(b.ax,b.ay,b.aW,b.aH,12);
            });

            avHit.on('pointerdown',()=>{ avatarSel=key; redraw(); });
            avHit.on('pointerover', ()=>{ if(key!==avatarSel){avBg.clear();avBg.fillStyle(0xf5f3ff,1);avBg.lineStyle(1.5,0xa78bda,1);avBg.fillRoundedRect(ax,ay,aW,aH,12);} });
            avHit.on('pointerout',  ()=>{ if(key!==avatarSel){avBg.clear();avBg.fillStyle(0xf9fafb,1);avBg.lineStyle(1,0xe5e7eb,1);avBg.fillRoundedRect(ax,ay,aW,aH,12);} });
        });

        // ── Botones ──
        const btnY = my+mH-64;

        // Cancelar
        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+36,btnY,126,44,22);
        const canT=this.add.text(mx+99,btnY+22,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+99,btnY+22,126,44,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover',()=>{canBg.clear();canBg.fillStyle(0xe5e7eb,1);canBg.lineStyle(1,0xd1d5db,1);canBg.fillRoundedRect(mx+36,btnY,126,44,22);});
        canH.on('pointerout', ()=>{canBg.clear();canBg.fillStyle(0xf3f4f6,1);canBg.lineStyle(1,0xe5e7eb,1);canBg.fillRoundedRect(mx+36,btnY,126,44,22);});
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        // Guardar
        const savBg=this.add.graphics(); savBg.fillStyle(_mpC1,1); savBg.fillRoundedRect(mx+mW-168,btnY,132,44,22);
        const savT=this.add.text(mx+mW-102,btnY+22,'💾 Guardar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const savH=this.add.rectangle(mx+mW-102,btnY+22,132,44,0,0).setInteractive({useHandCursor:true});
        panel.add([savBg,savT,savH]);
        savH.on('pointerover',()=>{savBg.clear();savBg.fillStyle(_pC2,1);savBg.fillRoundedRect(mx+mW-168,btnY,132,44,22);this.tweens.add({targets:savT,scaleX:1.06,scaleY:1.06,duration:100});});
        savH.on('pointerout', ()=>{savBg.clear();savBg.fillStyle(_mpC1,1);savBg.fillRoundedRect(mx+mW-168,btnY,132,44,22);this.tweens.add({targets:savT,scaleX:1,scaleY:1,duration:100});});
        savH.on('pointerdown',()=>{
            this.tweens.add({targets:savT,scaleX:0.92,scaleY:0.92,duration:70,yoyo:true,onComplete:()=>{
                const nuevoNombre = inNom.node.value.trim() || u.name;
                u.name   = nuevoNombre;
                u.avatar = avatarSel;
                saveUserData(u);
                this.user = getUserData(u.id);
                panel.destroy(); ov.destroy();
                this.mostrarToast(`✅ Perfil actualizado correctamente`, 0x16a34a);
                this.time.delayedCall(600,()=>this._recargar());
            }});
        });

        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.88,to:1},scaleY:{from:0.88,to:1},duration:320,ease:'Back.easeOut'});
    }

    // ════════════════════════════════════════════════════════
    //  MODAL EDITAR PERFIL — Tutor (Profesor / Padre / Madre)
    //  Permite cambiar nombre y foto, igual que el estudiante
    // ════════════════════════════════════════════════════════
    _modalEditarPerfil() {
        const W = this.W, H = this.H;
        const u = this.user;

        // Avatares según rol exacto del tutor
        const TUTOR_AVATARS = u.role==='parent'
            ? ['parent1','parent2','parent3','parent4']
            : ['tutor1','tutor2','tutor3','tutor4'];

        const ov = this.add.graphics();
        ov.fillStyle(0x000000, 0.56); ov.fillRect(0,0,W,H);
        ov.setDepth(200).setInteractive();

        const mW = 640, mH = 490;
        const mx = (W-mW)/2, my = (H-mH)/2;
        const panel = this.add.container(0,0);
        panel.setDepth(201); panel.setAlpha(0);

        // Fondo + header
        const _pC1 = u.role==='parent' ? 0xea580c : 0x1e40af;
        const _pC2 = u.role==='parent' ? 0xf97316 : 0x2563eb;
        const sh  = this.add.graphics(); sh.fillStyle(_pC1,0.14); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg  = this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr = this.add.graphics();
        hdr.fillGradientStyle(_pC1,_pC1,_pC2,_pC2,1);
        hdr.fillRoundedRect(mx,my,mW,70,20);
        const hFx = this.add.graphics(); hFx.fillStyle(_pC1,1); hFx.fillRect(mx,my+46,mW,28);
        const titT = this.add.text(W/2, my+35, '✏️  Editar Perfil', {
            fontSize:'20px', fontFamily:F, fontStyle:'bold', fill:'#fff'
        }).setOrigin(0.5);

        // X cerrar
        const xBg = this.add.graphics(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-28,my+28,17);
        const xT  = this.add.text(mx+mW-28,my+28,'✕',{fontSize:'15px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const xH  = this.add.rectangle(mx+mW-28,my+28,38,38,0,0).setInteractive({useHandCursor:true});
        xH.on('pointerover', ()=>{ xBg.clear(); xBg.fillStyle(0xffffff,0.42); xBg.fillCircle(mx+mW-28,my+28,17); });
        xH.on('pointerout',  ()=>{ xBg.clear(); xBg.fillStyle(0xffffff,0.22); xBg.fillCircle(mx+mW-28,my+28,17); });
        xH.on('pointerdown', ()=> this.tweens.add({targets:[panel,ov],alpha:0,duration:220,onComplete:()=>{panel.destroy();ov.destroy();}}));
        panel.add([sh,bg,hFx,hdr,titT,xBg,xT,xH]);

        // ── Campo Nombre ──
        const lNom = this.add.text(mx+36, my+88, 'Nombre completo', {
            fontSize:'14px', fontFamily:F, fontStyle:'bold', fill:'#374151'
        });
        panel.add(lNom);

        const inBg = this.add.graphics();
        inBg.lineStyle(1.5,0xbfdbfe,1); inBg.fillStyle(0xf0f9ff,1);
        inBg.fillRoundedRect(mx+36,my+112,mW-72,44,12);
        panel.add(inBg);

        const inNom = this.add.dom(mx+36+(mW-72)/2, my+134, 'input', {
            width:(mW-110)+'px', height:'28px', border:'none', outline:'none',
            background:'transparent', fontSize:'15px',
            fontFamily:F.replace(/"/g,"'"), color:'#1e3a8a', padding:'0 10px'
        });
        inNom.node.value = u.name || '';
        inNom.node.addEventListener('focus', ()=>{ inBg.clear(); inBg.lineStyle(2,_mpC1,1); inBg.fillStyle(0xf0f9ff,1); inBg.fillRoundedRect(mx+36,my+112,mW-72,44,12); });
        inNom.node.addEventListener('blur',  ()=>{ inBg.clear(); inBg.lineStyle(1.5,0xbfdbfe,1); inBg.fillStyle(0xf0f9ff,1); inBg.fillRoundedRect(mx+36,my+112,mW-72,44,12); });
        panel.add(inNom);

        // ── Selector de avatar ──
        const lAv = this.add.text(mx+36, my+170, 'Elige tu foto de perfil', {
            fontSize:'14px', fontFamily:F, fontStyle:'bold', fill:'#374151'
        });
        panel.add(lAv);

        let avatarSel = u.avatar || 'tutor1';
        const avBtns  = [];
        const aPerRow = 4, aW = 88, aH = 80, aGap = 16;

        TUTOR_AVATARS.forEach((key, i) => {
            const ax = mx + 36 + i % aPerRow * (aW + aGap);
            const ay = my + 198 + Math.floor(i / aPerRow) * (aH + 12);

            const avBg = this.add.graphics();
            const esSel = key === avatarSel;
            avBg.fillStyle(esSel ? 0xdbeafe : 0xf9fafb, 1);
            avBg.lineStyle(esSel ? 2.5 : 1, esSel ? 0x1d4ed8 : 0xe5e7eb, 1);
            avBg.fillRoundedRect(ax, ay, aW, aH, 14);

            // Imagen o fallback
            let avEl;
            if (this.textures.exists(key)) {
                avEl = this.add.image(ax+aW/2, ay+aH/2-4, key).setDisplaySize(52,52).setOrigin(0.5);
            } else {
                avEl = this.add.text(ax+aW/2, ay+aH/2-4,
                    key.charAt(0).toUpperCase()+key.slice(1),
                    {fontSize:'12px',fontFamily:F,fill:'#374151'}
                ).setOrigin(0.5);
            }

            const avHit = this.add.rectangle(ax+aW/2,ay+aH/2,aW,aH,0,0).setInteractive({useHandCursor:true});
            panel.add([avBg, avEl, avHit]);
            avBtns.push({ key, bg:avBg, ax, ay, aW, aH });

            const _redraw = () => {
                avBtns.forEach(b => {
                    b.bg.clear();
                    const sel = b.key === avatarSel;
                    b.bg.fillStyle(sel ? 0xdbeafe : 0xf9fafb, 1);
                    b.bg.lineStyle(sel ? 2.5 : 1, sel ? 0x1d4ed8 : 0xe5e7eb, 1);
                    b.bg.fillRoundedRect(b.ax,b.ay,b.aW,b.aH,14);
                });
            };

            avHit.on('pointerdown', ()=>{ avatarSel=key; _redraw(); });
            avHit.on('pointerover', ()=>{ if(key!==avatarSel){ avBg.clear(); avBg.fillStyle(0xeff6ff,1); avBg.lineStyle(1.5,0x93c5fd,1); avBg.fillRoundedRect(ax,ay,aW,aH,14); } });
            avHit.on('pointerout',  ()=>{ if(key!==avatarSel){ avBg.clear(); avBg.fillStyle(0xf9fafb,1); avBg.lineStyle(1,0xe5e7eb,1); avBg.fillRoundedRect(ax,ay,aW,aH,14); } });
        });

        // ── Botones Cancelar / Guardar ──
        const btnY = my + mH - 66;

        const canBg = this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+36,btnY,126,46,23);
        const canT  = this.add.text(mx+99,btnY+23,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH  = this.add.rectangle(mx+99,btnY+23,126,46,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover', ()=>{ canBg.clear(); canBg.fillStyle(0xe5e7eb,1); canBg.lineStyle(1,0xd1d5db,1); canBg.fillRoundedRect(mx+36,btnY,126,46,23); });
        canH.on('pointerout',  ()=>{ canBg.clear(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+36,btnY,126,46,23); });
        canH.on('pointerdown', ()=> this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const savBg = this.add.graphics(); savBg.fillStyle(_pC1,1); savBg.fillRoundedRect(mx+mW-170,btnY,134,46,23);
        const savT  = this.add.text(mx+mW-103,btnY+23,'💾 Guardar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const savH  = this.add.rectangle(mx+mW-103,btnY+23,134,46,0,0).setInteractive({useHandCursor:true});
        panel.add([savBg,savT,savH]);
        savH.on('pointerover', ()=>{ savBg.clear(); savBg.fillStyle(_pC2,1); savBg.fillRoundedRect(mx+mW-170,btnY,134,46,23); });
        savH.on('pointerout',  ()=>{ savBg.clear(); savBg.fillStyle(_pC1,1); savBg.fillRoundedRect(mx+mW-170,btnY,134,46,23); });
        savH.on('pointerdown', ()=>{
            this.tweens.add({ targets:savT, scaleX:0.92, scaleY:0.92, duration:70, yoyo:true, onComplete:()=>{
                const nuevoNombre = inNom.node.value.trim();
                if (!nuevoNombre) { this.mostrarToast('⚠️ El nombre no puede estar vacío', 0xdc2626); return; }
                const userData = getUserData(u.id);
                if (!userData) return;
                userData.name   = nuevoNombre;
                userData.avatar = avatarSel;
                saveUserData(userData);
                // Guardar estado de navegación antes de reiniciar la escena
                this.registry.set('tutor_vista', this.vista);
                this.registry.set('tutor_salon_id', this.salonActivo?.id || null);
                this.registry.set('tutor_est_id', this.estudianteSelec?.id || null);
                panel.destroy(); ov.destroy();
                this.mostrarToast(`✅ Perfil actualizado correctamente`, 0x16a34a);
                // Reiniciar escena completa para reflejar el nuevo avatar en el topbar
                this.time.delayedCall(600, ()=>{ this.scene.restart(); });
            }});
        });

        this.tweens.add({targets:panel, alpha:1, scaleX:{from:0.88,to:1}, scaleY:{from:0.88,to:1}, duration:320, ease:'Back.easeOut'});
    }


}

// ── Configuración Phaser ──
const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 860,
    backgroundColor: '#f5eeff',
    parent: 'game-container',
    scene: [LoginScene, MenuScene, ProfileScene, FoodScene, HygieneScene, ActivityScene, TutorScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    dom: { createContainer: true }
};
new Phaser.Game(config);

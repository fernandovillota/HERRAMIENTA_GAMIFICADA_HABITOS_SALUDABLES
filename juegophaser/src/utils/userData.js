// src/utils/userData.js
import { ACHIEVEMENTS } from './gameData.js';

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
export const isTutor   = (u) => u && (u.role==='teacher' || u.role==='parent' || u.role==='tutor');
export const isStudent = (u) => u && u.role==='student';
export const isTeacher = (u) => u && (u.role==='teacher');
export const isParent  = (u) => u && (u.role==='parent');

const _bs  = () => ({ current:0, longest:0, lastPlayDate:'', daysCompleted:[] });
const _bp  = () => ({ food:0, hygiene:0, activity:0 });

// ── Predefinidos ─────────────────────────────────────────
export const PREDEFINED_USERS = [
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
export const getAllUsers  = () => { try{return JSON.parse(storage.get('all_users')||'[]');}catch{return[];} };
export const getUserData  = (id) => getAllUsers().find(u=>u.id===id)||null;
export const saveUserData = (user) => {
    const all=getAllUsers(), idx=all.findIndex(u=>u.id===user.id);
    if(idx>=0)all[idx]=user;else all.push(user);
    storage.set('all_users',JSON.stringify(all));
};

// ── Sesión ───────────────────────────────────────────────
export const getCurrentUser   = () => { try{const id=storage.get('current_user_id');return id?getUserData(id):null;}catch{return null;} };
export const setCurrentUser   = (id) => storage.set('current_user_id',id);
export const clearCurrentUser = ()   => storage.remove('current_user_id');

// ── Auth ─────────────────────────────────────────────────
export const loginUser = (username,password) => {
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

export const registerUser = (username,password,name,role='student',avatar='avatar1') => {
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
export const addPoints = (userId,pts) => {
    const u=getUserData(userId); if(!u)return null;
    u.points=(u.points||0)+pts; u.level=Math.max(1,Math.floor(u.points/100)+1);
    saveUserData(u); return u;
};

// ── Progreso módulo ──────────────────────────────────────
export const updateModuleProgress = (userId,module) => {
    const u=getUserData(userId); if(!u)return null;
    if(!u.moduleProgress)u.moduleProgress=_bp();
    u.moduleProgress[module]=(u.moduleProgress[module]||0)+1;
    saveUserData(u); return u;
};

// ── Logros ───────────────────────────────────────────────
export const unlockAchievement = (userId,id) => {
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

export const checkAndUnlockAchievements = (user) => {
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

export const updateStreak = (userId) => {
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

export const getStreakCalendar = (user) => {
    const t=new Date();
    return Array.from({length:30},(_,i)=>{
        const d=new Date(t); d.setDate(d.getDate()-(29-i));
        const ds=_ds(d);
        return{date:ds,completed:(user.streak?.daysCompleted||[]).includes(ds)};
    });
};

export const setFeaturedAchievement = (userId,id) => {
    const u=getUserData(userId); if(!u||!(u.achievements||[]).includes(id))return null;
    u.featuredAchievement=id; saveUserData(u); return u;
};
export const updateUserAvatar = (userId,avatar) => {
    const u=getUserData(userId); if(!u)return null;
    u.avatar=avatar; saveUserData(u); return u;
};

// ══════════════════════════════════════════════════════════
//  SISTEMA DE SALONES
// ══════════════════════════════════════════════════════════
const _gc = () => { const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; return Array.from({length:6},()=>c[Math.floor(Math.random()*c.length)]).join(''); };

export const getAllSalones     = () => { try{return JSON.parse(storage.get('habitos_salones')||'[]');}catch{return[];} };
const _saveSalones = (l)        => storage.set('habitos_salones',JSON.stringify(l));
export const getSalonById      = (id) => getAllSalones().find(s=>s.id===id)||null;
export const getSalonesDeTutor = (tutorId) => getAllSalones().filter(s=>s.tutorId===tutorId);

export const crearSalon = (tutorId,nombre,descripcion='') => {
    const all=getAllSalones();
    const s={ id:Date.now().toString(),tutorId,nombre:nombre.trim(),descripcion:descripcion.trim(),
              codigo:_gc(),estudiantes:[],creadoEn:new Date().toISOString() };
    all.push(s); _saveSalones(all); return s;
};

export const editarSalon = (salonId,cambios) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    all[idx]={...all[idx],...cambios}; _saveSalones(all); return all[idx];
};

export const eliminarSalon = (salonId,tutorId) => {
    _saveSalones(getAllSalones().filter(s=>!(s.id===salonId&&s.tutorId===tutorId)));
};

export const agregarEstudiante = (salonId,studentId) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    if(!all[idx].estudiantes.includes(studentId)){all[idx].estudiantes.push(studentId);_saveSalones(all);}
    return all[idx];
};

export const removerEstudiante = (salonId,studentId) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.id===salonId);
    if(idx<0)return null;
    all[idx].estudiantes=all[idx].estudiantes.filter(id=>id!==studentId);
    _saveSalones(all); return all[idx];
};

export const unirseConCodigo = (codigo,studentId) => {
    const all=getAllSalones(),idx=all.findIndex(s=>s.codigo===codigo.toUpperCase().trim());
    if(idx<0)return{error:'Código de salón no encontrado'};
    if(all[idx].estudiantes.includes(studentId))return{error:'Ya estás en este salón'};
    all[idx].estudiantes.push(studentId); _saveSalones(all); return{salon:all[idx]};
};

export const getEstudiantesDeSalon = (salonId) => {
    const s=getSalonById(salonId); if(!s)return[];
    return s.estudiantes.map(id=>getUserData(id)).filter(Boolean);
};

export const getEstadisticasEstudiante = (userId) => {
    const u=getUserData(userId); if(!u)return null;
    const mp=u.moduleProgress||_bp(), st=u.streak||_bs();
    return {
        id:u.id, name:u.name, username:u.username, avatar:u.avatar,
        points:u.points||0, level:u.level||1,
        logros:(u.achievements||[]).length, totalLogros:ACHIEVEMENTS.length,
        food:mp.food||0, hygiene:mp.hygiene||0, activity:mp.activity||0,
        rachaActual:st.current||0, rachaMasLarga:st.longest||0,
        diasActivos:(st.daysCompleted||[]).length, ultimaVez:st.lastPlayDate||null,
    };
};

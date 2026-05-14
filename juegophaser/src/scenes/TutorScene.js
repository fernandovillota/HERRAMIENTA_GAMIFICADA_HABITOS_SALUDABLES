// src/scenes/TutorScene.js — Panel del Tutor (Profesor / Padre / Madre)
import BaseScene, { renderAvatar } from './BaseScene.js';
import {
    getCurrentUser, clearCurrentUser, isTutor,
    getSalonesDeTutor, getSalonById, crearSalon, editarSalon, eliminarSalon,
    getEstudiantesDeSalon, agregarEstudiante, removerEstudiante,
    getEstadisticasEstudiante, getAllUsers, isStudent, saveUserData, getUserData
} from '../utils/userData.js';

const F = '"Segoe UI",Arial,sans-serif';

export default class TutorScene extends BaseScene {

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
        g.fillGradientStyle(0xf3e8ff, 0xf3e8ff, 0xfce7f3, 0xf0e6ff, 1);
        g.fillRect(0, 0, this.W, this.H);
    }

    // ════════════════════════════════════════════════════════
    //  TOPBAR — blanco, estilo referencia
    // ════════════════════════════════════════════════════════
    _topbar() {
        const W = this.W, u = this.user;

        // Fondo blanco con sombra suave
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(20, 10, W - 40, 68, 16);
        bg.lineStyle(1, 0xe9d5ff, 1);
        bg.strokeRoundedRect(20, 10, W - 40, 68, 16);

        // Avatar + info tutor
        renderAvatar(this, 60, 44, 44, u);
        const rol = u.role === 'tutor' ? 'Panel del Tutor' : 'Panel del Tutor';
        const tNombre = this.add.text(90, 32, u.name || u.username, { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        const tRol    = this.add.text(90, 54, rol, { fontSize: '12px', fontFamily: F, fill: '#7c3aed' });

        // Btn Configuración
        const cfgBg = this.add.graphics();
        cfgBg.fillStyle(0xfafafa, 1); cfgBg.lineStyle(1.5, 0xe5e7eb, 1);
        cfgBg.fillRoundedRect(W - 280, 22, 148, 38, 19);
        const cfgT = this.add.text(W - 206, 41, '⚙️  Configuración', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#374151' }).setOrigin(0.5);
        const cfgH = this.add.rectangle(W - 206, 41, 148, 38, 0, 0).setInteractive({ useHandCursor: true });
        cfgH.on('pointerover',  () => { cfgBg.clear(); cfgBg.fillStyle(0xf5f3ff, 1); cfgBg.lineStyle(1.5, 0x7c3aed, 1); cfgBg.fillRoundedRect(W-280, 22, 148, 38, 19); this.tweens.add({targets:cfgT,scaleX:1.04,scaleY:1.04,duration:100}); });
        cfgH.on('pointerout',   () => { cfgBg.clear(); cfgBg.fillStyle(0xfafafa, 1); cfgBg.lineStyle(1.5, 0xe5e7eb, 1); cfgBg.fillRoundedRect(W-280, 22, 148, 38, 19); this.tweens.add({targets:cfgT,scaleX:1,scaleY:1,duration:100}); });
        cfgH.on('pointerdown',  () => this.mostrarToast('⚙️ Configuración próximamente', 0x7c3aed));

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
        renderAvatar(this, margin + 52, y + 44, 54, this.user);
        this._add(this.children.getAll().pop());
        const tB  = this.add.text(margin + 94, y + 18, `Bienvenido/a, ${(this.user.name||'').split(' ')[0]} 👋`, { fontSize: '21px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        const tR  = this.add.text(margin + 94, y + 50, 'Gestiona tus grupos y monitorea el progreso de tus estudiantes', { fontSize: '13px', fontFamily: F, fill: '#6b7280' });
        this._add(tB); this._add(tR);
        y += 104;

        // Botón crear salón
        const cbg = this.add.graphics(); cbg.fillStyle(0x7c3aed, 1); cbg.fillRoundedRect(margin, y, 210, 44, 22);
        const ct = this.add.text(margin + 105, y + 22, '＋  Nuevo grupo', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const ch = this.add.rectangle(margin + 105, y + 22, 210, 44, 0, 0).setInteractive({ useHandCursor: true });
        this._add(cbg); this._add(ct); this._add(ch);
        ch.on('pointerover', () => { cbg.clear(); cbg.fillStyle(0x6d28d9, 1); cbg.fillRoundedRect(margin, y, 210, 44, 22); this.tweens.add({targets:ct,scaleX:1.04,scaleY:1.04,duration:100}); });
        ch.on('pointerout',  () => { cbg.clear(); cbg.fillStyle(0x7c3aed, 1); cbg.fillRoundedRect(margin, y, 210, 44, 22); this.tweens.add({targets:ct,scaleX:1,scaleY:1,duration:100}); });
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
        // Barra lateral morada
        const bar = this.add.graphics(); bar.fillStyle(0x7c3aed, 1); bar.fillRoundedRect(x, y, 5, h, 3);
        this._add(bar);

        // Código badge
        const codBg = this.add.graphics(); codBg.fillStyle(0xede9fe, 1); codBg.fillRoundedRect(x + w - 122, y + 14, 106, 28, 14);
        this._add(codBg);
        const codT = this.add.text(x + w - 69, y + 28, `🔑 ${salon.codigo}`, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#7c3aed' }).setOrigin(0.5);
        this._add(codT);

        // Info salón
        const nT  = this.add.text(x + 22, y + 14, salon.nombre, { fontSize: '19px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        const dT  = this.add.text(x + 22, y + 40, salon.descripcion || 'Sin descripción', { fontSize: '12px', fontFamily: F, fill: '#9ca3af' });
        const stT = this.add.text(x + 22, y + 62, `👥 ${estudiantes.length} estudiante${estudiantes.length !== 1 ? 's' : ''}  ·  ⭐ ${totalPts} puntos totales`, { fontSize: '12px', fontFamily: F, fill: '#374151' });
        this._add(nT); this._add(dT); this._add(stT);

        // Avatares mini
        estudiantes.slice(0, 5).forEach((est, i) => {
            const av = renderAvatar(this, x + 22 + i * 30, y + 92, 22, est);
            this._add(av);
        });
        if (estudiantes.length > 5) {
            const mT = this.add.text(x + 22 + 5 * 30 + 6, y + 92, `+${estudiantes.length - 5}`, { fontSize: '11px', fontFamily: F, fill: '#7c3aed' }).setOrigin(0, 0.5);
            this._add(mT);
        }

        // Botones
        this._btnSmall(x + w - 220, y + h - 42, 100, 32, '👁 Ver grupo', 0x7c3aed, 0x6d28d9, () => this._irDetalle(salon));
        this._btnSmall(x + w - 112, y + h - 42, 100, 32, '🗑 Eliminar', 0xef4444, 0xdc2626, () => this._confirmarEliminar(salon));

        return y + h;
    }

    _btnSmall(x, y, w, h, label, c1, c2, cb) {
        const bg = this.add.graphics(); bg.fillStyle(c1, 1); bg.fillRoundedRect(x, y, w, h, h / 2);
        const t  = this.add.text(x + w / 2, y + h / 2, label, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const hit= this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this._add(bg); this._add(t); this._add(hit);
        hit.on('pointerover', () => { bg.clear(); bg.fillStyle(c2, 1); bg.fillRoundedRect(x, y, w, h, h/2); this.tweens.add({targets:t,scaleX:1.06,scaleY:1.06,duration:100}); });
        hit.on('pointerout',  () => { bg.clear(); bg.fillStyle(c1, 1); bg.fillRoundedRect(x, y, w, h, h/2); this.tweens.add({targets:t,scaleX:1,scaleY:1,duration:100}); });
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
        const vBg = this.add.graphics(); vBg.fillStyle(0xffffff, 1); vBg.lineStyle(1.5, 0xe9d5ff, 1); vBg.fillRoundedRect(leftX, y, 170, 36, 18);
        const vT  = this.add.text(leftX + 85, y + 18, '← Mis grupos', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#7c3aed' }).setOrigin(0.5);
        const vH  = this.add.rectangle(leftX + 85, y + 18, 170, 36, 0, 0).setInteractive({ useHandCursor: true });
        this._add(vBg); this._add(vT); this._add(vH);
        vH.on('pointerover', () => { vBg.clear(); vBg.fillStyle(0xf5f3ff, 1); vBg.lineStyle(2, 0x7c3aed, 1); vBg.fillRoundedRect(leftX, y, 170, 36, 18); });
        vH.on('pointerout',  () => { vBg.clear(); vBg.fillStyle(0xffffff, 1); vBg.lineStyle(1.5, 0xe9d5ff, 1); vBg.fillRoundedRect(leftX, y, 170, 36, 18); });
        vH.on('pointerdown', () => { this.vista='salones'; this.salonActivo=null; this.estudianteSelec=null; this._recargar(); });
        y += 46;

        // ── Nombre del salón y código ──
        const hnBg = this.add.graphics(); hnBg.fillStyle(0x7c3aed, 1); hnBg.fillRoundedRect(leftX, y, W - 60, 56, 14);
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
        const aBg = this.add.graphics(); aBg.fillStyle(0x7c3aed, 1); aBg.fillRoundedRect(x + w - 98, y + 12, 82, 30, 15);
        const aT  = this.add.text(x + w - 57, y + 27, '＋ Agregar', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const aH  = this.add.rectangle(x + w - 57, y + 27, 82, 30, 0, 0).setInteractive({ useHandCursor: true });
        this._add(aBg); this._add(aT); this._add(aH);
        aH.on('pointerover', () => { aBg.clear(); aBg.fillStyle(0x6d28d9, 1); aBg.fillRoundedRect(x+w-98, y+12, 82, 30, 15); this.tweens.add({targets:aT,scaleX:1.05,scaleY:1.05,duration:100}); });
        aH.on('pointerout',  () => { aBg.clear(); aBg.fillStyle(0x7c3aed, 1); aBg.fillRoundedRect(x+w-98, y+12, 82, 30, 15); this.tweens.add({targets:aT,scaleX:1,scaleY:1,duration:100}); });
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

                const av = renderAvatar(this, x + 36, ey + rowH / 2, 34, est);
                this._add(av);

                const nT = this.add.text(x + 62, ey + rowH / 2 - 9, est.name, {
                    fontSize: '14px', fontFamily: F, fontStyle: 'bold',
                    fill: esSelec ? '#ffffff' : '#1f2937'
                }).setOrigin(0, 0.5);
                const sT = this.add.text(x + 62, ey + rowH / 2 + 10, `${stats?.points || 0} puntos · ${(stats?.food||0) + (stats?.hygiene||0) + (stats?.activity||0)} juegos`, {
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
        const metricas = [
            { label: 'Total Puntos',        value: `${stats.points}`,      emoji: '⭐', color: 0x7c3aed, tcolor: '#fff' },
            { label: 'Juegos Jugados',       value: `${totalJuegos}`,       emoji: '🎮', color: 0x2563eb, tcolor: '#fff' },
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
        ebH.on('pointerover', () => { ebBg.clear(); ebBg.fillStyle(0xf5f3ff, 1); ebBg.lineStyle(1.5, 0x7c3aed, 1); ebBg.fillRoundedRect(x, actY, (w-12)/2, 44, 22); this.tweens.add({targets:ebT,scaleX:1.04,scaleY:1.04,duration:100}); });
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

        // ── Últimas Partidas ──
        const ulpY = rachY + 108;
        const ulpBg = this.add.graphics(); ulpBg.fillStyle(0xffffff, 1); ulpBg.lineStyle(1, 0xe9d5ff, 1); ulpBg.fillRoundedRect(x, ulpY, w, H - ulpY - 30, 14);
        this._add(ulpBg);
        const ulpT = this.add.text(x + 18, ulpY + 18, '📋  Últimas Partidas', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#1e1b4b' });
        this._add(ulpT);

        if (!haPlayed) {
            const noP = this.add.text(x + w / 2, ulpY + 60, 'Sin partidas registradas aún.', { fontSize: '13px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(noP);
        } else {
            // Mostrar resumen de módulos jugados como "partidas"
            const partidas = [];
            if (stats.food > 0)    partidas.push({ mod: '🍎 Alimentación', juegos: stats.food,    color: 0xe6f4ea, tc: '#166534' });
            if (stats.hygiene > 0) partidas.push({ mod: '🪥 Higiene',      juegos: stats.hygiene, color: 0xe0f2fe, tc: '#075985' });
            if (stats.activity > 0)partidas.push({ mod: '🏃 Actividad',    juegos: stats.activity,color: 0xfff3e0, tc: '#92400e' });

            let py = ulpY + 48;
            partidas.forEach(p => {
                const pBg = this.add.graphics(); pBg.fillStyle(p.color, 1); pBg.fillRoundedRect(x + 14, py, w - 28, 38, 10);
                this._add(pBg);
                const pT = this.add.text(x + 30, py + 19, `${p.mod} — ${p.juegos} sesión${p.juegos !== 1 ? 'es' : ''} completada${p.juegos !== 1 ? 's' : ''}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: p.tc }).setOrigin(0, 0.5);
                this._add(pT);
                py += 46;
            });
        }
    }

    // ════════════════════════════════════════════════════════
    //  MODALES
    // ════════════════════════════════════════════════════════

    _modalNuevoSalon() {
        const W = this.W, H = this.H;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=520,mH=340,mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const sh=this.add.graphics(); sh.fillStyle(0x7c3aed,0.14); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(0x7c3aed,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(0x7c3aed,1); hFix.fillRect(mx,my+44,mW,26);
        const titT=this.add.text(W/2,my+34,'🏫  Crear nuevo grupo',{fontSize:'19px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);

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
        inN.node.placeholder='Ej: Grado 3A — Semestre 2025';
        panel.add([lN,inNBg,inN]);
        inN.node.addEventListener('focus',()=>{inNBg.clear();inNBg.lineStyle(2,0x7c3aed,1);inNBg.fillStyle(0xfaf5ff,1);inNBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});
        inN.node.addEventListener('blur', ()=>{inNBg.clear();inNBg.lineStyle(1.5,0xd8b4fe,1);inNBg.fillStyle(0xfaf5ff,1);inNBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});

        // Campo Descripción
        const lD=this.add.text(mx+32,my+164,'Descripción (opcional)',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#374151'});
        const inDBg=this.add.graphics(); inDBg.lineStyle(1.5,0xd8b4fe,1); inDBg.fillStyle(0xfaf5ff,1); inDBg.fillRoundedRect(mx+32,my+188,mW-64,44,12);
        const inD=this.add.dom(mx+32+(mW-64)/2,my+210,'input',{width:(mW-100)+'px',height:'28px',border:'none',outline:'none',background:'transparent',fontSize:'14px',fontFamily:F.replace(/"/g,"'"),color:'#374151',padding:'0 10px'});
        inD.node.placeholder='Ej: Grupo matutino de hábitos saludables';
        panel.add([lD,inDBg,inD]);
        inD.node.addEventListener('focus',()=>{inDBg.clear();inDBg.lineStyle(2,0x7c3aed,1);inDBg.fillStyle(0xfaf5ff,1);inDBg.fillRoundedRect(mx+32,my+188,mW-64,44,12);});
        inD.node.addEventListener('blur', ()=>{inDBg.clear();inDBg.lineStyle(1.5,0xd8b4fe,1);inDBg.fillStyle(0xfaf5ff,1);inDBg.fillRoundedRect(mx+32,my+188,mW-64,44,12);});

        const btnY=my+mH-60;
        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,btnY,120,42,21);
        const canT=this.add.text(mx+92,btnY+21,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,btnY+21,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover',()=>{canBg.clear();canBg.fillStyle(0xe5e7eb,1);canBg.lineStyle(1,0xd1d5db,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerout', ()=>{canBg.clear();canBg.fillStyle(0xf3f4f6,1);canBg.lineStyle(1,0xe5e7eb,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const crBg=this.add.graphics(); crBg.fillStyle(0x7c3aed,1); crBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);
        const crT=this.add.text(mx+mW-97,btnY+21,'🏫 Crear grupo',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const crH=this.add.rectangle(mx+mW-97,btnY+21,130,42,0,0).setInteractive({useHandCursor:true});
        panel.add([crBg,crT,crH]);
        crH.on('pointerover',()=>{crBg.clear();crBg.fillStyle(0x6d28d9,1);crBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);this.tweens.add({targets:crT,scaleX:1.05,scaleY:1.05,duration:100});});
        crH.on('pointerout', ()=>{crBg.clear();crBg.fillStyle(0x7c3aed,1);crBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);this.tweens.add({targets:crT,scaleX:1,scaleY:1,duration:100});});
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

        const sh=this.add.graphics(); sh.fillStyle(0x16a34a,0.12); sh.fillRoundedRect(mx+4,my+8,mW,mH,22);
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(0x16a34a,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(0x16a34a,1); hFix.fillRect(mx,my+44,mW,26);
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
                const stats=getEstadisticasEstudiante(est.id);
                const rBg=this.add.graphics(); rBg.fillStyle(0xf9fafb,1); rBg.lineStyle(1,0xe5e7eb,1); rBg.fillRoundedRect(mx+20,ly,mW-40,54,12);
                const av=renderAvatar(this,mx+46,ly+27,34,est);
                const nT=this.add.text(mx+74,ly+12,est.name,{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#1f2937'});
                const sT=this.add.text(mx+74,ly+34,`@${est.username}  ·  ⭐ ${stats?.points||0} pts  ·  🏆 ${stats?.logros||0} logros`,{fontSize:'11px',fontFamily:F,fill:'#6b7280'});
                const aBg=this.add.graphics(); aBg.fillStyle(0x16a34a,1); aBg.fillRoundedRect(mx+mW-106,ly+12,82,30,15);
                const aT=this.add.text(mx+mW-65,ly+27,'＋ Añadir',{fontSize:'12px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
                const aH=this.add.rectangle(mx+mW-65,ly+27,82,30,0,0).setInteractive({useHandCursor:true});
                panel.add([rBg,av,nT,sT,aBg,aT,aH]);
                aH.on('pointerover',()=>{aBg.clear();aBg.fillStyle(0x15803d,1);aBg.fillRoundedRect(mx+mW-106,ly+12,82,30,15);});
                aH.on('pointerout', ()=>{aBg.clear();aBg.fillStyle(0x16a34a,1);aBg.fillRoundedRect(mx+mW-106,ly+12,82,30,15);});
                aH.on('pointerdown',()=>{
                    agregarEstudiante(salon.id,est.id);
                    this.mostrarToast(`✅ ${est.name} agregado al grupo`,0x16a34a);
                    panel.destroy(); ov.destroy();
                    this.estudianteSelec=getUserData(est.id);
                    this.time.delayedCall(500,()=>this._recargar());
                });
                ly+=66;
            });
        }
        this.tweens.add({targets:panel,alpha:1,scaleX:{from:0.88,to:1},scaleY:{from:0.88,to:1},duration:300,ease:'Back.easeOut'});
    }

    _modalEditarEstudiante(est) {
        const W=this.W,H=this.H;
        const ov=this.add.graphics(); ov.fillStyle(0x000000,0.55); ov.fillRect(0,0,W,H); ov.setDepth(200).setInteractive();
        const mW=460,mH=280,mx=(W-mW)/2,my=(H-mH)/2;
        const panel=this.add.container(0,0); panel.setDepth(201); panel.setAlpha(0);

        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(mx,my,mW,mH,20);
        const hdr=this.add.graphics(); hdr.fillStyle(0x7c3aed,1); hdr.fillRoundedRect(mx,my,mW,68,20);
        const hFix=this.add.graphics(); hFix.fillStyle(0x7c3aed,1); hFix.fillRect(mx,my+44,mW,26);
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
        inN.node.addEventListener('focus',()=>{inBg.clear();inBg.lineStyle(2,0x7c3aed,1);inBg.fillStyle(0xfaf5ff,1);inBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});
        inN.node.addEventListener('blur', ()=>{inBg.clear();inBg.lineStyle(1.5,0xd8b4fe,1);inBg.fillStyle(0xfaf5ff,1);inBg.fillRoundedRect(mx+32,my+108,mW-64,44,12);});

        const btnY=my+mH-60;
        const canBg=this.add.graphics(); canBg.fillStyle(0xf3f4f6,1); canBg.lineStyle(1,0xe5e7eb,1); canBg.fillRoundedRect(mx+32,btnY,120,42,21);
        const canT=this.add.text(mx+92,btnY+21,'Cancelar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#6b7280'}).setOrigin(0.5);
        const canH=this.add.rectangle(mx+92,btnY+21,120,42,0,0).setInteractive({useHandCursor:true});
        panel.add([canBg,canT,canH]);
        canH.on('pointerover',()=>{canBg.clear();canBg.fillStyle(0xe5e7eb,1);canBg.lineStyle(1,0xd1d5db,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerout', ()=>{canBg.clear();canBg.fillStyle(0xf3f4f6,1);canBg.lineStyle(1,0xe5e7eb,1);canBg.fillRoundedRect(mx+32,btnY,120,42,21);});
        canH.on('pointerdown',()=>this.tweens.add({targets:[panel,ov],alpha:0,duration:200,onComplete:()=>{panel.destroy();ov.destroy();}}));

        const savBg=this.add.graphics(); savBg.fillStyle(0x7c3aed,1); savBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);
        const savT=this.add.text(mx+mW-97,btnY+21,'💾 Guardar',{fontSize:'14px',fontFamily:F,fontStyle:'bold',fill:'#fff'}).setOrigin(0.5);
        const savH=this.add.rectangle(mx+mW-97,btnY+21,130,42,0,0).setInteractive({useHandCursor:true});
        panel.add([savBg,savT,savH]);
        savH.on('pointerover',()=>{savBg.clear();savBg.fillStyle(0x6d28d9,1);savBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);this.tweens.add({targets:savT,scaleX:1.05,scaleY:1.05,duration:100});});
        savH.on('pointerout', ()=>{savBg.clear();savBg.fillStyle(0x7c3aed,1);savBg.fillRoundedRect(mx+mW-162,btnY,130,42,21);this.tweens.add({targets:savT,scaleX:1,scaleY:1,duration:100});});
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
}

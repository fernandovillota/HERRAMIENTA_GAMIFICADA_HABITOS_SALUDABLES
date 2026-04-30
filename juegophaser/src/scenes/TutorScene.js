// src/scenes/TutorScene.js — Panel del Tutor (Profesor / Padre / Madre)
import BaseScene, { renderAvatar } from './BaseScene.js';
import {
    getCurrentUser, clearCurrentUser, isTutor,
    getSalonesDeTutor, getSalonById, crearSalon, editarSalon, eliminarSalon,
    getEstudiantesDeSalon,
    agregarEstudiante, removerEstudiante,
    getEstadisticasEstudiante, getAllUsers, isStudent
} from '../utils/userData.js';

const F = '"Segoe UI",Arial,sans-serif';

export default class TutorScene extends BaseScene {

    constructor() {
        super({ key: 'TutorScene' });
        this.vista      = 'salones';  // 'salones' | 'salon_detalle' | 'nuevo_salon'
        this.salonActivo = null;
        this.scrollY    = 0;
        this.maxScroll  = 0;
        this.isDragging = false;
        this.lastPY     = 0;
    }

    preload() { this.preloadAvatars(); }

    create() {
        this.W = this.scale.width;
        this.H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user || !isTutor(this.user)) { this.scene.start('LoginScene'); return; }

        // Recuperar estado de navegación del registry (persiste entre restart)
        const savedVista   = this.registry.get('tutor_vista');
        const savedSalonId = this.registry.get('tutor_salon_id');
        if (savedVista)   this.vista = savedVista;
        if (savedSalonId) {
            this.salonActivo = getSalonById(savedSalonId);
        }

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



    // ════════════════════════════════════════════════
    //  ELEMENTOS FIJOS
    // ════════════════════════════════════════════════
    _fondo() {
        const g = this.add.graphics();
        g.fillGradientStyle(0xf0f4ff, 0xf0f4ff, 0xe8f0ff, 0xf5eeff, 1);
        g.fillRect(0, 0, this.W, this.H);
    }

    _topbar() {
        const W = this.W, u = this.user;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1e40af, 0x1e40af, 0x7c3aed, 0x7c3aed, 1);
        bg.fillRect(0, 0, W, 68);

        this.add.text(58, 34, '🎓', { fontSize: '26px' }).setOrigin(0.5);
        this.add.text(82, 20, 'Panel del Tutor', { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
        this.add.text(82, 44, 'Hábitos Saludables', { fontSize: '12px', fontFamily: F, fill: 'rgba(255,255,255,0.75)' });

        // Nombre tutor
        renderAvatar(this, W - 196, 34, 36, u);
        const nombre = (u.name || '').split(' ')[0];
        this.add.text(W - 170, 34, nombre, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0, 0.5);

        // Btn Salir
        const sBg = this.add.graphics(); sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W - 82, 14, 72, 40, 20);
        const sT = this.add.text(W - 46, 34, '→ Salir', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const sH = this.add.rectangle(W - 46, 34, 72, 40, 0, 0).setInteractive({ useHandCursor: true });
        sH.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xdc2626, 1); sBg.fillRoundedRect(W - 82, 14, 72, 40, 20); });
        sH.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W - 82, 14, 72, 40, 20); });
        sH.on('pointerdown',  () => { this.tweens.add({ targets: sT, scaleX: 0.88, scaleY: 0.88, duration: 70, yoyo: true, onComplete: () => { clearCurrentUser(); this.scene.start('LoginScene'); } }); });
    }

    // ════════════════════════════════════════════════
    //  SCROLL
    // ════════════════════════════════════════════════
    _initScroll() {
        this.input.off('wheel');
        this.input.off('pointerdown'); this.input.off('pointermove'); this.input.off('pointerup');
        this.input.on('wheel', (_p,_o,_dx,dy) => {
            this.scrollY = Phaser.Math.Clamp(this.scrollY + dy * 0.8, 0, this.maxScroll);
            this._contenidoCont.y = -this.scrollY;
        });
        this.input.on('pointerdown', p => { if (p.y > 70) { this.isDragging = true; this.lastPY = p.y; } });
        this.input.on('pointermove', p => {
            if (!this.isDragging) return;
            const d = this.lastPY - p.y;
            this.scrollY = Phaser.Math.Clamp(this.scrollY + d, 0, this.maxScroll);
            this._contenidoCont.y = -this.scrollY;
            this.lastPY = p.y;
        });
        this.input.on('pointerup', () => { this.isDragging = false; });
    }

    // Helpers para añadir al contenedor scrollable
    _add(obj) { this._contenidoCont.add(obj); return obj; }

    // ════════════════════════════════════════════════
    //  VISTA: LISTA DE SALONES
    // ════════════════════════════════════════════════
    _vistaSalones() {
        const W = this.W, margin = 80, cW = W - margin * 2;
        let y = 84;

        // ── Cabecera bienvenida ──
        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(1, 0xdbeafe, 1); hBg.fillRoundedRect(margin, y, cW, 100, 16);
        this._add(hBg);
        renderAvatar(this, margin + 54, y + 50, 64, this.user);
        this._add(this.children.getAll().pop());
        const tBienvenida = this.add.text(margin + 100, y + 22, `Bienvenido/a, ${(this.user.name || '').split(' ')[0]}`, { fontSize: '22px', fontFamily: F, fontStyle: 'bold', fill: '#1e3a8a' });
        const tRol = this.add.text(margin + 100, y + 54, '👨‍🏫 Panel de Tutor — Gestiona tus salones de clase', { fontSize: '14px', fontFamily: F, fill: '#6b7280' });
        this._add(tBienvenida); this._add(tRol);
        y += 116;

        // ── Botón crear nuevo salón ──
        const cbg = this.add.graphics();
        cbg.fillStyle(0x1d4ed8, 1); cbg.fillRoundedRect(margin, y, 220, 46, 23);
        const ct = this.add.text(margin + 110, y + 23, '＋  Crear nuevo salón', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const ch = this.add.rectangle(margin + 110, y + 23, 220, 46, 0, 0).setInteractive({ useHandCursor: true });
        this._add(cbg); this._add(ct); this._add(ch);
        ch.on('pointerover',  () => { cbg.clear(); cbg.fillStyle(0x1e40af, 1); cbg.fillRoundedRect(margin, y, 220, 46, 23); this.tweens.add({ targets: ct, scaleX: 1.04, scaleY: 1.04, duration: 110 }); });
        ch.on('pointerout',   () => { cbg.clear(); cbg.fillStyle(0x1d4ed8, 1); cbg.fillRoundedRect(margin, y, 220, 46, 23); this.tweens.add({ targets: ct, scaleX: 1, scaleY: 1, duration: 110 }); });
        ch.on('pointerdown',  () => { this.tweens.add({ targets: ct, scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => this._modalNuevoSalon() }); });
        y += 62;

        // ── Título sección ──
        const tSec = this.add.text(margin, y, 'Mis salones', { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#374151' });
        this._add(tSec);
        y += 32;

        const salones = getSalonesDeTutor(this.user.id);

        if (salones.length === 0) {
            const eBg = this.add.graphics();
            eBg.fillStyle(0xffffff, 1); eBg.lineStyle(1.5, 0xdbeafe, 1); eBg.fillRoundedRect(margin, y, cW, 140, 16);
            this._add(eBg);
            const eT1 = this.add.text(W / 2, y + 52, '🏫', { fontSize: '42px' }).setOrigin(0.5);
            const eT2 = this.add.text(W / 2, y + 100, 'Todavía no tienes salones. ¡Crea uno para empezar!', { fontSize: '14px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(eT1); this._add(eT2);
            y += 156;
        } else {
            salones.forEach(salon => {
                y = this._tarjetaSalon(margin, y, cW, salon);
                y += 14;
            });
        }

        this.maxScroll = Math.max(0, y - this.H + 40);
    }

    _tarjetaSalon(x, y, w, salon) {
        const estudiantes = getEstudiantesDeSalon(salon.id);
        const cardH = 130;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0xdbeafe, 1); bg.fillRoundedRect(x, y, w, cardH, 16);
        this._add(bg);

        // Barra izquierda azul
        const bar = this.add.graphics(); bar.fillStyle(0x1d4ed8, 1); bar.fillRoundedRect(x, y, 6, cardH, 3);
        this._add(bar);

        // Código
        const codBg = this.add.graphics(); codBg.fillStyle(0xdbeafe, 1); codBg.fillRoundedRect(x + w - 116, y + 16, 100, 28, 14);
        this._add(codBg);
        const codT = this.add.text(x + w - 66, y + 30, `🔑 ${salon.codigo}`, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#1e40af' }).setOrigin(0.5);
        this._add(codT);

        // Nombre y descripción
        const nT = this.add.text(x + 24, y + 18, salon.nombre, { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#1e3a8a' });
        const dT = this.add.text(x + 24, y + 48, salon.descripcion || 'Sin descripción', { fontSize: '13px', fontFamily: F, fill: '#9ca3af' });
        const stT = this.add.text(x + 24, y + 74, `👥 ${estudiantes.length} estudiante${estudiantes.length !== 1 ? 's' : ''}`, { fontSize: '13px', fontFamily: F, fill: '#374151' });
        this._add(nT); this._add(dT); this._add(stT);

        // Avatares de los primeros 4 estudiantes
        estudiantes.slice(0, 4).forEach((est, i) => {
            const av = renderAvatar(this, x + 180 + i * 36, y + 82, 28, est);
            this._add(av);
        });
        if (estudiantes.length > 4) {
            const mT = this.add.text(x + 180 + 4 * 36 + 4, y + 82, `+${estudiantes.length - 4}`, { fontSize: '12px', fontFamily: F, fill: '#6b7280' }).setOrigin(0, 0.5);
            this._add(mT);
        }

        // Botones de acción
        this._btnSmall(x + w - 230, y + cardH - 44, 96, 32, '👁 Ver', 0x1d4ed8, 0x1e40af, () => this._irDetalle(salon));
        this._btnSmall(x + w - 126, y + cardH - 44, 112, 32, '🗑 Eliminar', 0xef4444, 0xdc2626, () => this._confirmarEliminar(salon));

        return y + cardH;
    }

    _btnSmall(x, y, w, h, label, c1, c2, cb) {
        const bg = this.add.graphics(); bg.fillStyle(c1, 1); bg.fillRoundedRect(x, y, w, h, h / 2);
        const t = this.add.text(x + w / 2, y + h / 2, label, { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const hit = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this._add(bg); this._add(t); this._add(hit);
        hit.on('pointerover',  () => { bg.clear(); bg.fillStyle(c2, 1); bg.fillRoundedRect(x, y, w, h, h / 2); this.tweens.add({ targets: t, scaleX: 1.06, scaleY: 1.06, duration: 100 }); });
        hit.on('pointerout',   () => { bg.clear(); bg.fillStyle(c1, 1); bg.fillRoundedRect(x, y, w, h, h / 2); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 100 }); });
        hit.on('pointerdown',  () => { this.tweens.add({ targets: t, scaleX: 0.9, scaleY: 0.9, duration: 60, yoyo: true, onComplete: cb }); });
    }

    _irDetalle(salon) {
        this.registry.set('tutor_salon_id', salon.id);
        this.vista = 'salon_detalle';
        this.salonActivo = salon;
        this._recargar();
    }

    _recargar() {
        // Guardar estado en registry (sobrevive scene.restart si se necesita)
        this.registry.set('tutor_vista', this.vista);
        this.registry.set('tutor_salon_id', this.salonActivo?.id || null);
        // Destruir contenido anterior y recrear
        if (this._contenidoCont) this._contenidoCont.destroy();
        this.scrollY = 0;
        this._contenidoCont = this.add.container(0, 0);
        if (this.vista === 'salones')       this._vistaSalones();
        if (this.vista === 'salon_detalle') this._vistaSalonDetalle();
        this._initScroll();
        this._contenidoCont.setAlpha(0);
        this.tweens.add({ targets: this._contenidoCont, alpha: 1, duration: 200 });
    }

    // ════════════════════════════════════════════════
    //  VISTA: DETALLE DE UN SALÓN
    // ════════════════════════════════════════════════
    _vistaSalonDetalle() {
        const W = this.W, margin = 80, cW = W - margin * 2;
        let y = 84;
        const salon = this.salonActivo;
        if (!salon) { this._recargarVista('salones'); return; }

        // ── Botón volver ──
        const vBg = this.add.graphics(); vBg.fillStyle(0xffffff, 1); vBg.lineStyle(1.5, 0xbfdbfe, 1); vBg.fillRoundedRect(margin, y, 165, 38, 19);
        const vT = this.add.text(margin + 82, y + 19, '← Mis salones', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#1d4ed8' }).setOrigin(0.5);
        const vH = this.add.rectangle(margin + 82, y + 19, 165, 38, 0, 0).setInteractive({ useHandCursor: true });
        this._add(vBg); this._add(vT); this._add(vH);
        vH.on('pointerover',  () => { vBg.clear(); vBg.fillStyle(0xeff6ff, 1); vBg.lineStyle(2, 0x1d4ed8, 1); vBg.fillRoundedRect(margin, y, 165, 38, 19); });
        vH.on('pointerout',   () => { vBg.clear(); vBg.fillStyle(0xffffff, 1); vBg.lineStyle(1.5, 0xbfdbfe, 1); vBg.fillRoundedRect(margin, y, 165, 38, 19); });
        vH.on('pointerdown',  () => { this.vista = 'salones'; this.salonActivo = null; this._recargar(); });
        y += 52;

        // ── Header salón ──
        const hBg = this.add.graphics();
        hBg.fillGradientStyle(0x1d4ed8, 0x1d4ed8, 0x2563eb, 0x2563eb, 1);
        hBg.fillRoundedRect(margin, y, cW, 80, 16);
        this._add(hBg);
        const snT = this.add.text(margin + 24, y + 16, salon.nombre, { fontSize: '22px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
        const sdT = this.add.text(margin + 24, y + 46, salon.descripcion || 'Sin descripción', { fontSize: '13px', fontFamily: F, fill: 'rgba(255,255,255,0.8)' });
        this._add(snT); this._add(sdT);

        // Código
        const codBg = this.add.graphics(); codBg.fillStyle(0xfbbf24, 1); codBg.fillRoundedRect(margin + cW - 160, y + 24, 140, 34, 17);
        this._add(codBg);
        const codT = this.add.text(margin + cW - 90, y + 41, `🔑 Código: ${salon.codigo}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#1c1917' }).setOrigin(0.5);
        this._add(codT);
        y += 96;

        // ── Resumen del salón ──
        const estudiantes = getEstudiantesDeSalon(salon.id);
        const stats = estudiantes.map(e => getEstadisticasEstudiante(e.id)).filter(Boolean);

        const totalPuntos   = stats.reduce((s, e) => s + e.points, 0);
        const totalLogros   = stats.reduce((s, e) => s + e.logros, 0);
        const totalRachas   = stats.filter(e => e.rachaActual > 0).length;
        const mejorEstudiante = stats.sort((a, b) => b.points - a.points)[0];

        const resCards = [
            { label: 'Estudiantes', value: `${estudiantes.length}`, emoji: '👥', bg: 0xdbeafe, tc: '#1e40af' },
            { label: 'Puntos totales', value: `${totalPuntos}`, emoji: '⭐', bg: 0xfef9c3, tc: '#78350f' },
            { label: 'Logros ganados', value: `${totalLogros}`, emoji: '🏆', bg: 0xfce7f3, tc: '#9d174d' },
            { label: 'Con racha activa', value: `${totalRachas}`, emoji: '🔥', bg: 0xfff7ed, tc: '#92400e' },
        ];
        const rcW = (cW - 48) / 4, rcGap = 16;
        resCards.forEach((rc, i) => {
            const rx = margin + i * (rcW + rcGap);
            const rbg = this.add.graphics(); rbg.fillStyle(rc.bg, 1); rbg.fillRoundedRect(rx, y, rcW, 90, 14);
            this._add(rbg);
            const re = this.add.text(rx + rcW / 2, y + 22, rc.emoji, { fontSize: '26px' }).setOrigin(0.5);
            const rv = this.add.text(rx + rcW / 2, y + 50, rc.value, { fontSize: '26px', fontFamily: F, fontStyle: 'bold', fill: rc.tc }).setOrigin(0.5);
            const rl = this.add.text(rx + rcW / 2, y + 76, rc.label, { fontSize: '11px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);
            this._add(re); this._add(rv); this._add(rl);
        });
        y += 106;

        // ── Botón agregar estudiante ──
        const aBg = this.add.graphics(); aBg.fillStyle(0x16a34a, 1); aBg.fillRoundedRect(margin, y, 220, 44, 22);
        const aT = this.add.text(margin + 110, y + 22, '＋  Agregar estudiante', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const aH = this.add.rectangle(margin + 110, y + 22, 220, 44, 0, 0).setInteractive({ useHandCursor: true });
        this._add(aBg); this._add(aT); this._add(aH);
        aH.on('pointerover',  () => { aBg.clear(); aBg.fillStyle(0x15803d, 1); aBg.fillRoundedRect(margin, y, 220, 44, 22); this.tweens.add({ targets: aT, scaleX: 1.04, scaleY: 1.04, duration: 110 }); });
        aH.on('pointerout',   () => { aBg.clear(); aBg.fillStyle(0x16a34a, 1); aBg.fillRoundedRect(margin, y, 220, 44, 22); this.tweens.add({ targets: aT, scaleX: 1, scaleY: 1, duration: 110 }); });
        aH.on('pointerdown',  () => { this.tweens.add({ targets: aT, scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => this._modalAgregarEstudiante(salon) }); });
        y += 58;

        // ── Tabla de progreso de estudiantes ──
        const titT = this.add.text(margin, y, 'Progreso de estudiantes', { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#374151' });
        this._add(titT);
        y += 32;

        if (estudiantes.length === 0) {
            const eBg2 = this.add.graphics(); eBg2.fillStyle(0xffffff, 1); eBg2.lineStyle(1, 0xe5e7eb, 1); eBg2.fillRoundedRect(margin, y, cW, 90, 14);
            this._add(eBg2);
            const eT = this.add.text(W / 2, y + 45, '📚 Aún no hay estudiantes. Agrega uno con el botón de arriba.', { fontSize: '14px', fontFamily: F, fill: '#9ca3af', align: 'center' }).setOrigin(0.5);
            this._add(eT);
            y += 106;
        } else {
            // Cabecera de la tabla
            y = this._tablaEstudiantes(margin, y, cW, estudiantes);
        }

        this.maxScroll = Math.max(0, y - this.H + 40);
    }

    _tablaEstudiantes(x, y, w, estudiantes) {
        const W = this.W;
        // Ordenar por puntos desc
        const statsOrdenados = estudiantes
            .map(e => getEstadisticasEstudiante(e.id))
            .filter(Boolean)
            .sort((a, b) => b.points - a.points);

        // Cabecera
        const headBg = this.add.graphics();
        headBg.fillStyle(0xeff6ff, 1); headBg.fillRoundedRect(x, y, w, 40, { tl:10, tr:10, bl:0, br:0 });
        this._add(headBg);

        const cols = [
            { label: '#',           px: x + 28,    align: 'center' },
            { label: 'Estudiante',  px: x + 100,   align: 'left'   },
            { label: '⭐ Puntos',  px: x + 320,   align: 'center' },
            { label: '🎯 Nivel',   px: x + 430,   align: 'center' },
            { label: '🏆 Logros',  px: x + 540,   align: 'center' },
            { label: '🍎 Alim.',   px: x + 640,   align: 'center' },
            { label: '🪥 Hig.',    px: x + 730,   align: 'center' },
            { label: '🏃 Act.',    px: x + 820,   align: 'center' },
            { label: '🔥 Racha',   px: x + 910,   align: 'center' },
            { label: 'Acción',     px: x + w - 56, align: 'center' },
        ];
        cols.forEach(c => {
            const t = this.add.text(c.px, y + 20, c.label, {
                fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#1e40af',
                align: c.align
            }).setOrigin(c.align === 'center' ? 0.5 : 0, 0.5);
            this._add(t);
        });
        y += 40;

        statsOrdenados.forEach((est, i) => {
            const rowH = 60;
            const rowBg = this.add.graphics();
            rowBg.fillStyle(i % 2 === 0 ? 0xffffff : 0xf8faff, 1);
            rowBg.lineStyle(1, 0xe5e7eb, 1);
            rowBg.fillRoundedRect(x, y, w, rowH, i === statsOrdenados.length - 1 ? { tl:0, tr:0, bl:10, br:10 } : 0);
            this._add(rowBg);

            // Posición
            const posColors = ['#f59e0b', '#9ca3af', '#cd7c2f'];
            const posEmoji  = ['🥇', '🥈', '🥉'];
            const posT = this.add.text(x + 28, y + rowH / 2, i < 3 ? posEmoji[i] : `${i + 1}`, { fontSize: i < 3 ? '22px' : '14px', fontFamily: F, fontStyle: 'bold', fill: posColors[i] || '#374151' }).setOrigin(0.5);
            this._add(posT);

            // Avatar + nombre
            const av = renderAvatar(this, x + 68, y + rowH / 2, 32, est);
            this._add(av);
            const nT = this.add.text(x + 94, y + rowH / 2 - 8, est.name, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#1f2937' }).setOrigin(0, 0.5);
            const uT = this.add.text(x + 94, y + rowH / 2 + 10, `@${est.username}`, { fontSize: '11px', fontFamily: F, fill: '#9ca3af' }).setOrigin(0, 0.5);
            this._add(nT); this._add(uT);

            // Datos numéricos
            const data = [
                { val: est.points,   px: x + 320, color: '#92400e', bold: true },
                { val: `Nv.${est.level}`, px: x + 430, color: '#4338ca', bold: false },
                { val: `${est.logros}/${est.totalLogros}`, px: x + 540, color: '#9d174d', bold: false },
                { val: est.food,      px: x + 640, color: '#166534', bold: false },
                { val: est.hygiene,   px: x + 730, color: '#075985', bold: false },
                { val: est.activity,  px: x + 820, color: '#92400e', bold: false },
                { val: `${est.rachaActual}🔥`, px: x + 910, color: '#ea580c', bold: est.rachaActual > 0 },
            ];
            data.forEach(d => {
                const dt = this.add.text(d.px, y + rowH / 2, `${d.val}`, {
                    fontSize: '14px', fontFamily: F, fontStyle: d.bold ? 'bold' : 'normal', fill: d.color
                }).setOrigin(0.5);
                this._add(dt);
            });

            // Botón remover
            this._btnSmall(x + w - 104, y + (rowH - 28) / 2, 92, 28, '✕ Remover', 0xfee2e2, 0xfecaca, () => {
                // Primero confirmar en un toast rápido
                removerEstudiante(this.salonActivo.id, est.id);
                this.mostrarToast(`${est.name} removido del salón`, 0x6b7280);
                this.time.delayedCall(700, () => this._recargar());
            });

            y += rowH;
        });

        return y + 20;
    }

    // ════════════════════════════════════════════════
    //  MODALES
    // ════════════════════════════════════════════════

    // ── Modal: Crear nuevo salón ──────────────────
    _modalNuevoSalon() {
        const W = this.W, H = this.H;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.55); ov.fillRect(0, 0, W, H); ov.setDepth(200).setInteractive();

        const mW = 520, mH = 360, mx = (W - mW) / 2, my = (H - mH) / 2;
        const panel = this.add.container(0, 0); panel.setDepth(201); panel.setAlpha(0);

        const sh = this.add.graphics(); sh.fillStyle(0x1d4ed8, 0.14); sh.fillRoundedRect(mx + 4, my + 8, mW, mH, 22);
        const bg = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(mx, my, mW, mH, 20);
        const hdr = this.add.graphics(); hdr.fillGradientStyle(0x1d4ed8, 0x1d4ed8, 0x2563eb, 0x2563eb, 1); hdr.fillRoundedRect(mx, my, mW, 68, 20);
        const hFix = this.add.graphics(); hFix.fillStyle(0x1d4ed8, 1); hFix.fillRect(mx, my + 44, mW, 26);
        const titT = this.add.text(W / 2, my + 34, '🏫  Crear nuevo salón', { fontSize: '19px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);

        // X cerrar
        const xBg = this.add.graphics(); xBg.fillStyle(0xffffff, 0.22); xBg.fillCircle(mx + mW - 26, my + 26, 16);
        const xT  = this.add.text(mx + mW - 26, my + 26, '✕', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const xH  = this.add.rectangle(mx + mW - 26, my + 26, 34, 34, 0, 0).setInteractive({ useHandCursor: true });
        xH.on('pointerdown', () => this.tweens.add({ targets: [panel, ov], alpha: 0, duration: 200, onComplete: () => { panel.destroy(); ov.destroy(); } }));
        xH.on('pointerover',  () => { xBg.clear(); xBg.fillStyle(0xffffff, 0.4); xBg.fillCircle(mx + mW - 26, my + 26, 16); });
        xH.on('pointerout',   () => { xBg.clear(); xBg.fillStyle(0xffffff, 0.22); xBg.fillCircle(mx + mW - 26, my + 26, 16); });
        panel.add([sh, bg, hFix, hdr, titT, xBg, xT, xH]);

        // Campo: Nombre del salón
        const lN = this.add.text(mx + 32, my + 86, 'Nombre del salón *', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#374151' });
        const inNBg = this.add.graphics(); inNBg.lineStyle(1.5, 0xbfdbfe, 1); inNBg.fillStyle(0xf0f9ff, 1); inNBg.fillRoundedRect(mx + 32, my + 110, mW - 64, 44, 12);
        const inN = this.add.dom(mx + 32 + (mW - 64) / 2, my + 132, 'input', { width: (mW - 100) + 'px', height: '28px', border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', fontFamily: F.replace(/"/g, "'"), color: '#1e3a8a', padding: '0 10px' });
        inN.node.placeholder = 'Ej: Grado 3A — Semestre 2025';
        panel.add([lN, inNBg, inN]);
        inN.node.addEventListener('focus',  () => { inNBg.clear(); inNBg.lineStyle(2, 0x1d4ed8, 1); inNBg.fillStyle(0xf0f9ff, 1); inNBg.fillRoundedRect(mx + 32, my + 110, mW - 64, 44, 12); });
        inN.node.addEventListener('blur',   () => { inNBg.clear(); inNBg.lineStyle(1.5, 0xbfdbfe, 1); inNBg.fillStyle(0xf0f9ff, 1); inNBg.fillRoundedRect(mx + 32, my + 110, mW - 64, 44, 12); });

        // Campo: Descripción
        const lD = this.add.text(mx + 32, my + 168, 'Descripción (opcional)', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#374151' });
        const inDBg = this.add.graphics(); inDBg.lineStyle(1.5, 0xbfdbfe, 1); inDBg.fillStyle(0xf0f9ff, 1); inDBg.fillRoundedRect(mx + 32, my + 192, mW - 64, 44, 12);
        const inD = this.add.dom(mx + 32 + (mW - 64) / 2, my + 214, 'input', { width: (mW - 100) + 'px', height: '28px', border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: F.replace(/"/g, "'"), color: '#374151', padding: '0 10px' });
        inD.node.placeholder = 'Ej: Grupo matutino de hábitos saludables';
        panel.add([lD, inDBg, inD]);
        inD.node.addEventListener('focus',  () => { inDBg.clear(); inDBg.lineStyle(2, 0x1d4ed8, 1); inDBg.fillStyle(0xf0f9ff, 1); inDBg.fillRoundedRect(mx + 32, my + 192, mW - 64, 44, 12); });
        inD.node.addEventListener('blur',   () => { inDBg.clear(); inDBg.lineStyle(1.5, 0xbfdbfe, 1); inDBg.fillStyle(0xf0f9ff, 1); inDBg.fillRoundedRect(mx + 32, my + 192, mW - 64, 44, 12); });

        const btnY = my + mH - 62;
        // Cancelar
        const canBg = this.add.graphics(); canBg.fillStyle(0xf3f4f6, 1); canBg.lineStyle(1, 0xe5e7eb, 1); canBg.fillRoundedRect(mx + 32, btnY, 120, 44, 22);
        const canT = this.add.text(mx + 92, btnY + 22, 'Cancelar', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#6b7280' }).setOrigin(0.5);
        const canH = this.add.rectangle(mx + 92, btnY + 22, 120, 44, 0, 0).setInteractive({ useHandCursor: true });
        panel.add([canBg, canT, canH]);
        canH.on('pointerover',  () => { canBg.clear(); canBg.fillStyle(0xe5e7eb, 1); canBg.lineStyle(1, 0xd1d5db, 1); canBg.fillRoundedRect(mx + 32, btnY, 120, 44, 22); });
        canH.on('pointerout',   () => { canBg.clear(); canBg.fillStyle(0xf3f4f6, 1); canBg.lineStyle(1, 0xe5e7eb, 1); canBg.fillRoundedRect(mx + 32, btnY, 120, 44, 22); });
        canH.on('pointerdown',  () => this.tweens.add({ targets: [panel, ov], alpha: 0, duration: 200, onComplete: () => { panel.destroy(); ov.destroy(); } }));

        // Crear
        const crBg = this.add.graphics(); crBg.fillStyle(0x1d4ed8, 1); crBg.fillRoundedRect(mx + mW - 168, btnY, 136, 44, 22);
        const crT  = this.add.text(mx + mW - 100, btnY + 22, '🏫 Crear salón', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const crH  = this.add.rectangle(mx + mW - 100, btnY + 22, 136, 44, 0, 0).setInteractive({ useHandCursor: true });
        panel.add([crBg, crT, crH]);
        crH.on('pointerover',  () => { crBg.clear(); crBg.fillStyle(0x1e40af, 1); crBg.fillRoundedRect(mx + mW - 168, btnY, 136, 44, 22); this.tweens.add({ targets: crT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        crH.on('pointerout',   () => { crBg.clear(); crBg.fillStyle(0x1d4ed8, 1); crBg.fillRoundedRect(mx + mW - 168, btnY, 136, 44, 22); this.tweens.add({ targets: crT, scaleX: 1, scaleY: 1, duration: 110 }); });
        crH.on('pointerdown',  () => {
            const nombre = inN.node.value.trim();
            if (!nombre) { this.mostrarToast('⚠️ El nombre del salón es obligatorio', 0xdc2626); return; }
            const desc = inD.node.value.trim();
            crearSalon(this.user.id, nombre, desc);
            panel.destroy(); ov.destroy();
            this.mostrarToast('✅ Salón creado correctamente', 0x16a34a);
            this.time.delayedCall(600, () => this._recargar());
        });

        this.tweens.add({ targets: panel, alpha: 1, scaleX: { from: 0.88, to: 1 }, scaleY: { from: 0.88, to: 1 }, duration: 300, ease: 'Back.easeOut' });
    }

    // ── Modal: Agregar estudiante ─────────────────
    _modalAgregarEstudiante(salon) {
        const W = this.W, H = this.H;
        const disponibles = getAllUsers().filter(u => isStudent(u));
        const enSalon = new Set(getEstudiantesDeSalon(salon.id).map(e => e.id));
        const noEnSalon = disponibles.filter(u => !enSalon.has(u.id));

        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.55); ov.fillRect(0, 0, W, H); ov.setDepth(200).setInteractive();

        const mW = 560, mH = Math.min(500, 120 + noEnSalon.length * 68 + 80);
        const mx = (W - mW) / 2, my = (H - mH) / 2;
        const panel = this.add.container(0, 0); panel.setDepth(201); panel.setAlpha(0);

        const sh = this.add.graphics(); sh.fillStyle(0x16a34a, 0.12); sh.fillRoundedRect(mx + 4, my + 8, mW, mH, 22);
        const bg = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(mx, my, mW, mH, 20);
        const hdr = this.add.graphics(); hdr.fillGradientStyle(0x16a34a, 0x16a34a, 0x15803d, 0x15803d, 1); hdr.fillRoundedRect(mx, my, mW, 68, 20);
        const hFix = this.add.graphics(); hFix.fillStyle(0x16a34a, 1); hFix.fillRect(mx, my + 44, mW, 26);
        const titT = this.add.text(W / 2, my + 34, '👥  Agregar estudiante', { fontSize: '19px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const subT = this.add.text(W / 2, my + 80, `Salón: ${salon.nombre}`, { fontSize: '13px', fontFamily: F, fill: '#374151' }).setOrigin(0.5);

        const xBg = this.add.graphics(); xBg.fillStyle(0xffffff, 0.22); xBg.fillCircle(mx + mW - 26, my + 26, 16);
        const xT  = this.add.text(mx + mW - 26, my + 26, '✕', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const xH  = this.add.rectangle(mx + mW - 26, my + 26, 34, 34, 0, 0).setInteractive({ useHandCursor: true });
        xH.on('pointerdown', () => this.tweens.add({ targets: [panel, ov], alpha: 0, duration: 200, onComplete: () => { panel.destroy(); ov.destroy(); } }));
        xH.on('pointerover',  () => { xBg.clear(); xBg.fillStyle(0xffffff, 0.4); xBg.fillCircle(mx + mW - 26, my + 26, 16); });
        xH.on('pointerout',   () => { xBg.clear(); xBg.fillStyle(0xffffff, 0.22); xBg.fillCircle(mx + mW - 26, my + 26, 16); });
        panel.add([sh, bg, hFix, hdr, titT, subT, xBg, xT, xH]);

        if (noEnSalon.length === 0) {
            const emT = this.add.text(W / 2, my + mH / 2, '🎉 Todos los estudiantes ya están en este salón', { fontSize: '14px', fontFamily: F, fill: '#9ca3af', align: 'center', wordWrap: { width: mW - 60 } }).setOrigin(0.5);
            panel.add(emT);
        } else {
            let ly = my + 106;
            noEnSalon.forEach(est => {
                const stats = getEstadisticasEstudiante(est.id);

                const rowBg = this.add.graphics(); rowBg.fillStyle(0xf9fafb, 1); rowBg.lineStyle(1, 0xe5e7eb, 1); rowBg.fillRoundedRect(mx + 20, ly, mW - 40, 56, 12);
                panel.add(rowBg);

                const av = renderAvatar(this, mx + 46, ly + 28, 36, est);
                panel.add(av);

                const nT = this.add.text(mx + 74, ly + 14, est.name, { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#1f2937' });
                const sT = this.add.text(mx + 74, ly + 36, `@${est.username}  ·  ⭐ ${stats?.points||0} pts  ·  🏆 ${stats?.logros||0} logros`, { fontSize: '11px', fontFamily: F, fill: '#6b7280' });
                panel.add([nT, sT]);

                const addBg = this.add.graphics(); addBg.fillStyle(0x16a34a, 1); addBg.fillRoundedRect(mx + mW - 108, ly + 14, 84, 30, 15);
                const addT  = this.add.text(mx + mW - 66, ly + 29, '＋ Añadir', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
                const addH  = this.add.rectangle(mx + mW - 66, ly + 29, 84, 30, 0, 0).setInteractive({ useHandCursor: true });
                panel.add([addBg, addT, addH]);
                addH.on('pointerover',  () => { addBg.clear(); addBg.fillStyle(0x15803d, 1); addBg.fillRoundedRect(mx + mW - 108, ly + 14, 84, 30, 15); });
                addH.on('pointerout',   () => { addBg.clear(); addBg.fillStyle(0x16a34a, 1); addBg.fillRoundedRect(mx + mW - 108, ly + 14, 84, 30, 15); });
                addH.on('pointerdown',  () => {
                    agregarEstudiante(salon.id, est.id);
                    this.mostrarToast(`✅ ${est.name} agregado al salón`, 0x16a34a);
                    panel.destroy(); ov.destroy();
                    this.time.delayedCall(500, () => this._recargar());
                });

                ly += 68;
            });
        }

        this.tweens.add({ targets: panel, alpha: 1, scaleX: { from: 0.88, to: 1 }, scaleY: { from: 0.88, to: 1 }, duration: 300, ease: 'Back.easeOut' });
    }

    // ── Confirmación eliminar salón ───────────────
    _confirmarEliminar(salon) {
        const W = this.W, H = this.H;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.55); ov.fillRect(0, 0, W, H); ov.setDepth(200).setInteractive();

        const mW = 440, mH = 240, mx = (W - mW) / 2, my = (H - mH) / 2;
        const panel = this.add.container(0, 0); panel.setDepth(201); panel.setAlpha(0);

        const bg = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(mx, my, mW, mH, 20);
        const ico = this.add.text(W / 2, my + 50, '🗑', { fontSize: '42px' }).setOrigin(0.5);
        const t1  = this.add.text(W / 2, my + 102, '¿Eliminar este salón?', { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#1f2937' }).setOrigin(0.5);
        const t2  = this.add.text(W / 2, my + 132, `"${salon.nombre}" y todos sus datos serán eliminados.`, { fontSize: '13px', fontFamily: F, fill: '#6b7280', align: 'center', wordWrap: { width: mW - 60 } }).setOrigin(0.5);
        panel.add([bg, ico, t1, t2]);

        const cancelBg = this.add.graphics(); cancelBg.fillStyle(0xf3f4f6, 1); cancelBg.lineStyle(1, 0xe5e7eb, 1); cancelBg.fillRoundedRect(mx + 32, my + mH - 62, 120, 44, 22);
        const cancelT  = this.add.text(mx + 92, my + mH - 40, 'Cancelar', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#6b7280' }).setOrigin(0.5);
        const cancelH  = this.add.rectangle(mx + 92, my + mH - 40, 120, 44, 0, 0).setInteractive({ useHandCursor: true });
        panel.add([cancelBg, cancelT, cancelH]);
        cancelH.on('pointerdown', () => this.tweens.add({ targets: [panel, ov], alpha: 0, duration: 200, onComplete: () => { panel.destroy(); ov.destroy(); } }));

        const delBg = this.add.graphics(); delBg.fillStyle(0xef4444, 1); delBg.fillRoundedRect(mx + mW - 166, my + mH - 62, 134, 44, 22);
        const delT  = this.add.text(mx + mW - 99, my + mH - 40, '🗑 Eliminar', { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const delH  = this.add.rectangle(mx + mW - 99, my + mH - 40, 134, 44, 0, 0).setInteractive({ useHandCursor: true });
        panel.add([delBg, delT, delH]);
        delH.on('pointerover',  () => { delBg.clear(); delBg.fillStyle(0xdc2626, 1); delBg.fillRoundedRect(mx + mW - 166, my + mH - 62, 134, 44, 22); });
        delH.on('pointerout',   () => { delBg.clear(); delBg.fillStyle(0xef4444, 1); delBg.fillRoundedRect(mx + mW - 166, my + mH - 62, 134, 44, 22); });
        delH.on('pointerdown',  () => {
            eliminarSalon(salon.id, this.user.id);
            panel.destroy(); ov.destroy();
            this.mostrarToast('Salón eliminado', 0x6b7280);
            this.time.delayedCall(500, () => { this.vista = 'salones'; this.salonActivo = null; this._recargar(); });
        });

        this.tweens.add({ targets: panel, alpha: 1, scaleX: { from: 0.85, to: 1 }, scaleY: { from: 0.85, to: 1 }, duration: 280, ease: 'Back.easeOut' });
    }
}

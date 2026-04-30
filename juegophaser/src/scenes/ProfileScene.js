// src/scenes/ProfileScene.js
import { renderAvatar } from './BaseScene.js';
import { getCurrentUser, clearCurrentUser, getStreakCalendar, saveUserData } from '../utils/userData.js';
import { ACHIEVEMENTS } from '../utils/gameData.js';

const F = '"Segoe UI",Arial,sans-serif';
const AVATAR_KEYS = ['avatar1','avatar2','avatar3','avatar4'];

export default class ProfileScene extends Phaser.Scene {

    constructor() {
        super({ key: 'ProfileScene' });
        this.scrollY      = 0;
        this.maxScroll    = 0;
        this.isDragging   = false;
        this.lastPointerY = 0;
        this.tabActual    = 'resumen';
    }

    // ── Cargar imágenes de avatar ─────────────────────────────
    preload() {
        for (let i = 1; i <= 4; i++) {
            if (!this.textures.exists(`avatar${i}`)) {
                this.load.image(`avatar${i}`, `assets/images/avatar${i}.png`);
            }
        }
    }

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
        this.input.on('pointerdown', p => { if (p.y > 130) { this.isDragging = true; this.lastPointerY = p.y; } });
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
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x7c3aed, 0x7c3aed, 0xec4899, 0xec4899, 1);
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
        const nBg = this.add.graphics(); nBg.fillStyle(0x6366f1, 1); nBg.fillRoundedRect(W-424, 16, 90, 36, 18);
        this.add.text(W-408, 22, 'Nivel', { fontSize: '10px', fill: '#c7d2fe', fontFamily: F });
        this.add.text(W-408, 34, `${nivel}`, { fontSize: '18px', fill: '#fff', fontFamily: F, fontStyle: 'bold' });

        // Barra progreso
        const prog = pts % 100;
        const prBg = this.add.graphics(); prBg.fillStyle(0xffffff, 0.2); prBg.fillRoundedRect(W-326, 28, 110, 12, 6);
        if (prog > 0) { const pF=this.add.graphics(); pF.fillStyle(0xffffff,0.9); pF.fillRoundedRect(W-326,28,(prog/100)*110,12,6); }
        this.add.text(W-326, 14, `${100-prog} pts para nivel ${nivel+1}`, { fontSize: '10px', fill: 'rgba(255,255,255,0.85)', fontFamily: F });

        // Avatar + nombre
        renderAvatar(this, W-194, 34, 36, u);
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

            const txt = this.add.text(tx, 97, tab.label, {
                fontSize: '15px', fontFamily: F, fontStyle: 'bold',
                fill: isActive ? '#7c3aed' : '#6b7280'
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
        this._indicator.clear();
        this._indicator.fillStyle(0x7c3aed, 1);
        this._indicator.fillRoundedRect(info.x + 20, 122, info.w - 40, 4, 2);

        Object.entries(this._tabLabels).forEach(([id, { txt }]) => {
            txt.setStyle({ fill: id === tabId ? '#7c3aed' : '#6b7280' });
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
        bg.fillStyle(0xffffff,1); bg.lineStyle(1.5,0xd8b4fe,1); bg.fillRoundedRect(x,y,165,38,19);
        const t = this.add.text(x+82, y+19, '← Volver al menú', { fontSize:'13px', fontFamily:F, fontStyle:'bold', fill:'#7c3aed' }).setOrigin(0.5);
        const hit = this.add.rectangle(x+82, y+19, 165, 38, 0, 0).setInteractive({ useHandCursor: true });
        this.scrollCont.add([bg, t, hit]);
        hit.on('pointerover',  () => { bg.clear(); bg.fillStyle(0xf5f3ff,1); bg.lineStyle(2,0x7c3aed,1); bg.fillRoundedRect(x,y,165,38,19); this.tweens.add({targets:t,scaleX:1.04,scaleY:1.04,duration:110}); });
        hit.on('pointerout',   () => { bg.clear(); bg.fillStyle(0xffffff,1); bg.lineStyle(1.5,0xd8b4fe,1); bg.fillRoundedRect(x,y,165,38,19); this.tweens.add({targets:t,scaleX:1,scaleY:1,duration:110}); });
        hit.on('pointerdown',  () => { this.tweens.add({targets:t,scaleX:0.92,scaleY:0.92,duration:70,yoyo:true,onComplete:()=>this.scene.start('MenuScene')}); });
    }

    _tarjetaPerfil(x, y, w) {
        const u = this.user;
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1, 0xf3e8ff, 1); bg.fillRoundedRect(x, y, w, 220, 18);
        this.scrollCont.add(bg);

        // Avatar grande con imagen
        const avaImg = renderAvatar(this, x + 68, y + 90, 90, u);
        if (avaImg.setDepth) avaImg.setDepth(1);
        this.scrollCont.add(avaImg);
        this.tweens.add({ targets: avaImg, scaleX: 1.06, scaleY: 1.06, duration: 900, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

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
        bg.fillStyle(0x7c3aed, 1); bg.fillRoundedRect(x, y, 154, 38, 19);
        const sh = this.add.graphics();
        sh.fillStyle(0x7c3aed, 0.18); sh.fillRoundedRect(x+2, y+4, 154, 38, 19);
        const t = this.add.text(x+77, y+19, '✏️  Editar perfil', { fontSize:'13px', fontFamily:F, fontStyle:'bold', fill:'#fff' }).setOrigin(0.5);
        const hit = this.add.rectangle(x+77, y+19, 154, 38, 0, 0).setInteractive({ useHandCursor: true });
        this.scrollCont.add([sh, bg, t, hit]);
        hit.on('pointerover',  () => { bg.clear(); bg.fillStyle(0x6d28d9,1); bg.fillRoundedRect(x,y,154,38,19); this.tweens.add({targets:t,scaleX:1.05,scaleY:1.05,duration:110}); });
        hit.on('pointerout',   () => { bg.clear(); bg.fillStyle(0x7c3aed,1); bg.fillRoundedRect(x,y,154,38,19); this.tweens.add({targets:t,scaleX:1,scaleY:1,duration:110}); });
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
                hit.on('pointerover',  () => { lbg.clear(); lbg.fillStyle(0xede9fe,1); lbg.lineStyle(2,0x7c3aed,1); lbg.fillRoundedRect(lx,ly,lW,lH,14); this.tweens.add({targets:iconT,scaleX:1.2,scaleY:1.2,duration:150}); });
                hit.on('pointerout',   () => { lbg.clear(); lbg.fillStyle(0xfaf5ff,1); lbg.lineStyle(2,0x7c3aed,1); lbg.fillRoundedRect(lx,ly,lW,lH,14); this.tweens.add({targets:iconT,scaleX:1,scaleY:1,duration:150}); });
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
        const aPerRow = 4;
        const aW = 88, aH = 80, aGap = 16;

        AVATAR_KEYS.forEach((key, i) => {
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
                this.tweens.add({ targets: avEl, scaleX: 1.22, scaleY: 1.22, duration: 120, yoyo: true });
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

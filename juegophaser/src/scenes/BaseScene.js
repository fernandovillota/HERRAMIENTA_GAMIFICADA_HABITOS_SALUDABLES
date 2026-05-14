// src/scenes/BaseScene.js — Componentes reutilizables
const F = '"Segoe UI",Arial,sans-serif';

// ── Renderiza avatar: personaje ilustrado si existe, sino inicial con círculo ──
// Los avatares de personaje (student*, tutor*, parent*) se muestran directamente.
// Los genéricos (avatar*) se muestran con máscara circular.
export function renderAvatar(scene, x, y, size, user) {
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

export default class BaseScene extends Phaser.Scene {

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
        bg.fillGradientStyle(0x7c3aed, 0x7c3aed, 0xec4899, 0xec4899, 1);
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
        renderAvatar(this, W - 194, 34, 36, usuario);
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
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0xd8b4fe, 1); bg.fillRoundedRect(x, y, 170, 38, 19);
        const t = this.add.text(x + 85, y + 19, `← ${label}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#7c3aed' }).setOrigin(0.5);
        const hit = this.add.rectangle(x + 85, y + 19, 170, 38, 0, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => this.tweens.add({ targets: t, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: callback }));
        hit.on('pointerover', () => { bg.clear(); bg.fillStyle(0xf5f3ff, 1); bg.lineStyle(2, 0x7c3aed, 1); bg.fillRoundedRect(x, y, 170, 38, 19); this.tweens.add({ targets: t, scaleX: 1.04, scaleY: 1.04, duration: 100 }); });
        hit.on('pointerout',  () => { bg.clear(); bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0xd8b4fe, 1); bg.fillRoundedRect(x, y, 170, 38, 19); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 100 }); });
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
        const pT  = this.add.text(0, -44,  `+${pts} puntos`, { fontSize: '38px', fontFamily: F, fontStyle: 'bold', fill: '#7c3aed' }).setOrigin(0.5);
        const cT  = this.add.text(0,  6,   `${correctas} de ${total} correctas`, { fontSize: '16px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);
        const bBg = this.add.graphics(); bBg.fillStyle(0xe5e7eb, 1); bBg.fillRoundedRect(-150, 34, 300, 14, 7);
        if (total > 0) {
            const bF = this.add.graphics(); bF.fillStyle(color, 1); bF.fillRoundedRect(-150, 34, (correctas / total) * 300, 14, 7); popup.add(bF);
        }
        popup.add([bg, hFx, hdr, ico, tit, pT, cT, bBg]);
        this._btnResultado(popup, ov, -95, 90, '🔄 Reintentar', 0x7c3aed, 0x6d28d9, onReintentar);
        this._btnResultado(popup, ov,  95, 90, '🏠 Menú',       0x6366f1, 0x4f46e5, onMenu);
        this.tweens.add({ targets: popup, alpha: 1, scaleX: { from: 0.6, to: 1 }, scaleY: { from: 0.6, to: 1 }, duration: 400, ease: 'Back.easeOut' });
        if (pts > 0) this.tweens.add({ targets: ico, y: '-=8', duration: 600, ease: 'Sine.easeInOut', yoyo: true, repeat: 2 });
    }

    _btnResultado(popup, ov, cx, cy, label, c1, c2, cb, w = 162, h = 44) {
        const g  = this.add.graphics(); g.fillStyle(c1, 1); g.fillRoundedRect(cx - w/2, cy - h/2, w, h, h/2);
        const t  = this.add.text(cx, cy, label, { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const hit= this.add.rectangle(cx, cy, w, h, 0, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerover',  () => { g.clear(); g.fillStyle(c2, 1); g.fillRoundedRect(cx-w/2, cy-h/2, w, h, h/2); this.tweens.add({ targets: t, scaleX: 1.06, scaleY: 1.06, duration: 100 }); });
        hit.on('pointerout',   () => { g.clear(); g.fillStyle(c1, 1); g.fillRoundedRect(cx-w/2, cy-h/2, w, h, h/2); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 100 }); });
        hit.on('pointerdown',  () => { this.tweens.add({ targets: [g, t], scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => { popup.destroy(); ov.destroy(); if (cb) cb(); } }); });
        popup.add([g, t, hit]);
    }
}

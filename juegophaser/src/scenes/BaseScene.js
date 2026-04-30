// src/scenes/BaseScene.js
const F = '"Segoe UI",Arial,sans-serif';

// Carga el avatar del usuario: primero intenta como imagen cargada,
// si no existe usa el emoji guardado, y si tampoco existe usa un círculo morado con inicial.
function renderAvatar(scene, x, y, size, user) {
    const key = user?.avatar || '';
    // Si la textura existe en el cache de Phaser, usarla
    if (key && scene.textures.exists(key)) {
        const img = scene.add.image(x, y, key).setDisplaySize(size, size).setOrigin(0.5);
        // Máscara circular
        const mask = scene.add.graphics();
        mask.fillStyle(0xffffff);
        mask.fillCircle(x, y, size / 2);
        img.setMask(mask.createGeometryMask());
        return img;
    }
    // Fallback: círculo morado con inicial
    const g = scene.add.graphics();
    g.fillStyle(0x7c3aed, 1);
    g.fillCircle(x, y, size / 2);
    const inicial = (user?.name || user?.username || '?')[0].toUpperCase();
    const t = scene.add.text(x, y, inicial, {
        fontSize: Math.round(size * 0.45) + 'px', fontFamily: F,
        fontStyle: 'bold', fill: '#fff'
    }).setOrigin(0.5);
    return t;
}

export { renderAvatar };

export default class BaseScene extends Phaser.Scene {

    // ── Preload avatares (llamar desde preload() de cada escena) ─
    preloadAvatars() {
        for (let i = 1; i <= 4; i++) {
            if (!this.textures.exists(`avatar${i}`)) {
                this.load.image(`avatar${i}`, `assets/images/avatar${i}.png`);
            }
        }
    }

    // ── Fondo degradado ──────────────────────────────────────────
    crearFondo(c1 = 0xf5eeff, c2 = 0xffe8f8) {
        const W = this.scale.width, H = this.scale.height;
        const bg = this.add.graphics();
        bg.fillGradientStyle(c1, c1, c2, c2, 1);
        bg.fillRect(0, 0, W, H);
    }

    // ── Topbar estándar ──────────────────────────────────────────
    crearTopbar(usuario, onPerfil, onSalir) {
        const W = this.scale.width;
        const topBg = this.add.graphics();
        topBg.fillGradientStyle(0x7c3aed, 0x7c3aed, 0xec4899, 0xec4899, 1);
        topBg.fillRect(0, 0, W, 68);

        // Logo
        this.add.text(58, 34, '✦', { fontSize: '28px', fill: '#fbbf24', fontFamily: 'Arial' }).setOrigin(0.5);
        this.add.text(80, 22, 'Hábitos Saludables', { fontSize: '18px', fontFamily: F, fontStyle: 'bold', fill: '#fff' });
        this.add.text(80, 44, '¡Aprende jugando!', { fontSize: '11px', fontFamily: F, fill: 'rgba(255,255,255,0.8)' });

        // Puntos
        const pts = usuario?.points || 0;
        const pBg = this.add.graphics();
        pBg.fillStyle(0xfbbf24, 1); pBg.fillRoundedRect(W - 512, 16, 80, 36, 18);
        this.add.text(W - 472, 34, `★ ${pts}`, { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);

        // Nivel
        const nivel = usuario?.level || 1;
        const nBg = this.add.graphics();
        nBg.fillStyle(0x6366f1, 1); nBg.fillRoundedRect(W - 424, 16, 90, 36, 18);
        this.add.text(W - 408, 22, 'Nivel', { fontSize: '10px', fill: '#c7d2fe', fontFamily: F });
        this.add.text(W - 408, 34, `${nivel}`, { fontSize: '18px', fill: '#fff', fontFamily: F, fontStyle: 'bold' });

        // Barra progreso
        const prog = pts % 100;
        const progBg = this.add.graphics();
        progBg.fillStyle(0xffffff, 0.2); progBg.fillRoundedRect(W - 326, 28, 110, 12, 6);
        if (prog > 0) {
            const pF = this.add.graphics();
            pF.fillStyle(0xffffff, 0.9); pF.fillRoundedRect(W - 326, 28, (prog / 100) * 110, 12, 6);
        }
        this.add.text(W - 326, 14, `${100 - prog} pts para nivel ${nivel + 1}`, { fontSize: '10px', fill: 'rgba(255,255,255,0.85)', fontFamily: F });

        // Avatar en topbar
        renderAvatar(this, W - 188, 34, 36, usuario);

        // Nombre
        const nombre = (usuario?.name || '').split(' ')[0];
        const pLabel = this.add.text(W - 158, 34, nombre, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0, 0.5);

        // Btn Perfil (hit area sobre avatar + nombre)
        const pBtnBg = this.add.graphics();
        pBtnBg.fillStyle(0xffffff, 0.0); pBtnBg.fillRoundedRect(W - 210, 14, 118, 40, 20);
        const pHit = this.add.rectangle(W - 151, 34, 118, 40, 0, 0).setInteractive({ useHandCursor: true });
        pHit.on('pointerover', () => { pBtnBg.clear(); pBtnBg.fillStyle(0xffffff, 0.2); pBtnBg.fillRoundedRect(W - 210, 14, 118, 40, 20); this.tweens.add({ targets: pLabel, scaleX: 1.05, scaleY: 1.05, duration: 120 }); });
        pHit.on('pointerout',  () => { pBtnBg.clear(); pBtnBg.fillStyle(0xffffff, 0.0); pBtnBg.fillRoundedRect(W - 210, 14, 118, 40, 20); this.tweens.add({ targets: pLabel, scaleX: 1, scaleY: 1, duration: 120 }); });
        pHit.on('pointerdown', () => { this.tweens.add({ targets: pLabel, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true }); if (onPerfil) onPerfil(); });

        // Btn Salir
        const sBg = this.add.graphics();
        sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W - 82, 14, 72, 40, 20);
        const sLabel = this.add.text(W - 46, 34, '→ Salir', { fontSize: '12px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const sHit = this.add.rectangle(W - 46, 34, 72, 40, 0, 0).setInteractive({ useHandCursor: true });
        sHit.on('pointerover', () => { sBg.clear(); sBg.fillStyle(0xdc2626, 1); sBg.fillRoundedRect(W - 82, 14, 72, 40, 20); this.tweens.add({ targets: sLabel, scaleX: 1.06, scaleY: 1.06, duration: 100 }); });
        sHit.on('pointerout',  () => { sBg.clear(); sBg.fillStyle(0xf43f5e, 1); sBg.fillRoundedRect(W - 82, 14, 72, 40, 20); this.tweens.add({ targets: sLabel, scaleX: 1, scaleY: 1, duration: 100 }); });
        sHit.on('pointerdown', () => { this.tweens.add({ targets: sLabel, scaleX: 0.88, scaleY: 0.88, duration: 70, yoyo: true, onComplete: () => { if (onSalir) onSalir(); } }); });
    }

    // ── Botón volver ─────────────────────────────────────────────
    crearBotonVolver(x, y, label, callback) {
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0xd8b4fe, 1); bg.fillRoundedRect(x, y, 165, 38, 19);
        const t = this.add.text(x + 82, y + 19, `← ${label}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#7c3aed' }).setOrigin(0.5);
        const hit = this.add.rectangle(x + 82, y + 19, 165, 38, 0, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => this.tweens.add({ targets: t, scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: callback }));
        hit.on('pointerover', () => { bg.clear(); bg.fillStyle(0xf5f3ff, 1); bg.lineStyle(2, 0x7c3aed, 1); bg.fillRoundedRect(x, y, 165, 38, 19); this.tweens.add({ targets: t, scaleX: 1.04, scaleY: 1.04, duration: 110 }); });
        hit.on('pointerout',  () => { bg.clear(); bg.fillStyle(0xffffff, 1); bg.lineStyle(1.5, 0xd8b4fe, 1); bg.fillRoundedRect(x, y, 165, 38, 19); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 110 }); });
    }

    // ── Toast ─────────────────────────────────────────────────────
    mostrarToast(texto, color = 0x16a34a, duracion = 2800) {
        if (this._toast) this._toast.destroy();
        const W = this.scale.width, H = this.scale.height;
        const c = this.add.container(0, 0);
        const bg = this.add.graphics();
        bg.fillStyle(color, 0.95); bg.fillRoundedRect(W / 2 - 240, H - 74, 480, 48, 24);
        const t = this.add.text(W / 2, H - 50, texto, { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff', align: 'center' }).setOrigin(0.5);
        c.add([bg, t]); c.setAlpha(0); c.y = 10; this._toast = c;
        this.tweens.add({ targets: c, alpha: 1, y: 0, duration: 260, ease: 'Back.easeOut', onComplete: () => {
            this.time.delayedCall(duracion, () => this.tweens.add({ targets: c, alpha: 0, y: -8, duration: 280, onComplete: () => c.destroy() }));
        }});
    }

    // ── Popup de logro ────────────────────────────────────────────
    mostrarLogro(achievement) {
        if (!achievement) return;
        const W = this.scale.width, H = this.scale.height;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.5); ov.fillRect(0, 0, W, H); ov.setDepth(100);
        const popup = this.add.container(W / 2, H / 2); popup.setDepth(101); popup.setAlpha(0);

        const bg = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(-180, -120, 360, 240, 20);
        const hdr = this.add.graphics(); hdr.fillGradientStyle(0xf59e0b, 0xf59e0b, 0xfbbf24, 0xfbbf24, 1); hdr.fillRoundedRect(-180, -120, 360, 96, 20);
        const hdrFix = this.add.graphics(); hdrFix.fillStyle(0xfbbf24, 1); hdrFix.fillRect(-180, -35, 360, 20);
        const ico = this.add.text(0, -62, achievement.icon, { fontSize: '46px' }).setOrigin(0.5);
        const t1 = this.add.text(0, 28, '¡Logro desbloqueado!', { fontSize: '13px', fontFamily: F, fill: '#78350f', fontStyle: 'bold' }).setOrigin(0.5);
        const t2 = this.add.text(0, 56, achievement.name, { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#1f1235' }).setOrigin(0.5);
        const t3 = this.add.text(0, 86, `+${achievement.points} puntos`, { fontSize: '16px', fontFamily: F, fill: '#7c3aed', fontStyle: 'bold' }).setOrigin(0.5);
        popup.add([bg, hdrFix, hdr, ico, t1, t2, t3]);
        this.tweens.add({ targets: popup, alpha: 1, scaleX: { from: 0.5, to: 1 }, scaleY: { from: 0.5, to: 1 }, duration: 380, ease: 'Back.easeOut' });
        this.tweens.add({ targets: ico, angle: { from: -15, to: 15 }, duration: 280, ease: 'Sine.easeInOut', yoyo: true, repeat: 2 });
        this.time.delayedCall(2800, () => {
            this.tweens.add({ targets: [popup, ov], alpha: 0, duration: 300, onComplete: () => { popup.destroy(); ov.destroy(); } });
        });
    }

    // ── Pantalla resultado ────────────────────────────────────────
    mostrarResultado(params) {
        const { W, H, pts, correctas, total, color, onReintentar, onMenu } = params;
        const ov = this.add.graphics(); ov.fillStyle(0x000000, 0.5); ov.fillRect(0, 0, W, H); ov.setDepth(80);
        const popup = this.add.container(W / 2, H / 2); popup.setDepth(81); popup.setAlpha(0);

        const bg = this.add.graphics(); bg.fillStyle(0xffffff, 1); bg.fillRoundedRect(-220, -200, 440, 400, 24);
        const hdr = this.add.graphics(); hdr.fillStyle(color, 1); hdr.fillRoundedRect(-220, -200, 440, 112, 24);
        const hdrFix = this.add.graphics(); hdrFix.fillStyle(color, 1); hdrFix.fillRect(-220, -100, 440, 15);

        const ico = this.add.text(0, -162, pts > 0 ? '🏆' : '😊', { fontSize: '46px' }).setOrigin(0.5);
        const tit = this.add.text(0, -112, pts > 0 ? '¡Excelente trabajo!' : '¡Sigue intentando!', { fontSize: '20px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const ptsT = this.add.text(0, -44, `+${pts} puntos`, { fontSize: '38px', fontFamily: F, fontStyle: 'bold', fill: '#7c3aed' }).setOrigin(0.5);
        const corT = this.add.text(0, 6, `${correctas} de ${total} correctas`, { fontSize: '16px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);
        const barBg = this.add.graphics(); barBg.fillStyle(0xe5e7eb, 1); barBg.fillRoundedRect(-150, 34, 300, 14, 7);
        const pct = total > 0 ? correctas / total : 0;
        if (pct > 0) { const bF = this.add.graphics(); bF.fillStyle(color, 1); bF.fillRoundedRect(-150, 34, pct * 300, 14, 7); popup.add(bF); }

        popup.add([bg, hdrFix, hdr, ico, tit, ptsT, corT, barBg]);

        this._addBtnPopup(popup, ov, -95, 90, '🔄 Reintentar', 0x7c3aed, 0x6d28d9, onReintentar, 162, 44);
        this._addBtnPopup(popup, ov,  95, 90, '🏠 Menú',       0x6366f1, 0x4f46e5, onMenu,       162, 44);

        this.tweens.add({ targets: popup, alpha: 1, scaleX: { from: 0.6, to: 1 }, scaleY: { from: 0.6, to: 1 }, duration: 400, ease: 'Back.easeOut' });
        if (pts > 0) this.tweens.add({ targets: ico, y: '-=8', duration: 600, ease: 'Sine.easeInOut', yoyo: true, repeat: 2 });
    }

    _addBtnPopup(popup, ov, cx, cy, label, c1, c2, cb, w = 160, h = 44) {
        const g = this.add.graphics(); g.fillStyle(c1, 1); g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
        const t = this.add.text(cx, cy, label, { fontSize: '14px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const hit = this.add.rectangle(cx, cy, w, h, 0, 0).setInteractive({ useHandCursor: true });
        hit.on('pointerover',  () => { g.clear(); g.fillStyle(c2, 1); g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2); this.tweens.add({ targets: t, scaleX: 1.06, scaleY: 1.06, duration: 110 }); });
        hit.on('pointerout',   () => { g.clear(); g.fillStyle(c1, 1); g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 110 }); });
        hit.on('pointerdown',  () => { this.tweens.add({ targets: [g, t], scaleX: 0.93, scaleY: 0.93, duration: 70, yoyo: true, onComplete: () => { popup.destroy(); ov.destroy(); if (cb) cb(); } }); });
        popup.add([g, t, hit]);
    }
}

// src/scenes/FoodScene.js — Módulo Alimentación Saludable
import BaseScene from './BaseScene.js';
import { FOOD_ITEMS, ACHIEVEMENTS, shuffleArray, getRandomItems } from '../utils/gameData.js';
import { getCurrentUser, addPoints, updateModuleProgress, updateStreak, getUserData, checkAndUnlockAchievements } from '../utils/userData.js';

const F = '"Segoe UI",Arial,sans-serif';

export default class FoodScene extends BaseScene {
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
        this.crearTopbar(this.user, () => this.scene.start('ProfileScene'), () => { this.scene.start('LoginScene'); });
        this._crearUI();
    }

    _crearUI() {
        const W = this.W, H = this.H;
        this.crearBotonVolver(80, 82, 'Volver al menú', () => this.scene.start('MenuScene'));

        // Cabecera
        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(2, 0xbbf7d0, 1);
        hBg.fillRoundedRect(W / 2 - 280, 112, 560, 72, 16);
        this.add.text(W / 2, 143, '🍎 Clasificación de Alimentos', { fontSize: '24px', fontFamily: F, fontStyle: 'bold', fill: '#16a34a' }).setOrigin(0.5);
        this.add.text(W / 2, 170, '¿Este alimento es saludable o no saludable?', { fontSize: '14px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);

        // Mascota flotante
        this.mascota = this.add.text(W - 100, H / 2, '🥦', { fontSize: '72px' });
        this.tweens.add({ targets: this.mascota, y: H / 2 - 18, duration: 1600, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

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

        // Panel explicación
        const W = this.W;
        const panelBg = this.add.graphics();
        panelBg.fillStyle(correcto ? 0xf0fdf4 : 0xfef2f2, 1);
        panelBg.lineStyle(2, correcto ? 0x86efac : 0xfca5a5, 1);
        panelBg.fillRoundedRect(W / 2 - 300, 596, 600, 84, 14);
        this.cardCont.add(panelBg); panelBg.setAlpha(0);

        const icoT = this.add.text(W / 2 - 278, 638, correcto ? '✅' : '❌', { fontSize: '22px' }).setOrigin(0, 0.5);
        this.cardCont.add(icoT);
        const msgT = this.add.text(W / 2 - 246, 638, food.description, {
            fontSize: '12px', fontFamily: F, fill: correcto ? '#166534' : '#991b1b', wordWrap: { width: 510 }
        }).setOrigin(0, 0.5);
        this.cardCont.add(msgT);
        this.tweens.add({ targets: [panelBg, icoT, msgT], alpha: 1, duration: 250 });

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
        updateModuleProgress(this.user.id, 'food');
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

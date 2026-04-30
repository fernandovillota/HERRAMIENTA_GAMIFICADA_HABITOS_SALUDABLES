// src/scenes/HygieneScene.js — Módulo Higiene Personal
import BaseScene from './BaseScene.js';
import { HYGIENE_QUESTIONS, ACHIEVEMENTS, shuffleArray } from '../utils/gameData.js';
import { getCurrentUser, addPoints, updateModuleProgress, updateStreak, getUserData, checkAndUnlockAchievements } from '../utils/userData.js';

const F = '"Segoe UI",Arial,sans-serif';

export default class HygieneScene extends BaseScene {
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

        this.crearFondo(0xeff6ff, 0xe0f2fe);
        this.crearTopbar(this.user, () => this.scene.start('ProfileScene'), () => this.scene.start('LoginScene'));
        this._crearUI();
    }

    _crearUI() {
        const W = this.W;
        this.crearBotonVolver(80, 82, 'Volver al menú', () => this.scene.start('MenuScene'));

        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(2, 0xbae6fd, 1);
        hBg.fillRoundedRect(W / 2 - 280, 112, 560, 72, 16);
        this.add.text(W / 2, 143, '🪥 Higiene Personal', { fontSize: '24px', fontFamily: F, fontStyle: 'bold', fill: '#0369a1' }).setOrigin(0.5);
        this.add.text(W / 2, 170, '¿Cuánto sabes sobre buenos hábitos de limpieza?', { fontSize: '14px', fontFamily: F, fill: '#6b7280' }).setOrigin(0.5);

        this.mascota = this.add.text(this.W - 100, this.H / 2, '🧼', { fontSize: '72px' });
        this.tweens.add({ targets: this.mascota, y: this.H / 2 - 18, duration: 1800, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        this.progBg   = this.add.graphics();
        this.progFill = this.add.graphics();
        this.progText = this.add.text(0, 0, '', { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#0369a1' });
        this._actualizarBarra();

        this.cardCont = this.add.container(0, 0);
        this._mostrarPregunta();
    }

    _actualizarBarra() {
        const W = this.W;
        this.progBg.clear(); this.progFill.clear();
        this.progBg.fillStyle(0xe5e7eb, 1); this.progBg.fillRoundedRect(W / 2 - 220, 200, 440, 14, 7);
        const pct = this.current / this.questions.length;
        if (pct > 0) { this.progFill.fillStyle(0x0ea5e9, 1); this.progFill.fillRoundedRect(W / 2 - 220, 200, pct * 440, 14, 7); }
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
        eBg.fillStyle(0xffffff, 1); eBg.lineStyle(2, 0xbae6fd, 1); eBg.fillRoundedRect(W / 2 - 44, 244, 88, 88, 44);
        this.cardCont.add(eBg);
        const eT = this.add.text(W / 2, 288, q.emoji, { fontSize: '44px' }).setOrigin(0.5);
        this.cardCont.add(eT);
        this.tweens.add({ targets: eT, scaleX: 1.14, scaleY: 1.14, duration: 700, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        // Caja de pregunta
        const qBg = this.add.graphics();
        qBg.fillStyle(0xffffff, 1); qBg.lineStyle(2, 0xbae6fd, 1); qBg.fillRoundedRect(W / 2 - 290, 344, 580, 80, 14);
        this.cardCont.add(qBg);
        const qT = this.add.text(W / 2, 384, q.question, {
            fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#0c4a6e', align: 'center', wordWrap: { width: 540 }
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
        bg.fillStyle(0xf0f9ff, 1); bg.lineStyle(2, 0x7dd3fc, 1); bg.fillRoundedRect(x, y, w, h, 12);
        this.cardCont.add(bg);

        const letra = ['A', 'B', 'C', 'D'][idx];
        const lBg = this.add.graphics();
        lBg.fillStyle(0x0ea5e9, 1); lBg.fillCircle(x + 22, y + h / 2, 14);
        this.cardCont.add(lBg);
        const lT = this.add.text(x + 22, y + h / 2, letra, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.cardCont.add(lT);

        const t = this.add.text(x + 46, y + h / 2, texto, { fontSize: '14px', fontFamily: F, fill: '#1e3a5f', wordWrap: { width: w - 56 } }).setOrigin(0, 0.5);
        this.cardCont.add(t);

        const hit = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this.cardCont.add(hit);

        hit.on('pointerover', () => {
            if (this.answered) return;
            bg.clear(); bg.fillStyle(0xe0f2fe, 1); bg.lineStyle(2, 0x0ea5e9, 1); bg.fillRoundedRect(x, y, w, h, 12);
            this.tweens.add({ targets: t, scaleX: 1.03, scaleY: 1.03, duration: 100 });
        });
        hit.on('pointerout', () => {
            if (this.answered) return;
            bg.clear(); bg.fillStyle(0xf0f9ff, 1); bg.lineStyle(2, 0x7dd3fc, 1); bg.fillRoundedRect(x, y, w, h, 12);
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
        const py = 588;
        const pBg = this.add.graphics();
        pBg.fillStyle(esCorrecta ? 0xf0fdf4 : 0xfef2f2, 1);
        pBg.lineStyle(2, esCorrecta ? 0x86efac : 0xfca5a5, 1);
        pBg.fillRoundedRect(W / 2 - 300, py, 600, 88, 14);
        this.cardCont.add(pBg); pBg.setAlpha(0);

        const iT = this.add.text(W / 2 - 280, py + 44, esCorrecta ? '✅' : '💡', { fontSize: '22px' }).setOrigin(0, 0.5);
        const eT = this.add.text(W / 2 - 246, py + 44, pregunta.explanation, {
            fontSize: '12px', fontFamily: F, fill: esCorrecta ? '#166534' : '#9a3412', wordWrap: { width: 510 }
        }).setOrigin(0, 0.5);
        this.cardCont.add([iT, eT]);
        this.tweens.add({ targets: [pBg, iT, eT], alpha: 1, duration: 250 });

        const esUltimo = this.current >= this.questions.length - 1;
        const sBg = this.add.graphics();
        sBg.fillStyle(0x0ea5e9, 1); sBg.fillRoundedRect(W / 2 - 88, 692, 176, 48, 24);
        this.cardCont.add(sBg);
        const sT = this.add.text(W / 2, 716, esUltimo ? 'Ver resultado →' : 'Siguiente →', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.cardCont.add(sT);
        const sHit = this.add.rectangle(W / 2, 716, 176, 48, 0, 0).setInteractive({ useHandCursor: true });
        this.cardCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0x0284c7, 1); sBg.fillRoundedRect(W / 2 - 88, 692, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0x0ea5e9, 1); sBg.fillRoundedRect(W / 2 - 88, 692, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
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
        updateModuleProgress(this.user.id, 'hygiene');
        updateStreak(this.user.id);
        const updated = getUserData(this.user.id);
        const newAchs = checkAndUnlockAchievements(updated);
        if (newAchs.length > 0) {
            const ach = ACHIEVEMENTS.find(a => a.id === newAchs[0]);
            if (ach) this.time.delayedCall(600, () => this.mostrarLogro(ach));
        }
        this.mostrarResultado({ W: this.W, H: this.H, pts, correctas: this.correctas, total: this.questions.length, color: 0x0ea5e9, onReintentar: () => this.scene.restart(), onMenu: () => this.scene.start('MenuScene') });
    }
}

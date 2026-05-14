// src/scenes/ActivityScene.js — Módulo Actividad Física
import BaseScene from './BaseScene.js';
import { PHYSICAL_CHALLENGES, ACTIVITY_QUESTIONS, ACHIEVEMENTS, shuffleArray, getRandomItems } from '../utils/gameData.js';
import { getCurrentUser, addPoints, updateModuleProgress, updateStreak, getUserData, checkAndUnlockAchievements } from '../utils/userData.js';

const F = '"Segoe UI",Arial,sans-serif';

export default class ActivityScene extends BaseScene {
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

        this.crearFondo(0xfff7ed, 0xffedd5);
        this.crearTopbar(this.user, () => this.scene.start('ProfileScene'), () => this.scene.start('LoginScene'));
        this._crearUI();
    }

    _crearUI() {
        const W = this.W;
        this.crearBotonVolver(80, 82, 'Volver al menú', () => this.scene.start('MenuScene'));

        const hBg = this.add.graphics();
        hBg.fillStyle(0xffffff, 1); hBg.lineStyle(2, 0xfed7aa, 1);
        hBg.fillRoundedRect(W / 2 - 280, 112, 560, 72, 16);
        this.add.text(W / 2, 143, '🏃 Actividad Física', { fontSize: '24px', fontFamily: F, fontStyle: 'bold', fill: '#ea580c' }).setOrigin(0.5);
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
            card.fillStyle(0xffffff, 1); card.lineStyle(2, 0xfed7aa, 1); card.fillRoundedRect(W / 2 - 280, cy, 560, 110, 16);
            this.mainCont.add(card);

            const numBg = this.add.graphics();
            numBg.fillStyle(0xea580c, 1); numBg.fillCircle(W / 2 - 244, cy + 55, 22);
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
        sBg.fillGradientStyle(0xea580c, 0xea580c, 0xef4444, 0xef4444, 1);
        sBg.fillRoundedRect(W / 2 - 126, 678, 252, 58, 29);
        this.mainCont.add(sBg);

        const sT = this.add.text(W / 2, 707, '▶  ¡Comenzar desafíos!', { fontSize: '17px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.mainCont.add(sT);

        const sHit = this.add.rectangle(W / 2, 707, 252, 58, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xdc2626, 1); sBg.fillRoundedRect(W / 2 - 126, 678, 252, 58, 29); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillGradientStyle(0xea580c, 0xea580c, 0xef4444, 0xef4444, 1); sBg.fillRoundedRect(W / 2 - 126, 678, 252, 58, 29); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
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
        card.fillStyle(0xffffff, 1); card.lineStyle(3, 0xfed7aa, 1);
        card.fillRoundedRect(W / 2 - 250, 244, 500, 196, 20);
        this.mainCont.add(card);

        const emoT = this.add.text(W / 2, 290, ch.emoji, { fontSize: '56px' }).setOrigin(0.5);
        this.mainCont.add(emoT);
        this.tweens.add({ targets: emoT, y: 282, duration: 800, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

        const nT = this.add.text(W / 2, 342, ch.name, { fontSize: '22px', fontFamily: F, fontStyle: 'bold', fill: '#1c1917' }).setOrigin(0.5);
        const dT = this.add.text(W / 2, 374, ch.description, { fontSize: '14px', fontFamily: F, fill: '#57534e', align: 'center', wordWrap: { width: 440 } }).setOrigin(0.5);
        const p2T = this.add.text(W / 2, 416, `+${ch.points} puntos al completar`, { fontSize: '13px', fontFamily: F, fill: '#ea580c', fontStyle: 'bold' }).setOrigin(0.5);
        this.mainCont.add([nT, dT, p2T]);

        // Timer circular
        this.timerGraf = this.add.graphics();
        this.mainCont.add(this.timerGraf);
        this.timerNumT = this.add.text(W / 2, 530, '', { fontSize: '52px', fontFamily: F, fontStyle: 'bold', fill: '#ea580c' }).setOrigin(0.5);
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
        this.timerGraf.lineStyle(10, 0xfed7aa, 1);
        this.timerGraf.strokeCircle(W / 2, 530, 52);
        const pct = total > 0 ? val / total : 0;
        if (pct > 0) {
            this.timerGraf.lineStyle(10, 0xea580c, 1);
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
            pF.fillStyle(0xea580c, 1); pF.fillRoundedRect(W / 2 - 220, 200, pct * 440, 14, 7);
            this.mainCont.add(pF);
        }
        const pLabel = this.add.text(W / 2, 220, `Pregunta ${this.quizIdx + 1} de ${this.questions.length}`, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#ea580c' }).setOrigin(0.5);
        this.mainCont.add(pLabel);

        // Emoji
        const ec = this.add.graphics(); ec.fillStyle(0xffffff, 1); ec.lineStyle(2, 0xfed7aa, 1); ec.fillRoundedRect(W / 2 - 42, 238, 84, 84, 42);
        const eT = this.add.text(W / 2, 280, q.emoji, { fontSize: '40px' }).setOrigin(0.5);
        this.mainCont.add([ec, eT]);

        // Pregunta
        const qc = this.add.graphics();
        qc.fillStyle(0xffffff, 1); qc.lineStyle(2, 0xfed7aa, 1); qc.fillRoundedRect(W / 2 - 290, 334, 580, 80, 14);
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
        bg.fillStyle(0xfff7ed, 1); bg.lineStyle(2, 0xfed7aa, 1); bg.fillRoundedRect(x, y, w, h, 12);
        this.mainCont.add(bg);

        const letra = ['A', 'B', 'C', 'D'][idx];
        const lBg = this.add.graphics(); lBg.fillStyle(0xea580c, 1); lBg.fillCircle(x + 22, y + h / 2, 14);
        const lT = this.add.text(x + 22, y + h / 2, letra, { fontSize: '13px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        const t = this.add.text(x + 44, y + h / 2, texto, { fontSize: '13px', fontFamily: F, fill: '#1c1917', wordWrap: { width: w - 52 } }).setOrigin(0, 0.5);
        this.mainCont.add([lBg, lT, t]);

        const hit = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(hit);
        hit.on('pointerover',  () => { if (!this.quizAnswered) { bg.clear(); bg.fillStyle(0xffedd5, 1); bg.lineStyle(2, 0xea580c, 1); bg.fillRoundedRect(x, y, w, h, 12); this.tweens.add({ targets: t, scaleX: 1.03, scaleY: 1.03, duration: 100 }); } });
        hit.on('pointerout',   () => { if (!this.quizAnswered) { bg.clear(); bg.fillStyle(0xfff7ed, 1); bg.lineStyle(2, 0xfed7aa, 1); bg.fillRoundedRect(x, y, w, h, 12); this.tweens.add({ targets: t, scaleX: 1, scaleY: 1, duration: 100 }); } });
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
        const py = 574;
        const pBg = this.add.graphics();
        pBg.fillStyle(correcto ? 0xf0fdf4 : 0xfef2f2, 1);
        pBg.lineStyle(2, correcto ? 0x86efac : 0xfca5a5, 1);
        pBg.fillRoundedRect(W / 2 - 300, py, 600, 80, 14);
        this.mainCont.add(pBg); pBg.setAlpha(0);

        const iT = this.add.text(W / 2 - 280, py + 40, correcto ? '✅' : '💡', { fontSize: '22px' }).setOrigin(0, 0.5);
        const eT = this.add.text(W / 2 - 246, py + 40, pregunta.explanation, { fontSize: '11px', fontFamily: F, fill: correcto ? '#166534' : '#9a3412', wordWrap: { width: 500 } }).setOrigin(0, 0.5);
        this.mainCont.add([iT, eT]);
        this.tweens.add({ targets: [pBg, iT, eT], alpha: 1, duration: 250 });

        const esUltimo = this.quizIdx >= this.questions.length - 1;
        const sBg = this.add.graphics();
        sBg.fillStyle(0xea580c, 1); sBg.fillRoundedRect(W / 2 - 88, 666, 176, 48, 24);
        this.mainCont.add(sBg);
        const sT = this.add.text(W / 2, 690, esUltimo ? 'Ver resultado →' : 'Siguiente →', { fontSize: '15px', fontFamily: F, fontStyle: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.mainCont.add(sT);
        const sHit = this.add.rectangle(W / 2, 690, 176, 48, 0, 0).setInteractive({ useHandCursor: true });
        this.mainCont.add(sHit);
        sHit.on('pointerover',  () => { sBg.clear(); sBg.fillStyle(0xc2410c, 1); sBg.fillRoundedRect(W / 2 - 88, 666, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1.05, scaleY: 1.05, duration: 110 }); });
        sHit.on('pointerout',   () => { sBg.clear(); sBg.fillStyle(0xea580c, 1); sBg.fillRoundedRect(W / 2 - 88, 666, 176, 48, 24); this.tweens.add({ targets: sT, scaleX: 1, scaleY: 1, duration: 110 }); });
        sHit.on('pointerdown',  () => {
            this.tweens.add({ targets: sT, scaleX: 0.92, scaleY: 0.92, duration: 70, yoyo: true, onComplete: () => {
                if (esUltimo) this._completar();
                else { this.quizIdx++; this._mostrarPreguntaQuiz(); }
            }});
        });
    }

    _completar() {
        addPoints(this.user.id, this.score);
        updateModuleProgress(this.user.id, 'activity');
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
            color: 0xea580c,
            onReintentar: () => this.scene.restart(),
            onMenu: () => this.scene.start('MenuScene')
        });
    }
}

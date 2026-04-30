// src/scenes/MenuScene.js
import BaseScene, { renderAvatar } from './BaseScene.js';
import { getCurrentUser, clearCurrentUser, isTutor } from '../utils/userData.js';

export default class MenuScene extends BaseScene {
    constructor() { super({ key: 'MenuScene' }); }

    preload() { this.preloadAvatars(); }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;
        this.user = getCurrentUser();
        if (!this.user) { this.scene.start('LoginScene'); return; }
        // Los tutores van a su panel dedicado
        if (isTutor(this.user)) { this.scene.start('TutorScene'); return; }
        this.crearFondo(0xf5eeff, 0xffe8f8);
        this.crearTopbar(this.user,
            () => this.scene.start('ProfileScene'),
            () => { clearCurrentUser(); this.scene.start('LoginScene'); }
        );
        this.crearContenido(W, H);
    }

    crearContenido(W, H) {
        const margin = 80, cW = W - margin*2;
        let y = 90;
        this.crearBienvenida(margin, y, cW); y+=140;
        this.crearModulos(margin, y, cW);   y+=220;
        this.crearLogros(margin, y, cW);    y+=110;
        this.crearTip(margin, y, cW);
        const hBg=this.add.graphics(); hBg.fillStyle(0x6b7280,1); hBg.fillCircle(W-30,H-30,20);
        this.add.text(W-30,H-30,'?',{fontSize:'16px',fontStyle:'bold',fill:'#fff',fontFamily:'"Segoe UI",Arial'}).setOrigin(0.5);
    }

    crearBienvenida(x,y,w) {
        const nombre=(this.user.name||'Campeón').split(' ')[0];
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.fillRoundedRect(x,y,w,118,16);
        this.add.text(x+30,y+28,`¡Hola, ${nombre}! 👋`,{fontSize:'26px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#1f1235'});
        this.add.text(x+30,y+68,'¡Es genial verte de nuevo! ¿Listo para aprender y divertirte?',{fontSize:'15px',fontFamily:'"Segoe UI",Arial',fill:'#6b7280'});
        renderAvatar(this, x+w-50, y+60, 80, this.user);
    }

    crearModulos(x,y,w) {
        const gap=24, modW=(w-gap*2)/3;
        const mods=[
            {titulo:'Alimentación Saludable',desc:'Aprende sobre alimentos nutritivos',emoji:'🍎',iconBg:'🍏',c1:0x22c55e,c2:0x16a34a,scene:'FoodScene',pk:'food'},
            {titulo:'Higiene Personal',desc:'Descubre buenos hábitos de limpieza',emoji:'✨',iconBg:'✦',c1:0x38bdf8,c2:0x0ea5e9,scene:'HygieneScene',pk:'hygiene'},
            {titulo:'Actividad Física',desc:'Muévete y mantente activo',emoji:'🏃',iconBg:'〜',c1:0xf97316,c2:0xef4444,scene:'ActivityScene',pk:'activity'},
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
        const bg=this.add.graphics(); bg.fillStyle(0xffffff,1); bg.lineStyle(1,0xe5e7eb,1); bg.fillRoundedRect(x,y,w,88,16);
        this.add.text(x+26,y+20,'💡  ¿Sabías que...?',{fontSize:'15px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#374151'});
        this.add.text(x+26,y+52,t,{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fill:'#4b5563'});
    }
}

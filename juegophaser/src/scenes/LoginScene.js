// src/scenes/LoginScene.js — Login con localStorage userData
import { loginUser, registerUser } from '../utils/userData.js';

export default class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
        this.tabActual = 'login';
        this.rolSeleccionado = 'student';
        this._cx=0; this._cy=0; this._cardW=480;
    }

    create() {
        const W = this.scale.width, H = this.scale.height;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0xf5eeff,0xf5eeff,0xffe8f8,0xf0e8ff,1);
        bg.fillRect(0,0,W,H);

        const cardW=480, cardH=780;
        const cx=(W-cardW)/2, cy=(H-cardH)/2;
        this._cx=cx; this._cy=cy; this._cardW=cardW;

        const cardBg=this.add.graphics();
        cardBg.fillStyle(0xffffff,1); cardBg.fillRoundedRect(cx,cy,cardW,cardH,24);

        this.crearEstrella(W/2,cy+82);
        this.add.text(W/2,cy+148,'Hábitos Saludables',{fontSize:'26px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#7c3aed',align:'center'}).setOrigin(0.5);
        this.add.text(W/2,cy+180,'¡Aprende y diviértete!',{fontSize:'15px',fontFamily:'"Segoe UI",Arial',fill:'#a78bda',align:'center'}).setOrigin(0.5);

        this.crearTabs(W,cx,cy,cardW);
        this.contenedorForm=this.add.container(0,0);
        this.mostrarFormulario();
    }

    crearEstrella(x,y) {
        const g=this.add.graphics();
        g.fillStyle(0xfbbf24,1);
        this.dibujarEstrellaPath(g,x,y,5,28,14);
        g.fillStyle(0xfde68a,1);
        [{dx:-32,dy:-10,r:4},{dx:32,dy:-8,r:3},{dx:-18,dy:30,r:3},{dx:22,dy:26,r:4}].forEach(d=>g.fillCircle(x+d.dx,y+d.dy,d.r));
        this.tweens.add({targets:g,y:-6,duration:1800,ease:'Sine.easeInOut',yoyo:true,repeat:-1});
        this.tweens.add({targets:g,angle:12,duration:2200,ease:'Sine.easeInOut',yoyo:true,repeat:-1});
    }
    dibujarEstrellaPath(g,cx,cy,p,R,r){
        const pts=[];
        for(let i=0;i<p*2;i++){const rad=i%2===0?R:r;const a=(i*Math.PI)/p-Math.PI/2;pts.push({x:cx+rad*Math.cos(a),y:cy+rad*Math.sin(a)});}
        g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(p2=>g.lineTo(p2.x,p2.y));g.closePath();g.fillPath();
    }

    crearTabs(W,cx,cy,cardW) {
        const tY=cy+204,tX=cx+24,tW=cardW-48;
        const tabBg=this.add.graphics(); tabBg.fillStyle(0xede9fe,1); tabBg.fillRoundedRect(tX,tY,tW,48,24);
        this.tabLoginBg=this.add.graphics();
        this.tabRegBg=this.add.graphics();
        this.tabLoginText=this.add.text(cx+cardW/4,tY+24,'→  Iniciar Sesión',{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff'}).setOrigin(0.5).setInteractive({useHandCursor:true});
        this.tabRegText=this.add.text(cx+cardW*3/4,tY+24,'⊕  Registrarse',{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#7c3aed'}).setOrigin(0.5).setInteractive({useHandCursor:true});
        this.tabLoginText.on('pointerdown',()=>this.cambiarTab('login'));
        this.tabRegText.on('pointerdown',()=>this.cambiarTab('registro'));
        this._tabX=tX;this._tabY=tY;this._tabW=tW;
        this.actualizarTabs();
    }

    actualizarTabs() {
        const eL=this.tabActual==='login',tX=this._tabX,tY=this._tabY,tW=this._tabW;
        this.tabLoginBg.clear();
        if(eL){this.tabLoginBg.fillStyle(0x7c3aed,1);this.tabLoginBg.fillRoundedRect(tX+2,tY+2,tW/2-2,44,22);}
        this.tabRegBg.clear();
        if(!eL){this.tabRegBg.fillStyle(0x7c3aed,1);this.tabRegBg.fillRoundedRect(tX+tW/2,tY+2,tW/2-2,44,22);}
        this.tabLoginText.setStyle({fill:eL?'#fff':'#7c3aed'});
        this.tabRegText.setStyle({fill:!eL?'#fff':'#7c3aed'});
    }

    cambiarTab(tab) {
        if(this.tabActual===tab) return;
        this.tabActual=tab; this.rolSeleccionado='student';
        this.actualizarTabs();
        this.tweens.add({targets:this.contenedorForm,alpha:0,x:tab==='registro'?-20:20,duration:130,onComplete:()=>{
            this.contenedorForm.destroy();
            this.contenedorForm=this.add.container(0,0);
            this.contenedorForm.setAlpha(0);
            this.mostrarFormulario();
            this.tweens.add({targets:this.contenedorForm,alpha:1,x:0,duration:180});
        }});
    }

    mostrarFormulario() {
        if(this.tabActual==='login') this.crearFormLogin();
        else this.crearFormRegistro();
    }

    crearFormLogin() {
        const cx=this._cx,cy=this._cy,cW=this._cardW;
        const fX=cx+24,fW=cW-48;
        let y=cy+272;
        this.etiqueta('👤  Usuario',fX,y);y+=28;
        const iUser=this.campo(fX,y,fW,46,'Escribe tu usuario');y+=62;
        this.etiqueta('🔒  Contraseña',fX,y);y+=28;
        const iPass=this.campo(fX,y,fW,46,'Escribe tu contraseña',true);y+=70;
        this.botonPrincipal(fX,fW,cx,cW,y,'Entrar',()=>{
            const u=iUser.node.value.trim(),p=iPass.node.value.trim();
            if(!u||!p){this.toast('⚠️ Completa todos los campos',0xdc2626);return;}
            const user=loginUser(u,p);
            if(user){this.toast(`✓ ¡Bienvenido, ${user.name}!`,0x16a34a);this.time.delayedCall(900,()=>this.scene.start('MenuScene'));}
            else{this.toast('❌ Usuario o contraseña incorrectos',0xdc2626);}
        });y+=62;
        this.separador(fX,fW,y);y+=18;
        this.cuentaDemo(cx,cy,cW,y);y+=100;
        this.accesoRapido(fX,fW,cx,cW,y,iUser.node,iPass.node);
    }

    crearFormRegistro() {
        const cx=this._cx,cy=this._cy,cW=this._cardW;
        const fX=cx+24,fW=cW-48;
        let y=cy+272;
        this.etiqueta('👤  Usuario',fX,y);y+=28;
        const iUser=this.campo(fX,y,fW,46,'Elige un nombre de usuario');y+=50;
        this.hint('Mínimo 3 caracteres',fX,y);y+=22;
        this.etiqueta('🔒  Contraseña',fX,y);y+=28;
        const iPass=this.campo(fX,y,fW,46,'Crea una contraseña',true);y+=50;
        this.hint('Mínimo 4 caracteres',fX,y);y+=22;
        this.etiqueta('👤  Nombre completo',fX,y);y+=28;
        const iNom=this.campo(fX,y,fW,46,'Tu nombre completo');y+=62;
        const rLabel=this.add.text(fX+4,y,'Rol:',{fontSize:'14px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#4b2d8a'});
        this.contenedorForm.add(rLabel);y+=24;
        this.selectorRol(fX,fW,y);y+=84;
        this.botonPrincipal(fX,fW,cx,cW,y,'Crear cuenta',()=>{
            const u=iUser.node.value.trim(),p=iPass.node.value.trim(),n=iNom.node.value.trim();
            if(!u||!p||!n){this.toast('⚠️ Completa todos los campos',0xdc2626);return;}
            if(u.length<3){this.toast('⚠️ Usuario: mínimo 3 caracteres',0xdc2626);return;}
            if(p.length<4){this.toast('⚠️ Contraseña: mínimo 4 caracteres',0xdc2626);return;}
            const role = this.rolSeleccionado.startsWith('tutor') ? 'tutor' : 'student';
            const res=registerUser(u,p,n,role,'avatar1');
            if(res.error){this.toast(`❌ ${res.error}`,0xdc2626);}
            else{this.toast('✓ ¡Cuenta creada! Ahora inicia sesión',0x16a34a);this.time.delayedCall(1200,()=>this.cambiarTab('login'));}
        });
    }

    // ── Helpers UI ────────────────────────────────────────────
    etiqueta(texto,x,y) {
        const t=this.add.text(x+4,y,texto,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#4b2d8a'});
        this.contenedorForm.add(t);
    }
    hint(texto,x,y) {
        const t=this.add.text(x+4,y,texto,{fontSize:'11px',fontFamily:'"Segoe UI",Arial',fill:'#a78bda'});
        this.contenedorForm.add(t);
    }
    separador(fX,fW,y) {
        const sep=this.add.graphics(); sep.lineStyle(1,0xddd8f0,1); sep.lineBetween(fX,y+4,fX+fW,y+4);
        this.contenedorForm.add(sep);
    }

    campo(x,y,w,h,placeholder,isPass=false) {
        const bg=this.add.graphics(); bg.lineStyle(1.5,0xd8b4fe,1); bg.fillStyle(0xfdfcff,1); bg.fillRoundedRect(x,y,w,h,12);
        this.contenedorForm.add(bg);
        const inp=this.add.dom(x+w/2,y+h/2,'input',{width:(w-24)+'px',height:(h-10)+'px',border:'none',outline:'none',background:'transparent',fontSize:'14px',fontFamily:'"Segoe UI",Arial,sans-serif',color:'#3b1f7a',padding:'0 8px'});
        inp.node.type=isPass?'password':'text'; inp.node.placeholder=placeholder;
        if(!document.head.querySelector('[data-hs-style]')){const s=document.createElement('style');s.setAttribute('data-hs-style','1');s.textContent='input::placeholder{color:#c4b5d8;}';document.head.appendChild(s);}
        inp.node.addEventListener('focus',()=>{bg.clear();bg.lineStyle(2,0x7c3aed,1);bg.fillStyle(0xfaf5ff,1);bg.fillRoundedRect(x,y,w,h,12);});
        inp.node.addEventListener('blur', ()=>{bg.clear();bg.lineStyle(1.5,0xd8b4fe,1);bg.fillStyle(0xfdfcff,1);bg.fillRoundedRect(x,y,w,h,12);});
        this.contenedorForm.add(inp);
        return inp;
    }

    botonPrincipal(fX,fW,cx,cW,y,label,cb) {
        const bBg=this.add.graphics(); bBg.fillStyle(0x7c3aed,1); bBg.fillRoundedRect(fX,y,fW,50,25);
        const ov=this.add.graphics(); ov.fillStyle(0xec4899,0.45); ov.fillRoundedRect(fX+fW/2,y,fW/2,50,{tl:0,tr:25,bl:0,br:25});
        const t=this.add.text(cx+cW/2,y+25,label,{fontSize:'17px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff',align:'center'}).setOrigin(0.5);
        const hit=this.add.rectangle(cx+cW/2,y+25,fW,50,0,0).setInteractive({useHandCursor:true});
        hit.on('pointerover',()=>this.tweens.add({targets:[bBg,ov,t],scaleX:1.02,scaleY:1.02,duration:100}));
        hit.on('pointerout', ()=>this.tweens.add({targets:[bBg,ov,t],scaleX:1,scaleY:1,duration:100}));
        hit.on('pointerdown',()=>{this.tweens.add({targets:[bBg,ov,t],scaleX:0.97,scaleY:0.97,duration:80,yoyo:true});cb();});
        this.contenedorForm.add([bBg,ov,t,hit]);
    }

    cuentaDemo(cx,cy,cW,y) {
        const fX=cx+24,fW=cW-48;
        const bg=this.add.graphics(); bg.fillStyle(0xeff6ff,1); bg.lineStyle(1,0xbfdbfe,1); bg.fillRoundedRect(fX,y,fW,80,12);
        const t1=this.add.text(cx+cW/2,y+16,'💡  Cuentas de demostración',{fontSize:'12px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#1d6fce'}).setOrigin(0.5);
        const t2=this.add.text(cx+cW/2,y+42,'sofia / 1234  •  lucas / 1234  •  maria / 1234',{fontSize:'12px',fontFamily:'"Segoe UI",Arial',fill:'#3b5a8a'}).setOrigin(0.5);
        const t3=this.add.text(cx+cW/2,y+62,'profe / admin  (rol: profesor)',{fontSize:'11px',fontFamily:'"Segoe UI",Arial',fill:'#6b7280'}).setOrigin(0.5);
        this.contenedorForm.add([bg,t1,t2,t3]);
    }

    accesoRapido(fX,fW,cx,cW,y,inputUser,inputPass) {
        const titulo=this.add.text(cx+cW/2,y,'O acceso rápido:',{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fill:'#9880c0'}).setOrigin(0.5);
        this.contenedorForm.add(titulo);
        const usuarios=[{n:'Sofía',u:'sofia',e:'😊'},{n:'Lucas',u:'lucas',e:'🦸'}];
        const bW=(fW-20)/2;
        usuarios.forEach((u,i)=>{
            const bx=fX+i*(bW+20),by=y+18;
            const bg=this.add.graphics(); bg.fillStyle(0xf5f0ff,1); bg.lineStyle(1.5,0xd8b4fe,1); bg.fillRoundedRect(bx,by,bW,50,10);
            const t=this.add.text(bx+bW/2,by+25,`${u.e} ${u.n}`,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#7c3aed'}).setOrigin(0.5);
            const hit=this.add.rectangle(bx+bW/2,by+25,bW,50,0,0).setInteractive({useHandCursor:true});
            this.contenedorForm.add([bg,t,hit]);
            hit.on('pointerdown',()=>{inputUser.value=u.u;inputPass.value='1234';this.toast(`✓ Seleccionado: ${u.n}`,0x16a34a);});
            hit.on('pointerover',()=>{bg.clear();bg.fillStyle(0xede9fe,1);bg.lineStyle(2,0x7c3aed,1);bg.fillRoundedRect(bx,by,bW,50,10);});
            hit.on('pointerout', ()=>{bg.clear();bg.fillStyle(0xf5f0ff,1);bg.lineStyle(1.5,0xd8b4fe,1);bg.fillRoundedRect(bx,by,bW,50,10);});
        });
    }

    selectorRol(fX,fW,y) {
        const roles=[{id:'student',label:'Estudiante',e:'📖'},{id:'tutor',label:'Profesor',e:'👨‍🏫'},{id:'tutor_parent',label:'Padre/Madre',e:'🏠'}];
        const bW=(fW-20)/3;
        this._rolesBgs=[];
        roles.forEach((r,i)=>{
            const bx=fX+i*(bW+10),by=y;
            const bg=this.add.graphics(); this._rolesBgs.push({bg,bx,by,bW,id:r.id});
            this.contenedorForm.add(bg);
            this.dibujarRol(bg,bx,by,bW,60,r.id===this.rolSeleccionado);
            const e=this.add.text(bx+bW/2,by+20,r.e,{fontSize:'20px',fontFamily:'"Segoe UI",Arial'}).setOrigin(0.5);
            const l=this.add.text(bx+bW/2,by+45,r.label,{fontSize:r.id==='parent'?'10px':'12px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:r.id===this.rolSeleccionado?'#7c3aed':'#6b7280'}).setOrigin(0.5);
            this.contenedorForm.add([e,l]);
            const hit=this.add.rectangle(bx+bW/2,by+30,bW,60,0,0).setInteractive({useHandCursor:true});
            this.contenedorForm.add(hit);
            hit.on('pointerdown',()=>{this.rolSeleccionado=r.id;this._rolesBgs.forEach(rb=>{rb.bg.clear();this.dibujarRol(rb.bg,rb.bx,rb.by,rb.bW,60,rb.id===this.rolSeleccionado);});l.setStyle({fill:'#7c3aed'});});
        });
    }
    dibujarRol(g,x,y,w,h,activo){g.fillStyle(activo?0xf0e8ff:0xfafafa,1);g.lineStyle(activo?2:1,activo?0x7c3aed:0xe5e7eb,1);g.fillRoundedRect(x,y,w,h,10);}

    toast(texto,color=0x16a34a) {
        if(this._toastObj) this._toastObj.destroy();
        const W=this.scale.width,H=this.scale.height;
        const c=this.add.container(0,0);
        const bg=this.add.graphics(); bg.fillStyle(color,0.93); bg.fillRoundedRect(W/2-230,H-78,460,48,12);
        const t=this.add.text(W/2,H-54,texto,{fontSize:'13px',fontFamily:'"Segoe UI",Arial',fontStyle:'bold',fill:'#fff',align:'center'}).setOrigin(0.5);
        c.add([bg,t]); c.setAlpha(0); this._toastObj=c;
        this.tweens.add({targets:c,alpha:1,duration:200,onComplete:()=>{
            this.time.delayedCall(2600,()=>this.tweens.add({targets:c,alpha:0,duration:280,onComplete:()=>c.destroy()}));
        }});
    }
}

var estado = "inicial", instrução = 0, pontuação = 0, tempo = 0, carteira = 0;

var solo1, solo2, soloImg, platE, platD, platEImg, platDImg;
var fundo, fundo1, fundo2, laCasaDePapel, laCasaDePapelImg;
var dinheiro, dinheiroImg, bomba, bomba1, bomba2, bomba3, explosão;

var jogar, jogar1, jogar2, vocêPerdeu, vocêPerdeuImg, recomeçar, recomeçarImg;
var ok1, ok2, ok3, ok4, okImg;

var setaE, setaEImg, setaEP, setaD, setaDImg, setaDP;

//  sprite  parado   jogando  saltando  caído
var berlim, berlimP, berlimJ, berlimS, berlimC;

var tema, clique, pulo, coleta, teleporte, ponto, explodiu, bateu;

function preload(){

  laCasaDePapelImg = loadImage("laCasaDePapel.png");
  fundo1 = loadImage("fundo1.jpg");
  fundo2 = loadImage("fundo2.png");
  
  platEImg = loadImage("platE.png");
  platDImg = loadImage("platD.png");
  soloImg = loadImage("solo.png");

  dinheiroImg = loadImage("dinheiro.png");
  explosão = loadImage("explosão.png");
  bomba1 = loadImage("bomba1.png");
  bomba2 = loadImage("bomba2.png");
  bomba3 = loadImage("bomba3.png");

  vocêPerdeuImg = loadImage("vocêPerdeu.png");
  recomeçarImg = loadImage("recomeçar.png");
  jogar1 = loadImage("jogar1.png");
  jogar2 = loadImage("jogar2.png");
  okImg = loadImage("ok.png");

  setaEImg = loadAnimation("setaE1.png", "setaE2.png");
  setaDImg = loadAnimation("setaD1.png", "setaD2.png");
  setaEP = loadAnimation("setaE1.png");
  setaDP = loadAnimation("setaD1.png");

  berlimJ = loadAnimation("berlim1.png", "berlim2.png");
  berlimP = loadAnimation("berlimP.png");
  berlimS = loadAnimation("berlimS.png");
  berlimC = loadAnimation("berlimC.png");

  teleporte = loadSound("teleporte.mp3");
  explodiu = loadSound("explodiu.mp3");
  coleta = loadSound("coleta.mp3");
  clique = loadSound("clique.mp3");
  ponto = loadSound("ponto.mp3");
  bateu = loadSound("bateu.mp3");
  pulo = loadSound("pulo.mp3");
  tema = loadSound("tema.mp3");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);

  fundo = createSprite(width/2, height/2+180);
  fundo.addImage(fundo1);
  fundo.scale = 3;

  jogar = createSprite(width/2, height/2+160);
  jogar.addImage(jogar1);
  jogar.scale = 0.5;

  ok1 = createSprite(width/2+250, height/2+160);
  ok1.setCollider("circle", 0, -2, 57);
  ok1.addImage(okImg);
  ok1.visible = false;
  ok1.scale = 0.4;

  ok2 = createSprite(width/2+265, height/2+108);
  ok2.setCollider("circle", 0, -2, 57);
  ok2.addImage(okImg);
  ok2.visible = false;
  ok2.scale = 0.4;

  ok3 = createSprite( width/2-3, height/2-60);
  ok3.setCollider("circle", 0, -2, 57);
  ok3.addImage(okImg);
  ok3.visible = false;
  ok3.scale = 0.4;

  ok4 = createSprite( width/2-2, height/2-10);
  ok4.setCollider("circle", 0, -2, 57);
  ok4.addImage(okImg);
  ok4.visible = false;
  ok4.scale = 0.4;

  ok5 = createSprite( width/2-402, height/2-155);
  ok5.setCollider("circle", 0, -2, 57);
  ok5.addImage(okImg);
  ok5.visible = false;
  ok5.scale = 0.4;

  ok6 = createSprite( width/2-402, height/2+195);
  ok6.setCollider("circle", 0, -2, 57);
  ok6.addImage(okImg);
  ok6.visible = false;
  ok6.scale = 0.4;

  ok7 = createSprite( width/2-3, height/2-60);
  ok7.setCollider("circle", 0, -2, 57);
  ok7.addImage(okImg);
  ok7.visible = false;
  ok7.scale = 0.4;

  vocêPerdeu = createSprite(width/2, height/2-40);
  vocêPerdeu.addImage(vocêPerdeuImg);
  vocêPerdeu.visible = false;
  vocêPerdeu.scale = 0.5;

  recomeçar = createSprite(width/2+200, height/2+110);
  recomeçar.addImage(recomeçarImg);
  recomeçar.visible = false;
  recomeçar.scale = 0.15;

  laCasaDePapel = createSprite(width/2, height/2-130);
  laCasaDePapel.addImage(laCasaDePapelImg);
  laCasaDePapel.scale = 0.25;

  berlim = createSprite(width/2, height-120);
  berlim.setCollider("rectangle", 0, -10, 130, 260);
  berlim.depth = vocêPerdeu.depth;
  berlim.visible = false;
  berlim.scale = 0.7;

  solo1 = createSprite(width/2-400, height-30);
  solo1.setCollider("rectangle", 0, 180);
  solo1.depth = berlim.depth - 1;
  solo1.addImage(soloImg);
  solo1.visible = false;
  solo1.scale = 2;
  
  solo2 = createSprite(width/2+400, height-30);
  solo2.setCollider("rectangle", 0, 180);
  solo2.depth = berlim.depth - 1;
  solo2.addImage(soloImg);
  solo2.visible = false;
  solo2.scale = 2;

  setaE = createSprite(width-width+75, height-100);
  setaE.depth = berlim.depth-2; 
  setaE.visible = false;
  setaE.scale = 0.6;

  setaD = createSprite(width-75, height-100);
  setaD.depth = berlim.depth-2;
  setaD.visible = false;
  setaD.scale = 0.6;

  plataformas = createGroup();
  dinheiros = createGroup();
  bombas = createGroup();

  teleporte.setVolume(0.1);
  explodiu.setVolume(0.8);
  clique.setVolume(0.1);
  ponto.setVolume(0.3);
  bateu.setVolume(0.5);
  tema.setVolume(0.1);
  pulo.setVolume(0.2);
  tema.loop();
}

function draw(){

  dinheiros.collide(solo2);
  dinheiros.collide(solo1);
  bombas.collide(bombas);
  berlim.collide(solo2);
  berlim.collide(solo1);
  bombas.collide(solo1);
  bombas.collide(solo2);
  bombas.collide(platD);
  bombas.collide(platE);

  background(0);
  drawSprites();
  textos();

  if(estado == "inicial"){

    berlim.addAnimation("berlim",  berlimP);

    começar();
    tutorial();
  }

  if(estado == "jogando"){

    berlim.setCollider("rectangle", 0, -10, 130, 260);

    if(tempo < 150){
      tempo++;
    }

    gerarPlataformas();
    gerarBombas();
    teleportar();
    movimento();
    noCursor();
    pontuar();
    derrota();  
  }

  if(estado == "perdeu"){

    setaD.addAnimation("setaE", setaDP);
    setaE.addAnimation("setaE", setaEP);
    berlim.collide(solo2);
    berlim.collide(solo1);
    berlim.velocityY += 1;
    bomba.collide(platE);
    bomba.collide(platD);
  
    resetar();
    cursor();
  }
}

function textos(){

  if(instrução >= 1){

    stroke(0);
    fill("red");
    textSize(40);
    strokeWeight(5);
    text(pontuação, width-width+20, height-height+50);

    fill("green");
    text(carteira, width-width+20, height-height+100);

  }else{

    noStroke();
    fill("red");
    textSize(25);
    textFont("Times New Roman");
    text("PLATAFORM CLIMB", width/2 - 110, height/2+50);
  }
}

function começar(){

  if(mouseIsOver(jogar)){
    jogar.addImage(jogar2);
  }else{
    jogar.addImage(jogar1);
  }

  if(mousePressedOver(jogar)){

    instrução = 1;
    clique.play();
    jogar.y = width;
    fundo.scale = 1.5;
    setaE.visible = true;
    setaD.visible = true;
    solo1.visible = true;
    solo2.visible = true;
    berlim.visible = true;
    fundo.addImage(fundo2);
    laCasaDePapel.visible = false;
    setaE.addAnimation("setaE", setaEImg);
    setaD.addAnimation("setaE", setaDImg);
  }
}

function tutorial(){

  if(instrução == 1){

    ok1.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2+82, height/2-35, 350, 150);

    noStroke();
    fill("red");
    circle(width/2+82, height/2+115, 20);

    fill(0);
    textSize(20);
    text("Esse é o Berlim, seu personagem!", width/2+102, height/2);
    text("Você pode movê-lo com:", width/2+142, height/2+30);
    text("A(Esquerda), W(Cima) e D(Direita),", width/2+100, height/2+60);
    text("ou usando as setas do teclado.", width/2+120, height/2+90);

    if(mouseIsOver(ok1)){
      ok1.scale = 0.45;
    }else{
      ok1.scale = 0.4;
    }

    if(mousePressedOver(ok1)){
      clique.play();
      ok1.destroy();
      instrução = 2;
    }
  }

  if(instrução == 2){

    ok2.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2+82, height/2-37, 380, 100);     
    
    noStroke();
    fill("red");
    circle(width/2+82, height/2+65, 20);

    fill(0);
    textSize(20);
    text("Você também pode pular com ESPAÇO,", width/2+92, height/2-10);
    text("e pressionando SHIFT ao correr,", width/2+130, height/2+20);
    text("a sua velocidade aumenta.", width/2+160, height/2+50);

    if(mouseIsOver(ok2)){
      ok2.scale = 0.45;
    }else{
      ok2.scale = 0.4;
    }

    if(mousePressedOver(ok2)){
      clique.play();
      ok2.destroy();
      instrução = 3;
    }
  }

  if(instrução == 3){

    ok3.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2-186, height/2-175, 380, 70);     
    
    noStroke();
    fill("red");
    circle(width/2-186, height/2-105, 20);

    fill(0);
    textSize(20);
    text("Plataformas aparecerão de cima,", width/2-146, height/2-148);
    text("não toque nelas para permanecer vivo.", width/2-169, height/2-118);

    if(mouseIsOver(ok3)){
      ok3.scale = 0.45;
    }else{
      ok3.scale = 0.4;
    }

    if(mousePressedOver(ok3)){
      clique.play();
      ok3.destroy();
      instrução = 4;
    }
  }

  if(instrução == 4){

    ok4.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2-185, height/2-155, 380, 100);     
    
    noStroke();
    fill("red");
    circle(width/2-185, height/2-55, 20);

    fill(0);
    textSize(20);
    text("Dinheiro e bombas também cairão,", width/2-156, height/2-128);
    text("mas somente um deles pode ser pego.", width/2-170, height/2-98);
    text("Você já deve imaginar qual...", width/2-127, height/2-68);

    if(mouseIsOver(ok4)){
      ok4.scale = 0.45;
    }else{
      ok4.scale = 0.4;
    }

    if(mousePressedOver(ok4)){
      clique.play();
      ok4.destroy();
      instrução = 5;
    }
  }

  if(instrução == 5){

    ok5.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2-585, height/2-300, 380, 100);     
    
    noStroke();
    fill("red");
    circle(width/2-585, height/2-250, 20);

    fill(0);
    textSize(20);
    text("Aqui temos os placares.", width/2-507, height/2-275);
    text("O vermelho indica a sua pontuação,", width/2-557, height/2-245);
    text("e o verde, seu dinheiro.", width/2-501, height/2-215);

    if(mouseIsOver(ok5)){
      ok5.scale = 0.45;
    }else{
      ok5.scale = 0.4;
    }

    if(mousePressedOver(ok5)){
      clique.play();
      ok5.destroy();
      instrução = 6;
    }
  }

  if(instrução == 6){

    ok6.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2-585, height/2+50, 380, 100);     
    
    noStroke();
    fill("red");
    circle(width/2-585, height/2+150, 20);

    fill(0);
    textSize(20);
    text("Essas setas são pasasgens secretas,", width/2-565, height/2+75);
    text("você poderá se taleransportar", width/2-531, height/2+105);
    text("entre os dois lados do jogo.", width/2-520, height/2+135);

    if(mouseIsOver(ok6)){
      ok6.scale = 0.45;
    }else{
      ok6.scale = 0.4;
    }

    if(mousePressedOver(ok6)){
      clique.play();
      ok6.destroy();
      instrução = 7;
    }
  }

  if(instrução == 7){

    ok7.visible = true;

    stroke(0);
    fill("white");
    strokeWeight(5);
    rect(width/2-186, height/2-175, 380, 70);     
    
    noStroke();
    fill("red");
    circle(width/2-186, height/2-105, 20);

    fill("red");
    textSize(30);
    text("BOA SORTE!", width/2-87, height/2-128);

    if(mouseIsOver(ok7)){
      ok7.scale = 0.45;
    }else{
      ok7.scale = 0.4;
    }

    if(mousePressedOver(ok7)){
      berlim.addAnimation("berlim", berlimJ);
      estado = "jogando";
      clique.play();
      ok7.destroy();
      instrução = 8;
    }
  }
}

function movimento(){

  //velocidade do jogador
  var x = 20;

  if(keyDown("shift")){
    x *= 2.5;
  }

  if(keyDown("d") || keyDown("RIGHT_ARROW")){
    berlim.x += x;
  }

  if(keyDown("a") || keyDown("LEFT_ARROW")){
    berlim.x -= x;
  }

  if((keyDown("space") || keyDown("w") || keyDown("UP_ARROW")) && berlim.y > height-165){
    berlim.velocityY = -15;
    pulo.play();
  }
  
  berlim.velocityY += 1.2;
}

function teleportar(){

  if(berlim.x < width-width){
    berlim.x = width;
    teleporte.play();
  }

  if(berlim.x > width){
    berlim.x = width-width;
    teleporte.play();
  }
}

function gerarPlataformas(){

  if(frameCount % 100 == 0){
    
    platD = createSprite(random(width/2+400, width/2+1200), height-height-35);
    platD.setCollider("rectangle", 0, -2, 400, 27);
    platD.depth = berlim.depth-2;
    platD.lifetime = height/7;
    platD.addImage(platDImg);
    plataformas.add(platD);
    platD.velocityY = 7;
    platD.scale = 3;

    platE = createSprite(platD.x - (1600 - pontuação*5), height-height-35);
    platE.setCollider("rectangle", 0, -2, 400, 27);
    platE.depth = berlim.depth-2;
    platE.lifetime = height/7;
    platE.addImage(platEImg);
    plataformas.add(platE);
    platE.velocityY = 7;
    platE.scale = 3;    
  }
}

function gerarBombas(){

  if(frameCount % 100 == 0){
    
    bomba = createSprite(random(width-width+50, width-50), height-height-100);
    bomba.depth = berlim.depth-1; 
    bomba.lifetime = 150;
    bomba.velocityY = 20;
    bombas.add(bomba);

    var escolha = Math.round(random(1, 3));

    switch(escolha){

      case 1:
        bomba.setCollider("circle", 0, 50, 100);
        bomba.addImage(bomba1);
        bomba.scale = 0.2;
      break;

      case 2:
        bomba.setCollider("rectangle", 0, 30, 180, 230);
        bomba.addImage(bomba2);
        bomba.scale = 0.25;
      break;

      case 3:
        bomba.setCollider("rectangle", 0, 30, 400, 400);
        bomba.addImage(bomba3);
        bomba.scale = 0.15;
      break;
    }
  }
}

function gerarDinheiro(){

  if(frameCount % 250 == 0){

    dinheiro = createSprite(random(width-width+50, width-50), height-height-50);
    dinheiro.setCollider("circle", 0, 0, 900);
    dinheiro.depth = berlim.depth-1;
    dinheiro.addImage(dinheiroImg);
    dinheiro.velocityY = 20;
    dinheiro.lifetime = 200;
    dinheiros.add(dinheiro);
    dinheiro.scale = 0.04;
  }
}

function pontuar(){

  if(tempo > 90){

    gerarDinheiro();

    if(frameCount % 100 == 0){
      ponto.play();
      pontuação++;
    }
  }

  if(dinheiros.isTouching(berlim)){
    dinheiro.destroy();
    coleta.play();
    carteira++;
  }
}

function derrota(){

  if(bombas.isTouching(berlim) || plataformas.isTouching(berlim)){

    if(bombas.isTouching(berlim)){
      explodiu.play();
    }else if(plataformas.isTouching(berlim)){
      bateu.play();
    }

    tempo = 0;
    estado = "perdeu";
    berlim.velocityY = 0;
    recomeçar.visible = true;
    vocêPerdeu.visible = true;
    bombas.setLifetimeEach(-1);
    plataformas.setVelocityYEach(0);
    plataformas.setLifetimeEach(-1);
    berlim.addAnimation("berlim", berlimC);
    berlim.setCollider("rectangle", 0, 0, 260, 100);
  } 
}

function resetar(){

  if(mouseIsOver(recomeçar)){
    recomeçar.scale = 0.16;
  }else{
    recomeçar.scale = 0.15;
  }

  if(mousePressedOver(recomeçar)){
    
    carteira = 0;
    clique.play();
    pontuação = 0;
    berlim.x = width/2;
    estado = "jogando";
    setaE.visible = true;
    setaD.visible = true;
    bombas.destroyEach();
    dinheiros.destroyEach();
    plataformas.destroyEach();
    recomeçar.visible = false;
    vocêPerdeu.visible = false;
    setaE.addAnimation("setaE", setaEImg);
    setaD.addAnimation("setaE", setaDImg);
    berlim.addAnimation("berlim", berlimJ);
  }
}
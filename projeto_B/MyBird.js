class MyBird extends CGFobject {
  constructor(scene, tetayy, velocity, x, y, z) {
    super(scene);

    this.tetayy = tetayy;
    this.velocity = velocity;
    this.velocity_vert = 0;
    this.xpos = x;
    this.ypos_ini = y;
    this.ypos = this.ypos_ini;
    this.zpos = z;
    this.tanterior = 0;
    this.velociti = 0;
    this.state_pick = 0;
    this.state_drop = 0;
    this.picked_it = false;
    this.a = false;
	this.guarda = 0;

    this.xposi = 0;
    this.zposi = 0;
    this.yposi = 0;

    this.cube = new MyUnitCubeQuad(this.scene);
    this.pyramid = new MyPyramid(this.scene, 20, 1);
    this.triangle = new MyTriangle(this.scene);
    this.quad = new MyQuad(this.scene);
    this.cone = new MyCone(this.scene, 4, 1, 1);
    this.galho = new MyTreeBranch(this.scene);
    this.beak = new MyPyramid(this.scene, 4, 1);

    this.bico = new CGFappearance(this.scene);
    this.bico.setAmbient(1, 215 / 255, 0 / 255, 1);
    this.bico.setDiffuse(1, 215 / 255, 0 / 255, 1);
    this.bico.setSpecular(1, 215 / 255, 0 / 255, 1);
    this.bico.setShininess(10.0);

    this.penas = new CGFappearance(this.scene);
    this.penas.setAmbient(240 / 255, 240 / 255, 240 / 255, 1);
    this.penas.setDiffuse(240 / 255, 240 / 255, 240 / 255, 1);
    this.penas.setSpecular(240 / 255, 240 / 255, 240 / 255, 1);
    this.penas.setShininess(10.0);

    this.barriga = new CGFappearance(this.scene);
    this.barriga.setAmbient(1, 0, 0, 1);
    this.barriga.setDiffuse(1, 0, 0, 1);
    this.barriga.setSpecular(1, 0, 0, 1);
    this.barriga.setShininess(10.0);
    this.barriga.loadTexture("images/penas_barriga.png");
    this.barriga.setTextureWrap("REPEAT", "REPEAT");

    this.costas = new CGFappearance(this.scene);
    this.costas.setAmbient(0, 0, 1, 1);
    this.costas.setDiffuse(0, 0, 1, 1);
    this.costas.setSpecular(0, 0, 1, 1);
    this.costas.setShininess(10.0);
    this.costas.loadTexture("images/penas.png");
    this.costas.setTextureWrap("REPEAT", "REPEAT");

    this.olhos = new CGFappearance(this.scene);
    this.olhos.setAmbient(32 / 255, 32 / 255, 32 / 255, 1);
    this.olhos.setDiffuse(32 / 255, 32 / 255, 32 / 255, 1);
    this.olhos.setSpecular(32 / 255, 32 / 255, 32 / 255, 1);
    this.olhos.setShininess(10.0);
  }

  reset() {
    this.xpos = this.scene.xpos;
    this.ypos = this.scene.ypos;
    this.zpos = this.scene.zpos;
    this.velocity = 0;
    this.velocity_vert = 0;
    this.tetayy = 0;
    if (this.picked_it) state_pick = 4;
    else state_pick = 0;
  }

  accelerate(v) {
    
      if (v) this.velocity++;
      else this.velocity--;

      //limitar velocidade para nao andar a speedy gonzalez por ai fora
      if (this.velocity > 5 * this.scene.speedFactor) {
        this.velocity = 5;
      } else if (this.velocity < -3 * this.scene.speedFactor) {
        this.velocity = -3;
      }
    
  }
  collision(v) {
    if (v) {
      this.d = Math.sqrt(
        Math.pow(this.xpos - this.scene.nest_zpos, 2) +
          Math.pow(this.zpos - this.scene.nest_zpos, 2)
      );
      if (this.d <= 5) {
        this.scene.poe_ninho(this.guarda);
        this.picked_it = false;
		this.state_pick = 6;
        return 1;
      }
    } else {
      for (let i = 0; i < this.scene.galhos.length; i++) {
        this.d = Math.sqrt(
          Math.pow(this.xpos - this.scene.galhos_pos_x[i], 2) +
            Math.pow(this.zpos - this.scene.galhos_pos_z[i], 2)
        );

        if (this.d <= 5) {
          this.scene.remove_branch(i);
          this.picked_it = true;
		  this.guarda = i;
		  
          return 1;
        }
      }
    }

    return 0;
  }
  turn(v) {
    if (v) this.tetayy = this.tetayy + (Math.PI / 10) * this.scene.speedFactor;
    else this.tetayy = this.tetayy - (Math.PI / 10) * this.scene.speedFactor;
  }

  pickup() {
    if (this.state_pick == 0) 
      this.state_pick = 1;
    else if (this.state_pick == 4) 
      this.state_pick = 5;
  }

  limit() {
    //limitar o movimento do passaro
    if (this.xpos > 45) 
      this.xpos = 45;
    else if (this.xpos < -45) 
      this.xpos = -45;

    if (this.zpos > 45) 
      this.zpos = 45;
    else if (this.zpos < -45) 
      this.zpos = -45;
  }

  update(t) {
    this.dt = this.scene.t - this.tanterior;

    this.tanterior = this.scene.t;

    //o xposi e o zposi sao 2 auxiliares porque isto nao deixa modificar uma variavel com a propria variavel
    this.xposi =
      this.xpos +
      Math.cos(this.tetayy) * this.velocity * this.dt * this.scene.speedFactor;

    this.zposi =
      this.zpos -
      Math.sin(this.tetayy) * this.velocity * this.dt * this.scene.speedFactor;

    this.yposi = this.ypos + this.velocity_vert * this.dt;
    this.xpos = this.xposi;
    this.zpos = this.zposi;
    this.ypos = this.yposi;


	//estado 0 = voo sem pau
	//estado 1 = baixar sem pau (quando o y<5, comeca a testar colisoes, se houver colisao segue para o estado 2, senao para o 3)
    //estado 2 = subir com pau
	//estado 3 = subir sem pau, volta ao estado zero
	//estado 4 = voo com pau
	//estado 5 = baixar com pau (quando o y<5, comeca a testar colisoes, se houver colisao segue para o estado 6, senao para o 7)
    //estado 6 = subir sem pau, volta ao estado zero
	//estado 7 = subir com pau, volta ao estado 4
	if (this.state_pick == 1 && this.ypos <= 0) {
      if (this.a) 
        this.state_pick = 2;
      else 
        this.state_pick = 3;
    } 
    else if (this.state_pick == 2 && this.ypos >= this.scene.ypos) {
      this.state_pick = 4;
      this.a = false;
    } 
    else if (this.state_pick == 3 && this.ypos >= this.scene.ypos) {
      this.state_pick = 0;
    } 
	else if (this.state_pick == 5 && this.ypos <= this.scene.nest_ypos) {
      if 
        (this.a) this.state_pick = 6;
      else 
        this.state_pick = 7;
    } 
    else if (this.state_pick == 6 && this.ypos >= this.scene.ypos) {
      this.state_pick = 0;
      this.a = false;
    } 
	//estado 7 = subir com pau, volta ao estado zero
    else if (this.state_pick == 7 && this.ypos >= this.scene.ypos) {
      this.state_pick = 4;
    }

	
    if (this.state_pick == 1) {
      this.velocity_vert = -10 / 2;
      if (this.ypos <= 5) {
        if (!this.a) 
          this.a = this.collision(0);
      }
    } 
    else if (this.state_pick == 5) {
      this.velocity_vert = -10 / 2;
      if (this.ypos <= 5) {
        if (!this.a) 
          this.a = this.collision(1);
      }
    } 
    else if (this.state_pick == 2 ||
            this.state_pick == 3 ||
            this.state_pick == 6 ||
            this.state_pick == 7) 

      this.velocity_vert = 10 / 2;
    
    else if (this.state_pick == 0 || this.state_pick == 4) {
      this.velocity_vert = 0;
    }

    this.limit();
  }

  display() {
    this.update(this.scene.t);

    this.scene.pushMatrix();

    //animação do passaro a flutuar
    this.scene.translate(this.xpos, this.ypos, this.zpos);
    this.scene.rotate(this.tetayy, 0, 1, 0);
    this.scene.translate(0, 5 
                            + Math.sin(this.scene.t) * 0.5 * this.scene.speedFactor,0);

    this.scene.rotate(Math.PI / 2, 0, 1, 0);

    //galho no bico
    if (this.picked_it) {
      this.scene.pushMatrix();
        this.scene.translate(2, 1.3 * 1.5, 0.7 * 1.5);
        this.scene.scale(0.4, 0.5, 0.4);
        this.scene.scale(1 / 0.2, 1 / 0.2, 1 / 0.2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.branch.apply();
        this.galho.display();
      this.scene.popMatrix();
    }
    this.scene.pushMatrix();

      this.scene.scale(
        1.5 * this.scene.scaleFactor,
        1.5 * this.scene.scaleFactor,
        1.5 * this.scene.scaleFactor
      );

      //corpo
      this.scene.pushMatrix();
      this.scene.scale(1, 2, 1);
      this.penas.apply();
      this.cube.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(1.1, 0.9, 1.1);
      this.scene.translate(0, 0.6, 0);
      this.barriga.apply();
      this.cube.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.35);
      this.scene.scale(1.2, 2.1, 1);
      this.costas.apply();
      this.cube.display();
      this.scene.popMatrix();

      //cabeça
      this.scene.pushMatrix();
      this.scene.translate(0, 1.5, 0.2);
      this.penas.apply();
      this.cube.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 1.55, -0.1);
      this.scene.scale(1.1, 1.1, 1);
      this.costas.apply();
      this.cube.display();
      this.scene.popMatrix();

      //bico
      this.scene.pushMatrix();
      this.scene.translate(0, 1.3, 0.7);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.15, 0.15, 0.15);
      this.bico.apply();
      this.beak.display();
      this.scene.popMatrix();

      //olhos
      var i = -1;
      while (i <= 1) {
        this.scene.pushMatrix();
        this.scene.translate(0.5 * i, 1.7, 0.7);
        this.scene.scale(0.15, 0.15, 0.15);
        this.olhos.apply();
        this.cube.display();
        this.scene.popMatrix();
        i += 2;
      }

      //patas
      i = -1;
      while (i <= 1) {
        this.scene.pushMatrix();
        this.scene.translate(0.5 * i, -0.8, 0.45);
        this.scene.rotate((Math.PI * 5) / 4, -1, 0, 0);
        this.scene.scale(0.09, 0.65, 0.09);
        this.olhos.apply();
        this.pyramid.display();
        this.scene.popMatrix();
        i += 2;
      }

      //cauda
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI / 6, 1, 0, 0);
      i = -1;
      var x = 1;
      while (i <= 1) {
        this.scene.pushMatrix();
        this.scene.translate(0.05 * i, -0.8, -0.5);
        this.scene.rotate(Math.PI, 0, 0, -1 * x);
        this.scene.rotate(Math.PI / 2, -1, 0, 0);
        this.scene.scale(0.15, 0.4, 0.7);
        this.costas.apply();
        this.triangle.display();
        this.scene.popMatrix();
        i += 2;
        x--;
      }
      this.scene.popMatrix();

      //-----------assas--------------
      this.scene.pushMatrix();

      i = -1;
      x = 1;
      while (i <= 1) {
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 8, 1, 0, 0);
        this.scene.rotate(Math.sin(this.scene.t + Math.PI / 6) * 0.25 * this.scene.speedFactor,
          0,0,1 * i);

        this.scene.pushMatrix();
        this.scene.translate(1 * i, 0.5, -0.3);
        this.scene.rotate(Math.PI / 8, 0, 0, 1 * i);
        this.scene.rotate(Math.PI / 2, -1, 0, 0);
        this.scene.scale(1, 0.65, 1);
        this.costas.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.45 * i, 0.7, 0.02);
        this.scene.rotate(Math.PI / 8, 0, 0, -1 * i);
        this.scene.rotate(Math.PI, 0, 0, 1 * x);
        this.scene.rotate(Math.PI / 2, -1, 0, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.costas.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        i += 2;
        x--;
      }
    this.scene.popMatrix();
    this.scene.popMatrix();

    //---------------------------------

    this.scene.popMatrix();
  }
}

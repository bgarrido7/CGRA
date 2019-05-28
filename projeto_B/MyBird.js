/**
 * MyPyramid
 * @constructor
 */
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

    this.costas = new CGFappearance(this.scene);
    this.costas.setAmbient(0, 0, 51 / 255, 1);
    this.costas.setDiffuse(0, 0, 51 / 255, 1);
    this.costas.setSpecular(0, 0, 51 / 255, 1);
    this.costas.setShininess(10.0);

    this.olhos = new CGFappearance(this.scene);
    this.olhos.setAmbient(32 / 255, 32 / 255, 32 / 255, 1);
    this.olhos.setDiffuse(32 / 255, 32 / 255, 32 / 255, 1);
    this.olhos.setSpecular(32 / 255, 32 / 255, 32 / 255, 1);
    this.olhos.setShininess(10.0);
  }

  reset() {
    this.xpos = 14;
    this.ypos = 20;
    this.zpos = 0;
    this.velocity = 0;
    this.tetayy = 0;
  }

  accelerate(v) {
    if (this.state_pick == 0 && this.state_drop == 0) {
      if (v) this.velocity++;
      else this.velocity--;

      //limitar velocidade para nao andar a speedy gonzalez por ai fora
      if (this.velocity > 5 * this.scene.speedFactor) {
        this.velocity = 5;
      } else if (this.velocity < -3 * this.scene.speedFactor) {
        this.velocity = -3;
      }
    }
  }

  turn(v) {
    if (v) this.tetayy = this.tetayy + (Math.PI / 10) * this.scene.speedFactor;
    else this.tetayy = this.tetayy - (Math.PI / 10) * this.scene.speedFactor;
  }

  pickup() {
    this.velocity = 0;
    if (this.state_pick == 0) {
      this.state_pick = 1;
    }
  }

  dropit() {
    this.velocity = 0;
    if (this.state_drop == 0) {
      this.state_drop = 1;
    }
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

    //movimento de apanhar
    if (this.state_pick == 1 && this.ypos <= 0) {
      this.state_pick = 2;
      this.picked_it = true;
    } else if (this.state_pick == 2 && this.ypos >= this.ypos_ini) {
      this.state_pick = 0;
      this.velocity_vert = 0;
    }

    if (this.state_pick == 1) {
      this.velocity_vert = -20 / 2;
    } else if (this.state_pick == 2) {
      this.velocity_vert = 20 / 2;
    }

    //movimento de deixar
    if (this.state_drop == 1 && this.ypos <= 11) {
      this.state_drop = 2;
      this.picked_it = false;
    } else if (this.state_drop == 2 && this.ypos >= this.ypos_ini) {
      this.state_drop = 0;
      this.velocity_vert = 0;
    }

    if (this.state_drop == 1) {
      this.velocity_vert = -9 / 2;
    } else if (this.state_drop == 2) {
      this.velocity_vert = 9 / 2;
    }

    //limitar o movimento do passaro
    if (this.xpos > 90) this.xpos = 90;
    else if (this.xpos < -90) this.xpos = -90;

    if (this.zpos > 90) this.zpos = 90;
    else if (this.zpos < -90) this.zpos = -90;
  }

  display() {
    this.update(this.scene.t);

    this.scene.pushMatrix();

        //animação do passaro a flutuar
        this.scene.translate(this.xpos, this.ypos, this.zpos);
        this.scene.rotate(this.tetayy, 0, 1, 0);
        this.scene.translate(0,
                            5 + Math.sin(this.scene.t) * 0.5 * this.scene.speedFactor,
                            0);

        //galho no bico
        if (this.picked_it) {
          this.scene.pushMatrix();
            this.scene.translate(-1, 1.3, 0.7);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.scale(0.3, 1, 0.3);
            this.scene.branch.apply();
            this.galho.display();
          this.scene.popMatrix();
        }

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

            this.scene.rotate(-Math.PI / 8, 1, 0, 0);
            this.scene.rotate(Math.sin(this.scene.t + Math.PI / 6) * 0.25 * this.scene.speedFactor,
                              1,0,0);
            i = -1;
            x = -1;
            while (i <= 1) {
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
              i += 2;
              x++;
            }

        this.scene.popMatrix();
        //---------------------------------

    this.scene.popMatrix();
  }
}

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
    this.state = 0;
    this.pickit = false;

    this.xposi = 0;
    this.zposi = 0;
    this.yposi = 0;

    this.cube = new MyUnitCubeQuad(this.scene);
    this.pyramid = new MyPyramid(this.scene, 4, 1);
    this.triangle = new MyTriangle(this.scene);
    this.quad = new MyQuad(this.scene);
    this.galho = new MyTreeBranch(this.scene);

    this.quad.initBuffers();
    this.cube.initBuffers();
    this.pyramid.initBuffers();
    this.triangle.initBuffers();

    this.bico = new CGFappearance(this.scene);
    this.bico.setAmbient(253 / 255, 196 / 255, 39 / 255, 1);
    this.bico.setDiffuse(253 / 255, 196 / 255, 39 / 255, 1);
    this.bico.setSpecular(253 / 255, 196 / 255, 39 / 255, 1);
    this.bico.setShininess(10.0);

    this.penas = new CGFappearance(this.scene);
    this.penas.setAmbient(51 / 255, 1, 1, 1);
    this.penas.setDiffuse(51 / 255, 1, 1, 1);
    this.penas.setSpecular(51 / 255, 1, 1, 1);
    this.penas.setShininess(10.0);

    this.penas_corpo = new CGFappearance(this.scene);
    this.penas_corpo.setAmbient(0.1, 0.1, 0.1, 1);
    this.penas_corpo.setDiffuse(0.9, 0.9, 0.9, 1);
    this.penas_corpo.setSpecular(0.1, 0.1, 0.1, 1);
    this.penas_corpo.setShininess(10.0);
    this.penas_corpo.loadTexture("images/penas.jpg");
    this.penas_corpo.setTextureWrap("REPEAT", "REPEAT");

    this.olhos = new CGFappearance(this.scene);
    this.olhos.setAmbient(64 / 255, 64 / 255, 64 / 255, 1);
    this.olhos.setDiffuse(64 / 255, 64 / 255, 64 / 255, 1);
    this.olhos.setSpecular(64 / 255, 64 / 255, 64 / 255, 1);
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
    if (this.state == 0) {
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

  pickup(v) {
    this.velocity = 0;
    if (this.state == 0) {
      this.state = 1;
    }

    if (v == true) {
      this.pickit = true;
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

    //movimento de descida
    if (this.state == 1 && this.ypos <= 0) {
      this.state = 2;
    } else if (this.state == 2 && this.ypos >= this.ypos_ini) {
      this.state = 0;
    }

    if (this.state == 1) {
      this.velocity_vert = -20 / 2;
    } else if (this.state == 2) {
      this.velocity_vert = 20 / 2;
    } else if (this.state == 0) {
      this.velocity_vert = 0;
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
    //mover passaro
    this.scene.translate(this.xpos, this.ypos, this.zpos);
    this.scene.rotate(this.tetayy, 0, 1, 0);
    this.scene.translate(
      0,
      5 + Math.sin(this.scene.t) * 0.5 * this.scene.speedFactor,
      0
    );

    if (this.pickit == true) {
      this.scene.pushMatrix();
      this.scene.translate(4, 5.2, 0);
      this.scene.rotate(-Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.5, 5, 0.5);
      this.scene.translate(0, -1, 0);
      this.scene.branch.apply();
      this.galho.display();
      this.scene.popMatrix();
    }
    //corpo
    this.scene.pushMatrix();
    this.scene.translate(0.7, 3, 0);
    this.scene.scale(3, 3, 3);
    //	this.penas_corpo.apply();
    this.penas.apply();
    this.cube.display();
    this.scene.popMatrix();

    //cabeça
    this.scene.pushMatrix();
    this.scene.translate(2.5, 6, 0);
    this.scene.scale(3, 3, 3);
    this.penas.apply();
    this.cube.display();
    this.scene.popMatrix();

    //bico
    this.scene.pushMatrix();
    this.scene.translate(4, 5.2, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.scale(0.7, 0.7, 0.7);
    this.bico.apply();
    this.pyramid.display();
    this.scene.popMatrix();

    //olhos
    this.scene.pushMatrix();
    this.scene.translate(3.2, 6.2, 1.5);
    this.scene.scale(0.7, 0.7, 0.7);
    this.olhos.apply();
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(3.2, 6.2, -1.5);
    this.scene.scale(0.7, 0.7, 0.7);
    this.olhos.apply();
    this.cube.display();
    this.scene.popMatrix();

    //cauda
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 2.8, 0);
    this.scene.rotate(-Math.PI, 0, 0, 1);
    this.scene.rotate(-Math.PI, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.penas.apply();
    this.triangle.display();
    this.scene.popMatrix();

    //asas

    this.scene.pushMatrix();

    this.scene.rotate(Math.PI / 8, 1, 0, 0);
    this.scene.translate(0, -0.8, -1);
    this.scene.rotate(
      -Math.sin(this.scene.t + Math.PI / 6) * 0.25 * this.scene.speedFactor,
      1,
      0,
      0
    );

    this.scene.pushMatrix();
    this.scene.translate(1, 4, 2);
    this.scene.rotate(-Math.PI / 1.7, 1, 0, 0);
    this.scene.scale(1.5, 3, 1);
    this.penas.apply();
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.25, 4.4, 3.4);
    this.scene.rotate(Math.PI / 1.5, 1, 0, 0);
    this.scene.scale(0.5, 0.6, 1);
    this.penas.apply();
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.rotate(-Math.PI / 8, 1, 0, 0);
    this.scene.translate(0, -0.8, 1);
    this.scene.rotate(
      Math.sin(this.scene.t + Math.PI / 6) * 0.25 * this.scene.speedFactor,
      1,
      0,
      0
    );

    this.scene.pushMatrix();
    this.scene.translate(1, 4, -2);
    this.scene.rotate(Math.PI / 1.7, 1, 0, 0);
    this.scene.scale(1.5, 3, 1);
    this.penas.apply();
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.25, 4.4, -3.4);
    this.scene.rotate(-Math.PI / 1.5, 1, 0, 0);
    this.scene.scale(0.5, 0.6, 1);
    this.penas.apply();
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}

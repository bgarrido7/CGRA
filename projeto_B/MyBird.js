/**
* MyPyramid
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cube = new MyUnitCubeQuad(this.scene);
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.triangle = new MyTriangle(this.scene);
        this.quad = new MyQuad(this.scene);

        this.quad.initBuffers();    
        this.cube.initBuffers();    
        this.pyramid.initBuffers();
        this.triangle.initBuffers();

		this.bico = new CGFappearance(this.scene);
        this.bico.setAmbient(253/255, 196/255, 39/255, 1);
        this.bico.setDiffuse(253/255, 196/255, 39/255, 1);
        this.bico.setSpecular(253/255, 196/255, 39/255, 1);
        this.bico.setShininess(10.0);

		this.penas = new CGFappearance(this.scene);
        this.penas.setAmbient(51/255, 1, 1, 1);
        this.penas.setDiffuse(51/255, 1, 1, 1);
        this.penas.setSpecular(51/255, 1, 1, 1);
        this.penas.setShininess(10.0);

        this.olhos = new CGFappearance(this.scene);
        this.olhos.setAmbient(64/255, 64/255, 64/255, 1);
        this.olhos.setDiffuse(64/255, 64/255, 64/255, 1);
        this.olhos.setSpecular(64/255, 64/255, 64/255, 1);
        this.olhos.setShininess(10.0);

    }

	display() {


       //corpo 
        this.scene.pushMatrix();
            this.scene.translate(0.7,3,0);
            this.scene.scale(3,3,3);
			this.penas.apply();
            this.cube.display();
        this.scene.popMatrix();


        //cabeça
        this.scene.pushMatrix();
            this.scene.translate(2.5,6,0);
            this.scene.scale(3,3,3);
            this.penas.apply();
            this.cube.display();
        this.scene.popMatrix();

       //bico
       this.scene.pushMatrix();
           this.scene.translate(4,5.2,0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.scene.scale(0.7,0.7,0.7);
            this.bico.apply();
            this.pyramid.display();
        this.scene.popMatrix();

        //olhos
        this.scene.pushMatrix();
            this.scene.translate(3.2,6.2,1.5);
            this.scene.scale(0.7,0.7,0.7);
            this.olhos.apply();
            this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(3.2,6.2,-1.5);
            this.scene.scale(0.7,0.7,0.7);
            this.olhos.apply();
            this.cube.display();
        this.scene.popMatrix();

        //cauda
        this.scene.pushMatrix();
            this.scene.translate(-0.5,2.8,0);
            this.scene.rotate(-Math.PI, 0, 0, 1);
            this.scene.rotate(-Math.PI, 1, 0, 0);
            this.scene.scale(0.5,0.5,0.5);
			this.penas.apply();
            this.triangle.display();
        this.scene.popMatrix();

       //asas 
        this.scene.pushMatrix();
            this.scene.translate(1, 4, 2);
            this.scene.rotate(-Math.PI/1.7, 1, 0, 0);
            this.scene.scale(1.5,3,1);
			this.penas.apply();
            this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0.25, 4.4, 3.4);
            this.scene.rotate(Math.PI/1.5, 1, 0, 0);
            this.scene.scale(0.5, 0.6, 1);
            this.penas.apply();
            this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
           this.scene.translate(1,4,-2);
            this.scene.rotate(Math.PI/1.7,1,0,0);
            this.scene.scale(1.5,3,1);
			this.penas.apply();
            this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0.25, 4.4, -3.4);
            this.scene.rotate(-Math.PI/1.5,1,0,0);
            this.scene.scale(0.5,0.6,1);
            this.penas.apply();
            this.triangle.display();
        this.scene.popMatrix();
    }

}



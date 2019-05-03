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

        this.cube.initBuffers();    
        this.pyramid.initBuffers();
        this.triangle.initBuffers();
		
		this.bico = new CGFappearance(this.scene);
        this.bico.setAmbient(1, 1, 0, 1);
        this.bico.setDiffuse(1, 1, 0, 1);
        this.bico.setSpecular(1, 1, 0, 1);
        this.bico.setShininess(10.0);

		
		this.penas = new CGFappearance(this.scene);
        this.penas.setAmbient(0, 0, 1, 1);
        this.penas.setDiffuse(0, 0, 1, 1);
        this.penas.setSpecular(0, 0, 1, 1);
        this.penas.setShininess(10.0);

        this.olhos = new CGFappearance(this.scene);
        this.olhos.setAmbient(0,0,0, 1);
        this.olhos.setDiffuse(0,0,0, 1);
        this.olhos.setSpecular(0,0,0, 1);
        this.olhos.setShininess(10.0);

    }
    
	display() {
            
        this.scene.pushMatrix();
			this.penas.apply();
            this.cube.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
            this.scene.translate(1,0,0);
			this.bico.apply();
            this.pyramid.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
            this.scene.translate(-1,0,0);
            this.olhos.apply();
            this.triangle.display();
        this.scene.popMatrix();
    }

}



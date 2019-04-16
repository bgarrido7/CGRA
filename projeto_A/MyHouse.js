/**
* MyPyramid
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene) {

        super(scene);
    
        this.Cube = new MyUnitCubeQuad(this.scene, [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10]);
		this.Roof = new MyPyramid(this.scene, 4, 1);
        this.Column = new MyPrism(this.scene, 8, 1, 1);
        
        this.Cube.initBuffers();    
        this.Roof.initBuffers();
        this.Column.initBuffers();

		this.Rooftex = new CGFappearance(this.scene);
        this.Rooftex.setAmbient(0.1, 0.1, 0.1, 1);
        this.Rooftex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Rooftex.setSpecular(0.1, 0.1, 0.1, 1);
        this.Rooftex.setShininess(10.0);
        this.Rooftex.loadTexture('images/roof.jpg');
        this.Rooftex.setTextureWrap('REPEAT', 'REPEAT');	

		this.Housetex = new CGFappearance(this.scene);
        this.Housetex.setAmbient(0.1, 0.1, 0.1, 1);
        this.Housetex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Housetex.setSpecular(0.1, 0.1, 0.1, 1);
        this.Housetex.setShininess(10.0);
        this.Housetex.loadTexture('images/house.jpg');
        this.Housetex.setTextureWrap('REPEAT', 'REPEAT');	

		this.Doortex = new CGFappearance(this.scene);
        this.Doortex.setAmbient(0, 0, 0, 1);
        this.Doortex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Doortex.setSpecular(0,0,0, 1);
        this.Doortex.setShininess(10.0);
        this.Doortex.loadTexture('images/door.png');
        this.Doortex.setTextureWrap('REPEAT', 'REPEAT');
		
		this.Garagetex = new CGFappearance(this.scene);
        this.Garagetex.setAmbient(0.1, 0.1, 0.1, 1);
        this.Garagetex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Garagetex.setSpecular(0,0,0, 1);
        this.Garagetex.setShininess(10.0);
        this.Garagetex.loadTexture('images/garage.jpg');
        this.Garagetex.setTextureWrap('REPEAT', 'REPEAT');
		
		this.Pilartex = new CGFappearance(this.scene);
        this.Pilartex.setAmbient(0.1, 0.1, 0.1, 1);
        this.Pilartex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Pilartex.setSpecular(0,0,0, 1);
        this.Pilartex.setShininess(10.0);
        this.Pilartex.loadTexture('images/pilar2.jpg');
        this.Pilartex.setTextureWrap('REPEAT', 'REPEAT');


    }
    
	display() {
         

		
        this.scene.pushMatrix();
			this.scene.translate(0,0.5,0);
            this.scene.scale(2.2,1,1.2);
            
            this.Housetex.apply();

            this.Cube.display();
        this.scene.popMatrix();
		
		
		this.scene.pushMatrix();
            this.scene.translate(0,0.9,0);
			this.scene.scale(2.4,1,1.4);
            this.scene.rotate(Math.PI/4, 0,1,0);
            this.Rooftex.apply();
			this.Roof.display();
        this.scene.popMatrix();
		
		
		//colunas
		this.scene.pushMatrix();
			this.Pilartex.apply();
            this.scene.translate(1.4,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
			
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(0.9,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(0.4,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-0.4,0,0.8);
			this.scene.scale(0.1,0.91,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-0.9,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(1.4,0,-0.8);
			this.scene.scale(0.1,0.9,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-1.4,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-1.4,0,-0.8);
			this.scene.scale(0.1,0.9,0.1);
			this.Pilartex.apply();
            this.Column.display();
        this.scene.popMatrix();
		// fim das colunas
		
       //garagem da casa
	   this.scene.pushMatrix();
			//2 vem do x final da casa (0.5*2.2) + o x inicial da garagem (0.5*1.8)

			this.scene.translate(-2.2,0.5*0.7,0);
			this.scene.scale(2.2,0.7,1.2);
        	this.Housetex.apply();
            this.Cube.display();
        this.scene.popMatrix();
		
		
		this.scene.pushMatrix();
            this.scene.translate(-2.25,0.7,0);
			this.scene.scale(1.6,0.5,1);
			this.scene.rotate(Math.PI/4, 0,1,0);
			this.Rooftex.apply();
            this.Roof.display();
        this.scene.popMatrix();
		//fim da garagem
		
		//porta
		this.scene.pushMatrix();
		this.scene.translate(0,0.5*0.8,0.61);
		this.scene.scale(0.5,0.8,0.05);
		this.Doortex.apply();
            this.Cube.display();
        this.scene.popMatrix();
		
		//porta da garagem
		this.scene.pushMatrix();
		this.scene.translate(-2.2,0.5*0.6,0.61);
		this.scene.scale(1.1,0.6,0.05);
		this.Garagetex.apply();
            this.Cube.display();
        this.scene.popMatrix();

    }

}



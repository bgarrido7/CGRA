/**
* MyTangram
* @constructor
* @param scene - Reference to MyScene object
*/

class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		

		this.diamond = new MyDiamond(this.scene, [
			0, 1/2,
			1/4, 3/4,
			1/2, 1/2,
			1/4, 1/4,

		]);
		this.triangle = new MyTriangle(this.scene, [
			1/2,1/2,
			1,1,
			1,0,
		]);
		this.paralel = new MyParalel(this.scene, [
			1/4,3/4,
			1/2,1,
			1,1,
			3/4,3/4,
		]);
		this.triRed = new MyTriangleRed(this.scene, [
			0,0,
			1/2,1/2,
			1,0,

		]);
		this.triSmall = new MyTriangleSmall(this.scene, [
			0,1/2,
			0,1,
			1/2,1,	
		]);

		this.triLight = new MyTriangleSmallLight(this.scene, [
			1/4,3/4,
			3/4,3/4,
			1/2,1/2,
		]);

		this.triDark = new MyTriangleSmallDark(this.scene, [
			0,0,
			0, 1/2,
			1/4,1/4,
		]);


		this.diamond.initBuffers();

		//pink
		this.triangle.initBuffers();

		this.paralel.initBuffers();

		//green
		this.triSmall.initBuffers();

		this.triRed.initBuffers();
		this.triLight.initBuffers();
		this.triDark.initBuffers();
 /*
		this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture('images/default.png');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');
*/
	}


	display() {


	 var trans1 = [1  , 0.0, 0.0 , 0,
				0.0, 1  , 0.0 , 0 ,
				0.0, 0.0,   1 , 0 ,
				1, 1, 0, 1.0];

 	var trans2 = [1  , 0.0, 0.0 , 0,
				0.0, 1  , 0.0 , 0 ,
				0.0, 0.0,   1 , 0 ,
				0, 2, 0, 1.0];

	var trans3 = [1  , 0.0, 0.0 , 0,
				0.0, 1  , 0.0 , 0 ,
				0.0, 0.0,   1 , 0 ,
				0  ,  2.75 ,   0 , 1.0];

   var trans4 = [1  , 0.0, 0.0 , 0,
			   0.0, 1  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   0.5, -0.5, 0, 1.0];

   var trans5 = [1  , 0.0, 0.0 , 0,
				   0.0, 1  , 0.0 , 0 ,
				   0.0, 0.0,   1 , 0 ,
				   -0.53  ,  0.53 ,   0 , 1.0];

   var trans6 = [1  , 0.0, 0.0 , 0,
			   0.0, 1  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   1.5, -0.5, 0, 1.0];


   var trans7 = [1  , 0.0, 0.0 , 0,
			   0.0, 1  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   -2.05, -1, 0, 1.0];

 	var sca3  = [0.75  , 0.0, 0.0 , 0,
			   0.0, 0.75  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   0, 0, 0, 1.0];

   var sca5  = [0.75  , 0.0, 0.0 , 0,
				   0.0, 0.75  , 0.0 , 0 ,
				   0.0, 0.0,   1 , 0 ,
				   0, 0, 0, 1.0];

   var sca6  = [0.75  , 0.0, 0.0 , 0,
			   0.0, 0.75  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   0, 0, 0, 1.0];
   
   var rot1 = [Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0.0,0 ,
			   - Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];
			   
   var rot2 = [Math.cos(-Math.PI/2), Math.sin(-Math.PI/2), 0.0,0 ,
			   - Math.sin(-Math.PI/2), Math.cos(-Math.PI/2), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];

   var rot5 = [Math.cos(-Math.PI/2-Math.PI/4), Math.sin(-Math.PI/2-Math.PI/4), 0.0,0 ,
			   - Math.sin(-Math.PI/2-Math.PI/4), Math.cos(-Math.PI/2-Math.PI/4), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];

   var rot6 = [Math.cos(-Math.PI), Math.sin(-Math.PI), 0.0,0 ,
			   - Math.sin(-Math.PI), Math.cos(-Math.PI), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];

   var rot7 = [Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0.0,0 ,
			   - Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];     


			   

   /******** DIAMOND ********/
	this.scene.pushMatrix();
		this.scene.multMatrix(trans3);  
		this.scene.multMatrix(sca3); 
		//this.scene.materials[4].apply();
		
		//this.scene.quadMaterial.apply();
		this.diamond.display();
	this.scene.popMatrix();


/******** TRIANGLE RED ********/
	this.scene.pushMatrix();
		this.scene.multMatrix(rot1);
		this.scene.multMatrix(trans1);
		//this.scene.materials[7].apply();
		this.triRed.display();
	this.scene.popMatrix();
	
/******** TRIANGLE PINK ********/
	this.scene.pushMatrix();
		this.scene.multMatrix(trans2);
		this.scene.multMatrix(rot2);
		this.scene.multMatrix(trans1);
		//this.scene.materials[9].apply();
		this.triangle.display();
	this.scene.popMatrix();

/*********PARALEL*********/
	this.scene.pushMatrix();
		this.scene.multMatrix(trans5);
		this.scene.multMatrix(sca5);
		this.scene.multMatrix(rot5);
		//this.scene.materials[6].apply();
		this.paralel.display();
	this.scene.popMatrix();

	/*********TRINGLE GREEN*********/
	this.scene.pushMatrix();
		this.scene.multMatrix(trans4);
		//this.scene.materials[10].apply();
		this.triSmall.display();
	this.scene.popMatrix();
	
	/*********TRINGLE LIGHT BLUE*********/
	this.scene.pushMatrix();
		this.scene.multMatrix(trans6);
		this.scene.multMatrix(sca6);
		this.scene.multMatrix(rot6);
		//this.scene.materials[8].apply();
		this.triLight.display();
	this.scene.popMatrix();

	/*********TRINGLE DARK*********/
	this.scene.pushMatrix();
		this.scene.multMatrix(trans7);
		this.scene.multMatrix(sca6);
		this.scene.multMatrix(rot7);
		//this.scene.materials[11].apply();
		this.triDark.display();	
	this.scene.popMatrix();


	}
}
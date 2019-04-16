/**
 * MyUnitCubeQuad
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.coords = coords;
        this.quad = new MyQuad(this.scene, this.coords);
        this.quad.initBuffers();

        this.unitCubeMaterial = new CGFappearance(this.scene);
        this.unitCubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.unitCubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.unitCubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.unitCubeMaterial.setShininess(10.0);
    

    }
    
    display() {

       // this.unitCubeMaterial.setTexture(this.MineSide);
      //  this.unitCubeMaterial.apply();
     //   this.scene.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    
        //face da frente
        this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);  
		   // this.unitCubeMaterial.apply();
			this.quad.display();
	    this.scene.popMatrix();

       
   
        //face de tras
        this.scene.pushMatrix();
			this.scene.rotate(-Math.PI,0,1,0);
			this.scene.translate(0,0,0.5);  
			this.quad.display();
        this.scene.popMatrix();
       
        //face da esquerda
        this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.scene.translate(0,0,0.5);  
			this.quad.display();
        this.scene.popMatrix();

        //face da direita
        this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(0,0,0.5);  
			this.quad.display();
	    this.scene.popMatrix();


		 //face de baixo
		 this.scene.pushMatrix();
			 this.scene.rotate((Math.PI/2),1,0,0);
			 this.scene.translate(0,0,0.5);  
			 //this.unitCubeMaterial.setTexture(this.MineBot);
			 //this.unitCubeMaterial.apply();
			 this.quad.display();
		 this.scene.popMatrix();

		 //face de cima
		 this.scene.pushMatrix();
			 this.scene.rotate(-Math.PI/2,1,0,0);
			 this.scene.translate(0,0,0.5);  
			 //this.unitCubeMaterial.setTexture(this.MineTop);
			 //this.unitCubeMaterial.apply();
			 this.quad.display();
		 this.scene.popMatrix();
        }

}

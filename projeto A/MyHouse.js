/**
* MyPyramid
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene) {

        super(scene);
        
       

       
        this.Cube = new MyUnitCubeQuad(this.scene, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0);
		this.Roof = new MyPyramid(this.scene, 4, 1);
		this.Column = new MyPrism(this.scene, 8, 1, 1); 

    }
    
	display() {
         

		//criacao da fila de arvores, 6 nao perfeitamente alinhadas e com variedade de dimensoes
        this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.scale(2.2,1,1.2);
            this.Cube.display();
        this.scene.popMatrix();
		
		
		this.scene.pushMatrix();
            this.scene.translate(0,0.9,0);
			this.scene.scale(2.4,1,1.4);
			this.scene.rotate(Math.PI/4, 0,1,0);
            this.Roof.display();
        this.scene.popMatrix();
		
		
		//colunas
		this.scene.pushMatrix();
            this.scene.translate(1.4,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(0.9,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(0.4,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-0.4,0,0.8);
			this.scene.scale(0.1,0.91,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-0.9,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(1.4,0,-0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-1.4,0,0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-1.4,0,-0.8);
			this.scene.scale(0.1,0.9,0.1);
            this.Column.display();
        this.scene.popMatrix();
		// fim das colunas
		
       //garagem da casa
	   this.scene.pushMatrix();
	   //2 vem do x final da casa (0.5*2.2) + o x inicial da garagem (0.5*1.8)
	   
		this.scene.translate(-2.1,0.5*0.7,0);
		this.scene.scale(2.2,0.7,1.2);
            this.Cube.display();
        this.scene.popMatrix();
		
		
		this.scene.pushMatrix();
            this.scene.translate(-2.25,0.7,0);
			this.scene.scale(1.6,0.5,1);
			this.scene.rotate(Math.PI/4, 0,1,0);
            this.Roof.display();
        this.scene.popMatrix();
		//fim da garagem
		
		//porta
		this.scene.pushMatrix();
		this.scene.translate(0,0.5*0.8,0.61);
		this.scene.scale(0.5,0.8,0.05);
            this.Cube.display();
        this.scene.popMatrix();
		
		//porta da garagem
		this.scene.pushMatrix();
		this.scene.translate(-2.2,0.5*0.6,0.61);
		this.scene.scale(1.1,0.6,0.05);
            this.Cube.display();
        this.scene.popMatrix();

    }

}



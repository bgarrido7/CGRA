/**
* MyPyramid
* @constructor
*/
class MyTreeRowPatch extends CGFobject {
    constructor(scene) {

        super(scene);
        
    
       //scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture
        this.Tree = new MyTree(this.scene, 1.5,0.4,1.5,1,1,1);

    }
    
	display() {
         

		//criacao da fila de arvores, 6 nao perfeitamente alinhadas e com variedade de dimensoes
        this.scene.pushMatrix();
            this.scene.translate(0,0,0.1);
			this.scene.scale(1.1,1.3,1.1);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(2.5,0,0.);
			this.scene.scale(0.7,1.3,0.7);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(5,0,-0.1);
			this.scene.scale(0.7,0.6,0.7);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-2.5,0,-0.2);
			this.scene.scale(0.8,0.9,0.8);
            this.Tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-5,0,0);			
			this.scene.scale(1.2,1,1.2);
            this.Tree.display();
        this.scene.popMatrix();
       

    }

}



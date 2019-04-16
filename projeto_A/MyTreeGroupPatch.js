/**
* MyPyramid
* @constructor
*/
class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {

        super(scene);

       //scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture
        this.Tree = new MyTree(this.scene, 1.5,0.4,1.5,1,1,1);
    }
    
	display() {
         

		//criacao do grupo de arvores, 9 arvores numa matrix 3x3 nao perfeitamente alinhadas e com variedade de dimensoes
        this.scene.pushMatrix();
            this.scene.translate(0,0,0);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(2.5,0,0);
			this.scene.scale(1.3,1.1,1.3);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-2.5,0,0);
			this.scene.scale(1.2,1.2,1.2);
            this.Tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,2.5);
			this.scene.scale(0.7,1,0.7);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(2.5,0,2.5);
			this.scene.scale(1,1,1);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-2.5,0,2.5);
			this.scene.scale(0.7,1.3,0.7);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(-2.5,0,-2.5);
			this.scene.scale(1.2,1,1.2);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(0,0,-2.5);
			this.scene.scale(0.9,1.1,0.9);
            this.Tree.display();
        this.scene.popMatrix();
		
		this.scene.pushMatrix();
            this.scene.translate(2.5,0,-2.5);
			this.scene.scale(0.6,0.6,0.6);
            this.Tree.display();
        this.scene.popMatrix();
       

    }

}



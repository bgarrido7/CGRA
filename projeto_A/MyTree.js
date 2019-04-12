/**
* MyPyramid
* @constructor
*/
class MyTree extends CGFobject {
    constructor(scene, 
            trunkHeight, 
            trunkRadius, 
            treeTopHeight, 
            treeTopRadius, 
            trunkTexture,
            treeTopTexture) {

        super(scene);
        
       

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.trunkTexture = trunkTexture;
        this.treeTopTexture = treeTopTexture;

        this.Cilinder = new MyCilinder(this.scene, 8, this.trunkHeight, this.trunkRadius);
        this.Cone = new MyCone(this.scene, 8, this.treeTopHeight, this.treeTopRadius);

        this.Cilinder.initBuffers();    
		this.Cone.initBuffers();
    }
    
	display() {
            
        this.scene.pushMatrix();
            this.scene.translate(0,(this.trunkHeight-0.3),0);
            this.Cone.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
            this.Cilinder.display();
        this.scene.popMatrix();

    }

}



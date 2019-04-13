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
		
		this.log = new CGFappearance(this.scene);
        this.log.setAmbient(0.1, 0.1, 0.1, 1);
        this.log.setDiffuse(0.9, 0.9, 0.9, 1);
        this.log.setSpecular(0.1, 0.1, 0.1, 1);
        this.log.setShininess(10.0);
        this.log.loadTexture('images/Oak.jpg');
        this.log.setTextureWrap('REPEAT', 'REPEAT');
		
		this.Leaves = new CGFappearance(this.scene);
        this.Leaves.setAmbient(0.1, 0.1, 0.1, 1);
        this.Leaves.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Leaves.setSpecular(0.1, 0.1, 0.1, 1);
        this.Leaves.setShininess(10.0);
        this.Leaves.loadTexture('images/leaves.jpg');
        this.Leaves.setTextureWrap('REPEAT', 'REPEAT');
		
    }
    
	display() {
            
        this.scene.pushMatrix();
            this.scene.translate(0,(this.trunkHeight-0.3),0);
			this.Leaves.apply();
            this.Cone.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
			this.log.apply();
            this.Cilinder.display();
        this.scene.popMatrix();

    }

}



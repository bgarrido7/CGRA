class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
        this.quad = new MyQuad(this.scene);
    }
    initBuffers() {
        this.vertices = [];
        


        this.initGLBuffers();
	}
}
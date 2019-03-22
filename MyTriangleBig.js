class MyTriangleBig extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();

		if (coords != undefined)
			this.updateTexCoords(coords);
	
	}
	initBuffers() {
		this.vertices = [
			-2, 0, 0,	//0
			2, 0, 0,	//1
			0, 2, 0,	//2
			
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [];
        for (var i = 0; i <= 2; i++) {
            this.normals.push(0, 0, 1);
		}

		this.initGLBuffers();
	}
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
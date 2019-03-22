class MyParalel extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();

		if (coords != undefined)
			this.updateTexCoords(coords);
	
	}
	initBuffers() {
		this.vertices = [
			0, 1, 0,	//0
			1, 0, 0,	//1
			1, 1, 0,	//2
			
			2, 0, 0,	//3
			2, 1, 0,	//4
			3, 0, 0,	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 4,
			1, 3, 2,
			3, 5, 4,
		];

		
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [];
        for (var i = 0; i <= 5; i++) {
            this.normals.push(0, 0, 1);
		}
		
		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
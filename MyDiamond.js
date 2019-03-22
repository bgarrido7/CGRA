/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();

		if (coords != undefined)
			this.updateTexCoords(coords);
	
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

		];
		this.initGLBuffers();
		
		
	}
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}


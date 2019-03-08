class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
			0.5, -0.5, -0.5,	//1
			0.5, -0.5, 0.5,		//2
			-0.5, -0.5, 0.5,	//3
			-0.5, 0.5, 0.5,	//4
			0.5, 0.5, 0.5,	//5
			0.5, 0.5, -0.5,	//6
			-0.5, 0.5, -0.5,	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1,2,3,
			1,3,0,  //1
			3,2,5,
			3,5,4,  //2
			2,1,6,
			2,6,5,  //3
			1,0,6,
			6,0,7,  //4
			0,3,4,
			0,4,7,  //5
			4,5,6,
			4,6,7,  //6
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

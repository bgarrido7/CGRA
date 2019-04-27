class MyLeaf extends CGFobject {
	constructor(scene/*, coords*/) {
		super(scene);
		this.initBuffers();
/*
		if (coords != undefined)
			this.updateTexCoords(coords);
*/
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0,	//2
		];

		this.indices = [
			0, 2, 1,
			0, 1, 2,			
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,	
		];	
		//a face de tras nao tem luz 
		//pq nao sei pôr as normais para esse lado
		//(os pontos já se usam 1x nas normais para a face da frente) 
		
		
		this.initGLBuffers();
	}
/*	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}*/
}
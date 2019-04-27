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

		this.normals = [];
        for (var i = 0; i <= 2; i++) {
			this.normals.push(0, 0, 1);
			//nao sei fazer as normais para o lado de tras
			//pq ja se usam os pontos 1x 
		}
		
		this.initGLBuffers();
	}
/*	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}*/
}
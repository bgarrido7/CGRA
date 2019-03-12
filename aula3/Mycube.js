class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
			-0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2

			0.5, -0.5, -0.5,	//3
			0.5, -0.5, -0.5,	//4
			0.5, -0.5, -0.5,	//5

			0.5, -0.5, 0.5,		//6
			0.5, -0.5, 0.5,		//7
			0.5, -0.5, 0.5,		//8

			-0.5, -0.5, 0.5,	//9
			-0.5, -0.5, 0.5,	//10
			-0.5, -0.5, 0.5,	//11

			-0.5, 0.5, 0.5,		//12
			-0.5, 0.5, 0.5,		//13
			-0.5, 0.5, 0.5,		//14

			0.5, 0.5, 0.5,		//15
			0.5, 0.5, 0.5,		//16
			0.5, 0.5, 0.5,		//17

			0.5, 0.5, -0.5,		//18
			0.5, 0.5, -0.5,		//19
			0.5, 0.5, -0.5,		//20

			-0.5, 0.5, -0.5,	//21
			-0.5, 0.5, -0.5,	//22
			-0.5, 0.5, -0.5,	//23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1*3,2*3,3*3,
			1*3,3*3,0,  //1
			3*3,2*3,5*3,
			3*3,5*3,4*3,  //2
			2*3,1*3,6*3,
			2*3,6*3,5*3,  //3
			1*3,0,6*3,
			6*3,0,7*3,  //4
			0,3*3,4*3,
			0,4*3,7*3,  //5
			4*3,5*3,6*3,
			4*3,6*3,7*3,  //6
		];
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [
			
			//vertice 0
			0,-1,0, 
			-1,0,0,
			0,0,-1,

			//3
			0,-1,0,
			1,0,0,
			0,0,-1,

			//6
			0,-1,0,
			1,0,0,
			0,0,1,

			//9
			0,-1,0,
			-1,0,0,
			0,0,1,
			
			//12
			0,1,0,
			-1,0,0,
			0,0,1,
			
			//15
			0,1,0,
			1,0,0,
			0,0,1,
			
			//18
			0,1,0,
			1,0,0,
			0,0,-1,
			
			//21
			0,1,0,
			-1,0,0,
			0,0,-1,
		]

/*

	
			//face de baixo
			for(var i = 0 ; i <= 9 ; i+=3){
				this.normals.push(0, -1, 0);
			}
			//face de cima
			for(var i = 12 ; i <= 21 ; i+=3){
				this.normals.push(0, 1, 0);
			}

			//face direita
			for(var i = 4 ; i <= 7 ; i+=3){
				this.normals.push(1, 0, 0);
			}
			for(var i = 16 ; i <= 19 ; i+=3){
				this.normals.push(1, 0, 0);
			}

			//face esquerda
			for(var i = 1 ; i <= 10 ; i+=9){
				this.normals.push(-1, 0, 0);
			}
			for(var i = 13 ; i <= 22 ; i+=9){
				this.normals.push(-1, 0, 0);
			}

			//face tras
			for(var i = 2 ; i <= 5 ; i+=3){
				this.normals.push(0, 0, -1);
			}
			for(var i = 20 ; i <= 23 ; i+=3){
				this.normals.push(0, 0, -1);
			}

			//face frente
			for(var i = 8 ; i <= 11 ; i+=3){
				this.normals.push(0, 0, 1);
			}
			for(var i = 14 ; i <= 17 ; i+=3){
				this.normals.push(0, 0, 1);
			}
*/

			this.initGLBuffers();
	}
}

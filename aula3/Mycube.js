class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//face tras
			-0.5, -0.5, -0.5,	//0    0
			0.5, -0.5, -0.5, 	//3		1
			0.5, 0.5, -0.5,		//18	2
			-0.5, 0.5, -0.5, 	//21	3
			
			//face baixo
			-0.5, -0.5, -0.5,	//0		4
			0.5, -0.5, -0.5,	//3		5
			0.5, -0.5, 0.5,		//6		6
			-0.5, -0.5, 0.5,	//9		7

			//face direita
			0.5, -0.5, -0.5,	//3		8
			0.5, -0.5, 0.5,		//6		9
			0.5, 0.5, 0.5,		//15	10
			0.5, 0.5, -0.5,		//18	11

			//face esquerda
			-0.5, -0.5, -0.5,	//0		12
			-0.5, -0.5, 0.5,	//9		13
			-0.5, 0.5, 0.5,		//12	14
			-0.5, 0.5, -0.5,	//21	15

			//face cima
			-0.5, 0.5, 0.5,		//12	16
			0.5, 0.5, 0.5,		//15	17
			0.5, 0.5, -0.5,		//18	18
			-0.5, 0.5, -0.5,	//21	19
			
			//face frente
			0.5, -0.5, 0.5,		//6		20
			-0.5, -0.5, 0.5,	//9		21
			-0.5, 0.5, 0.5,		//12	22
			0.5, 0.5, 0.5,		//15	23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
		//face tras
		1, 0, 2,
		0, 3, 2,

		//face baixo
		6,7,4,
		5,6,4,

		//face direita
		8,11,10,
		9,8,10,

		//face esquerda
		13,14,15,
		13,15,12,


		//face cima
		17,18,19,
		16,17,19,



		//face frente
		21,20,23,
		21,23,22,


			/*
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
			4*3,6*3,7*3,  //6*/
		];

		//face de tras
		



		
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [
			
			//face tras
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			//face baixo
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			//face direita
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			//face esquerda
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			//face cima
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			//face frente
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
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

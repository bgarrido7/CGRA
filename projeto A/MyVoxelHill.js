/**
* MyPyramid
* @constructor
*/
class MyVoxelHill extends CGFobject {
    constructor(scene, altura) {

        super(scene);
        this.altura = altura;
       
        this.Cube = new MyUnitCubeQuad(this.scene, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0);

    }
    
	display() {
            for(var i=0; i<this.altura; i++){
                //cubo de cima
                this.scene.pushMatrix();
                    this.scene.translate(0,this.altura-(i+1),0);
                    this.scene.translate(0,0.5,0);
                    this.Cube.display();
                this.scene.popMatrix();

                
        //cubos de baixo
                for(var l=0; l<(2*(i)+1); l++){
                    for(var k=0; k<(2*(i)+1); k++){
                        this.scene.pushMatrix();
                    
                            this.scene.translate(k-i,this.altura-(i+1),l-i);

                            this.scene.translate(0,0.5,0);
                            this.Cube.display();
                        this.scene.popMatrix();

                    }
                }
       
            }
    }

}



/**
* MyPyramid
* @constructor
*/
class MyFireplace extends CGFobject {
    constructor(scene) {

        super(scene);
        
        this.cilinder = new MyCilinder(this.scene, 10, 2, 0.15);
        this.pyramid = new MyPyramid(this.scene, 10, 5);

        this.pyramid.initBuffers();
        this.cilinder.initBuffers();

        this.fire = new CGFappearance(this.scene);
        this.fire.setAmbient(1, 1, 1, 1);
        this.fire.setDiffuse(0, 0, 0, 1);
        this.fire.setSpecular(0, 0, 0, 1);
        this.fire.setShininess(10.0);
        this.fire.loadTexture('images/fire.jpg');
        this.fire.setTextureWrap('REPEAT', 'REPEAT');

		this.log = new CGFappearance(this.scene);
        this.log.setAmbient(0.1, 0.1, 0.1, 1);
        this.log.setDiffuse(0.9, 0.9, 0.9, 1);
        this.log.setSpecular(0.1, 0.1, 0.1, 1);
        this.log.setShininess(10.0);
        this.log.loadTexture('images/Oak.jpg');
        this.log.setTextureWrap('REPEAT', 'REPEAT');

   //      this.pyramid = new CGFtexture(this.scene, 'images/fire.png');

                              
        // this.logMaterial = new CGFtexture(this.scene, 'images/Oak.jpg');

    }
    
	display() {

     //   this.fire.setTexture(this.pyramid);
       // this.log.setTexture(this.logMaterial);
       
    //   this.scene.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    
    
    for(var i=0;i<20;i++){
        this.scene.pushMatrix();
            this.scene.scale(1,0.5,0.5);
            this.scene.rotate(Math.PI/2,0,0,1);
            this.scene.rotate(Math.PI/2+i,1,0,0);
			//this.log.apply();
            this.cilinder.display();
        this.scene.popMatrix();
    }
		
        
    for(var i=-1;i<1;i+=0.1){
            this.scene.pushMatrix();
                this.scene.translate(i,0,0);
          //      this.scene.translate(0,0,j);
                this.scene.scale(0.5,1,0.5);
                this.fire.apply();
                this.pyramid.display();
            this.scene.popMatrix();
        
    }
    for(var i=-0.5;i<0.5;i+=0.1){
        this.scene.pushMatrix();
            this.scene.translate(i,0,0.3);
      //      this.scene.translate(0,0,j);
            this.scene.scale(0.5,1,0.5);
            this.fire.apply();
            this.pyramid.display();
        this.scene.popMatrix();
    
}
for(var i=-0.5;i<0.5;i+=0.1){
    this.scene.pushMatrix();
        this.scene.translate(i,0,-0.3);
  //      this.scene.translate(0,0,j);
        this.scene.scale(0.5,1,0.5);
        this.fire.apply();
        this.pyramid.display();
    this.scene.popMatrix();

}
    }

}



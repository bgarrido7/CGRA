/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.diamond = new MyDiamond(this);
		this.triangle = new MyTriangle(this);
		this.paralel = new MyParalel(this);
		this.triBig = new MyTriangleBig(this);
		this.triSmall = new MyTriangleSmall(this);
		this.tangram = new MyTangram(this);
		this.Cube = new MyCube(this);


        //Objects connected to MyInterface
        this.displayAxis = false;
        this.scaleFactor = 1;
		this.displayTriangle = false;
		this.displayDiamond = false;
		this.displayParalel = false;
		this.displayTriBig = false;
		this.displayTriSmall = false;
		this.displaytangram=false;
		this.displayCube = true;
		
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];
        this.multMatrix(sca);

		var deg;
		var DEGTORAD = Math.PI/180;
		var rad;
		var tx;
		var ty;
		var tz;
		rad = deg*DEGTORAD;
		
		//matriz translaçao
		var trans3 = [1  , 0.0, 0.0 , 0,
                     0.0, 1  , 0.0 , 0 ,
                     0.0, 0.0,   1 , 0 ,
                     0  ,  3 ,   0 , 1.0];
	
		var trans1 = [1  , 0.0, 0.0 , 0,
                     0.0, 1  , 0.0 , 0 ,
                     0.0, 0.0,   1 , 0 ,
                     1, 1, 0, 1.0];
					 
		var trans2 = [1  , 0.0, 0.0 , 0,
                     0.0, 1  , 0.0 , 0 ,
                     0.0, 0.0,   1 , 0 ,
                     0, 2, 0, 1.0];
		
		var rot1 = [Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0.0,0 ,
                    - Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0.0,0 ,
                    0.0, 0.0, 1, 0,
                    0,0,0, 1.0];
					
		var rot2 = [Math.cos(-Math.PI/2), Math.sin(-Math.PI/2), 0.0,0 ,
                    - Math.sin(-Math.PI/2), Math.cos(-Math.PI/2), 0.0,0 ,
                    0.0, 0.0, 1, 0,
                    0,0,0, 1.0];

		var rot5 = [Math.cos(-90*Math.PI/180), Math.sin(-90*Math.PI/180), 0.0,0 ,
                    - Math.sin(-90*Math.PI/180), Math.cos(-90*Math.PI/180), 0.0,0 ,
                    0.0, 0.0, 1, 0,
                    0,0,0, 1.0];

		
		
		//this.translate(0,3,0);
		


        // ---- BEGIN Primitive drawing section
		
		if(this.displayDiamond){
			this.pushMatrix();
			
			this.multMatrix(trans3);  //multiplicar a matriz translaçao pela diamante
			this.diamond.display();
			
			this.popMatrix();
		}
	
		if(this.displayTriangle){
			this.pushMatrix();
			
			this.multMatrix(rot1);
			this.multMatrix(trans1);
			this.triangle.display();
			
			this.popMatrix();
			
			/********TRIANGLE 2********/
			this.pushMatrix();
			
			this.multMatrix(trans2);
			this.multMatrix(rot2);
			this.multMatrix(trans1);
			this.triangle.display();
			
			this.popMatrix();
			
		}
		
		if(this.displayParalel){
			this.pushMatrix();
			
			this.multMatrix(rot5);
			this.paralel.display();
			
			this.popMatrix();
		}
		
		if(this.displayTriSmall)
			this.triSmall.display();
		
		if(this.displayTriBig)
			this.triBig.display();
		
		if(this.displayCube)
			this.Cube.display();
		
	//	if(this.displaytangram)
	//	this.tangram.display();

        // ---- END Primitive drawing section
    }
}
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
				this.initMaterials();
				
				this.wireframe = false;
				this.selectedExampleShader = 0;
				this.showShaderCode = false;
				//Background color
				this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

				this.gl.clearDepth(100.0);
				this.gl.enable(this.gl.DEPTH_TEST);
				this.gl.enable(this.gl.CULL_FACE);
				this.gl.depthFunc(this.gl.LEQUAL);
				this.enableTextures(true);
				this.setUpdatePeriod(50);

				//Initialize scene objects
				this.Cube = new MyCubeMap(this);
				this.axis = new CGFaxis(this);
				this.plane = new Plane(this, 32);


				this.shadersDiv = document.getElementById("shaders");
				this.vShaderDiv = document.getElementById("vshader");
				this.fShaderDiv = document.getElementById("fshader");

				this.house = new MyHouse(this);
				this.bird = new MyBird(this);
				this.terrain = new MyTerrain(this);
				
				
				this.shadersList = {
					'Terrain':0, 
					
				};
				
				this.appearance = new CGFappearance(this);
				this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
				this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
				this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
				this.appearance.setShininess(120);


				
    }
	
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
	
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    initMaterials(){
        this.sky = new CGFappearance(this);
        this.sky.setAmbient(1, 1, 1, 1);
        this.sky.setDiffuse(0, 0, 0, 1);
        this.sky.setSpecular(0, 0, 0, 1);
		this.sky.setShininess(10.0);
		this.sky.loadTexture('skybox/sky2.jpg');
        this.sky.setTextureWrap('REPEAT', 'REPEAT');

		
    }
	// updates the selected object's wireframe mode
	onWireframeChanged(v) {
		if (v)
			this.terrain.plane.setLineMode();
		else
			this.terrain.plane.setFillMode();

	}
	
	update(t) {
		
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
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        
	//	this.terrain.display();

        this.pushMatrix();
			this.sky.apply();
			this.scale(100,100,100);
			this.Cube.display();
        this.popMatrix();

        this.bird.display();
  //      this.house.display();
        // ---- END Primitive drawing section
		
		
    }
}
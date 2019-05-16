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
				this.showShaderCode = true;	
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
				
				
				//Initialize trees
				this.axiom =  "X"; //
				this.ruleF =  "FF"; //
				this.ruleX = "F[-X][X]F[-X]+FX";
				this.angle = 30.0;
				this.iterations = 5;
				this.scaleFactor = .5;
				
				this.leafTest = new MyLeaf(this);
				this.branchTest = new MyBranch(this);
				this.lPlant = new MyLSPlant(this);
				
				
				
				

				this.doGenerate();

				this.shadersDiv = document.getElementById("shaders");
				this.vShaderDiv = document.getElementById("vshader");
				this.fShaderDiv = document.getElementById("fshader");

				this.house = new MyHouse(this);
				this.bird = new MyBird(this);
				this.terrain = new MyTerrain(this);        

				this.nest = new MyPrism(this, 10, 1, 1);
				//this.nest.initBuffers();


			
				
					
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
		
		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);


		this.bird_nest = new CGFappearance(this);
		this.bird_nest.setAmbient(0.1, 0.1, 0.1, 1);
		this.bird_nest.setDiffuse(0.9, 0.9, 0.9, 1);
		this.bird_nest.setSpecular(0.1, 0.1, 0.1, 1);
		this.bird_nest.setShininess(10.0);
		this.bird_nest.loadTexture('images/birdNest.jpg');
		this.bird_nest.setTextureWrap('REPEAT', 'REPEAT');

		this.leaf = new CGFappearance(this);
        this.leaf.setAmbient(0.0, 1, 0.0, 0.1);
        this.leaf.setDiffuse(0, 1, 0, 0.1);
        this.leaf.setSpecular(0, 1, 0, 1.0);
        this.leaf.setShininess(10.0);

        this.branch = new CGFappearance(this);
        this.branch.setAmbient(153/255, 76/255, 0, 1.0);
        this.branch.setDiffuse(153/255, 76/255, 0, 1.0);
        this.branch.setSpecular(153/255, 76/255, 0, 1.0);
        this.branch.setShininess(10.0);
		
		
    }
	
	doGenerate() {
					this.lPlant.generate(
						this.axiom,
						{
							"F": [ "FF" ],
							"X": [ " F[-X][X]F[-X]+X", 
									"F[-X][x]+X",
									"F[+X]-X", 
									"F[/X][X]F[\\X]+X",
									"F[\\X][X]/X", 
									"F[/X]\\X", 
									"F[^X][X]F[&X]^X", 
									"F[^X]&X", 
									"F[&X]^X" 
									]
						},
						
						this.angle,
						this.iterations,
						this.scaleFactor
					);
				}
	
	// updates the selected object's wireframe mode
	onWireframeChanged(v) {
		if (v)
			this.terrain.plane.setLineMode();
		else
			this.terrain.plane.setFillMode();

	}
	
	update(t) {
		this.checkKeys();
	}
		//dá erro num ; nao sei pq

		/*------------para controlar animação------*/
	checkKeys(){
		var text="Keys pressed: ";
		var keysPressed=false;
		
		// Check for key codes e.g. in ​https://keycode.info/
		if (this.gui.isKeyPressed("KeyW")) {
			text+=" W ";
			keysPressed=true;
		}
		
		if (this.gui.isKeyPressed("KeyS")){
			text+=" S ";
			keysPressed=true;
		}
		
		if (keysPressed)
			console.log(text);
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

		for(var i = 0; i < 3; i++){
		
			
		this.pushMatrix();
			
			this.translate(i,0,i);
			this.lPlant.display();
		this.popMatrix();
		
		}
		
        //Apply default appearance
        this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section
        
		//this.terrain.display();   (Passase algo com isto, esta a por o passaro preto e a criar espacamentos entre as varias faces dos objetos
		//Perguntar a professora o que podera ser o erro.)

        this.pushMatrix();
			this.sky.apply();
			this.scale(100,100,100);
			this.Cube.display();
        this.popMatrix();

/*
		this.pushMatrix();
			this.translate(7,10,0)
			this.scale(0.5, 0.5, 0.5);
			this.bird.display();
		this.popMatrix();
		
		this.pushMatrix();
			this.translate(7,10,0);
			this.scale(2, 1.5, 2);
			this.bird_nest.apply();
			this.nest.display();
		this.popMatrix();

		this.pushMatrix();
			this.scale(7, 7, 7);
			this.house.display();
        this.popMatrix();*/
	   
    // ---- END Primitive drawing section
		
		
    }
}
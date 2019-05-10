/**
* MyPyramid
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new Plane(this.scene, 32);

        this.plane.initBuffers();    
        this.selectedExampleShader = 0;
		this.showShaderCode = false;
		this.init();
	}
init(){	
		//shaders connected
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);
		
		this.terrainTex = new CGFtexture(this.scene, "images/terrain.jpg");
		this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
		this.appearance.setTexture(this.terrainTex);
		this.testShaders = [

			new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag"),
			//new CGFshader(this.scene.gl, "shaders/line.vert", "shaders/line.frag"),
			//new CGFshader(this.scene.gl, "shaders/texture1.vert", "shaders/grey.frag"),
			
		];
		// shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

		
		
		// additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
		this.testShaders[0].setUniformsValues({ uSampler2: 2 });
		this.testShaders[0].setUniformsValues({ timeFactor: 0.1});
		
		
		this.shadersList = {
					'Water':0, 
				};
				
				
		// force initial setup of shader code panels

		//this.onShaderCodeVizChanged(this.showShaderCode);
		//this.onSelectedShaderChanged(this.selectedExampleShader);

		

		// set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.scene.setUpdatePeriod(50);
	

    }
	
	// Show/hide shader code
	onShaderCodeVizChanged(v) {
		if (v)
			this.shadersDiv.style.display = "block";
		else
			this.shadersDiv.style.display = "none";
	}
    
	// Called when selected shader changes
	onSelectedShaderChanged(v) {
		// update shader code
		this.scene.vShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[v].vertexURL) + "</xmp>";
		this.scene.fShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[v].fragmentURL) + "</xmp>";

		// update scale factor
		this.onScaleFactorChanged(this.scene.scaleFactor);
	}
	
	// called when a new object is selected
	onSelectedObjectChanged(v) {
		// update wireframe mode when the object changes
		this.onWireframeChanged(this.wireframe);
	}
	
	
		
	// called when the scale factor changes on the interface
	onScaleFactorChanged(v) {
		this.testShaders[this.selectedExampleShader].setUniformsValues({ normScale: this.scaleFactor });
	}

	// called periodically (as per setUpdatePeriod() in init())
	update(t) {
		if (this.selectedExampleShader == 0)
			this.testShaders[0].setUniformsValues({ timeFactor: t / 200 % 1000 });
	}

	
	display() {
		
		this.appearance.apply();
           this.scene.setActiveShader[this.testShaders[0]]; 
		  // this.scene.pushMatrix();
		   this.terrainMap.bind(2);
		   
        this.scene.pushMatrix();
			this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
			this.scene.scale(60, 60, 1);
			this.plane.display();
        this.scene.popMatrix();
    }

}



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
				];
		
		// additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
		this.testShaders[0].setUniformsValues({ uSampler2: 1 });
		
				
		// force initial setup of shader code panels
		
		//this.onShaderCodeVizChanged(this.showShaderCode);
		//this.onSelectedShaderChanged(this.selectedExampleShader);
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
		
	display() {

		// aplly main appearance
		this.appearance.apply();
		
/////////////////////////acho que o problema está aqui///////////

		// activate selected shader
        this.scene.setActiveShader(this.testShaders[0]);

		// bind additional texture to texture unit 1
		this.terrainMap.bind(1);

///////////////mas nao sei arranjar por causa do this.scene/////////		   
	 

		this.scene.pushMatrix();
			this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
			this.scene.scale(60, 60, 1);
			this.plane.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
    }

}



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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.Cube = new MyCubeMap(this);
        this.tree = new MyTree(this, 1,0.7,1,1,1,1);
		this.Group = new MyTreeGroupPatch(this);
		this.Row = new MyTreeRowPatch(this);
        this.House = new MyHouse(this);
        this.Hill1 = new MyVoxelHill(this,3);
		this.Hill2 = new MyVoxelHill(this,4);
		this.quadground = new MyQuad(this, [0, 10, 10, 10, 0, 0, 10, 0]);
		this.quad = new MyQuad(this, [0, 5, 5, 5, 0, 0, 5, 0]);
        this.fireplace = new MyFireplace(this);

        
        this.objects = [
                        this.tree, 
                        this.Group, 
                        this.Row, 
                        this.House, 
                        this.Hill,
                        this.quad,
                        this.fireplace
                    ];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 
                        'Tree':0, 
                        'Group': 1, 
                        'Row': 2, 
                        'House': 3, 
                        'Hill': 4,
                        'Quad':5,
                        'Fireplace':6
                        };

        //Other variables connected to MyInterface
        
        this.objectComplexity = 0.5;
        this.scaleFactor = 1.0;
        this.AmbientScale = 0.3;
        
        this.texEnable = true;
	
    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(0, 20, 10, 1.0);
        this.lights[0].setDiffuse(255/255, 245/255, 200/255, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
        //this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(3,0.4,3, 1.0);
        this.lights[1].setDiffuse(255/800, 165/800, 0, 1.0);
        this.lights[1].setSpecular(0,0,0, 1.0);
        this.lights[1].enable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-30, 30, 30), vec3.fromValues(0, 0, 0));
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }
/*
    updateCustomMaterial() {
        var rgba;

        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));

        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);

    };*/

    updateObjectComplexity(){
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
    }

	updateTexCoords() {
        this.quad.updateTexCoords(this.texCoords);
		this.quad1.updateTexCoords(this.texCoords);
    }

    initMaterials() {



        this.sky = new CGFappearance(this);
        this.sky.setAmbient(1, 1, 1, 1);
        this.sky.setDiffuse(0, 0, 0, 1);
        this.sky.setSpecular(0, 0, 0, 1);
		this.sky.setShininess(10.0);
		this.sky.loadTexture('skybox/sky2.jpg');
        this.sky.setTextureWrap('REPEAT', 'REPEAT');

                
        //1 material especular
        this.water = new CGFappearance(this);
        this.water.setAmbient(0.1, 0.1, 0.1, 1);
        this.water.setDiffuse(0, 0, 0, 1);
        this.water.setSpecular(0.7,0.7,0.7, 1);
        this.water.setShininess(10.0);
        this.water.loadTexture('images/water.jpg');
        this.water.setTextureWrap('REPEAT', 'REPEAT');

        this.grass = new CGFappearance(this);
        this.grass.setAmbient(0.5, 0.5, 0.5, 1);
        this.grass.setDiffuse(0.6, 0.6, 0.6, 1);
        this.grass.setSpecular(0, 0, 0, 1);
		this.grass.setShininess(1.0);
		this.grass.loadTexture('images/grass.jpg');
        this.grass.setTextureWrap('REPEAT', 'REPEAT');

        this.pool = new CGFappearance(this);
        this.pool.setAmbient(0.1, 0.1, 0.1, 1);
        this.pool.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pool.setSpecular(0,0,0, 1);
		this.pool.setShininess(1.0);
		this.pool.loadTexture('images/pool.jpg');
        this.pool.setTextureWrap('REPEAT', 'REPEAT');
		
		this.Dirttex = new CGFappearance(this);
        this.Dirttex.setAmbient(0.1, 0.1, 0.1, 1);
        this.Dirttex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Dirttex.setSpecular(0,0,0, 1);
        this.Dirttex.setShininess(1.0);
        this.Dirttex.loadTexture('images/dirt.jpg');
        this.Dirttex.setTextureWrap('REPEAT', 'REPEAT');

       
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
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        this.lights[0].update();
        this.lights[1].update();



        if(!this.texEnable)
            this.enableTextures(false);
       
        if(this.texEnable)
            this.enableTextures(true);

        // Draw axis
        if (this.displayAxis)
            this.axis.display();        

        this.pushMatrix();

        this.setGlobalAmbientLight(this.AmbientScale, this.AmbientScale, this.AmbientScale, 1.0);
      
     // POSICIONAMENTO DAS COISAS  		
		this.pushMatrix();		
            this.House.display();
        this.popMatrix();
	 
	 
	 
        this.pushMatrix();	
            this.translate(0.5,0,-8);
			this.scale(0.5,0.7,0.5);
			this.rotate(Math.PI/2,0,1,0);
            this.Group.display();
        this.popMatrix();
		
		this.pushMatrix();	
            this.translate(0.5,0,-4);
			this.scale(0.5,0.7,0.5);
			this.rotate(Math.PI/2,0,1,0);
            this.Group.display();
        this.popMatrix();
		
		this.pushMatrix();	
            this.translate(8,0,7);
			this.scale(0.5,0.7,0.5);
			this.rotate(Math.PI,0,0,0);
            this.Group.display();
        this.popMatrix();
		
		this.pushMatrix();	
            this.translate(4,0,7);
			this.scale(0.5,0.7,0.5);
			this.rotate(Math.PI/2,0,1,0);
            this.Group.display();
        this.popMatrix();
		
		this.pushMatrix();	
            this.translate(-4,0,7);
			this.scale(0.5,0.7,0.5);
			this.rotate(Math.PI/2,0,0,0);
            this.Group.display();
        this.popMatrix();
		
		this.pushMatrix();	
            this.translate(-8,0,7);
			this.scale(0.5,0.7,0.5);
			this.rotate(Math.PI,0,1,0);
            this.Group.display();
        this.popMatrix();
		
		
		
		this.pushMatrix();
			this.translate(9,0,1);		
			this.scale(0.5,0.5,0.5);
            this.rotate(Math.PI/2,0,1,0);
            this.Row.display();
        this.popMatrix();
		
		this.pushMatrix();
			this.translate(8,0,1);		
			this.scale(0.5,0.5,0.5);
            this.rotate(Math.PI/2,0,1,0);
            this.Row.display();
        this.popMatrix();
		
		this.pushMatrix();
			this.translate(-8,0,1);		
			this.scale(0.5,0.5,0.5);
            this.rotate(Math.PI/2,0,1,0);
            this.Row.display();
        this.popMatrix();
		
		this.pushMatrix();
			this.translate(-9,0,1);		
			this.scale(0.5,0.5,0.5);
            this.rotate(Math.PI/2,0,1,0);
            this.Row.display();
        this.popMatrix();

        this.pushMatrix();	
			this.translate(-2,0,-7);
			this.scale(0.5,0.5,0.5);
            this.rotate(3*Math.PI/2,0,1,0);
            
            this.Row.display();
        this.popMatrix();
		
		this.pushMatrix();	
			this.translate(-3.5,0,-7);
			this.scale(0.5,0.5,0.5);
            this.rotate(Math.PI/2,0,1,0);
            this.Row.display();
        this.popMatrix();

        this.pushMatrix();	
            
            this.translate(-7,0,-5);
			//this.scale(0.2,0.2,0.2);
			this.Dirttex.apply();
            this.Hill1.display();
        this.popMatrix();

        this.pushMatrix();	
            this.translate(6,0,-6);
			this.Dirttex.apply();
            this.Hill2.display();
        this.popMatrix();

        this.pushMatrix();	
            this.translate(3,0.02,3);
			this.scale(0.5,0.5,0.5);
            this.fireplace.display();
        this.popMatrix();
    
        this.pushMatrix();           
            this.grass.apply(); 
            this.scale(20,1,20);
            this.rotate(-Math.PI/2, 1, 0, 0);
            this.quadground.display();
        this.popMatrix();
          
        this.pushMatrix();           
            this.pool.apply(); 
            this.translate(-5,0.01,3);
            this.scale(5,2,2);
            this.rotate(-Math.PI/2, 1, 0, 0);
            this.quad.display();
        this.popMatrix();

        this.pushMatrix();           
            this.water.apply();             
            this.translate(-5,0.02,3);
            this.scale(4.3,1.5,1.5);
            this.rotate(-Math.PI/2, 1, 0, 0);
            this.quad.display();
        this.popMatrix();

        this.pushMatrix();
        this.sky.apply();
        this.scale(500,500,500);
        this.Cube.display();
        this.popMatrix();
    }
}
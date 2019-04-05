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

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 5);
        this.cone = new MyCone(this, 8, 1, 1);
        this.pyramid = new MyPyramid(this, 3, 1);
        this.tangram = new MyTangram(this);
        this.Cube = new MyCube(this);
        this.Prism = new MyPrism(this, 30, 1, 1);
        this.Cilinder = new MyCilinder(this,  30, 1, 1);
        this.tree = new MyTree(this, 1,0.7,1,1,1,1);
		this.Group = new MyTreeGroupPatch(this);
		this.Row = new MyTreeRowPatch(this);
        this.House = new MyHouse(this);
        this.Hill = new MyVoxelHill(this,1);

        this.objects = [this.plane, this.pyramid, this.cone, this.Cube, this.tangram, this.Prism, this.Cilinder, this.tree, this.Group, this.Row, this.House, this.Hill];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Plane': 0 , 'Pyramid': 1, 'Cone': 2, 'Cube':3, 'Tangram':4, 'Prism': 5, 'Cilinder': 6, 'Tree':7, 'Group': 8, 'Row': 9, 'House': 10, 'Hill': 11};

        //Other variables connected to MyInterface
        this.selectedObject = 10;
        this.selectedMaterial = 3;
        this.displayAxis = true;
        this.displayNormals = false;
        this.objectComplexity = 0.5;
        this.scaleFactor = 1.0;
		this.AmbientScale = 0.3;
	
    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(2.0, 2.0, -1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].disable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(0.0, -1.0, 2.0, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[1].disable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
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

    updateCustomMaterial() {
        var rgba;

        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));

        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);

    };

    updateObjectComplexity(){
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
    }


    initMaterials() {
        // Red Ambient (no diffuse, no specular)
        this.material1 = new CGFappearance(this);
        this.material1.setAmbient(1, 0, 0, 1.0);
        this.material1.setDiffuse(0, 0, 0, 1.0);
        this.material1.setSpecular(0, 0, 0, 1.0);
        this.material1.setShininess(10.0);

        // Red Diffuse (no ambient, no specular)
        this.material2 = new CGFappearance(this);
        this.material2.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material2.setDiffuse(1, 0, 0, 1.0);
        this.material2.setSpecular(0, 0, 0, 1.0);
        this.material2.setShininess(10.0);

        // Red Specular (no ambient, no diffuse)
        this.material3 = new CGFappearance(this);
        this.material3.setAmbient(0, 0, 0, 1.0);
        this.material3.setDiffuse(0, 0, 0, 1.0);
        this.material3.setSpecular(1, 0, 0, 1.0);
        this.material3.setShininess(10.0);

        // Red Specular (no ambient, no diffuse)
        this.madeira = new CGFappearance(this);
        this.madeira.setAmbient(255/255/10, 228/255/10, 196/255/10, 1.0);
        this.madeira.setDiffuse(255/255, 228/255, 196/255, 1.0);
        this.madeira.setSpecular(0.1, 0, 0, 1.0);
        this.madeira.setShininess(10.0);

        this.verde = new CGFappearance(this);
        this.verde.setAmbient(0, 1, 0,  0.10);
        this.verde.setDiffuse(0, 1, 0, 0.10);
        this.verde.setSpecular(0, 1, 0, 1.0);
		this.verde.setShininess(10.0);
		
		this.amarelo = new CGFappearance(this);
        this.amarelo.setAmbient(1, 1, 0,  0.10);
        this.amarelo.setDiffuse(1, 1, 0,  0.10);
        this.amarelo.setSpecular(1, 1, 0, 1.0);
		this.amarelo.setShininess(10.0);

		this.azul = new CGFappearance(this);
        this.azul.setAmbient(0, 0, 0.8, 0.1);
        this.azul.setDiffuse(0, 0, 0.8, 0.1);
        this.azul.setSpecular(0, 0, 1, 1.0);
		this.azul.setShininess(10.0);

		this.roxo = new CGFappearance(this);
        this.roxo.setAmbient(160/255, 32/255, 240/255, 0.10);
        this.roxo.setDiffuse(160/255, 32/255, 240/255,  0.10);
        this.roxo.setSpecular(160/255, 32/255, 240/255, 1.0);
		this.roxo.setShininess(10.0);
		
		this.laranja = new CGFappearance(this);
        this.laranja.setAmbient(255/255, 165/255, 0,  0.10);
        this.laranja.setDiffuse(255/255, 165/255, 0,  0.10);
        this.laranja.setSpecular(255/255, 165/255, 0, 1.0);
		this.laranja.setShininess(10.0);
		
		this.rosa = new CGFappearance(this);
        this.rosa.setAmbient(255/255, 105/255, 180/255,  0.10);
        this.rosa.setDiffuse(255/255, 105/255, 180/255,  0.10);
        this.rosa.setSpecular(0, 0, 0, 1.0);
		this.rosa.setShininess(10.0);
		
		this.vermelho = new CGFappearance(this);
        this.vermelho.setAmbient(1, 0, 0,  0.10);
        this.vermelho.setDiffuse(1, 0, 0,  0.10);
        this.vermelho.setSpecular(1, 0, 0, 1.0);
		this.vermelho.setShininess(10.0);


        // Custom material (can be changed in the interface)
        // initially midrange values on ambient, diffuse and specular, on R, G and B respectively

        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }
        this.customMaterial = new CGFappearance(this);

        this.updateCustomMaterial();

        this.materials = [this.material1, this.material2, this.material3, this.madeira, this.customMaterial, this.verde, this.amarelo, this.azul, this.roxo, this.laranja, this.rosa, this.vermelho];

        // Labels and ID's for object selection on MyInterface
        this.materialIDs = {'Red Ambient': 0, 'Red Diffuse': 1, 'Red Specular': 2, 'madeira': 3, 'Custom': 4 };
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
        
        this.lights[0].update();
        this.lights[1].update();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section
      

   //     this.tangram.display();
        

        this.pushMatrix();

        
        this.materials[this.selectedMaterial].apply();

        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
		
        this.setGlobalAmbientLight(this.AmbientScale, this.AmbientScale, this.AmbientScale, 1.0);
        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
        
        this.objects[this.selectedObject].display();
		
		
           
			
       
        this.popMatrix();
        // ---- END Primitive drawing section
/*
this.pushMatrix();

        
        this.materials[this.selectedMaterial].apply();

        //this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
		
        this.setGlobalAmbientLight(this.AmbientScale, this.AmbientScale, this.AmbientScale, 1.0);
       // if (this.displayNormals)
      //      this.objects[this.selectedObject].enableNormalViz();
       /// else
        //    this.objects[this.selectedObject].disableNormalViz();
        
        //this.objects[this.selectedObject].display();
		
		
            this.translate(0,0,5);
			this.scale(0.9,1.1,0.9);
			this.rotate(Math.PI/2,0,1,0);
            this.Group.display();
			
       
        this.popMatrix();
     //   this.Cube.display();
*/

        this.pushMatrix();
        this.materials[0].apply();
        this.scale(500,500,500);
        this.Cube.display();
    }
}
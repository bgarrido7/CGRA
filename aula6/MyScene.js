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
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Objects connected to MyInterface
        this.axiom =  "X"; //
        this.ruleF =  "FF"; //
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.angle = 30.0;
        this.iterations = 5;
        this.scaleFactor = .5;
    //    this.leafTest = new MyLeaf(this);
    //    this.branchTest = new MyBranch(this);
      
        this.lPlant = new MyLSPlant(this);
       
        this.doGenerate = function () {
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

        // do initial generation
        this.doGenerate();

        //Initialize scene objects
        this.axis = new CGFaxis(this);
     
     
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

   initMaterials() {

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

        this.setDefaultAppearance();

        this.lPlant.display();
/*
//-----------para testar leaf e branch class--------------
    this.pushMatrix();
        this.rotate(Math.PI/4,0,1,0);
        this.leaf.apply();
        this.leafTest.display();
        this.popMatrix();
    this.pushMatrix();
        this.translate(0,-3,0);
        this.branch.apply();
        this.branchTest.display();    
    this.popMatrix();
    
*/
    }
}
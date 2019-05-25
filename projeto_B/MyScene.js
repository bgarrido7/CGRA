/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    this.r = Math.floor(Math.random() * 7 + 1);

    super.init(application);
    this.initCameras();
    this.initLights();
    this.initMaterials();
    this.wireframe = false;
    this.showShaderCode = true;

    //movimentos do bicho
    this.xpos = 14;
    this.ypos = 20;
    this.zpos = 0;
    this.velocity = 0;
    this.tetayy = 0;
    this.count = false;
    this.turnVar = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    //-----floresta-----
    this.axiom = "X";
    this.ruleF = "FF";
    this.ruleX = "F[-X][X]F[-X]+FX";
    this.angleTree = 30.0;
    this.iterationsTree = 5;
    this.scaleFactorTree = 1;

    this.trees = [
      new MyTree(this),
      new MyTree(this),
      new MyTree(this),
      new MyTree(this),
      new MyTree(this),
      new MyTree(this)
    ];

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

    this.galhos = [
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this)
    ];

    this.galhos_pos_x = [13];
    for (let i = 0; i < 13; i++) {
      this.galhos_pos_x[i] = Math.random() * 20 - 10;
    }
    this.galhos_pos_z = [13];
    for (let i = 0; i < 13; i++) {
      this.galhos_pos_z[i] = Math.random() * 20 - 10;
    }

    this.pickit = false;
    this.removei = -1;

    this.shadersDiv = document.getElementById("shaders");
    this.vShaderDiv = document.getElementById("vshader");
    this.fShaderDiv = document.getElementById("fshader");

    this.house = new MyHouse(this);
    this.bird = new MyBird(
      this,
      this.tetayy,
      this.velocity,
      this.xpos,
      this.ypos,
      this.zpos
    );
    this.terrain = new MyTerrain(this);

   this.relampago = new MyLightning(this);
    this.birdsNest = new MyCilinder(this, 7, 1, 1);

    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.appearance.setShininess(120);

    this.tanterior = 0;

    //---------------floresta-------------------------
    for (var i = 0; i < 6; i++) {
      this.trees[i].generate(
        this.axiom,
        {
          X: [
            " F[-X][X]F[-X]+X",
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

        this.angleTree,
        this.iterationsTree,
        this.scaleFactorTree
      );
    }
    //------------------------------------------------------
  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(45, 45, 45),
      vec3.fromValues(0, 0, 0)
    );
  }

  initMaterials() {
    this.sky = new CGFappearance(this);
    this.sky.setAmbient(1, 1, 1, 1);
    this.sky.setDiffuse(0, 0, 0, 1);
    this.sky.setSpecular(0, 0, 0, 1);
    this.sky.setShininess(10.0);
    this.sky.loadTexture("skybox/sky2.jpg");
    this.sky.setTextureWrap("REPEAT", "REPEAT");

    this.branch = new CGFappearance(this);
    this.branch.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.branch.setDiffuse(0.9, 0.9, 0.9, 1.0);
    this.branch.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.branch.setShininess(10.0);
    this.branch.loadTexture("images/madeira.jpg");
    this.branch.setTextureWrap("REPEAT", "REPEAT");

    this.light = new CGFappearance(this);
    this.light.setAmbient(1, 1, 1, 1.0);
    this.light.setDiffuse(1, 1, 1, 1.0);
    this.light.setSpecular(1, 1,1, 1.0);
    this.light.setShininess(10.0);
    
    this.nest = new CGFappearance(this);
    this.nest.setAmbient(0.1, 0.1, 0.1, 1);
    this.nest.setDiffuse(0.9, 0.9, 0.9, 1);
    this.nest.setSpecular(0.1, 0.1, 0.1, 1);
    this.nest.setShininess(10.0);
    this.nest.loadTexture("images/birdNest.jpg");
    this.nest.setTextureWrap("REPEAT", "REPEAT");
  }

  // updates the selected object's wireframe mode
  onWireframeChanged(v) {
    if (v) this.terrain.plane.setLineMode();
    else this.terrain.plane.setFillMode();
  }

  update(t) {
    this.checkKeys();
    this.t = t / 200;
  }

  /*------------para controlar animação------*/
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in ​https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.count = true;
      this.bird.accelerate(this.count);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      this.count = false;
      this.bird.accelerate(this.count);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      this.turnVar = true;
      this.bird.turn(this.turnVar);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      this.turnVar = false;
      this.bird.turn(this.turnVar);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";

      this.bird.reset();
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";

      for (let i = 0; i < this.galhos.length; i++) {
/*if(((this.bird.xpos <= this.galhos_pos_x[i]+10)||(this.bird.xpos <= this.galhos_pos_x[i]-10)) && ((this.bird.zpos <= this.galhos_pos_z[i]+10)||(this.bird.zpos <= this.galhos_pos_z[i]-10))) {
 
	estava assim mas acho que devia ser:
*/
	if
          ((this.bird.xpos <= this.galhos_pos_x[i] + 10 ||
			this.bird.xpos >= this.galhos_pos_x[i] - 10)
			
		&&
          (this.bird.zpos <= this.galhos_pos_z[i] + 10 ||
            this.bird.zpos >= this.galhos_pos_z[i] - 10)) 

	{
		this.pickit = true;
		this.removei = i;
	}
		
      }

      this.bird.pickup(this.pickit);
      keysPressed = true;
    }

    if (keysPressed) console.log(text);
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

    this.pushMatrix();
    this.sky.apply();
    this.scale(100, 100, 100);
    this.Cube.display();
    this.popMatrix();

    this.terrain.display();

    //--------house with bird nest---------------

    this.pushMatrix();

    this.scale(0.2, 0.2, 0.2);

    	this.pushMatrix();
				this.scale(7, 7, 7);
				this.house.display();
			this.popMatrix();

    this.pushMatrix();
    this.scale(
      0.5 * this.scaleFactor,
      0.5 * this.scaleFactor,
      0.5 * this.scaleFactor
    );
    this.bird.display();
    this.popMatrix();

    this.pushMatrix();
      this.translate(7, 11, 0);
      this.scale(2.5, 2, 2.5);
      this.nest.apply();
      this.birdsNest.display();
    this.popMatrix();

    this.popMatrix();

    //---------------------galhos---------------------
    for (let i = 0; i < this.galhos.length; i++) {
      this.pushMatrix();
      this.translate(this.galhos_pos_x[i], 0, this.galhos_pos_z[i]);
      this.rotate((Math.PI / 14) * i, 0, 1, 0);
      this.rotate(-Math.PI / 2, 1, 0, 0);
      this.scale(0.4, 0.5, 0.4);
      this.branch.apply();
      //	this.treeBranch.display();

      if (i != this.removei) {
        this.galhos[i].display();
      }

      this.popMatrix();
    }
    //---------------------floresta---------------------

    this.pushMatrix();
    this.translate(-3, 0, -5);
    this.scale(0.5, 0.5, 0.5);
    this.trees[0].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(5, 0, -5);
    this.scale(0.5, 0.5, 0.5);
    this.trees[2].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-7, 0, 1);
    this.scale(0.5, 0.5, 0.5);
    this.trees[1].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-8, 0, -5);
    this.scale(0.5, 0.5, 0.5);
    this.trees[3].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-7, 0, 7);
    this.scale(0.5, 0.5, 0.5);
    this.trees[4].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(1, 0, -3);
    this.scale(0.5, 0.5, 0.5);
    this.trees[5].display();
    this.popMatrix();

    //-------------relampago----------
    this.pushMatrix();
      this.translate(1, 5, 3);
     this.relampago.display();
    this.popMatrix();

  }
}

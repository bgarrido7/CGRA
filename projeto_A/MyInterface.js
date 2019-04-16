/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'scaleFactor', 0.1, 1.0).name('Scale');

		this.gui.add(this.scene.lights[0], 'enabled').name("Day");
		this.gui.add(this.scene.lights[1], 'enabled').name("Fireplace Light");
  
        this.gui.add(this.scene, 'texEnable').name("Enable Textures");
        return true;
    }


}
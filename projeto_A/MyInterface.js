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

     //   this.gui.add(this.scene, 'displayAxis').name("Display axis");
    //    this.gui.add(this.scene, 'displayNormals').name("Display normals");

        // example of a dropdown that has numeric ID's associated, 
        // and an event handler to be called when the selection changes
        //this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange(this.scene.updateObjectComplexity.bind(this.scene));

        this.gui.add(this.scene, 'scaleFactor', 0.1, 1.0).name('Scale');
      //  this.gui.add(this.scene, 'objectComplexity', 0.01, 1.0).onChange(this.scene.updateObjectComplexity.bind(this.scene));

       // this.gui.add(this.scene, 'selectedMaterial', this.scene.materialIDs).name('Selected Material');

		this.gui.add(this.scene.lights[0], 'enabled').name("Day");
  
        this.gui.add(this.scene, 'texEnable').name("Enable Textures");
        
  
        return true;
    }


}

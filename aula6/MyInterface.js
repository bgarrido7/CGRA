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
        
      
        this.gui.add(this.scene, 'axiom').name('Axiom');
   
        this.gui.add(this.scene, 'angle').name('Angle');
        this.gui.add(this.scene, 'iterations').min(0).step(1).name('Iterations');
        this.gui.add(this.scene, 'scaleFactor').name('Scale Factor');
        this.gui.add(this.scene, 'doGenerate').name('Generate!');

        return true;
    }
}
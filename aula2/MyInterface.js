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
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
		this.gui.add(this.scene, "displayDiamond").name('Display Square');
		this.gui.add(this.scene, "displayTriangle").name('Display Triangle');
		this.gui.add(this.scene, "displayParalel").name('Display Paralelogram');
		this.gui.add(this.scene, "displayTriSmall").name('Display Small Triangle');
		this.gui.add(this.scene, "displayTriBig").name('Display Big Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}
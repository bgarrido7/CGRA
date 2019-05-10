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
        this.gui.add(this.scene, 'wireframe').onChange(this.scene.onWireframeChanged.bind(this.scene));
	//	this.gui.add(this.scene, 'selectedExampleShader', this.scene.shadersList).name('Shader examples').onChange(this.scene.onSelectedShaderChanged.bind(this.scene));
	//	this.gui.add(this.scene, 'showShaderCode').name('Show Shader Code').onChange(this.scene.onShaderCodeVizChanged.bind(this.scene));
		
        var obj = this;

        return true;
    }
}
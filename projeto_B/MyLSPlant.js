/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
    }


    // cria o lexico da gramatica
    initGrammar(){
        this.grammar = {
            "F": new MyBranch(this.scene),   //ramo    
            "X": new MyLeaf(this.scene)     //folhas
        };
    }
}

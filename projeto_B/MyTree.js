/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTree extends MyLSystem {
	constructor(scene) {
        super(scene);
    }
    
    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyTreeBranch(this.scene),   //ramo    
        };
    }
}

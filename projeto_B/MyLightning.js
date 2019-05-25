/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
 
        this.axiom =  "X"; 
        this.ruleF =  "FF"; 
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = .5;

        this.relampago = new MyQuad(this.scene);

    }
   

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": this.relampago,   
            "X": this.relampago, 
        };
    }

    
/*
     
    this.generate(
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

        this.angle,
        this.iterations,
        this.scaleFactor)
*/
   //acho que temos de mudar o this.productions do iterate() ou do generate() [ver MyLSystem]
   //para dar um axioma qql aleatorio (tipo F[&X]^X) mas ainda nao sei bem fazer isso
   //o aximoma nao pode ser aqueles que já definimos, têm de ser completamente aleatorio


    display(){
        this.scene.light.apply();
        super.display();
    }

}

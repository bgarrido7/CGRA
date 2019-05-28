/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
 
        this.axiom =  "X";
        this.productions = {
            "X": [ "FF" ],
            "F": [ "F[-X][X]F[-X]+FX" ]
        };
        this.angle = 25.0 * Math.PI/180;
        this.iterations = 3;
        this.scaleFactor =Math.pow(0.5, this.iterations-1);

        this.relampago = new MyQuad(this.scene);

        this.startTime =0;
        this.depth;

        this.light = new CGFappearance(this.scene);
        this.light.setAmbient(0, 0, 0, 1.0);
        this.light.setDiffuse(0, 0, 0,  1.0);
        this.light.setSpecular(0, 0, 0, 1.0);
        this.light.setShininess(10.0);
    }
   

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": this.relampago,   
            "X": this.relampago
        };
    }

    
    update(t) {
        this.dt = this.scene.t - this.tanterior;
        this.tanterior = this.scene.t;
    
        this.depth += Math.round(this.dt * (this.axiom.length/1000));
    }

    startAnimation(t) {
        this.iterate();
        this.startTime = this.scene.t;
        this.depth = 0;
    }

    display(){
        this.light.apply();
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;
        // percorre a cadeia de caracteres
        for (i=0; i<this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                case "\\":
                    //rotação em sentido positivo sobre o eixo dos XX
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;   

                case "/":
                    //rotação em sentido negativo sobre o eixo dos XX
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    //rotação em sentido positivo sobre o eixo dos YY
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    //rotação em sentido negativo sobre o eixo dos YY
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }

}

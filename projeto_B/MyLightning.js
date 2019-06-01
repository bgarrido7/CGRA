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
            "F": [ "FF" ],
            "X": [ " F[-X][X]F[-X]+FX "]
        };
        this.angle = 25.0 * Math.PI/180;
        this.iterations = 3;
        this.scale = Math.pow(0.5, this.iterations-1);

        this.relampago = new MyQuad(this.scene);

        this.startTime = 0;
        this.depth=0;

        this.animated = 0;

        this.light = new CGFappearance(this.scene);
        this.light.setAmbient(102/255, 1, 1, 1.0);
        this.light.setDiffuse(102/255, 1, 1,  1.0);
        this.light.setSpecular(102/255, 1, 1, 1.0);
        this.light.setShininess(10.0);

        this.initGrammar();
    }
   

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": this.relampago,   
            "X": this.relampago
        };
    }

    
    update(t) {
        this.lastTime = this.lastTime || this.startTime;
        this.dt = t- this.lastTime
        this.lastTime = t;

       
        this.depth += Math.round(this.dt * (this.axiom.length/1000));

        if(this.depth>=this.axiom.length)
            this.stopAnimation();
    }

    startAnimation(t) {
        this.animated = true;
        this.iterate();
        this.startTime = t;
        this.depth = 0;
    }


    stopAnimation(){
        this.animated = false;
        this.axiom = "X";
    }

    display(){
      
        this.scene.pushMatrix();
        this.light.apply();
        this.scene.scale(this.scale, this.scale, this.scale);

            var i;
            // percorre a cadeia de caracteres
            for (i=0; i<this.depth; ++i){

                if(!this.animated){
                    break;}


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

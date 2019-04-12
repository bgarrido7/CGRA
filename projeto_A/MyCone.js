/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices, stacks, Radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = Radius;
        this.initBuffers();

        
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;


        
        for(var i = 0; i < this.slices; i++){
        
            this.vertices.push(this.radius*Math.cos(ang), 0, -Math.sin(ang)*this.radius);
          //  P = (Math.cos(ang), 0, -Math.sin(ang)) - (0,this.stacks,0); 
            this.indices.push(i, (i+1) % this.slices, this.slices);
           // this.normals.push(this.radius*Math.cos(ang), this.stacks/2, -Math.sin(ang)*this.radius);


           var sa=this.radius*Math.sin(ang);
            var saa=this.radius*Math.sin(ang+alphaAng);
            var ca=this.radius*Math.cos(ang);
            var caa=this.radius*Math.cos(ang+alphaAng);


           var normal= [
            saa-sa,
            ca*saa-sa*caa,
            caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            this.normals.push(...normal);

                ang+=alphaAng;

            
        }
        this.vertices.push(0,this.stacks,0);
        this.normals.push(0,this.stacks,0);

        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}



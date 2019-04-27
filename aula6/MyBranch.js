/**
* MyPyramid
* @constructor
*/
class MyBranch extends CGFobject {
    constructor(scene/*, slices,  height, radius*/) {
        super(scene);
        this.slices = 8;
        this.radius = 0.4;
//this.stacks = stacks;
        this.height = 1.5;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=this.radius*Math.sin(ang);
            var saa=this.radius*Math.sin(ang+alphaAng);
            var ca=this.radius*Math.cos(ang);
            var caa=this.radius*Math.cos(ang+alphaAng);

            
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(ca, this.height, -sa);
            this.vertices.push(caa, this.height, -saa);

            // triangle normal computed by cross product of two edges
            this.normals.push(this.radius*Math.cos(ang), 0, -this.radius*Math.sin(ang));
            
            this.normals.push(this.radius*Math.cos(ang+alphaAng), 0, -this.radius*Math.sin(ang+alphaAng));

            this.normals.push(this.radius*Math.cos(ang), 0, -this.radius*Math.sin(ang));

            this.normals.push(this.radius*Math.cos(ang+alphaAng), 0, -this.radius*Math.sin(ang+alphaAng));

            // push normal once for each vertex of this triangle
         

            //this.indices.push(3*i, (3*i+1) , (3*i+2) );
            this.indices.push(4*i, (4*i+1), (4*i+3));
            this.indices.push(4*i, (4*i+3), (4*i+2));
            ang+=alphaAng;
        }
		
		this.texCoords = [	
		]
		
		for(var i = 0; i < this.slices; i++){
			this.texCoords.push(1, 0,);
			this.texCoords.push(1, 1,);
			this.texCoords.push(0, 1,);
			this.texCoords.push(0, 0,);
			
		}

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



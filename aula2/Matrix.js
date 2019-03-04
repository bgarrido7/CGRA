/**
* Matrix
* @constructor
*/

function MytangramDisplay(scene){
   

    //matriz translaçao
			var trans3 = [1  , 0.0, 0.0 , 0,
				0.0, 1  , 0.0 , 0 ,
				0.0, 0.0,   1 , 0 ,
				0  ,  2.75 ,   0 , 1.0];

   var sca3  = [0.75  , 0.0, 0.0 , 0,
			   0.0, 0.75  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   0, 0, 0, 1.0];

   var trans5 = [1  , 0.0, 0.0 , 0,
				   0.0, 1  , 0.0 , 0 ,
				   0.0, 0.0,   1 , 0 ,
				   -0.53  ,  0.53 ,   0 , 1.0];
				
   var trans1 = [1  , 0.0, 0.0 , 0,
				0.0, 1  , 0.0 , 0 ,
				0.0, 0.0,   1 , 0 ,
				1, 1, 0, 1.0];
				
   var trans2 = [1  , 0.0, 0.0 , 0,
				0.0, 1  , 0.0 , 0 ,
				0.0, 0.0,   1 , 0 ,
				0, 2, 0, 1.0];

   var trans4 = [1  , 0.0, 0.0 , 0,
			   0.0, 1  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   0.5, -0.5, 0, 1.0];

   var trans6 = [1  , 0.0, 0.0 , 0,
			   0.0, 1  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   1.5, -0.5, 0, 1.0];


   var trans7 = [1  , 0.0, 0.0 , 0,
			   0.0, 1  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   -2.05, -1, 0, 1.0];

   var sca5  = [0.75  , 0.0, 0.0 , 0,
				   0.0, 0.75  , 0.0 , 0 ,
				   0.0, 0.0,   1 , 0 ,
				   0, 0, 0, 1.0];

   var sca6  = [0.75  , 0.0, 0.0 , 0,
			   0.0, 0.75  , 0.0 , 0 ,
			   0.0, 0.0,   1 , 0 ,
			   0, 0, 0, 1.0];
   
   var rot1 = [Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0.0,0 ,
			   - Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];
			   
   var rot2 = [Math.cos(-Math.PI/2), Math.sin(-Math.PI/2), 0.0,0 ,
			   - Math.sin(-Math.PI/2), Math.cos(-Math.PI/2), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];

   var rot5 = [Math.cos(-Math.PI/2-Math.PI/4), Math.sin(-Math.PI/2-Math.PI/4), 0.0,0 ,
			   - Math.sin(-Math.PI/2-Math.PI/4), Math.cos(-Math.PI/2-Math.PI/4), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];

   var rot6 = [Math.cos(-Math.PI), Math.sin(-Math.PI), 0.0,0 ,
			   - Math.sin(-Math.PI), Math.cos(-Math.PI), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];

   var rot7 = [Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0.0,0 ,
			   - Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0.0,0 ,
			   0.0, 0.0, 1, 0,
			   0,0,0, 1.0];            
   
			   
   //this.translate(0,3,0);

		
			this.scene.pushMatrix();
			this.scene.multMatrix(trans3);  //multiplicar a matriz translaçao pela diamante
            this.scene.multMatrix(sca3); 

            this.diamond.display();
			
			this.scene.popMatrix();
		
	
		
			this.scene.pushMatrix();
			
			this.scene.multMatrix(rot1);
			this.scene.multMatrix(trans1);
			this.triangle.display();
			
			this.scene.popMatrix();
			
		/******** TRIANGLE 2 ********/
			this.scene.pushMatrix();
			
			this.scene.multMatrix(trans2);
			this.scene.multMatrix(rot2);
			this.scene.multMatrix(trans1);
			this.triangle.display();
			
			this.scene.popMatrix();
			
		
		
            this.scene.pushMatrix();
            
            this.scene.multMatrix(trans5);
            this.scene.multMatrix(sca5);
            this.scene.multMatrix(rot5);

            this.paralel.display();
			
			this.scene.popMatrix();
		
		
            this.scene.pushMatrix();

            this.scene.multMatrix(trans4);
            
            this.triSmall.display();
            
            this.scene.popMatrix();
            
            /*********TRINGLE 6*********/
            this.scene.pushMatrix();

            this.scene.multMatrix(trans6);
            this.scene.multMatrix(sca6);
            this.scene.multMatrix(rot6);

            this.triSmall.display();
            
            this.scene.popMatrix();

            /*********TRINGLE 6*********/
            this.scene.pushMatrix();

            this.scene.multMatrix(trans7);
            this.scene.multMatrix(sca6);
            this.scene.multMatrix(rot7);

            this.triSmall.display();
            
            this.scene.popMatrix();
     
	
}
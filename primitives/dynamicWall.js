function dynamicWall(wall) {
	this.name = "dynamicWall";

	var wallWidth_ = 0.3;
	var wallHeight = 7;
	var vertexOffset = 0;
	var nv = wall.length/3;
	
	this.vertices = new Float32Array((nv - 1) * 20 * 3);
		for(var j = 1; j < wall.length / 3; ++j){
			if(wall[j * 3] == wall[(j - 1) * 3]){
				wallWidth = wallWidth_ * Math.abs(wall[j * 3 + 2] - wall[(j - 1) * 3 + 2])/(wall[(j - 1) * 3 + 2] - wall[j * 3 + 2]);
				this.vertices[vertexOffset + 0] = wall[j * 3] + wallWidth/2;//0
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] + wallWidth/2;//1
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3] + wallWidth/2;//4
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] + wallWidth/2;//5
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;



				this.vertices[vertexOffset + 0] = wall[j * 3] - wallWidth/2;//2
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] - wallWidth/2;//3
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3] - wallWidth/2;//6
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] - wallWidth/2;//7
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;

				this.vertices[vertexOffset + 0] = wall[j * 3] + wallWidth/2;//0
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3] - wallWidth/2;//2
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3] + wallWidth/2;//4
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3] - wallWidth/2;//6
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;

				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] + wallWidth/2;//1
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] - wallWidth/2;//3
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] + wallWidth/2;//5
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] - wallWidth/2;//7
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;

				this.vertices[vertexOffset + 0] = wall[j * 3] + wallWidth/2;//4
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] + wallWidth/2;//5
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3] - wallWidth/2;//6
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2];
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3] - wallWidth/2;//7
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2];
				vertexOffset += 3;
			}
			else if(wall[j * 3 + 2] == wall[(j - 1) * 3 + 2]){
				wallWidth = -wallWidth_ * Math.abs(wall[j * 3] - wall[(j - 1) * 3])/(wall[(j - 1) * 3] - wall[j * 3]);
				this.vertices[vertexOffset + 0] = wall[j * 3];//0
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//1
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3];//4
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//5
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] + wallWidth/2;
				vertexOffset += 3;

				this.vertices[vertexOffset + 0] = wall[j * 3];//2
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] - wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//3
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] - wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3];//6
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] - wallWidth;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//7
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] - wallWidth;
				vertexOffset += 3;

				this.vertices[vertexOffset + 0] = wall[j * 3];//0
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3];//2
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] - wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3];//4
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3];//6
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] - wallWidth;
				vertexOffset += 3;

				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//1
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//3
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1];
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] - wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//5
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//7
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] - wallWidth;
				vertexOffset += 3;


				this.vertices[vertexOffset + 0] = wall[j * 3];//4
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//5
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] + wallWidth/2;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[j * 3];//6
				this.vertices[vertexOffset + 1] = wall[j * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[j * 3 + 2] - wallWidth;
				vertexOffset += 3;
				this.vertices[vertexOffset + 0] = wall[(j - 1) * 3];//7
				this.vertices[vertexOffset + 1] = wall[(j - 1) * 3 + 1] + wallHeight;
				this.vertices[vertexOffset + 2] = wall[(j - 1) * 3 + 2] - wallWidth;
				vertexOffset += 3;
			}
			else {
				console.log('wall coor not right');
			}
	}

	this.textureCoord = new Float32Array((nv - 1) * 2 * 20);
	var d = 0.0;
	var scale = 0.1;
	var textureIndices = 0;
	var vertexOffset = 0; 
	for(var j = 1; j < wall.length / 3; ++j){
			var distanceV = Math.sqrt((this.vertices[vertexOffset + 3] - this.vertices[vertexOffset + 0]) * (this.vertices[vertexOffset + 3] - this.vertices[vertexOffset + 0]) + 
										(this.vertices[vertexOffset + 4] - this.vertices[vertexOffset + 1]) * (this.vertices[vertexOffset + 4] - this.vertices[vertexOffset + 1]) + 
										(this.vertices[vertexOffset + 5] - this.vertices[vertexOffset + 2]) * (this.vertices[vertexOffset + 5] - this.vertices[vertexOffset + 2]) );
			this.textureCoord[textureIndices + 0] = d;
			this.textureCoord[textureIndices + 1] = 0.0;
			this.textureCoord[textureIndices + 2] = d + scale * distanceV;
			this.textureCoord[textureIndices + 3] = 0.0;
			this.textureCoord[textureIndices + 4] = d;
			this.textureCoord[textureIndices + 5] = 1.0;
			this.textureCoord[textureIndices + 6] = d + scale * distanceV;
			this.textureCoord[textureIndices + 7] = 1.0;
			this.textureCoord[textureIndices + 8] = d;
			this.textureCoord[textureIndices + 9] = 0.0;
			this.textureCoord[textureIndices + 10] = d + scale * distanceV;
			this.textureCoord[textureIndices + 11] = 0.0;
			this.textureCoord[textureIndices + 12] = d;
			this.textureCoord[textureIndices + 13] = 1.0;
			this.textureCoord[textureIndices + 14] = d + scale * distanceV;
			this.textureCoord[textureIndices + 15] = 1.0;
			textureIndices += 16;
			this.textureCoord[textureIndices + 0] = d;
			this.textureCoord[textureIndices + 1] = 0.0;
			this.textureCoord[textureIndices + 2] = d + scale * distanceV;
			this.textureCoord[textureIndices + 3] = 0.0;
			this.textureCoord[textureIndices + 4] = d;
			this.textureCoord[textureIndices + 5] = 1.0;
			this.textureCoord[textureIndices + 6] = d + scale * distanceV;
			this.textureCoord[textureIndices + 7] = 1.0;
			this.textureCoord[textureIndices + 8] = d;
			this.textureCoord[textureIndices + 9] = 0.0;
			this.textureCoord[textureIndices + 10] = d + scale * distanceV;
			this.textureCoord[textureIndices + 11] = 0.0;
			this.textureCoord[textureIndices + 12] = d;
			this.textureCoord[textureIndices + 13] = 1.0;
			this.textureCoord[textureIndices + 14] = d + scale * distanceV;
			this.textureCoord[textureIndices + 15] = 1.0;
			textureIndices += 16;
			this.textureCoord[textureIndices + 0] = d;
			this.textureCoord[textureIndices + 1] = 0.0;
			this.textureCoord[textureIndices + 2] = d + scale * distanceV;
			this.textureCoord[textureIndices + 3] = 0.0;
			this.textureCoord[textureIndices + 4] = d;
			this.textureCoord[textureIndices + 5] = 1.0/5;
			this.textureCoord[textureIndices + 6] = d + scale * distanceV;
			this.textureCoord[textureIndices + 7] = 1.0/5;
			textureIndices += 8;
			vertexOffset += 60;
			d += scale * distanceV;
		
	}



	this.triangleIndices = new Uint16Array((nv - 1) * 3 * 10);

	var triangleoffset = 0;
	var vertexoffset = 0;
		for(var j = 1; j < wall.length/3; ++j){
			this.triangleIndices[triangleoffset + 0] = vertexoffset; 
			this.triangleIndices[triangleoffset + 1] = vertexoffset + 1;
			this.triangleIndices[triangleoffset + 2] = vertexoffset + 3;

			this.triangleIndices[triangleoffset + 3] = vertexoffset; 
			this.triangleIndices[triangleoffset + 4] = vertexoffset + 3;
			this.triangleIndices[triangleoffset + 5] = vertexoffset + 2;

			this.triangleIndices[triangleoffset + 6] = vertexoffset + 4; 
			this.triangleIndices[triangleoffset + 7] = vertexoffset + 7;
			this.triangleIndices[triangleoffset + 8] = vertexoffset + 5;

			this.triangleIndices[triangleoffset + 9] = vertexoffset + 4; 
			this.triangleIndices[triangleoffset + 10] = vertexoffset + 6;
			this.triangleIndices[triangleoffset + 11] = vertexoffset + 7;

			this.triangleIndices[triangleoffset + 12] = vertexoffset + 8; 
			this.triangleIndices[triangleoffset + 13] = vertexoffset + 11;
			this.triangleIndices[triangleoffset + 14] = vertexoffset + 9;

			this.triangleIndices[triangleoffset + 15] = vertexoffset + 8; 
			this.triangleIndices[triangleoffset + 16] = vertexoffset + 10;
			this.triangleIndices[triangleoffset + 17] = vertexoffset + 11;

			this.triangleIndices[triangleoffset + 18] = vertexoffset + 12; 
			this.triangleIndices[triangleoffset + 19] = vertexoffset + 13;
			this.triangleIndices[triangleoffset + 20] = vertexoffset + 15;

			this.triangleIndices[triangleoffset + 21] = vertexoffset + 12; 
			this.triangleIndices[triangleoffset + 22] = vertexoffset + 15;
			this.triangleIndices[triangleoffset + 23] = vertexoffset + 14;

			this.triangleIndices[triangleoffset + 24] = vertexoffset + 16; 
			this.triangleIndices[triangleoffset + 25] = vertexoffset + 19;
			this.triangleIndices[triangleoffset + 26] = vertexoffset + 18;

			this.triangleIndices[triangleoffset + 27] = vertexoffset + 16; 
			this.triangleIndices[triangleoffset + 28] = vertexoffset + 17;
			this.triangleIndices[triangleoffset + 29] = vertexoffset + 19;
			triangleoffset += 30;
			vertexoffset += 20;
		
	}

	this.numVertices  = (nv - 1) * 20;
	this.numTriangles = (nv - 1) * 10;
};

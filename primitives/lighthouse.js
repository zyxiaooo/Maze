
function Lighthouse (resolution) {
	this.name = "lighthouse";
	this.height = 8.0;
	this.stairWidth = 0.8;
	this.wallHeight = 0.5;


	// vertices definition
	////////////////////////////////////////////////////////////
	
	this.vertices = new Float32Array(3*((2*resolution+2) + (3 * 2 * resolution + 2) + 2 * (3 * resolution + 1) + (2 * resolution + 2) + (resolution * 2 + 2)));
	this.textureCoord = new Float32Array(2*((2*resolution+2) + (3 * 2 * resolution + 2) + 2 * (3 * resolution + 1) + (2 * resolution + 2) + (resolution * 2 + 2)));
	var radius = 1.0;
	var angle;
	var step = 6.283185307179586476925286766559 / resolution;
	
	// lower circle
	var vertexoffset = 0;
	var texoffset = 0;
	for (var i = 0; i < resolution; i++) {
	
		angle = step * i;
		
		this.vertices[vertexoffset] = radius * Math.cos(angle);
		this.vertices[vertexoffset+1] = 0.0;
		this.vertices[vertexoffset+2] = radius * Math.sin(angle);
		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.1;
		this.textureCoord[texoffset + 1] = 0;
		texoffset += 2;
	}
	
	// upper circle
	for (var i = 0; i < resolution; i++) {
	
		angle = step * i;
		
		this.vertices[vertexoffset] = radius * Math.cos(angle);
		this.vertices[vertexoffset+1] = this.height;
		this.vertices[vertexoffset+2] = radius * Math.sin(angle);
		vertexoffset += 3;
		this.textureCoord[texoffset] = i * 0.1;
		this.textureCoord[texoffset + 1] = 10;
		texoffset += 2;
	}
	
	this.vertices[vertexoffset] = 0.0;
	this.vertices[vertexoffset+1] = 0.0;
	this.vertices[vertexoffset+2] = 0.0;
	vertexoffset += 3;
	this.textureCoord[texoffset] = 0.5;
	this.textureCoord[texoffset + 1] = 0.5;
	texoffset += 2;
	
	this.vertices[vertexoffset] = 0.0;
	this.vertices[vertexoffset+1] = this.height;
	this.vertices[vertexoffset+2] = 0.0;
	vertexoffset += 3;
	this.textureCoord[texoffset] = 0.5;
	this.textureCoord[texoffset + 1] = 0.5;
	texoffset += 2;

	this.bodyOffset = 0;
	this.stairOffset = vertexoffset / 3;

	for(var i = 0; i <= resolution * 3; ++i){
		angle = step * i;
		this.vertices[vertexoffset] = radius * Math.cos(angle);
		this.vertices[vertexoffset+1] = i * this.height / 3.0 / resolution;
		this.vertices[vertexoffset+2] = radius * Math.sin(angle);

		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.1;
		this.textureCoord[texoffset + 1] = 0.2;
		texoffset += 2;

		this.vertices[vertexoffset] = (radius + this.stairWidth) * Math.cos(angle);
		this.vertices[vertexoffset+1] = i * this.height/ 3.0 / resolution;
		this.vertices[vertexoffset+2] = (radius + this.stairWidth) * Math.sin(angle);
		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.1;
		this.textureCoord[texoffset + 1] = 0.8;
		texoffset += 2;
	}

	this.sideWallOffset = vertexoffset / 3;

	for(var i = 0; i <= resolution * 3; ++i){
		angle = step * i;

		this.vertices[vertexoffset] = (radius + this.stairWidth) * Math.cos(angle);
		this.vertices[vertexoffset+1] = i * this.height / 3.0 / resolution;
		this.vertices[vertexoffset+2] = (radius + this.stairWidth) * Math.sin(angle);
		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.1;
		this.textureCoord[texoffset + 1] = 0;
		texoffset += 2;

		this.vertices[vertexoffset] = (radius + this.stairWidth) * Math.cos(angle);
		this.vertices[vertexoffset+1] = i * this.height / 3.0 / resolution + this.wallHeight;
		this.vertices[vertexoffset+2] = (radius + this.stairWidth) * Math.sin(angle);
		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.1;
		this.textureCoord[texoffset + 1] = 1;
		texoffset += 2;
	}

	this.topWallOffset = vertexoffset / 3;

	this.vertices[vertexoffset] = (radius + this.stairWidth) * Math.cos(angle);
	this.vertices[vertexoffset+1] = this.height + this.wallHeight;
	this.vertices[vertexoffset+2] = (radius + this.stairWidth) * Math.sin(angle);
	vertexoffset += 3;
	this.textureCoord[texoffset] = 0;
	this.textureCoord[texoffset + 1] = 1;
	texoffset += 2;
	this.vertices[vertexoffset] = (radius + this.stairWidth) * Math.cos(angle);
	this.vertices[vertexoffset+1] = this.height;
	this.vertices[vertexoffset+2] = (radius + this.stairWidth) * Math.sin(angle);
	vertexoffset += 3;
	this.textureCoord[texoffset] = 0;
	this.textureCoord[texoffset + 1] = 0;
	texoffset += 2;

	for(var i = 0; i < resolution; ++i){
		angle = step * i;

		this.vertices[vertexoffset] = (radius) * Math.cos(angle);
		this.vertices[vertexoffset+1] = this.height + this.wallHeight;
		this.vertices[vertexoffset+2] = (radius) * Math.sin(angle);
		vertexoffset += 3;
		this.textureCoord[texoffset] = i * 0.1 + 0.1;
		this.textureCoord[texoffset + 1] = 1;
		texoffset += 2;
		this.vertices[vertexoffset] = (radius) * Math.cos(angle);
		this.vertices[vertexoffset+1] = this.height;
		this.vertices[vertexoffset+2] = (radius) * Math.sin(angle);
		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.1 + 0.1;
		this.textureCoord[texoffset + 1] = 0;
		texoffset += 2;
	}

	this.topLightOffset = vertexoffset / 3;
	for(var i = 0; i <= resolution; ++i){
		angle = step * i;
		this.vertices[vertexoffset] = (radius/5) * Math.cos(angle);
		this.vertices[vertexoffset+1] = this.height;
		this.vertices[vertexoffset+2] = (radius/5) * Math.sin(angle);
		vertexoffset += 3;
		this.textureCoord[texoffset] = i * 0.01;
		this.textureCoord[texoffset + 1] = 0;
		texoffset += 2;

		this.vertices[vertexoffset] = (radius / 10) * Math.cos(angle);
		this.vertices[vertexoffset+1] = this.height * 2;
		this.vertices[vertexoffset+2] = (radius / 10) * Math.sin(angle);
		vertexoffset += 3;

		this.textureCoord[texoffset] = i * 0.01;
		this.textureCoord[texoffset + 1] = 10;
		texoffset += 2;
	}



	
	
	// triangles definition
	////////////////////////////////////////////////////////////
	
	this.triangleIndices = new Uint16Array(3*(4*resolution + 2 * resolution * 3 + 2 * resolution * 3 + resolution * 2 + resolution * 2));

	
	// lateral surface
	var triangleoffset = 0;
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = i;
		this.triangleIndices[triangleoffset+1] = (i+1) % resolution;
		this.triangleIndices[triangleoffset+2] = (i % resolution) + resolution;
		triangleoffset += 3;
		
		this.triangleIndices[triangleoffset] = (i % resolution) + resolution;
		this.triangleIndices[triangleoffset+1] = (i+1) % resolution;
		this.triangleIndices[triangleoffset+2] = ((i+1) % resolution) + resolution;
		triangleoffset += 3;
	}
	
	// bottom of the cylinder
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = i;
		this.triangleIndices[triangleoffset+1] = (i+1) % resolution;
		this.triangleIndices[triangleoffset+2] = 2*resolution;
		triangleoffset += 3;
	}
	
	// top of the cylinder
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = resolution + i;
		this.triangleIndices[triangleoffset+1] = ((i+1) % resolution) + resolution;
		this.triangleIndices[triangleoffset+2] = 2*resolution+1;
		triangleoffset += 3;
	}
	this.stairIndices = triangleoffset;
	var stair = 0;
	for (var i = 0; i < resolution * 3; i++)
	{
		this.triangleIndices[triangleoffset] = this.stairOffset + stair;
		this.triangleIndices[triangleoffset+1] = this.stairOffset + stair + 1;
		this.triangleIndices[triangleoffset+2] = this.stairOffset + stair + 2;
		triangleoffset += 3;
		this.triangleIndices[triangleoffset] = this.stairOffset + stair + 1;
		this.triangleIndices[triangleoffset+1] = this.stairOffset + stair + 3;
		this.triangleIndices[triangleoffset+2] = this.stairOffset + stair + 2;
		triangleoffset += 3;
		stair += 2;
	}

	this.sideWallIndices = triangleoffset;
	var stair = 0;
	for (var i = 0; i < resolution * 3; i++)
	{
		this.triangleIndices[triangleoffset] = this.sideWallOffset + stair;
		this.triangleIndices[triangleoffset+1] = this.sideWallOffset + stair + 1;
		this.triangleIndices[triangleoffset+2] = this.sideWallOffset + stair + 2;
		triangleoffset += 3;
		this.triangleIndices[triangleoffset] = this.sideWallOffset + stair + 2;
		this.triangleIndices[triangleoffset+1] = this.sideWallOffset + stair + 1;
		this.triangleIndices[triangleoffset+2] = this.sideWallOffset + stair + 3;
		triangleoffset += 3;
		stair += 2;
	}

	this.topWallIndices = triangleoffset;
	var wall = 0;
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = this.topWallOffset + wall;
		this.triangleIndices[triangleoffset+1] = this.topWallOffset + wall + 1;
		this.triangleIndices[triangleoffset+2] = this.topWallOffset + wall + 2;
		triangleoffset += 3;
		this.triangleIndices[triangleoffset] = this.topWallOffset + wall + 1;
		this.triangleIndices[triangleoffset+1] = this.topWallOffset + wall + 3;
		this.triangleIndices[triangleoffset+2] = this.topWallOffset + wall + 2;
		triangleoffset += 3;
		wall += 2;
	}
	this.topLightIndices = triangleoffset;
	var toplight = 0
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = this.topLightOffset + toplight;
		this.triangleIndices[triangleoffset+1] = this.topLightOffset + toplight + 1;
		this.triangleIndices[triangleoffset+2] = this.topLightOffset + toplight + 2;
		triangleoffset += 3;
		this.triangleIndices[triangleoffset] = this.topLightOffset + toplight + 2;
		this.triangleIndices[triangleoffset+1] = this.topLightOffset + toplight + 1;
		this.triangleIndices[triangleoffset+2] = this.topLightOffset + toplight + 3;
		triangleoffset += 3;
		toplight += 2;
	}


	this.numVertices = this.vertices.length/3;
	this.numTriangles = this.triangleIndices.length/3;
}

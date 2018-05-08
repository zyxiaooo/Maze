// Global NVMC Client
// ID 6.1
/***********************************************************************/
var NVMCClient = NVMCClient || {};
/***********************************************************************/
function PhotographerCamera() {//line 7, Listing 4.6
	
};//line 42}

function ChaseCamera() {//line 74, Listnig 4.5{
	this.position 				= [0.0,0.0,0.0];
	this.eyeAngle = 0.0;
	this.eyeAngle_ = 0.0;
	this.handleKey = {};
	var me = this;
	this.handleKey["M"] = function (){
		me.eyeAngle_ = -2;
		
	};
	this.handleKey["K"] = function (){
		me.eyeAngle_ = 2;
	};

	this.keyDown = function (keyCode) {
		if (this.handleKey[keyCode])
			this.handleKey[keyCode](true);
	};
	this.keyUp						= function (keyCode) {
		me.eyeAngle_ = 0.0;
	};
	this.mouseMove				= function (event) {};
	this.mouseButtonDown	= function (event) {};
	this.mouseButtonUp 		= function () {}
	this.setView 					= function ( stack, F_0) {
		me.eyeAngle += me.eyeAngle_;
		var Rx = SglMat4.rotationAngleAxis(sglDegToRad(me.eyeAngle), [1.0, 0.0, 0.0]);
		var T = SglMat4.translation([0.0, 4, 0]);
		var Vc_0 = SglMat4.mul(T, Rx);
		var V_0 = SglMat4.mul(F_0, Vc_0);
		this.position = SglMat4.col(V_0,3);
		var invV = SglMat4.inverse(V_0);
		stack.multiply(invV);
	};
};//line 90}

function ObserverCamera() {
	//this.modes=		{wasd=0,trackball=1};
	this.currentMode = 0;
	this.V = SglMat4.identity();
	SglMat4.col$(this.V,3,[ 0.0, 20.0, 100.0, 1]);
	this.position =[];
	// variables for the wasd mode
	this.t_V = [0, 0, 0,0.0];
	this.alpha = 0;
	this.beta = 0;

	// variables for the trackball mode
	this.height = 0;
	this.width = 0;
	this.start_x = 0;
	this.start_y = 0;
	this.currX = 0;
	this.currY = 0;
	this.rad = 5;
	this.orbiting = false,
	this.projectionMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	this.rotMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	this.tbMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	this.computeVector = function (x, y) {
		// in this implementation the trackball is supposed
		// to be centered 2*rad along -z
		D = 2 * this.rad;

		//find the intersection with the trackball surface
		// 1. find the vector leaving from the point of view and passing through the pixel x,y
		// 1.1 convert x and y in view coordinates
		xf = (x - this.width / 2) / this.width * 2.0;
		yf = (y - this.height / 2) / this.height * 2.0;

		invProjection = SglMat4.inverse(this.projectionMatrix);
		v = SglMat4.mul4(invProjection, [xf, yf, -1, 1]);
		v = SglVec3.muls(v, 1 / v[3]);

		h = Math.sqrt(v[0] * v[0] + v[1] * v[1]);

		// compute the intersection with the sphere
		a = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
		b = 2 * D * v[2];
		c = D * D - this.rad * this.rad;

		discriminant = b * b - 4 * a * c;
		if (discriminant > 0) {
			t = (-b - Math.sqrt(discriminant)) / (2 * a);
			t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
			if (t < 0) t = 100 * this.rad;
			if (t1 < 0) t1 = 100 * this.rad;
			if (t1 < t) t = t1;

			//check if th sphere must be used
			if (t * v[0] * t * v[0] + t * v[1] * t * v[1] < this.rad * this.rad / 2)
				return [t * v[0], t * v[1], t * v[2] + D];
		}

		// compute the intersection with the hyperboloid
		a = 2 * v[2] * h;
		b = 2 * D * h;
		c = -this.rad * this.rad;

		discriminant = b * b - 4 * a * c;
		t = (-b - Math.sqrt(discriminant)) / (2 * a);
		t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
		if (t < 0) t = 0;
		if (t1 < 0) t1 = 0;
		if (t < t1) t = t1;

		return [t * v[0], t * v[1], t * v[2] + D];

	};

	this.updateCamera = function () {
		if (this.currentMode == 1)
			return;

		var dir_world = SglMat4.mul4(this.V, this.t_V);
		var newPosition = [];
		newPosition = SglMat4.col(this.V,3);
		newPosition = SglVec4.add(newPosition, dir_world);

		SglMat4.col$(this.V,3,[0.0,0.0,0.0,1.0]);
		var R_alpha = SglMat4.rotationAngleAxis(sglDegToRad(this.alpha/10), [0, 1, 0]);
		var R_beta = SglMat4.rotationAngleAxis(sglDegToRad(this.beta/10), [1, 0, 0]);
		this.V = SglMat4.mul(SglMat4.mul(R_alpha, this.V), R_beta);
		SglMat4.col$(this.V,3,newPosition);
		this.position = newPosition;
		this.alpha = 0;
		this.beta = 0;
	};

	this.forward 		= function (on) {this.t_V = [0, 0, -on / 1.0,0.0]	;};
	this.backward 	    = function (on) {this.t_V = [0, 0, on / 1.0,0.0]	;};
	this.left 			= function (on) {this.t_V = [-on / 1.0, 0, 0,0.0]	;};
	this.right 			= function (on) {this.t_V = [on / 1.0, 0, 0,0.0]	;};
	this.up 			= function (on) {this.t_V = [ 0.0, on/3.0, 0,0.0]	;};
	this.down 			= function (on) {this.t_V = [0.0, -on/3.0, 0,0.0]	;};

	me = this;
	this.handleKeyObserver = {};
	this.handleKeyObserver["W"] = function (on) {me.forward(on)	;	};
	this.handleKeyObserver["S"] = function (on) {me.backward(on);	};
	this.handleKeyObserver["A"] = function (on) {me.left(on);		};
	this.handleKeyObserver["D"] = function (on) {me.right(on);		};
	this.handleKeyObserver["Q"] = function (on) {me.up(on);			};
	this.handleKeyObserver["E"] = function (on) {me.down(on);		};

	this.handleKeyObserver["M"] = function (on) {
		me.currentMode = 1;
	};
	this.handleKeyObserver["N"] = function (on) {
		me.currentMode = 0;
	};

	this.keyDown = function (keyCode) {
		this.handleKeyObserver[keyCode] && this.handleKeyObserver[keyCode](true);
	};
	this.keyUp = function (keyCode) {
		this.handleKeyObserver[keyCode] && this.handleKeyObserver[keyCode](false);
	};

	this.mouseButtonDown = function (x,y) {


		if (this.currentMode == 0) {
			this.aiming = true;
			this.start_x = x;
			this.start_y = y;
		} else {
			this.currX = x;
			this.currY = y;
			this.orbiting = true;
		}
	};
	this.mouseButtonUp = function (event) {//line 144,Listing pag 137{
		if (this.orbiting) {
			var invTbMatrix = SglMat4.inverse(this.tbMatrix);
			this.V	= SglMat4.mul(invTbMatrix, this.V);
			this.tbMatrix = SglMat4.identity();
			this.rotMatrix = SglMat4.identity();
			this.orbiting = false;
		}else
		this.aiming = false;
	};
	this.mouseMove = function (x,y) {



		if (this.currentMode == 0) {
			if (this.aiming) {
				this.alpha = x - this.start_x;
				this.beta = -(y - this.start_y);
				this.start_x = x;
				this.start_y = y;
				this.updateCamera();
			}
			return;
		}

		if (!this.orbiting) return;

		var newX = x;
		var newY = y;

		var p0_prime = this.computeVector(this.currX, this.currY);
		var p1_prime = this.computeVector(newX, newY);

		var axis = SglVec3.cross(p0_prime, p1_prime);
		var axis_length = SglVec3.length(SglVec3.sub(p0_prime, p1_prime));
		var angle = axis_length / this.rad;
        angle= Math.acos(SglVec3.dot(p0_prime,p1_prime)/(SglVec3.length(p0_prime)*SglVec3.length(p1_prime)));
		if (angle > 0.00001) {
			this.rotMatrix = SglMat4.mul(SglMat4.rotationAngleAxis(angle, SglMat4.mul3(this.V, axis,0.0)), this.rotMatrix);
		}

		var cz = SglVec3.length(SglMat4.col(this.V, 2));
		var dir_world = SglVec3.muls(SglMat4.col(this.V, 2), -2 * this.rad);
		var tbCenter = SglVec3.add(SglMat4.col(this.V,3), dir_world);

		var tMatrixInv = SglMat4.translation(tbCenter);
		var tMatrix = SglMat4.translation(SglVec3.neg(tbCenter));

		this.tbMatrix = SglMat4.mul(tMatrixInv, SglMat4.mul(this.rotMatrix, tMatrix));

		this.currX = newX;
		this.currY = newY;
	}
	this.setView = function (stack) {
		this.updateCamera();
		var invV = SglMat4.inverse(this.V);
		stack.multiply(invV);
		stack.multiply(this.tbMatrix);
	}
};

NVMCClient.cameras = [];
NVMCClient.cameras[0] = new ChaseCamera();
NVMCClient.cameras[1] = new PhotographerCamera();
NVMCClient.currentCamera = 0;
NVMCClient.cameras[2] = new ObserverCamera();
NVMCClient.n_cameras = 3;

NVMCClient.initializeCameras = function () {
	this.cameras[1].position = this.game.race.photoPosition;
	this.cameras[2].position = this.game.race.observerPosition;
}

NVMCClient.onInitialize = function () {
	var gl = this.ui.gl;
	this.cameras[2].width = this.ui.width;
	this.cameras[2].height = this.ui.height;
    this.currentCamera = 2;

	/*************************************************************/
	NVMC.log("SpiderGL Version : " + SGL_VERSION_STRING + "\n");
	/*************************************************************/

	/*************************************************************/
	this.game.player.color = [1.0, 0.0, 0.0, 1.0];
	/*************************************************************/
	this.initMotionKeyHandlers();
	/*************************************************************/
	this.stack = new SglMatrixStack();

	this.initializeObjects(gl);
	this.initializeCameras();
	this.uniformShader = new uniformShader(gl);
	/*************************************************************/
};

NVMCClient.onKeyDown = function (keyCode, event) {
	if (this.currentCamera != 2)
		(this.carMotionKey[keyCode]) && (this.carMotionKey[keyCode])(true);
	this.cameras[this.currentCamera].keyDown(keyCode);
}
NVMCClient.onKeyUp = function (keyCode, event) {

	if (keyCode == "2") {
		this.nextCamera();
		return;
	}
	if (keyCode == "1") {
		this.prevCamera();
		return;
	}

	if (this.currentCamera != 2)
		(this.carMotionKey[keyCode]) && (this.carMotionKey[keyCode])(false);
	this.cameras[this.currentCamera].keyUp(keyCode);
};
/***********************************************************************/
NVMCClient.initializeCameras = function () {
	this.cameras[1].position = this.game.race.photoPosition;
	
};
function Light(geometry, color) {//line 7, Listing6.8{
	if (!geometry) this.geometry = [0.0, -1.0, 0.0, 0.0];
	else this.geometry = geometry;
	if (!color) this.color = [1.0, 1.0, 1.0, 1.0];
	else this.color = color;
}//line 12}

function Lamp(position, light, lumi) {
	this.position = position;
	this.light = light;
	this.lumi = lumi;
	this.lumiDelta = 0.00015;
}
NVMCClient.texture_wall = null;
NVMCClient.texture_ground = null;
NVMCClient.texture_lighthouse = null;
NVMCClient.lightsGeometryViewSpace = [];
NVMCClient.lightsColor = [];
NVMCClient.lightsLumi = [];
NVMCClient.streetLamps = [];
NVMCClient.spotLightsPos = [];
NVMCClient.spotLightsDir = [];
NVMCClient.spotLightsColor = [];
NVMCClient.myPos = function () {
	return this.game.state.players.me.dynamicState.position;
}
NVMCClient.myOri = function () {
	return this.game.state.players.me.dynamicState.orientation;
}

NVMCClient.myFrame = function () {
	return this.game.state.players.me.dynamicState.frame;
}
NVMCClient.initMotionKeyHandlers = function () {
	var game = this.game;

	var carMotionKey = {};
	carMotionKey["W"] = function (on) {
		game.playerAccelerate = on;
	};
	carMotionKey["S"] = function (on) {
		game.playerBrake = on;
	};
	carMotionKey["A"] = function (on) {
		game.playerSteerLeft = on;
	};
	carMotionKey["D"] = function (on) {
		game.playerSteerRight = on;
	};
	
	this.carMotionKey = carMotionKey;
};
NVMCClient.onAnimate = function (dt) {
	this.ui.postDrawEvent();
};

NVMCClient.onDraw = function () {
	var gl = this.ui.gl;
	this.drawScene(gl);
};
NVMCClient.createTexture = function (gl, data) {//line 12, Listing{
	var texture = gl.createTexture();
	texture.image = new Image();
    texture.image.crossOrigin = "anonymous"; // this line is needed only in local-noserv mode (not in the book)
    NVMCClient.n_resources_to_wait_for++;
	var that = texture;
	texture.image.onload = function () {
		gl.bindTexture(gl.TEXTURE_2D, that);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
        NVMCClient.n_resources_to_wait_for--;
	};
	texture.image.src = data;
	return texture;
}//line 31}

NVMCClient.initializeLights = function () {
	var lamps = NVMC.Player.Scene.lamps;
	for (var i = 0; i < lamps.length; ++i) {
		var g = lamps[i].position;
		var lightPos = [lamps[i].position[0], lamps[i].position[1], lamps[i].position[2], 1.0];
		lightPos[1] = lightPos[1] + 4.0;
		this.streetLamps[i] = new Lamp(g, new Light(lightPos, [0.3, 0.3, 0.2, 1]), lamps[i].lumi + Math.random() / 100);
	}
}

NVMCClient.initializeObjects = function (gl) {
	this.createObjects();
	this.createBuffers(gl);
};

NVMCClient.drawLamp = function (gl, shader) {
	var stack = this.stack;
	var shaderToUseForTheStick = null;
	if (!shader)
		shaderToUseForTheStick = gl.getParameter(gl.CURRENT_PROGRAM);
	else
		shaderToUseForTheStick = shader;

	gl.useProgram(this.uniformShader);
	stack.push();
	var M = SglMat4.translation([0, 4, 0]);
	stack.multiply(M);

	var M1 = SglMat4.scaling([0.2, 0.1, 0.2]);
	stack.multiply(M1);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	gl.uniformMatrix4fv(this.uniformShader.uProjectionMatrixLocation, false, this.projectionMatrix);
	this.drawObject(gl, this.cube, this.uniformShader, [1, 1, 1, 1.0]);
	stack.pop();

};

NVMCClient.drawLighthouse = function (gl) {
	var stack = this.stack;

	stack.push();
	gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);
	gl.bindTexture(gl.TEXTURE_2D, this.texture_lighthouse);
	this.drawObject(gl, this.lighthouse, this.lambertianSingleColorMultiLightShader,[0.9, 0.7, 0.9, 1.0], [0, 0, 0, 1.0]);
	//this.drawObject(gl, this.lighthouse, this.lambertianSingleColorMultiLightShader, [0.70, 0.56, 0.35, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
}


NVMCClient.drawTree = function (gl) {
	var stack = this.stack;

	stack.push();
	var M_0_tra1 = SglMat4.translation([0, 0.8, 0]);
	stack.multiply(M_0_tra1);

	var M_0_sca = SglMat4.scaling([0.6, 1.65, 0.6]);
	stack.multiply(M_0_sca);

	gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);
	var InvT = SglMat4.inverse(this.stack.matrix)
	InvT = SglMat4.transpose(InvT);
	gl.uniformMatrix3fv(this.lambertianSingleColorMultiLightShader.uViewSpaceNormalMatrixLocation, false, SglMat4.to33(InvT));
	this.drawObject(gl, this.cone, this.lambertianSingleColorMultiLightShader, [0.2, 0.8, 0.1, 1.0], [0, 0, 0, 1]);
	stack.pop();

	stack.push();
	var M_1_sca = SglMat4.scaling([0.25, 0.4, 0.25]);
	stack.multiply(M_1_sca);

	gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);
	gl.uniformMatrix3fv(this.lambertianSingleColorMultiLightShader.uViewSpaceNormalMatrixLocation, false, SglMat4.to33(this.stack.matrix));
	this.drawObject(gl, this.cylinder, this.lambertianSingleColorMultiLightShader, [0.6, 0.23, 0.12, 1.0], [0, 0, 0, 1]);
	stack.pop();
};


NVMCClient.drawScene = function (gl) {
	var width = this.ui.width;
	var height = this.ui.height;
	var ratio = width / height;
	var stack = this.stack;

	gl.viewport(0, 0, width, height);

	// Clear the framebuffer
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.enable(gl.DEPTH_TEST);

	stack.loadIdentity();

	if (this.currentCamera == 3) {
		gl.enable(gl.STENCIL_TEST);
		gl.clearStencil(0);
		gl.stencilMask(~0);
		gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
		gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);

		gl.useProgram(this.lambertianSingleColorMultiLightShader);
		gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, SglMat4.identity());
		gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uProjectionMatrixLocation, false, SglMat4.identity());
		this.drawObject(gl, this.cabin, this.lambertianSingleColorMultiLightShader);

		gl.stencilFunc(gl.EQUAL, 0, 0xFF);
		gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
		gl.stencilMask(0);

	} else
		gl.disable(gl.STENCIL_TEST);

	this.projectionMatrix = SglMat4.perspective(3.14 / 3, ratio, 1, 1000);

	var orientation = this.game.state.players.me.dynamicState.orientation;
	var pos = this.game.state.players.me.dynamicState.position;
	this.cameras[this.currentCamera].setView(this.stack, this.myFrame());

	this.lightsGeometryViewSpace[0] = SglMat4.mul4(this.stack.matrix, [0.6, 0.0, 0.8,0.0]);
	this.lightsColor[0] = [0.1, 0.1, 0.1, 1.0];
	this.lightsLumi[0] = 0.01;
	for (var i = 0; i < this.streetLamps.length; i += 3) {
		this.lightsGeometryViewSpace[i/3 + 1] = SglMat4.mul4(this.stack.matrix, this.streetLamps[i].light.geometry);
		this.lightsColor[i/3 + 1] = this.streetLamps[i].light.color;
		this.lightsLumi[i/3 + 1] = this.streetLamps[i].lumi;
		this.streetLamps[i].lumi += this.streetLamps[i].lumiDelta;
		if(this.streetLamps[i].lumi >= 0.025 && this.streetLamps[i].lumiDelta > 0)this.streetLamps[i].lumiDelta *= -1;
		else if(this.streetLamps[i].lumi <= 0.007 && this.streetLamps[i].lumiDelta < 0)this.streetLamps[i].lumiDelta *= -1;

		if(i >= this.streetLamps.length - 3){
			this.lightsColor[i/3 + 1] = [0.01, 0.1, 0.3, 0.0];
			if(this.streetLamps[i].lumi >= 0.027 && this.streetLamps[i].lumiDelta > 0)this.streetLamps[i].lumiDelta *= -1;
			else if(this.streetLamps[i].lumi <= 0.017 && this.streetLamps[i].lumiDelta < 0)this.streetLamps[i].lumiDelta *= -1;
		}
	}

	var lighthouses = NVMC.Player.Scene.lighthouses;
	for (var l = 0; l < lighthouses.length; ++l) {

		 this.spotLightsPos[l] = SglMat4.mul4(this.stack.matrix, [lighthouses[l].position[0], lighthouses[l].height * 6 + 2, lighthouses[l].position[2], 1.0]);
		 var rx = SglMat4.rotationAngleAxis(sglDegToRad(40), [1, 0, 0]);
		 var rxy = SglMat4.mul(SglMat4.rotationAngleAxis(sglDegToRad(lighthouses[l].angle), [0, 1, 0]), rx);
		 this.spotLightsDir[l] = SglVec4.sub(SglMat4.mul4(this.stack.matrix, SglMat4.mul4(rxy, [0, -1.0, 0, 1.0])), SglMat4.mul4(this.stack.matrix, SglMat4.mul4(rxy, [0, 0, 0, 1.0])));
		 this.spotLightsColor[l] = [1, 1, 1, 1.0];
	}

	gl.useProgram(this.lambertianSingleColorMultiLightShader);
	for (var i = 0; i < this.streetLamps.length + 1; i += 3) {
		gl.uniform4fv(this.lambertianSingleColorMultiLightShader.uLightsGeometryLocation[i/3],
			this.lightsGeometryViewSpace[i/3]);
		gl.uniform4fv(this.lambertianSingleColorMultiLightShader.uLightsColorLocation[i/3],
			this.lightsColor[i/3]);
		gl.uniform1f(this.lambertianSingleColorMultiLightShader.uLightsLumiLocation[i/3],
			this.lightsLumi[i/3]);
	}
	//console.log(this.lightsLumi[1]);
	for (var i = 0; i < lighthouses.length; ++i) {
		gl.uniform4fv(this.lambertianSingleColorMultiLightShader.uSpotLightsGeometryLocation[i],
			this.spotLightsPos[i]);
		gl.uniform4fv(this.lambertianSingleColorMultiLightShader.uSpotLightsDirLocation[i],
			this.spotLightsDir[i]);
		gl.uniform4fv(this.lambertianSingleColorMultiLightShader.uSpotLightsColorLocation[i],
			this.spotLightsColor[i]);
	}

	gl.uniform3fv(this.lambertianSingleColorMultiLightShader.uLightColorLocation, [0.9, 0.9, 0.9]);
	gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uProjectionMatrixLocation, false, this.projectionMatrix);
	gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);
	gl.uniformMatrix3fv(this.lambertianSingleColorMultiLightShader.uViewSpaceNormalMatrixLocation, false, SglMat4.to33(this.stack.matrix));

	//this.drawObject(gl, this.track, this.lambertianSingleColorMultiLightShader, [0.9, 0.8, 0.7, 1.0]);
	

	var streetLamps = this.streetLamps;
	for (var t in streetLamps) {
		if(t % 3 != 0)continue;
		if(t >= streetLamps.length - 3)break;
		stack.push();
		var M_8 = SglMat4.translation(streetLamps[t].position);
		stack.multiply(M_8);
		this.drawLamp(gl);
		stack.pop();
	}

	gl.useProgram(this.lambertianSingleColorMultiLightShader);
	gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);

	gl.activeTexture(gl.TEXTURE0);//line 318,Listing 7.4
	gl.uniform1i(this.lambertianSingleColorMultiLightShader.uTextureLocation, 0);//line 320}
	gl.bindTexture(gl.TEXTURE_2D, this.texture_ground);
	this.drawObject(gl, this.ground, this.lambertianSingleColorMultiLightShader, [0.3, 0.7, 0.2, 1.0]);

	gl.bindTexture(gl.TEXTURE_2D, this.texture_wall);
	this.drawObject(gl, this.wall, this.lambertianSingleColorMultiLightShader,[0.9, 0.7, 0.9, 1.0], [0, 0, 0, 1.0]);
	for(var i = 0; i < this.dynamicWall.length; ++i){
		var T_y = SglMat4.translation([0, NVMC.Player.Scene.dynamicWall[i].height, 0]);
		stack.push()
		stack.multiply(T_y);
		stack.push();
		gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);
		gl.bindTexture(gl.TEXTURE_2D, this.texture_wall);
		this.drawObject(gl, this.dynamicWall[i], this.lambertianSingleColorMultiLightShader,[0.9, 0.7, 0.9, 1.0], [0, 0, 0, 1.0]);
		stack.pop();
		stack.pop();
	}

	

	for (var l = 0; l < lighthouses.length; ++l) {

		stack.push();
		var M_8 = SglMat4.translation(lighthouses[l].position);
		stack.multiply(M_8);
		var M_1_sca = SglMat4.scaling(lighthouses[l].scale);
		stack.multiply(M_1_sca);
		this.drawLighthouse(gl);

		var M_2_sca = SglMat4.translation([0, lighthouses[l].height * 2 + 0.2, 0]);
		stack.multiply(M_2_sca);

		var Ry = SglMat4.rotationAngleAxis(sglDegToRad(lighthouses[l].angle), [0.0, 1.0, 0.0]);
		stack.multiply(Ry);

		lighthouses[l].angle += 0.5;

		var Rx = SglMat4.rotationAngleAxis(sglDegToRad(40), [1.0, 0.0, 0.0]);
		stack.multiply(Rx);

		var Rt = SglMat4.translation([0.0, -1.0, 0.0]);
		stack.multiply(Rt);



		var Rsc = SglMat4.scaling([0.5, 1.0, 0.5]);
		stack.multiply(Rsc);

		gl.uniformMatrix4fv(this.lambertianSingleColorMultiLightShader.uModelViewMatrixLocation, false, stack.matrix);
		var InvT = SglMat4.inverse(this.stack.matrix)
		InvT = SglMat4.transpose(InvT);
		gl.uniformMatrix3fv(this.lambertianSingleColorMultiLightShader.uViewSpaceNormalMatrixLocation, false, SglMat4.to33(InvT));
		this.drawObject(gl, this.cone_light, this.lambertianSingleColorMultiLightShader, [1, 1, 1, 1.0], [0, 0, 0, 1]);

		stack.pop();
	}
	var FT_y = SglMat4.translation(this.particleFountain.center);

	for(var i = 0; i < 1000; ++i){
			if(this.particleFountain.vertices[i * 3 + 1] < 0){
				this.particleFountain.vertices[i * 3] = 0;
				this.particleFountain.vertices[i * 3 + 1] = 0;
				this.particleFountain.vertices[i * 3 + 2] = 0;
				this.particleFountain.velocity[i * 3] = Math.random() * 4 - 2;
				this.particleFountain.velocity[i * 3 + 1] = Math.random() * 5 + 4;
				this.particleFountain.velocity[i * 3 + 2] = Math.random() * 4 - 2;
			}
			else {
				this.particleFountain.vertices[i * 3] += 1.0 / 60.0 * this.particleFountain.velocity[i * 3];
				this.particleFountain.vertices[i * 3 + 1] += 1.0 / 60.0 * this.particleFountain.velocity[i * 3 + 1];
				this.particleFountain.vertices[i * 3 + 2] += 1.0 / 60.0 * this.particleFountain.velocity[i * 3 + 2];
				this.particleFountain.velocity[i * 3 + 1] -= 1.0 / 60.0 * 9.8;
			}
			
	}
	stack.push()
	stack.multiply(FT_y)
	gl.useProgram(this.particleFountainShader);
	gl.uniform3fv(this.particleFountainShader.uCenterLocation, this.particleFountain.center);
	gl.uniformMatrix4fv(this.particleFountainShader.uProjectionMatrixLocation, false, this.projectionMatrix);
	gl.uniformMatrix4fv(this.particleFountainShader.uModelViewMatrixLocation, false, stack.matrix);
	gl.uniformMatrix3fv(this.particleFountainShader.uViewSpaceNormalMatrixLocation, false, SglMat4.to33(this.stack.matrix));
	this.drawPoints(gl, this.particleFountain, this.particleFountainShader);
	stack.pop();


	gl.useProgram(null);

};
/***********************************************************************/
NVMCClient.createObjects = function () {
	this.cube = new Cube(10);
	this.cylinder = new Cylinder(10);
	this.cylinder10 = new Cylinder(10,10);
	this.cone = new Cone(10);
	this.cone_light = new Cone_light(10);

	//this.track = new Track(this.game.race.track);

	var bbox = this.game.race.bbox;
	var quad = [bbox[0], bbox[1] - 0.01, bbox[2],
		bbox[3], bbox[1] - 0.01, bbox[2],
		bbox[3], bbox[1] - 0.01, bbox[5],
		bbox[0], bbox[1] - 0.01, bbox[5]
	];

	var text_coords = [-20, -20, 20, -20, 20, 20, -20, 20];
	this.ground = new TexturedQuadrilateral(quad, text_coords);
	// this.cabin = new Cabin();
	// this.windshield = new Windshield();
	// this.rearmirror = new RearMirror();

	// var gameBuildings = this.game.race.buildings;
	// this.buildings = new Array(gameBuildings.length);
	// for (var i = 0; i < gameBuildings.length; ++i) {
	// 	this.buildings[i] = new Building(gameBuildings[i]);
	// }
	this.wall = new Wall(NVMC.Player.Scene.wall);
	this.dynamicWall = new Array(NVMC.Player.Scene.dynamicWall.length);
	for(var i = 0; i < NVMC.Player.Scene.dynamicWall.length; ++i){
		this.dynamicWall[i] = new dynamicWall(NVMC.Player.Scene.dynamicWall[i].position);
	}

	this.lighthouse = new Lighthouse(30);
	this.particleFountain = {
		center:[15, 0, -55],
		vertices: new Float32Array(1000 * 3),
		velocity: new Float32Array(1000 * 3),
	};
	for(var i = 0; i < 1000; ++i){
		this.particleFountain.vertices[i * 3] = Math.random() * 4 - 2;
		this.particleFountain.vertices[i * 3 + 1] = Math.random() * 6;
		this.particleFountain.vertices[i * 3 + 2] = Math.random() * 4 - 2;
		this.particleFountain.velocity[i * 3] = Math.random() * 1.5 + 0.5;
		this.particleFountain.velocity[i * 3 + 1] = Math.random() * 4 + 3;
		this.particleFountain.velocity[i * 3 + 2] = Math.random() * 1.5 + 0.5;
	}
	for(var k = 0; k < 300; ++k){
		for(var i = 0; i < 1000; ++i){
			if(this.particleFountain.vertices[i * 3 + 1] < -0.1){
				this.particleFountain.vertices[i * 3] = 0;
				this.particleFountain.vertices[i * 3 + 1] = 0;
				this.particleFountain.vertices[i * 3 + 2] = 0;
				this.particleFountain.velocity[i * 3] = Math.random() * 4 - 2;
				this.particleFountain.velocity[i * 3 + 1] = Math.random() * 4 + 3;
				this.particleFountain.velocity[i * 3 + 2] = Math.random() * 4 - 2;
			}
			else {
				this.particleFountain.vertices[i * 3] += 1.0 / 60.0 * this.particleFountain.velocity[i * 3];
				this.particleFountain.vertices[i * 3 + 1] += 1.0 / 60.0 * this.particleFountain.velocity[i * 3 + 1];
				this.particleFountain.vertices[i * 3 + 2] += 1.0 / 60.0 * this.particleFountain.velocity[i * 3 + 2];
				this.particleFountain.velocity[i * 3 + 1] -= 1.0 / 60.0 * 9.8;
			}
			
		}
	}
	
	
};

NVMCClient.createObjectBuffers = function (gl, obj, createColorBuffer, createNormalBuffer, createTexCoordBuffer) {
	obj.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	if (createColorBuffer) {
		obj.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, obj.vertex_color, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	if (createNormalBuffer) {
		obj.normalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, obj.vertex_normal, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	if (createTexCoordBuffer) {
		obj.textureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.textureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, obj.textureCoord, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	obj.indexBufferTriangles = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	// create edges
	var edges = new Uint16Array(obj.numTriangles * 3 * 2);
	for (var i = 0; i < obj.numTriangles; ++i) {
		edges[i * 6 + 0] = obj.triangleIndices[i * 3 + 0];
		edges[i * 6 + 1] = obj.triangleIndices[i * 3 + 1];
		edges[i * 6 + 2] = obj.triangleIndices[i * 3 + 0];
		edges[i * 6 + 3] = obj.triangleIndices[i * 3 + 2];
		edges[i * 6 + 4] = obj.triangleIndices[i * 3 + 1];
		edges[i * 6 + 5] = obj.triangleIndices[i * 3 + 2];
	}

	obj.indexBufferEdges = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

};

 NVMCClient.createBuffers = function (gl) {
	this.createObjectBuffers(gl, this.cube, false, false, false);

	ComputeNormals(this.cylinder);
	this.createObjectBuffers(gl, this.cylinder, false, true, false);

	ComputeNormals(this.cylinder10);
	this.createObjectBuffers(gl, this.cylinder10, false, true, false);

	ComputeNormals(this.cone);
	this.createObjectBuffers(gl, this.cone, false, true, false);

	ComputeNormals(this.cone_light);
	this.createObjectBuffers(gl, this.cone_light, false, true, false);

	// ComputeNormals(this.track);
	// this.createObjectBuffers(gl, this.track, false, true);

	ComputeNormals(this.ground);
	this.createObjectBuffers(gl, this.ground, false, true, true);

	// this.createObjectBuffers(gl, this.cabin, true, false);
	// this.createObjectBuffers(gl, this.windshield, true, false);

	for (var i = 0; i < this.dynamicWall.length; ++i) {
		this.dynamicWall[i] = ComputeNormals(this.dynamicWall[i]);
		this.createObjectBuffers(gl, this.dynamicWall[i], false, true, true);
	}
	ComputeNormals(this.wall);
	this.createObjectBuffers(gl, this.wall, false, true, true);
	ComputeNormals(this.lighthouse);
	this.createObjectBuffers(gl, this.lighthouse, false, true, true);

	this.particleFountain.vertexBuffer = gl.createBuffer();
	
};
NVMCClient.drawObject = function (gl, obj, shader, fillColor) {
	// Draw the primitive
	gl.useProgram(shader);
	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
	gl.enableVertexAttribArray(shader.aPositionIndex);
	gl.vertexAttribPointer(shader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);

	if (shader.aColorIndex && obj.colorBuffer) {
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
		gl.enableVertexAttribArray(shader.aColorIndex);
		gl.vertexAttribPointer(shader.aColorIndex, 4, gl.FLOAT, false, 0, 0);
	}

	if (shader.aNormalIndex && obj.normalBuffer) {
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
		gl.enableVertexAttribArray(shader.aNormalIndex);
		gl.vertexAttribPointer(shader.aNormalIndex, 3, gl.FLOAT, false, 0, 0);
	}

	if (shader.aTextureCoordIndex && obj.textureCoordBuffer) {
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.textureCoordBuffer);
		gl.enableVertexAttribArray(shader.aTextureCoordIndex);
		gl.vertexAttribPointer(shader.aTextureCoordIndex, 2, gl.FLOAT, false, 0, 0);
	}

	if (fillColor && shader.uColorLocation)
		gl.uniform4fv(shader.uColorLocation, fillColor);

	gl.enable(gl.POLYGON_OFFSET_FILL);

	gl.polygonOffset(1.0, 1.0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
	gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

};
NVMCClient.drawPoints = function(gl, obj, shader){
	gl.bindBuffer(gl.ARRAY_BUFFER, this.particleFountain.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.particleFountain.vertices, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(shader.aPositionIndex);
	gl.vertexAttribPointer(shader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.POINTS, 0, obj.vertices.length/3);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}
// NVMC Client Events
/***********************************************************************/
NVMCClient.onInitialize = function () {

	var gl = this.ui.gl;
	this.cameras[2].width = this.ui.width;
	this.cameras[2].height = this.ui.height;

	/*************************************************************/
	NVMC.log("SpiderGL Version : " + SGL_VERSION_STRING + "\n");
	/*************************************************************/

	/*************************************************************/
	this.game.player.color = [1.0, 0.0, 0.0, 1.0];
	/*************************************************************/

	/*************************************************************/
	this.initMotionKeyHandlers();
	/*************************************************************/
	this.stack = new SglMatrixStack();
	this.projection_matrix = SglMat4.identity();

	/*************************************************************/
	this.initializeLights();
	this.initializeObjects(gl);
	this.initializeCameras();

	this.uniformShader = new uniformShader(gl);
	this.particleFountainShader = new particleFountainShader(gl);
	//this.lambertianMultiLightShader = new lambertianMultiLightShader(gl, this.streetLamps.length + 1, NVMC.Player.Scene.lighthouses.length);

	this.lambertianSingleColorMultiLightShader = new lambertianSingleColorMultiLightShader(gl, Math.round(this.streetLamps.length / 3) + 1, NVMC.Player.Scene.lighthouses.length);
	this.texture_wall = this.createTexture(gl, NVMC.resource_path+'textures/wall.png');
	this.texture_ground = this.createTexture(gl, NVMC.resource_path+'textures/ground_texture.jpg');
	this.texture_lighthouse = this.createTexture(gl, NVMC.resource_path+'textures/wall.png');

	/*************************************************************/

	//this.loadCarModel(gl);
	//this.createCarTechnique(gl);
};

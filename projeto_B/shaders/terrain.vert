attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	
	vTextureCoord = aTextureCoord;
	vec4 filter = texture2D(uSampler2, vTextureCoord);
	filter.r = filter.r*10.0;
	vec3 offset=vec3(0.0, 0, filter.r);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

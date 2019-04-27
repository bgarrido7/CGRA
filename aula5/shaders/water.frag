#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;


void main() {
	vec4 color = texture2D(uSampler,  vTextureCoord+vec2(timeFactor*0.01,timeFactor*0.01));

	gl_FragColor = color;

}
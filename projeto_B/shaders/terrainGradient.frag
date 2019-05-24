#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler3;
uniform sampler2D uSampler2;

void main() {
	
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 altura = texture2D(uSampler2, vTextureCoord); 
	vec4 color2 = texture2D(uSampler3, vec2(0, 1.0-altura.r));

	gl_FragColor = color*0.5 + color2*0.5;
}
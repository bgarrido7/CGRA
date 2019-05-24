#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler3;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 color2 = texture2D(uSampler3, vTextureCoord);

	gl_FragColor = color*0.5 + color2*0.5;
}

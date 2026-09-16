#version 300 es
// One triangle covering the clip-space quad (OGL's Triangle geometry). There is
// no camera and no transform: the fragment shader works from gl_FragCoord.
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}

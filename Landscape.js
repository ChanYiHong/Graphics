var gl;

var numVertices  = 36;

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = [ 0, 0, 0 ];
var thetaLoc;

var vColor;
var colorbufferId1;
var bufferId1;
var bufferId;

var sea = [
  vec2(-1.0, -0.5), 
  vec2(-1.0, -1.0), 
  vec2(0.0, -1.0), 
  vec2(-1.0, -0.5),
  vec2(0.0, -0.5), 
  vec2(0.0, -1.0), 
  vec2(0.0, -0.5),

  vec2(0.0, -1.0),
  vec2(1.0, -0.5),
  vec2(1.0, -0.5),
  vec2(1.0, -1.0),
  vec2(0.0, -1.0)
];

// Wave vertices
var wave = [
  vec2(-0.8, -0.85),
  vec2(-0.4, -0.85),
  vec2(-0.45, -0.71),
  vec2(-0.05, -0.71),
  vec2(0.4,-0.7),
  vec2(0.8,-0.7),
  vec2(0.15,-0.83),
  vec2(0.55,-0.83)
];

// Boat vertices
var boat = [
  vec2(-0.1,-0.81),
  vec2(0.05,-0.81),
  vec2(0.05,-0.92),
  vec2(0.05,-0.81),
  vec2(0.05,-0.92),
  vec2(0.35,-0.81),
  vec2(0.05,-0.92),
  vec2(0.35,-0.92),
  vec2(0.35,-0.81),
  vec2(0.35,-0.92),
  vec2(0.35,-0.81),
  vec2(0.5,-0.81)
];

// Decoration vertices
var deco = [
  vec2(-0.05,-0.85),
  vec2(0.45,-0.85),
  vec2(0.25,-0.81),
  vec2(0.25,-0.58)
];

// Flag vertices
var flag = [
  vec2(0.25,-0.58),
  vec2(0.25,-0.72),
  vec2(0.02,-0.72)
];

var land=
[
  //left
  vec2(-0.77,-0.55),
  vec2(-0.57,-0.55),
  vec2(-0.57,-0.3),

  //middle
  vec2(-0.57,-0.30),
  vec2(-0.57,-0.55),
  vec2(0.8,-0.55),
  vec2(-0.57,-0.3),
  vec2(0.8,-0.3),
  vec2(0.8,-0.55),

  //right
  vec2(0.8,-0.55),
  vec2(0.8,-0.3),
  vec2(1,-0.55)
];

var sky=
[
  vec2(-1,-0.5),
  vec2(-1,1),
  vec2(1,1),
  vec2(-1,-0.5),
  vec2(1,1),
  vec2(1,-0.5)
];

var sun=
[
  vec2(-0.743,0.860),
  vec2(-0.800,0.840),
  vec2(-0.839,0.794),
  vec2(-0.851,0.735),
  vec2(-0.831,0.678),
  vec2(-0.786,0.638),
  vec2(-0.726,0.627),
  vec2(-0.669,0.646),
  vec2(-0.629,0.692),
  vec2(-0.618,0.751),
  vec2(-0.638,0.809),
  vec2(-0.683,0.848)
];

var sun_line=
[
  vec2(-0.834,0.896),
  vec2(-0.834,0.849),
  vec2(-0.787,0.875),

  vec2(-0.623,0.896),
  vec2(-0.676,0.875),
  vec2(-0.632,0.839),

  vec2(-0.55,0.742),
  vec2(-0.598,0.771),
  vec2(-0.599,0.715),

  vec2(-0.634,0.639),
  vec2(-0.682,0.607),
  vec2(-0.632,0.581),

  vec2(-0.767,0.606),
  vec2(-0.825,0.622),
  vec2(-0.810,0.564),

  vec2(-0.874,0.702),
  vec2(-0.882,0.757),
  vec2(-0.926,0.723)
];

var cloud1=
[
  //top
  vec2(-0.29,0.61),
  vec2(-0.29,0.58),
  vec2(-0.11,0.61),
  vec2(-0.11,0.61),
  vec2(-0.11,0.58),
  vec2(-0.29,0.58),

  //middle
  vec2(-0.35,0.58),//s
  vec2(-0.35,0.48),
  vec2(0.03,0.48),
  vec2(-0.35,0.58),
  vec2(0.03,0.58),
  vec2(0.03,0.48),

  //bottom
  vec2(-0.20,0.48),
  vec2(-0.20,0.45),
  vec2(-0.02,0.45),
  vec2(-0.20,0.48),
  vec2(-0.02,0.48),
  vec2(-0.02,0.45)
];

var cloud2=
[
  //top
  vec2(0.41,0.77),
  vec2(0.41,0.74),
  vec2(0.59,0.77),
  vec2(0.41,0.74),
  vec2(0.59,0.77),
  vec2(0.59,0.74),

  vec2(0.35,0.64),
  vec2(0.72,0.64),
  vec2(0.72,0.74),
  vec2(0.35,0.74),
  vec2(0.35,0.64),
  vec2(0.72,0.74),


  //bottom
  vec2(0.5,0.64),
  vec2(0.5,0.61),
  vec2(0.68,0.64),
  vec2(0.68,0.64),
  vec2(0.5,0.61),
  vec2(0.68,0.61)
];

//Decoration (cloud)
var temp=
[
  vec2(0.5,0.64),
  vec2(0.5,0.61),
  vec2(0.68,0.64),
  vec2(0.68,0.64),
  vec2(0.5,0.61),
  vec2(0.68,0.61)
];

var color=
[
  vec4(1,1,1,1),
  vec4(0.864,0.864,0.864,1),
  vec4(0.864,0.864,0.864,1),
  vec4(0.864,0.864,0.864,1),
  vec4(0.864,0.864,0.864,1),
  vec4(0.864,0.864,0.864,1)
];

// leaf
var vertices_leaf =
[
  vec2(-0.02, 0.14),     // leaf_left
  vec2(-0.09, 0.03),   // leaf_left
  vec2(0.03, 0.03),    // leaf_left
  vec2(-0.05, 0.04),   // leaf_left
  vec2(-0.12, -0.08),   // leaf_left
  vec2(0.01,-0.08),    // leaf_left
  vec2(-0.07, -0.07),  // leaf_left
  vec2(-0.14, -0.18),  // leaf_left
  vec2(-0.01, -0.18),  // leaf_left

  vec2(0.67, 0.14),    // leaf_right 
  vec2(0.61, 0.03),     // leaf_right
  vec2(0.75, 0.03),    // leaf_right
  vec2(0.68, 0.04),    // leaf_right
  vec2(0.62, -0.08),    // leaf_right
  vec2(0.76, -0.08),   // leaf_right
  vec2(0.69, -0.07),   // leaf_right
  vec2(0.62, -0.18),   // leaf_right
  vec2(0.77, -0.18)    // leaf_right
];


// tree bottom
var vertices_bottom =
[
  vec2(-0.1, -0.18),
  vec2(-0.1,-0.3), 
  vec2(-0.05,-0.18),  // bottom_left
  vec2(-0.05, -0.18), 
  vec2(-0.1,-0.3), 
  vec2(-0.05,-0.3),  // bottom_left
      
  vec2(0.67, -0.18), 
  vec2(0.67,-0.3), 
  vec2(0.72,-0.18),  // bottom_right
  vec2(0.72, -0.18),
  vec2(0.67,-0.3), 
  vec2(0.72,-0.3) // bottom_right
];

// campfire 
var campfire = 
[
  vec3( -0.5, -0.5,  0.5 ),
  vec3( -0.5,  0.5,  0.5 ),
  vec3(  0.5,  0.5,  0.5 ),
  vec3(  0.5, -0.5,  0.5 ),
  vec3( -0.5, -0.5, -0.5 ),
  vec3( -0.5,  0.5, -0.5 ),
  vec3(  0.5,  0.5, -0.5 ),
  vec3(  0.5, -0.5, -0.5 )
];

// campfire color
var campfire_color = 
[
  vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
  vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
  vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
  vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
  vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
  vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
  vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
  vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

var indices = [
  1, 0, 3,
  3, 2, 1,
  2, 3, 7,
  7, 6, 2,
  3, 0, 4,
  4, 7, 3,
  6, 5, 1,
  1, 2, 6,
  4, 5, 6,
  6, 7, 4,
  5, 4, 0,
  0, 1, 5
];

// hut
var vertices_hut =
[
  vec2(0.12, 0.02), 
  vec2(0.12, -0.32), 
  vec2(0.17, 0.02), //left_pillar
  vec2(0.17, 0.02), 
  vec2(0.12, -0.32), 
  vec2(0.17, -0.32), //left_pillar

  vec2(0.47, 0.02),
  vec2(0.47, -0.32), 
  vec2(0.52, 0.02), //right_pillar
  vec2(0.52, 0.02), 
  vec2(0.47, -0.32), 
  vec2(0.52, -0.32), //right_pillar

  vec2(0.32, 0.16), 
  vec2(0.06, -0.01), 
  vec2(0.59, -0.01), //roof

];

// Colors
var colors_leaf = [
  vec4 (1.0, 1.0, 0.5, 1.0),
  vec4 (1.0, 1.0, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),
    
  vec4 (1.0, 1.0, 0.5, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),

  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),

  vec4 (1.0, 1.0, 0.5, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),

  vec4 (1.0, 1.0, 0.5, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),

  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0),
  vec4 (0.0, 0.6, 0.25, 1.0)
];

var colors_sky = [
  vec4 (1,1,1,1),
  vec4 (0.723,0.901,0.988,1),
  vec4 (0.623,0.901,0.988,1),
      
  vec4 (1,1,0.988,1),
  vec4 (0.623,0.901,0.988,1),
  vec4 (0.623,0.901,0.988,1)
];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // Vertices ----------------------------------

    

    ///////////////////////////////////////

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height);

    // background
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );

    //  Load shaders and initialize attribute buffers

    /*
    * 단색 그리기
    */
    //단색 program
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    
    //그라데이션 program
    var program1 = initShaders( gl, "vertex-shader1", "fragment-shader1" );

    gl.useProgram (program1);


    ////////////// Define for program 1 

    // Load the data into the GPU
    bufferId1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId1 );
    //gl.bufferData(gl.ARRAY_BUFFER, flatten(temp), gl.STATIC_DRAW );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sky), gl.STATIC_DRAW );


    // Associate out shader variables with our data buffer
    var vPosition1 = gl.getAttribLocation( program1, "vPosition1" );
    gl.vertexAttribPointer( vPosition1, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition1 );

    colorbufferId1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorbufferId1 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors_sky), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vColor1 = gl.getAttribLocation( program1, "vColor1" );
    gl.vertexAttribPointer( vColor1, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor1 );


    var program2 = initShaders( gl, "vertex-shader2", "fragment-shader2" );
    gl.useProgram( program2 );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // color array atrribute buffer

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(campfire_color), gl.STATIC_DRAW );

    var vColor2 = gl.getAttribLocation( program2, "vColor2" );
    gl.vertexAttribPointer( vColor2, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor2 );

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(campfire), gl.STATIC_DRAW );

    var vPosition2 = gl.getAttribLocation( program2, "vPosition2" );
    gl.vertexAttribPointer( vPosition2, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );

    thetaLoc = gl.getUniformLocation(program2, "theta");

    /////////////////////////////////Define for Program
    gl.useProgram (program);

    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );


    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
   

    vColor=gl.getUniformLocation(program,"fColor");


    //////////////////////////////////////draw start
    

    render();

}
function render()
{

  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //하늘 그리기
  gl.drawArrays(gl.TRIANGLES,0,6);

  //sea
  gl.bufferData(gl.ARRAY_BUFFER, flatten(sea), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[0.227,0.709,1,1]);
  gl.drawArrays(gl.TRIANGLES,0,12);

  // wave 
  gl.bufferData( gl.ARRAY_BUFFER,flatten(wave), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,1,1,1]);
  gl.drawArrays( gl.LINES, 0, 8);

  //boat
  gl.bufferData( gl.ARRAY_BUFFER,flatten(boat), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,1,1,1]);
  gl.drawArrays( gl.TRIANGLES,0,12);

  

  gl.bufferData( gl.ARRAY_BUFFER,flatten(deco), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[0.137255 , 0.137255 , 0.556863, 1.0]);
  gl.drawArrays( gl.LINES,0,4);

  gl.bufferData( gl.ARRAY_BUFFER,flatten(flag), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[0.137255 , 0.137255 , 0.556863, 1.0]);
  gl.drawArrays( gl.TRIANGLES,0,3);





  //land
  gl.bufferData( gl.ARRAY_BUFFER,flatten(land), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,0.859,0.823,1]);
  gl.drawArrays(gl.TRIANGLES,0,12);

  //sun
  gl.bufferData( gl.ARRAY_BUFFER,flatten(sun), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,0,0,1]);
  gl.drawArrays(gl.TRIANGLE_FAN,0,12);

  gl.bufferData( gl.ARRAY_BUFFER,flatten(sun_line), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,0,0,1]);
  gl.drawArrays(gl.TRIANGLES,0,18);

  //cloud 1
  gl.bufferData( gl.ARRAY_BUFFER,flatten(cloud1), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,1,1,1]);
  gl.drawArrays(gl.TRIANGLES,0,18);

  //cloud 2
  gl.bufferData( gl.ARRAY_BUFFER,flatten(cloud2), gl.STATIC_DRAW );
  gl.uniform4fv(vColor,[1,1,1,1]);
  gl.drawArrays(gl.TRIANGLES,0,12);


  // hut
  gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices_hut), gl.STATIC_DRAW );

  // pillar
  gl.uniform4fv(vColor,[0.71, 0.3, 0.05, 1.0]);
  gl.drawArrays( gl.TRIANGLES, 0, 12 );

  // roof 
  gl.uniform4fv(vColor,[0.81, 0.4, 0.05, 1.0]);
  gl.drawArrays( gl.TRIANGLES, 12, 3 );

  // middle 
  gl.uniform4fv(vColor,[0.51, 0.2, 0.05, 1.0]);
  gl.drawArrays( gl.TRIANGLES, 15, 12 );
  
  // tree bottom
  gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices_bottom), gl.STATIC_DRAW );
  gl.drawArrays( gl.TRIANGLES, 0, 12 );


 /////////////////////////////Program 1
  

  // cloud decoration
  gl.bindBuffer( gl.ARRAY_BUFFER, colorbufferId1 );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW );

  gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(temp), gl.STATIC_DRAW );

  gl.drawArrays(gl.TRIANGLES,0,6);

  // tree leaf 
  gl.bindBuffer( gl.ARRAY_BUFFER, colorbufferId1 );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(colors_leaf), gl.STATIC_DRAW );

  gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices_leaf), gl.STATIC_DRAW );

  gl.drawArrays( gl.TRIANGLES, 0, 18 );
    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render );
}
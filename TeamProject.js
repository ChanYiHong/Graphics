var gl;
var points;

var points = [];
var colors = [];
var temp = [];
var totalPoints = [];
var totalColors = [];
var points2d = [];
var colors2d = [];

var vBuffer;
var cBuffer;
var myCube;
var mySphere;
var moon;
var sky;
var sunIndex = 0;
var moonIndex = 0;
var moonLocationX = 0.9;
var moonLocationY = 0.38
var sunLocationX = 0.7;
var sunLocationY = 0.7;
var click = 0;

var can;
var fish;

var Fcount = 0;
var Ccount = 0;
var alpha = 0.05;
var Fx = -0.73;
var Fy = -0.8;
var Cx = -0.73;
var Cy = -0.8;
var ramdom;

window.onload = function init() {
  temp = [
    vec4(-1, -0.5, 0, 1.0), vec4(-1, 1, 0, 1.0),
    vec4(1.0, 1.0, 0, 1.0), vec4(-1, -0.5, 0, 1.0),
    vec4(1.0, 1.0, 0, 1.0), vec4(1, -0.5, 0, 1.0),
    vec4(1.0, 1, 1, 1)
  ];
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  sky = [

    vec4(-1, -0.5, 0, 1), vec4(-1, 0.25, 0, 1.0),
    vec4(1.0, 0.25, 0, 1.0), vec4(-1, -0.5, 0, 1),
    vec4(1, -0.5, 0, 1.0), vec4(1.0, 0.25, 0, 1.0),
    vec4(-1, 0.25, 0, 1), vec4(-1, 1, 0, 1),
    vec4(1, 1, 0, 1), vec4(-1, 0.25, 0, 1),
    vec4(1, 1, 0, 1), vec4(1, 0.25, 0, 1),



  ];

  var skyColor = [
    vec4(1, 1, 1, 1), vec4(0.723, 0.901, 0.988, 1),
    vec4(0.623, 0.901, 0.988, 1), vec4(1, 1, 1, 1),
    vec4(0.623, 0.901, 0.988, 1), vec4(0.623, 0.901, 0.988, 1),
    vec4(0.723, 0.901, 0.988, 1), vec4(0.723, 0.901, 0.988, 1),
    vec4(0.623, 0.901, 0.988, 1), vec4(0.723, 0.901, 0.988, 1),
    vec4(0.623, 0.901, 0.988, 1), vec4(0.623, 0.901, 0.988, 1)
  ];

  var sea = [
    vec4(-1.0, -0.5, 0, 1.0), vec4(-1.0, -1.0, 0, 1.0),
    vec4(0.0, -1.0, 0, 1.0), vec4(-1.0, -0.5, 0, 1.0),
    vec4(0.0, -0.5, 0, 1.0), vec4(0.0, -1.0, 0, 1.0),
    vec4(0.0, -0.5, 0, 1.0), vec4(0.0, -1.0, 0, 1.0),
    vec4(1.0, -0.5, 0, 1.0), vec4(1.0, -0.5, 0, 1.0),
    vec4(1.0, -1.0, 0, 1.0), vec4(0.0, -1.0, 0, 1.0)
  ];

  var seaColor = [
    vec4(0.227, 0.9, 1, 1), vec4(0.227, 0.709, 1, 1),
    vec4(0.227, 0.709, 1, 1), vec4(0.227, 0.9, 1, 1),
    vec4(0.227, 0.709, 1, 1), vec4(0.227, 0.709, 1, 1),
    vec4(0.227, 0.709, 1, 1), vec4(0.227, 0.709, 1, 1),
    vec4(0.227, 0.709, 1, 1), vec4(0.227, 0.709, 1, 1),
    vec4(0.227, 0.709, 1, 1), vec4(0.227, 0.709, 1, 1)
  ];

  var boat = [
    vec4(-0.1, -0.81, 0, 1.0), vec4(0.05, -0.81, 0, 1.0),
    vec4(0.05, -0.92, 0, 1.0), vec4(0.05, -0.81, 0, 1.0),
    vec4(0.05, -0.92, 0, 1.0), vec4(0.35, -0.81, 0, 1.0),
    vec4(0.05, -0.92, 0, 1.0), vec4(0.35, -0.92, 0, 1.0),
    vec4(0.35, -0.81, 0, 1.0), vec4(0.35, -0.92, 0, 1.0),
    vec4(0.35, -0.81, 0, 1.0), vec4(0.5, -0.81, 0, 1.0)
  ];

  var boatColor = [
    vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0)
  ];


  var flag = [
    vec4(0.25, -0.58, 0, 1.0), vec4(0.25, -0.72, 0, 1.0),
    vec4(0.02, -0.72, 0, 1.0),

    //deco
    vec4(-0.05, -0.85, 0, 1.0), vec4(0.45, -0.85, 0, 1.0),
    vec4(0.01, -0.89, 0, 1), vec4(0.45, -0.85, 0, 1.0),
    vec4(0.01, -0.89, 0, 1), vec4(0.39, -0.89, 0, 1),

    vec4(0.25, -0.81, 0, 1.0), vec4(0.26, -0.81, 0, 1.0),
    vec4(0.25, -0.58, 0, 1.0), vec4(0.26, -0.81, 0, 1.0),
    vec4(0.25, -0.58, 0, 1.0), vec4(0.26, -0.58, 0, 1)
  ];

  var flagColor = [
    vec4(0.13, 0.13, 0.55, 1), vec4(0.13, 0.13, 0.55, 1),
    vec4(0.13, 0.13, 0.55, 1),

    vec4(0.13, 0.13, 0.55, 1), vec4(0.13, 0.13, 0.55, 1),
    vec4(0.13, 0.13, 0.55, 1), vec4(0.13, 0.13, 0.55, 1),
    vec4(0.13, 0.13, 0.55, 1), vec4(0.13, 0.13, 0.55, 1),

    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1)

  ];

  var land = [
    vec4(-0.77, -0.55, 0, 1.0), vec4(-0.57, -0.55, 0, 1.0),
    vec4(-0.57, -0.3, 0, 1.0), vec4(-0.57, -0.30, 0, 1.0),
    vec4(-0.57, -0.55, 0, 1.0), vec4(0.8, -0.55, 0, 1.0),
    vec4(-0.57, -0.3, 0, 1.0), vec4(0.8, -0.3, 0, 1.0),
    vec4(0.8, -0.55, 0, 1.0), vec4(0.8, -0.55, 0, 1.0),
    vec4(0.8, -0.3, 0, 1.0), vec4(1, -0.55, 0, 1.0)
  ];

  var landColor = [
    vec4(1, 0.859, 0.823, 1), vec4(1, 0.859, 0.823, 1),
    vec4(1, 0.859, 0.823, 1), vec4(1, 0.859, 0.823, 1),
    vec4(1, 0.859, 0.823, 1), vec4(1, 0.859, 0.823, 1),
    vec4(1, 0.859, 0.823, 1), vec4(1, 0.859, 0.823, 1),
    vec4(1, 0.859, 0.823, 1), vec4(1, 0.859, 0.823, 1),
    vec4(1, 0.859, 0.823, 1), vec4(1, 0.859, 0.823, 1)
  ];
  var cloud = [
    vec4(-0.79, 0.61, 0, 1.0), vec4(-0.79, 0.58, 0, 1.0),
    vec4(-0.61, 0.61, 0, 1.0), vec4(-0.61, 0.61, 0, 1.0),
    vec4(-0.61, 0.58, 0, 1.0), vec4(-0.79, 0.58, 0, 1.0),
    vec4(-0.85, 0.58, 0, 1.0), vec4(-0.85, 0.48, 0, 1.0),
    vec4(-0.47, 0.48, 0, 1.0), vec4(-0.85, 0.58, 0, 1.0),
    vec4(-0.47, 0.58, 0, 1.0), vec4(-0.47, 0.48, 0, 1.0),
    vec4(-0.70, 0.48, 0, 1.0), vec4(-0.70, 0.45, 0, 1.0),
    vec4(-0.52, 0.45, 0, 1.0), vec4(-0.70, 0.48, 0, 1.0),
    vec4(-0.52, 0.48, 0, 1.0), vec4(-0.52, 0.45, 0, 1.0),

    vec4(-0.09, 0.77, 0, 1.0), vec4(-0.09, 0.74, 0, 1.0),
    vec4(0.09, 0.77, 0, 1.0), vec4(-0.09, 0.74, 0, 1.0),
    vec4(0.09, 0.77, 0, 1.0), vec4(0.09, 0.74, 0, 1.0),
    vec4(-0.15, 0.64, 0, 1.0), vec4(0.22, 0.64, 0, 1.0),
    vec4(0.22, 0.74, 0, 1.0), vec4(-0.15, 0.74, 0, 1.0),
    vec4(-0.15, 0.64, 0, 1.0), vec4(0.22, 0.74, 0, 1.0),
    vec4(0.0, 0.64, 0, 1.0), vec4(0.0, 0.61, 0, 1.0),
    vec4(0.18, 0.64, 0, 1.0), vec4(0.18, 0.64, 0, 1.0),
    vec4(0.0, 0.61, 0, 1.0), vec4(0.18, 0.61, 0, 1.0)
  ];

  var cloudColor = [
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),

    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1), vec4(1, 1, 1, 1)
  ]

  var tree = [
    // tree bottom
    vec4(-0.1, -0.18, 0, 1.0), vec4(-0.1, -0.3, 0, 1.0),
    vec4(-0.05, -0.18, 0, 1.0), vec4(-0.05, -0.18, 0, 1.0),
    vec4(-0.1, -0.3, 0, 1.0), vec4(-0.05, -0.3, 0, 1.0),
    vec4(0.67, -0.18, 0, 1.0), vec4(0.67, -0.3, 0, 1.0),
    vec4(0.72, -0.18, 0, 1.0), vec4(0.72, -0.18, 0, 1.0),
    vec4(0.67, -0.3, 0, 1.0), vec4(0.72, -0.3, 0, 1.0),

    // tree leaf
    vec4(-0.02, 0.14, 0, 1.0), vec4(-0.09, 0.03, 0, 1.0),
    vec4(0.03, 0.03, 0, 1.0), vec4(-0.05, 0.04, 0, 1.0),
    vec4(-0.12, -0.08, 0, 1.0), vec4(0.01, -0.08, 0, 1.0),
    vec4(-0.07, -0.07, 0, 1.0), vec4(-0.14, -0.18, 0, 1.0),
    vec4(-0.01, -0.18, 0, 1.0), vec4(0.67, 0.14, 0, 1.0),
    vec4(0.61, 0.03, 0, 1.0), vec4(0.75, 0.03, 0, 1.0),
    vec4(0.68, 0.04, 0, 1.0), vec4(0.62, -0.08, 0, 1.0),
    vec4(0.76, -0.08, 0, 1.0), vec4(0.69, -0.07, 0, 1.0),
    vec4(0.62, -0.18, 0, 1.0), vec4(0.77, -0.18, 0, 1.0)
  ]

  var treeColor = [
    vec4(0.51, 0.2, 0.05, 1.0), vec4(0.51, 0.2, 0.05, 1.0),
    vec4(0.51, 0.2, 0.05, 1.0), vec4(0.51, 0.2, 0.05, 1.0),
    vec4(0.51, 0.2, 0.05, 1.0), vec4(0.51, 0.2, 0.05, 1.0),
    vec4(0.51, 0.2, 0.05, 1.0), vec4(0.51, 0.2, 0.05, 1.0),
    vec4(0.51, 0.2, 0.05, 1.0), vec4(0.51, 0.2, 0.05, 1.0),
    vec4(0.51, 0.2, 0.05, 1.0), vec4(0.51, 0.2, 0.05, 1.0),

    //leaf
    vec4(1.0, 1.0, 0.5, 1.0), vec4(1.0, 1.0, 0.25, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(1.0, 1.0, 0.5, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(0.0, 0.6, 0.25, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(0.0, 0.6, 0.25, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(1.0, 1.0, 0.5, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(0.0, 0.6, 0.25, 1.0),
    vec4(1.0, 1.0, 0.5, 1.0), vec4(0.0, 0.6, 0.25, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(0.0, 0.6, 0.25, 1.0),
    vec4(0.0, 0.6, 0.25, 1.0), vec4(0.0, 0.6, 0.25, 1.0)
  ]

  var hut = [
    //pillar
    vec4(0.12, 0.02, 0, 1.0), vec4(0.12, -0.32, 0, 1.0),
    vec4(0.17, 0.02, 0, 1.0), vec4(0.17, 0.02, 0, 1.0),
    vec4(0.12, -0.32, 0, 1.0), vec4(0.17, -0.32, 0, 1.0),
    vec4(0.47, 0.02, 0, 1.0), vec4(0.47, -0.32, 0, 1.0),
    vec4(0.52, 0.02, 0, 1.0), vec4(0.52, 0.02, 0, 1.0),
    vec4(0.47, -0.32, 0, 1.0), vec4(0.52, -0.32, 0, 1.0),

    //roof
    vec4(0.32, 0.16, 0, 1.0), vec4(0.06, -0.01, 0, 1.0),
    vec4(0.59, -0.01, 0, 1.0)
  ]

  var hutColor = [
    vec4(0.71, 0.3, 0.05, 1.0), vec4(0.71, 0.3, 0.05, 1.0),
    vec4(0.71, 0.3, 0.05, 1.0), vec4(0.71, 0.3, 0.05, 1.0),
    vec4(0.71, 0.3, 0.05, 1.0), vec4(0.71, 0.3, 0.05, 1.0),
    vec4(0.71, 0.3, 0.05, 1.0), vec4(0.71, 0.3, 0.05, 1.0),
    vec4(0.71, 0.3, 0.05, 1.0), vec4(0.71, 0.3, 0.05, 1.0),
    vec4(0.71, 0.3, 0.05, 1.0), vec4(0.71, 0.3, 0.05, 1.0),
    vec4(0.81, 0.4, 0.05, 1.0), vec4(0.81, 0.4, 0.05, 1.0),
    vec4(0.81, 0.4, 0.05, 1.0)
  ]

  var fishing = [
    vec4(-0.55,-0.3, 0 ,1.0),  vec4(-0.5,-0.3, 0 ,1.0),
    vec4(-0.75,-0.1, 0, 1.0),  vec4(-0.75, -0.1, 0, 1.0),
    vec4(-0.75,-0.5, 0, 1.0),  vec4(-0.758, -0.5, 0, 1.0)
  ]

  var fishing_color = [
    vec4(0.51, 0.2, 0.05, 1.0),  vec4(0.51, 0.2, 0.05, 1.0),
    vec4(0.51, 0.2, 0.05, 1.0),  vec4(0, 0, 0, 1.0),
    vec4(0, 0, 0, 1.0),  vec4(0, 0, 0, 1.0)
  ]


  var sunColor = [];
  for (var i = 0; i < 192 * 4; i++) {
    if (i % 2 == 0) {
      var tempColor = vec4(1, 0.501, 0.25, 1);
      sunColor.push(tempColor);
    } else {
      var tempColor = vec4(1, 0.301, 0, 1);
      sunColor.push(tempColor);
    }
  }

  var moonColor = [];
  for (var i = 0; i < 192 * 4; i++) {
    if (i % 2 == 0) {
      var tempColor = vec4(0.956, 0.956, 0.325, 1);
      moonColor.push(tempColor);
    } else {
      var tempColor = vec4(0.956, 0.656, 0.325, 1);
      moonColor.push(tempColor);
    }
  }
  //  Configure WebGL

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers
  //---------------------------------------------------------------------
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  //gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  //---------------------------------------------------------------------
  cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  //gl.bufferData( gl.ARRAY_BUFFER, flatten(colors2d), gl.STATIC_DRAW );

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  ////////////////////////////////////////////////////

  //2차원 좌표
  points2d = sky;
  colors2d = skyColor;

  points2d = points2d.concat(sea);
  colors2d = colors2d.concat(seaColor);

  points2d = points2d.concat(boat);
  colors2d = colors2d.concat(boatColor);

  points2d = points2d.concat(flag);
  colors2d = colors2d.concat(flagColor);

  points2d = points2d.concat(land);
  colors2d = colors2d.concat(landColor);



  points2d = points2d.concat(tree);
  colors2d = colors2d.concat(treeColor);

  points2d = points2d.concat(hut);
  colors2d = colors2d.concat(hutColor);

  points2d = points2d.concat(cloud);
  colors2d = colors2d.concat(cloudColor);

  points2d = points2d.concat(fishing);
  colors2d = colors2d.concat(fishing_color);
    
  pushBuffer();

  document.getElementById("moonButton").onclick = function() {

    if (moonIndex == 0) {
      moon = sphere();
      moon.scale(0.2, 0.2, 0.2);
      moon.translate(0.9, 0.38, 0, 1);
      colors = moonColor;
      points = moon.TriangleVertices;
      pushBuffer();
    }

    setTimeout(function() {
      moonIndex += 1;
      moon.translate(-0.9, -0.38, 0);
      moon.rotate(45.0, [1, 1, 1]);
      moonLocationX -= 0.03;
      moonLocationY += 0.08;
      moon.translate(moonLocationX, moonLocationY, 0);
      colors = colors.concat(moonColor);
      points = moon.TriangleVertices;
      //colors = mySphere.TriangleVertexColors;
      pushBuffer();
      if (moonIndex <= 2) {
        document.getElementById("moonButton").click();
      }
    }, 500);
  };

  mySphere = sphere();
  mySphere.scale(0.2, 0.2, 0.2);
  mySphere.rotate(90.0, [1, 1, 1]);
  mySphere.translate(0.65, 0.7, 0);

  //colors = colors.concat(mySphere.TriangleVertexColors);
  colors = colors.concat(sunColor);
  points = points.concat(mySphere.TriangleVertices);

  pushBuffer();


  document.getElementById("yButton").onclick = function() {
    if (click == 0) {
      var skyColor1 = [
        vec4(1, 1, 1, 1), vec4(1, 0.525, 0.572, 1),
        vec4(1, 0.733, 0.756, 1), vec4(1, 1, 1, 1),
        vec4(1, 0.733, 0.756, 1), vec4(1, 0.733, 0.756, 1),
        vec4(1, 0.525, 0.572, 1), vec4(1, 0.525, 0.572, 1),
        vec4(1, 0.733, 0.756, 1), vec4(1, 0.525, 0.572, 1),
        vec4(1, 0.733, 0.756, 1), vec4(1, 0.733, 0.756, 1)
      ];
      var skyColor2 = [
        vec4(0.635, 0.686, 0.784, 1), vec4(0.635, 0.686, 0.784, 1),
        vec4(0.635, 0.686, 0.784, 1), vec4(0.635, 0.686, 0.784, 1),
        vec4(0.635, 0.686, 0.784, 1), vec4(0.635, 0.686, 0.784, 1),
        vec4(0.635, 0.686, 0.784, 1), vec4(0.635, 0.686, 0.784, 1),
        vec4(0.635, 0.686, 0.784, 1), vec4(0.635, 0.686, 0.784, 1),
        vec4(0.635, 0.686, 0.784, 1), vec4(0.635, 0.686, 0.784, 1)
      ];
      var skyColor3 = [
        vec4(0.174, 0.125, 0.243, 1), vec4(0.174, 0.125, 0.243, 1),
        vec4(0.174, 0.125, 0.243, 1), vec4(0.174, 0.125, 0.243, 1),
        vec4(0.174, 0.125, 0.243, 1), vec4(0.174, 0.125, 0.243, 1),
        vec4(0.174, 0.125, 0.243, 1), vec4(0.174, 0.125, 0.243, 1),
        vec4(0.174, 0.125, 0.243, 1), vec4(0.174, 0.125, 0.243, 1),
        vec4(0.174, 0.125, 0.243, 1), vec4(0.174, 0.125, 0.243, 1),
      ]

      var sunDraw = setTimeout(function() {

        points2d = points2d.slice(sky.length);
        colors2d = colors2d.slice(skyColor.length);
        // add sky in fornt
        var point_temp = [];
        point_temp = sky;
        point_temp = point_temp.concat(points2d);
        points2d = point_temp;

        switch (sunIndex) {
          case 0:
            point_temp = skyColor1;
            break;
          case 1:
            point_temp = skyColor1;
            break;
          case 2:
            point_temp = skyColor2;
            cloudIndex = 1;
            break;
          case 3:
            point_temp = skyColor3;
            break;

          default:
            point_temp = skyColor3;

        }
        point_temp = point_temp.concat(colors2d);
        colors2d = point_temp;

        //colors2d.unshift(skyColor);
        ///alert(points2d.length);
        sunIndex += 1;
        mySphere.translate(-0.7, -0.7, 0);
        mySphere.rotate(45.0, [1, 1, 1]);
        sunLocationX += 0.05;
        sunLocationY -= 0.08;
        mySphere.translate(sunLocationX, sunLocationY, 0);
        colors = colors.concat(sunColor);
        points = mySphere.TriangleVertices;
        //colors = mySphere.TriangleVertexColors;
        pushBuffer();
        if (sunIndex <= 4) {
          document.getElementById("yButton").click();
        } else {
          document.getElementById("moonButton").click();
          click = 1;

        }
      }, 500);
    };
  }

  document.getElementById( "zButton" ).onclick = function () {
        
    document.getElementById("zButton").disabled = true;
    
    random = Math.floor(Math.random()*10);
        
    fish = sphere();
    fish.scale(0.2, 0.1, 0.1);
    fish.rotate(45.0, [1,1,1]);
    fish.translate(Fx, Fy, 0);
        
    //768
    var tColor = fish.TriangleVertexColors;
    for (var cr=0; cr< 399; cr++){
        tColor [cr] = vec4 (0.1, 0.1, 0.65, 1.0);
    }
    for (var cr=768-399; cr<tColor.length; cr++){
        tColor [cr] = vec4 (0.1, 0.1, 0.55, 1.0);
    }
        
    colors = tColor;
    points = fish.TriangleVertices;
        
        
    can = cylinder();
        
    can.scale(0.2, 0.2, 0.2);
    can.rotate(45.0, [1,1,1]);
    can.translate(Cx, Cy, 0);
        
    var tColor2 = can.TriangleVertexColors;
    for (var cr=0; cr< tColor2.length-216; cr++){
        tColor2 [cr] = vec4 (0.3, 0.8, 0.25, 1.0);
    }
    for (var cr=432-216; cr < 432; cr++){
        tColor2 [cr] = vec4 (0.4, 0.3, 0.3, 1.0);
    }
        
    colors = tColor2;
    points = can.TriangleVertices;
    
    Fcount =0;
    Ccount =0;
    
    var refreshIntervalId = 0;
        
    
    
    if (random >= 0 && random <5){
        
        refreshIntervalId = setInterval(function(){
                    
            if(Ccount==5){
                can.translate(Cx, Cy, -5);
                    
                colors = can.TriangleVertexColors;
                points = can.TriangleVertices;
                    
                pushBuffer();
                    
                    
                //can.translate(-Cx,-Cy,+5);
                Cx = -0.73;
                Cy = -0.8;
                //translate(0, -5*alpha, 0);
                Ccount = 0;
                clearInterval(refreshIntervalId);
                //break;
                document.getElementById("zButton").disabled = false;
            }
                    
            else{
                Cy += alpha;
            
                can.translate(-Cx, -Cy, 0);
                can.rotate(45.0, [1,1,1]);
                can.translate(Cx, Cy, 0);
                can.translate(0, alpha, 0);
            
                Ccount ++;
            
                colors = can.TriangleVertexColors;
                points = can.TriangleVertices;
            
                pushBuffer();
            }
        },300)
    }
    else{
        
        refreshIntervalId = setInterval(function(){
       
            if(Fcount == 5){
                fish.translate(Fx, Fy, -5);
                    
                colors = fish.TriangleVertexColors;
                points = fish.TriangleVertices;
                    
                pushBuffer();
                    
                //fish.translate(-Fx,-Fy,+5);
                Fx = -0.73;
                Fy = -0.8;
                //translate(0, -5*alpha, 0);
                Fcount = 0;
                clearInterval(refreshIntervalId);
                //break;
                document.getElementById("zButton").disabled = false;
            }
            else{
        
                //Fx += alpha;
                Fy += alpha;
                
                fish.translate(-Fx, -Fy, 0);
                fish.rotate(45.0, [1,1,1]);
                fish.translate(Fx, Fy, 0);
                fish.translate(0, alpha, 0);
                
                Fcount ++;
                
                colors = fish.TriangleVertexColors;
                points = fish.TriangleVertices;
                
                pushBuffer();
            }
            
        },300)
        
    }
};


};




//wait function
function sleep(milliseconds) {
  let timeStart = new Date().getTime();
  while (true) {
    let elapsedTime = new Date().getTime() - timeStart;
    if (elapsedTime > milliseconds) {
      break;
    }
  }
}

function pushBuffer() {
  totalPoints = points2d;
  totalColors = colors2d;

  for (var i = 0; i < points.length; i++) {
    totalPoints.push(points[i]);
    totalColors.push(colors[i]);
  }


  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(totalPoints), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(totalColors), gl.STATIC_DRAW);

  render();

}


function render() {

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, totalColors.length);
}

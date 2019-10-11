
var gl;
var points;

// 브라우저가 생겨나면 생기는 이벤트. Window Object의 onload 이벤트.
window.onload = function init()
{
    // Html에서 지정한 canvas object를 가져온다.
    var canvas = document.getElementById( "gl-canvas" );
    
    // 그려질 canvas와 webGL과 연동되는 부분.
    gl = WebGLUtils.setupWebGL( canvas );
    // 만약 연동이 안되면 알림 팝업
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // 점들을 입력하는 곳.
    // vec2 (2차원 벡터) 함수를 이용하면 
    var vertices1 = [
        vec2(0.0, 1.0), // v0
        vec2(-0.5, 0.5), // v1
        vec2(0.5, 0.5), // v2
        vec2(0.0, 0.5), // v3
        vec2(-0.5, 0.0), // v4
        vec2(0.5, 0.0), // v5
        vec2(0.0, 0.0),
        vec2(-0.5, -0.5),
        vec2(0.5, -0.5)
    ];

    var vertices2 = [
        vec2(-0.125, -0.5),
        vec2(-0.125, -1.0),
        vec2(0.125,-1.0),
        vec2(-0.125, -0.5),
        vec2(0.125,-0.5),
        vec2(0.125,-1.0)
    ]
    //var vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);


    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program1 = initShaders( gl, "vertex-shader", "fragment-shader1" );
    gl.useProgram( program1 );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices1), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //var colorGreen = vec4(0.0,1.0,0.0,1.0);
    //colorLoc = gl.getUniformLocation(program, "colorGreen");
    //gl.uniform4f(colorLoc,colorGreen);

    render1();

    var program2 = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program2 );
    
    // Load the data into the GPU
    
    //var bufferId = gl.createBuffer();
    //gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices2), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    //var vPosition = gl.getAttribLocation( program, "vPosition" );
    //gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    //gl.enableVertexAttribArray( vPosition );

    //var colorBrown  = vec4(1.0,0.0,0.0,1.0);
    //colorLoc = gl.getUniformLocation(program, "colorBrown");
    //gl.uniform4f(colorLoc,colorBrown);

    render2();

};


function render1() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 9);
}

function render2() {
    
    gl.drawArrays( gl.TRIANGLES, 0, 6);
}

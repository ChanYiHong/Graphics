
var gl;
var points;

// Event raised when a browser pops up. Onload event of the Window object.
window.onload = function init()
{
    // Gets the canvas object specified in HTML.
    var canvas = document.getElementById( "gl-canvas" );
    
    // Interact between canvas and webGL
    gl = WebGLUtils.setupWebGL( canvas );

    // If it doesn't work, notification pop up
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // Sea vertices
    var vertices1 = [
        vec2(-1.0, -0.5), // v0
        vec2(-1.0, -1.0), // v1
        vec2(0.0, -1.0), // v2
        vec2(-1.0, -0.5), // v3
        vec2(0.0, -0.5), // v4
        vec2(0.0, -1.0), // v5
        vec2(0.0, -0.5),
        vec2(0.0, -1.0),
        vec2(1.0, -0.5),
        vec2(1.0, -0.5),
        vec2(1.0, -1.0),
        vec2(0.0, -1.0)
    ];

    // Wave vertices
    var vertices2 = [
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
    var vertices3 = [
        vec2(-0.9,-0.51),
        vec2(-0.75,-0.51),
        vec2(-0.75,-0.62),
        vec2(-0.75,-0.51),
        vec2(-0.75,-0.62),
        vec2(-0.45,-0.51),
        vec2(-0.75,-0.62),
        vec2(-0.45,-0.62),
        vec2(-0.45,-0.51),
        vec2(-0.45,-0.62),
        vec2(-0.45,-0.51),
        vec2(-0.3,-0.51)
    ];

    // Decoration vertices
    var vertices4 = [
        vec2(-0.85,-0.55),
        vec2(-0.35,-0.55),
        vec2(-0.55,-0.51),
        vec2(-0.55,-0.28)
    ];

    // Flag vertices
    var vertices5 = [
        vec2(-0.55,-0.28),
        vec2(-0.55,-0.42),
        vec2(-0.78,-0.42)
    ]
    //var vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);


    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 0.8, 1.0 );
    
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

    gl.clear( gl.COLOR_BUFFER_BIT );
    // Draw a shape
    gl.drawArrays( gl.TRIANGLES, 0, 12);

    // Load shaders and initialize attribute buffers
    var program2 = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program2 );
    
    // Load the data into the GPU
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices2), gl.STATIC_DRAW )

    // Draw a shape
    gl.drawArrays( gl.LINES, 0, 8);

    // Load shaders and initialize attribute buffers
    var program3 = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program3 );

    // Load the data into the GPU
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices3), gl.STATIC_DRAW );

    // Draw a shape
    gl.drawArrays( gl.TRIANGLES, 0, 12);

    // Load shaders and initialize attribute buffers
    var program4 = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program4 );

    // Load the data into the GPU
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices4), gl.STATIC_DRAW );

    // Draw a shape
    gl.drawArrays( gl.LINES, 0, 4);

    // Load shaders and initialize attribute buffers
    var program5 = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program5 );

    // Load the data into the GPU
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices5), gl.STATIC_DRAW );

    // Draw a shape
    gl.drawArrays( gl.TRIANGLES, 0, 3);

};

/**
 * 绘制点
 * @param ctx canvas上下文
 * @param x x坐标
 * @param y y坐标
 * @param color 颜色
 */
function drawPixel(ctx,x,y,color) {
    const height = ctx.canvas.height;
    y = height - y;
    // 坐标原点在左下角
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

/**
 * 绘制线
 * @param ctx  canvas上下文
 * @param x0   起始x坐标
 * @param y0   起始y坐标
 * @param x1   结束x坐标
 * @param y1   结束y坐标
 * @param color 颜色
 */
function drawLine(ctx,x0,y0,x1,y1,color) {
    var steep = false; 
    
    if (Math.abs(x0-x1)<Math.abs(y0-y1)) { 
        var tmp = x0;
        x0 = y0;
        y0 = tmp;

        tmp = x1;
        x1 = y1;
        y1 = tmp
        steep = true; 
    } 
    if (x0>x1) { 
        var tmp = x0;
        x0 = x1;
        x1 = tmp;

        tmp = y0;
        y0 = y1;
        y1 = tmp;
    } 
    var dx = x1-x0; 
    var dy = y1-y0; 
    var derror2 = Math.abs(dy)*2; 
    var error2 = 0; 
    var y = y0; 
    for (var x=x0; x<=x1; x++) { 
        if (steep) { 
            drawPixel(ctx,y,x,color);
        } else { 
            drawPixel(ctx,x,y,color);
        } 
        error2 += derror2; 
        if (error2 > dx) { 
            y += (y1>y0?1:-1); 
            error2 -= dx*2; 
        } 
    }
}

/**
 * 绘制三角形（填充）
 * @param {*} ctx 
 * @param {*} t0 
 * @param {*} t1 
 * @param {*} t2 
 * @param {*} color 
 */
function drawTriangle(ctx,A,B,C,color){
    if (A.y>B.y) {
        var tmp = A;
        A = B;
        B = tmp;
    }
    if (A.y>C.y) {
        var tmp = A;
        A = C;
        C = tmp;
    } 
    if (B.y>C.y) {
        var tmp = B;
        B = C;
        C = tmp;
    } 

    var dx1 =0;
    var dx2 =0;
    var dx3 =0;
    if (B.y-A.y > 0)
    {
        dx1=(B.x-A.x)/(B.y-A.y) 
    }
    else{
        dx1=0;
    } 
    if (C.y-A.y > 0) 
    {
        dx2=(C.x-A.x)/(C.y-A.y) 
    }
    else{
        dx2=0;
    } 
    if (C.y-B.y > 0)
    {
        dx3=(C.x-B.x)/(C.y-B.y)
    }
    else{
        dx3=0;
    }

    for(var y = A.y; y <= B.y; y++){
        var xInAB = dx1 * ( y - A.y) + A.x;
        var xInAC = dx2 * ( y - A.y) + A.x;
        drawLine(ctx,xInAB,y,xInAC,y,color);
    }

    for(var y = B.y; y <= C.y; y++){
        var xInBC = dx3 * ( y - C.y) + C.x;
        var xInAC = dx2 * ( y - C.y) + C.x;
        drawLine(ctx,xInBC,y,xInAC,y,color);
    }
}

function CrossProduct(u,v){
    return { x:(u.y*v.z-u.z*v.y), y:(u.z*v.x-u.x*v.z), z:(u.x*v.y-u.y*v.x)  }
}

function DotProduct(u,v){
    return u.x * v.x + u.y * v.y + u.z * v.z;
}

function Normalize(u){
    var magnitude = Math.sqrt(u.x*u.x+u.y+u.y+u.z*u.z);
    return {  x:u.x / magnitude, y:u.y / magnitude,  z:u.z / magnitude }
}

/**
 * 绘制三角形（线框）
 * @param {*} ctx 
 * @param {*} t0 
 * @param {*} t1 
 * @param {*} t2 
 * @param {*} color 
 */
function drawTriangleFrame(ctx,t0,t1,t2,color){
    drawLine(ctx,t0.x,t0.y,t1.x,t1.y);
    drawLine(ctx,t2.x,t2.y,t1.x,t1.y);
    drawLine(ctx,t2.x,t2.y,t0.x,t0.y);
}

///////// main /////////
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
//宽
const width = c.width;
//高
const height = c.height;

//变量african_head_data 从 african_head.js中加载
// 绘制人头
for(var i = 0 ; i < african_head_data.faces.length;i++ ){
    var face = african_head_data.faces[i];
    var vIdx0 = face[0].vertexIndex -1;
    var vIdx1 = face[1].vertexIndex -1;
    var vIdx2 = face[2].vertexIndex -1;

    var v0 = african_head_data.vertices[vIdx0];
    var v1 = african_head_data.vertices[vIdx1];
    var v2 = african_head_data.vertices[vIdx2];

    var screenPt0 = {
        x:(v0[0]+1.0)*width/2.0,
        y:(v0[1]+1.0)*height/2.0
    }
    var screenPt1 ={
        x: (v1[0]+1.0)*width/2.0,
        y: (v1[1]+1.0)*height/2.0
    }
    var screenPt2 = {
        x: (v2[0]+1.0)*width/2.0,
        y: (v2[1]+1.0)*height/2.0
    }

    // 随机颜色
    // var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    //drawTriangle(ctx,screenPt0,screenPt1,screenPt2,color)

    // 根据深度呈现不同的颜色。法线和光线的角度越小，颜色越浅
    // 用法线和光线的点乘来衡量角度
    var u = {
        x:(v2[0] - v0[0]),
        y:(v2[1] - v0[1]),
        z:(v2[2] - v0[2])
    }
    var v = {
        x: (v1[0] - v0[0]),
        y: (v1[1] - v0[1]),
        z: (v1[2] - v0[2])
    }

    var normal = CrossProduct(u,v);
    normal = Normalize(normal);

    var lightDir = {x:0.0,y:0.0,z:-1};

    var intensity = DotProduct(lightDir,normal);

    if (intensity =>0) {
        var channel = Math.floor(0xff * intensity);
        var grey = channel < 10? '0'+channel.toString(16) : channel.toString(16);
        var color = '#' +grey+grey+grey;
        drawTriangle(ctx,screenPt0,screenPt1,screenPt2,color)
    }
}
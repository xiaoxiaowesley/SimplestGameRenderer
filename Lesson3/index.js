/**
 * 绘制点
 * @param ctx canvas上下文
 * @param x x坐标
 * @param y y坐标
 * @param color 颜色
 */
function drawPixel(ctx, x, y, z, color) {
    const height = ctx.canvas.height;
    y = height - y;

    y = Math.floor(y);
    x = Math.floor(x);
    var idx = x + y * width;
    var zb = zbuffer[idx];
    if (zb < z) {
        zbuffer[idx] = z;
        // 坐标原点在左下角
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }
}



function getPixel(url, x, y) {
    var img = new Image();
    img.src = url;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(x, y, 1, 1).data;
}

function GetPixel(url, x, y) {
    var img = new Image();
    img.src = url;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(x, y, 1, 1).data;
}


/**
 * 绘制三角形（填充）
 * @param {*} ctx 
 * @param {*} t0 
 * @param {*} t1 
 * @param {*} t2 
 * @param {*} color 
 */
function drawTriangle(ctx, A, B, C, color) {

    //小数部分四舍五入
    A.x = Math.floor(A.x + 0.5)
    A.y = Math.floor(A.y + 0.5)
    A.z = Math.floor(A.z + 0.5)
    B.x = Math.floor(B.x + 0.5)
    B.y = Math.floor(B.y + 0.5)
    B.z = Math.floor(B.z + 0.5)
    C.x = Math.floor(C.x + 0.5)
    C.y = Math.floor(C.y + 0.5)
    C.z = Math.floor(C.z + 0.5)

    //使用Barycentric Coordinates(重心坐标系插值)算法
    //http://blog.atelier39.org/cg/533.html
    var minX = Math.min(A.x, B.x, C.x);
    var maxX = Math.max(A.x, B.x, C.x);
    var minY = Math.min(A.y, B.y, C.y);
    var maxY = Math.max(A.y, B.y, C.y);

    var x1 = A.x;
    var x2 = B.x;
    var x3 = C.x;
    var y1 = A.y;
    var y2 = B.y;
    var y3 = C.y;
    var z1 = A.z;
    var z2 = B.z;
    var z3 = C.z;
    
    for (var x = minX; x <= maxX; x++) {
        for (var y = minY; y <= maxY; y++) {
            var c = ((y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1) / ((y1 - y2) * x3 + (x2 - x1) * y3 + x1 * y2 - x2 * y1);
            var b = ((y1 - y3) * x + (x3 - x1) * y + x1 * y3 - x3 * y1) / ((y1 - y3) * x2 + (x3 - x1) * y2 + x1 * y3 - x3 * y1);
            var a = 1 - b - c;
            //这里要注意js中的浮点数比较
            var zero = -1e-10;
            if (a >= zero && a <= 1 && b >= zero && b <= 1 && c >= zero && c <= 1) {
                var z = a * z1 + b * z2 + c * z3;

                var u = a * A.u + b * B.u + c * C.u;
                var v = a * A.v + b * B.v + c * C.v;

                var color =  getPixel('./african_head_diffuse.jpg', 10, 10); // [255, 255, 255, 0];                
                // drawPixel(ctx, x, y, z, color);
            }
        }
    }
}

function CrossProduct(u, v) {
    return { x: (u.y * v.z - u.z * v.y), y: (u.z * v.x - u.x * v.z), z: (u.x * v.y - u.y * v.x) }
}

function DotProduct(u, v) {
    return u.x * v.x + u.y * v.y + u.z * v.z;
}

function Normalize(u) {
    var magnitude = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
    return { x: u.x / magnitude, y: u.y / magnitude, z: u.z / magnitude }
}

///////// main /////////
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//宽
const width = c.width;
//高
const height = c.height;

//z buffer
var zbuffer = [];
for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
        zbuffer[w + h * width] = Number.NEGATIVE_INFINITY;
    }
}

var count = 0;

//变量african_head_data 从 african_head.js中加载
// 绘制人头
for (var i = 0; i < african_head_data.faces.length; i++) {
    var face = african_head_data.faces[i];
    var vIdx0 = face[0].vertexIndex - 1;
    var vIdx1 = face[1].vertexIndex - 1;
    var vIdx2 = face[2].vertexIndex - 1;

    var v0 = african_head_data.vertices[vIdx0];
    var v1 = african_head_data.vertices[vIdx1];
    var v2 = african_head_data.vertices[vIdx2];

    var uv0 = african_head_data.uvs[vIdx0];
    var uv1 = african_head_data.uvs[vIdx1];
    var uv2 = african_head_data.uvs[vIdx2];

    var vbo0 = {
        x: (v0[0] + 1.0) * width / 2.0,
        y: (v0[1] + 1.0) * height / 2.0,
        z: (v0[2] + 1.0) * height / 2.0,
        u:uv0.x,
        v:uv0.y
    }
    var vbo1 = {
        x: (v1[0] + 1.0) * width / 2.0,
        y: (v1[1] + 1.0) * height / 2.0,
        z: (v1[2] + 1.0) * height / 2.0,
        u:uv1.x,
        v:uv1.y
    }
    var vbo1 = {
        x: (v2[0] + 1.0) * width / 2.0,
        y: (v2[1] + 1.0) * height / 2.0,
        z: (v2[2] + 1.0) * height / 2.0,
        u:uv2.x,
        v:uv2.y
    }

    // 随机颜色
    // var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    // drawTriangle(ctx,vbo0,vbo1,vbo1,color)

    // 根据深度呈现不同的颜色。法线和光线的角度越小，颜色越浅
    // 用法线和光线的点乘来衡量角度
    var dir1 = {
        x: (v2[0] - v0[0]),
        y: (v2[1] - v0[1]),
        z: (v2[2] - v0[2])
    }
    var dir2 = {
        x: (v1[0] - v0[0]),
        y: (v1[1] - v0[1]),
        z: (v1[2] - v0[2])
    }

    var normal = CrossProduct(dir1, dir2);
    normal = Normalize(normal);

    var lightDir = { x: 0.0, y: 0.0, z: -1 };

    var intensity = DotProduct(lightDir, normal);

    if (intensity > 0.0) {
        var channel = Math.floor(0xff * intensity);
        var grey = channel < 10 ? '0' + channel.toString(16) : channel.toString(16);
        var color = '#' + grey + grey + grey;
        drawTriangle(ctx, vbo0, vbo1, vbo1, color)
    }
}


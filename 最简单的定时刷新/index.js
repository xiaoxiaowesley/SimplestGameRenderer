///////// main process /////////
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

//宽
const width = c.width;
//高
const height = c.height;
//帧率
const fps = 60;

//每一帧的间隔时间
const delay = 1000 / fps;
var startY = 0;

//定时更新
setInterval('update(ctx)',delay);

///////// main process end /////////

// 向量
function Vector(x,y,z,w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}

// 向量加法 v = v1+v2
function VectorAdd(v1,v2) {
    return new Vector(v1.x + v2.x,v1.y+v2.y,v1.z+v2.z,1.0);
}
// 向量减法 v = v1 - v2
function VectorSub(v1,v2) {
    return new Vector(v1.x + v2.x,v1.y+v2.y,v1.z+v2.z,1.0);
}
// 向量点乘
function VectorDot(v1,v2) {
   return v1.x * v2.x + v1.y*v2.y + v1.z*v2.z;
}
// 向量叉乘
function VectorCross(v1,v2) {
    var x = v1.y * v2.z - v1.z * v2y;
    var y = v1.z * v2.x - v1.x * v2z;
    var z = v1.x * v2.y - v1.y * v2x;
    return new Vector(x,y,z,1.0);
}
// 向量归一化
function VectorNormalize(v) {

}


/**
 * 定时更新函数
 * @param ctx
 */
function update(ctx) {
    clear(ctx);
    startY++;
    if(startY >height){
        startY = 0
    }
    drawLine(ctx,0,startY,width,height-startY,'#000');
}

/**
 * 绘制点
 * @param ctx canvas上下文
 * @param x x坐标
 * @param y y坐标
 * @param color 颜色
 */
function drawPixel(ctx,x,y,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

/**
 * 绘制点
 * @param ctx  canvas上下文
 * @param x0   起始x坐标
 * @param y0   起始y坐标
 * @param x1   结束x坐标
 * @param y1   结束y坐标
 * @param color 颜色
 */
function drawLine(ctx,x0,y0,x1,y1,color) {
    //这里不是使用canvas自带的画线函数，用最原始的绘制一个一个像素点
    //确保起始点在左，结束点在右
    if(x0 > x1 ){
        //swap x and y
        var tmp = x1;
        x1 = x0;
        x0 = tmp;

        tmp = y1;
        y1 = y0;
        y0 = tmp;
    }
    for (var x=x0; x<=x1; x++) {
        var t = (x-x0)/(x1-x0);
        var y = y0*(1.-t) + y1*t;
        drawPixel(ctx,x,y,color);
    }
}

/**
 * 清空绘制区域
 * @param ctx
 */
function clear(ctx) {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}


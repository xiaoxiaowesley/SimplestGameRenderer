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
 * 三角形线框
 * @param ctx
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param color
 */
function drawTriangleFrame(ctx,x0,y0,x1,y1,x2,y2,color){
    drawLine(ctx,x0,y0,x1,y1,color);
    drawLine(ctx,x0,y0,x2,y2,color);
    drawLine(ctx,x1,y1,x2,y2,color);
}

function drawTriangle(ctx,x0,y0,x1,y1,x2,y2,color) {
    //确保p0距离y轴最近,p1其次，p2最远
    if(y0 > y1){
        var tmp = y1; y1 = y0; y0 = tmp;
        tmp = x1;x1 = x0; x0 = tmp;
    }
    if(y0 > y2){
        var tmp = y2; y2 = y0; y0 = tmp;
        tmp = x2;  x2 = x0; x0 = tmp;
    }
    if(y1 > y2){
        var tmp = y1; y1 = y2; y2 = tmp;
        tmp = x1;  x1 = x2; x2 = tmp;
    }
    var h02 = Math.abs(y0-y2);
    var h01 = Math.abs(y0-y1);
    var h12 = Math.abs(y1-y2);

    for(var y = y0;y < y1; y++)
    {
        var deltaY = Math.abs(y-y0);
        var xl = x0 + (x2-x0) * deltaY / h02;
        var xr = x0 + (x1-x0) * deltaY / h01;
        drawLine(ctx,xr,y,xl,y,color)
    }

    for(var y = y2;y >= y1; y--)
    {
        var deltaY = Math.abs(y - y2);
        var xl = x2 + (x1 - x2) * deltaY / h12;
        var xr = x2 + (x0 - x2) * deltaY / h02;
        drawLine(ctx,xr,y,xl,y,color)
    }
}

///////// main /////////
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
//宽
const width = c.width;
//高
const height = c.height;

// 画三角形线框
var p0 = {x:width/2.0,y:height*3/4.0}
var p1 = {x:width/4.0,y:height/2.0}
var p2 = {x:width*3/4.0,y:height/4.0}
drawTriangleFrame(ctx,p0.x,p0.y,p1.x,p1.y,p2.x,p2.y,'red')
drawTriangle(ctx,p0.x,p0.y,p1.x,p1.y,p2.x,p2.y,'red')


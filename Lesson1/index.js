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
   for(var j=0; j < 3;j++){
       var vIdx0 = face[j].vertexIndex;
       var vIdx1 = face[(j+1)%3].vertexIndex;

       var v0 = african_head_data.vertices[vIdx0];
       var v1 = african_head_data.vertices[vIdx1];

       var x0 = (v0[0]+1.0)*width/2.0;
       var y0 = (v0[1]+1.0)*height/2.0;
       var x1 = (v1[0]+1.0)*width/2.0;
       var y1 = (v1[1]+1.0)*height/2.0;
       
       drawLine(ctx,x0, y0, x1, y1,"black")
   }
}


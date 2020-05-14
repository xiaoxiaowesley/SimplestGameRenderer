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
       var idx0 = j;
       var idx1 = (j+1)%3;
       //文件存储数组的下标都是1起始的。这里-1是为了适应
       var vIdx0 = face[j].vertexIndex -1;
       var vIdx1 = face[(j+1)%3].vertexIndex -1;

       var v0 = african_head_data.vertices[vIdx0];
       var v1 = african_head_data.vertices[vIdx1];

       var x0 = (v0[0]+1.0)*width/2.0;
       var y0 = (v0[1]+1.0)*height/2.0;
       var x1 = (v1[0]+1.0)*width/2.0;
       var y1 = (v1[1]+1.0)*height/2.0;
       
       drawLine(ctx,x0, y0, x1, y1,"black")

   }
}

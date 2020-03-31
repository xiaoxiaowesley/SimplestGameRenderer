///////// main process /////////
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

const width = c.width;  //宽
const height = c.height;//高
const fps = 60;//帧率

const delay = 1000 / fps;//每一帧的间隔时间


var startY = 0;

//定时更新
setInterval('update(ctx)',delay);

///////// main process end /////////


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


function matrixAdd(mat1,mat2){
    var ret = [[1,0,0,0],[0,1,0,0],,[0,0,1,0],[0,0,0,1]];
    for(var row = 0 ; row < 4 ; row++){
        for(var column = 0 ; column < 4 ; column++){
            ret[row][co]
        }
    }
}
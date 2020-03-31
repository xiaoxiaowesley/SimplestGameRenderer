
const  fs = require('fs');
var readline = require('readline');

var objPath = './african_head.obj';
var jsonPath = './african_head.json'


var rl = readline.createInterface({
    input: fs.createReadStream(objPath),
    output: process.stdout,
    terminal: false
});


var jsonObject = {
    'vertices':[],
    'uvs':[],
    'normals':[],
    'faces':[]
};

rl.on('line', function(line) {
    if(line.startsWith('v ')){
        var res = line.split(' ');
        var x = parseFloat(res[1]);
        var y = parseFloat(res[2]);
        var z = parseFloat(res[3]);
        jsonObject.vertices.push([x,y,z])
    }else if (line.startsWith('vt ')){
        var res = line.split(' ');
        //vt前面有两个空格，res数组有5个元素。取后面三个元素
        var u = parseFloat(res[res.length-3]);
        var v = parseFloat(res[res.length-2]);
        var w = parseFloat(res[res.length-1]);
        jsonObject.uvs.push([u,v,w])
    }else if(line.startsWith('vn ')){
        // normal
        var res = line.split(' ');
        var x = parseFloat(res[1]);
        var y = parseFloat(res[2]);
        var z = parseFloat(res[3]);
        jsonObject.normals.push([x,y,z])
    }else if(line.startsWith('f ')){

        //https://en.wikipedia.org/wiki/Wavefront_.obj_file
        // f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3

        var res = line.split(' ');

        var vertex1 = res[1].split('/');
        var vertex2 = res[2].split('/');
        var vertex3 = res[3].split('/');

        var v1Idx  = parseInt(vertex1[0]);
        var u1Idx  = parseInt(vertex1[1]);
        var n1Idx  = parseInt(vertex1[2]);

        var v2Idx  = parseInt(vertex2[0]);
        var u2Idx  = parseInt(vertex2[1]);
        var n2Idx  = parseInt(vertex2[2]);

        var v3Idx  = parseInt(vertex3[0]);
        var u3Idx  = parseInt(vertex3[1]);
        var n3Idx  = parseInt(vertex3[2]);

        jsonObject.faces.push(
        [
            { vertexIndex:v1Idx,uvIndex:u1Idx,normalIndex:n1Idx },
            { vertexIndex:v2Idx,uvIndex:u2Idx,normalIndex:n2Idx },
            { vertexIndex:v3Idx,uvIndex:u3Idx,normalIndex:n3Idx }
        ])

    }
});

rl.on('close',function () {
    for(var i = 0 ; i<jsonObject.vertices.length;i++){
        var v = jsonObject.vertices[i];
        // console.log(v);
    }
    console.log('vertices:'+jsonObject.vertices.length)
    console.log('uvs:'+jsonObject.uvs.length)
    console.log('normals:'+jsonObject.normals.length)
    console.log('faces:'+jsonObject.faces.length)
    console.log('close!')
    fs.writeFileSync(jsonPath,JSON.stringify(jsonObject));
})
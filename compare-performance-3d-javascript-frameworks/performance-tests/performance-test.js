var fps_arr = [];
var fps = 0;



const readFilePromise = (...args) => {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}


function runFpsLoop() {
    var lastTime = performance.now();
    var frame = 0;

    var lastFrameTime = performance.now();
    var fsMin = Infinity;
    var fsMax = 0;

    var start = performance.now();

    var loop = function(time) {
        var now =  performance.now();
        var fs = (now - lastFrameTime);
        lastFrameTime = now;
        fps = Math.round(1000/fs);
        frame++;
        if (now > 1000 + lastTime) {
            fps = Math.round( ( frame * 1000 ) / ( now - lastTime ) );
            fsMin = Math.min( fsMin, fps );
            fsMax = Math.max( fsMax, fps );
            fps_arr.push(fps);

            frame = 0;
            lastTime = now;
        };

        if (now - start > 10000) {
            return fps_arr;
        }
        window.requestAnimationFrame(loop);
        console.log("hej");
    }
    loop(0);
}

runFpsLoop();

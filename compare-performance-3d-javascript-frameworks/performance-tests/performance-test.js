var fps_arr = [];
var fps = 0;



const requestAnimationPromise = () => {
  return new Promise((resolve) => {
      window.requestAnimationFrame((timestmp) => {
          resolve(timestmp)
      })
  })
};


async function runFpsLoop() {
    var lastTime = performance.now();
    var frame = 0;

    var lastFrameTime = performance.now();
    var fsMin = Infinity;
    var fsMax = 0;

    var start = performance.now();

    var loop = async function(time) {
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
        await requestAnimationPromise().then(loop);
        console.log("hej");
    }
    await loop(0);
}

await runFpsLoop();

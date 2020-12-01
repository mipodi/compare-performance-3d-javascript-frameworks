var fps_arr = [];
var fps = 0;


function runFpsLoop() {
    var lastTime = performance.now();
    var frame = 0;

    var lastFrameTime = performance.now();
    var durationMin = Infinity;
    var durationMax = 0;
    setTimeout(function(){loop(0)},1000);
    var start = performance.now();

    var loop = function(time) {
        var now =  performance.now();
        var duration = (now - lastFrameTime);
        lastFrameTime = now;
        fps = Math.round(1000/duration);
        frame++;
        if (now > 1000 + lastTime) {
            fps = Math.round( ( frame * 1000 ) / ( now - lastTime ) );
            durationMin = Math.min( durationMin, fps );
            durationMax = Math.max( durationMax, fps );
            fps_arr.push(fps);

            frame = 0;
            lastTime = now;
        };

        if (now - start > 10000) {
            return;
        }
        window.requestAnimationFrame(loop);
        console.log("hej");
    }
}

runFpsLoop();

// var bod = document.getElementById('body');
// bod.addEventListener('online', drawGradient, false);

// console.log(bod)


function makeVideoOldTimey() {
    var video = document.getElementById("video");
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    video.addEventListener("play", function() { 
        draw(video,context,canvas);               
        }, false);
}

function draw(video, context, canvas) {
    if (video.paused || video.ended) return false;
    
    drawOneFrame(video, context, canvas);
}

function drawOneFrame(video, context, canvas){
    // draw the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixelData = imageData.data; 
    // Loop through the red, green and blue pixels, 
    // turning them grayscale
    
    var red, green, blue, greyscale;  
    for (var i = 0; i < pixelData.length; i += 4) {
    red = pixelData[i];
    green = pixelData[i + 1];
    blue = pixelData[i + 2];
    //we'll ignore the alpha value, which is in position i+3
        
    grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
        
    pixelData[i] = grayscale;
    pixelData[i + 1] = grayscale;
    pixelData[i + 2] = grayscale;
    }
            
    context.putImageData(imageData, 0, 0); 
}
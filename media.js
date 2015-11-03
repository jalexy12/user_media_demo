navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
   getUserMedia: function(c) {
     return new Promise(function(y, n) {
       (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
     });
   }
   console.log("Yo")
} : null);

if (!navigator.mediaDevices) {
  console.log("getUserMedia() not supported.");
  return;
}

// Prefer camera resolution nearest to 1280x720.

var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
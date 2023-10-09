peter_pan_song = "";
harry_potter_song = "";
song_harry_potter = "";
song_peter_pan = "";

function preload() {
    harry_potter_song = loadSound("music.mp3");
    peter_pan_song = loadSound("music2.mp3");
}

function setup () {
    canvas = createCanvas(600,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist  = 0;

function modelLoaded() {
    console.log("posenet is Intialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 600);

    fill("#FF0000");
    stroke("#FF0000");
    song_peter_pan = peter_pan_song.isPlaying();
    song_harry_potter= harry_potter_song.isPlaying();
    if (scoreLeftWrist > 0.2) 
        {
            circle(leftWristX, leftWristY,  20);
            harry_potter_song.stop();
            if (song_peter_pan == false) {
                peter_pan_song.play();
            }
            else {
                document.getElementById("song_id").innerHTML = "song name : Peter Pan Song ";
            }
        }

        if (scoreRightWrist > 0.2) {
            circle(rightWristX, rightWristY, 20);
            peter_pan_song.stop();
            if (song_harry_potter == false) {
                harry_potter_song.play();
            }
            else {
                document.getElementById("song_id").innerHTML = "song name : Harry Potter Song ";
            }
            
        }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
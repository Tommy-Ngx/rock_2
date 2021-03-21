const landmarksRealTime = async (video) => {
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  const canvas = document.getElementById('output');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, videoWidth, videoHeight);
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  const frameLandmarks = async () => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const result = predictions[0].landmarks;
      drawKeypoints(ctx, result, predictions[0].annotations);

      if (recordingRock) {
        rockData.push(result);
        if (rockData.length === TRAIN_DATA_LIMIT) {
          recordingRock = false;
          alert('Recorded rock gesture');
        }
      }

      if (recordingPaper) {
        paperData.push(result);
        if (paperData.length === TRAIN_DATA_LIMIT) {
          recordingPaper = false;
          alert('Recorded paper gesture');
        }
      }

      if (recordingScissors) {
        scissorsData.push(result);
        if (scissorsData.length === TRAIN_DATA_LIMIT) {
          recordingScissors = false;
          alert('Recorded scissors gesture');
        }
      }

      if (recognitionLive) {
        const proportions = getProportionsLimited(result);
        const output = net.run(proportions);

        console.log({ output });

        const { rock, paper, scissors } = output;
        const maxResult = Math.max(rock, paper, scissors);

        if (maxResult === rock) {
          document.getElementById('recognizedGesture').innerHTML = 'Result: rock';
        } else if (maxResult === paper) {
          document.getElementById('recognizedGesture').innerHTML = 'Result: paper';
        } else if (maxResult === scissors) {
          document.getElementById('recognizedGesture').innerHTML = 'Result: scissors';
        }
      }
    }

    requestAnimationFrame(frameLandmarks);
  };

  frameLandmarks();
};

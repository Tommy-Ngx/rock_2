const recordRockGesture = () => {
  recordingRock = true;
}


const recordPaperGesture = () => {
  recordingPaper = true;
}


const recordScissorsGesture = () => {
  recordingScissors = true;
}


const showData = () => {
  console.log({
    rockData,
    paperData,
    scissorsData,
  });
}


const trainNetwork = async () => {
  console.log('Started network training');
  const networkTrainData = [];

  for (let i = 0; i < rockData.length; i++) {
    const proportions = getProportionsLimited(rockData[i]);
    networkTrainData.push({
      input: proportions, output: { rock: 1 },
    });
  }

  for (let i = 0; i < paperData.length; i++) {
    const proportions = getProportionsLimited(paperData[i]);
    networkTrainData.push({
      input: proportions, output: { paper: 1 },
    });
  }

  for (let i = 0; i < scissorsData.length; i++) {
    const proportions = getProportionsLimited(scissorsData[i]);
    networkTrainData.push({
      input: proportions, output: { scissors: 1 },
    });
  }

  await net.train(networkTrainData, {
    log: true,
    errorThresh: 0.01,
    learningRate: 0.01,
    iterations: 100000,
  });

  console.log('Finished network training');
}


const recognizeGesture = () => {
  recognitionLive = true;
}

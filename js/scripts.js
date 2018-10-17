
let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));


    console.log(results)

    let output;
    let certainty;

    /* test*/
    let probability = 0;
    let zone;
    for(let prop in results) {
      if (results[prop] >= probability) {
        probability = results[prop];
        zone = prop;
      }
      console.log(`results.${prop} = ${results[prop]}`);

    }
    console.log(probability + " "+ zone);
    /* test*/

    return "Estoy " + probability + "% seguro que saldra " + zone;
}

train(trainingData);
console.log(execute("A"));

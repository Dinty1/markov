const fs = require('fs');

function loadText() {
    let input = fs.readFileSync('../data/load.txt')
    input = input.toString();

    let loadedText = JSON.parse(fs.readFileSync('../data/loaded.json'));
    loadedText.push(input);

    fs.writeFileSync('../data/loaded.json', JSON.stringify(loadedText));

    fs.writeFileSync('../data/load.txt', '')
}

function analyse() {
    console.log('Analysing...')
    let analysis = {}
    let inputs = JSON.parse(fs.readFileSync('../data/loaded.json'));

    const totalWords = inputs.join(' ').split(' ').filter(x => x != '').length;
    var wordsComplete = 0;

    for (let input of inputs) {
        input = input.replace(/(\r\n|\n|\r)/gm, " ").toLowerCase().trim();
        let inputWords = input.split(' ');
        inputWords = inputWords.filter(x => x != '')//remove empty strings
        for (let i in inputWords) {
            console.log(Math.floor(wordsComplete / totalWords * 100) + '% complete')
            wordsComplete++;
            if (!analysis[inputWords[i]]) {
                analysis[inputWords[i]] = {};
            }
            let nextWord = inputWords[parseInt(parseInt(i) + 1)];
            try {
                nextWord = nextWord.replace(/(\r\n|\n|\r)/gm, " ").toLowerCase().trim();
            } catch (err) { }
            if (!analysis[inputWords[i]][nextWord]) {
                analysis[inputWords[i]][nextWord] = { occurrences: 0 };
            }
            analysis[inputWords[i]][nextWord].occurrences += 1;
        }
    }
    fs.writeFileSync('../analysis/analysed-text.json', JSON.stringify(analysis));
    return console.log('complete')
}

function generate(count) {
    var output = ''
    const analysedText = JSON.parse(fs.readFileSync('../analysis/analysed-text.json'))

    //get random starting word
    let words = []
    for (let i in analysedText) {
        words.push(i)
    }
    var word = words[Math.floor(Math.random() * words.length)];

    for (i = 0; i < count; i++) {
        output += word + ' ';
        word = getNextWord(word, analysedText)
    }
    return output;
}

function getNextWord(word, data) {
    let words = []
    for (let i in data[word]) {
        for (j = 0; j < data[word][i].occurrences; j++) {
            words.push([i]);
        }
    }
    return words[Math.floor(Math.random() * words.length)]
}
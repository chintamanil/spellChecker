(function() {

    var prompt = require('prompt');
    var colors = require('colors/safe');
    var Checker = require('./module/spellChecker.js');
    var generator = require('./generator/generator.js');
    var fileName = './src/dict/string2.txt';
    var Reader = require('fs');
    var express = require('express');
    var file = Reader.readFileSync(fileName, 'utf8');

    var checkWordResults = '';
    var text = '';
    var prevWord = 'sleep';
    var modified;

    prompt.delimiter = colors.green('>');
    prompt.message = '';
    //
    // Start the prompt
    //
    prompt.start();

    // TODO US command pattenr to call Checker ?
    Checker.build(file);
    // Checker.add('conspiracy');
    // Checker.add('sleep');
    function ask() {
        // Ask for name until user inputs 'done'
        text = 'Correct word is: ';
        console.log('---------------------------------------------------------------------------------------------------------------')
        console.log('Enter: "GTG" to exit OR press Enter to use previous word in Generator : ' + prevWord);
        console.log('Enter the Spelling to Check');
        prompt.get(['w'], function(err, result) {
            if (result.w === 'GTG') {
                console.log('We are done.');
            } else {
                if(result.w){
                    console.log('Word tried: ' + result.w);
                    checkWordResults = Checker.find(result.w);
                    if (checkWordResults !== 'NO CORRECTION') {
                        if (result.w === checkWordResults) {
                            text = 'Word is in dictionary: ';
                        }
                        prevWord = result.w;
                        console.log(text + checkWordResults);
                    } else {
                        console.log(checkWordResults);
                    }
                }else{
                    console.log('Reusing previous word: ' + prevWord);
                    modified = generator(prevWord);
                    console.log('Modfied word by generator: ' + modified);
                    text = 'Correct word after gnerator : ';
                    checkWordResults = Checker.find(modified);
                    console.log(text + checkWordResults);
                }
                ask();
            }
        // if(err){
        //     console.log('Error:' + err);
        // }
        });
    }

    ask();

})();

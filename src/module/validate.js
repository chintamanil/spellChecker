var utils = require('./utils.js');

module.exports = (function() {

    var _private = {
        vowelValidate: function(args, trieInstance, word ){
            var check;
            if(args.vowel){
                check = utils.vowelChange(word, trieInstance);
                if(check){
                    trieInstance.addSpellErrorInCache(word, check);
                    return check;
                }
            }
            return false;
        },
        validateMutiple: function(args, trieInstance, word ){
            var check, i, listOfChecks;
            if(args.multiple){
                listOfChecks = utils.repeatValues(word);
                for (i = listOfChecks.length - 1; i >= 0; i--) {
                    check =  trieInstance.find( listOfChecks[i] );
                    if(check){
                        trieInstance.addSpellErrorInCache(listOfChecks[i], check);
                        return{
                            result: listOfChecks[i]
                        };
                    }
                }
            }
            return listOfChecks;
        },
        validate: function(args, trieInstance, word ) {
            var check, i, listOfChecks;
            if(args.lowerCase){
                word = utils.toLowerCase(word);
            }
            check = trieInstance.findSpellErrorInCache(word);
            if(check){
                return check;
            }
            check = _private.vowelValidate(args, trieInstance, word );
            if(check){
                return check;
            }
            check = _private.validateMutiple(args, trieInstance, word );
            if(check.hasOwnProperty('result')){
                return check.result;
            }
            listOfChecks = check;
            if(args.multiple && args.vowel){
                for (i = listOfChecks.length - 1; i >= 0; i--) {
                    check = _private.vowelValidate(args, trieInstance, listOfChecks[i] );
                    if(check){
                        trieInstance.addSpellErrorInCache(word, check);
                        return check;
                    }
                }
            }
            return 'NO CORRECTION';
        }
    };

    return {
        checkSpelling: _private.validate,
        vowelValidate: _private.vowelValidate,
        validateMutiple: _private.validateMutiple
    };

})();

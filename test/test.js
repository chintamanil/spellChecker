(function() {
    // process.env.NODE_ENV = 'test';

    var chai = require('chai');
    var expect = chai.expect;
    var Reader = require('fs');
    var express = require('express');
    var Checker = require('./../src/module/spellChecker.js');
    var file = Reader.readFileSync('./src/dict/string2.txt', 'utf8');

    describe('Spell Checker Testing', function() {
        describe('create dictionary', function() {

            beforeEach(function() {
                Checker.build(file);
            });

            it('Check if "sleep" is in dictionary ', function() {
                expect(Checker.find('sleep')).to.equal('sleep');
            });

            it('Check if "sleeeeep" is in dictionary ', function() {
                expect(Checker.find('sleeeeep')).to.equal('sleep');
            });

            it('Check if "jjoobbb" is in dictionary ', function() {
                expect(Checker.find('jjoobbb')).to.equal('job');
            });

            it('Check if "CUNsperrICY" is in dictionary ', function() {
                expect(Checker.find('CUNsperrICY')).to.equal('conspiracy');
            });

            it('Check if "sleeple" is in dictionary ', function() {
                expect(Checker.find('sleeple')).to.equal('NO CORRECTION');
            });
        });

    });

})();

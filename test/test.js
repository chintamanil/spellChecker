(function() {
    // process.env.NODE_ENV = 'test';

    var chai = require('chai');
    var expect = chai.expect;
    var file = require('fs').readFileSync('./src/dict/string2.txt', 'utf8');
    var express = require('express');
    var Checker = require('./../src/module/spellChecker.js');

    describe('Spell Checker Testing', function() {
        describe('create dictionary', function() {
            beforeEach(function() {
                Checker.build(file);
            });

            afterEach(function() {
                // nothing
            });
            it('Check if "sleep" is in dictionary ', function() {
                expect(Checker.find('sleep')).to.equal('sleep');
            });

            it('Check if "sleeeeep" is in dictionary ', function() {
                expect(Checker.find('sleep')).to.equal('sleep');
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

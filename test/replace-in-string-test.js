var buster = require("buster"),
	Groumf = require("../groumf.js");

buster.testCase("Groumf - replace in string", {
	"raw replace equal string": function () {  // replace(string)
		var replacer = new Groumf();
		replacer.add('g27', 'cidre');
		replacer.add('g270', 'rhum');
		var input = "g27";
		var output = "cidre";
		buster.assert.equals(replacer.replace(input), output);
	},
	"raw replace": function () { // replace(string)
		var replacer = new Groumf();
		replacer.add('Schtroumpfs', 'cailloux');
		replacer.add('Schtroumpf', 'caillou');
		var input = "Schtroumpfs des champs, schtroumpfs des villes, tous schtroumpfons en schtroumpf!";
		var output = "cailloux des champs, cailloux des villes, tous schtroumpfons en caillou!";
		buster.assert.equals(replacer.replace(input), output);
	},
	"raw replace with unicode": function () { // replace(string)
		var replacer = new Groumf();
		replacer.add("π/2", "1.57");
		replacer.add("2π/3", "2.094");
		replacer.add("3π/7", "1.346");
		var input = "(24π + 2π + 12π/3 + π/2 - 3π/7 + π)";
		var output = "(24π + 2π + 12π/3 + 1.57 - 1.346 + π)";
		buster.assert.equals(replacer.replace(input), output);
	},
	"callback replace cutting word": function () { // replace(string)
		var replacer = new Groumf({dontCutWords:false});
		replacer.add("cha");
		var input = "Un chat en chaînes";
		var output = "Un [cha]t en [cha]înes";
		var cb = function(s){ return '['+s+']' };
		buster.assert.equals(replacer.replace(input, cb), output);
	},
	"callback replace not cutting word with (basic) Unicode support": function () { // replace(string)
		var replacer = new Groumf();
		replacer.add("cha");
		var input = "Un chat en chaînes";
		var output = input;
		var cb = function(s){ return '['+s+']' };
		buster.assert.equals(replacer.replace(input, cb), output);
	},
	"callback replace": function () { // replace(string, callback)
		var replacer = new Groumf();
		replacer.add('Schtroumpfs', 'plural');
		replacer.add('Schtroumpf', 'singular');
		var input = "Schtroumpfs des champs, schtroumpfs des villes, tous schtroumpfons en schtroumpf!";
		var output = "[Schtroumpfs](plural) des champs, [schtroumpfs](plural) des villes, tous schtroumpfons en [schtroumpf](singular)!";
		var cb = function(s,v){ return '['+s+']('+v+')' };
		buster.assert.equals(replacer.replace(input, cb), output);
	},
	"standard string replace with string": function () { // replace(string, string, string)
		var replacer = new Groumf();
		var input = "Schtroumpfs des champs, schtroumpfs des villes, tous schtroumpfons en schtroumpf!";
		var output = "Schtroumpfs des champs, trucs des villes, tous schtroumpfons en schtroumpf!";
		buster.assert.equals(replacer.replace(input, "schtroumpf", "truc"), output);
	},
	"standard string replace with regex": function () { // replace(string, regex, cb)
		var replacer = new Groumf();
		var input = "Schtroumpfs des champs, schtroumpfs des villes, tous schtroumpfons en schtroumpf!";
		var output = "sfpmuorthcS sed spmahc, sfpmuorthcs sed selliv, suot snofpmuorthcs ne fpmuorthcs!";
		var cb = function(s){ return s.split('').reverse().join('') };
		buster.assert.equals(replacer.replace(input, /\w+/g, cb), output);
	},
});


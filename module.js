var frog = function (toad) {
	console.log(toad);

}

class Counter {
	constructor(start){
		this.start = start;
	}

	getNumber(){
		return this.start++;
	}

}
//module.exports.stupid = frog;
module.exports =  new Counter(1);
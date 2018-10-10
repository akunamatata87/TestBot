const fs = require('fs');
const EMA = require('technicalindicators').EMA;
const pairsArray = ['BTCUSD', 'ETHUSD', 'XRPUSD'];

var pairs = {};
const maPeriods = 21;

function Manager(){

	for(pair of pairsArray){
		pairs[pair]={
			ma: new EMA({period : maPeriods, values :[]}),
			maValue:0
		}
	}	

}

/**
	Start bot
**/
Manager.prototype.runBot = function(){
	var marketData ={};
	for(pair of pairsArray){
		marketData[pair]= JSON.parse(fs.readFileSync(__dirname+'/datasets/BFX_'+pair+'_h1.json', 'utf8'));
		console.log(pair, marketData[pair].length);
	}

	for( pair in marketData){
		for(candle of marketData[pair]){
			/**console.log(pair, candle);**/
			calculateMA(pair, candle[2])
		}

	}
}
function calculateMA(pair, close){
	pairs[pair]['maValue'] = pairs[pair]['ma'].nextValue(close);
	console.log(pair, pairs[pair]['maValue']);
}

module.exports = Manager;
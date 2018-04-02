function toMB(nbsize){
	return nbsize/1000000;
}
function FilterArr(FArray,limit){
	var FilteredArray = FArray.filter(ArrEl=>ArrEl>limit);
	return FilteredArray.length
}
function call(data){
	var ranges = [  1,2,3,4,5,6,7,8,10,12,14,17,20,25,30,40,50,60,70,80,100,120,
					140,170,200,250,300,400,500,600,700,800,1000,1200,1400,1700,2000,
					2500,3000,4000,5000,6000,7000,8000,10000];
	var TxSizeArray = data[data.length-1][1].map(toMB);
	var feeArrSlow = FilterArr(TxSizeArray,10); // Slow: 10, Fast: 1, Norm: 4
	var feeArrMed = FilterArr(TxSizeArray,4);
	var feeArrFast = FilterArr(TxSizeArray,1);
	feeSlow = ranges[feeArrSlow];
	feeMed = ranges[feeArrMed];
	feeFast = ranges[feeArrFast];
	$('#slowfee').text(feeSlow+" sat/B");
	$('#mdfee').text(feeMed+" sat/B");
	$('#fastfee').text(feeFast+" sat/B");
}
function getfee(){
	$.ajax({
		url: "https://btc-fee.net/mempool.js",
		type: "GET",
		cache: false,
		dataType: "script"
	}).fail(function (errorm,status) {
			console.log(errorm);
			console.log(status);
			$('#fastfee').text("Internet ERROR");
	});
}
$(document).ready(function(){
		var brot = -1;
		$('.avatar img').css("-moz-transform-origin","50% 50px");
		$('.avatar img').css("-webkit-transform-origin","50% 50px");
		$('.avatar img').css("-ms-transform-origin","50% 50px");
		$('.avatar img').css("transform-origin","50% 50px");
		$('.avatar img').css("-moz-transform","rotate("+brot+"turn)");
		$('.avatar img').css("-webkit-transform","rotate("+brot+"turn)");
		$('.avatar img').css("-ms-transform","rotate("+(brot*360)+"deg)");
		$('.avatar img').css("transform","rotate("+brot+"turn)");
		getfee();
});
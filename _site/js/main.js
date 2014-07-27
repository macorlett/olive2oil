$(window).bind('load', function(){
	$('.product--selection #250ml').append('<div>x250ml Bottles</div>');
	$('.product--selection #500ml').append('<div>x500ml Bottles</div>');

	$('#250ml input').change(function(){
		if($('#250ml div').css('display')==='none'){
			$('#250ml div').show();
			setTimeout(function(){$('#250ml div').css({'opacity':1});},10);
		}
		if($('#250ml input').val()>9){
			$('#250ml div').css({'left':'3rem'});
		}else{
			$('#250ml div').css({'left':'2.5rem'});
		}
	});
	$('#500ml input').change(function(){
		if($('#500ml div').css('display')==='none'){
			$('#500ml div').show();
			setTimeout(function(){$('#500ml div').css({'opacity':1});},10);
		}
		if($('#500ml input').val()>9){
			$('#500ml div').css({'left':'3rem'});
		}else{
			$('#500ml div').css({'left':'2.5rem'});
		}
	});
});

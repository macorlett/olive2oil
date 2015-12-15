var rtime;
var headerHeight;
var timeout = false;
var delta = 200;
$(document).ready(function(){
	//Check for the window resize event to end, then run code
	$(window).resize(function() {
  	rtime = new Date();
  	if (timeout === false) {
    	timeout = true;
    	setTimeout(resizeend, delta);
  	}
	});
	resizeend();
	// when scrolling
	$(window).on('scroll',function(){
		navigationUpdate();
	});
	// form radio button control
	$('.js--radio-button').on('click',function(e){
		selectButton(e,$(this));
	});
	// quantity subract button control
	$('.js--subtract').on('click',function(e){
		quantityButton(e,$(this));
	});
	// quantity add button control
	$('.js--add').on('click',function(e){
		quantityButton(e,$(this));
	});
	$('.js--form-submit').on('click',function(e){
		submitForm(e,$(this));
	});
	$('.js--basket--button').on('click',function(e){
		e.preventDefault();
		openbasket();
	});
	// clear local storage - for testing only!!
	localStorage.clear();
});

function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta);
  } else {
    timeout = false;
    if($(window).width()>799){
      $('.js--full-height').css({height:$(window).height()+"px"});
      headerHeight=$(window).height();
    }else{
      $('.js--full-height').css({height:"auto"});
      headerHeight=$('.section--hero').height();
    }
  }               
}
function navigationUpdate(){
	if(headerHeight<($(window).scrollTop()+90)){
		$('.navigation--basket .button--round--basket').css({color:'#000',borderColor:'#000',backgroundColor:'#FFF'});
		$('.navigation--basket .navigation--basket--label').css({color:'#000'});
	}else{
		$('.navigation--basket .button--round--basket').css({color:'#FFF',borderColor:'#FFF',backgroundColor:'rgba(0,0,0,0)'});
		$('.navigation--basket .navigation--basket--label').css({color:'#FFF'});
	}
}
function selectButton(e,button){
	e.preventDefault();
	// check for the option this button applies to
	if(button.hasClass('js--options-01')){
		ops='js--options-01';
	}else{
		ops="none";
	}
	// if round button add and remove classes
	if(button.hasClass('button--round')){
		$('.button--round.'+ops).removeClass('button--round--selected');
		button.addClass('button--round--selected');
	}
}
function quantityButton(e,button){
	e.preventDefault();
	q=$('.js--order-quantity').val();
	if(button.hasClass('js--subtract')){
		if(q>0){
			q--;
			$('.js--order-quantity').val(q);
		}
	}else{
		q++;
		$('.js--order-quantity').val(q);
	}
}
function submitForm(e,button){
	e.preventDefault();

	if($('button#option--250ml').hasClass('button--round--selected')){
		item='250ml';
	}else if($('button#option--500ml').hasClass('button--round--selected')){
		item='500ml';
	}else{
		item='none';
	}

	quantity=$('input.js--order-quantity').val();

	if(item!='none' && quantity>0){
		addToBasket(item,quantity);
	}
}
function addToBasket(item,quantity){
	if(typeof(Storage)!="undefined"){
		q=parseInt(quantity);

		if(localStorage.getItem(item)!=null){
			obj=JSON.parse(localStorage.getItem(item));
			q+=obj.quantity;
		}

		ct=Date.now();
		expire=ct+172800;
		
		data={'quantity':q,'expire':expire};

		localStorage.setItem(item,JSON.stringify(data));

		updateBasket();
	}else{
		// no local storage support!!!
		console.log('no storage support!');
	}
}
function updateBasket(){
	if(typeof(Storage)!="undefined"){
		console.log('update working..');
		ic=0;

		if(localStorage.getItem('250ml')!=null){
			obj=JSON.parse(localStorage.getItem('250ml'));
			if(!obj.expire<Date.now()){
				ic+=obj.quantity;
			}else{
				localStorage.removeItem('250ml');
			}
		}
		
		if(localStorage.getItem('500ml')!=null){
			obj=JSON.parse(localStorage.getItem('500ml'));
			if(!obj.expire<Date.now()){
				ic+=obj.quantity;
			}else{
				localStorage.removeItem('250ml');
			}
		}
		if(ic>0){
			if($('.navigation--basket').hasClass('navigation--basket--hidden')){
				$('.navigation--basket').removeClass('navigation--basket--hidden');
			}
			$('.navigation--basket .button--round--basket').html(ic);
		}else{
			$('.navigation--basket .button--round--basket').html('0');
			$('.navigation--basket').addClass('navigation--basket--hidden');
		}
		console.log('basketItems:'+ic);
	}else{
		// no local storage support!!
	}
}
function openbasket(){
	$('body').prepend('<div class="basket--draw basket--draw--hidden"></div>');
	$('body').css({overflowY:'hidden'});
	basketFade=setTimeout(function(){
		$('body').find('.basket--draw.basket--draw--hidden').removeClass('basket--draw--hidden');
		clearTimeout(basketFade);
	},10);
	$('body').find('.basket--draw').html(
		'<button class="basket--button--close"></button>'+
		'<button class="basket--button--checkout"></button>'
	);
}
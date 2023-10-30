// 셀렉트박스 직접입력 포커스 끝으로 이동
$.fn.setCursorPosition = function( pos )
{
	this.each( function( index, elem ) {
	if( elem.setSelectionRange ) {
		elem.setSelectionRange(pos, pos);
	} else if( elem.createTextRange ) {
		var range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
	});
}

$(document).ready(function(){

	
	// footer arrow
	$('.btn-footer-arrow-1').on('click',function(e){
		$(this).toggleClass('active');
		e.preventDefault();
	});

	// selectbox
	$('.select-option-box').on('click',function(e){
		$('.select-box > .option-list').slideUp();
		var $this = $(this);
		$('.option-list').css('height','auto');
		if($this.parent().hasClass('active')){
			$('.select-box').removeClass('active');
			$this.parent('.select-box').removeClass('active');
			$this.next('.option-list').stop().slideUp(200);
		}else{
			$('.select-box').removeClass('active');
			$this.parent('.select-box').toggleClass('active');
			$this.next('.option-list').stop().slideDown(200);
		}
		e.preventDefault();
	});
	$('.select-box > .option-list > li:not(.self) > a').on('click',function(e){
		var $this = $(this);
		var $thisTxt = $this.text();
		$this.parent().parent('.option-list').stop().slideUp(200);
		$this.parent().parent().prev('.select-option-box').children('.select-option').prev('.ipt-option').hide();
		$this.parent().parent().prev('.select-option-box').children('.select-option').text($thisTxt);
		$('.select-box').removeClass('active');
		setTimeout(function(){
			$this.parent().parent('.option-list').children('li.self').css('display','block');
		}, 300);
		e.preventDefault();
	});
	$('.select-box > .option-list > li.self > a').on('click',function(e){
		var $this = $(this);
		$this.parent().parent('.option-list').stop().slideUp(200);
		$this.parent().parent().prev('.select-option-box').children('.select-option').text('');
		$this.parent().parent().prev('.select-option-box').children('.select-option').prev('.ipt-option').show();
		$('.select-box').removeClass('active');
		$this.parent().parent().prev('.select-option-box').children('.ipt-option').focus().setCursorPosition($('.ipt-option').val().length);
		$('.select-box').removeClass('active');
		setTimeout(function(){
			$this.parent().parent('.option-list').children('li.self').hide();
		}, 300);
		e.preventDefault();
	});
	$('.select-box .select-option').on('focusout',function(e){
		var $this = $(this);
		$this.parent().removeClass('active');
		e.preventDefault();
	});
	$('.select-box').on('focusout',function(e){
		var $this = $(this);
		$this.removeClass('active');
		$this.children('.option-list').slideUp();
		e.preventDefault();
	});

	// 에러메세지 확인용
	$('.ipt-type-1 > input').on('focus',function(){
		var $this = $(this);
		$this.parent('div').siblings('.txt-error-1').toggle();
	});
	$('.ipt-type-1 > input').on('focusout',function(){
		var $this = $(this);
		$this.parent('div').siblings('.txt-error-1').hide();
	});



});
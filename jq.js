var board;
var swap,pl,xwin=0,owin=0;
 $(function onstart(){
	
	initial();
	swap=true;
});
function initial(){
	 board = new Array(9);
	 swap=!swap;
	  
	 for(var i=1;i<=board.length;i++){
		 board[i-1]="";
		 $('#'+i).html("");
	 }
}

$(document).ready(function(){
	$(".button").click(function(){
		initial();
		return;
	});
	$("div").click(function(event){
		
		var id=event.target.id;
		if($('#'+id).text()!=""){
			return
		}
		if(swap){
			$('#'+id).css('color', '#CC0033');
			pl="X";
		}else{
			pl="O";
			$('#'+id).css('color', '#663366');
		}
		$('#'+id).html(pl);
		// alert(id);
		 board[id-1]=pl;
		 if(checkForWinner()){
			 
			 if(swap){
				 xwin++;
			 }else{
				owin++; 
			 }
			  $('#sx').html(" "+xwin);
	 $('#so').html(" "+owin);
	 if (confirm(pl+" is the winner!  New game?")) {
    initial();
  }
		 }
		swap=!swap;
		
		if( $.inArray("", board) <0){
			if(confirm("Draw !! New game?")){
				 initial();
			}
		}
		if(swap){
			$('#X').css('color','black');
			$('#O').css('color','#cccccc');
		}else{
			$('#O').css('color','black');
			$('#X').css('color','#cccccc');
		}
		
	});
});

function weHaveAWinner(a, b, c) {
  if ((board[a] === board[b]) && (board[b] === board[c]) &&( board[a] != "" )) {
 //  alert(a+" "+b+" "+c);
    return true;
  }
  else
    return false;
}

function checkForWinner() {
  /* check rows */
  var a = 0; var b = 1; var c = 2;
  while (c < board.length) {
    if (weHaveAWinner(a, b, c)) {
		
      return true;
    }
    a+=3; b+=3; c+=3;
  }
    
  /* check columns */
  a = 0; b = 3; c = 6;
  while (c < board.length) {
    if (weHaveAWinner(a, b, c)) {
      return true;
    }
    a+=1; b+=1; c+=1;
  }

  /* check diagonal right */
  if (weHaveAWinner(0, 4, 8)) {
     return true;
  }
  /* check diagonal left */
  if (weHaveAWinner(2, 4, 6)) {
    return true;
  }}
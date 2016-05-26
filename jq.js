var board;
var swap,pl,xwin=0,owin=0,oneplayer,finished;
 $(function onstart(){
	$("table").css('visibility','visible');
	initial();
	swap=true;
	
});

function initial(){
	$('#result').hide();
	 board = new Array(9);
	 swap=!swap;
	  
	 for(var i=1;i<=board.length;i++){
		 board[i-1]="";
		 $('#'+i).html("");
		  $("#"+i).css("background-color","white");
		 
	 }
	 finished=false;
	 if(swap){
			$('#X').addClass('selectedplayer');
			$('#O').removeClass('selectedplayer');
			
		}else{
			
			$('#O').addClass('selectedplayer');
			$('#X').removeClass('selectedplayer');
		}
}
function fill_cell( id){
	if($('#'+id).text()!=""|| finished){
			return
		}
		if(swap){
			$('#'+id).css('color', '#CC0033');
			pl="X";
		}else{
			pl="O";
			//ffe6cc
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
	 $('#result').show();
	 $('#textresult').html(pl+" is the winner!");
	 finished=true;

		 }
		 swap=!swap;
		 if(!swap && oneplayer){
			play();
		}
}
$(document).ready(function(){
	$('#X').addClass('selectedplayer');
	$('table').hide();
	//$('#result').hide();
	$('#one').click(function(){
		$('table').show();
		oneplayer=true;
		$('#choice').hide();
		
	});
	$('#two').click(function(){
		oneplayer=false;
		$('table').show();
		$('#choice').hide();
	});
	$('#buttres').click(function(){
		initial();
		$('result').hide();
	});
	$( "td" ).mouseenter(function() {
		
	 $(this).addClass('over');
});
$( "td" ).mouseleave(function() {
		
	 $(this).removeClass('over');
});
	$(".button").click(function(){
		initial();
		return;
		
	});
	$("div").click(function(event){
		
		var id=event.target.id;
		fill_cell(id);
		
		
		if( $.inArray("", board) <0){
			$('#result').show();
	 $('#textresult').html("Draw !! ");
			
		}
		if(swap){
			$('#X').addClass('selectedplayer');
			$('#O').removeClass('selectedplayer');
			
		}else{
			
			$('#O').addClass('selectedplayer');
			$('#X').removeClass('selectedplayer');
		}
		if(!swap  && oneplayer){
			play();
		}
	});
});

function weHaveAWinner(a, b, c) {
  if ((board[a] === board[b]) && (board[b] === board[c]) &&( board[a] != "" )) {
 //  alert(a+" "+b+" "+c);

 $("#"+(a+1)).css("background-color","#ffffcc");
 $("#"+(b+1)).css("background-color","#ffffcc");
 $("#"+(c+1)).css("background-color","#ffffcc");
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
  function chekthreecells(a,b,c,char)
  {
	  if(board[a]==char && board[b]==char && board[c]==""){
		  return c;
	  }
	  if(board[a]==char && board[c]==char && board[b]==""){
		  return b;
	  }
	  if(board[b]==char && board[c]==char && board[a]==""){
		  return a;
	  }
	  
	  return -1;
  }
  function def_or_att(char){
	  var index;
	  //1 2 3 
	  index=chekthreecells(0,1,2,char);
	  if(index>=0){
		  return index+1;
	  }
	  // 4 5 6 
	  index=chekthreecells(3,4,5,char);
	  if(index>=0){
		  return index+1;
	  }
	  // 7 8 9 
	  index=chekthreecells(6,7,8,char);
	  if(index>=0){
		  return index+1;
	  }
	  // 0 3 6
	  index=chekthreecells(0,3,6,char);
	  if(index>=0){
		  return index+1;
	  }
	  // 1 4 7 
	  index=chekthreecells(1,4,7,char);
	  if(index>=0){
		  return index+1;
	  }
	  //  2 5 8
	  index=chekthreecells(2,5,8,char);
	  if(index>=0){
		  return index+1;
	  }
	  // 2 4 6
	   index=chekthreecells(2,4,6,char);
	  if(index>=0){
		  return index+1;
	  }
	  // 0 4 8 
	   index=chekthreecells(0,4,8,char);
	  if(index>=0){
		  return index+1;
	  }
	  return -1;
  }
  function moveanyway(){
	  var arr=[4,0,8,2,6];
	  var n = arr[Math.floor(Math.random()*arr.length)];
	  
	  if(board[n]==""){
			  return n+1;
		  }
		  n = arr[Math.floor(Math.random()*arr.length)];
	  
	  if(board[n]==""){
			  return n+1;
		  }
		   arr=[4,0,8,2,6,1,3,7,5];
	  for(var i=0;i<arr.length;i++){
		  n=arr[i];
		  if(board[n]==""){
			  return n+1;
		  }
		  
	  }
  }
  function play(){
	  
	  var index= def_or_att("O");
	  if(index>=0){
		// alert ("play 1 "+index);
		  fill_cell(index);
		  return;
	  }
	  index=def_or_att("X");
	  if(index>=0){
		   // alert ("play 2");
		   fill_cell(index);
		 return;
	  }
	  
	  fill_cell(moveanyway());
	 
  }
/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
	 pueden eliminar sprites como nave enemiga, misil, nave del
	 jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
	 draw() de un GameBoard que haya sido a�adido como un board a Game,
	 GameBoard debe ocuparse de que se ejecuten los m�todos step() y
	 draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
	 objetos. Un objeto sprite almacenado en GameBoard debe poder
	 detectar si ha colisionado con otro objeto del mismo
	 GameBoard. Los misiles disparados por la nave del jugador deber�n
	 poder detectar gracias a esta funcionalidad ofrecida por GameBoard
	 cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
	 poder detectar si ha colisionado con la nave del jugador; un misil
	 disparado por la nave enemiga debe poder detectar si ha
	 colisionado con la nave del jugador. Para ello es necesario que se
	 pueda identificar de qu� tipo es cada objeto sprite almacenado en
	 el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
	 colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Clase GameBoard", function(){

it ("Iterate", function(){
	var gameBoard = new GameBoard();
	var o1= { step: function() {}};
	var o2= { step: function() {}};
	var o3= { step: function() {}};
	spyOn(o1,"step");
	spyOn(o2,"step");
	spyOn(o3,"step");
	gameBoard.add(o1);
	gameBoard.add(o2);
	gameBoard.add(o3);
	gameBoard.iterate("step",1.0);
	runs(function(){
		expect(o1.step).toHaveBeenCalled();
		expect(o2.step).toHaveBeenCalled();
		expect(o3.step).toHaveBeenCalled();
	});
});

it ("Add", function(){
	var gameBoard = new GameBoard();
	var o1= { step:function(){}};
	spyOn(gameBoard, "add");
	gameBoard.add(o1);
	runs(function(){
		expect(gameBoard.add).toHaveBeenCalled();
		expect(gameBoard.add.calls[0].args[1]).toEqual(o1.step());
	});
});

it ("Remove", function(){
    var gameBoard=new GameBoard();
    var o1={step: function(){}};
    spyOn(gameBoard, "remove");
    gameBoard.remove(o1);
    runs(function(){
    	expect(gameBoard.remove).toHaveBeenCalled();
		expect(gameBoard.remove.calls[0].args[1]).toEqual(o1.step());
    });
});

it ("Reset Removed", function(){
	var gameBoard=new GameBoard();
	spyOn(gameBoard, "resetRemoved");
	gameBoard.resetRemoved();
	runs(function(){
		expect(gameBoard.resetRemoved).toHaveBeenCalled();
	});
});

it ("Finalize Removed", function(){
	var gameBoard=new GameBoard();
	spyOn(gameBoard, "finalizeRemoved");
	gameBoard.finalizeRemoved();
	runs(function(){
		expect(gameBoard.finalizeRemoved).toHaveBeenCalled();
	});
});

it ("Overlap", function(){
	var gameBoard=new GameBoard();
	var o1={x:1,y:2,w:4,h:4};
	var o2={x:1,y:2,w:4,h:4};
	spyOn(gameBoard,"overlap");
	gameBoard.overlap(o1,o2);
	runs(function(){
		expect(gameBoard.overlap).toHaveBeenCalled();
		expect(gameBoard.overlap).toHaveBeenCalledWith(o1,o2)
	});
});

it ("Collide", function(){
	var gameBoard=new GameBoard();
	var o1= { step:function(){}};
	spyOn(gameBoard, "collide");
	gameBoard.collide(o1);
	runs(function(){
		expect(gameBoard.collide).toHaveBeenCalled();
		expect(gameBoard.collide.calls[0].args[1]).toEqual(o1.step());
	});
});

it ("Detect", function(){
	var gameBoard=new GameBoard();
	var o1= { step:function(){}};
	spyOn(gameBoard, "detect");
	spyOn(o1, "step")
	gameBoard.detect(o1);
	runs(function(){
		expect(gameBoard.detect).toHaveBeenCalled();
		expect(gameBoard.detect.calls[0].args[1]).toEqual(o1.step());
		expect(o1.step).toHaveBeenCalled();
	});
});

it ("Draw", function(){
	var gameBoard=new GameBoard();
	var o1 = {draw: function (){}};
	spyOn(gameBoard, "draw");
	gameBoard.draw(o1);
	runs(function(){
		expect(gameBoard.draw).toHaveBeenCalled();
    });
});

it ("Step", function(){
	var gameBoard=new GameBoard();
	spyOn(gameBoard, "step");
	gameBoard.step(1.0);
	runs(function(){
		expect(gameBoard.step).toHaveBeenCalled();
    });
});

});
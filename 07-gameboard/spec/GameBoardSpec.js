/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
	 pueden eliminar sprites como nave enemiga, misil, nave del
	 jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
	 draw() de un GameBoard que haya sido añadido como un board a Game,
	 GameBoard debe ocuparse de que se ejecuten los métodos step() y
	 draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
	 objetos. Un objeto sprite almacenado en GameBoard debe poder
	 detectar si ha colisionado con otro objeto del mismo
	 GameBoard. Los misiles disparados por la nave del jugador deberán
	 poder detectar gracias a esta funcionalidad ofrecida por GameBoard
	 cuándo han colisionado con una nave enemiga; una nave enemiga debe
	 poder detectar si ha colisionado con la nave del jugador; un misil
	 disparado por la nave enemiga debe poder detectar si ha
	 colisionado con la nave del jugador. Para ello es necesario que se
	 pueda identificar de qué tipo es cada objeto sprite almacenado en
	 el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
	 colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Clase GameBoard", function(){

var canvas, ctx;
beforeEach(function(){
	loadFixtures('index.html');
	canvas = $('#game')[0];
	expect(canvas).toExist();
	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
});

it ("Add", function(){
	var gameBoard = new GameBoard();
	var o1= 99;
	gameBoard.add(o1);
	expect(gameBoard.objects[0]).toEqual(99);
	expect(gameBoard.objects.length).toBe(1); 
});

it ("Remove", function(){
	var gameBoard=new GameBoard();
	var o1=99;
	spyOn(gameBoard, "remove");
	gameBoard.remove(o1);
	expect(gameBoard.remove).toHaveBeenCalled();
	expect(gameBoard.objects[0]).toEqual(undefined);
	expect(gameBoard.objects.length).toBe(0);
});

it ("Reset Removed", function(){
	var gameBoard = new GameBoard();
	var o1=99;
	gameBoard.add(o1);
	gameBoard.resetRemoved();
	gameBoard.remove(o1);
	expect(gameBoard.removed[0]).toEqual(99);
});

it ("Finalize Removed", function(){
	var gameBoard = new GameBoard();
	var o1=99;
	gameBoard.add(o1);
	gameBoard.resetRemoved();
	gameBoard.remove(o1);
	gameBoard.finalizeRemoved();
	expect(gameBoard.objects[0]).toEqual(undefined);
});

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

it ("Detect", function(){
	var gameBoard=new GameBoard();
	var o1= {x: 0, y: 0, w: 99, h: 99};
	var o2= {x: 0, y: 0, w: 99, h: 99};
	gameBoard.add(o1);
	expect(gameBoard.collide(o2)).toBe(o1);
});

it ("Step", function(){
	var gameBoard=new GameBoard();
	var o1={};
	spyOn(gameBoard, "step");
	gameBoard.add(o1);
	gameBoard.step(ctx);
	runs(function(){
		expect(gameBoard.step).toHaveBeenCalled();
	});
});

it ("Draw", function(){
	var gameBoard=new GameBoard();
	var o1 = {};
	spyOn(gameBoard, "draw");
	gameBoard.add(o1);
	gameBoard.draw(ctx);
	waits(100);
	runs(function(){
		expect(gameBoard.draw).toHaveBeenCalled();
	});
});

it ("Overlap", function(){
	var gameBoard=new GameBoard();
	var o1={x:1,y:2,w:4,h:4};
	var o2={x:1,y:2,w:4,h:4};
	gameBoard.add(o1);
	gameBoard.add(o2);
	expect(gameBoard.overlap(o1,o2)).toEqual(true);
});

it ("Collide", function(){
	var gameBoard=new GameBoard();
	var o1={x:1,y:2,w:4,h:4};
	var o2={x:1,y:2,w:4,h:4};
	gameBoard.add(o1);
	gameBoard.add(o2);
	expect(gameBoard.collide(o1,o2)).toBe(false);
});

});

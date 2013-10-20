/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
	 missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
	 misiles al tablero de juego en la posici�n en la que est� la nave
	 del usuario. En el c�digo de la clase PlayerSip es donde tienen
	 que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
	 importante que la creaci�n de los misiles sea poco costosa pues va
	 a haber muchos disparos, para lo cual se declarar�n los m�todos de
	 la clase en el prototipo

*/

describe("Clase PlayerMissile", function(){
	var canvas, ctx;
	beforeEach(function(){
		loadFixtures('index.html');
		canvas = $('#game')[0];
		expect(canvas).toExist();
		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
	});
	
	it("draw", function(){
		SpriteSheet = {
			map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
			draw: function() {}
		};
		var miNave = new PlayerMissile(0,3);
		spyOn(SpriteSheet, "draw");
		miNave.draw(ctx); 
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(miNave.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(miNave.y);
	});

	it("step", function(){
		var miNave = new PlayerMissile(0,3);
		var dummyBoard = {remove: function(obj) {}};
		miNave.board=dummyBoard;
		spyOn(dummyBoard, "remove"); 
		miNave.step(1.0); 
		expect(dummyBoard.remove).toHaveBeenCalled();
	});

});
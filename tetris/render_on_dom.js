
function MatrixDOMRenderer(container, matrix){
    
    this._container = $(container);
    this._matrix = matrix;
    
    this._tiles = [];
    
    this._tileWidth = 0;
    this._tilHeight = 0;
    
    this._container.css({
        position: "relative",
        overflow: "hidden"
    });
    
    this._calculatePixelDimensions();
};

MatrixDOMRenderer.prototype.createTile = function(){
    var tile = document.createElement("div");
    tile.style.position = "absolute";
    tile.style.width = this._tileWidth + "px";
    tile.style.height = this._tileHeight + "px";
    return tile;
};

MatrixDOMRenderer.prototype._calculatePixelDimensions = function(){
    var matrix = this._matrix;
    this._tileWidth = Math.round(this._container.width() / matrix.getWidth());
    this._tileHeight = Math.round(this._container.height() / matrix.getHeight());
};

MatrixDOMRenderer.prototype._render = function(){
    
    this._container.empty();
    
    var matrix = this._matrix;
    
    this._tiles = [];
    
    var width = matrix.getWidth();
    var height = matrix.getHeight();
    
    var tileWidth = this._tileWidth;
    var tileHeight = this._tileHeight;
    
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            
            var tile = this.createTile();
            
            tile.style.left = x * tileWidth + "px";
            tile.style.top = y * tileHeight + "px";
            
            tile.className = "tile-" + matrix.get(x, y);
            
            this._container.append(tile);
            
            this._tiles.push(tile);
        }
    }
};

MatrixDOMRenderer.prototype._update = function(){
    
    var matrix = this._matrix;
    
    var tiles = this._tiles;
    var numTiles = tiles.length;
    
    for(var index = 0; index < numTiles; index++){
        var value = matrix.getAtIndex(index);
        tiles[index].className = "tile-" + value;
    }
};

function GameDOMRenderer(container, game){
    
    MatrixDOMRenderer.call(this, container, game.getBackgroundMatrix());
    
    this._game = game;
    
    this._piece = null;
    
    var self = this;
    
    game.on('hit', function(){
        self.updateBackground();
    });
    
    game.on('new-piece', function(){
        self.renderMovingPiece(); 
    });
    
    game.on('move', function(){
        self.updateMovingPiece(); 
    });
    
    game.on('rotate', function(){
        self.rotateMovingPiece(); 
    });
    
    game.on('start', function(){
        self._container.empty();
        self.renderBackground();
    });
};

inherits(GameDOMRenderer, MatrixDOMRenderer);

GameDOMRenderer.prototype.renderBackground = function(){
    this._render();
};

GameDOMRenderer.prototype.updateBackground = function(){
    this._update();
};

GameDOMRenderer.prototype.renderMovingPiece = function(){
    
    if(this._piece){
        $(this._piece).remove();
    }
    
    this._pieceAngle = 0;
    
    var pieceMatrix = this._game.getMovingPieceMatrix();
    var piecePosition = this._game.getMovingPiecePosition();
    
    var tileWidth = this._tileWidth;
    var tileHeight = this._tileHeight;
    
    var el = document.createElement("div");
    el.style.position = "absolute";
    el.style.width = pieceMatrix.getWidth() * tileWidth + "px";
    el.style.height = pieceMatrix.getHeight() * tileHeight + "px";
    el.style.left = piecePosition.x * tileWidth + "px";
    el.style.top = piecePosition.y * tileHeight + "px";
    
    el.className = "piece";
    
    var width = pieceMatrix.getWidth();
    var height = pieceMatrix.getHeight();
    
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            var tile = this.createTile();
            tile.style.left = x * tileWidth + "px";
            tile.style.top = y * tileHeight + "px";
            tile.className = "tile-" + pieceMatrix.get(x, y);
            el.appendChild(tile);
        }
    }
    
    this._container.append(el);
    
    this._piece = el;
};

GameDOMRenderer.prototype.updateMovingPiece = function(){
    
    var pieceMatrix = this._game.getMovingPieceMatrix();
    var piecePosition = this._game.getMovingPiecePosition();
    
    var tileWidth = this._tileWidth;
    var tileHeight = this._tileHeight;
    
    this._piece.style.left = piecePosition.x * tileWidth + "px";
    this._piece.style.top = piecePosition.y * tileHeight + "px";
};

GameDOMRenderer.prototype.rotateMovingPiece = function(){
    return this.renderMovingPiece();
};

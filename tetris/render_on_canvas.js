
function render(game, canvas){
    
    var view = canvas.context;
    var viewWidth = canvas.width;
    var viewHeight = canvas.height;
    
    var composite = game.getCompositeMatrix();
    
    var gameWidth = composite.getWidth();
    var gameHeight = composite.getHeight();
    
    var tileWidth = Math.round(viewWidth / gameWidth);
    var tileHeight = Math.round(viewHeight / gameHeight);
    
    view.clearRect(0, 0, viewWidth, viewHeight);
    
    var fillStyles = [
        "",
        "cyan",
        "blue",
        "orange",
        "yellow",
        "green",
        "purple",
        "red"
    ];
    
    composite.forEachOpaque(function(x, y, value){
        
        view.fillStyle = fillStyles[value];
        
        var params = [
            0.5 + x * tileWidth, 
            0.5 + y * tileHeight, 
            tileWidth,
            tileHeight
        ];
        
        view.fillRect.apply(view, params);
        
        view.lineWidth = 1;
        view.strokeStyle = "rgba(0,0,0, 1)";
        
        view.strokeRect.apply(view, params);
        
        return true;
    });
    
    //var piecePos = game.getMovingPiecePosition();
    //var pieceMatrix = game.getMovingPieceMatrix();
    //view.strokeStyle = "yellow";
    //view.strokeRect(0.5 + piecePos.x * tileWidth, 0.5 + piecePos.y * tileHeight, pieceMatrix.getWidth() * tileWidth, pieceMatrix.getHeight() * tileHeight);
}

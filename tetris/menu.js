
function Menu(foreground, background){

    this._foreground = $(foreground);
    this._background = $(background);
    
    this._showing = false;
    this._showId = 0;

}

Menu.prototype.show = function(element){
    
    this._showing = true;
    
    var foreground = this._foreground;
    var background = this._background;
    
    background.css({
        "-webkit-filter": "blur(2px) grayscale(100%)"
    });
    
    foreground.empty().append(element).fadeIn();
    
    this._showId += 1;
    var showId = this._showId;
    
    var self = this;
    
    return function(){
        if(self._showId == showId){
            self.hide();
        }
    };
};

Menu.prototype.hide = function(){
    
    if(!this._showing){
        return;
    }
    
    this._showing = false;
    
    var foreground = this._foreground;
    var background = this._background;
    
    background.css({
        "-webkit-filter":"none"
    });
    
    foreground.empty().fadeOut();
};

Menu.prototype.title = function(text){
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(text));
    return h1;
};

Menu.prototype.button = function(text, clickHandler){
    var button = document.createElement("button");
    button.type = "button";
    button.appendChild(document.createTextNode(text));
    button.className = "btn";
    if(clickHandler){
        button.onclick = clickHandler;
    }
    return button;
};


function onKeyDown(callback){
    
    var keydowns = {};
    
    var repeat = function(event){
        var delay = callback(event);
        if(delay > 0){
            scheduleRepeat(delay, event);
        }
    };
    
    var scheduleRepeat = function(delay, event){
        
        var timeout = setTimeout(function(){
            repeat(event);
        }, delay);
        
        keydowns[event.keyCode] = {
            timeout: timeout,
            firstEvent: event
        };
    };
    
    var onKeydown = function(event){
        
        var keydown = keydowns[event.keyCode];
        
        if(keydown){
            if(keydown.firstEvent.isDefaultPrevented()){
                event.preventDefault();
            }
        }
        else{
            repeat(event);
        }
    };
    
    var onKeyup = function(event){
        var keydown = keydowns[event.keyCode];
        if(keydown){
            clearTimeout(keydown.timeout);
            delete keydowns[event.keyCode];
        }
    };
    
    $(window).keydown(onKeydown);
    $(window).keyup(onKeyup);
    
    var uninstall = function(){
        $(window).unbind("keydown", onKeydown);
        $(window).unbind("keyup", onKeyup);
        for(var code in keydowns){
            clearTimeout(keydowns[code].timeout);
        }
    };
    
    return uninstall;
}

function bindKeys(bindings){    
    return onKeyDown(function(event){
        var binding = bindings[event.keyCode];
        if(binding){
            event.preventDefault();
            binding.action();
            return binding.delay;
        }
    });
}

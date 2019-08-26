({
    callSync : function(component, event, helper) {
        this.callServer(component, "c.performSearchSync", this.processSearchResults);
    },
    callAsync : function(component, event, helper) {
        this.callServer(component, "c.performSearchAsync", this.processSearchResults);
    },
    
    processSearchResults : function(response, component) {
        console.log(response);
    },
     callServer : function(component, method, callback, params, setStorable) {
        var action = component.get(method);
        
        //Set params if any
        if (params) {
            action.setParams(params);
        }
        
        if(setStorable){
            actions.setStorable();
        }
        
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                // pass returned value to callback function
                callback.call(this, response.getReturnValue(), component);
            } else if (state === "ERROR") {
                // generic error handler
                console.log("Errors");		
                console.log(response.getError());
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown Error");
                }
            }
        });
        
        $A.enqueueAction(action);
    }
})
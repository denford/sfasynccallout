({
    handleSync : function(component, event, helper) {
        helper.callSync(component);
    },
    handleAsync : function(component, event, helper) {
        helper.callAsync(component);
    }    
})
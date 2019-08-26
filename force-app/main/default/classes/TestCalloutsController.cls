public class TestCalloutsController {
    @AuraEnabled(continuation=true)
    public static Object performSearchAsync(){
        
        // using the contunuation with the named credential still sends the authorization header
        Continuation con = new Continuation(20);
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('callout:RequestBin/blah?param1=ABC&param2=42');
        req.setHeader('x-api-key', '{!$Credential.Password}');
        con.continuationMethod = 'processSuppliersSearch';
        con.addHttpRequest(req);
        return con;
    }
    
    @AuraEnabled(continuation=true)
    public static Object processSuppliersSearch(List<String> labels, Object state) {
        HttpResponse res = Continuation.getResponse(labels[0]);
        return res.getBody();
    }
    
    @AuraEnabled
    public static Object performSearchSync(){
        
        // using a synchronous callout with the named credential does not send the authorization header
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('callout:RequestBin/blah?param1=ABC&param2=42');
        req.setHeader('x-api-key', '{!$Credential.Password}');
        HttpResponse res = new Http().send(req);
        return res.getBody();
    }
}
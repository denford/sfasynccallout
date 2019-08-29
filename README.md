# Continuation Salesforce Bug
This project demonstrates how when calling an endpoint asynchronously from apex with a continuation, with a named credential, salesforce seems to ignore the "generate authorization header" option and still sends the header.

## Steps to reproduce
1. Deploy this project to a scratch org
2. Update the Named Credential called RequestBin to a valid [Request Bin](https://requestbin.com) URL
3. Create a new Account record
4. On that Account record test the "Call Sync" and "Call Async" buttons, compare headers sent

## Key Code
Most relevant Code is in the [TestCallouts Aura Component](force-app/main/default/aura/TestCallouts), and the [TestCalloutsController Apex class](force-app/main/default/classes/TestCalloutsController.cls).
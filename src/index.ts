import * as Alexa from "alexa-sdk";

let handlers: Alexa.Handlers = {

}

export class Handler{
  constructor(event: Alexa.RequestBody,context: Alexa.context, callback: Function){
    let alexa = Alexa.handler(event,context);
    alexa.appId = "my_alexa_id";
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}

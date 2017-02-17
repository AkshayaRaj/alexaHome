var https = require('https')

exports.handler = (event, context, callback) => {
    // TODO implement

try{

  if(event.session.new){
      //NEW SESSION
      console.log("NEW SESSION")
  }

  switch(event.request.type){

      case "LaunchRequest":
          console.log("LAUNCH REQUEST")
          //Launch Request
          context.succeed(
            generateResponse(
              buildSpeechletResponse("Hi my name is Peppa Pig, and I love vaanya so much !",true) ,
               {}
            )
          )

          break;
      case "IntentRequest":
          console.log("INTENT REQUEST")
          //Intent Request
          switch(event.request.intent.name){
            case "SayHi" :  context.succeed(
                generateResponse(
                  buildSpeechletResponse("Peppa says hi and she is doing very well",true) ,
                   {}
                )
              )
                  break;

            default:
              throw "invalid intent"

          }

          break;
      case "SessionEndedRequest":
          console.log("SESSION ENDED REQUEST")
          //Session Ended Request
          break;
      default:
          context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
  }

  }

catch(error){context.fail(`Exception: ${error}`)}



//helpers
buildSpeechletResponse = (outputText,shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}


generateResponse = (speechletResponse,sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}



    callback(null, 'Hello from Lambda');
};

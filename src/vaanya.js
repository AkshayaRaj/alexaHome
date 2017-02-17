var https = require('https')

var foodResponse = ["Vaanya please finish your food.. Bhudda baba is coming",
                    "Vaanya please finish your food ",
                    "Vaanya, if you want to be strong, you must finish your foodu ",
                    "Vaanya please finish your food.. Bhudda baba is coming"
                  ]
var toiletResponse = ["Vaanya, please go to the toilet",
                      "Vaanya, its time for suusuu. Please go to the toilet.",
                      "Vaanya, lets go to the toilet !",
                      "Vaanya, please go to the toilet"
                      ]



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
              buildSpeechletResponse("Hi Vaanya, how are you today ",true) ,
               {}
            )
          )

          break;
      case "IntentRequest":
          console.log("INTENT REQUEST")
          //Intent Request
          switch(event.request.intent.name){
            case "TellFood" :  context.succeed(
                generateResponse(
                  buildSpeechletResponse(foodResponse[Math.floor(Math.random()*foodResponse.length)],true) ,
                   {}
                )
              )
                  break;

            case "TellToilet" :  context.succeed(
                generateResponse(
                  buildSpeechletResponse(toiletResponse[Math.floor(Math.random()*toiletResponse.length)],true) ,
                //  buildSpeechletResponse(toiletResponse.randomElement,true),
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

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

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

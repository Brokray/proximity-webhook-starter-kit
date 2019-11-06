# Proximity Webhook Example

A very simple step by step, 10 minutes demo of implementing services using webhook. Whatever user asks your Bot will be sent to your API and then after some processing it'll return the response to the bot, it can be text or even rich messages like cards!.

This simple starter kit will help you understand

- How to write a simple Webhhook with NodeJS quickly.
- How to integrate it to your Virtual Assistant in Proximity.

# How it works?

## Custom your code

- Clone this repo.
- Custom your code.
- Deploy your app on the internet.

## Deploy

Of course a ton of options are available if you would like to deploy y
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Link your webhook to Proximity

Go to [Proximity](https://www.gogowego.com/login)

- Login
- Create your own Virtual Assistant
- In parameters, go to Webhook tab and paste your API's URL endpoint. Example of Webhook URL : https://webhook-proximity-example.herokuapp.com/example
- Create your first intent and some training phrases. At the bottom, check Handover to API.
- Test it! Try your Virtual Assistant and start building it's intelligence using Webhook.
- Enjoy!

### Request body structure you get from your bot

| Parameter     | Description                                     |
| ------------- | ----------------------------------------------- |
| query         | the text message user said                      |
| text          | default response found in the intent            |
| intent        | the name and the confidence of the intent found |
| intent.inputs | list of the entites found                       |

```json
body: { "id": "",
    "timestamp": "2018-09-21T12:02:39+00:00",
    "sessionId": "BxopMtpjDl5Pfrc4",
    "user": { "platform": "web", "conversationSize": 1 },
    "lang": "fr",
    "query": "Je souhaite réserver trois chambres pour 4 personnes avec petit déjeuner",
    "text": "Nous avons un soucis avec votre réservation, réessayez ultérieurement.",
    "textToSpeech":
    {   "type": "plainText",
        "value": "Nous avons un soucis avec votre réservation, réessayez ultérieurement." },
        "intent":
    {   "name": "Reservation",
        "confidence": 0.8936457989344966,
        "inputs": { "ggwg/numberC": 3, "ggwg/numberP": 4, "formule": "f1" } },
    "posts": [],
   "endConversation": false,
   "status": { "code": 200, "errorType": "success" }
   }
```

### Post Data JSON structured like this:

| Parameter    | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| speech       | the text message to output                                         |
| posts        | a list of rich messages                                            |
| rich message | can be either a button, link or card.                              |
| button       | a button will send the "value" as user message when he click on it |
| link         | the link will redirect the user either on a website, call, mail    |
| card         | a card with title, image, text, and a list of buttons              |

```json
{
  "speech" : "text to output",
  "posts" : [
    {"type" : "button","text":"click me","value":"clicked"},
    {"type" : "link","text":"click me","value":"URL | tel:PHONENUMBER | mailto:EMAIL"},
    {"type" : "card","title":"I am a card","image":"image URL","text":"some text..","buttons":[
        {"type":"button | link","text":"...","value":"..."},
        {"..."}
    ]},
  ]
}
```

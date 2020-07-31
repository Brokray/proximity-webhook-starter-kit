# Prisme.ai Webhook Example

A very simple step by step, 10 minutes demo of implementing services using webhook. Whatever user asks your Bot will be sent to your API and then after some processing it'll return the response to the bot, it can be text or even rich messages like cards!.

This simple starter kit will help you understand

- How to write a simple Webhhook with NodeJS quickly.
- How to integrate it to your Virtual Assistant in Proximity.

# How it works?

## Overview

- Clone this repo.
- Custom your code.
- Deploy your app on the internet.

## First launch

After cloning this repo, do not forget to try it on your local machine.

For that :
- Run : `npm install`
- Verify if it works in development mode : `npm run start:dev`
- To locally use your webhook with a Proximty Virtual Agent of your own, you can also run : `npm run tunnel`.   
This command will launch ngrok and create an internet endpoint to your local machine.  
:rotating_light: Do not forget to setup your [Webhook config in Proximity](#link-your-webhook-to-proximity) !

## :rocket: Deploy

Of course, as of 2019, a **ton** of options are available to deploy your webhook on the internet. This is a matter of preference.

We usually use two tools for development :

- While developing we use **Postman** to test each endpoint.
- Then we connect locally our webhook thanks to **ngrok**, check that everything is OK.

Finally for production we deploy our webhook on a service such as **Heroku**.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## :tada: Link your webhook to Proximity

Go to [Proximity](https://www.gogowego.com/login)

- Login
- Create your own Virtual Assistant
- In parameters, go to Webhook tab and paste your API's URL endpoint. Example of Webhook URL : https://webhook-proximity-example.herokuapp.com/example
- Create your first intent and some training phrases. At the bottom, check Handover to API.
- Test it! Try your Virtual Assistant and start building it's intelligence using Webhook.
- Enjoy!

### Request body (structure you get from your bot)

| Parameter     | Description                                     |
| ------------- | ----------------------------------------------- |
| query         | the text message user said                      |
| fulfillment   | the default response found in the intent        |
| intent        | the name and the confidence of the intent found |
| intent.inputs | list of the entites found                       |

```json
"body": {
  "contexts": [],
  "endConversation": false,
  "fulfillment": {
    "data": [
      {
        "text": "With a fallback button",
        "type": "button",
        "value": "Fallback",
      }
    ],
    "stream": [
      {
        "text": "Je suis navré je n'ai pas réussi à contacter le webhook.",
      }
    ]
  },
  "intent": {
    "confidence": 1,
    "inputs": {},
    "name": "Webhook",
  },
  "lang": "fr",
  "originalRequest": null,
  "query": "Je souhaite réserver trois chambres pour 4 personnes avec petit déjeuner",
  "sessionId": "BxopMtpjDl5Pfrc4",
  "timestamp": "2018-09-21T12:02:39+00:00",
  "user": {
    "conversationId": "gUMzmBuXOi",
    "conversationSize": 1,
    "id": "MIlVnHo9ZA",
    "platform": "web",
    },
   }
```

### Response Body (data sent back a response to the end user, JSON):

| Parameter    | Description                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| stream       | the stream text message to output                                                                                       |
| posts         | a list of rich messages                                                                                                 |
| rich message | can be either a button, event, link or card.                                                                            |
| button       | a classic button will send the "value" as user message when he click on it                                              |
| event        | an event button will send an event "value" when the user click on it                                                    |
| link         | the link will redirect the user either on a website, call, mail... Any valid URI can be used (mailto:hello@gogowego.com | tel:PHONENUMBER ...). |
| card         | a card with title, image, text, and a list of buttons                                                                   |

```json
{
  "stream" : [{ "text": "Here is the differents hotels we found." }],
  "posts" : [
    {"type" : "button","text":"Schedule a new trip","value":"I would like to schedule a trip"},
    {"type" : "event", "text":"Help me with something else","value":"PROPOSALS"},
    {"type" : "link", "text":"Go on our website","value":"https://gogowego.com"},
    {"type" : "card","title":"Superb Hotel","image":"IMAGE_URL","text":"Our hotel is one of...","buttons":[
        {"type":"button | link","text":"...","value":"..."},
        {"..."}
    ]},
  ]
}
```

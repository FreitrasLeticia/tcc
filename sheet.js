const express = require("express")
const app = express();
const rp = require("request-promise-native")
const dfff = require("dialogflow-fulfillment")

app.post("/", express.json(), function(request,response){
	dialogflow(request, response)
})

const dialogflow = (request,response) => {
	const agent = new dfff.WebhookClient({request,response})

	function NinasChat2(agent) {
		const name = request.body.queryResult.parameters.Name
		const url = "https://sheetdb.io/api/v1/uh725cvam33hr/search?Name=" + name
		return rp.get(url)
		  .then(message =>{
			const body = JSON.parse(message)
			const definition = body[0].Definition
			agent.add("" + definition)

		})
	}
	let intentMap = new Map()
	intentMap.set("Termos", NinasChat2)
	agent.handleRequest(intentMap)

}


app.listen(3001, function(){
	console.log("O codigo ta vivo!");
})

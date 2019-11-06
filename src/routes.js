export function handleWebhook(request, response) {
  response.setHeader("Content-Type", "application/json");
  response.send(
    JSON.stringify({
      stream: [{ text: "Hello World." }],
      posts: []
    })
  );
}

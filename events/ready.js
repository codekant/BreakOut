module.exports = (client) => {
    console.log("Discord WebSocket connected!");
    client.user.setStatus("idle");
    client.user.setActivity("People escape the prison", {
        type: "WATCHING"
    });
}
module.exports = (fs, client) => {
    let files = fs.readdirSync("./events").filter(lol => lol.endsWith(".js"));
    for(let file of files) {
        let name = file.split(".")[0];
        let props = require(`../events/${name}`);
        client.on(name, props.bind(null, client));
    }
}
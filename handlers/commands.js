module.exports = (fs, client) => {
    let files = fs.readdirSync("./commands").filter(kek => kek.endsWith(".js"));
    for(let file of files) {
        let props = require(`../commands/${file}`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props);
        });
    };
}
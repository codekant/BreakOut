module.exports = (Enmap, client) => {

    client.db = new Enmap({
        name: "database",
        fetchAll: false,
        autoFetch: true,
        ensureProps: true
    });

};
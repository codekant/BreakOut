module.exports = (Enmap, client) => {

    client.ecobase = new Enmap({
        name: "database",
        fetchAll: false,
        autoFetch: true,
        ensureProps: true
    });

};
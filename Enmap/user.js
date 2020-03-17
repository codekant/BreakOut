module.exports = (Enmap, client) => {

    client.db = new Enmap({
        name: "users",
        fetchAll: false,
        autoFetch: true,
        ensureProps: true
    });

};
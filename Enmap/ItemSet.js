module.exports = (Enmap, client) => {
  client.guns = new Enmap({
    name: "guns",
    fetchAll: false,
    autoFetch: true,
    ensureProps: true
  });

  client.other = new Enmap({
    name: "others",
    fetchAll: false,
    autoFetch: true,
    ensureProps: true
  });

  client.vehicles = new Enmap({
    name: "vehicles",
    fetchAll: false,
    autoFetch: true,
    ensureProps: true
  });

  client.locations = new Enmap({
    name: "locations",
    fetchAll: false,
    autoFetch: true,
    ensureProps: true
  });
  
  let guns = require('../Items/guns');
  guns.forEach(gun => {
    client.guns.set(gun.id, gun);
  });
  
  let others = require("../Items/others");
  others.forEach(other => {
    client.other.set(other.id, other);
  });
  
  let vehicles = require("../Items/vehicles");
  vehicles.forEach(vehicle => {
    client.vehicles.set(vehicle.id, vehicle);
  });

  let locations = require("../Coordination/Mapping.js");
  locations.forEach(location => {
    client.locations.set(location.id, location);
  })
};

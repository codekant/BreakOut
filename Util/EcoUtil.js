const Discord = require("discord.js");

class Eco {
  constructor(client) {
    this.client = client;
  } 
  
  ensure(userId) {
       this.client.db.ensure(userId, {
        vehicles: {},
        guns: {},
        equiped: {
          vehicle: {},
          guns: {},
          rest: {}
        },
        eco: {
          money: 0,
          bounty: 0,
          nitro: 50
        },
        role: null,
        location: null
    });
  }

  addMoney(userId, amt) {
    this.client.db.math(userId, "+", parseInt(amt), "eco.money");
  }

  removeMoney(userId, amt) {
    this.client.db.math(userId, "-", parseInt(amt), "eco.money");
  }

  addBounty(userId, amt) {
    this.client.db.math(userId, "+", parseInt(amt), "eco.bounty");
  }

  removeBounty(userId, amt) {
    this.client.db.math(userId, "-", parseInt(amt), "eco.bounty");
  }

  buyVehicle(userId, vehicle) {
    if(typeof vehicle !== "object") throw new SyntaxError("Vehicle needs to be an object");
    this.client.db.set(userId, {
      name: vehicle.name, 
      id: vehicle.id,
      cost: vehicle.cost,
      emoji: vehicle.emoji
    }, `vehicles.${vehicle.id}`);
    this.removeMoney(userId, vehicle.cost);
  }

  buyGun(userId, gun) {
    if(typeof gun !== "object") throw new SyntaxError("Gun needs to be an object");
    this.client.db.set(userId, {
      name: gun.name,
      id: gun.id,
      cost: gun.cost,
      emoji: gun.emoji
    }, `guns.${gun.id}`);
    this.removeMoney(userId, gun.cost);
  }
  
  addRestInventory(userId, item) {
    if(typeof item !== "object") throw new SyntaxError("Item needs to be an object");
    this.client.db.set(userId, {
      name: item.name, 
      id: item.id,
      emoji: item.emoji
    }, `equiped.rest.${item.id}`);
  }

  addGunInventory(userId, gun) {
    if(typeof gun !== "object") throw new SyntaxError("Gun needs to be an object");
    this.client.db.set(userId, {
      name: gun.name,
      id: gun.id,
      emoji: gun.emoji
    }, `equiped.guns.${gun.id}`);
  }

  addVehicleInventory(userId, vehicle) {
    if(typeof vehicle !== "object") throw new SyntaxError("Vehicle needs to be an object");
    this.client.db.set(userId, {
      name: vehicle.name,
      id: vehicle.id,
      emoji: vehicle.emoji
    }, `equiped.vehicles.${vehicle.id}`);
  }

  setLocation(userId, location) {
    if(typeof location !== "string") throw new SyntaxError("Location should be typeof string");
    this.client.db.set(userId, location, `location`);
  }

  switchTeam(userId, role) {
    if(typeof role !== "string") throw new SyntaxError("Location should be typeof string");
    this.client.db.set(userId, role, 'role')
  }

  pitPocket(userId, police) {
    let items = [
      "pistol",
      "shotgun",
      "doughnut",
      "keycard",
      "torch"
    ];
    let item = items[(Math.floor(Math.random() * items.length))];
    return item;
  }
}

module.exports = Eco;
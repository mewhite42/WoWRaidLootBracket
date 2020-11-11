"use strict";

const request = require("request");

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "D@g3nhad",
  database: "wowbracket",
  connectionLimit: 1,
  idleTimeout: 30
});

/**
 * Gets a JSON Object of the a raid structure
 */
module.exports.raidLoot = async (event, context, callback) => {
  var raidObject = {};
  let conn = await pool.getConnection();
  let rows = await conn.query("SELECT * from RAIDS where Raid_Name = 'Blackwing Lair'");

  raidObject.RaidName = rows[0].Raid_Name;
  rows = await conn.query(
      "SELECT b.Boss_Name, b.BossOrder, l.Loot_Pool_ID, l.Quant, PI.item FROM bosses b INNER JOIN loot_pools l ON l.Boss=b.Boss_ID INNER JOIN pool_items pi ON PI.Pool=l.Loot_Pool_ID WHERE raid = 'BWL' ORDER BY BossOrder, Loot_Pool_ID"
    )

    var currentBoss = "";
    var bossIndex = -1;
    var currentPool = "";
    var poolIndex = 0;
    raidObject.bosses = [];

    rows.forEach((row) => {
      if (currentBoss !== row.Boss_Name) {
        currentBoss = row.Boss_Name;
        bossIndex++;
        raidObject.bosses.push({
          Name: row.Boss_Name,
          LootPools: [],
        });
        currentPool = row.Loot_Pool_ID;
        poolIndex = 0;
        raidObject.bosses[bossIndex].LootPools.push({
          Name: row.Loot_Pool_ID,
          Drops: [],
          Quant: row.Quant,
        });
      } else if (currentPool !== row.Loot_Pool_ID) {
        currentPool = row.Loot_Pool_ID;
        raidObject.bosses[bossIndex].LootPools.push({
          Name: row.Loot_Pool_ID,
          Drops: [],
          Quant: row.Quant,
        });
        poolIndex++;
      }

      raidObject.bosses[bossIndex].LootPools[poolIndex].Drops.push(
        row.item
      );
    });
    let response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Conrol-Allow-Methods": "OPTIONS,GET,POST",
      },
      body: JSON.stringify(raidObject),
      isBase64Encoded: false,
    };

    await conn.end();
    await pool.end();
    callback(null, response);

        


};


module.exports.submitBet = (event, context, callback) => {
  var raidObject = {};
  console.log(event.body);

  var submission = JSON.parse(event.body);
  var thursday = new Date();    
  thursday.setDate(thursday.getDate() + (+(4-thursday.getDay())) % 7);

  pool
    .getConnection()
    .then((conn) => {
      Object.keys(submission).forEach((key) => {
        if (key !== "Name")
          submission[key].forEach((item) => {
            conn.query("INSERT INTO submissions value (?, ?, ?, ?)", [
              submission.Name,
              thursday,
              key,
              item,
            ]);
          });
      });

      let response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Conrol-Allow-Methods": "OPTIONS,GET,POST",
        },
        body: "Submission Successful",
        isBase64Encoded: false,
      };
      console.log("ended");
      conn.release();
      callback(null, response);
    })
    .catch((err) => {
      console.log(err);
      //not connected
    });
};

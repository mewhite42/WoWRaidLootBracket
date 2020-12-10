"use strict";

const request = require("request");

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "dagenhad.ddns.net",
  user: "root",
  password: "D@g3nhad",
  database: "wowbracket",
  connectionLimit: 1,
  idleTimeout: 5
});

/**
 * Gets a JSON Object of the a raid structure
 */
module.exports.raidLoot = async (event, context, callback) => {
  try {
  var raidObject = {};
  let conn = await pool.getConnection();
  let rows = await conn.query("SELECT * from RAIDS where RAID_ID = 'AQ40'");

  raidObject.RaidName = rows[0].Raid_Name;
  rows = await conn.query(
      "SELECT b.Boss_Name, b.BossOrder, l.Loot_Pool_ID, l.Quant, PI.item FROM bosses b INNER JOIN loot_pools l ON l.Boss=b.Boss_ID INNER JOIN pool_items pi ON PI.Pool=l.Loot_Pool_ID WHERE raid = 'AQ40' ORDER BY BossOrder, Loot_Pool_ID"
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
    console.log(raidObject);
    return response;
  }
  catch(e){
    console.log(e);
  }
};


module.exports.submitBet = async (event, context, callback) => {
  var raidObject = {};
  console.log(event.body);

  var submission = JSON.parse(event.body);
  var thursday = new Date();    
  thursday.setDate(thursday.getDate() + (+(4-thursday.getDay())) % 7);

  var raidObject = {};
  let conn = await pool.getConnection();
  var i, j;

  for(i=0; i < Object.keys(submission).length; i++ )
  {
    var key = Object.keys(submission)[i];
    if (key !== "Name")
    for(j = 0; j < submission[key].length; j++){
      await conn.query("INSERT INTO submissions value (?, ?, ?, ?)", [
        submission.Name,
        thursday,
        key,
        submission[key][j],
      ]);
    }
  }

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
  conn.release();
  return response;
};

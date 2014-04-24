// Run this with the MongoDB shell

// Remove old collection
db.counters.drop();

// Initial values
db.counters.insert({name: "front_page", count: 0});
db.counters.insert({name: "short_id", count: parseInt("a000", 36)});

// Double-check the values that were inserted
db.counters.find();

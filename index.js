const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: "test",
      cuisine: "Author",
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    console.log("recipes added!")
  
    return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(recipe => {
    console.log("recipe updated!")
    
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(info => {
    console.log("recipe deleted!", info);
  }) 
  .then(() => mongoose.disconnect())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

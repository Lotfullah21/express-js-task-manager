`res.json(req.body)` returns whatever we are attaching to the body of the request.

### mongoose.schema

## Schema

a schema is a blueprint that defines the structure of documents in a MongoDB collection.
it is a representation for the collection we are setting up or in another words it defines the structure of our document like the type, validation.

Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

It specifies the fields (properties) a document can have and the data types for each field. In your code, you've defined a schema for kittens with a single property name of type String. This schema defines what a "kitten" document should look like in your MongoDB collection.

### mongoose.model()

# Model

a model is a constructor function that creates documents (individual records) based on the schema. It provides an interface for interacting with a specific collection in your MongoDB database. When you compile a schema into a model, you create a class for working with documents that follow that schema.

it provides an interface to the database.
an instance of a model is called document.
using Models, we can read and write documents from MongoDB database.
A model is a class with which we construct documents

#### How to create a schema and then connect to model?

##### Step 1: create a schema

using schema, we create property and behaviors

```js
const countrySchema = new mongoose.Schema({
  name: String,
});
```

##### Step 2: compile the scheme into a model.

```js
mongoose.model(modelName, schema); // syntax
const Country = mongoose.model("Country", countrySchema);
```

Now you can use the Country model to create, read, update, and delete documents in the 'Countries' collection in your MongoDB database.

##### Step 3: Create and save the model in database.

```js
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
};
```

## Connection

```js
const mongoose = require("mongoose");

const connectDataBase = (url) => {
  mongoose.connect(url);
};

module.exports = connectDataBase;
```

#### Validation:

we use validation to have desired set of data points and avoid redundant information by the users.
we have to define the validation while creating the Schema, for instance each property has the `required` option which means it cannot be blank.
and the other properties are like `maxlength or minlength` for String type.
along the validation requirement, a message also can be sent.

```js
// define schema
const TaskSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true]
    minlength:[3,"name cannot be less than three characters"]
    max:12
  }
})
// compile the schema into model
const Task = mongoose.model("Task",TaskSchema)

// create a document (instance) from the model
await Task.create({name:"king khan"})

// another approach
const Task = new Task({ name: 'king khan' });
await small.save();
```

# CRUD Operations.

A Model is a class that's our primary tool for interacting with MongoDB.
Models provides several static helper functions which can help us in `CRUD` operations.
some examples are
`Model.deleteOne()
Model.find()
Model.findById()`
and many more.
each of these functions returns a mongoose Query object.
Query constructor used for building queries, but we can use the models instead.

`MyModel.find().where('pets').all(['dog', 'cat', 'ferret']);`

a mongoose query can be executed in two ways, first it can be passed in a callback function, mongoose will execute the the query asynchronously and the result will be passed to the callback.

remember, queries should be passed in json format and one more thing, queries are not promises.

`const Task = await Task.findOne({ 'name': 'Ghost' });`

### Read Operation (Get) using Model.find()

<!-- find all documents from the give model -->

`await MyModel.find({})`

<!-- find all models that named ahmad and the age is > 18 -->

`await MyModel.find({ name: 'ahmad', age: { $gte: 18 } }).exec()`

### Model.findOne()

find one document based on the condition we are providing, if conditions is null or undefined, mongoose will send an empty findOne command to MongoDB, which will return an arbitrary document.

<!--  Find one adventure whose `country` is 'India', otherwise `null` -->

`js await Adventure.findOne({ country: 'India' }).exec() `

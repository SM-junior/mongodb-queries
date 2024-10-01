

//................................mongodb queries.............................
//............................................................................

// field filtering
// db.test.find({gender:'Male'},{name:1, email:1, phone:1})

//projection-->same output as field filtering
// db.test.find({gender:'Male'}).projection({name:1, email:1, phone:1})

//insertOne-->insert single document to a collection
// db.broker.insertOne({name:'akbor', email:"akbor@gmail.com", contact:+0023354})

//insert many-->insert many document to a collection
// db.broker.insertMany([
//     {name:'kachon', email:'ka@gmail.com'},
//     {name:'saiful', email:'sa@gmail.com'},
//     {name:'shishir', email:'Sh@gmail.com'}
//     ])

//find -->find all from a collection
// db.broker.find()

// $eq-->equal to
// db.test.find({age:{$eq:30}})

// $ne -->not equal to
// db.test.find({age:{$ne:30}}).sort({age:1})

//$lt -->less than
// db.test.find({age:{$lt:40}}).sort({age:1})

//$gt-->greater than
// db.test.find({age:{$gt:50}}).sort({age:1})

//$gte -->greater than or equal
// db.test.find({age:{$gte:50}}).sort({age:1})

//$lte -->less than or equal
// db.test.find({age:{$lte:40}}).sort({age:1})

//$in -->
// db.test.find({
//     age:{$in:[18,20,22,24,26,28,30]},  //jar jar moddhe age array ar moddekar aktao value milbe tader dibe
//     gender:"Female"
// })
// .sort({age:1})
// .projection({name:1, age:1, contact:1, email:1})

//$nin-->
// db.test.find({
//     interests:{$nin:['Gaming']}, //jar jar moddhe 'Gamming' ace tader bad diye baki gulo dibe'
//     gender:'Female'
// }).projection({email:1, interests:1})

//implicit and-->2 br tar besi field diye find korar jonno
// db.test.find({
//     age: { $gte: 18, $lte: 30 },  //field same hole just maj khane korma dilei hbe
//     gender: 'Male'
// }).projection({ age: 1, email: 1, gender: 1}).sort({age:1})


// $and -->sob sorto match kora lagbe
// db.test.find({
//     $and: [
//         { age: { $gte: 18 } },
//         { age: { $lte: 30 } }
//     ]
// })

// db.test.find({
//     $and:[
//         {age:{$gt:30}},  //field different hole $and use korbo; field same hole implicit and use korai valo
//         {gender:"Male"},
//         {"skills.name":"C#"}
//         ]
// }).projection({skills:1, gender:1, age:1})

//$or--> je kono akta sorto match korlei hobe
// db.test.find({
//     $or:[
//         {age:{$gt:30}},
//         {age:{$lt:50}},
//         {gender:"Male"},
//         {"skills.name":"C#"}
//         ]
// }).projection({skills:1, gender:1, age:1})

//exists-->check if specified field is exist or not
// db.test.find({age:{$exists:true}}) //true -->age filed ace amon documents gula dao
// db.test.find({age:{$exists:false}}) //false -->age filed nai amon documents gula dao

// db.test.find({
//     interests:{$exists:true, $nin:['Gaming','Travelling']}
// })

//size-->check how many elements exists in an array
// db.test.find({
//     skills:{$size:2} //size:2-->skills array contains 2 elements
// }).projection({skills:1})

//$all-->
// db.test.find({
//     interests:{$all:['Gardening','Travelling','Reading']}
// }).projection({interests:1})

//...equivalent to...
// db.test.find({
//     $and:[
//         {interests:'Reading'},
//         {interests:'Gardening'},
//         {interests:'Travelling'},
//         ]
// }).projection({interests:1})


// $elemMatch-->
// db.test.find({
//     skills: {
//         $elemMatch: {
//             name: "JAVA", //name hobe JAVA & JAVA ar level hobe expert
//             level: "Expert"
//         }
//     }
// }).projection(({ skills: 1 }))

//$set -->replace the value of a field with specified value(notun je value deoa hobe).

//........syntax.........
// db.collectionname.updateOne(
//     {kake update korte cai},
//     {ki update korte cai}
//     )

// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     { $set: { age: 177 } } //for single field
// )

// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $set: { //for multiple fields
//             gender: "male",
//             'address.country': "kuwait",
//             'friends.3': 'Shahin Alam'
//         }

//     }
// )

//$addToSet--> update a value in an array unless the value is already exists in this array

// update one element in an array
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $addToSet: {
//             interests:'xyz'
//         }

//     }
// )

// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $addToSet: {
//             interests:['p','q','r'] // -->['p','q','r'] akta element hisebe array te add hobe
//         }
//     }
// )

//$each-->insert multiple elements in an array
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $addToSet: {
//             languages: {
//                 $each: ['urdu', 'hindi','farsi','bangla'] //-->alada alada emelent hisebe array te add hobe, duplicate gula add hobe na
//             }
//         }
//     }
// )

// $push -->
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $push: {
//             interests:{
//                 $each:['x','y','x'] -->x,y,z alada alada element hisebe array te add hobe, duplicate thakleo add hobe
//             }

//         }

//     }
// )


//$unset-->delete a field with value
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     { $unset: { age: 1 } }
//)

//$pop-->The $pop operator removes the first or last element of an array. 
// -1 to remove the first element of an array
// 1 to remove the last element in an array
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $pop: {
//             languages:-1
//         }
//     }
// )
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $pop: {
//             languages: 1
//         }
//     }
// )
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $addToSet: {
//             languages: {
//                 $each: ['urdu', 'hindi','farsi','bangla']
//             }
//         }
//     }
// )

//$pull-->remove any single element from array
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $pull: {
//             languages: 'hindi',
//             interests:'a'
//         }
//     }
// )

//$pullAll-->remove multiple element from array
// db.test.updateOne(
//     { _id: ObjectId("6406ad65fc13ae5a400000c7") },
//     {
//         $pullAll: {
//             interests: [["gossiping", "cycling"], "b", "b", "c", "c", "xyz"]
//         }
//     }
// )

//...................practice........................

//1.Find all documents in the collection where the age is greater than 30, and
// only return the name and email fields.
// db.test.find({age:{$gt:30}}).projection({name:1, email:1})

//2.Find documents where the favorite color is either "Maroon" or "Blue."
// db.test.find({
//     $or:[
//         {favoutiteColor:'Maron'},
//         {favoutiteColor:'Blue'},
//         ]
// }).projection({favoutiteColor:1})

//3.Find all documents where the skill is an empty array.
// db.test.find({
//     skills:{
//         $size:0
//     }
// }).projection({skills:1})

//4.Find documents where the person has skills in both "JavaScript" and
// "Java."
// db.test.find({
//     $and:[
//         {'skills.name':'JAVASCRIPT'},
//         {'skills.name':'JAVA'},
//         ]
// }).projection({skills:1})

//5.Add a new skill to the skills array for the document with the email
// "amccurry3@cnet.com". The skill is
// {"name": "Python"
// ,
// "level": "Beginner"
// ,
// "isLearning": true}
// Note: At first, you will have to insert the given email then add the skill
// mentioned above
// db.test.updateOne(
//     { email: 'amccurry3@cnet.com' },
//     {
//         $addToSet: {
//             skills: {
//                 name: "Python",
//                 level: 'Beginner',
//                 isLearning: 'true'
//             }
//         }
//     }
// )

// 6. Add a new language "Spanish" to the list of languages spoken by the
// person.
// db.test.updateMany(
//     {},
//     {
//         $push:{
//           languages:{
//               $each:['Spanish']
//           }
//         }
//     }
//     )

// 7. Remove the skill with the name "Kotlin" from the skills array.
// db.test.updateMany(
//     {},
//     {
//         $pull: {
//             skills:{name:'KOTLIN'}
//         }
//     }
// )




//................................mongodb aggregation.............................
//............................................................................

















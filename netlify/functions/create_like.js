// Goal: Provide a function to "like" a post in Firebase
// Requirement: "Likes" are user-specific – a user can "like" a post, but only once.
// Currently, the "number of likes" on a post isn't user-specific, nor does it prevent an
// unlimited number of likes. How would we expand/refactor our domain model to support this?

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // get the three querystring parameters and store in memory
  let postId = event.queryStringParameters.postId
  let userId = event.queryStringParameters.userId

  
  // write the recipe and the implementation

  //Post to Firebase likes collection but only if it doesn't exist

  let db = firebase.firestore()

  let querySnapshot = await db.collection('likes').where('userId', '==', `${userId}`).where(`postId`,`==`,`${postId}`).get()
  console.log(querySnapshot.size)
  if (querySnapshot.size>0){ console.log(`Already exists`)} else {
    await db.collection('likes').add({
      postId: postId,
      userId: userId
    })
  }  

  return {
    statusCode: 200
  }
}
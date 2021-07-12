// Goal: Provide a function to create a new comment in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_comment?postId=xxxxxxxxx&userName=Brian&body=Tacos!
exports.handler = async function(event) {

  // get the three querystring parameters and store in memory
  let postId = event.queryStringParameters.postId
  let commentBody = event.queryStringParameters.commentBody
  let userName = event.queryStringParameters.userName

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection('comments').add({
    body: commentBody,
    postId: postId,
    userName: userName,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}




//Communicating with Clarifai API: PAT. USER_ID given in their documentantion, and website.
const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = '4b3e491c65e64af4bcd78a4c6656bb52';
    const USER_ID = 'keittaki';       
    const APP_ID = 'face_reco';
    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  }; 
 
  return requestOptions;  //so this is going to return for us the method headers and the body which will have the image URL.

}

const handleApiCall = (req,res) => {
    fetch(
        "https://api.clarifai.com/v2/models/" 
        + 'face-detection' 
        + "/outputs", 
        returnClarifaiRequestOptions(req.body.input))
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
    }


const handleImage = (req, res, db) => {  // a new user is gonna be created here
    
    const {id} = req.body; 
    
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
        .catch(err => res.status(400).json('Unable to get entries'));
  }

export  {handleImage, handleApiCall};
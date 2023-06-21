const handleProfileGet = (req,res,db) => {  
    //     This time it'll just be a GET request and it's going to accept '/profile/' and an 'id' – remember that if we do
    // it with this syntax [:id] that means we can enter in our browser anything and we'll be able to grab this 'id'
    // through the 'req.params' property rights.
        
        const {id} = req.params; 
        // let found = false; 
    // Well in order to get our users we want to loop through our sample database and find the matching 'id'.
    // If it matches. We want to return the user.
    
          db.select('*').from('users').where({id: id})
          .then(user => {
            
            if (user.length) {
                res.json(user[0]);
            } else{
                res.status(400).json("error getting user");
            }
            
          })
    }

    export default handleProfileGet;
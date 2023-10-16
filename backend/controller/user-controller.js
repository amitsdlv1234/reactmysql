// import { query } from "express";
import Connection from "../database/db.js";


export const getUsers = async () => {
    try {
      const [rows, fields] = await Connection.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  // Example usage
  getUsers()
    .then(users => {
      console.log(users);
    })
    .catch(error => {
      console.error(error);
    });


// // Get all users
// export const getUsers = async (request, response) => {
//     let query="SELECT * FROM Student_Data"
//     await Connection.query(query,(err,result)=>{
//         try{
//             response.status(200).json(query);
//         }catch( error ){
//             response.status(404).json({ message: error.message })
//         } 
//     })
    
// }

// Save data of the user in database
export const addUser = async (request, response) => {
    let user = request.body;

    // Check if required properties are defined in the user object
    // if (user && user.Roll_No && user.name && user.Email && user.Phone) {
        const query = "INSERT INTO Student_Data(Roll_No, name, Email, Phone) VALUES (?, ?, ?, ?)";
        
        // Execute the SQL query with user data
        await Connection.query(query, [user.Roll_No, user.name, user.Email, user.Phone], (err, result) => {
            if (!err) {
                return response.status(200).json({ message: "Successfully added user" });
            } else {
                // Handle specific database error (for example, duplicate entry, foreign key violation, etc.) if needed
                console.error(err);
                return response.status(500).json({ message: "Error occurred while adding user" });
            }
        });
    // } else {
        // Handle case where required properties are missing in the request body
        // return response.status(400).json({ message: "Invalid request body" });
    // }
};



// Get a user by id
export const getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited user in the database
export const editUser = async (request, response) => {
    let user = request.body;

    const editUser = new User(user);
    try{
        await User.updateOne({_id: request.params.id}, editUser);
        response.status(201).json(editUser);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of user from the database
export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
export const getStudent = async (request, response) => {
    try{
        const user = await User.find({Roll_No:request.body.Roll_No});
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}
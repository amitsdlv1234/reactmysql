
import mysql from "mysql2";
const Connection = async () => {
    try {
        // 1 - Current URL string parser is deprecated, and will be removed in a future version. 
        // 2 - Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.
           
        await mysql.createPool({
        host:"localhost",
        user:"root",
        password:"Amit@1234",
        database:"CURD_APP",
        connectionLimit:10});
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;
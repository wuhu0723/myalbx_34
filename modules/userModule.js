

exports.login = (email,callback) => {
    var sql = `SELECT * from users where email = '${email}'`
    connection.query(sql,(err,result) => {
        if(err){
            callback(err)
        }else{
            callback(null,result[0])
        }
    })
}
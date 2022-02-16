const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@thechronoaproject.umtkq.mongodb.net/projectDB?retryWrites=true&w=majority`

const db = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,   
        })

    } catch (err) {
        console.error(err)
        console.log('Connection error');
        process.exit(1)        
    }
}

module.exports = db
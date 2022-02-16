const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://chronoa:mhxalter2656@thechronoaproject.umtkq.mongodb.net/projectDB?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

    } catch (err) {
        console.error(err)
        console.log('Connection error');
        process.exit(1)        
    }
}

module.exports = db
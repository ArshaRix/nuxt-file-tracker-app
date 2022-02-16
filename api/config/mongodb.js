const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
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
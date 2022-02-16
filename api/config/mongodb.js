const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
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
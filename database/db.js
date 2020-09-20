require('dotenv').config();
const mongoose = require('mongoose');

const ConnectDb = async () => {
    await mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).
        then(() => console.log('Connected to Database Successfully...'))
        .catch(err => console.error('Failed Could not connect to Database', err));
}

ConnectDb();
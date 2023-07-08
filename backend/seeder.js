import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Tasks from './models/tasksModel.js'
import Customers from './models/customersModel.js'
import customers from './data/cus.js'
import tasks from './data/jan.js'




dotenv.config()



const importData = async () => {
    try {
        await connectDB()
        // await Project.deleteMany()
        await Tasks.deleteMany()
        // await Customers.deleteMany()
        // await User.deleteMany()
        // await Slide.deleteMany()

        // const createUsers = await User.insertMany(users)

        // const adminUser = createUsers[0]._id
        // const sampleProducts = products.map(product => {
        //     return {...product, user: adminUser}
        // })

        // await Product.insertMany(sampleProducts)y

        
        

        // // const  = createUsers[0]._id
        // const customer = customers.map(product => {
        //     return {...product}
        // })

        await Tasks.insertMany(tasks)

        // await Slide.insertMany(sampleSlides)
        console.log('Data Imported! '.green.inverse)
        process.exit()
 
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Oder.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        
        console.log('Data Destroyed! '.red.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] == '-d') {
    destroyData()
}
else {
    importData()
}
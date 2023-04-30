const nedb = require('nedb');

class goals {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert({
            name: 'testName',
            type: 'testType',
            goalValue: 'testValue',
            goalDate: "testDate"
        });
    
        console.log("load test added");
        }
    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function(err, goal) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(goal);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', goal);
                }
            })
        })
    }  
    getPetersEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ author: 'Peter' }, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getPetersEntries() returns: ', entries);
                 }
            })
        })
    }

    addEntry(name, type, goalValue, goalDate) {
        var entry = {
        name: name,
        type: type,
        goalValue: goalValue,
        goalDate: goalDate}
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
        if (err) {
        console.log('Error inserting document', subject);
        } else {
        console.log('document inserted into the database', doc);
        }
        }) 
    } 

    deleteEntry(name){
        var entry= {
            name: name,
        }
    }
      
}

module.exports = goals;
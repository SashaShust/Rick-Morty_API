const yargs = require('yargs');
const data = require('./finder');

yargs.command({
    command: "search",
    describe: "character search",
    builder: {
        id: {
            describe: "character's id",
            demandOption: false,
            alias: "id",
            type: "number"
        },
        name: {
            describe: "character's name",
            demandOption: false,
            alias: "n",
            type: "string"
        },
        status: {
            describe: "character's status",
            demandOption: false,
            alias: "st",
            type: "string"
        },
        species: {
            describe: "character's species",
            demandOption: false,
            alias: "sp",
            type: "string"
        },
        type: {
            describe: "character's type",
            demandOption: false,
            alias: "t",
            type: "string"
        },
        gender: {
            describe: "character's gender",
            demandOption: false,
            alias: "g",
            type: "string"
        },
        location: {
            describe: "character's status",
            demandOption: false,
            alias: "l",
            type: "string"
        }
    },
    handler(argv) {
        const arrayOfAcceptableArgs = ['id', 'name', 'status','species', 'type', 'gender', 'location'];
        argv = Object.entries(argv).filter(argument => arrayOfAcceptableArgs.includes(argument[0]));
        data.getDB(argv);
    }
});

yargs.parse();
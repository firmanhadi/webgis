var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'd86vl3ccdip81n',
    user: 'fetdoodczrbscr',
    password: 'a1f96bad60a182fa9de1c2977e7573cd357aafc01bab3a3a3dff7eded13eab40'
    }
    }
    
    var connectionString = "fetdoodczrbscr:a1f96bad60a182fa9de1c2977e7573cd357aafc01bab3a3a3dff7eded13eab40@ec2-54-247-94-127.eu-west-1.compute.amazonaws.com:5432/d86vl3ccdip81n?ssl=prefer";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
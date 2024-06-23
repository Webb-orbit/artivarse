import { Client, Databases, ID, Query } from "appwrite";
import appwriteconf from "../config/conf";

class readers {
    reader
    client
constructor(){
    this.client = new Client()
    this.client.setEndpoint(appwriteconf.appwriteurl)
    .setProject(appwriteconf.projectid);

    this.reader = new Databases(this.client)
}

async createreader(readerid, following){
    return await this.reader.createDocument(appwriteconf.database, appwriteconf.readercollon, ID.unique(), {readerid, following})
}

async updatereader(id, {following, readerid}){
    console.log("updater", following, readerid);
    return await this.reader.updateDocument(appwriteconf.database, appwriteconf.readercollon, id, {following, readerid})
}

async deletereader(id){
return await this.reader.deleteDocument(appwriteconf.database, appwriteconf.readercollon, id)
}

// Queries

async getreaderbyuserid(id){
    return await this.reader.listDocuments(appwriteconf.database, appwriteconf.readercollon, [Query.equal("readerid",[id])])
}
    
}
const Readerbase = new readers()

export default Readerbase
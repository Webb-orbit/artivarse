import { Client, Databases, ID, Query } from "appwrite";
import appwriteconf from "../config/conf";

class creators {
    creator
    client
constructor(){
    this.client = new Client()
    this.client.setEndpoint(appwriteconf.appwriteurl)
    .setProject(appwriteconf.projectid);

    this.creator = new Databases(this.client)
}

async createcreator(creatorname, creatorlogo, creatorcover, creatordes,  creatoruserid,followers){
    return await this.creator.createDocument(appwriteconf.database, appwriteconf.blogcreator, ID.unique(), {creatorname, creatorlogo, creatorcover, creatordes,  creatoruserid,followers})
}


async getonecreator(id){
    return await this.creator.getDocument(appwriteconf.database, appwriteconf.blogcreator, id)
}

async updatecreator(id, {creatorname, creatorlogo, creatorcover, creatordes,  creatoruserid,followers}){
    return await this.creator.updateDocument(appwriteconf.database, appwriteconf.blogcreator, id, {creatorname, creatorlogo, creatorcover, creatordes,  creatoruserid,followers})
}

async deletecreator(id){
return await this.creator.deleteDocument(appwriteconf.database, appwriteconf.blogcreator, id)
}

// Queries

async getcreatorbyuserid(id){
    return await this.creator.listDocuments(appwriteconf.database, appwriteconf.blogcreator, [
        Query.equal("creatoruserid", [id]),
    ])
}
    

}
const Creatorbase = new creators()

export default Creatorbase
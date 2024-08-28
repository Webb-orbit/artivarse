import { Client, Databases, ID, Query } from "appwrite";
import appwriteconf from "../config/conf";

class blogs {
    blog
    client
constructor(){
    this.client = new Client()
    this.client.setEndpoint(appwriteconf.appwriteurl)
    .setProject(appwriteconf.projectid);

    this.blog = new Databases(this.client)
}

async createblog(blogtitle, bshortdes, view, likes, comtent, category, btags, creatorid, coverimg){
    return await this.blog.createDocument(appwriteconf.database, appwriteconf.blogcollon, ID.unique(), {blogtitle, bshortdes, view, likes, comtent, category, btags, creatorid, coverimg})
}

async listblog(){
    return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [
        Query.limit(6),
    ])
}


async getoneblog(id){
    return await this.blog.getDocument(appwriteconf.database, appwriteconf.blogcollon, id)
}

async updateblog(id, {blogtitle, bshortdes, comtent, category, btags, coverimg, view, likes}){
    return await this.blog.updateDocument(appwriteconf.database, appwriteconf.blogcollon, id, {blogtitle, bshortdes, comtent, category, btags, coverimg, view, likes})
}

async deleteblog(id){
return await this.blog.deleteDocument(appwriteconf.database, appwriteconf.blogcollon, id)
}

// quearys
async listallblogsbycreator(id){
return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [Query.equal("creatorid", [id])])
}

async listblogsbycreator(id){
return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [Query.limit(5),Query.equal("creatorid", [id])])
}

async glogsbykeywords(keywords){
    return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [Query.equal("btags", keywords)])
}

// async glogsbysearchs(keywords){ 
//     return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [Query.search("blogtitle", keywords)])
// }

async listblogsbyinfint(lastId){
    return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [
        Query.limit(6),
        Query.cursorAfter(lastId),
    ])
}

async listcreatorblogsbyinfint(lastId, id){
    return await this.blog.listDocuments(appwriteconf.database, appwriteconf.blogcollon, [
        Query.equal("creatorid", [id]),
        Query.limit(5),
        Query.cursorAfter(lastId),
    ])
}

}
const Blogbase = new blogs()

export default Blogbase
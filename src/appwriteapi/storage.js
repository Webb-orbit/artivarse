import { Client, Storage , ID } from "appwrite";
import appwriteconf from "../config/conf";

class storageclass {
    storage
    client
    
constructor(){
    this.client = new Client()
    this.client.setEndpoint(appwriteconf.appwriteurl)
    .setProject(appwriteconf.projectid);

    this.storage = new Storage(this.client)
}

// logobucket
async uploadlogo(file){
    return await this.storage.createFile(appwriteconf.logoid, ID.unique(), file)
}

async deletelogo(fileid){
    return await this.storage.deleteFile(appwriteconf.logoid, fileid)
}

async logoforview(fileid){
    return await this.storage.getFileView(appwriteconf.logoid, fileid)
}
async logoforpreview(fileid){
    return await this.storage.getFilePreview(appwriteconf.logoid, fileid)
}
// logobucket

// bannerbucket
async uploadbanner(file){
    return await this.storage.createFile(appwriteconf.banner, ID.unique(), file)
}

async deletebanner(fileid){
    return await this.storage.deleteFile(appwriteconf.banner, fileid)
}

async bannerforview(fileid){
    return await this.storage.getFileView(appwriteconf.banner, fileid)
}
// bannerbucket

// blogimgbucket
async uploadbcover(file){
    return await this.storage.createFile(appwriteconf.blogcover, ID.unique(), file)
}

async deletebcover(fileid){
    return await this.storage.deleteFile(appwriteconf.blogcover, fileid)
}

async bcoverforview(fileid){
    return await this.storage.getFileView(appwriteconf.blogcover, fileid)
}

async coverforpreview(fileid){
    return await this.storage.getFilePreview(appwriteconf.blogcover, fileid)
}
// blogimgbucket

}

const Storagebucket = new storageclass()

export default Storagebucket
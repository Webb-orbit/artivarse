import { Client, Account, ID, Avatars} from "appwrite";
import appwriteconf from "../config/conf";

class author {
    client = new Client()
    account
    avatar
    constructor() {
        this.client
            .setEndpoint(appwriteconf.appwriteurl)
            .setProject(appwriteconf.projectid);
        this.account = new Account(this.client)
        this.avatar = new Avatars(this.client)

    }

    async getcurrentuser(){
        return await this.account.get()
    }

   async firstcreate(email, password, name){
     let creation = await this.account.create(ID.unique(),email, password, name)
     if (creation) {
        return await this.login(email, password)
     }
   }

   async createvaryfy(){
    return await this.account.createVerification("http://localhost:5173/Verification")
   }

   async Verifyuser(userid, secret){
    return await this.account.updateVerification(userid, secret)
   }

   async login(email, password){
    return await this.account.createEmailPasswordSession(email, password)
   }

//    passwordrecovery
async changepassword(passemail){
    return await this.account.createRecovery(passemail, "http://localhost:5173/changepassword")
}

async updatepassword(userid, secret, newpassword, repete){
    return await this.account.updateRecovery(userid, secret, newpassword, repete)
}
//    passwordrecovery

async appwritelogout(){
return await this.account.deleteSession("current")
}

async getavatar(name){
    return await this.avatar.getInitials(name)
}

async updateemail(email, password){
    return await this.account.updateEmail(email, password)
}

async updatename(newname){
    return await this.account.updateName(newname)
}

}

const AuthClient = new author()
export default AuthClient
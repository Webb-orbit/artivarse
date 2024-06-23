const appwriteconf = {
    projectid: String(import.meta.env.VITE_PROJECT_ID),
    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),

    database: String(import.meta.env.VITE_DATADASE_ID),
    blogcollon: String(import.meta.env.VITE_BLOGCOLLON_ID),
    blogcreator: String(import.meta.env.VITE_BLOGCREATOR_ID),
    readercollon: String(import.meta.env.VITE_REAERCOLLON_ID),
    
    blogcover: String(import.meta.env.VITE_BLOGIMG_BUCKET),
    logoid: String(import.meta.env.VITE_LOGO_BUCKET ),
    banner: String(import.meta.env.VITE_BANNER_BUCKET),
}

export default appwriteconf
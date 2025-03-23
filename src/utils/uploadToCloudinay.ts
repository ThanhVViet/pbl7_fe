export const uploadToCloudinay = async (pics: any) => {
    const cloud_name = "ditfrpqoc"
    const upload_preset = "multivandor"

    if(pics){
        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", upload_preset)
        data.append("cloud_name", cloud_name)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, {
            method: "post",
            body: data
        })

        const fileData = await res.json()

        return fileData.url
    } else {
        console.log('pics 404')
    }


}
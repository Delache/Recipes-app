const voyelles = ['a','e','i','o','u','y','h','A','E','I','O','U','Y','H']

export const apostrophe = (string:string) => {
    if(voyelles.indexOf(string[0]) === -1){
        return ` de ${string}`
    }else{
        return ` d'${string}`
    }
}
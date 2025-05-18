import jwt   from "jsonwebtoken";

//pr generer un token on un besoin d'un environnement variable qui va contenir la clé secrete 
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET
        , {
        expiresIn: "7h",

});



    res.cookie("token", token, {
        httpOnly: true,//en gros pour empecher le javascript de lire le cookie
        secure: true,// secure pour eviter les attaques csrf, ça veut dire ça sera vrai si on est en
        //production et faux si on est en dev 
        sameSite: "None",//pour eviter les attaques csrf
        maxAge: 7*3600000,//la durée de vie du cookie sera de 7h en millisecondes 
    });
console.log("✅ Cookie stocké avec succès !");

    return token;//on retourne le token pour l'utiliser dans le front

};
// ce fichier contient une fonction qui va generer un token jwt 
// et le stocker dans un cookie httpOnly sécurisé et avec une durée 
// de vie d'1h pr eviter les attaques csrf
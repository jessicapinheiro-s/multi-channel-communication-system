import jwt from "jsonwebtoken";


export const auth = (req, res, next) => {
    try {   
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Acesso negado. Token ausente." });
        }
    }catch(error){
        return res.status(4001).json({error: error.message});
    }
}





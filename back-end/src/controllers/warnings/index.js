import { f_create_warning, f_delete_warning, f_get_by_id_warning, f_update_warning } from "@/services/warnings";

export const create_warning = async (req, res) => {
    const { title, message } = req.body;

    if(!title || !message) {
        return res.status(400).json({error: "Missing required fields"});
    }    

    try {
        const response = await f_create_warning({ title, message });
    }catch(error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export const delete_warning = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ error: "Missing id parameter" });
    }

    try {
        const response = await f_delete_warning({ id });
    }catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const update_warning = async (req, res) => {
    const { id } = req.params;
    const item_info = req.body; 

    if(!id) {
        return res.status(400).json({ error: "Missing id parameter" });
    }

    try {
        const repsonse = await f_update_warning({ id, item_info });
    }catch(error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const get_by_id_warning = async (req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ error: "Missing id parameter" });
    }
    try {   
        const response = await f_get_by_id_warning({ id });
    }catch(error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
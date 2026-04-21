import {
  create_warning,
  delete_warning,
  get_all_warnings,
  get_by_id_warning,
  send_warning,
  update_warning,
} from "../../controllers/warnings/index.js";
import { Router } from "express";
import auth from "../auth/index.js";
import { validate } from "../../middlewares/validate.js";
import { createWarningSchema, deleteWarningSchema, getByIdWarningSchema, sendWarningSchema, updateWarningSchema } from "../../schemas/warning-schema.js";
const router_warning = Router();

router_warning.post("/create", auth, validate(createWarningSchema), create_warning);
router_warning.patch("/update", auth, validate(updateWarningSchema), update_warning);
router_warning.delete("/delete", auth, validate(deleteWarningSchema), delete_warning);
router_warning.get("/get-by-id", auth,validate(getByIdWarningSchema), get_by_id_warning);
router_warning.get('/get-all', auth, get_all_warnings);
router_warning.get('/send', auth, validate(sendWarningSchema), send_warning);

export default router_warning;

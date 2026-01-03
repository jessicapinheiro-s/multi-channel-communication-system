import {
  create_warning,
  delete_warning,
  get_by_id_warning,
  update_warning,
} from "../../controllers/warnings";
import { Router } from "express";
import auth from "../auth";
const router_warning = Router();

router_warning.post("/create", auth, create_warning);
router_warning.patch("/update", auth, update_warning);
router_warning.delete("/delete", auth, delete_warning);
router_warning.get("/get-by-id", auth, get_by_id_warning);

export default router_warning;

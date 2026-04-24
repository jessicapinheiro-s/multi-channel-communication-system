import request from "supertest";
import app from "../app.js";

const base = request(app);


export const createWarningSentLogSchema = z.object({
  user_id: 2,
  warningId: 1,
  channel: "email",
  status: "sent",
});

export const getByIdWarningSentLogSchema = z.object({
  id: 1,
});

export const updateWarningLogByIdSchema = z.object({
  id: 1,
  item_info: {
    status:"created",
  },
});

describe('/Warnings_logs routers', () => {
    test('', async() => {

    })
})
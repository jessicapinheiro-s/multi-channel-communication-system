-- DropForeignKey
ALTER TABLE "Warning_logs_sent" DROP CONSTRAINT "Warning_logs_sent_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Warning_logs_sent" ADD CONSTRAINT "Warning_logs_sent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

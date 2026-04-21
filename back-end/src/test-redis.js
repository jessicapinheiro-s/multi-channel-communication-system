import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();


const PORT = Number(process.env.REDIS_PORT);

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: PORT,
  },
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => {
  console.log("❌ Redis Error:", err);
});

async function test() {
  console.log(`porta`, PORT)

  await client.connect();
  console.log("✅ Conectado no Redis Cloud!");

  await client.set("teste", "funcionou");
  const value = await client.get("teste");

  console.log("📦 Valor salvo:", value);

  await client.disconnect();
}

test();
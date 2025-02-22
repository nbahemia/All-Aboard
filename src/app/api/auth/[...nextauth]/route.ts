import { handlers } from "@/server/auth";
import DiscordProvider from "next-auth/providers/discord";

providers: [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  })
]

export const { GET, POST } = handlers;

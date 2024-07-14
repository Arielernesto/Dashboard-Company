import Image from "next/image";
import { ChatOptions } from "@/components/chat-options";
import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chat></Chat>
     <ChatOptions></ChatOptions>
    </main>
  );
}

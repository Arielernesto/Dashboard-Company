
import { ChatOptions } from "@/components/chat-options";
import { Chat } from "@/components/chat";
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// const queryClient = new QueryClient()

export default function Home() {
  return (
    // <QueryClientProvider client={queryClient}>
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-10">
      <Chat></Chat>
     <ChatOptions></ChatOptions>
    </main>
    // </QueryClientProvider>
  );
}

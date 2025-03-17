
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export default function Blockchain() {
  const { data: chain } = useQuery({
    queryKey: ["blockchain"],
    queryFn: async () => {
      const response = await fetch("/api/blockchain");
      return response.json();
    },
  });

  const { data: verification } = useQuery({
    queryKey: ["blockchain-verify"],
    queryFn: async () => {
      const response = await fetch("/api/blockchain/verify");
      return response.json();
    },
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">Blockchain</h1>
        {verification?.isValid ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <XCircle className="text-red-500" />
        )}
      </div>
      
      <div className="space-y-4">
        {chain?.map((block: any, index: number) => (
          <div key={block.hash} className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Timestamp</p>
                <p>{new Date(block.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nonce</p>
                <p>{block.nonce}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Data</p>
                <pre className="bg-muted p-2 rounded-md overflow-auto">
                  {JSON.stringify(block.data, null, 2)}
                </pre>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Previous Hash</p>
                <p className="font-mono text-sm">{block.previousHash}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Hash</p>
                <p className="font-mono text-sm">{block.hash}</p>
              </div>
            </div>
            {index < chain?.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const AdminDashboard = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading applications...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <h1 className="text-3xl font-bold mb-6">Applications Dashboard</h1>
      <div className="grid gap-6">
        {applications?.map((app) => (
          <motion.div
            key={app.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{app.full_name}</h2>
                <p className="text-gray-600">{app.email}</p>
              </div>
              <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
            </div>
            <div className="grid gap-2">
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Program Type:</strong> {app.program_type}</p>
              <p><strong>Goal:</strong> {app.goal}</p>
              {app.referral_code && (
                <p><strong>Referral Code:</strong> {app.referral_code}</p>
              )}
              {app.documents_urls && app.documents_urls.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Documents:</p>
                  <div className="flex gap-2">
                    {app.documents_urls.map((url: string, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => window.open(url, '_blank')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Document {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
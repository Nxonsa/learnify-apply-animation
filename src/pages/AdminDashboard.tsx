import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Check, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const { toast } = useToast();
  
  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      console.log("Fetching applications...");
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }
      console.log("Applications fetched:", data);
      return data;
    },
  });

  const updateApplicationStatus = async (id: string, status: string) => {
    console.log("Updating application status:", { id, status });
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating application:", error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Application status updated",
    });
    refetch();
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "attended":
        return "bg-green-500";
      case "viewed":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.full_name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>{app.program_type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status || "pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {app.documents_urls && app.documents_urls.length > 0 && (
                    <div className="flex gap-2">
                      {app.documents_urls.map((url: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(url, '_blank')}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateApplicationStatus(app.id, "viewed")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateApplicationStatus(app.id, "attended")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
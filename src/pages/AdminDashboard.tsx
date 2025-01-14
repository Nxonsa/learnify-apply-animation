import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";

export default function AdminDashboard() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }

      return data;
    },
  });

  const openDocument = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Applications Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and review all applications</p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-8">Loading applications...</div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications?.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell>{app.program_type}</TableCell>
                    <TableCell className="max-w-xs truncate">{app.goal}</TableCell>
                    <TableCell>
                      {app.documents_urls && app.documents_urls.length > 0 ? (
                        <div className="flex gap-2">
                          {app.documents_urls.map((url, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => openDocument(url)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Doc {index + 1}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No documents</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        app.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : app.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status || 'pending'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(app.created_at || '').toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
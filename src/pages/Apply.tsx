import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const Apply = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `IGODA-${timestamp}-${random}`;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    onDrop: (acceptedFiles) => {
      console.log("Files dropped:", acceptedFiles);
      setFiles(acceptedFiles);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "Files uploaded successfully",
            description: `${acceptedFiles.length} file(s) added`,
          });
        }
      }, 200);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted");

    const newReferenceNumber = generateReferenceNumber();
    setReferenceNumber(newReferenceNumber);

    // Simulate sending email
    const formData = new FormData(e.target as HTMLFormElement);
    const emailSubject = `Program Application - ${newReferenceNumber}`;
    console.log("Email would be sent to admin@igodaincubator.co.za");
    console.log("Subject:", emailSubject);
    console.log("Form data:", Object.fromEntries(formData));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 mb-4">
                Join Our Program
              </span>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Application Form
            </h1>
          </div>

          <AnimatePresence>
            {!showSuccess ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Main Goal of Joining</Label>
                  <Textarea
                    id="goal"
                    name="goal"
                    required
                    className="w-full min-h-[100px]"
                    placeholder="Tell us about your main goal of joining our program"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragActive
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-600">
                      {isDragActive
                        ? "Drop the files here"
                        : "Drag and drop your CV and certificates here, or click to select files"}
                    </p>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {files.map((file, index) => (
                          <div key={index} className="space-y-2">
                            <p className="text-sm text-gray-500">{file.name}</p>
                            <Progress value={uploadProgress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Application Submitted!
                </h2>
                <p className="text-gray-600 mb-4">
                  Thank you for applying. We will review your application and get
                  back to you soon.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <p className="text-sm text-gray-600 mb-2">Your Reference Number:</p>
                  <p className="text-xl font-bold text-indigo-600">{referenceNumber}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Share this reference number with friends or family who might be interested!
                  </p>
                </div>
                <Button
                  onClick={() => setShowSuccess(false)}
                  variant="outline"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
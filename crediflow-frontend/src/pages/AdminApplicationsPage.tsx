import { useAllLoanApplications, useApproveApplication, useRejectApplication } from "../hooks/useLoanProducts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, Check, X } from "lucide-react";
import { useState } from "react";

export const AdminApplicationsPage = () => {
  const { data: applications, isLoading } = useAllLoanApplications();
  const approveMutation = useApproveApplication();
  const rejectMutation = useRejectApplication();
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectForm, setShowRejectForm] = useState<number | null>(null);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (id: number) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id: number) => {
    rejectMutation.mutate({ id, reason: rejectionReason }, {
      onSuccess: () => {
        setShowRejectForm(null);
        setRejectionReason("");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Loan Applications</h2>
      <div className="space-y-4">
        {applications?.map((app) => (
        <Card key={app.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{app.productName}</CardTitle>
                <p className="text-sm text-gray-500">User ID: {app.userId}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(app.status)}`}>
                {app.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Amount:</strong> ${app.amountRequested.toLocaleString()}</p>
                <p><strong>Term:</strong> {app.termMonths} months</p>
                <p><strong>Applied:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
              {app.status === "REJECTED" && app.rejectionMessage && (
                <p className="text-red-600"><strong>Rejection Reason:</strong> {app.rejectionMessage}</p>
              )}
            </div>
            {app.status === "PENDING" && (
              <div className="flex gap-2">
                <Button onClick={() => handleApprove(app.id)} disabled={approveMutation.isPending}>
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" onClick={() => setShowRejectForm(app.id)}>
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
            {showRejectForm === app.id && (
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Rejection Reason</Label>
                <Input
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason"
                />
                <div className="flex gap-2">
                  <Button onClick={() => handleReject(app.id)} disabled={rejectMutation.isPending}>
                    Confirm Reject
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    setShowRejectForm(null);
                    setRejectionReason("");
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
};
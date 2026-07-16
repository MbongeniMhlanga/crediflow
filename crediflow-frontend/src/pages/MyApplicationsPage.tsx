import { useMyLoanApplications, useLoanProducts, useCreateLoanApplication } from "../hooks/useLoanProducts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const applicationSchema = z.object({
  productId: z.number().min(1, "Product is required"),
  amountRequested: z.number().min(100, "Amount must be at least 100"),
  termMonths: z.number().min(1, "Term must be at least 1 month"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const MyApplicationsPage = () => {
  const { data: applications, isLoading: applicationsLoading } = useMyLoanApplications();
  const { data: products, isLoading: productsLoading } = useLoanProducts();
  const createApplication = useCreateLoanApplication();
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });
  const selectedProductId = watch("productId");
  const selectedProduct = products?.find((p) => p.id === selectedProductId);

  const onSubmit = (data: ApplicationFormValues) => {
    createApplication.mutate(data, {
      onSuccess: () => {
        setShowForm(false);
        reset();
      },
    });
  };

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

  if (applicationsLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Loan Applications</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for a Loan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productId">Loan Product</Label>
                <select
                  id="productId"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  {...register("productId", { valueAsNumber: true })}
                >
                  <option value="">Select a product</option>
                  {products?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - Max: ${product.maxAmount.toLocaleString()} @ {product.interestRate}%
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <p className="text-red-500 text-sm">{errors.productId.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amountRequested">Amount Requested</Label>
                  <Input
                    id="amountRequested"
                    type="number"
                    step="0.01"
                    max={selectedProduct?.maxAmount}
                    {...register("amountRequested", { valueAsNumber: true })}
                  />
                  {errors.amountRequested && (
                    <p className="text-red-500 text-sm">{errors.amountRequested.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="termMonths">Term (Months)</Label>
                  <Input
                    id="termMonths"
                    type="number"
                    max={selectedProduct?.termMonths}
                    {...register("termMonths", { valueAsNumber: true })}
                  />
                  {errors.termMonths && (
                    <p className="text-red-500 text-sm">{errors.termMonths.message}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createApplication.isPending}
                >
                  {createApplication.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Application
                </Button>
                <Button
                  type="button" variant="secondary" onClick={() => {
                    setShowForm(false);
                    reset();
                  }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {applications?.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{app.productName}</CardTitle>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(app.status)}`}>
                  {app.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Amount:</strong> ${app.amountRequested.toLocaleString()}</p>
              <p><strong>Term:</strong> {app.termMonths} months</p>
              <p><strong>Applied:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
              {app.status === "REJECTED" && app.rejectionMessage && (
                <p className="text-red-600"><strong>Rejection Reason:</strong> {app.rejectionMessage}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
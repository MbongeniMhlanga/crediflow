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
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Application tracker
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            My Loan Applications
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Submit a new application or monitor the progress of your existing requests.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-fit gap-2">
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for a Loan</CardTitle>
            <p className="text-sm text-slate-500">
              Choose a product and enter the amount and term you want to request.
            </p>
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
              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  disabled={createApplication.isPending}
                  className="gap-2"
                >
                  {createApplication.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                >
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
                <div>
                  <CardTitle>{app.productName}</CardTitle>
                  <p className="text-sm text-slate-500">
                    Submitted on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(app.status)}`}>
                  {app.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500 text-sm">Amount requested</p>
                  <p className="mt-1 font-semibold text-slate-900">R{app.amountRequested.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500 text-sm">Term</p>
                  <p className="mt-1 font-semibold text-slate-900">{app.termMonths} months</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500 text-sm">Status</p>
                  <p className="mt-1 font-semibold text-slate-900">{app.status}</p>
                </div>
              </div>
              {app.status === "REJECTED" && app.rejectionMessage && (
                <p className="rounded-2xl border border-red-100 bg-red-50 p-3 text-red-700">
                  <strong>Rejection Reason:</strong> {app.rejectionMessage}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

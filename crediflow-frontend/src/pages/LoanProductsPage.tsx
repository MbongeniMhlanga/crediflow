import { useLoanProducts, useCreateLoanProduct } from "../hooks/useLoanProducts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  interestRate: z.number().min(0, "Interest rate must be positive"),
  maxAmount: z.number().min(0, "Max amount must be positive"),
  termMonths: z.number().min(1, "Term must be at least 1 month"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export const LoanProductsPage = () => {
  const { data: products, isLoading } = useLoanProducts();
  const createProduct = useCreateLoanProduct();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormValues) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        setShowForm(false);
        reset();
      },
    });
  };

  const isAdmin = user?.roles.some((r) => r.name === "ADMIN");

  if (isLoading) {
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
            Product management
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Loan Products
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Review existing products and add new lending options for your team.
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowForm(!showForm)} className="w-fit gap-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Loan Product</CardTitle>
            <p className="text-sm text-slate-500">
              Set the core terms for the product so the application flow stays clear.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    {...register("interestRate", { valueAsNumber: true })}
                  />
                  {errors.interestRate && (
                    <p className="text-red-500 text-sm">{errors.interestRate.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Max Amount</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    step="0.01"
                    {...register("maxAmount", { valueAsNumber: true })}
                  />
                  {errors.maxAmount && (
                    <p className="text-red-500 text-sm">{errors.maxAmount.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="termMonths">Term (Months)</Label>
                  <Input
                    id="termMonths"
                    type="number"
                    {...register("termMonths", { valueAsNumber: true })}
                  />
                  {errors.termMonths && (
                    <p className="text-red-500 text-sm">{errors.termMonths.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={createProduct.isPending} className="gap-2">
                  {createProduct.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-sm text-slate-500">
                Flexible financing product with clear repayment terms.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500">Interest</p>
                  <p className="mt-1 font-semibold text-slate-900">{product.interestRate}%</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500">Max amount</p>
                  <p className="mt-1 font-semibold text-slate-900">${product.maxAmount.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500">Term</p>
                  <p className="mt-1 font-semibold text-slate-900">{product.termMonths} mo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

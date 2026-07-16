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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Loan Products</h2>
        {isAdmin && (
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Loan Product</CardTitle>
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
              <div className="flex gap-2">
                <Button
                  type="submit" disabled={createProduct.isPending}>
                  {createProduct.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Interest Rate:</strong> {product.interestRate}%</p>
              <p><strong>Max Amount:</strong> ${product.maxAmount.toLocaleString()}</p>
              <p><strong>Term:</strong> {product.termMonths} months</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
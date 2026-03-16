import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  LogOut,
  PackageOpen,
  Pencil,
  Plus,
  ShieldCheck,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCategories, useGetProducts } from "../hooks/useQueries";

function useAdminMutations() {
  const { actor } = useActor();
  const qc = useQueryClient();

  const addProduct = useMutation({
    mutationFn: async (p: {
      name: string;
      price: number;
      category: string;
      unit: string;
      inStock: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.addProduct(p.name, p.price, p.category, p.unit, p.inStock);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added!");
    },
    onError: () => toast.error("Failed to add product"),
  });

  const updateProduct = useMutation({
    mutationFn: async (p: {
      id: bigint;
      name: string;
      price: number;
      category: string;
      unit: string;
      inStock: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateProduct(
        p.id,
        p.name,
        p.price,
        p.category,
        p.unit,
        p.inStock,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated!");
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteProduct(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const addCategory = useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.addCategory(name);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added!");
    },
    onError: () => toast.error("Failed to add category"),
  });

  const deleteCategory = useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteCategory(name);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted");
    },
    onError: () => toast.error("Failed to delete category"),
  });

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
  };
}

const UNIT_OPTIONS = ["kg", "piece", "litre", "g", "ml", "packet"];

type ProductFormState = {
  name: string;
  price: string;
  category: string;
  unit: string;
  inStock: boolean;
};

const emptyForm = (): ProductFormState => ({
  name: "",
  price: "",
  category: "",
  unit: "kg",
  inStock: true,
});

function ProductForm({
  initial,
  categories,
  onSubmit,
  isPending,
  submitLabel,
}: {
  initial: ProductFormState;
  categories: string[];
  onSubmit: (f: ProductFormState) => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ProductFormState>(initial);
  const set = (k: keyof ProductFormState, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category) {
      toast.error("Please fill all required fields");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="product-name">Name *</Label>
          <Input
            id="product-name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Basmati Rice"
            data-ocid="admin.add_product.input"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="product-price">Price (₹) *</Label>
          <Input
            id="product-price"
            type="number"
            min={0}
            step={0.01}
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="e.g. 120"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Category *</Label>
          <Select
            value={form.category}
            onValueChange={(v) => set("category", v)}
          >
            <SelectTrigger data-ocid="admin.add_product.select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Unit</Label>
          <Select value={form.unit} onValueChange={(v) => set("unit", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNIT_OPTIONS.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={form.inStock}
          onCheckedChange={(v) => set("inStock", !!v)}
        />
        <Label htmlFor="in-stock">In Stock</Label>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto"
        data-ocid="admin.add_product.submit_button"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

function EditProductDialog({
  product,
  categories,
  onClose,
}: {
  product: Product;
  categories: string[];
  onClose: () => void;
}) {
  const { updateProduct } = useAdminMutations();
  const initial: ProductFormState = {
    name: product.name,
    price: String(product.price),
    category: product.category,
    unit: product.unit,
    inStock: product.inStock,
  };

  const handleSubmit = async (f: ProductFormState) => {
    await updateProduct.mutateAsync({
      id: product.id,
      name: f.name,
      price: Number.parseFloat(f.price),
      category: f.category,
      unit: f.unit,
      inStock: f.inStock,
    });
    onClose();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="admin.product.dialog">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          initial={initial}
          categories={categories}
          onSubmit={handleSubmit}
          isPending={updateProduct.isPending}
          submitLabel="Save Changes"
        />
        <DialogFooter className="mt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            data-ocid="admin.product.cancel_button"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteConfirmDialog({
  productName,
  onConfirm,
  onClose,
  isPending,
}: {
  productName: string;
  onConfirm: () => void;
  onClose: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent data-ocid="admin.product.dialog">
        <DialogHeader>
          <DialogTitle>Delete Product?</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete <strong>{productName}</strong>? This
          cannot be undone.
        </p>
        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            data-ocid="admin.product.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="admin.product.confirm_button"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProductsTab() {
  const { data: products = [], isLoading } = useGetProducts();
  const { data: categories = [] } = useGetCategories();
  const { addProduct, deleteProduct } = useAdminMutations();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleAdd = async (f: ProductFormState) => {
    await addProduct.mutateAsync({
      name: f.name,
      price: Number.parseFloat(f.price),
      category: f.category,
      unit: f.unit,
      inStock: f.inStock,
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Product */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" /> Add New Product
        </h3>
        <ProductForm
          initial={emptyForm()}
          categories={categories}
          onSubmit={handleAdd}
          isPending={addProduct.isPending}
          submitLabel="Add Product"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <PackageOpen className="h-5 w-5 text-primary" /> All Products
            <Badge variant="secondary" className="ml-auto">
              {products.length}
            </Badge>
          </h3>
        </div>
        {isLoading ? (
          <div
            className="p-6 space-y-2"
            data-ocid="admin.product.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            className="p-12 text-center text-muted-foreground"
            data-ocid="admin.product.empty_state"
          >
            <PackageOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No products yet. Add your first product above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table data-ocid="admin.product.list">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p, i) => (
                  <TableRow
                    key={String(p.id)}
                    data-ocid={`admin.product.item.${i + 1}`}
                  >
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {p.category}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {p.unit}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={p.inStock ? "default" : "destructive"}
                        className={
                          p.inStock
                            ? "bg-green-100 text-green-700 border-green-200"
                            : ""
                        }
                      >
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditProduct(p)}
                          data-ocid={`admin.product.edit_button.${i + 1}`}
                          aria-label="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(p)}
                          data-ocid={`admin.product.delete_button.${i + 1}`}
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {editProduct && (
        <EditProductDialog
          product={editProduct}
          categories={categories}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmDialog
          productName={deleteTarget.name}
          onConfirm={() =>
            deleteProduct.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            })
          }
          onClose={() => setDeleteTarget(null)}
          isPending={deleteProduct.isPending}
        />
      )}
    </div>
  );
}

function CategoriesTab() {
  const { data: categories = [], isLoading } = useGetCategories();
  const { addCategory, deleteCategory } = useAdminMutations();
  const [newCat, setNewCat] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    addCategory.mutate(newCat.trim(), { onSuccess: () => setNewCat("") });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" /> Add Category
        </h3>
        <form onSubmit={handleAdd} className="flex gap-3">
          <Input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="e.g. Spices"
            className="max-w-xs"
            data-ocid="admin.category.input"
          />
          <Button
            type="submit"
            disabled={addCategory.isPending || !newCat.trim()}
            data-ocid="admin.category.add_button"
          >
            {addCategory.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Add
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold">Categories</h3>
          <Badge variant="secondary" className="ml-auto">
            {categories.length}
          </Badge>
        </div>
        {isLoading ? (
          <div
            className="p-6 space-y-2"
            data-ocid="admin.category.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div
            className="p-12 text-center text-muted-foreground"
            data-ocid="admin.category.empty_state"
          >
            <Tag className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No categories yet. Add one above.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {categories.map((cat, i) => (
              <li
                key={cat}
                className="flex items-center justify-between px-6 py-3"
                data-ocid={`admin.category.item.${i + 1}`}
              >
                <span className="font-medium">{cat}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setConfirmDelete(cat)}
                  data-ocid={`admin.category.delete_button.${i + 1}`}
                  aria-label={`Delete ${cat}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {confirmDelete && (
        <Dialog open onOpenChange={(o) => !o && setConfirmDelete(null)}>
          <DialogContent data-ocid="admin.category.dialog">
            <DialogHeader>
              <DialogTitle>Delete Category?</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm">
              Delete <strong>{confirmDelete}</strong>? Products in this category
              won&apos;t be removed.
            </p>
            <DialogFooter className="gap-2">
              <Button
                variant="ghost"
                onClick={() => setConfirmDelete(null)}
                data-ocid="admin.category.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteCategory.isPending}
                onClick={() =>
                  deleteCategory.mutate(confirmDelete, {
                    onSuccess: () => setConfirmDelete(null),
                  })
                }
                data-ocid="admin.category.confirm_button"
              >
                {deleteCategory.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-primary/10 mx-auto">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to manage products and categories for Swastik Kirana
              Store.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin.login_button"
          >
            {isLoggingIn ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            {isLoggingIn ? "Signing in..." : "Admin Login"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <span className="font-display font-bold text-foreground">
                Admin Panel
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                Swastik Kirana Store
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clear}
            data-ocid="admin.logout_button"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="products">
          <TabsList className="mb-8" data-ocid="admin.tab">
            <TabsTrigger value="products" data-ocid="admin.products.tab">
              <PackageOpen className="mr-2 h-4 w-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="categories" data-ocid="admin.categories.tab">
              <Tag className="mr-2 h-4 w-4" /> Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

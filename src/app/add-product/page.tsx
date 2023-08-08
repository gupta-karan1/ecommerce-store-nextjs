import { Metadata } from "next";
import { prisma } from "@/app/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";
export const metadata: Metadata = {
  title: "Add Product - MegaCart",
};

async function addProduct(formData: FormData) {
  "use server"; // tells NextJS this function should run on the server

  // get the form data from the request body and add it to the database
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  // validate the form data before adding it to the database
  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default function AddProduct() {
  return (
    <div className="max-w-4xl m-auto h-screen ">
      <h1 className="font-bold text-lg mb-3 ">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Product Name"
          className="mb-3 input input-bordered w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Product Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Product Image URL"
          className="mb-3 input input-bordered w-full"
        />
        <input
          required
          name="price"
          placeholder="Product Price"
          type="number"
          className="mb-3 input input-bordered w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}

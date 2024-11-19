import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useState } from "react";

const AdminProduct = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() => setOpenCreateProductsDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                Add New Product
              </SheetTitle>
            </SheetHeader>
            {/* <MenuItems setOpen={setOpen} /> */}
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
};

export default AdminProduct;

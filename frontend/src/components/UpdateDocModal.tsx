import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import * as Yup from "yup";
import {Card} from "./ui/card";
import {Formik} from "formik";

import {useState} from "react";
import Image from "next/image";

import {Pen, Plus, X} from "lucide-react";
import {useDispatch} from "react-redux";
import {asUpdateDoc, asUploadDoc} from "@/reduxconfig/actions/userActions";
import {useToast} from "./ui/use-toast";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Document title is required"),
  document: Yup.mixed()
    .required("Document file is required")
    .test("fileSize", "Document size must be less than 3MB", (value: any) => {
      if (value) {
        return value[0]?.size <= 3145728;
      }
      return true;
    }),
});

export interface UserDetails {
  title: string;
  document: FileList | null;
}

export function UpdateDocModal({setIsLoading, id, doc}: any) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {toast} = useToast();
  console.log(doc);
  const initialValues: UserDetails = {
    title: doc?.personalDocument?.title,
    document: null,
  };

  const sendData = async (values: any) => {
    setIsLoading(true);
    try {
      await dispatch(asUpdateDoc(doc?._id, values, toast));
      setIsLoading(false);
      setOpen(false);
      // console.log("Success", response.data);
    } catch (error) {
      setIsLoading(false);  
      console.log(error);
    }
  };
  // console.log(initialValues.image);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg p-0 overflow-y-scroll max-h-[90dvh]">
        <Card className="p-6">
          <DialogHeader>
            <DialogTitle>Add New Data</DialogTitle>
            <DialogDescription>
              Update Document Details. Click save when you&rsquo;re done.
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendData}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setValues,
            }) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={values.title}
                      placeholder="Enter your title"
                      onChange={handleChange("title")}
                    />
                    {touched.title && errors.title && (
                      <span className="text-red-500">{errors.title}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document">Document File</Label>

                    <Input
                      id="document"
                      type="file"
                      onChange={(e) => {
                        setValues({...values, document: e.target?.files});
                        // console.log(values.image[0]);
                      }}
                    />
                    {touched.document && errors.document && (
                      <span className="text-red-500">{errors.document}</span>
                    )}
                  </div>
                </div>
                {values.document ? (
                  <div className="mt-2 h-fit w-fit relative">
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="p-0 absolute right-0 top-0"
                      onClick={() => {
                        setValues({...values, document: null});
                        document.getElementsByTagName("input")[1].value = "";
                      }}>
                      <X />
                    </Button>
                    <Image
                      src={URL.createObjectURL(values.document[0])}
                      height={1000}
                      width={1000}
                      alt="gmghm"
                      className="max-h-44 w-auto"
                    />
                  </div>
                ) : (
                  <div className="mt-2 h-fit w-fit relative">
                    <Image
                      src={doc?.personalDocument?.url}
                      height={1000}
                      width={1000}
                      alt="gmghm"
                      className="max-h-44 w-auto"
                    />
                  </div>
                )}
                <DialogFooter className="flex justify-between items-center gap-2 mt-4">
                  <DialogClose className="w-full">
                    <Button
                      className="w-full"
                      variant={"destructive"}
                      type="submit">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className="w-full"
                    type="submit"
                    onClick={() => handleSubmit()}>
                    Save
                  </Button>
                </DialogFooter>
              </>
            )}
          </Formik>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

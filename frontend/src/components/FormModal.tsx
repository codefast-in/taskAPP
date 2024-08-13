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
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Formik} from "formik";
import {app} from "@/lib/axios";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits")
    .required("Contact is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.string().required("Date of Birth is required"),
  image: Yup.mixed().required("Profile photo is required"),
});

interface UserDetails {
    name: string,
    contact: string,
    email: string,
    dob: string,
    image: FileList | null,
}

export function FormModal({setIsLoading}: any) {
   const [open, setOpen]= useState(false)

   
  const sendData = async (values: any) => {
    console.log(values)
    // setIsLoading(true);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("contact", values.contact);
    formData.append("dob", values.dob);
    formData.append("email", values.email);
    formData.append("image", values.image[0]);

    try {
      const response = await app.post("/creat", 
        // formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
    //   }
    );

    //   setIsLoading(false);
    //   console.log("Success", response.data);
    } catch (error) {
    //   setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg p-0">
        <Card className="p-6">
          <DialogHeader>
            <DialogTitle>Add New Data</DialogTitle>
            <DialogDescription>
              Fill data of new user here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues:UserDetails={{
              name: "",
              contact: "",
              email: "",
              dob: "",
              image: [],
            }}
            validationSchema={validationSchema}
            onSubmit={sendData}>
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              errors,
              touched,
              setValues
            }) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" onChange={handleChange('name')} />
                    {touched.name && errors.name && (
                        <span className="text-red-500">{errors.name}</span>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email" onChange={handleChange("email")}
                    />
                     {touched.email && errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" onChange={handleChange("dob")} />
                    {touched.dob && errors.dob && (
                        <span className="text-red-500">{errors.dob}</span>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="Enter your contact number" onChange={handleChange("contact")}
                    />
                    {touched.contact && errors.contact && (
                        <span className="text-red-500">{errors.contact}</span>
                      )}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="profile-photo">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        // src={URL(values.image[0])}
                        // src={new URL.createObjectURL(values.image[0]).toString()}
                        alt="Profile Photo"
                      />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <Input id="profile-photo" type="file" onChange={(e)=>setValues({...values,image:e.target.files})} />
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center gap-2 mt-4">
                  <DialogClose className="w-full">
                    <Button
                      className="w-full"
                      variant={"destructive"}
                      type="submit">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="w-full" type="submit" onClick={()=>handleSubmit()}>
                    Save changes
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

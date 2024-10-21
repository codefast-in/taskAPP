import React from "react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import {app} from "@/lib/axios";
import {useState} from "react";
import Image from "next/image";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {Cross, Edit, X} from "lucide-react";
import {useDispatch} from "react-redux";
import { asEditData} from "@/reduxconfig/actions/userActions";
import {useToast} from "./ui/use-toast";
import {UserDetails, validationSchema} from "./FormModal";


const UpadateModal = ({setIsLoading, user,isLoading}: any) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {toast} = useToast();
  const initialValues: UserDetails = {
    name: user?.name,
    contact: user?.contact,
    email: user?.email,
    dob: user?.dob,
    gender: user?.gender,
    image: null,
  };
// console.log(user.image)
  const sendData = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await dispatch(asEditData(user._id, values, toast));
      setIsLoading(false);
      res && setOpen(false);
      // console.log("Success", response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
 

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="link" >
        <Edit/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg p-0 overflow-y-scroll max-h-[90dvh]">
        <Card className="p-6">
          <DialogHeader>
            <DialogTitle>Edit Users Details</DialogTitle>
           
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={values.name}
                      placeholder="Enter your name"
                      onChange={handleChange("name")}
                    />
                    {touched.name && errors.name && (
                      <span className="text-red-500">{errors.name}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      placeholder="Enter your email"
                      onChange={handleChange("email")}
                    />
                    {touched.email && errors.email && (
                      <span className="text-red-500">{errors.email}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={values.dob}
                      onChange={handleChange("dob")}
                    />
                    {touched.dob && errors.dob && (
                      <span className="text-red-500">{errors.dob}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      type="tel"
                      value={values.contact}
                      placeholder="Enter your contact number"
                      onChange={handleChange("contact")}
                    />
                    {touched.contact && errors.contact && (
                      <span className="text-red-500">{errors.contact}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Gender</Label>
                    <RadioGroup
                      onValueChange={handleChange("gender")}
                      defaultValue={values.gender}
                      className="flex justify-start items-center">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="r1" />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && (
                      <span className="text-red-500">{errors.gender}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-photo">Profile Photo</Label>

                    <Input
                      id="profile-photo"
                      type="file"
                      onChange={(e) => {
                        setValues({...values, image: e.target?.files});
                        // console.log(values.image[0]);
                      }}
                    />
                    {errors.image && (
                      <span className="text-red-500">{errors.image}</span>
                    )}
                  </div>
                </div>
                {values?.image ?  (
                  <div className="mt-2 h-fit w-fit relative">
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="p-0 absolute right-0 top-0"
                      onClick={() => setValues({...values, image: null})}>
                      <X />
                    </Button>
                    <Image
                      src={URL.createObjectURL(values.image[0])}
                      height={1000}
                      width={1000}
                      alt="gmghm"
                      className="max-h-44 w-auto"
                    />
                  </div>
                ): (
                  <div className="mt-2 h-fit w-fit relative">
                   
                    <Image
                      src={user?.image?.url}
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
};

export default UpadateModal;

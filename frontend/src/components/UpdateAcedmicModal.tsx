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
import {app} from "@/lib/axios";
import {useState} from "react";
import Image from "next/image";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {Cross, Pen, Plus, X} from "lucide-react";
import {useDispatch} from "react-redux";
import {
  asAddEducationalData,
  asAddNewData,
  asUpdateEducationalData,
} from "@/reduxconfig/actions/userActions";
import {useToast} from "./ui/use-toast";

export const validationSchema = Yup.object().shape({
  course: Yup.string().required("Course name is required"),
  institute: Yup.string().required("Institute name is required"),
  year: Yup.string().required("Year is required"),
  startDate: Yup.date().required("Start Date is required"),
  duration: Yup.string().required("Course Duration is required"),
  result: Yup.string().required("Select Your result"),
  marks: Yup.number().max(100).required("Marks is required"),
});

export interface UserDetails {
  course?: string;
  institute?: string;
  year?: string;
  startDate?: string;
  duration?: string;
  result?: string;
  marks?: number;
}

export function UpdateAcedmicModal({setIsLoading, id, data}: any) {
  const [open, setOpen] = useState(false);
//   console.log(data);
  const dispatch = useDispatch();
  const {toast} = useToast();
  const initialValues: UserDetails = {
    course: data?.course,
    institute: data?.institute,
    year: data?.year,
    startDate: data?.startDate,
    duration: data?.duration,
    result: data?.result,
    marks: data?.marks,
  };

  const sendData = async (values: any) => {
    setIsLoading(true);
    try {
      await dispatch(asUpdateEducationalData(data._id, values, toast));
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"sm"} className="w-full">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg p-0 overflow-y-scroll max-h-[90dvh]">
        <Card className="p-6">
          <DialogHeader>
            <DialogTitle>Add New Educational Details</DialogTitle>
            <DialogDescription>
              Fill data of new educational details. Click save when you're done.
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
                    <Label htmlFor="institute">Institute/Collage</Label>
                    <Input
                      id="institute"
                      value={values.institute}
                      placeholder="Enter your institute/Collage name"
                      onChange={handleChange("institute")}
                    />
                    {touched.institute && errors.institute && (
                      <span className="text-red-500">{errors.institute}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course/Branch</Label>
                    <Input
                      id="course"
                      type="text"
                      value={values.course}
                      placeholder="Enter your course/branch "
                      onChange={handleChange("course")}
                    />
                    {touched.course && errors.course && (
                      <span className="text-red-500">{errors.course}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="text"
                      value={values.year}
                      onChange={handleChange("year")}
                      placeholder="first/second/third"
                    />
                    {touched.year && errors.year && (
                      <span className="text-red-500">{errors.year}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={values.startDate}
                      placeholder="Enter your startDate number"
                      onChange={handleChange("startDate")}
                    />
                    {touched.startDate && errors.startDate && (
                      <span className="text-red-500">{errors.startDate}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Course Duration</Label>
                    <Input
                      id="duration"
                      type="text"
                      value={values.duration}
                      placeholder="Enter your course duration"
                      onChange={handleChange("duration")}
                    />
                    {touched.duration && errors.duration && (
                      <span className="text-red-500">{errors.duration}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="result">Result</Label>
                    <RadioGroup
                      onValueChange={handleChange("result")}
                      defaultValue={values.result}
                      className="flex justify-start items-center">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pass" id="r1" />
                        <Label htmlFor="r1">Pass</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Fail" id="r2" />
                        <Label htmlFor="r2">Fail</Label>
                      </div>
                    </RadioGroup>
                    {errors.result && (
                      <span className="text-red-500">{errors.result}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks</Label>
                    <Input
                      id="marks"
                      type="number"
                      value={values.marks}
                      placeholder="Enter your Marks/CGPA "
                      onChange={handleChange("marks")}
                    />

                    {errors.marks && (
                      <span className="text-red-500">{errors.marks}</span>
                    )}
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

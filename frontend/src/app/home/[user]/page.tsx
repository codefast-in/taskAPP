"use client";
import {app} from "@/lib/axios";
const dayjs = require("dayjs");
import React, {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Calendar,
  User,
  GraduationCap,
  FileText,
  Clock,
  Delete,
  Trash2,
  Pen,
} from "lucide-react";
import UpadateModal from "@/components/UpadateModal";
import {AcedmicModal} from "@/components/AcedmicModal";
import {DocModal} from "@/components/DocModal";
import Link from "next/link";
import {useToast} from "@/components/ui/use-toast";
import {useDispatch} from "react-redux";
import {
  asDeleteDoc,
  asDeleteEducationalData,
} from "@/reduxconfig/actions/userActions";
import {Button} from "@/components/ui/button";
import {UpdateDocModal} from "@/components/UpdateDocModal";
import {UpdateAcedmicModal} from "@/components/UpdateAcedmicModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

function Page({params}: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUser] = useState<any>(null);
  const {user} = params;
  const {toast} = useToast();
  const getData = async () => {
    try {
      const {data} = await app.post(`/find-one/${user}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userData);

  useEffect(() => {
    getData();
  }, [isLoading]);

  const dispatch = useDispatch();
  const deleteDoc = async (data: any) => {
    try {
      setIsLoading(true);
      const ret = await dispatch(asDeleteDoc(data, toast));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const deleteAcedmic = async (data: any) => {
    try {
      setIsLoading(true);
      const ret = await dispatch(asDeleteEducationalData(data, toast));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={userData?.image?.url} alt="User avatar" />
            <AvatarFallback>{userData?.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl capitalize">
              {userData?.name}
            </CardTitle>
            {/* <CardDescription>Software Engineer</CardDescription> */}
          </div>

          <UpadateModal setIsLoading={setIsLoading} user={userData} />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <Label>Email</Label>
                  <p>{userData?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <Label>Phone</Label>
                  <p>{userData?.contact} </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <Label>Date of Birth</Label>
                  <p>{dayjs(userData?.dob).format("DD MMM, YYYY")} </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <Label>Gender</Label>
                  <p>{userData?.gender}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">
                  Educational Details
                </h3>
                <AcedmicModal id={userData?._id} setIsLoading={setIsLoading} />
              </div>
              <div className="grid gap-6">
                {userData?.academic?.length === 0 ? (
                  <p className="text-sm">No Data Available </p>
                ) : (
                  userData?.academic.map((academic: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <GraduationCap className="h-5 w-5 mt-1 text-primary" />
                        <div>
                          <Label className="text-base">{academic.course}</Label>
                          <p className="text-sm text-foreground">
                            {academic.institute}
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div>
                              <Label className="text-xs">Start Date</Label>
                              <p className="text-sm">
                                {dayjs(academic.startDate).format(
                                  "DD MMM, YYYY"
                                )}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs">End Date</Label>
                              <p className="text-sm">
                                {dayjs(academic.endDate).format("DD MMM, YYYY")}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs">Marks/CGPA</Label>
                              <p className="text-sm">{academic.marks}</p>
                            </div>
                            <div>
                              <Label className="text-xs">Result</Label>
                              <p className="text-sm">{academic.result}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(User._id)}>
                  Copy User ID
                </DropdownMenuItem> */}
                          <DropdownMenuSeparator />

                          <DropdownMenuItem asChild>
                            <UpdateAcedmicModal
                              id={userData?._id}
                              setIsLoading={setIsLoading}
                              data={academic}
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Button
                              variant="ghost"
                              size={"sm"}
                              className="w-full"
                              onClick={() =>
                                deleteAcedmic({
                                  userId: userData?._id,
                                  academicId: academic?._id,
                                })
                              }>
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">Documents</h3>
                <DocModal id={userData?._id} setIsLoading={setIsLoading} />
              </div>
              <div className="grid gap-4">
                {userData?.documents?.length === 0 ? (
                  <p className="text-sm">No Data Available </p>
                ) : (
                  userData?.documents.map((document: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <FileText className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <Label className="text-base">
                          {document.personalDocument.title}
                        </Label>
                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                          <Link
                            target="_blank"
                            href={document.personalDocument.url}
                            className="text-sm">
                            Download File
                          </Link>
                        </p>
                      </div>

                      <UpdateDocModal
                        id={userData?._id}
                        setIsLoading={setIsLoading}
                        doc={document}
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() =>
                          deleteDoc({userId: userData._id, docId: document._id})
                        }>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <Label>Created By</Label>
                  <p>
                    {userData?.createdBy?.name}({userData?.createdBy?.email})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <Label>Created At</Label>

                  <p>
                    {dayjs(userData?.createdAt).format("MMMM D, YYYY, h:mm A")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <Label>Last Updated By</Label>
                  <p>
                    {" "}
                    {userData?.updatedBy
                      ? userData?.updatedBy?.name
                      : "Not Updated Yet"}
                    {userData?.updatedBy
                      ? `(${userData?.updatedBy?.email})`
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <Label>Last Updated At</Label>
                  <p>
                    {userData?.updatedBy
                      ? dayjs(userData?.updatedAt).format(
                          "MMMM D, YYYY, h:mm A"
                        )
                      : "Not Updated Yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;

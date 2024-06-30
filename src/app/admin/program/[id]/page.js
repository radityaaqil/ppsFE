"use client";

import Navbar from "@/components/navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ProgramDetail = ({ params }) => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");
  let router = useRouter();

  const Status = (status) => {
    if (status == "ON_PROGRESS") {
      return (
        <div className="border-2 border-yellow-400 rounded-xl px-2 py-1 text-white bg-yellow-400 font-bold">
          ON PROGRESS
        </div>
      );
    } else if (status == "CREATED") {
      return (
        <div className="border-2 border-blue-400 rounded-xl px-2 py-1 text-white bg-blue-400 font-bold">
          CREATED
        </div>
      );
    } else if (status == "FINISHED") {
      return (
        <div className="border-2 border-green-400 rounded-xl px-2 py-1 text-white bg-green-400 font-bold">
          FINISHED
        </div>
      );
    }
  };

  const GetData = async (id) => {
    try {
      let res = await axios.get(`http://localhost:8080/admin/program/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized") {
        router.push("/");
      }
    }
  };

  const GetUsername = () => {
    if (typeof token !== "string") {
      return router.push("/");
    }
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.name);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    GetData(params.id);
    GetUsername();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: data.name,
      frequency: data.frequency,
      monitoring_method: data.monitoring_method,
      kpi: data.kpi,
      enforcement_method: data.enforcement_method,
      background: data.background,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        let res = await axios.patch(
          `http://localhost:8080/admin/program/${params.id}`,
          values,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res);

        if (!res.data.success) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: res.data.message,
          });
          onClose();
          GetData(params.id);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-gray-100 pb-14">
      <div>
        <Navbar name={username} />
      </div>
      <div className="mx-20">
        <div className="bg-white h-full mt-10 rounded-2xl">
          <div className="mx-12 pt-10 text-black">
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold ">Detail Program</div>
              <div className="flex space-x-4">
                <div
                  className="hover:cursor-pointer border-2 rounded-xl hover:border-gray-500 duration-300 flex justify-center items-center space-x-2 px-2 py-1"
                  onClick={onOpen}
                >
                  <FaRegEdit className="text-3xl text-green-600" />
                  <div>Edit Program</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 mx-12">
            <div className="flex justify-between items-center space-x-5">
              <div className="text-2xl font-bold">{data.name}</div>
              {Status(data.status)}
            </div>
            <div>
              {formatDate(data.start_date)} - {formatDate(data.end_date)}
            </div>
            <div className="mt-8">
              <div className="text-2xl font-bold">
                Tujuan dan Latar Belakang Program
              </div>
              <div className="w-full h-fit">{data.background}</div>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-2">
                <div>
                  <div className="mb-8">
                    <div className="text-2xl font-bold">Frekuensi</div>
                    <div className="w-[500px] h-fit">{data.frequency}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">KPI</div>
                    <div className="w-[500px] h-fit">{data.kpi}</div>
                  </div>
                </div>
                <div>
                  <div className="mb-8">
                    <div className="text-2xl font-bold">Metode Monitoring</div>
                    <div className="w-[500px] h-fit">
                      {data.monitoring_method}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Metode Enforcement</div>
                    <div className="w-[500px] h-fit">
                      {data.enforcement_method}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pb-16">
              <div className="text-2xl font-bold">Result</div>
              <div className="w-full h-fit">{data.result}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model */}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={formik.handleSubmit}>
            <ModalContent>
              <ModalHeader>Edit Program</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Judul</FormLabel>
                  <Input
                    placeholder="Judul Program"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="flex justify-center pt-2">
                      <p className="pl-3 text-red-500 rounded-xl font-bold w-[475px]">
                        {formik.errors.name}
                      </p>
                    </div>
                  ) : null}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Latar Belakang</FormLabel>
                  <Input
                    placeholder="Latar Belakang"
                    name="background"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.background}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Frekuensi</FormLabel>
                  <Input
                    placeholder="Frekuensi"
                    name="frequency"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.frequency}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>KPI</FormLabel>
                  <Input
                    placeholder="KPI"
                    name="kpi"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.kpi}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Metode Enforcement</FormLabel>
                  <Input
                    placeholder="Metode enforcement"
                    name="enforcement_method"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.enforcement_method}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Metode Monitoring</FormLabel>
                  <Input
                    placeholder="Metode monitoring"
                    name="monitoring_method"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.monitoring_method}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default ProgramDetail;

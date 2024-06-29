"use client";

import Navbar from "@/components/navbar";
import { IoMdAddCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
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
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Program = () => {
  const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      FetchData();
    }
  };

  const FetchData = async () => {
    let res = await axios.get(
      `http://localhost:8080/admin/program?keyword=${search}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    setData(res.data.data);
  };

  const GetUsername = () => {
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.name);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      frequency: "",
      monitoring_method: "",
      kpi: "",
      enforcement_method: "",
      background: "",
      start_date: new Date(),
      end_date: new Date(),
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      start_date: Yup.string().required("Required"),
      end_date: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      console.log("masuk sini");
      try {
        let res = await axios.post(
          `http://localhost:8080/admin/program`,
          values,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

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
          FetchData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    GetUsername();
    FetchData();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <div>
          <Navbar name={username} />
        </div>

        {/* Content */}
        <div className="mx-20">
          <div className="bg-white h-full mt-10 rounded-2xl">
            <div className="mx-12 pt-10 text-black">
              <div className="flex justify-between items-center">
                <div className="text-4xl font-bold ">Dashboard Program</div>
                <div className="flex space-x-4">
                  <div className="hover:cursor-pointer border-2 rounded-xl hover:border-gray-500 focus-within:border-gray-500 duration-300 flex justify-center items-center space-x-1 px-2 py-1">
                    <IoSearch className="text-3xl" onClick={FetchData} />
                    <input
                      className="pl-2 w-[150px] outline-none"
                      placeholder="Search"
                      value={search}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div
                    className="hover:cursor-pointer border-2 rounded-xl hover:border-gray-500 duration-300 flex justify-center items-center space-x-1 px-2 py-1"
                    onClick={onOpen}
                  >
                    <IoMdAddCircle className="text-3xl text-green-600" />
                    <div>Add Program</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24 mx-12">
              <div className="grid grid-cols-3 justify-between gap-y-24 pb-10">
                {data?.map((val, index) => {
                  return (
                    <Link href={`/admin/program/${val.id}`} key={index}>
                      <div className="flex flex-col items-center space-y-4 hover:cursor-pointer">
                        <div
                          className="radial-progress text-primary hover:text-red-400 duration-300"
                          style={{
                            "--value": `${val.value}`,
                            "--size": "10rem",
                            "--thickness": "1rem",
                          }}
                          role="progressbar"
                        >
                          {val.value}%
                        </div>
                        <div className="text-center text-black font-bold text-xl">
                          {val.title}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={formik.handleSubmit}>
            <ModalContent>
              <ModalHeader>Add Program</ModalHeader>
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
                  <FormLabel>Tanggal Mulai</FormLabel>
                  {/* <Input
                    placeholder="Tanggal Mulai"
                    name="start_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.start_date}
                  /> */}
                  <DatePicker
                    className="hover:cursor-pointer"
                    selected={formik.values.start_date}
                    onChange={(date) =>
                      formik.setFieldValue("start_date", date)
                    }
                  />
                  {formik.touched.start_date && formik.errors.start_date ? (
                    <div className="flex justify-center pt-2">
                      <p className="pl-3 text-red-500 rounded-xl font-bold w-[475px]">
                        {formik.errors.start_date}
                      </p>
                    </div>
                  ) : null}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Tanggal Selesai</FormLabel>
                  {/* <Input
                    placeholder="Tanggal Selesai"
                    name="end_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.end_date}
                  /> */}
                  <DatePicker
                    className="hover:cursor-pointer"
                    selected={formik.values.end_date}
                    onChange={(date) => formik.setFieldValue("end_date", date)}
                  />
                  {formik.touched.end_date && formik.errors.end_date ? (
                    <div className="flex justify-center pt-2">
                      <p className="pl-3 text-red-500 rounded-xl font-bold w-[475px]">
                        {formik.errors.end_date}
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

export default Program;

"use client";
import React, { useState } from "react";
import Input from "./Input";
import * as yup from "yup";
import { error } from "console";

interface onChangEventType {
  target: { value: string; name: string };
}
interface userDataType {
  userName: string;
  f_name: string;
  email: string;
  phone: string;
  dob: string;
  textarea: string;
  isSubmit: string;
}
export default function FormComponents() {
  //for validation
  const formValidationSchema = yup.object().shape({
    userName: yup.string().required().max(12).min(4),
    f_name: yup.string().required().min(4).max(12),
    email: yup.string().required().email(),
    phone: yup.number().min(11),
    dob: yup.date().required(),
    textarea: yup.string().required().min(10).max(50),
  });
  // const [name, setName] = useState("");
  // const [fname, setFname] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState(0);
  // const [dob, setDob] = useState("");
  // const [eligible, setEligible] = useState("");
  // const [gander, setGander] = useState("");
  // const [experience, setExperience] = useState("");
  // const [textarea, setTextArea] = useState("");
  // const [isSubmit, setIsSubmit] = useState(true);
  const [errors, setErrors] = useState([]);
  const [contentList, setContentList] = useState<userDataType[]>([]);
  const [userData, setUserData] = useState<userDataType>({
    userName: "",
    f_name: "",
    email: "",
    phone: "",
    dob: "",
    textarea: "",
    isSubmit: "",
  });

  const onChangeHandler = (e: onChangEventType) => {
    // console.log("name", e.target.value);
    // console.log("name", e.target.name);
    let userdetails = {
      ...userData,
      [e.target.name]: e.target.value,
    };
    setUserData(userdetails);
  };
  const onClickHandler = async () => {
    try {
      const result = await formValidationSchema.validate(userData);
      console.log(result);
      if (!result) {
        return;
      }

      const newContentList: userDataType[] = [...contentList, userData];
      setContentList(newContentList);
      // for empyu the field after submition
      setUserData({
        userName: "",
        f_name: "",
        email: "",
        phone: "",
        dob: "",
        textarea: "",
        isSubmit: "",
      });

      setErrors([]);
    } catch (err: any) {
      console.log(err.errors);
      setErrors(err.errors);
    }
  };
  // console.log("contentList", contentList);
  return (
    <>
      <div className="text-center text-4xl mt-10">Student Form </div>

      <div className="bg-green-100 max-w-[600px] mx-auto mt-2 p-5 rounded-lg">
        <form>
          <Input
            value={userData.userName}
            name="userName"
            type="text"
            lable="User Name"
            placeholder="Enter your Name"
            onChange={onChangeHandler}
          />
          <Input
            value={userData.f_name}
            name="f_name"
            type="text"
            lable="F_Name"
            placeholder="Enter your  F_Name"
            onChange={onChangeHandler}
          />
          <Input
            value={userData.email}
            name="email"
            type="email"
            lable="Email"
            placeholder="Enter your Email"
            onChange={onChangeHandler}
          />
          <Input
            value={userData.phone}
            name="phone"
            type="string"
            lable="Phone No"
            placeholder="Enter your Ph-No"
            onChange={onChangeHandler}
          />
          <Input
            value={userData.dob}
            name="dob"
            type="date"
            lable="Date of Birth"
            placeholder="Enter your Ph-No"
            onChange={onChangeHandler}
          />

          <div className="mt-6">
            <label htmlFor="textarea">How Can We Help You:</label>
            <textarea
              value={userData.textarea}
              onChange={onChangeHandler}
              name="textarea"
              className=" outline-none p-2  bg-slate-100 border border-green-600"
              id="textarea"
              cols={58}
              rows={5}
            />
          </div>
          <div className="mt-7">
            {errors.map((item, index) => {
              return <div className="text-red-600">{item}</div>;
            })}
          </div>
          <button
            onClick={onClickHandler}
            type="button"
            className="bg-blue-500 py-2 px-3 w-full mt-2 "
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-green-200 max-w-[600px] mx-auto mt-2 p-5 rounded-lg">
        <div className="text-4xl text-center">Information </div>

        <table className="mx-auto">
          <thead>
            <tr>
              <th className=" border p-3 mx-2 border-red-500">Name</th>
              <th className="border p-3 mx-2 border-red-500">Father Name</th>
              <th className="border p-3 mx-2 border-red-500">Email</th>
              <th className="border p-3 mx-2 border-red-500">Phone No</th>
            </tr>
          </thead>
          <tbody>
            {contentList.map((item, ind) => {
              return (
                <tr key={ind}>
                  <td className="border p-3 mx-2 border-red-500">
                    {item.userName}
                  </td>
                  <td className="border p-3 mx-2 border-red-500">
                    {item.f_name}
                  </td>
                  <td className="border p-3 mx-2 border-red-500">
                    {" "}
                    {item.email}
                  </td>
                  <td className="border p-3 mx-2 border-red-500">
                    {item.phone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <div>Name: {userData.userName}</div>

        <div>fname: {userData.fname}</div>
        <div>email: {userData.email}</div>
        <div>phone: {userData.phone}</div>
        <div>dob: {userData.dob}</div>
        <div>eligible: {userData.eligible}</div>
        <div>gander: {userData.gander}</div>
        <div>experience: {userData.experience}</div>
        <div>textarea: {userData.textarea}</div> */}
      </div>
    </>
  );
}

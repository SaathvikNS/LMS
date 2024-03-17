import React, { createContext, useState } from "react";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [username, setusername] = useState();
  const [empid, setempid] = useState();
  const [email, setemail] = useState();
  const [instname, setinstname] = useState();
  const [department, setdepartment] = useState({});

  // managerprofile
  const [profiledep, setprofiledep] = useState();
  const [profilecontact, setprofilecontact] = useState();
  const [profiledateofjoin, setprofiledateofjoin] = useState();
  const [profiledateofbirth, setprofiledateofbirth] = useState();
  const [profilegender, setprofilegender] = useState();

  // employeemanagement
  const [applications, setapplications] = useState({});
  const [employeelist, setemployeelist] = useState({})

  // companydetailsfetcher
  const [area, setarea] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [country, setcountry] = useState();
  const [pincode, setpincode] = useState();
  const [yoe, setyoe] = useState();
  const [companymail, setcompanymail] = useState();
  const [companycontact, setcompanycontact] = useState();
  const [empcount, setempcount] = useState();
  const [leaves, setleaves] = useState({});


  // Employee
  const [employeeinst, setemployeeinst] = useState();
  const [employeedepartment, setemployeedepartment] = useState();
  const [leavefromdate, setleavefromdate] = useState();
  const [leavetodate, setleavetodate] = useState();
  const [currentleavetype, setcurrentleavetype] = useState();
  const [allapplicationsummary, setallapplicationsummary] = useState();

  // employeeprofile
  const [empcontact, setempcontact] = useState();
  const [empdoj, setempdoj] = useState();
  const [empdept, setempdept] = useState();
  const [empdob, setempdob] = useState();
  const [empmail, setempmail] = useState();
  const [empempid, setempempid] = useState();
  const [empgender, setempgender] = useState();
  const [empinstname, setempinstname] = useState();
  const [empleaves, setempleaves] = useState({});
  const [empname, setempname] = useState();
  const [empverified, setempverified] = useState();
  const [instleaves, setinstleaves] = useState({});
  const [employeemodule, setemployeemodule] = useState();
  const [mydata, setmydata] = useState();

  const [module, setModule] = useState("");
  const [gender, setGender] = useState();

  return (
    <MyContext.Provider
      value={{
        username, setusername,
        department, setdepartment,
        instname, setinstname,
        empid, setempid,
        email, setemail,
        module, setModule,
        gender, setGender,
        profiledep, setprofiledep,
        profilecontact, setprofilecontact,
        profiledateofjoin, setprofiledateofjoin,
        profiledateofbirth, setprofiledateofbirth,
        profilegender, setprofilegender,
        area, setarea,
        city, setcity,
        state, setstate,
        country, setcountry,
        pincode, setpincode,
        yoe, setyoe,
        companymail, setcompanymail,
        companycontact, setcompanycontact,
        empcount, setempcount,
        leaves, setleaves,
        employeeinst, setemployeeinst,
        employeedepartment, setemployeedepartment,
        empcontact, setempcontact,
        empdoj, setempdoj,
        empdept, setempdept,
        empdob, setempdob,
        empmail, setempmail,
        empempid, setempempid,
        empgender, setempgender,
        empinstname, setempinstname,
        empleaves, setempleaves,
        empname, setempname,
        empverified, setempverified,
        instleaves, setinstleaves,
        applications, setapplications,
        employeemodule, setemployeemodule,
        employeelist, setemployeelist,
        leavefromdate, setleavefromdate,
        leavetodate, setleavetodate,
        currentleavetype, setcurrentleavetype,
        allapplicationsummary, setallapplicationsummary,
        mydata, setmydata,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider, MyContext };

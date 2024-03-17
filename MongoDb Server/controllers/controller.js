const Manager = require("../model/managerSchema");
const Institute = require("../model/instituteSchema");
const Employee = require("../model/employeeSchema");
const EmployeeApplications = require("../model/employeeapplicationschema");
const LeavesCollection = require("../model/leavescollectionschema")
require('dotenv').config();

exports.createemployee = async (req, res) => {
    const {name, empid, email, password, gender, instname, dateofjoin, department} = req.body;

    const employee = await Employee.findOne({email})
    if(employee) return res.status(400).send({success: false, error: "User email already registered"})

    const employeeid = await Employee.findOne({empid})
    if(employeeid) return res.status(400).send({success: false, error: "Duplicate Employee Id!"})

    const managerid = await Manager.findOne({empid})
    if(managerid) return res.status(400).send({success: false, error: "Duplicate Employee Id!"})

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(200).send({success: false, error: "Unable to find the institution."})
    
    const application = await EmployeeApplications.findOne({empid})
    if(application) return res.status(200).send({success: false, error: "Application Confirmation Pending"})

    
    const newapplication = new EmployeeApplications({
        instname,
        empid,
    })
    
    const newemployee = new Employee({
        name,
        empid,
        email,
        password,
        gender,
        instname,
        dateofjoin,
        department
    })
    newemployee.leaves = institute.leaves
    
    await newemployee.save()
    await newapplication.save()

    res.status(200).send({success: true, message:"Employee registered successfully!"})
}

exports.createManager = async (req, res) =>  {
    const {name, empid, email, password, gender, instname, dateofjoin} = req.body;
    
    const manager = await Manager.findOne({email})
    if(manager) return res.status(400).send({success: false, error: "User email already registered"})
    
    const managerid = await Manager.findOne({empid})
    if(managerid) return res.status(400).send({success: false, error: "Duplicate Employee Id!"})
    
    const institute = await Institute.findOne({instname})
    if(institute) return res.status(400).send({success: false, error: "Company Already Exist"})

    const newManager = new Manager({
        name,
        empid,
        email,
        password,
        gender,
        instname,
        dateofjoin
    })
    
    const newInstitute = new Institute({
        instname,
    })

    await newInstitute.save();
    await newManager.save();

    res.send({success: true, user: {name: newManager.name, empid: newManager.empid, email: newManager.email, id: newManager._id, gender: newManager.gender, institute: newManager.institute}});
}

exports.leaves = async (req, res) => {
    const { name, leaves } = req.body;

    const institute = await Institute.findOne({name})

    institute.leaves = leaves

    institute.save()
    res.send({success: true, user: {InstituteName: institute.name , Leaves: institute.leaves}});
}

exports.login = async (req, res) => {
    const {module, email, password} = req.body;

    if (module === "Manager") {
        const manager = await Manager.findOne({email})
        if(!manager) return res.status(400).send({success: false, error: 'User not found!'});
    
        const isMatched = await manager.comparePassword(password);
        if(!isMatched) return res.status(401).send({success: false, error: 'Email/Password does not match'});
        
        res.status(200).send({success: true, user: {name: manager.name, email: manager.email, empid: manager.empid, instname: manager.instname, department: manager.department, contact: manager.contactnumber, dateofjoining: manager.dateofjoin, dob: manager.dob, gender: manager.gender}})
    } else if(module === "Employee") {
        const employee = await Employee.findOne({email})
        if(!employee) return res.status(400).send({success: false, error: 'User not found!'});
    
        const isMatched = await employee.comparePassword(password);
        if(!isMatched) return res.status(401).send({success: false, error: 'Email/Password does not match'});

        const verified = employee.verified
        if(!verified) return res.status(401).send({success: false, error: 'Employee not yet verified!'});

        const tempinstname = employee.instname

        const institute = await Institute.findOne({instname: tempinstname})
        if(!institute) return res.status(400).send({success: false, error:"institute not found"});        

        res.status(200).send({success: true, user: {name: employee.name, email: employee.email, empid: employee.empid, instname: employee.instname, department: employee.department, contact: employee.contactnumber, dateofjoining: employee.dateofjoin, dob: employee.dob, gender: employee.gender, leaves: employee.leaves, verified: employee.verified, instituteleaves: institute.leaves}})
    }    

}

exports.forgotpassword = async (req, res) => {
    const {module, email, password} = req.body;
  
    if (module === "Manager") {
        const manager = await Manager.findOne({email})
        if(!manager) return res.status(400).send({success: false, error: 'User not found!'});
    
        const isMatched = await manager.comparePassword(password);
        if(isMatched) return res.status(401).send({success: false, error: 'New password must be different from the old password'});

        manager.password = password.trim()
        manager.save();
        
        res.status(200).send({success: true, message: "Password Reset Successfull"})
    } else if(module === "Employee") {
        const employee = await Employee.findOne({email})
        if(!employee) return res.status(400).send({success: false, error: 'User not found!'});
    
        const isMatched = await employee.comparePassword(password);
        if(isMatched) return res.status(401).send({success: false, error: 'New password must be different from the old password'});

        employee.password = password.trim()
        employee.save();

        res.status(200).send({success: true, message: "Password Reset Successfull"})
    }   
}

exports.fetchdepartment = async (req, res) => {
    const {instname} = req.body;

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error: "Unable to load data, please try again later"});

    res.status(200).send({success: true, departments: institute.departments})
}

exports.addleave = async (req, res) => {
    const {instname, leaves} = req.body

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error:"Unable to load data, please try again later"})

    institute.leaves = leaves
    institute.save()

    res.status(200).send({success: true, leaves: institute.leaves})
}

exports.adddepartment = async (req, res) => {
    const {instname, department} = req.body;

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error: "Unable to load data, please try again later"});

    institute.departments = department
    institute.save();

    res.status(200).send({success: true, departments: institute.departments})
}

exports.fetchprofile = async (req, res) => {
    const {module, empid} = req.body

    if(module === 'Manager'){
        const manager = await Manager.findOne({empid})
        if(!manager) return res.status(400).send({success: false, error: "User not found!"})

        res.status(200).send({success: true, user:{department: manager.department, contact: manager.contactnumber, dateofjoining: manager.dateofjoin, dob: manager.dob, gender: manager.gender}})
    } else if(module === 'Employee'){
        const employee = await Employee.findOne({empid})
        if(!employee) return res.status(400).send({success: false, error: "User not found!"})

        res.status(200).send({success: true, user:{name: employee.name, empid: employee.empid, department: employee.department, email: employee.email, number: employee.contactnumber, doj: employee.dateofjoin, dob: employee.dob, gender: employee.gender, verified: employee.verified}})
    }
}

exports.updateprofile = async (req, res) => {
    const {module, empid, email, profilecontact, profiledateofjoin, profiledateofbirth} = req.body

    if (module === "Manager") {
        const manager = await Manager.findOne({empid})
        if(!manager) return res.status(400).send({success: false, error: "User not found!"})

        manager.email = email
        manager.contactnumber = profilecontact
        manager.dateofjoin = profiledateofjoin
        manager.dob = profiledateofbirth

        manager.save()

        res.status(200).send({success: true, message: "Profile update successful"})
    } else if( module === "Employee") {
        const employee = await Employee.findOne({empid})
        if(!employee) return res.status(400).send({success: false, error: "User not found!"})

        employee.email = email
        employee.contactnumber = profilecontact
        employee.dateofjoin = profiledateofjoin
        employee.dob = profiledateofbirth

        employee.save()

        res.status(200).send({success: true, message: "Profile update successful"})
    }
}

exports.fetchcompanydetails = async (req, res) => {
    const {instname} = req.body

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error: "Couldnt find the institution. please try again later."})

    res.status(200).send({success: true, institution: {area: institute.area, city: institute.city, state: institute.state, country: institute.country, pincode: institute.pincode, yoe: institute.yoe, companymail: institute.email, companycontact: institute.number, empcount: institute.employeecount, leaves: institute.leaves, }})
}

exports.updatecompany = async (req, res) => {
    const {instname, area, city, state, country, pincode, yoe, companymail, companycontact, leaves} = req.body;

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({succcess: false, error: "Something went wrong please try again later"})

    institute.area = area
    institute.city = city
    institute.state = state
    institute.country = country
    institute.pincode = pincode
    institute.yoe = yoe
    institute.email = companymail
    institute.number = companycontact
    institute.leaves = leaves

    institute.save()
    res.status(200).send({success: true, message:"Company details updated successfully"})
}

exports.institutelist = async (req, res) => {
    const institutes = await Institute.find({}, 'instname')

    res.json(institutes.map( (institute) => institute.instname))
}

exports.instdepartmentlist = async (req, res) => {
    const {instname} = req.body;

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(200).send({success: false, error: "please select the institution first!"})

    res.json(Object.keys(institute.departments))
}

exports.getemployees = async (req, res) => {
    const {instname} = req.body;

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(200).send({success: false, error: "Couldn't find the institution"})

    const employees = await Employee.find({instname})
    if(!employees) return res.status(200).send({success: false, error: "No employees found"})

    const verifiedEmployees = employees.filter(employee => employee.verified);

    const employeeData = verifiedEmployees.reduce((acc, employee) => {
        acc[employee.empid] = employee.name;
        return acc;
      }, {});
  
      res.status(200).send({ success: true, employeeData }); 

}

exports.getapplication = async (req, res) => {
    const {instname} = req.body;

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(200).send({success: false, error: "Couldn't find the institution"})

    const applications = await EmployeeApplications.find({instname})
    if(!applications) return res.status(200).send({success: false, error: "No applications found"})
    
    const empids = applications.map(application => application.empid)
    const employees = await Employee.find({ empid: { $in: empids } }, 'empid name');

    const employeeData = employees.reduce((acc, employee) => {
        acc[employee.empid] = employee.name;
        return acc;
      }, {});

    res.status(200).send({success: true, employeeData})
}

exports.verifyemployee = async (req, res) => {
    const {empid} = req.body;

    const employee = await Employee.findOne({empid})
    if(!employee) return res.status(400).send({success: false, error: "No User Found"})

    const instname = employee.instname
    const department = employee.department

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error: "No Institute Found"})

    const updatedDepartments = { ...institute.departments };
    updatedDepartments[department] = (updatedDepartments[department] || 0) + 1;
    institute.departments = updatedDepartments;

    institute.employeecount = institute.employeecount + 1
    employee.verified = true;

    institute.save();
    employee.save();

    const application = await EmployeeApplications.deleteOne({empid})

    if(application.deletedCount === 1) {
        res.status(200).send({ success: true, message: 'Employee added successfully'});
    } else {
        res.status(400).send({ success: false, message: 'Employee could not be added' });
    }
}

exports.unverifyemployee = async (req, res) => {
    const {empid} = req.body;

    const employee = await Employee.deleteOne({empid})
    const application = await EmployeeApplications.deleteOne({empid})

    if(application.deletedCount === 1 && employee.deletedCount === 1) {
        res.status(200).send({ success: true, message: 'Employee application rejected'});
    } else {
        res.status(400).send({ success: false, message: 'Employee could not be removed' });
    }
}

exports.removeemployee = async (req, res) => {
    const {empid} = req.body;

    const employee = await Employee.findOne({empid})

    const instname = employee.instname

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error: "No Institute Found"})

    institute.employeecount = institute.employeecount - 1

    institute.save();
    await employee.deleteOne();
    
    res.status(200).send({ success: true, message: 'Employee removed successfully'});
}

exports.applyleave = async (req, res) => {
    const {instname, empid, fromdate, todate, leavetype, reason, noofdays} = req.body

    const employee = await Employee.findOne({empid})
    if (!employee) return res.status(400).send({success: false, error: "No User Found"})

    const institute = await Institute.findOne({instname})
    if(!institute) return res.status(400).send({success: false, error: "Institute not Found"})

    if (!employee.leaves.hasOwnProperty(leavetype)) {
        return res.status(400).json({ success: false, error: 'Invalid leave type' });
    }

    const leavesoffered = institute.leaves[leavetype]
    const remainingleaves = employee.leaves[leavetype]

    const newremainingleaves = remainingleaves - noofdays;

    if(newremainingleaves >= 0 && leavesoffered >= noofdays){
        const newleaveapplication = new LeavesCollection({
            instname,
            empid,
            leavetype,
            fromdate,
            todate,
            reason,
            noofdays,
        })

        const updatedleaves = {...employee.leaves}
        updatedleaves[leavetype] = newremainingleaves;
        employee.leaves = updatedleaves

        employee.save();
        newleaveapplication.save()

        return res.status(200).json({ success: true, message: 'Leave applied successfully' });
    } else {
        res.status(400).send({ success: false, error: 'no. of leaves exceeds the limit' });
    }
}

exports.fetchleaves = async (req, res) => {
    const {empid} = req.body

    const employee = await Employee.findOne({empid})
    if(!employee) return res.status(400).send({success: false, error: "Something broke"})

    res.status(200).send({ success: true, leaves: employee.leaves});
}

exports.handleapplication = async (req, res) => {
    const {id, status} = req.body

    const application = await LeavesCollection.findOne({_id: id})
    if(!application) return res.status(400).send({success: false, error: "Unable to access the application"})

    if(status === "approved") {
        application.status = status

        application.save()

        res.status(200).send({ success: true, message: 'Application approved'});
    } else if (status === "rejected") {
        const empid = application.empid
        const leavetype = application.leavetype
        
        const employee = await Employee.findOne({empid})
        if(!employee) return res.status(400).send({success: false, error: "Something broke"})
        
        const updatedleaves = {...employee.leaves}
        updatedleaves[leavetype] = updatedleaves[leavetype] + application.noofdays;
        employee.leaves = updatedleaves
        
        application.status = status

        employee.save()
        application.save()

        res.status(200).send({ success: true, message: 'Application rejected'});
    } else {
        res.status(400).send({success: false, error: "Something went wrong"})
    }
}

exports.deleteapplication = async (req, res) => {
    const {id} = req.body;

    const application = await LeavesCollection.findOne({_id: id})
    if(!application) return res.status(400).send({success: false, error: "Unable to access the application"})

    const empid = application.empid
    const leavetype = application.leavetype

    const employee = await Employee.findOne({empid})
    if(!employee) return res.status(400).send({success: false, error: "Something broke"})

    const updatedleaves = {...employee.leaves}
    updatedleaves[leavetype] = updatedleaves[leavetype] + application.noofdays;
    employee.leaves = updatedleaves

    employee.save();
    await application.deleteOne();
    
    res.status(200).send({ success: true, message: 'Application removed successfully'});
}

exports.statistics = async (req, res) => {
    const {instname, status} = req.body
    
    const leaveApplications = await LeavesCollection.find({instname})
    if(!leaveApplications) res.status(200).send({message: "No application found"})

    const institution = await Institute.findOne({instname})
    if(!institution) res.status(200).send({message: "Something went wrong"})

    const empIds = leaveApplications.map(app => app.empid);
    const employees = await Employee.find({ empid: { $in: empIds } })

    const approvedleaves = leaveApplications.map(application => {
        const employeeInfo = employees.find(emp => emp.empid === application.empid);
        if (employeeInfo) {
          return {
            ...application._doc,
            name: employeeInfo.name,
            department: employeeInfo.department,
          };
        } else {
          return {
            ...application._doc,
            name: "No Name",
            dept: "No Department",
          };
        }
      }).filter(application => application.status === status);

    res.status(200).send({leaves: approvedleaves, institution});
}

exports.managerfetchleaves = async (req, res) => {
    const {instname, status} = req.body
    
    const leaveApplications = await LeavesCollection.find({instname})
    if(!leaveApplications) res.status(200).send({message: "No application found"})

    const empIds = leaveApplications.map(app => app.empid);
    const employees = await Employee.find({ empid: { $in: empIds } })

    const pendingLeaves = leaveApplications.map(application => {
        const employeeInfo = employees.find(emp => emp.empid === application.empid);
        if (employeeInfo) {
          return {
            ...application._doc,
            name: employeeInfo.name,
            department: employeeInfo.department,
          };
        } else {
          return {
            ...application._doc,
            name: "No Name",
            dept: "No Department",
          };
        }
      }).filter(application => application.status === status);

    res.status(200).json(pendingLeaves);
}

exports.employeefetchleaves = async (req, res) => {
    const {empid, status} = req.body

    const leaveApplications = await LeavesCollection.find({empid})
    if(!leaveApplications) res.status(200).send({message: "No application found"})

    const pendingLeaves = leaveApplications.filter(
        (application) => application.status === status
    );
    if(!pendingLeaves) res.status(200).send({message: "No applications pending"})

    res.status(200).json(pendingLeaves);
}

exports.employeefetchleavesummary = async (req, res) => {
    const {empid} = req.body

    const allapplications = await LeavesCollection.find({empid})
    if(!allapplications) res.status(200).send({message: "No application found"})

    res.status(200).json(allapplications);
}
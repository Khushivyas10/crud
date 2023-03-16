import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";

const EmpCreate = () => {
  const def = 'Please Select a Language'
  const [nameclicked, setnameclicked] = useState(false);
  const [desclicked, setdesclicked] = useState(false);
  const [pclicked, setpclicked] = useState(false);
  const [emailclicked, setemailclicked] = useState(false);
  const [passclicked, setpassclicked] = useState(false);
  const [phoneclicked, setphoneclicked] = useState(false);
  const [dateclicked, setdateclicked] = useState(false);
  const [joinclicked, setjoinclicked] = useState(false);
  const [valid, setvalid] = useState(false);

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [description, textareachange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [confirmpassword, confirmpasswordchange] = useState("");
  const [phone, phonechange] = useState("");
  const [language, languagechange] = useState("");
  const [date, datechange] = useState("");
  const [color, colorchange] = useState("");
  const [time, timechange] = useState("");
  const [hobby, hobbychange] = useState([]);
  const [gender, genderchange] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const data = [
    { skill: " c++", id: 1,  value: " c++" },
    { skill: "java", id: 2 ,value: "java"},
    { skill: "Python", id: 3 ,value: "Python"},
  ];
  const [options] = useState(data);
  const [skill ,setskill] =useState([]);
  console.log("skill", skill);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  
  const handlesubmit = (e) => {
    e.preventDefault();
    // {password!==confirmpassword && <span className='text-danger'>Password and confirmpassword should match </span>}
    const empdata = {
      name,
      description,
      email,
      password,
      phone,
      language,
      date,
      color,
      time,
      hobby,
      gender,
      skill,
    };
    console.log("empdata", empdata);

    if (
      password === confirmpassword &&
      name.length !== 0 &&
      description.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      phone.length === 10 &&
      language !== "" &&
      hobby.length !== 0 &&
      gender.length !== 0
    ) {
      fetch("http://localhost:8000/employee", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(empdata),
      })
        .then((res) => {
          // alert("Saved Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      if (name.length === 0) alert("Name is Mandatory");
      if (description.length === 0) alert("Write little Description about you");
      if (email.length === 0) alert("Write Email field");
      if (password.length === 0) alert("Write Password field");
      if (password !== confirmpassword)
        alert("Password and Confirm-password should match");
      if (phone.length !== 10) alert("Write a valid Phone number ");
      if (language === "") alert("Please Select Language");
      if (hobby.length === 0) alert("Please Select your Hobby");
      if (gender.length === 0) alert("Please Enter Gender ");
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    var value = target.value;
    console.log("value", value);
    if (target.checked) {
      hobbychange([...hobby, value]);
      //console.log(...hobby,value )
      // hobby[value] = [...hobby, value];
    } else {
      hobby.splice(value, 1);
    }
  };

  const handleSkill = (event) =>{
    console.log('sk',event)
    setskill([...event])
    
  }
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title" style={{ fontFamily: "serif" }}>
                <h2> Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> ID</label>
                      <input
                        disabled="disabled"
                        value={id}
                        className="form-control"
                        type="text"
                        onChange={(e) => idchange(e.target.value)}
                      />
                      {/* <input value={id} disabled='disabled' className='form-control' type='text' /> */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Name</label>
                      <span className="text-danger">* </span>
                      <input
                        value={name}
                        // onMouseDown={(e) => valchange(true)}
                        onChange={(e) => {
                          namechange(e.target.value);
                          setnameclicked(true);
                        }}
                        className="form-control"
                        type="text"
                      />
                  {/* {name.length == 0 && validation && <span className='text-danger'>Name is Required </span>} */}
                      {/* {name.length == 0 &&
                        nameclicked &&
                        alert("Name is Required")} */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Description</label>
                      <span className="text-danger">* </span>
                      <textarea
                        value={description}
                        rows="4"
                        cols="50"
                        onChange={(e) => {
                          textareachange(e.target.value);
                          setdesclicked(true);
                        }}
                      >
                        {" "}
                      </textarea>
                      {/* {description.length == 0 &&
                        desclicked &&
                        alert("Description is Required")} */}
                    </div>
                  </div>

                  <div className ="col-lg-12">
                    <div className="form-group">
                      <label> Passport-size</label>
                      <span className="text-danger">* </span>
                      <br />
                      <input required type="file" onChange={handleFileChange} />
                      {/* {passclicked  && alert('Passport-size pic is Required')} */}
                      <img src={file}></img>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Email</label>
                      <span className="text-danger">* </span>
                      <input
                        value={email}
                        pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$"
                        title="The domain portion of the email address is invalid (the portion after the @)"
                        onChange={(e) => {
                          emailchange(e.target.value);
                          setemailclicked(true);
                        }}
                        className="form-control"
                        type="text"
                      />
                      {email.length == 0 &&
                        emailclicked &&
                        alert("Email is Required")}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Password</label>
                      {/* <i class="far fa-eye" id="togglePassword"></i> */}
                      <span className="text-danger">* </span>
                      <input
                        type="password"
                        inlength="8"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                        value={password}
                        onChange={(e) => {
                          passwordchange(e.target.value);
                          setpclicked(true);
                        }}
                        className="form-control"
                      />

                      {password.length === 0 &&
                        pclicked &&
                        alert("Password is Required")}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Confirm Password</label>
                      {/* <i class="far fa-eye" id="togglePassword"></i> */}
                      <span className="text-danger">* </span>
                      <input
                        required
                        type="password"
                        inlength="8"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                        value={confirmpassword}
                        onChange={(e) => confirmpasswordchange(e.target.value)}
                        className="form-control"
                      />
                      {/* if (password === confirmpassword) {
                        setvalid(true)
                      } */}
                      {/* {password !== confirmpassword && (
                        <span className="text-danger">
                          Password and confirmpassword should match{" "}
                        </span>
                      )} */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <span className="text-danger">* </span>
                      <input
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control"
                        type="number"
                      />
                      {phone.length === 0 &&
                        hover === true &&
                        alert("Phone is Required")}
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}>Date of Joining</label>
                  <div className="col-lg-12">
                    <span className="text-danger">* </span>
                    <div className="form-group">
                      <input
                        required
                        value={date}
                        onChange={(e) => {
                          datechange(e.target.value);
                          setdateclicked(true);
                        }}
                        className="form-control"
                        type="date"
                      />
                      {date.length === 0 &&
                        dateclicked &&
                        alert("Date is Required")}
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}> Joining Time </label>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <span className="text-danger">* </span>
                      <input
                        required
                        value={time}
                        onChange={(e) => {
                          timechange(e.target.value);
                          setjoinclicked(true);
                        }}
                        className="form-control"
                        type="time"
                        width={"10px"}
                      />
                      {time.length === 0 &&
                        joinclicked &&
                        alert("Time is Required")}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ marginTop: "10px" }}>
                        Favourite color
                      </label>
                      <span className="text-danger">* </span>
                      <input
                        required
                        value={color}
                        onChange={(e) => colorchange(e.target.value)}
                        className="form-control"
                        type="color"
                        width={"10px"}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ marginTop: "10px" }}> Language </label>
                      <span className="text-danger">* </span>
                      <select
                        // required
                        onChange={(e) => languagechange(e.target.value)}
                        style={{ marginRight: "10px" }}
                        defaultValue={def}
                      >
                        <option  disabled value={def}>
                          Please select Language
                        </option>
                        <option value="English">English</option>
                        <option value="Gujarati">Gujarati</option>

                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ marginTop: "10px" }}>
                        {" "}
                        Techincal skills{" "}
                      </label>
                      <span className="text-danger">* </span>
                      
                      <Multiselect
                         options={options}
                         displayValue="skill"
                         onSelect={handleSkill}
                         />
                    </div>
                  </div>

                  <div
                    className="col-lg-12"
                    required
                    style={{ marginTop: "10px" }}
                  >
                    <label style={{ float: "left" }}>Hobbies</label>
                    <span style={{ float: "left" }} className="text-danger">
                      *{" "}
                    </span>

                    <div
                      className="form-check"
                      style={{ float: "left", marginLeft: "10px" }}
                    >
                      <input
                        value="reading"
                        onChange={handleInputChange}
                        className="form-check-input"
                        type="checkbox"
                        name="hobby"
                      />
                      <label className="form-check-label"> Reading</label>
                    </div>
                    <div className="form-check" style={{ float: "left" }}>
                      <input
                        value="sketching"
                        onChange={handleInputChange}
                        className="form-check-input"
                        name="hobby"
                        type="checkbox"
                        style={{ marginLeft: "10px" }}
                      />
                      <label className="form-check-label"> Sketching</label>
                    </div>
                    <div className="form-check" style={{ float: "left" }}>
                      <input
                        value="singing"
                        onChange={handleInputChange}
                        className="form-check-input"
                        name="hobby"
                        type="checkbox"
                        style={{ marginLeft: "10px" }}
                      />
                      <label className="form-check-label"> Singing</label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ marginTop: "10px" }}>Gender </label>
                      <span className="text-danger">* </span>
                      <input
                        onChange={(e) => genderchange(e.target.value)}
                        checked={gender === "Male"}
                        type="radio"
                        value="Male"
                        name="gender"
                      />{" "}
                      Male
                      <input
                        onChange={(e) => genderchange(e.target.value)}
                        checked={gender === "Female"}
                        type="radio"
                        value="Female"
                        name="gender"
                        style={{ marginLeft: "10px" }}
                      />{" "}
                      Female
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save{" "}
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;

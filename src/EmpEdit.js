import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
function EmpEdit() {
  const { empid } = useParams();

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [description, textareachange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [phone, phonechange] = useState("");
  const [language, languagechange] = useState("");
  const [date, datechange] = useState("");
  const [color, colorchange] = useState("");
  const [time, timechange] = useState("");

  const [hobby, hobbychange] = useState([]);
  // const [reading,setreading] = useState(true)
  // const [sketching,setsketching] = useState(true)
  // const [singing,setsinging] = useState(true)

  const [gender, genderchange] = useState();
  const [validation, valchange] = useState(false);
  
  const [skill ,setskill] =useState([]);
  const navigate = useNavigate();
  //const[empdata,empdatachange]=useState({})

  const data = [
    { skill: " c++", id: 1,  value: " c++" },
    { skill: "java", id: 2 ,value: "java"},
    { skill: "Python", id: 3 ,value: "Python"},
  ];
  const [options] = useState(data);
  const handleSkill = (event) =>{
   // console.log('sk',event)
    setskill([...event])
    
  }
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

 
  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        textareachange(resp.description);
        emailchange(resp.email);
        passwordchange(resp.password);
        phonechange(resp.phone);
        languagechange(resp.language);
        datechange(resp.date);
        timechange(resp.time);
        setskill(resp.skill)
        // console.log(skill)
        //  hobbychange = () =>{
        //  console.log(resp.hobby)
        //  let H = JSON.parse(resp.hobby)
        //  document.getElementById(hobby.findIndex(resp.hobby)).checked = true;}
        //  let h = {getChecked(resp.hobby)}
        hobbychange(resp.hobby);

        genderchange(resp.gender);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = {
      id,
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
      skill
    };

    fetch("http://localhost:8000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title" style={{ fontFamily: "serif" }}>
                <h2> Employee Edit</h2>
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
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                        type="text"
                      />
                      {name.length === 0 && validation && (
                        <span className="text-danger">Name is Required </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Description</label>
                      <textarea
                        value={description}
                        rows="4"
                        onChange={(e) => textareachange(e.target.value)}
                        className="form-control"
                      >
                        {" "}
                      </textarea>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => passwordchange(e.target.value)}
                        className="form-control"
                      />
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
                        type="text"
                      />
                      {phone.length === 0 && (
                        <span className="text-danger"> Phone is Required</span>
                      )}
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}>Date of Joining</label>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        value={date}
                        onChange={(e) => datechange(e.target.value)}
                        className="form-control"
                        type="date"
                      />
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}> Joining Time </label>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        value={time}
                        onChange={(e) => timechange(e.target.value)}
                        className="form-control"
                        type="time"
                        width={"10px"}
                      />
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}>Favourite color</label>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        value={color}
                        onChange={(e) => colorchange(e.target.value)}
                        className="form-control"
                        type="color"
                        width={"10px"}
                      />
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}> Language </label>
                  <div>
                    <select
                      onChange={(e) => languagechange(e.target.value)}
                      value={language}
                    >
                      <option value="English">English</option>
                      <option value="Gujarati">Gujarati</option>

                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>

                  <label style={{ marginTop: "10px" }}>
                    {" "}
                    Techincal skills{" "}
                  </label>
                  <div>
                    <Multiselect
                      options={options}
                      displayValue="skill"
                      onSelect={handleSkill}
                      selectedValues={skill}
                    />
                  </div>

                  <label style={{ marginTop: "10px" }}>Hobbies</label>
                  <div className="col-lg-12">
                    <div className="form-check" style={{ float: "left" }}>
                      <input
                        name="reading"
                        checked={hobby.some((e) => e === "reading")}
                        value="reading"
                        onChange={handleInputChange}
                        className="form-check-input"
                        type="checkbox"
                      />
                      <label className="form-check-label"> Reading</label>
                    </div>
                    <div className="form-check" style={{ float: "left" }}>
                      <input
                        name="sketching"
                        checked={hobby.some((e) => e === "sketching")}
                        value="sketching"
                        onChange={handleInputChange}
                        className="form-check-input"
                        type="checkbox"
                        style={{ marginLeft: "10px" }}
                      />
                      <label className="form-check-label"> Sketching</label>
                    </div>
                    <div className="form-check" style={{ float: "left" }}>
                      <input
                        name="singing"
                        checked={hobby.some((e) => e === "singing")}
                        value="singing"
                        onChange={handleInputChange}
                        className="form-check-input"
                        type="checkbox"
                        style={{ marginLeft: "10px" }}
                      />
                      <label className="form-check-label"> Singing</label>
                    </div>
                  </div>

                  <label style={{ marginTop: "10px" }}>Gender </label>
                  <div value={gender}>
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
}

export default EmpEdit;

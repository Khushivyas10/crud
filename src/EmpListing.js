import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();

  const LoadDetails = (id) => {
    navigate("/employee/details/" + id);
  };
  const EditDetails = (id) => {
    navigate("/employee/edit/" + id);
  };
  const RemoveDetails = (id) => {
    if (window.confirm("Do you want to remove ?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed Successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  //Data fetching from db.json
  console.log("empdata", empdata);
  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card h-400">
        <div className="card-title" style={{ fontFamily: "serif" }}>
          <h2> Employee Listing </h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to={"/employee/create"} className="btn btn-success">
              {" "}
              Add new (+)
            </Link>
          </div>

          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>About</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Joining Details</td>
                <td>Gender</td>
                <td>Language</td>
                <td>Skills</td>
                <td>Hobby</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody>
              {/* fetch data from API and bind dynamically */}

              {empdata &&
                empdata.map((item) => {
                  //console.log("item", item);
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td >
                        {item.date} ({item.time})
                      </td>
                      <td>{item.gender}</td>
                      <td>{item.language}</td>
                      <td>
                        {" "}
                        {item?.skill?.map((element) => {
                          return (
                            element.value
                            )
                        })}
                      </td>
                      <td>
                        {item.hobby[0]} {""} {item.hobby[1]} {""}
                        {item.hobby[2]}{" "}
                      </td>
                      <td>
                        <a
                          onClick={() => {
                            EditDetails(item.id);
                          }}
                          className="btn btn-success"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            RemoveDetails(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </a>
                        <a
                          onClick={() => {
                            LoadDetails(item.id);
                          }}
                          className="btn btn-primary"
                        >
                          Details
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;

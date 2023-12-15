import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employerTotal, setemployerTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();

  const [listAdmin, setListAdmin] = useState();

  useEffect(() => {
    coudAdmins();
    listOfAdmin();
    countEmployers();
    countSalary();
  }, []);

  const coudAdmins = async () => {
    await axios.get("http://localhost:8080/admin").then((result) => {
      console.log(result.data);
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const listOfAdmin = async () => {
    await axios.get("http://localhost:8080/listadmin")
      .then((result) => {
        if (result.data.Status) {
          setListAdmin(result.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

  const countEmployers = async () => {
    await axios.get('http://localhost:8080/countemployer')
      .then(result => {
        setemployerTotal(result.data[0].employer)
      })
  }

  const countSalary = async () => {
    await axios.get("http://localhost:8080/salarytotal")
      .then(result => {
        setSalaryTotal(result.data.Data[0].salarytest)
      }).catch(err => console.log(err))
  }

  return (
    <div className="container_home">
      <section className="card">
        <div className="title-card">
          <h4>Admin</h4>
          <hr />
          <div className="total">
            <h5>total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className="title-card">
          <h4>Employers</h4>
          <hr />
          <div className="total">
            <h5>total:</h5>
            <h5>{employerTotal}</h5>
          </div>
        </div>

        <div className="title-card">
          <h4>Salary</h4>
          <hr />
          <div className="total">
            <h5>total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </section>

      <section className="listofadmin">
        <h1>List Of Admin</h1>
        <div className="info_admin">
          <div className="title_admin">
            <h5>Email</h5>
            <h5>Action</h5>
          </div>
          <hr />
          {listAdmin && listAdmin.map((item) => {
            return (
              <div key={item.id}>
              <div className="info" >
                <h6>{item.email}</h6>
                <div className="btnn">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
              <hr />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

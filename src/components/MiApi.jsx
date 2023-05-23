import { useState } from "react";
import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const MiApi = () => {
  const [api, setApi] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const today = new Date();
    setTime(today.toLocaleString().slice(11));
    setDate(Date().trim().slice(4, 15));
  }, []);

  const getData = async () => {
    const response = await fetch("https://api.libreapi.cl/weather/stations");
    const data = await response.json();
    setApi(data.data);
  };

  const arrayFiltrada = api
    .filter((item) => {
      return item.operational === true;
    })
    .filter((item) => {
      return item.temperature != null;
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  const handleSort = (e) => {
    if (e.target.value === "1") {
      setApi([...arrayFiltrada.sort(surAnorte)]);
      return;
    } else if (e.target.value === "2") {
      setApi([...arrayFiltrada.sort(norteAsur)]);
      return;
    } else if (e.target.value === "3") {
      return setApi([...arrayFiltrada.sort(tMayor)]);
    } else if (e.target.value === "4") {
      setApi([...arrayFiltrada.sort(tMenor)]);
      return;
    }
  };

  const surAnorte = (a, b) => {
    if (b.code < a.code) {
      return -1;
    } else if (b.code > a.code) {
      return 1;
    } else {
      return 0;
    }
  };
  const norteAsur = (a, b) => {
    if (b.code > a.code) {
      return -1;
    } else if (b.code < a.code) {
      return 1;
    } else {
      return 0;
    }
  };
  const tMayor = (a, b) => {
    if (a.temperature < b.temperature) {
      return 1;
    } else if (a.temperature > b.temperature) {
      return -1;
    } else {
      return 0;
    }
  };
  const tMenor = (a, b) => {
    if (a.temperature < b.temperature) {
      return -1;
    } else if (a.temperature > b.temperature) {
      return 1;
    } else {
      return 0;
    }
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      getData();
      return;
    }
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid">
      <Header handleSearch={handleSearch} handleSort={handleSort} />
      <article className="grid-gallery">
        {arrayFiltrada.map((item) => {
          return (
            <div key={item.code} className="card bg-sur text-dark m-1">
              <div className="card-header d-flex  justify-content-between">
                <span>{date}</span>
                <span>{time}</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <span className="text-end display-3">
                  {item.temperature}
                  °C
                </span>
                <div className="card-text text-center d-flex justify-content-end">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa-solid fa-mountain"></i>
                        </td>
                        <td>
                          <span>Presión Atmosférica:</span>
                        </td>
                        <td>
                          <strong>{item.pressure_hpa}Hpa</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fa-solid fa-droplet"></i>
                        </td>
                        <td>
                          <span>Humedad Relativa:</span>
                        </td>
                        <td>
                          <strong>{item.humidity * 100}%</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <div className="table table-secondary text-center w-100 d-flex justify-content-between">
                  <table className="w-100 ">
                    <thead>
                      <tr>
                        <th className="bg-secondary" colSpan={3}>
                          Datos Ayer:
                        </th>
                      </tr>
                    </thead>
                    <tbody className="h-100">
                      <tr>
                        <th>Datos</th>
                        <th>Mín</th>
                        <th>Max</th>
                      </tr>
                      <tr>
                        <th>
                          Temperatura <br />
                          <i className="fa-solid fa-temperature-low"></i>
                        </th>
                        <td>{item.yesterday.minimum.temperature} °C</td>
                        <td>{item.yesterday.maximum.temperature} °C</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="w-100 h-100 container-fluid">
                    <thead>
                      <tr>
                        <th className="bg-dark text-light " colSpan={3}>
                          Datos Hoy:
                        </th>
                      </tr>
                    </thead>
                    <tbody className="h-100">
                      <tr>
                        <th>Datos</th>
                        <th>Mín</th>
                        <th>Max</th>
                      </tr>
                      <tr>
                        <th>
                          Temperatura <br />
                          <i className="fa-solid fa-temperature-low"></i>
                        </th>
                        <td>{item.today.minimum.temperature} °C</td>
                        <td>Aún sin registro</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </article>

      <Footer />
    </div>
  );
};

export default MiApi;
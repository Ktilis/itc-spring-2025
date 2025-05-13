import { useEffect, useState, useRef } from "react";
import { Graph } from "./Graph"
import classes from './Population.module.css'

const populationUrl = "https://countriesnow.space/api/v0.1/countries/population";

export const Population = () => {
  const [data, setData] = useState([]);
  const [population, setPopulation] = useState(null);
  const ref = useRef();

  useEffect(() => {
    fetch(populationUrl)
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  const handleChangeCountry = () => {
    const value = ref.current.value;
    const populationnnn = data.find((el) => el.code === value);

    setPopulation(populationnnn.populationCounts);
  }

  return (
    <div>
      <select ref={ref} className={classes.select} onChange={handleChangeCountry} defaultValue="">
      { data.map((d, index) => {
        return <option value={ d.code } key={index}>{ d.country }</option>
      }) }
      </select>
      <Graph population={ population } />
    </div>
  );
}

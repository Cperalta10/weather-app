import React from "react";
import { useNavigate } from "react-router-dom";
import locationImg from "../assets/location.jpg";

import { RiMoonClearLine } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md";
import {
  BsFillCloudSunFill,
  BsFillCloudMoonFill,
  BsFillCloudyFill,
} from "react-icons/bs";

const Location = ({
  weather,
  location,
  setLocation,
  setWeather,
  setZipcode,
}) => {
  const navigate = useNavigate();

  const homeBtnClick = () => {
    setLocation(null);
    setWeather([]);
    setZipcode("");
    navigate("/");
  };

  let unix_timestamp = weather[0].time;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ":" + minutes.substr(-2);
  var formattedTimeTwo = hours + 1 + ":" + minutes.substr(-2);

  const icon = (iconType) => {
    switch (iconType) {
      case "clear-night":
        return <RiMoonClearLine size={90} />;
      case "clear-day":
        return <MdOutlineWbSunny size={90} />;
      case "partly-cloudy-day":
        return <BsFillCloudSunFill size={90} />;
      case "partly-cloudy-night":
        return <BsFillCloudMoonFill size={90} />;
      case "cloudy":
        return <BsFillCloudyFill size={90} />;
      default:
        return <p>something went wrong...</p>;
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img
          src={locationImg}
          alt="nature"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <button
          onClick={homeBtnClick}
          className="absolute text-white rounded-lg top-0 right-0 m-10 py-2 px-8 bg-[#ffffff33]"
        >
          Home
        </button>
        <div className="flex flex-col justify-center items-center text-center text-white w-full h-full">
          <div className="flex flex-row text-[60px]">
            <h2 className="m-3">{location[0] + ", " + location[1]}</h2>
          </div>
          <div className="w-1/3 rounded-sixty bg-[#ffffff33]">
            <h2 className="m-3">{formattedTime + " - " + formattedTimeTwo}</h2>
            <p className="m-4 text-[40px]">
              {Math.floor(weather[0].temperature) + "°"}
            </p>
            <p className="m-4 flex justify-center">{icon(weather[0].icon)}</p>
            <p className="m-4">{weather[0].summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

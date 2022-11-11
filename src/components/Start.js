import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import searchImg from "../assets/search.png";
import startImg from "../assets/start.jpg";

const Start = ({
  zipcode,
  setZipcode,
  weather,
  setWeather,
  location,
  setLocation,
  error,
  setError,
}) => {
  const navigate = useNavigate();

  const zip = {
    method: "GET",
    url: "http://api.geonames.org/postalCodeSearchJSON?",
    params: {
      countryCode: "US",
      postalcode: zipcode,
      username: "maclo",
    },
  };
  const blockInvalidChar = (e) =>
    ["e", ".", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const onChangeZipcode = (event) => {
    setError("");
    setZipcode(event.target.value);
  };

  const errorMessage = () => {
    if (error.length === 0) {
      return "";
    } else {
      return error;
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .request(zip)
      .then(function (response) {
        if (response.data.postalCodes.length === 0) {
          setError(`City isn't in our data or isn't in the US.`);
        } else {
          setLocation([
            response.data.postalCodes[0].placeName,
            response.data.postalCodes[0].adminName1,
          ]);
          const options = {
            method: "GET",
            url: "https://api.ambeedata.com/weather/forecast/by-lat-lng",
            params: {
              lat: response.data.postalCodes[0].lat,
              lng: response.data.postalCodes[0].lng,
            },
            headers: {
              "x-api-key":
                "84f61fe334f88d8d7309b1e2f95b658e298b082cb8a5022096786948612fad30",
              "Content-type": "application/json",
            },
          };

          axios
            .request(options)
            .then(function (res) {
              setWeather(res.data.data.forecast);

              navigate(`/location/${zipcode}`);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img
          src={startImg}
          alt="natureimage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <p className="text-red-400">{errorMessage()}</p>
        <form
          onSubmit={onSubmitForm}
          className="w-full max-w-3xl rounded-sixty flex items-center px-5 bg-[#ffffff33]"
        >
          <input
            type="number"
            name="zipcode"
            id="zipcode"
            placeholder="Enter Postal Code"
            value={zipcode}
            onChange={onChangeZipcode}
            onKeyDown={blockInvalidChar}
            className="bg-transparent flex-[1] border-0 outline-none py-6 px-5 text-[20px] text-[#cac7ff]"
          ></input>
          <button
            disabled={zipcode.length < 1}
            className="border-0 rounded-[50%] w-10 h-10 cursor-pointer"
          >
            <img src={searchImg} alt="natureimage" className="w-full" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Start;

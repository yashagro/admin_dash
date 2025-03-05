import { useState } from "react";

const Schedule = () => {
  const [crops] = useState(["Grapes", "Apple", "Pomegranate"]);
  const [varieties] = useState({
    Grapes: ["Ganesh", "Shedya", "Maha"],
    Apple: ["Kashmiri", "Golden"],
    Pomegranate: ["Bhagwa", "Arakta"],
  });
  const [selectedCrop, setSelectedCrop] = useState("Grapes");
  const [selectedVariety, setSelectedVariety] = useState(varieties["Grapes"][0]);
  const [activities, setActivities] = useState([{ day: "Day 1",  }]);

  const addActivity = () => {
    setActivities([...activities, { day: `Day ${activities.length + 1}`,  }]);
  };

  return (
    <div className="flex flex-col min-h-screen p-5">
      <div className="w-full bg-green-100 text-black p-4 rounded-lg flex gap-4 items-center shadow-lg">
        <h2 className="text-lg font-bold">Crop & Variety Selection</h2>
        <div className="flex flex-1 gap-4 bg-green-100 p-2 rounded-lg">
          <select
            className="block p-2 bg-green-200 text-black rounded flex-1 shadow-md  border-none"
            value={selectedCrop}
            onChange={(e) => {
              setSelectedCrop(e.target.value);
              setSelectedVariety(varieties[e.target.value][0]);
            }}
          >
            {crops.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          <select
            className="block p-2 bg-green-200 text-black rounded flex-1 shadow-md "
            value={selectedVariety}
            onChange={(e) => setSelectedVariety(e.target.value)}
          >
            {varieties[selectedCrop].map((variety) => (
              <option key={variety} value={variety}>{variety}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 p-4 mt-4">
        <h2 className="text-lg font-bold mb-4">Schedule Activities for {selectedVariety}</h2>
        <div className="mt-6 p-4 bg-grey shadow-lg rounded-lg">
          <h3 className="text-md font-semibold">Schedule Activities</h3>
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <span className="p-2 bg-green-200 rounded">{activity.day}</span>
              <input
                type="text"
                className="border p-2 flex-1"
                defaultValue={activity.task}
              />
            </div>
          ))}
           <div className="flex justify-center mt-4">
            <button onClick={addActivity} className="bg-green-500 p-2 text-white w-2xl rounded-2xl text-2xl font-bold">+</button>
          </div>
          {/* <button onClick={addActivity} className="mt-4 bg-green-500 p-2 rounded text-white m-">+</button> */}
          <div className="flex justify-between mt-4">
            <button className="bg-gray-500 text-white p-2 rounded w-[134px] font-bold">Cancel</button>
            <button className="bg-green-500 text-white p-2 rounded w-[134px] font-bold">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
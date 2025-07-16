import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button";
import ProfileWrapper from "@/components/profile-wrapper";
import Workout from "../../assets/images/workout.svg";
import {
  getClientWorkout,
  updateWorkout,
} from "@/features/workout/workout-api";
import { showToast } from "@/components/toast";

const sampleExercises = [
  { id: 1, name: "Push Ups", sets: 3, reps: 12 },
  { id: 2, name: "Squats", sets: 3, reps: 15 },
  { id: 3, name: "Lunges", sets: 3, reps: 10 },
  { id: 4, name: "Burpees", sets: 3, reps: 12 },
  { id: 5, name: "Mountain Climbers", sets: 4, reps: 20 },
  { id: 6, name: "Plank", sets: 2, reps: 60 },
];

const ClientWorkoutNotes = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);
  const [workoutData, setWorkoutData] = useState(null);

  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  const toggleComplete = async (id) => {
    const targetExercise = workoutData?.workoutVariation?.find(
      (x) => x._id === id
    );
    if (targetExercise?.isCompleted) return; 

    const updatedVariations = workoutData?.workoutVariation?.map((x) => ({
      ...x,
      isCompleted: x._id === id ? true : x.isCompleted,
    }));

    const updatedWorkout = {
      ...workoutData,
      workoutVariation: updatedVariations,
    };

    setWorkoutData(updatedWorkout);

    try {
      const response = await updateWorkout(workoutData?._id, {
        workoutVariation: updatedVariations,
      });

      if (response?.success !== 201) {
        setWorkoutData(workoutData); 
      }
    } catch (e) {
      console.error("Update failed", e);
      setWorkoutData(workoutData);
    }
  };

  const fetchClientWorkout = async () => {
    try {
      const response = await getClientWorkout();
      if (response?.status === 200) {
        setWorkoutData(response?.notes[0]);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  useEffect(() => {
    fetchClientWorkout();
  }, []);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);
  

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleStart = async () => {
    setStarted(true);
    try {
      const response = await updateWorkout(workoutData?._id, { isStart: true });
      if (response?.status === 200) {
        showToast("success", "Workout Started!");
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleComplete = () => {
    setCompleted(sampleExercises.map((e) => e.id));
    navigate("/profile/workout-done");
  };

  return (
    <ProfileWrapper title="" image={Workout}>
      <div className="w-screen px-5 py-4">
        <p className="font-bold text-font_primary mb-2">
          {workoutData?.workoutName}
        </p>
        <p className="text-base text-font_primary">
          {workoutData?.workoutVariation?.length}{" "}
          {workoutData?.workoutVariation?.length > 1 ? "Exercises" : "Exercise"}
        </p>

        <div className="bg-primary-gradient my-5 py-4 px-6 rounded-2xl text-white flex flex-row items-center justify-between">
          <p className="text-base">Pending Exercises</p>
          <p>
            <span className="text-2xl">
              {sampleExercises.length - completed.length}
            </span>
            /
            <span className="text-base">
              {workoutData?.workoutVariation?.length}
            </span>
          </p>
        </div>

        {started && (
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-font_primary">
              Time Remaining
            </p>
            <p className="text-2xl font-mono text-red-500">
              {formatTime(timer)}
            </p>
          </div>
        )}

        <p className="font-bold text-font_primary mb-2">Exercises</p>
        <div className="space-y-4">
          {workoutData?.workoutVariation?.map((exercise) => (
            <div
              key={exercise._id}
              className="py-3 px-4 rounded-2xl border border-gray-200 flex flex-row items-center justify-between"
            >
              <div className="flex flex-col">
                <p className="text-base font-medium text-font_primary">
                  {exercise.variationName}
                </p>
                <p className="text-sm text-icon">
                  {exercise.sets} sets | {exercise.reps} reps
                </p>
              </div>
              <button
                onClick={() => toggleComplete(exercise._id)}
                disabled={!started}
                className="mt-8"
              >
                {exercise.isCompleted ? (
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <FaRegCircle className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="my-3">
          {!started ? (
            <Button label="Start Workout" onClick={handleStart} />
          ) : (
            <Button label="Complete Workout" onClick={handleComplete} />
          )}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default ClientWorkoutNotes;

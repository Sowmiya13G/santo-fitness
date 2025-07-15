import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/Button";
import ProfileWrapper from "@/components/profile-wrapper";
import Workout from "../../assets/images/workout.svg";

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
  const INITIAL_TIMER = 10 * 60;

  const [completed, setCompleted] = useState([]);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(INITIAL_TIMER);

  const toggleComplete = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    let interval;
    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (started && timer === 0) {
      setCompleted(sampleExercises.map((e) => e.id));
    }
    return () => clearInterval(interval);
  }, [started, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleComplete = () => {
    setCompleted(sampleExercises.map((e) => e.id));
    navigate("/profile/workout-done");
  };

  return (
    <ProfileWrapper title="" image={Workout}>
      <div className="w-screen px-5 py-4">
        <p className="font-bold text-font_primary mb-2">Fullbody Workout</p>
        <p className="text-base text-font_primary">
          {sampleExercises.length} Exercises
        </p>

        <div className="bg-primary-gradient my-5 py-4 px-6 rounded-2xl text-white flex flex-row items-center justify-between">
          <p className="text-base">Pending Exercises</p>
          <p>
            <span className="text-2xl">
              {sampleExercises.length - completed.length}
            </span>
            /<span className="text-base">{sampleExercises.length}</span>
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
          {sampleExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="py-3 px-4 rounded-2xl border border-gray-200 flex flex-row items-center justify-between"
            >
              <div className="flex flex-col">
                <p className="text-base font-medium text-font_primary">
                  {exercise.name}
                </p>
                <p className="text-sm text-icon">
                  {exercise.sets} sets | {exercise.reps} reps
                </p>
              </div>
              <button
                onClick={() => toggleComplete(exercise.id)}
                disabled={!started}
              >
                {completed.includes(exercise.id) ? (
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

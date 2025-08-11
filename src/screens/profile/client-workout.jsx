import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button";
import ProfileWrapper from "@/components/profile-wrapper";
import Workout from "../../assets/images/workout.svg";
import {
  deleteWorkout,
  getClientWorkout,
  updateWorkout,
} from "@/features/workout/workout-api";
import { showToast } from "@/components/toast";

const ClientWorkoutNotes = () => {
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const exercises = workoutData?.workoutVariation || [];
  const startedAt = workoutData?.started_at;
  const started = Boolean(startedAt);

  const pendingCount = useMemo(
    () => exercises.filter((ex) => !ex.isCompleted).length,
    [exercises]
  );

  // Fetch workout
  useEffect(() => {
    const fetchClientWorkout = async () => {
      setLoading(true);
      try {
        const response = await getClientWorkout();
        if (response?.status === 200 && response?.notes?.length > 0) {
          setWorkoutData(response.notes[0]);
        }
      } catch (err) {
        console.error("Failed to fetch workout:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientWorkout();
  }, []);

  // Timer (based on started_at from backend)
  useEffect(() => {
    let interval;

    if (startedAt) {
      const getElapsedSeconds = () =>
        Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);

      setTimer(getElapsedSeconds());

      interval = setInterval(() => {
        setTimer(getElapsedSeconds());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startedAt]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleStart = async () => {
    setUpdating(true);
    try {
      const now = new Date().toISOString();
      const response = await updateWorkout(workoutData._id, {
        isStart: true,
        started_at: now,
      });

      if (response?.status === 200) {
        showToast("success", "Workout Started!");
        setWorkoutData((prev) => ({
          ...prev,
          isStart: true,
          started_at: now,
        }));
      }
    } catch (err) {
      console.error("Failed to start workout:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleComplete = async () => {
    setUpdating(true);
    try {
      await deleteWorkout(workoutData._id); // Can extend with "isCompleted" or "ended_at"
      showToast("success", "Workout Completed!");
      setTimeout(() => {
        navigate("/profile/workout-done");
      }, 100);
    } catch (err) {
      console.error("Failed to complete workout:", err);
    } finally {
      setUpdating(false);
    }
  };

  const toggleComplete = async (id) => {
    const updatedVariations = exercises.map((ex) =>
      ex._id === id ? { ...ex, isCompleted: true } : ex
    );

    const previousState = workoutData;

    setWorkoutData((prev) => ({
      ...prev,
      workoutVariation: updatedVariations,
    }));

    try {
      const response = await updateWorkout(workoutData._id, {
        workoutVariation: updatedVariations,
      });

      if (response?.success !== 201 && response?.status !== 200) {
        setWorkoutData(previousState); // rollback
      }
    } catch (e) {
      console.error("Update failed", e);
      setWorkoutData(previousState);
    }
  };

  return (
    <ProfileWrapper
      title=""
      image={Workout}
      imgClass={"!scale-175 rounded-none object-contain top-[25px] absolute"}
    >
      <div className="w-screen h-full px-2 py-4">
        {loading ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            Loading workout...
          </p>
        ) : !workoutData ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            No workout assigned today 💪
          </p>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="flex-col">
                <p className="font-bold text-lg text-font_primary mb-2">
                  {workoutData?.workoutName}
                </p>
                <p className="text-base text-font_primary">
                  {exercises.length}{" "}
                  {exercises.length > 1 ? "Exercises" : "Exercise"}
                </p>
              </div>

              {started && (
                <div className="text-center mb-4">
                  <p className=" font-bold text-font_primary">Time Elapsed</p>
                  <p className="text-2xl font-mono text-red-500">
                    {formatTime(timer)}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-primary-gradient my-5 py-4 px-6 rounded-2xl text-white flex flex-row items-center justify-between">
              <p className="text-base">Pending Exercises</p>
              <p>
                <span className="text-2xl">{pendingCount}</span>/
                <span className="text-base">{exercises.length}</span>
              </p>
            </div>

            <p className="font-bold text-font_primary mb-2">Exercises</p>
            <div className="space-y-4 mb-10">
              {exercises.map((exercise) => (
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
                    disabled={!started || exercise.isCompleted || updating}
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

            <div className="mb-3 absolute bottom-3 w-80 left-1/2 -translate-x-1/2">
              {!started ? (
                <Button
                  label="Start Workout"
                  onClick={handleStart}
                  disabled={updating}
                />
              ) : (
                <Button
                  label="Complete Workout"
                  onClick={handleComplete}
                  disabled={updating || pendingCount !== 0}
                />
              )}
            </div>
          </>
        )}
      </div>
    </ProfileWrapper>
  );
};

export default ClientWorkoutNotes;

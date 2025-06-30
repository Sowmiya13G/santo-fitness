
export default function Onboarding({ onComplete }) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Santo Fitness!</h2>
        <p className="mb-4">Let’s get started with a quick tour.</p>
        <button
          onClick={onComplete}
          className="bg-red text-white px-6 py-2 rounded"
        >
          Finish Onboarding
        </button>
      </div>
    );
  }
  
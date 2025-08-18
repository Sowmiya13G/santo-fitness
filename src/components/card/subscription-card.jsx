import { Card } from "@/components/card/card";

const SubscriptionCard = ({ subscriptionPlan, totalDaysCompleted = [] }) => {
  const completed = totalDaysCompleted.length;
  const remaining = Math.max(subscriptionPlan - completed, 0);
  const percent = subscriptionPlan > 0 ? (completed / subscriptionPlan) * 100 : 0;
  const isExpired = completed >= subscriptionPlan;

  return (
    <Card className="bg-primary-gradient text-white rounded-2xl p-4 shadow-lg w-full h-32">
      <div className="flex flex-col justify-between h-full relative">
        {/* Decorative Background Circles */}
        <div className="absolute w-16 h-16 bg-gray-200 opacity-20 rounded-full bottom-[-20px] left-[-20px]" />
        <div className="absolute w-10 h-10 bg-gray-200 opacity-20 rounded-full bottom-[10px] right-[-10px]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full bottom-[10px] left-[30%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full top-[10px] right-[40%]" />

        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold leading-tight">
            Subscription Plan
          </h2>
          <span
            className={`text-xs px-2 py-1 rounded-lg ${
              isExpired ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isExpired ? "Expired" : "Active"}
          </span>
        </div>

        {/* Progress Info */}
        <div className="flex justify-between text-xs mt-2">
          <p>
            Completed: <span className="font-semibold">{completed}</span>
          </p>
          <p>
            Total: <span className="font-semibold">{subscriptionPlan} Days</span>
          </p>
          <p>
            Remaining: <span className="font-semibold">{remaining}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Bottom */}
        <div className="text-center mt-2">
          {isExpired ? (
            <p className="text-sm font-medium text-red-100">
              Subscription Completed
            </p>
          ) : (
            <p className="text-sm font-medium">
              {remaining} sessions left
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard;

import React from "react";
import { Card } from "../../../shared/components/ui/card";

interface Activity {
  id: string;
  type: "outlet" | "user" | "device" | "billing" | "catalog";
  title: string;
  description: string;
  time: string;
  color: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <Card className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1 border-none">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
      <div className="relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="relative flex gap-4 items-start">
              <div
                className={`z-10 w-5 h-5 rounded-full border-4 border-white shadow-sm mt-1`}
                style={{ backgroundColor: activity.color }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {activity.description}
                </p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ActivityTimeline;

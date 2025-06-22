import { useQuery } from "@tanstack/react-query";

const StatsSection = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="h-12 w-24 bg-white/20 rounded animate-pulse mx-auto mb-2" />
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-hope-orange">
          {stats?.childrenHelped?.toLocaleString() || "5,200+"}
        </div>
        <div className="text-lg">Children Helped</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-hope-orange">{stats?.citiesCovered || "12"}</div>
        <div className="text-lg">Cities Covered</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-hope-orange">{stats?.yearsOperation || "8"}</div>
        <div className="text-lg">Years of Operation</div>
      </div>
    </div>
  );
};

export default StatsSection;

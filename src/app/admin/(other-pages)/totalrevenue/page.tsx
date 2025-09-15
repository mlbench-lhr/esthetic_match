import Text from "@/components/ui/TextUser";
import RevenueKpis from "@/components/admin/Revenue/RevenueKpis";
import RevenueBar from "@/components/admin/Revenue/RevenueBar";
import CommissionDonut from "@/components/admin/Revenue/CommissionDonut";
import RevenueRecords from "@/components/admin/Revenue/RevenueRecords";

export default function RevenuePage() {
  const year = 2025; // or derive from query/searchParams
  return (
    <div className="gap-4 md:gap-6 grid grid-cols-1 xl:grid-cols-12">
      <Text as="h1" className="xl:col-span-12 text-primary_black">
        Total Revenue
      </Text>

      <div className="xl:col-span-12">
        <RevenueKpis year={year} />
      </div>

      {/* 👉 nest a grid for the 7/5 row */}
      <div className="items-stretch gap-4 md:gap-6 grid grid-cols-1 xl:grid-cols-12 xl:col-span-12">
        <div className="xl:col-span-7 min-w-0">
          <RevenueBar year={year} />
        </div>
        <div className="xl:col-span-5 min-w-0">
          <CommissionDonut year={year} />
        </div>
      </div>
      <div className="lg:col-span-12">
        <RevenueRecords />
      </div>
    </div>
  );
}

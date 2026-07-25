import { Suspense } from "react";
import { NewsSkeleton } from "../_components/news/newsSkeleton";
import { PremiumNewsList } from "../_components/news/premiumNewsList";

const PremiumPage = async ({}) => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Premium News</h1>
        </div>
      </div>

      <Suspense fallback={<NewsSkeleton />}>
        {" "}
        <PremiumNewsList></PremiumNewsList>
      </Suspense>
    </div>
  );
};

export default PremiumPage;

const LeadNewsSkeleton = () => {
  return (
    <div className="hero-card overflow-hidden">
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        {/* Image Skeleton */}
        <div className="skeleton absolute inset-0" />
        
        {/* Content Skeleton */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 bg-gradient-to-t from-primary/80 to-transparent">
          {/* Badge */}
          <div className="skeleton h-7 w-24 rounded-full mb-4" />
          
          {/* Title */}
          <div className="space-y-3 mb-4">
            <div className="skeleton h-8 md:h-12 w-full rounded" />
            <div className="skeleton h-8 md:h-12 w-4/5 rounded" />
          </div>
          
          {/* Excerpt */}
          <div className="hidden md:block space-y-2 mb-6">
            <div className="skeleton h-5 w-full max-w-3xl rounded" />
            <div className="skeleton h-5 w-2/3 max-w-2xl rounded" />
          </div>
          
          {/* Meta */}
          <div className="flex items-center gap-4">
            <div className="skeleton w-8 h-8 rounded-full" />
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-4 w-32 rounded" />
            <div className="skeleton h-4 w-28 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadNewsSkeleton;

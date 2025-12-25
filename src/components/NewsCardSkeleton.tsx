const NewsCardSkeleton = () => {
  return (
    <div className="news-card overflow-hidden">
      {/* Image Skeleton */}
      <div className="skeleton aspect-[16/10]" />
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="skeleton h-5 w-full rounded" />
          <div className="skeleton h-5 w-3/4 rounded" />
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="skeleton w-8 h-8 rounded-full" />
            <div className="space-y-1">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-2 w-16 rounded" />
            </div>
          </div>
          <div className="skeleton h-3 w-12 rounded" />
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;

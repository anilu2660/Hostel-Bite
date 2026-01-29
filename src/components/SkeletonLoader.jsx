const SkeletonLoader = ({ count = 1, type = 'card' }) => {
    if (type === 'card') {
        return (
            <>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="card-glass overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-300 dark:bg-dark-700"></div>
                        <div className="p-5 space-y-3">
                            <div className="h-6 bg-gray-300 dark:bg-dark-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-5/6"></div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-20"></div>
                                <div className="h-8 bg-gray-300 dark:bg-dark-700 rounded w-24"></div>
                            </div>
                            <div className="h-12 bg-gray-300 dark:bg-dark-700 rounded w-full mt-4"></div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return null;
};

export default SkeletonLoader;

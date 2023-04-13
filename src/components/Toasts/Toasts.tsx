import toast from "react-hot-toast";

export const ToastSuccess = (message: string) =>
  toast.custom((t) => {
    return (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white  dark:bg-background shadow-lg pointer-events-auto flex rounded-lg `}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-green-600">Success</p>
              <p className="mt-1 text-sm dark:text-zinc-300 text-zinc-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-zinc-200 dark:border-zinc-700 rounded-r-lg">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-none p-4 flex items-center justify-center text-sm font-medium text-red-400 outline-none "
          >
            Close
          </button>
        </div>
      </div>
    );
  });
export const ToastError = (message: string) =>
  toast.custom((t) => {
    return (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white dark:bg-background s shadow-lg pointer-events-auto flex rounded-l-lg`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-red-600">Error</p>
              <p className="mt-1 text-sm dark:text-zinc-300 text-zinc-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-zinc-200 dark:border-zinc-700 rounded-r-lg">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-none p-4 flex items-center justify-center text-sm font-medium text-red-400 outline-none"
          >
            Close
          </button>
        </div>
      </div>
    );
  });

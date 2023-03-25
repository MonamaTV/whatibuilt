const Profile = () => {
  return (
    <div className="w-[60%] space-y-3">
      <h3 className="text-2xl text-gray-500 dark:text-rose-100 font-serif my-2">
        Details
      </h3>
      <p className="text-gray-100 text-sm">
        Please provide your details that will be shown to people who visits your
        page
      </p>
      <input
        type={"text"}
        className="w-full  px-3 py-2 bg-rose-50/10 outline-none border-none text-gray-100"
        placeholder="Your username"
      />
      <input
        type={"text"}
        className="w-full  px-3 py-2 bg-rose-50/10 outline-none border-none text-gray-100"
        placeholder="Your name"
      />
      <input
        type={"text"}
        className="w-full  px-3 py-2 bg-rose-50/10 outline-none border-none text-gray-100"
        placeholder="Your role, e.g Software Engineer"
      />
      <textarea
        className="w-full  px-3 py-3 bg-rose-50/10 resize-none outline-none border-none text-gray-100"
        placeholder="Bio"
        rows={10}
      ></textarea>
      <button className="px-3 py-2 capitalize text-sm text-gray-100 bg-rose-900  w-44 ">
        Save
      </button>
    </div>
  );
};

export default Profile;

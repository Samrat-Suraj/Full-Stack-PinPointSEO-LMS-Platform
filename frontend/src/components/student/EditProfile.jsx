import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Pen } from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/authApi";
import { toast } from "sonner";

const EditProfile = () => {
  const [image, setImage] = useState("");
  const { data: userData, isLoading: userLoading, refetch } = useLoadUserQuery();
  const [UpdateUser, { data: updateData, isLoading: UploadeisLoading, isSuccess: UpdateIsSuccess, error: UpdateError }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    contactNumber: "",
    city: "",
    state: "",
    // password: "",
  });

  useEffect(() => {
    setFormData({
      firstName: userData?.user?.firstName,
      lastName: userData?.user?.lastName,
      // email: userData?.user?.email,
      contactNumber: userData?.user?.contactNumber,
      city: userData?.user?.city,
      state: userData?.user?.state,
    });
  }, [userData]);

  const states = [
    { value: "DL", label: "Delhi" },
    { value: "MH", label: "Maharashtra" },
    { value: "KA", label: "Karnataka" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "WB", label: "West Bengal" },
  ];

  const cities = {
    DL: ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"],
    MH: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    KA: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi"],
    TN: ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
    UP: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
    WB: ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeImageHander = (e) => {
    setImage(e.target.files[0]);
  };

  const OnClickHander = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    // form.append("email", formData.email);
    // form.append("password", formData.password);
    form.append("contactNumber", formData.contactNumber);
    form.append("state", formData.state);
    form.append("city", formData.city);
    if (image) {
      form.append("profilePic", image);
    }
    await UpdateUser(form);
  };

  useEffect(() => {
    if (UpdateIsSuccess && updateData) {
      refetch();
      toast.success(updateData?.message);
    }
    if (UpdateError) {
      toast.error(UpdateError?.data?.message);
    }
  }, [updateData, UploadeisLoading, UpdateIsSuccess, UpdateUser, UpdateError]);

  return (
    <div className="pl-6 space-y-4 m-auto dark:bg-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Edit Profile</h1>
        </div>
        <div className="relative p-1 border-2 border-green-500 rounded-full">
          <Avatar className="lg:h-[100px] lg:w-[100px] md:h-[100px] md:w-[100px] h-[50px] w-[50px]">
            <AvatarImage className="object-cover" src={image ? URL.createObjectURL(image) : userData?.user?.profilePic} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <label htmlFor="upload">
            <Pen size={34} className="absolute top-1 cursor-pointer right-0 p-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </label>
          <input onChange={onChangeImageHander} type="file" id="upload" hidden />
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
            />
          </div>
        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
          />
        </div> */}

        <div className="flex flex-col">
          <label htmlFor="contactNumber" className="text-gray-700 dark:text-gray-300">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
            className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-700 dark:text-gray-300">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
            >
              <option value="">Select a City</option>
              {formData.state &&
                cities[formData.state]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-gray-700 dark:text-gray-300">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
            >
              <option value="">Select a State</option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="border-2 text-black border-green-400 dark:border-green-600 p-1 rounded-md outline-none focus:border-green-600"
          />
        </div> */}

        <button
          type="submit"
          onClick={OnClickHander}
          className="w-full py-2 mt-4 bg-green-500 dark:bg-green-600 flex items-center justify-center gap-2 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {UploadeisLoading ? <Loader2 className="h-5 animate-spin w-5" /> : null}
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

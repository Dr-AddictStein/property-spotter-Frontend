import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;

    try {
      const response = await axios.post(
        `http://localhost:5000/forgot-password/${email}`
      );
      if (response.data.Status === "Success") {
        toast.success("Password reset link sent successfully.");
      } else {
        toast.error("User does not exist.");
      }
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
    <Helmet>
    <title>Forgot Password</title>
  </Helmet>
    <div className="lg:w-full w-11/12  lg:my-28 my-12">
      <div className="flex justify-center">
        <div className="w-[600px] bg-[#edf7f4] custom-shadow rounded-lg p-8 mb-4">
          <h2 className="text-2xl text-center font-semibold mb-3 uppercase">
            Forgot Password
          </h2>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-5">
              <div className="pb-2">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                  type="email"
                  name="email"
                  id=""
                  required
                />
              </div>
              <div className="flex gap-2 mb-3">
                <button className="w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;

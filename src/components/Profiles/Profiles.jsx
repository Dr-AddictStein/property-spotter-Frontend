import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever, MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
const Profiles = () => {
  const { user, setUser, logOut } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState();

  const onFinish = async (values) => {

    try {
      const { name, location, about, newPassword } = values || {};

      const data = new FormData();
      data.append("name", name || user?.name);
      data.append("password", newPassword);
      data.append("location", location || user?.location);
      data.append("about",  about || user?.about);
      data.append("role", user?.role);
      data.append("oldPass", user?.password);
      data.append("isUpdate", newPassword ? "False" : "True");
      data.append("images", fileList[0]?.originFileObj || "");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `http://localhost:5000/update/${user?.email}`;
      try {
        const response = await axios.put(url, data, config);

        if (response.data.user) {
          toast.success("Profile Updated!");
          setUser(response.data.user);
          localStorage.setItem("access-token", response.data.token);
            form.resetFields();
        } else {
          toast.error(response.data.toast || "Failed to update profile");
        }
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update. Please try again later.");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteAccount = () => {
    axios
      .delete(`http://localhost:5000/user/delete/${user?.email}`)
      .then((response) => {
        const { data } = response;
        if (data.message) {
          toast.success("Profile deleted successfully");
          logOut();
        } else {
          toast.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("An error occurred while deleting user");
      });
  };

  const normFile = (e) => {
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => {
      return false;
    },
    fileList,
  };
  return (
  <>
  <Helmet>
    <title>Profile</title>
  </Helmet>
    <div className="lg:w-3/4 w-11/12 mx-auto my-12">
      <div className="card card-side bg-base-100 shadow-2xl border-2">
        <figure>
          <img
            src={user?.photoURL}
            alt="User Photo"
            className="min-w-52 object-fill min-h-full lg:max-h-72"
          />
        </figure>
        <div className="card-body">
          <div className="">
            <div>
              <div className="flex justify-between item">
                <h3 className="font-semibold text-4xl capitalize">
                  {user?.name} ({user?.role})
                </h3>
                <FaRegEdit
                  className="text-4xl p-1 cursor-pointer rounded-md border border-black right-0"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                />
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <div className="mx-auto w-11/12 mb-4">
                      <h2 className="text-4xl text-center font-semibold mb-3">
                        Update Profile
                      </h2>
                      <Form
                        name="update_profile"
                        initialValues={user}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                      >
                        <Form.Item
                          label="User Name"
                          name="name"
                          initialValue={user?.name}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Location"
                          name="location"
                          initialValue={user?.location}
                        >
                          <Input />
                        </Form.Item>
  
                        <Form.Item
                          name="user_image"
                          valuePropName="fileList"
                          label="Image"
                          getValueFromEvent={normFile}
                        >
                          <Upload
                            name="logo"
                            action="/upload.do"
                            listType="picture"
                            {...props}
                          >
                            <Button icon={<UploadOutlined />}>
                              Click to upload Image
                            </Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item
                          label="Bio"
                          name="about"
                          initialValue={user?.about}
                        >
                          <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Password" name="newPassword">
                          <Input.Password placeholder="Enter New Password" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                          >
                            Update
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </dialog>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineEmail className="text-2xl pt-1" />
                <p>{user?.email}</p>
              </div>
              <div className="flex gap-2 items-center capitalize">
                <SlLocationPin className="text-2xl pt-1" />
                {user?.location && <p>{user?.location}</p>}
                {!user?.location && <p>N/A</p>}
              </div>
            </div>
            <h4 className="font-semibold pt-6">About Me</h4>
            {user?.about && (
              <p className="first-letter:capitalize">{user?.about}</p>
            )}
            {!user?.about && <p>N/A</p>}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button
          className="btn btn-error text-white font-bold"
          onClick={handleDeleteAccount}
        >
          Delete Account <MdOutlineDeleteForever size="2em" />
        </button>
      </div>
    </div>
  </>
  );
};

export default Profiles;
